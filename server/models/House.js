import mongoose from 'mongoose'
const Schema = mongoose.Schema
export const HouseSchema = new Schema(
  {
    bedrooms: { type: Number, required: true },
    bathrooms: { type: Number, required: true },
    levels: { type: Number, required: true },
    imgUrl: { type: String },
    year: { type: Number, required: true },
    price: { type: Number, required: true },
    description: { type: String }
  },
  { timestamps: true, toJSON: { virtuals: true } }
)
