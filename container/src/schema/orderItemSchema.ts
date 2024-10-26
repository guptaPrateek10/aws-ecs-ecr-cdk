// models/OrderItem.ts

import mongoose, { Schema, Document } from "mongoose";

export interface IOrderItem extends Document {
  product: mongoose.Types.ObjectId;
  quantity: number;
  price: number;
}

const orderItemSchema = new Schema<IOrderItem>({
  product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
  quantity: { type: Number, required: true, min: 1 },
  price: { type: Number, required: true },
});

const OrderItem = mongoose.model<IOrderItem>("OrderItem", orderItemSchema);
export default OrderItem;
