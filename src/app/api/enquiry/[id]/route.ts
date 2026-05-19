import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Enquiry from '@/models/Enquiry'

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await req.json()
    await connectDB()
    await Enquiry.findByIdAndUpdate(params.id, { $set: { status: body.status } })
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Failed' }, { status: 500 })
  }
}

export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDB()
    await Enquiry.findByIdAndDelete(params.id)
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Failed' }, { status: 500 })
  }
}
await (Enquiry as any).findByIdAndUpdate(...)
await (Enquiry as any).findByIdAndDelete(...)
