// models/CartItem.ts

import mongoose, { Schema, Document } from "mongoose";

export interface ICartItem extends Document {
  product: mongoose.Types.ObjectId;
  quantity: number;
}

const cartItemSchema = new Schema<ICartItem>({
  product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
  quantity: { type: Number, required: true, min: 1 },
});

const CartItem = mongoose.model<ICartItem>("CartItem", cartItemSchema);
export default CartItem;
