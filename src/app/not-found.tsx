import Link from 'next/link'
export default function NotFound() {
  return (
    <div className="min-h-screen bg-navy-900 flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="gradient-text mb-2" style={{ fontFamily:'Rajdhani,sans-serif', fontWeight:700, fontSize:'clamp(5rem,20vw,9rem)', lineHeight:1 }}>404</div>
        <div className="text-5xl mb-4">☀️</div>
        <h1 style={{ fontFamily:'Rajdhani,sans-serif', fontWeight:700, color:'#fff', fontSize:'1.7rem' }} className="mb-3">Page Not Found</h1>
        <p className="text-white/45 mb-7 text-sm sm:text-base">Looks like this page went off-grid! Let's get you back to the sunshine.</p>
        <div className="flex gap-3 justify-center flex-wrap">
          <Link href="/" className="btn-solar px-7 py-3">Go Home</Link>
          <Link href="/contact" className="btn-outline px-7 py-3">Contact Us</Link>
        </div>
      </div>
    </div>
  )
}
