// models/Cart.ts

import mongoose, { Schema, Document } from "mongoose";

export interface ICart extends Document {
  user: mongoose.Types.ObjectId;
  items: mongoose.Types.ObjectId[];
}

const cartSchema = new Schema<ICart>({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  items: [{ type: Schema.Types.ObjectId, ref: "CartItem" }], // Reference to CartItems
});

const Cart = mongoose.model<ICart>("Cart", cartSchema);
export default Cart;
