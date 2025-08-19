export default function parsePropertyDeatils(review) {
  return {
    property: {
      propertyId: review.id || Math.floor(Math.random() * 4),
      listingName: review.name || "",
      mainImage:
        review?.listingImages?.[0]?.url ||
        "https://hostaway-platform.s3.us-west-2.amazonaws.com/listing/61148-155613-iyM94ntDUqzJWlvM7K0jydynf3nUm3nKYTokZv9WnR8-6425774de77d2",
      location: {
        city: review.city || "",
        country: review.country || "",
      },
      propertyDetails: {
        personCapacity: review.personCapacity ?? null,
        bedroomsNumber: review.bedroomsNumber ?? null,
        bathroomsNumber: review.bathroomsNumber ?? null,
        price: review.price ?? null,
      },
    },
    reviews: {
      id: review?.reviewData[0].id || Math.floor(Math.random() * 4),
      type: review?.reviewData[0].type || "host-to-guest",
      status: review?.reviewData[0].status || "published",
      rating: review?.reviewData[0].rating ?? 10,
      publicReview: review?.reviewData[0].publicReview || "",
      categories: review?.reviewData[0].reviewCategory || [],
      submittedAt: review?.reviewData[0].submittedAt || null,
      guestName: review?.reviewData[0].guestName || "Shane Finkelstein",
      channel: review?.reviewData[0].channel || "Hostaway",
      listingName: review?.name || "",
    },
  };
}
