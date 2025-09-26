import mongoose from "mongoose";

const catSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
  },
  { timestamps: true }
);

const Category = mongoose.model("Category", catSchema);

export default Category;
