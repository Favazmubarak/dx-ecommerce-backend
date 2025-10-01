import mongoose from "mongoose";


const productschema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    category_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category"
    },
    Image: { type: String },
  },
  { timestamps: true }
);

const Products = mongoose.model("Products",productschema)

export default Products
