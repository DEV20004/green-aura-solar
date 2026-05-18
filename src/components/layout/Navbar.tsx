'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { HiMenu, HiX } from 'react-icons/hi'
import { FaPhone } from 'react-icons/fa'

const NAV = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'About', href: '/about' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  // Close menu on route change
  useEffect(() => { setOpen(false) }, [pathname])

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${
        scrolled ? 'glass-dark shadow-lg py-2' : 'bg-transparent py-4'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 flex-shrink-0 group">
            <div className="relative w-10 h-10 lg:w-11 lg:h-11 rounded-full overflow-hidden border-2 border-solar-yellow/40 group-hover:border-solar-yellow transition-all group-hover:shadow-[0_0_20px_rgba(245,166,35,0.5)]">
              <Image src="/logo.jpeg" alt="Green Aura Solar Logo" fill className="object-cover" priority sizes="48px" />
            </div>
            <div className="hidden sm:block leading-none">
              <div style={{ fontFamily: 'Rajdhani,sans-serif', fontWeight: 700, fontSize: '1.05rem', color: '#fff', lineHeight: 1.1 }}>Green Aura</div>
              <div className="gradient-text" style={{ fontFamily: 'Rajdhani,sans-serif', fontWeight: 600, fontSize: '0.72rem', letterSpacing: '0.18em' }}>SOLAR</div>
            </div>
          </Link>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-7">
            {NAV.map(({ label, href }) => (
              <Link key={href} href={href} className={`nav-link ${pathname === href ? 'active' : ''}`}>{label}</Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <a href="tel:+919178620451" className="flex items-center gap-1.5 text-white/70 hover:text-solar-yellow transition-colors text-sm font-semibold">
              <FaPhone size={12} className="text-solar-yellow" />919178620451
            </a>
            <Link href="/contact" className="btn-solar text-sm px-5 py-2.5">Free Quote</Link>
          </div>

          {/* Tablet CTA + Mobile Toggle */}
          <div className="lg:hidden flex items-center gap-3">
            <Link href="/contact" className="hidden sm:flex btn-solar text-xs px-4 py-2">Free Quote</Link>
            <button
              onClick={() => setOpen(!open)}
              className="p-2.5 rounded-xl border border-white/15 text-white hover:border-solar-yellow/50 transition-colors"
              aria-label="Toggle menu"
            >
              {open ? <HiX size={21} /> : <HiMenu size={21} />}
            </button>
          </div>
        </div>

        {/* Mobile / Tablet Dropdown */}
        <div className={`lg:hidden overflow-hidden transition-all duration-300 ${open ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="glass-dark mx-3 mt-2 rounded-2xl p-3 space-y-1 border border-solar-yellow/15">
            {NAV.map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                className={`flex items-center px-4 py-3 rounded-xl font-semibold text-base transition-all ${
                  pathname === href
                    ? 'bg-solar-yellow/15 text-solar-yellow border border-solar-yellow/30'
                    : 'text-white/80 hover:bg-white/5 hover:text-white'
                }`}
                style={{ fontFamily: 'Rajdhani,sans-serif', fontWeight: 600 }}
              >
                {label}
              </Link>
            ))}
            <div className="pt-2 grid grid-cols-2 gap-2">
              <a href="tel:+919178620451" className="btn-outline text-center text-sm py-2.5">Call Now</a>
              <Link href="/contact" className="btn-solar text-center text-sm py-2.5">Free Quote</Link>
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}
