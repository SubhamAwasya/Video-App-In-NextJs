import mongoose from "mongoose";
import { comment } from "postcss";

const CommentSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    videoId: {
      type: String,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Comment =
  mongoose.models.comments || mongoose.model("comments", CommentSchema);
export default Comment;
