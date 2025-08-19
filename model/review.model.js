import mongoose from "mongoose";

const ReviewSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  guestName: String,
  publicReview: String,
  reviewCategory: [
    {
      category: String,
      rating: Number,
    },
  ],
  submittedAt: Date,
  channel: String,
  rating: Number,
  status: String,
});

export default mongoose.model("Review", ReviewSchema);
