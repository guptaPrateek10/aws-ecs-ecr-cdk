// models/Address.ts

import mongoose, { Schema, Document } from "mongoose";

export interface IAddress extends Document {
  user: mongoose.Types.ObjectId;
  addressLine: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

const addressSchema = new Schema<IAddress>({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  addressLine: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  zipCode: { type: String, required: true },
  country: { type: String, required: true },
});

const Address = mongoose.model<IAddress>("Address", addressSchema);
export default Address;
