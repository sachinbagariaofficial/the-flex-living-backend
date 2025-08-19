const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;

async function getPlaceId(address) {
  const url = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${encodeURIComponent(
    address
  )}&inputtype=textquery&fields=place_id&key=${GOOGLE_API_KEY}`;

  const res = await fetch(url);
  const data = await res.json();
  console.log("Place API response:", data);

  return data?.candidates?.[0]?.place_id || null;
}

async function getGoogleReviews(placeId) {
  if (!placeId) return [];
  const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=name,rating,reviews&key=${GOOGLE_API_KEY}`;
  const res = await fetch(url);
  const data = await res.json();
  console.log("datain getGoogleReviews", data);
  return data?.result?.reviews || [];
}

function normalizeGoogleReviews(reviews, listingName) {
  console.log("reviews", reviews, "listingName", listingName);
  return reviews.map((r, i) => ({
    id: `google_${i}_${Date.now()}`,
    type: "guest-to-host",
    status: "published",
    rating: r.rating,
    publicReview: r.text,
    reviewCategory: [],
    submittedAt: new Date(r.time * 1000).toISOString(),
    guestName: r.author_name,
    channel: "Google",
    listingName,
  }));
}

export { getPlaceId, getGoogleReviews, normalizeGoogleReviews };
