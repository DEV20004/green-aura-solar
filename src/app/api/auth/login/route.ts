import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json()
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@greenaurasolar.com'
    const adminPass = process.env.ADMIN_PASSWORD || 'Admin@123456'
    const secret = process.env.JWT_SECRET || 'GreenAuraSolar_ChangeThis_Secret'

    if (email === adminEmail && password === adminPass) {
      const token = jwt.sign({ email, role: 'admin', name: 'Admin' }, secret, { expiresIn: '7d' })
      return NextResponse.json({ token, user: { email, name: 'Green Aura Admin', role: 'admin' } })
    }
    return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 })
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
