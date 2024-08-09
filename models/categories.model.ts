import mongoose from "mongoose";

const categoriesSchema = new mongoose.Schema(
  {
    title: String,
    avatar: String,
    deleted: {
      type: Boolean,
      default: false,
    },
    deletedAt: Date,
  },
  { timestamps: true }
);

const Categories = mongoose.model("Categories", categoriesSchema, "categories");
export default Categories;
