import axios from "axios";

// Create an Axios instance for Hostaway API
const apiClient = axios.create({
  baseURL: process.env.HOSTAWAY_BASE_URL, // Base URL of Hostaway API
  headers: {
    Authorization: `Bearer ${process.env.HOSTAWAY_API_TOKEN}`, // API token for authentication
  },
});

export default apiClient;
