import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { FaCheckCircle, FaArrowRight, FaLeaf } from 'react-icons/fa'

export const metadata: Metadata = {
  title: 'About Us | Green Aura Solar - 6+ Years Solar Excellence in Odisha',
  description: "Green Aura Solar — Odisha's trusted solar company with 600+ PM Surya Ghar projects and 500+ happy clients.",
}

const TIMELINE = [
  { year:'2018', title:'Company Founded', desc:'Green Aura Solar established in Bhubaneswar with a vision for clean renewable energy.' },
  { year:'2019', title:'First 50 Installs', desc:'Completed 50 residential solar installations across Bhubaneswar and Khordha.' },
  { year:'2020', title:'Commercial Expansion', desc:'Expanded into commercial solar for offices and factories across Odisha.' },
  { year:'2021', title:'Industrial Projects', desc:'First large-scale industrial solar plant deployed in Odisha.' },
  { year:'2022', title:'300+ Milestone', desc:'Crossed 300 successful installations with 99% customer satisfaction rate.' },
  { year:'2023', title:'PM Surya Ghar Certified', desc:'Became certified installer under PM Surya Ghar Muft Bijli Yojana.' },
  { year:'2024', title:'600+ PM Surya Ghar', desc:'Completed 600+ PM Surya Ghar projects making us Odisha\'s top installer.' },
]

const TEAM = [
  { name:'Rahul Pradhan', role:'Founder & CEO', img:'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face' },
  { name:'Anjali Nayak', role:'Solar Engineer', img:'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face' },
  { name:'Bikash Mohanty', role:'Project Manager', img:'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face' },
  { name:'Priya Das', role:'Customer Relations', img:'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face' },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-navy-900 pt-20">
      {/* Header */}
      <section className="relative py-14 sm:py-20 hero-gradient overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-20" />
        <div className="relative z-10 max-w-3xl mx-auto px-4 text-center">
          <div className="section-badge mb-3"><FaLeaf />About Us</div>
          <h1 className="section-heading text-white mb-3">Powering Odisha with <span className="gradient-text">Clean Solar Energy</span></h1>
          <p className="text-white/55 text-sm sm:text-base max-w-xl mx-auto">6+ years of excellence, 600+ PM Surya Ghar projects, 500+ happy clients across Odisha</p>
        </div>
      </section>

      {/* Who We Are */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center mb-16">
            <div>
              <div className="section-badge mb-3">Our Story</div>
              <h2 className="section-heading text-white mb-5">Who We <span className="gradient-text">Are</span></h2>
              <div className="space-y-4 text-white/55 leading-relaxed text-sm sm:text-base">
                <p>Green Aura Solar is a forward-thinking solar energy company dedicated to providing clean, sustainable and affordable energy solutions for homes, businesses, industries and communities across Odisha.</p>
                <p>We specialize in high-quality solar panel installation, system design, maintenance and energy consulting. Our certified engineers bring years of technical expertise to every project.</p>
                <p>Since 2018, we have been transforming Odisha's energy landscape — one rooftop at a time. Our 600+ successful PM Surya Ghar installations make us one of the most trusted solar installers in the state.</p>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-solar-yellow/5 rounded-2xl blur-2xl" />
              <div className="relative glass-dark rounded-2xl overflow-hidden border border-solar-yellow/15">
                <Image src="https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=600&h=420&fit=crop" alt="About Green Aura Solar" width={600} height={420} className="w-full object-cover" style={{ maxHeight:'360px' }} />
              </div>
            </div>
          </div>

          {/* Mission & Vision */}
          <div className="grid sm:grid-cols-2 gap-5 mb-16">
            {[
              { icon:'🎯', title:'Our Mission', text:"To accelerate the transition toward renewable energy by delivering reliable, cost-effective and eco-friendly solar solutions that benefit homeowners, businesses and the environment." },
              { icon:'🔭', title:'Our Vision', text:"To become the leading solar energy company in Odisha — recognized for innovation, trust and measurable environmental impact, making clean energy accessible to every household." },
            ].map(({ icon, title, text }) => (
              <div key={title} className="glass-dark rounded-2xl p-6 sm:p-8 border border-white/5 card-hover">
                <div className="text-5xl mb-4">{icon}</div>
                <h3 style={{ fontFamily:'Rajdhani,sans-serif', fontWeight:700, color:'#fff', fontSize:'1.4rem' }} className="mb-3">{title}</h3>
                <p className="text-white/55 leading-relaxed text-sm sm:text-base">{text}</p>
              </div>
            ))}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-16">
            {[['6+','Years Experience','⭐'],['600+','PM Surya Ghar','☀️'],['50+','Commercial Projects','🏢'],['500+','Happy Clients','😊']].map(([v,l,e])=>(
              <div key={l} className="stat-card text-center">
                <div className="text-3xl mb-2">{e}</div>
                <div className="gradient-text text-2xl sm:text-3xl" style={{ fontFamily:'Rajdhani,sans-serif', fontWeight:700 }}>{v}</div>
                <div className="text-white/45 text-xs sm:text-sm mt-1">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-14 sm:py-20 relative">
        <div className="absolute inset-0 grid-bg opacity-20" />
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <div className="section-badge">Journey</div>
            <h2 className="section-heading text-white">Our <span className="gradient-text">Timeline</span></h2>
          </div>
          <div className="relative pl-8 sm:pl-0">
            {/* Vertical line */}
            <div className="absolute left-3 sm:left-1/2 sm:-translate-x-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-solar-yellow via-energy-green to-transparent" />
            <div className="space-y-6 sm:space-y-8">
              {TIMELINE.map(({ year, title, desc }, i) => (
                <div key={year} className={`relative sm:flex ${i % 2 === 0 ? 'sm:flex-row' : 'sm:flex-row-reverse'} sm:gap-8 items-center`}>
                  {/* Dot */}
                  <div className="absolute left-0 sm:static sm:flex-none sm:w-4 flex items-center justify-center">
                    <div className="w-4 h-4 rounded-full bg-solar-yellow border-4 border-navy-900 sm:absolute sm:left-1/2 sm:-translate-x-1/2 flex-shrink-0" style={{ boxShadow:'0 0 12px rgba(245,166,35,0.6)' }} />
                  </div>
                  {/* Card */}
                  <div className={`flex-1 ${i % 2 === 0 ? 'sm:text-right sm:pr-8' : 'sm:pl-8'}`}>
                    <div className="glass-dark rounded-xl p-4 sm:p-5 border border-white/5 card-hover inline-block w-full sm:max-w-xs">
                      <div className="gradient-text text-xl sm:text-2xl mb-1" style={{ fontFamily:'Rajdhani,sans-serif', fontWeight:700 }}>{year}</div>
                      <h3 className="text-white font-semibold text-sm sm:text-base mb-1">{title}</h3>
                      <p className="text-white/45 text-xs sm:text-sm">{desc}</p>
                    </div>
                  </div>
                  <div className="hidden sm:block flex-1" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-14 sm:py-20" id="why-us">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="section-badge">Why Choose Us</div>
            <h2 className="section-heading text-white">Why Odisha Trusts <span className="gradient-text">Green Aura Solar</span></h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon:'🏆', title:'Certified Experts', desc:'Govt-certified installers with MNRE and DISCOM approvals for all of Odisha.' },
              { icon:'⚡', title:'High Efficiency', desc:'Tier-1 panels with 21%+ efficiency and 25-year performance warranty.' },
              { icon:'🛡️', title:'Reliable Warranty', desc:'Comprehensive coverage on panels, inverters and installation work.' },
              { icon:'💰', title:'Affordable', desc:'Competitive pricing, easy EMI options and full subsidy assistance.' },
              { icon:'🌱', title:'Eco-Friendly', desc:"Contributing to Odisha's clean energy goals and reducing carbon footprint." },
              { icon:'📞', title:'24/7 Support', desc:'Round-the-clock customer support and emergency maintenance service.' },
              { icon:'📋', title:'Subsidy Experts', desc:'600+ PM Surya Ghar cases — we handle all paperwork end to end.' },
              { icon:'🔬', title:'Custom Solutions', desc:'Every system designed specifically for your energy needs and roof type.' },
            ].map(({ icon, title, desc }) => (
              <div key={title} className="glass-dark rounded-2xl p-4 sm:p-6 border border-white/5 card-hover text-center">
                <div className="text-3xl sm:text-4xl mb-2 sm:mb-3">{icon}</div>
                <h3 style={{ fontFamily:'Rajdhani,sans-serif', fontWeight:700, color:'#fff', fontSize:'clamp(0.9rem,3vw,1.1rem)' }} className="mb-1.5">{title}</h3>
                <p className="text-white/45 text-xs sm:text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-14 sm:py-20 relative">
        <div className="absolute inset-0 grid-bg opacity-20" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <div className="section-badge">Our Team</div>
            <h2 className="section-heading text-white">Meet the <span className="gradient-text">Experts</span></h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-5 sm:gap-6">
            {TEAM.map(({ name, role, img }) => (
              <div key={name} className="text-center card-hover group">
                <div className="relative w-20 h-20 sm:w-28 sm:h-28 mx-auto mb-3 rounded-2xl overflow-hidden border-2 border-solar-yellow/18 group-hover:border-solar-yellow/55 transition-colors" style={{ boxShadow:'0 0 0 0 rgba(245,166,35,0)' }}>
                  <Image src={img} alt={name} fill className="object-cover" sizes="112px" />
                </div>
                <div style={{ fontFamily:'Rajdhani,sans-serif', fontWeight:700, color:'#fff', fontSize:'clamp(0.9rem,3vw,1.05rem)' }}>{name}</div>
                <div className="text-solar-yellow text-xs sm:text-sm">{role}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-16 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="section-heading text-white mb-3">Let's Power Your <span className="gradient-text">Future Together</span></h2>
          <p className="text-white/50 text-sm sm:text-base mb-7">Contact Green Aura Solar for a free site assessment and custom solar quote today.</p>
          <Link href="/contact" className="btn-solar text-base px-10 py-3.5 inline-flex items-center gap-2">Get Free Consultation <FaArrowRight size={13}/></Link>
        </div>
      </section>
    </div>
  )
}
