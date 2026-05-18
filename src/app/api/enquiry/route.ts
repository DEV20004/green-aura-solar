import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Enquiry from '@/models/Enquiry'
import nodemailer from 'nodemailer'

export async function POST(req: NextRequest) {
  try {
    const { name, phone, email, message } = await req.json()
    if (!name || !phone || !message) return NextResponse.json({ error: 'Name, phone and message required' }, { status: 400 })

    await connectDB()
    const enq = await Enquiry.create({ name, phone, email, message })

    // Send email notification to company
    try {
      const t = nodemailer.createTransport({ service: 'gmail', auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS } })
      await t.sendMail({
        from: process.env.EMAIL_USER,
        to: 'sgreenaura2023@gmail.com',
        subject: `🌞 New Solar Enquiry from ${name}`,
        html: `<div style="font-family:sans-serif;max-width:560px;margin:auto;background:#0A0F1E;color:#fff;padding:28px;border-radius:12px;border:1px solid rgba(245,166,35,0.3)">
          <h2 style="color:#F5A623;margin:0 0 4px">Green Aura Solar</h2>
          <p style="color:#aaa;margin:0 0 20px;font-size:13px">New enquiry received from website</p>
          <table style="width:100%;border-collapse:collapse;font-size:14px">
            <tr><td style="color:#aaa;padding:8px 0;width:100px">Name</td><td style="color:#fff;font-weight:bold">${name}</td></tr>
            <tr><td style="color:#aaa;padding:8px 0">Phone</td><td><a href="tel:${phone}" style="color:#F5A623;font-weight:bold">${phone}</a></td></tr>
            <tr><td style="color:#aaa;padding:8px 0">Email</td><td style="color:#fff">${email||'Not given'}</td></tr>
            <tr><td style="color:#aaa;padding:8px 0;vertical-align:top">Message</td><td style="color:#fff">${message}</td></tr>
            <tr><td style="color:#aaa;padding:8px 0">Time</td><td style="color:#fff">${new Date().toLocaleString('en-IN')}</td></tr>
          </table>
          <p style="color:#555;font-size:11px;margin-top:20px;text-align:center">Green Aura Solar • Palasuni, Bhubaneswar, Odisha 751010</p>
        </div>`,
      })
    } catch (e) { console.error('Email failed:', e) }

    return NextResponse.json({ success: true, id: enq._id }, { status: 201 })
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

export async function GET(req: NextRequest) {
  const auth = req.headers.get('authorization')
  if (!auth?.startsWith('Bearer ')) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  try {
    await connectDB()
    const enquiries = await Enquiry.find().sort({ createdAt: -1 }).lean()
    return NextResponse.json({ enquiries })
  } catch (e) { return NextResponse.json({ error: 'Server error' }, { status: 500 }) }
}
