import mongoose from 'mongoose'
const URI = process.env.MONGODB_URI as string
if (!URI) throw new Error('Set MONGODB_URI in .env.local')
declare global { var _mongoCache: { conn: any; promise: any } | undefined }
const cache = global._mongoCache || (global._mongoCache = { conn: null, promise: null })
export default async function connectDB() {
  if (cache.conn) return cache.conn
  if (!cache.promise) cache.promise = mongoose.connect(URI, { bufferCommands: false })
  cache.conn = await cache.promise
  return cache.conn
}
