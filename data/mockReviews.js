export const mockReviewData = [
  {
    id: 155613,
    guestName: "Emma Smith",
    publicReview: "Nice apartment, but check-in was confusing.",
    reviewCategory: [
      { category: "cleanliness", rating: 9 },

      { category: "respect_house_rules", rating: 7 },
    ],
    submittedAt: new Date("2022-08-21T22:45:14Z"),
    channel: "Hostaway",
    rating: 9,
    status: "private",
  },
  {
    id: 346994,
    guestName: "Liam Johnson",
    publicReview: "Loved the location, great for family stays.",
    reviewCategory: [
      { category: "communication", rating: 7 },
      { category: "respect_house_rules", rating: 10 },
    ],
    submittedAt: new Date("2023-08-21T22:45:14Z"),
    channel: "Hostaway",
    rating: 10,
    status: "published",
  },
  {
    id: 155615,
    guestName: "Olivia Brown",
    publicReview: "Cozy apartment, but could be cleaner.",
    reviewCategory: [
      { category: "cleanliness", rating: 5 },
      { category: "communication", rating: 9 },
      { category: "respect_house_rules", rating: 8 },
    ],
    submittedAt: new Date("2024-08-21T22:45:14Z"),
    channel: "Hostaway",
    rating: 6,
    status: "published",
  },
];
