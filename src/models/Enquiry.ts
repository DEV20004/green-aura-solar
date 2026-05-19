/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from 'mongoose'

const EnquirySchema = new mongoose.Schema(
  {
    name:    { type: String, required: true },
    phone:   { type: String, required: true },
    email:   { type: String, default: '' },
    message: { type: String, required: true },
    status:  { type: String, enum: ['new', 'contacted', 'closed'], default: 'new' },
  },
  { timestamps: true }
)

const Enquiry = (mongoose.models['Enquiry'] as any) || mongoose.model('Enquiry', EnquirySchema)

export default Enquiry
