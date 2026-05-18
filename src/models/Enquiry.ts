import mongoose, { Schema } from 'mongoose'
const S = new Schema({ name: { type: String, required: true }, phone: { type: String, required: true }, email: String, message: { type: String, required: true }, status: { type: String, enum: ['new','contacted','closed'], default: 'new' } }, { timestamps: true })
export default mongoose.models.Enquiry || mongoose.model('Enquiry', S)
