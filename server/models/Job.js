import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const JobSchema = new Schema(
  {
    company: { type: String, required: true, maxlength: 25 },
    jobTitle: { type: String, required: true, maxlength: 25 },
    hours: { type: Number, required: true },
    rate: { type: Number, required: true },
    description: { type: String, maxlength: 50 },
    creatorId: { type: Schema.Types.ObjectId, ref: 'Account' }
  },
  { timestamps: true, toJSON: { virtuals: true } }
)