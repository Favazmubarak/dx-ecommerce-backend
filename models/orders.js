import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user_id: {
      required: true,
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
    },
    items: [
      {
        product_id: {
          required: true,
          type: mongoose.Schema.Types.ObjectId,
          ref: "Products",
        },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
        item_total: { type: Number, required: true },
      },
    ],
    total_price: { type: Number, required: true },
    status: { type: String, default: "pending..." },
  },
  { timestamps: true }
);

const Order = new mongoose.model("Order",orderSchema)

export default Order
