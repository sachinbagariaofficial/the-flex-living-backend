import { Router } from "express";
import {
  getHostawayReviews,
  approveReview,
} from "../controllers/reviews.controller.js";

const router = Router();

// This is GET api url /api/reviews/hostaway
router.get("/hostaway", getHostawayReviews);

// This is PATCH api url  /api/reviews/:id/approve for updating the review view
router.patch("/:id/approve", approveReview);

export default router;
