import apiClient from "../utils/apiClient.js";

export async function fetchHostawayListings() {
  // Call Hostaway API to get all listings
  const res = await apiClient.get("/v1/listings");

  // Check if response is successful
  if (res.status !== 200) {
    throw Error("Error occurred while fetching the listings");
  }

  // Return the array of listings or an empty array if none
  return res?.data?.result || [];
}
