'use client'
import Link from 'next/link'
import Image from 'next/image'
import { FaFacebook, FaInstagram, FaLinkedin, FaYoutube, FaPhone, FaEnvelope, FaMapMarkerAlt, FaWhatsapp } from 'react-icons/fa'

export default function Footer() {
  return (
    <footer className="relative bg-navy-800 pt-16 pb-6 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-solar-yellow/40 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2.5 mb-5">
              <div className="relative w-11 h-11 rounded-full overflow-hidden border-2 border-solar-yellow/40">
                <Image src="/logo.jpeg" alt="Green Aura Solar" fill className="object-cover" sizes="44px" />
              </div>
              <div>
                <div style={{ fontFamily: 'Rajdhani,sans-serif', fontWeight: 700, fontSize: '1.05rem', color: '#fff', lineHeight: 1.1 }}>Green Aura</div>
                <div className="gradient-text" style={{ fontFamily: 'Rajdhani,sans-serif', fontWeight: 600, fontSize: '0.72rem', letterSpacing: '0.18em' }}>SOLAR</div>
              </div>
            </Link>
            <p className="text-white/50 text-sm leading-relaxed mb-5">Powered by Sun, Driven by Green. Premium solar solutions across Odisha since 2018.</p>
            <div className="flex gap-2.5 flex-wrap">
              {[
                { icon: FaFacebook, href: 'FACEBOOK_LINK', color: '#1877F2', label: 'Facebook' },
                { icon: FaInstagram, href: 'INSTAGRAM_LINK', color: '#E4405F', label: 'Instagram' },
                { icon: FaLinkedin, href: 'LINKEDIN_LINK', color: '#0A66C2', label: 'LinkedIn' },
                { icon: FaYoutube, href: 'YOUTUBE_LINK', color: '#FF0000', label: 'YouTube' },
                { icon: FaWhatsapp, href: 'https://wa.me/919178620451', color: '#25D366', label: 'WhatsApp' },
              ].map(({ icon: Icon, href, color, label }) => (
                <a key={label} href={href} aria-label={label} target="_blank" rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg glass flex items-center justify-center border border-white/10 hover:border-white/25 transition-all hover:scale-110">
                  <Icon size={15} style={{ color }} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ fontFamily: 'Rajdhani,sans-serif', fontWeight: 600, fontSize: '1.1rem' }} className="text-white mb-4">Quick Links</h4>
            <ul className="space-y-2.5">
              {[['Home','/'],['Services','/services'],['About Us','/about'],['Blog','/blog'],['Contact','/contact'],['Admin Panel','/admin']].map(([l,h]) => (
                <li key={h}><Link href={h} className="text-white/50 hover:text-solar-yellow transition-colors text-sm flex items-center gap-2 group">
                  <span className="w-1 h-1 rounded-full bg-solar-yellow/50 group-hover:bg-solar-yellow transition-colors flex-shrink-0" />{l}
                </Link></li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 style={{ fontFamily: 'Rajdhani,sans-serif', fontWeight: 600, fontSize: '1.1rem' }} className="text-white mb-4">Services</h4>
            <ul className="space-y-2.5">
              {['Residential Solar','Commercial Solar','Industrial Systems','Battery Backup','Solar Maintenance','PM Surya Ghar','Solar Consultation'].map(s => (
                <li key={s}><Link href="/services" className="text-white/50 hover:text-solar-yellow transition-colors text-sm flex items-center gap-2 group">
                  <span className="w-1 h-1 rounded-full bg-energy-green/50 group-hover:bg-energy-green transition-colors flex-shrink-0" />{s}
                </Link></li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ fontFamily: 'Rajdhani,sans-serif', fontWeight: 600, fontSize: '1.1rem' }} className="text-white mb-4">Contact Us</h4>
            <div className="space-y-4">
              <a href="tel:919178620451" className="flex items-start gap-3 text-white/60 hover:text-solar-yellow transition-colors group">
                <div className="w-8 h-8 rounded-lg glass border border-white/10 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:border-solar-yellow/40 transition-colors">
                  <FaPhone size={12} className="text-solar-yellow" />
                </div>
                <div className="text-sm"><div>+91 9124632683</div><div>+91 9178620451</div></div>
              </a>
              <a href="mailto:sgreenaura2023@gmail.com" className="flex items-center gap-3 text-white/60 hover:text-solar-yellow transition-colors group">
                <div className="w-8 h-8 rounded-lg glass border border-white/10 flex items-center justify-center flex-shrink-0 group-hover:border-solar-yellow/40 transition-colors">
                  <FaEnvelope size={12} className="text-solar-yellow" />
                </div>
                <span className="text-sm break-all">sgreenaura2023@gmail.com</span>
              </a>
              <div className="flex items-start gap-3 text-white/50">
                <div className="w-8 h-8 rounded-lg glass border border-white/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <FaMapMarkerAlt size={12} className="text-solar-yellow" />
                </div>
                <p className="text-sm leading-relaxed">Plot No-2945/98, Near Modern Furniture, Palasuni, Bhubaneswar, Odisha 751010</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/5 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/30 text-xs text-center sm:text-left">© {new Date().getFullYear()} Green Aura Solar. All rights reserved.</p>
          <p className="text-white/30 text-xs">Developed by Dibyaranjan das</p>
        </div>
      </div>
    </footer>
  )
}
