import mongoose from "mongoose";

const articlesSchema = new mongoose.Schema(
  {
    title: String,
    avatar: String,
    description: String,
    deleted: {
      type: Boolean,
      default: false,
    },
    deletedAt: Date,
  },
  { timestamps: true }
);

const Articles = mongoose.model("Articles", articlesSchema, "articles");
export default Articles;
