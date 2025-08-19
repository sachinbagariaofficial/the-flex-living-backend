import { Router } from "express";
import reviewsRoutes from "./reviews.routes.js";
const routes = Router();

// This line registers all review related routes under the /reviews path
routes.use("/reviews", reviewsRoutes);

export default routes;
