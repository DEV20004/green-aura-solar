'use client'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { FaSun, FaPhone, FaStar, FaCheckCircle, FaArrowRight, FaLeaf } from 'react-icons/fa'
import { MdSolarPower, MdElectricBolt } from 'react-icons/md'

/* ─── Animated Counter ─────────────────────────────── */
function Counter({ end, suffix = '' }: { end: number; suffix?: string }) {
  const [val, setVal] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const done = useRef(false)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !done.current) {
        done.current = true
        const step = (end / 1800) * 16
        let cur = 0
        const t = setInterval(() => { cur += step; if (cur >= end) { setVal(end); clearInterval(t) } else setVal(Math.floor(cur)) }, 16)
      }
    }, { threshold: 0.4 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [end])
  return <span ref={ref}>{val}{suffix}</span>
}

/* ─── Particles ────────────────────────────────────── */
function Particles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: 16 }).map((_, i) => (
        <div key={i} className="solar-particle hidden sm:block" style={{
          left: `${(i * 6.25 + Math.sin(i) * 10 + 50) % 100}%`,
          top: `${(i * 7 + Math.cos(i) * 15 + 20) % 90}%`,
          width: `${(i % 3) + 2}px`, height: `${(i % 3) + 2}px`,
          animationDelay: `${i * 0.4}s`, animationDuration: `${(i % 4) + 5}s`,
          opacity: 0.3 + (i % 5) * 0.1,
        }} />
      ))}
    </div>
  )
}

/* ─── Calculator ───────────────────────────────────── */
function Calculator() {
  const [bill, setBill] = useState('')
  const [type, setType] = useState('residential')
  const [res, setRes] = useState<null | { saving: number; cap: number; panels: number; roi: number }>(null)

  const calc = () => {
    const b = parseFloat(bill); if (!b || b <= 0) return
    const saving = Math.round(b * 12 * 0.85)
    const cap = Math.ceil(b / 1200)
    const panels = cap * 3
    const cost = cap * 48000
    setRes({ saving, cap, panels, roi: Math.round((cost / saving) * 10) / 10 })
  }

  return (
    <section className="py-16 md:py-20 relative">
      <div className="absolute inset-0 grid-bg opacity-25" />
      <div className="relative max-w-3xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <div className="section-badge"><MdElectricBolt />Energy Savings</div>
          <h2 className="section-heading text-white">Solar <span className="gradient-text">Savings Calculator</span></h2>
          <p className="text-white/50 mt-2 text-sm sm:text-base">See how much you save by switching to solar</p>
        </div>
        <div className="glass-dark rounded-2xl p-5 sm:p-8 border border-solar-yellow/20">
          <div className="grid sm:grid-cols-2 gap-4 mb-5">
            <div>
              <label className="block text-white/70 text-sm mb-2 font-semibold">Monthly Bill (₹)</label>
              <input type="number" value={bill} onChange={e => setBill(e.target.value)} placeholder="e.g. 3000" className="form-input" />
            </div>
            <div>
              <label className="block text-white/70 text-sm mb-2 font-semibold">Property Type</label>
              <select value={type} onChange={e => setType(e.target.value)} className="form-input">
                <option value="residential">Residential</option>
                <option value="commercial">Commercial</option>
                <option value="industrial">Industrial</option>
              </select>
            </div>
          </div>
          <button onClick={calc} className="btn-solar w-full sm:w-auto px-8 mb-5">Calculate Savings ⚡</button>
          {res && (
            <div className="calc-result">
              <h3 className="gradient-text mb-4 text-lg" style={{ fontFamily: 'Rajdhani,sans-serif', fontWeight: 700 }}>Your Solar Benefits</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { l: 'Annual Saving', v: `₹${res.saving.toLocaleString()}`, e: '💰' },
                  { l: 'Capacity', v: `${res.cap} kW`, e: '⚡' },
                  { l: 'Panels', v: `${res.panels}`, e: '☀️' },
                  { l: 'Payback', v: `${res.roi} yrs`, e: '📈' },
                ].map(({ l, v, e }) => (
                  <div key={l} className="text-center bg-white/5 rounded-xl p-3 border border-white/8">
                    <div className="text-xl mb-1">{e}</div>
                    <div className="gradient-text font-bold text-base" style={{ fontFamily: 'Rajdhani,sans-serif' }}>{v}</div>
                    <div className="text-white/40 text-xs mt-0.5">{l}</div>
                  </div>
                ))}
              </div>
              <p className="text-white/35 text-xs mt-3 text-center">*Estimates based on Odisha solar irradiation. Contact us for exact quote.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

/* ─── Testimonials ─────────────────────────────────── */
const TESTI = [
  { name: 'Ramesh Patra', loc: 'Bhubaneswar', review: 'Green Aura Solar installed a 5kW system for our home. Bill reduced by 90%! Excellent professional team.', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face' },
  { name: 'Priya Mishra', loc: 'Cuttack', review: 'Very happy with the PM Surya Ghar project. They handled all paperwork and installation perfectly!', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face' },
  { name: 'Sanjay Kumar', loc: 'Puri', review: 'Installed 10kW commercial system for my factory. ROI faster than expected. Highly recommended!', img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face' },
  { name: 'Sunita Devi', loc: 'Khordha', review: 'The team was very patient explaining subsidy process. Our 3kW system is running perfectly. Thank you!', img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face' },
]

function Testimonials() {
  const [i, setI] = useState(0)
  useEffect(() => { const t = setInterval(() => setI(x => (x + 1) % TESTI.length), 5000); return () => clearInterval(t) }, [])
  const t = TESTI[i]
  return (
    <section className="py-16 md:py-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <div className="section-badge"><FaStar />Testimonials</div>
          <h2 className="section-heading text-white">What <span className="gradient-text">Clients Say</span></h2>
        </div>
        <div className="testimonial-card">
          <div className="flex flex-col sm:flex-row gap-4 items-start">
            <Image src={t.img} alt={t.name} width={60} height={60} className="rounded-full border-2 border-solar-yellow/40 flex-shrink-0 w-14 h-14" />
            <div>
              <div className="flex gap-1 mb-2">{Array.from({length:5}).map((_,j)=><FaStar key={j} className="text-solar-yellow" size={13}/>)}</div>
              <p className="text-white/80 italic mb-3 text-sm sm:text-base leading-relaxed">"{t.review}"</p>
              <div style={{ fontFamily: 'Rajdhani,sans-serif', fontWeight: 700, color: '#fff' }}>{t.name}</div>
              <div className="text-white/40 text-xs">{t.loc}, Odisha</div>
            </div>
          </div>
        </div>
        <div className="flex justify-center gap-2 mt-5">
          {TESTI.map((_,x)=><button key={x} onClick={()=>setI(x)} className={`h-2 rounded-full transition-all duration-300 ${x===i?'w-6 bg-solar-yellow':'w-2 bg-white/20'}`}/>)}
        </div>
      </div>
    </section>
  )
}

/* ─── Main Page ────────────────────────────────────── */
export default function HomePage() {
  return (
    <div className="min-h-screen bg-navy-900">

      {/* ══ HERO ══ */}
      <section className="relative min-h-screen flex items-center justify-center hero-gradient overflow-hidden pt-20">
        <Particles />
        <div className="absolute top-1/3 left-1/4 w-48 h-48 sm:w-64 sm:h-64 bg-solar-yellow/8 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/3 right-1/4 w-56 h-56 sm:w-80 sm:h-80 bg-sky-glow/6 rounded-full blur-3xl" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-20 grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Text */}
          <div className="text-center lg:text-left">
            <div className="section-badge"><FaSun className="animate-spin-slow" />Renewable Energy Leader</div>
            <h1 style={{ fontFamily: 'Rajdhani,sans-serif', fontWeight: 700, fontSize: 'clamp(2.4rem,8vw,4.5rem)', lineHeight: 1.1, color: '#fff' }}>
              <span className="gradient-text">Green Aura</span><br />Solar
            </h1>
            <p className="text-white/55 text-base sm:text-lg mt-2 mb-1 italic" style={{ fontFamily: 'Rajdhani,sans-serif' }}>"Powered by Sun, Driven by Green"</p>
            <p className="text-white/55 text-sm sm:text-base leading-relaxed mb-7 max-w-xl mx-auto lg:mx-0">
              Delivering advanced solar power solutions for residential, commercial, and industrial sectors across Odisha. End-to-end services — consultation, design, installation, maintenance, and PM Surya Ghar assistance.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-3 justify-center lg:justify-start mb-8">
              <Link href="/contact" className="btn-solar text-sm sm:text-base px-6 py-3">Get Free Consultation</Link>
              <Link href="/services" className="btn-outline text-sm sm:text-base px-6 py-3">View Services</Link>
              <a href="tel:+919124632683" className="flex items-center gap-2 text-white/65 hover:text-solar-yellow transition-colors text-sm font-semibold">
                <FaPhone size={12} className="text-solar-yellow" />+91 9124632683
              </a>
            </div>

            {/* Mini stats */}
            <div className="grid grid-cols-3 gap-3 max-w-sm mx-auto lg:mx-0">
              {[{n:600,s:'+',l:'PM Surya Ghar'},{n:500,s:'+',l:'Happy Clients'},{n:6,s:'+',l:'Years Exp.'}].map(({n,s,l})=>(
                <div key={l} className="stat-card text-center">
                  <div className="gradient-text text-xl sm:text-2xl" style={{ fontFamily: 'Rajdhani,sans-serif', fontWeight: 700 }}><Counter end={n} suffix={s}/></div>
                  <div className="text-white/40 text-xs mt-0.5">{l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative max-w-md mx-auto lg:max-w-none">
            <div className="absolute inset-0 bg-solar-yellow/8 rounded-2xl blur-2xl" />
            <div className="relative glass-solar rounded-2xl overflow-hidden border border-solar-yellow/25" style={{ boxShadow: '0 0 60px rgba(245,166,35,0.2)' }}>
              <Image src="https://images.unsplash.com/photo-1509391366360-2e959784a276?w=650&h=450&fit=crop" alt="Solar Panel Installation" width={650} height={450} className="w-full object-cover" priority />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-900/55 to-transparent" />
              <div className="absolute bottom-4 left-3 right-3 glass rounded-xl p-3 border border-solar-yellow/20 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-solar-yellow/20 flex items-center justify-center flex-shrink-0"><MdSolarPower size={20} className="text-solar-yellow"/></div>
                <div>
                  <div style={{ fontFamily: 'Rajdhani,sans-serif', fontWeight: 700, color: '#fff', fontSize: '0.9rem' }}>PM Surya Ghar Certified</div>
                  <div className="text-white/50 text-xs">600+ Successful Installations</div>
                </div>
              </div>
            </div>
            {/* Float badges */}
            <div className="absolute -top-3 -right-3 glass-solar rounded-xl px-3 py-2 border border-solar-yellow/35 text-center animate-float shadow-lg hidden sm:block">
              <div className="gradient-text text-lg" style={{ fontFamily: 'Rajdhani,sans-serif', fontWeight: 700 }}>25yr</div>
              <div className="text-white/55 text-xs">Warranty</div>
            </div>
            <div className="absolute -bottom-3 -left-3 glass rounded-xl px-3 py-2 border border-energy-green/35 text-center hidden sm:block" style={{ animationDelay: '3s' }}>
              <div className="gradient-text-green text-lg" style={{ fontFamily: 'Rajdhani,sans-serif', fontWeight: 700 }}>80%</div>
              <div className="text-white/55 text-xs">Bill Saving</div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 animate-bounce">
          <span className="text-white/25 text-xs tracking-widest">SCROLL</span>
          <div className="w-px h-7 bg-gradient-to-b from-solar-yellow/50 to-transparent" />
        </div>
      </section>

      {/* ══ SERVICES PREVIEW ══ */}
      <section className="py-16 md:py-20 relative">
        <div className="absolute inset-0 grid-bg opacity-20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="section-badge"><MdSolarPower />Services</div>
            <h2 className="section-heading text-white">Complete Solar <span className="gradient-text">Solutions</span></h2>
            <p className="text-white/50 mt-2 max-w-xl mx-auto text-sm sm:text-base">From consultation to installation — we handle everything</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 mb-8">
            {[
              { e:'🏠', t:'Residential Solar', d:'Complete home solar with PM Surya Ghar subsidy up to ₹78,000.' },
              { e:'🏢', t:'Commercial Solar', d:'High-performance systems for offices and businesses. Cut costs by 90%.' },
              { e:'🏭', t:'Industrial Solar', d:'Large-scale industrial solar plants for maximum output and efficiency.' },
              { e:'🔋', t:'Battery Backup', d:'Advanced lithium-ion storage for 24/7 uninterrupted power supply.' },
              { e:'🔧', t:'Solar Maintenance', d:'Professional AMC, cleaning, inverter check and performance monitoring.' },
              { e:'🏛️', t:'PM Surya Ghar', d:'End-to-end assistance — registration, DISCOM approval, subsidy claim.' },
            ].map(({ e, t, d }) => (
              <Link href="/services" key={t} className="glass-dark rounded-2xl p-5 sm:p-6 border border-white/5 card-hover group block">
                <div className="text-3xl sm:text-4xl mb-3">{e}</div>
                <h3 className="text-white group-hover:text-solar-yellow transition-colors mb-2 text-base sm:text-lg" style={{ fontFamily: 'Rajdhani,sans-serif', fontWeight: 700 }}>{t}</h3>
                <p className="text-white/50 text-sm leading-relaxed mb-3">{d}</p>
                <span className="text-solar-yellow text-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">Learn More <FaArrowRight size={11}/></span>
              </Link>
            ))}
          </div>
          <div className="text-center">
            <Link href="/services" className="btn-outline px-8 py-3">View All Services <FaArrowRight size={12} className="inline ml-1"/></Link>
          </div>
        </div>
      </section>

      {/* ══ WHY CHOOSE US ══ */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="order-2 lg:order-1">
              <div className="section-badge"><FaLeaf />Why Choose Us</div>
              <h2 className="section-heading text-white mb-4">Odisha's Most <span className="gradient-text">Trusted Solar Partner</span></h2>
              <p className="text-white/55 leading-relaxed mb-6 text-sm sm:text-base">6+ years of excellence and 600+ PM Surya Ghar installations make Green Aura Solar the most reliable solar company in Bhubaneswar.</p>
              <div className="grid sm:grid-cols-2 gap-2.5 mb-7">
                {['High-Quality Solar Panels','Expert Certified Engineers','PM Surya Ghar Experts','Affordable Pricing','25-Year Warranty','Reliable AMC Support','Customer Satisfaction','All-Odisha Coverage'].map(f=>(
                  <div key={f} className="flex items-center gap-2.5 text-white/75 text-sm">
                    <FaCheckCircle className="text-energy-green flex-shrink-0" size={14}/>{f}
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-3">
                <Link href="/contact" className="btn-solar px-6 py-3">Get Free Quote</Link>
                <Link href="/about" className="btn-outline px-6 py-3">About Us</Link>
              </div>
            </div>
            <div className="order-1 lg:order-2 relative">
              <div className="absolute inset-0 bg-solar-yellow/5 rounded-2xl blur-2xl" />
              <div className="relative glass-dark rounded-2xl overflow-hidden border border-solar-yellow/18">
                <Image src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=420&fit=crop" alt="Why Choose Green Aura Solar" width={600} height={420} className="w-full object-cover opacity-85" />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-900/75 to-transparent" />
                <div className="absolute bottom-4 left-3 right-3 grid grid-cols-2 gap-2.5">
                  {[{v:'600+',l:'PM Surya Ghar'},{v:'50+',l:'Commercial'}].map(({v,l})=>(
                    <div key={l} className="glass rounded-xl p-3 border border-solar-yellow/18 text-center">
                      <div className="gradient-text text-xl" style={{ fontFamily: 'Rajdhani,sans-serif', fontWeight: 700 }}>{v}</div>
                      <div className="text-white/55 text-xs">{l} Projects</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ STATS ══ */}
      <section className="py-12" style={{ background: 'linear-gradient(135deg,rgba(245,166,35,0.07),rgba(34,197,94,0.05))' }}>
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-solar-yellow/25 to-transparent" />
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-5 sm:gap-8 text-center">
            {[{n:6,s:'+',l:'Years Experience',e:'⭐'},{n:600,s:'+',l:'PM Surya Ghar',e:'☀️'},{n:50,s:'+',l:'Commercial Projects',e:'🏢'},{n:500,s:'+',l:'Happy Clients',e:'😊'}].map(({n,s,l,e})=>(
              <div key={l}>
                <div className="text-3xl mb-1">{e}</div>
                <div className="gradient-text text-3xl sm:text-4xl" style={{ fontFamily: 'Rajdhani,sans-serif', fontWeight: 700 }}><Counter end={n} suffix={s}/></div>
                <div className="text-white/45 text-xs sm:text-sm mt-1">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Calculator />
      <Testimonials />

      {/* ══ CONTACT CTA ══ */}
      <section className="py-16 md:py-20 relative overflow-hidden hero-gradient">
        <div className="absolute inset-0 grid-bg opacity-15" />
        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <div className="section-badge mb-4"><FaSun />Start Today</div>
          <h2 className="section-heading text-white mb-3">Ready to Go <span className="gradient-text">Solar?</span></h2>
          <p className="text-white/55 text-sm sm:text-base mb-7 max-w-xl mx-auto">Join 500+ happy customers across Odisha. Get your FREE solar consultation today!</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link href="/contact" className="btn-solar text-base px-8 py-3.5">Get Free Consultation</Link>
            <a href="tel:+919124632683" className="btn-outline text-base px-8 py-3.5 flex items-center gap-2"><FaPhone size={13}/>Call Now</a>
          </div>
          <p className="text-white/25 text-xs mt-5">No commitment • Free site assessment • PM Surya Ghar subsidy help</p>
        </div>
      </section>
    </div>
  )
}
