import express from "express";
import "dotenv/config";
import routes from "./routes/index.js";
import { connectDB } from "./config/db.js";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Enable CORS
app.use(cors());

// Middleware to parse incoming JSON requests
app.use(express.json());

// Mount all API routes under /api
app.use("/api", routes);

app.use((req, res, next) => {
  res.status(404).send("Error: The requested route was not found.");
});
// Start the server and listen on the defined port
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
