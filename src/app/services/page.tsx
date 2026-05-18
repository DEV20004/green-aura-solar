import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { FaCheckCircle, FaPhone, FaArrowRight, FaChevronDown } from 'react-icons/fa'
import { MdSolarPower } from 'react-icons/md'

export const metadata: Metadata = {
  title: 'Solar Services | Green Aura Solar Bhubaneswar Odisha',
  description: 'Residential, commercial & industrial solar installation. PM Surya Ghar assistance. Best solar company in Bhubaneswar, Odisha.',
}

const SERVICES = [
  { icon:'🏠', title:'Residential Solar', desc:'Complete home solar solutions with PM Surya Ghar subsidy. We handle everything — survey, design, installation, net metering and subsidy claim.', features:['Free site assessment','PM Surya Ghar (up to ₹78,000)','Net metering application','25-year panel warranty','Certified installation','Post-install support'], image:'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=600&h=380&fit=crop', badge:'Most Popular' },
  { icon:'🏢', title:'Commercial Solar Solutions', desc:'Reduce business electricity costs by up to 90%. Ideal for offices, shops, schools, hospitals and commercial buildings.', features:['Custom system design','High-efficiency panels','Minimal disruption','ROI analysis report','DISCOM approval','SCADA monitoring'], image:'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&h=380&fit=crop' },
  { icon:'🏭', title:'Industrial Solar Systems', desc:'Large-scale solar power plants for factories and warehouses. Maximum energy output with industrial-grade equipment.', features:['MW-scale installations','Industrial inverters','Remote monitoring','Energy audit included','Carbon credit help','Long-term AMC'], image:'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=600&h=380&fit=crop' },
  { icon:'🔧', title:'Solar Maintenance & AMC', desc:'Comprehensive Annual Maintenance Contracts to keep your system performing at peak efficiency and protect your investment.', features:['Panel cleaning','Inverter health check','Performance monitoring','Wiring inspection','String testing','Emergency response'], image:'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=380&fit=crop' },
  { icon:'🔋', title:'Battery Backup', desc:'Advanced lithium-ion storage systems for 24/7 uninterrupted power supply — perfect for Odisha\'s power situation.', features:['Lithium-ion batteries','Smart energy management','Grid-independent option','10-year battery warranty','App monitoring','Easy maintenance'], image:'https://images.unsplash.com/photo-1620714223084-8fcacc2dbe8d?w=600&h=380&fit=crop' },
  { icon:'🏛️', title:'PM Surya Ghar Assistance', desc:'600+ successful applications. We handle registration, DISCOM approval, subsidy claim and net meter — you just wait for approval!', features:['Online registration','Document preparation','DISCOM coordination','Subsidy claim filing','Net meter application','Inspection support'], image:'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=380&fit=crop', badge:'Govt. Scheme' },
]

const FAQS = [
  { q:'How much does a home solar system cost?', a:'A 3kW system costs ₹1,80,000 (market price). After PM Surya Ghar subsidy of ₹78,000, your net cost is ~₹1,02,000. EMI options also available.' },
  { q:'How long does installation take?', a:'Residential: 1-2 days. Commercial: 3-7 days depending on size. We minimize disruption to your daily routine.' },
  { q:'What is PM Surya Ghar Muft Bijli Yojana?', a:'A central government scheme giving 300 units FREE electricity/month and subsidy up to ₹78,000 for home rooftop solar. We handle all the paperwork.' },
  { q:'What warranty do you provide?', a:'25-year performance warranty on panels, 5-10 year warranty on inverters, and 1-year workmanship warranty on installation.' },
  { q:'Do you handle net metering in Odisha?', a:'Yes! We manage complete net metering with TPCODL, SOUTHCO, WESCO and NESCO so you can sell excess power back to the grid.' },
  { q:'Which areas of Odisha do you cover?', a:'All of Odisha — Bhubaneswar, Cuttack, Puri, Khordha, Berhampur, Sambalpur, Rourkela, Balasore, Baripada and more.' },
]

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-navy-900 pt-20">
      {/* Header */}
      <section className="relative py-14 sm:py-20 hero-gradient overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-20" />
        <div className="relative z-10 max-w-3xl mx-auto px-4 text-center">
          <div className="section-badge mb-3"><MdSolarPower />Our Services</div>
          <h1 className="section-heading text-white mb-3">Complete Solar <span className="gradient-text">Energy Services</span></h1>
          <p className="text-white/55 text-sm sm:text-base max-w-xl mx-auto">End-to-end solar solutions for homes, businesses and industries across Odisha</p>
        </div>
      </section>

      {/* Service Cards */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14 md:space-y-20">
          {SERVICES.map((s, i) => (
            <div key={s.title} className={`grid lg:grid-cols-2 gap-8 lg:gap-14 items-center`}>
              {/* Text - alternates left/right on desktop */}
              <div className={i % 2 === 1 ? 'lg:order-2' : ''}>
                {s.badge && <span className="inline-block mb-3 px-3 py-1 rounded-full text-xs font-semibold bg-solar-yellow/15 text-solar-yellow border border-solar-yellow/28">{s.badge}</span>}
                <div className="flex items-start gap-3 mb-3 flex-wrap">
                  <span className="text-4xl">{s.icon}</span>
                  <h2 style={{ fontFamily:'Rajdhani,sans-serif', fontWeight:700, color:'#fff', fontSize:'clamp(1.4rem,4vw,2rem)', lineHeight:1.2 }}>{s.title}</h2>
                </div>
                <p className="text-white/55 leading-relaxed mb-5 text-sm sm:text-base">{s.desc}</p>
                <div className="grid sm:grid-cols-2 gap-2 mb-6">
                  {s.features.map(f => (
                    <div key={f} className="flex items-center gap-2 text-white/70 text-sm">
                      <FaCheckCircle className="text-energy-green flex-shrink-0" size={12} />{f}
                    </div>
                  ))}
                </div>
                <Link href="/contact" className="btn-solar inline-flex items-center gap-2 px-6 py-3">Get Free Quote <FaArrowRight size={12}/></Link>
              </div>
              {/* Image */}
              <div className={i % 2 === 1 ? 'lg:order-1' : ''}>
                <div className="glass-dark rounded-2xl overflow-hidden border border-solar-yellow/12 card-hover">
                  <Image src={s.image} alt={s.title} width={600} height={380} className="w-full object-cover" style={{ height:'clamp(180px,30vw,300px)' }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PM Surya Ghar Banner */}
      <section className="py-12 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto glass-dark rounded-2xl p-7 sm:p-10 border border-solar-yellow/18 text-center">
          <div className="text-4xl sm:text-5xl mb-3">🏛️</div>
          <h2 className="section-heading text-white mb-3">PM Surya Ghar <span className="gradient-text">Muft Bijli Yojana</span></h2>
          <p className="text-white/55 text-sm sm:text-base mb-6 max-w-xl mx-auto">Get up to <strong className="text-solar-yellow">₹78,000 subsidy</strong> + <strong className="text-energy-green">300 units FREE electricity</strong> monthly. 600+ successful cases in Odisha!</p>
          <div className="grid grid-cols-3 gap-3 mb-6 max-w-xs sm:max-w-sm mx-auto">
            {[['≤3kW','60% off'],['3-10kW','40% off'],['Max','₹78,000']].map(([l,v])=>(
              <div key={l} className="glass rounded-xl p-3 border border-solar-yellow/18 text-center">
                <div className="gradient-text font-bold" style={{ fontFamily:'Rajdhani,sans-serif', fontSize:'1.1rem' }}>{v}</div>
                <div className="text-white/45 text-xs mt-0.5">{l}</div>
              </div>
            ))}
          </div>
          <Link href="/contact" className="btn-solar px-8 py-3.5">Apply for PM Surya Ghar Now</Link>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-14 sm:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <div className="section-badge">FAQ</div>
            <h2 className="section-heading text-white">Common <span className="gradient-text">Questions</span></h2>
          </div>
          <div className="space-y-3">
            {FAQS.map(({ q, a }) => (
              <details key={q} className="glass-dark rounded-xl border border-white/6 group overflow-hidden">
                <summary className="flex items-center justify-between gap-3 px-5 py-4 cursor-pointer text-white font-semibold text-sm sm:text-base hover:text-solar-yellow transition-colors list-none select-none">
                  <span>{q}</span>
                  <FaChevronDown className="text-white/35 flex-shrink-0 group-open:rotate-180 transition-transform duration-200" size={12} />
                </summary>
                <div className="px-5 pb-4 text-white/55 text-sm leading-relaxed">{a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-16 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="section-heading text-white mb-3">Ready to Start Your <span className="gradient-text">Solar Journey?</span></h2>
          <p className="text-white/50 text-sm sm:text-base mb-7">Free consultation, no obligation. We respond within 2 hours.</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <a href="tel:+919124632683" className="btn-solar px-7 py-3 flex items-center gap-2"><FaPhone size={13}/>+91 9124632683</a>
            <Link href="/contact" className="btn-outline px-7 py-3">Send Enquiry</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
