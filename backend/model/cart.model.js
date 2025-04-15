import mongoose from "mongoose";

const cartSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    cartItems: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: { type: Number, required: true },
      },
    ],
    totalQuantity: { type: Number, default: 0 },
  },
  { timestamps: true }
);

cartSchema.pre("save", async function (next) {
  const cart = this;
  const totalQuantity = cart.cartItems.reduce((total, item) => total + item.quantity, 0);
  cart.totalQuantity = totalQuantity;
  next();
});

export const Cart = mongoose.model("Cart", cartSchema);
