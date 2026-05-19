import mongoose, { Schema, Document, Model } from 'mongoose'

export interface IEnquiry extends Document {
  name: string
  phone: string
  email?: string
  message: string
  status: 'new' | 'contacted' | 'closed'
  createdAt: Date
  updatedAt: Date
}

const EnquirySchema = new Schema<IEnquiry>({
  name:    { type: String, required: true },
  phone:   { type: String, required: true },
  email:   { type: String },
  message: { type: String, required: true },
  status:  { type: String, enum: ['new', 'contacted', 'closed'], default: 'new' },
}, { timestamps: true })

const Enquiry: Model<IEnquiry> =
  (mongoose.models.Enquiry as Model<IEnquiry>) ||
  mongoose.model<IEnquiry>('Enquiry', EnquirySchema)

export default Enquiry
