import mongoose, { mongo, Schema } from "mongoose";

const productschema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    category_id: {
      types: mongoose.Schema.Types.ObjectId,
      ref: "Category"
    },
    Image: { type: String },
  },
  { timestamps: true }
);

const products = mongoose.model("product",productschema)

// export  {products}