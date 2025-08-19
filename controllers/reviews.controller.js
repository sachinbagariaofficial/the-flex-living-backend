import { mockReviewData } from "../data/mockReviews.js";
import reviewModel from "../model/review.model.js";
import {
  fetchHostawayListingsWithReviews,
  updateReviewApproval,
} from "../services/reviews.service.js";
import parsePropertyDeatils from "../utils/parsePropertyDeatils.js";
// import { getPlaceId, getGoogleReviews, normalizeGoogleReviews } from "../services/google.review.js"

export async function getHostawayReviews(req, res) {
  try {
    const { rating, channel, sortBy, sortOrder, status, limit, page } =
      req.query;
    let query = {};

    if (status) query.status = status;
    if (channel) query.channel = channel;
    if (rating) query.rating = { $eq: Number(rating) };

    const perPage = Number(limit) || 10;
    const currentPage = Number(page) || 1;
    const skip = (currentPage - 1) * perPage;

    let sortQuery = {};

    if (sortBy) {
      sortQuery[sortBy] = sortOrder === "desc" ? -1 : 1;
    }

    // Fetch all reviews from MongoDB, fallback to mock data if DB is empty
    let dbReviews = await reviewModel
      .find(query)
      .sort(sortQuery)
      .skip(skip)
      .limit(perPage);

    if (!dbReviews.length) {
      return res.send({ status: "success", result: [] });
    }

    // Fetch all property listings from Hostaway API
    const data = await fetchHostawayListingsWithReviews();

    // Group reviews by listing ID for easy mapping
    const reviewMap = dbReviews?.reduce((acc, review) => {
      if (!acc[review.id]) acc[review.id] = [];
      acc[review.id].push(review);
      return acc;
    }, {});

    // Merge Hostaway listing data with their corresponding reviews
    const mergeData = data?.reduce((acc, list) => {
      const reviewsForListing = reviewMap[list?.id] || [];

      if (!reviewsForListing.length) return acc; // skip
      const para = { ...list, reviewData: reviewsForListing };

      acc.push(parsePropertyDeatils(para));
      return acc;
    }, []);

    // ******Here is the logic of google review with property address ********

    //  // Merge Hostaway listing data with their corresponding reviews
    //     const mergeData = await Promise.all(
    //       hostawayApiResponse?.map(async (list) => {
    //         // Existing Hostaway reviews
    //         const reviewsForListing = reviewMap[list?.id] || [];
    //         console.log("list.publicAddress", list.publicAddress);

    //         // Fetch Google reviews based on publicAddress
    //         const placeId = await getPlaceId(list.publicAddress);
    //         const googleReviewsRaw = await getGoogleReviews(placeId);
    //         const googleReviews = normalizeGoogleReviews(
    //           googleReviewsRaw,
    //           list.name
    //         );

    //         const allReviews = [...reviewsForListing, ...googleReviews];
    //         if (!allReviews.length) return null;

    //         const para = { ...list, reviewData: allReviews };
    //         return parsePropertyDeatils(para);
    //       })
    //     );

    let mergeDataSorted;

    if (sortBy) {
      mergeDataSorted = mergeData.sort((a, b) => {
        const valA = a.reviews?.[sortBy];
        const valB = b.reviews?.[sortBy];

        if (valA == null) return 1;
        if (valB == null) return -1;

        // If sorting by date
        if (sortBy === "submittedAt") {
          return sortOrder === "desc"
            ? new Date(valB) - new Date(valA)
            : new Date(valA) - new Date(valB);
        }

        // For string fields: guestName, channel, listingName
        if (typeof valA === "string" && typeof valB === "string") {
          return sortOrder === "desc"
            ? valB.localeCompare(valA)
            : valA.localeCompare(valB);
        }

        // For number fields (like rating)
        if (typeof valA === "number" && typeof valB === "number") {
          return sortOrder === "desc" ? valB - valA : valA - valB;
        }

        return 0;
      });
    }
    // After merging reviews into listings
    const queryResult = mergeDataSorted?.length ? mergeDataSorted : mergeData;
    // Send the combined property + review data to frontend
    res.send({ status: "success", result: queryResult || [] });
  } catch (error) {
    console.log("err", error);
    res.status(500).send({ error: "Failed to fetch reviews" });
  }
}

export async function approveReview(req, res) {
  try {
    const { id } = req.params;
    const { show } = req.query;

    // Validate that ID is a number
    const numericId = Number(id);
    if (isNaN(numericId)) {
      return res.status(400).send({
        status: "failed",
        errorMessage: "Invalid ID: must be a number",
        result: [],
      });
    }

    // Validate that show is a boolean string
    if (show !== "true" && show !== "false") {
      return res.status(400).send({
        status: "failed",
        errorMessage: "Invalid show value: must be true or false",
        result: [],
      });
    }
    const showBoolean = show === "true";

    // Update the review's visibility in the database
    const updated = await updateReviewApproval(id, showBoolean);

    // Send updated review back to frontend
    res.send({ status: "success", result: updated });
  } catch (error) {
    res.status(500).send({
      status: "failed",
      errorMessage: error || "Failed to fetch reviews",
      result: [],
    });
  }
}
