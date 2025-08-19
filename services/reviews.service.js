import reviewModel from "../model/review.model.js";
import { fetchHostawayListings } from "./hostaway.service.js";

export async function fetchHostawayListingsWithReviews() {
  try {
    // Call the Hostaway service to get all property listings
    const listings = await fetchHostawayListings();
    return listings;
  } catch (error) {
    throw Error("Error occurred while fetching the listing API");
  }
}

export async function updateReviewApproval(listId, listShow) {
  try {
    const statusMessage = listShow ? "published" : "private";

    // Find the review by ID and update its 'show' property
    const updateReview = await reviewModel.findOneAndUpdate(
      { id: listId },
      { $set: { status: statusMessage } },
      { new: true }
    );
    // Return the updated review
    return updateReview;
  } catch (error) {
    throw Error("Error occurred while updating the review show status");
  }
}
