import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { FaCalendar, FaUser, FaArrowRight } from 'react-icons/fa'

export const metadata: Metadata = {
  title: 'Solar Blog | Green Aura Solar - Tips, News & Guides',
  description: 'Solar energy tips, PM Surya Ghar updates, savings guides and Odisha solar news from Green Aura Solar.',
}

const BLOGS = [
  { id:'1', title:'PM Surya Ghar Muft Bijli Yojana: Complete Guide for Odisha', excerpt:'Everything about the PM Surya Ghar scheme — eligibility, subsidy amount, application process, and how we handle it all for you.', image:'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=340&fit=crop', cat:'Government Scheme', author:'Green Aura Team', date:'2024-05-10', featured:true },
  { id:'2', title:'How Much Can You Save with Solar in Bhubaneswar? Real Numbers', excerpt:'Actual electricity bill savings data from our 500+ installations. See the real ROI numbers from customers in Bhubaneswar.', image:'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=600&h=340&fit=crop', cat:'Savings', author:'Rahul Pradhan', date:'2024-04-22', featured:true },
  { id:'3', title:'Residential vs Commercial Solar: Which is Right for You?', excerpt:'Key differences between home and commercial solar — capacity, cost, ROI and subsidy eligibility explained simply.', image:'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&h=340&fit=crop', cat:'Guides', author:'Anjali Nayak', date:'2024-04-05' },
  { id:'4', title:'Battery Backup vs Grid-Connected Solar in 2024', excerpt:'Which system suits Odisha homes better? Comparing options given frequent power cuts in the state.', image:'https://images.unsplash.com/photo-1620714223084-8fcacc2dbe8d?w=600&h=340&fit=crop', cat:'Technology', author:'Bikash Mohanty', date:'2024-03-18' },
  { id:'5', title:'Solar Panel Maintenance Tips to Maximize Efficiency', excerpt:'Simple but effective maintenance practices to keep your solar system performing at peak efficiency for 25+ years.', image:'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=340&fit=crop', cat:'Maintenance', author:'Green Aura Team', date:'2024-03-01' },
  { id:'6', title:'Net Metering in Odisha: Sell Excess Solar Power to the Grid', excerpt:'Step-by-step guide to net metering with TPCODL, SOUTHCO and WESCO. Earn money from your excess solar energy.', image:'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=600&h=340&fit=crop', cat:'Guides', author:'Anjali Nayak', date:'2024-02-14' },
]

const CATS = ['All','Government Scheme','Savings','Technology','Guides','Maintenance']

function fmtDate(d: string) {
  return new Date(d).toLocaleDateString('en-IN', { day:'2-digit', month:'short', year:'numeric' })
}

export default function BlogPage() {
  const featured = BLOGS.filter(b => b.featured)
  const rest = BLOGS.filter(b => !b.featured)

  return (
    <div className="min-h-screen bg-navy-900 pt-20">
      {/* Header */}
      <section className="relative py-14 sm:py-20 hero-gradient overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-20" />
        <div className="relative z-10 max-w-3xl mx-auto px-4 text-center">
          <div className="section-badge mb-3">📰 Solar Blog</div>
          <h1 className="section-heading text-white mb-3">Solar Energy <span className="gradient-text">Insights & Guides</span></h1>
          <p className="text-white/55 text-sm sm:text-base max-w-xl mx-auto">Stay updated with the latest solar news, tips and PM Surya Ghar updates for Odisha</p>
        </div>
      </section>

      {/* Category Filter */}
      <div className="border-b border-white/5 bg-navy-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth:'none' }}>
            {CATS.map(c => (
              <button key={c} className="whitespace-nowrap px-4 py-1.5 rounded-full text-sm font-semibold border border-white/10 text-white/55 hover:text-solar-yellow hover:border-solar-yellow/35 transition-all flex-shrink-0">{c}</button>
            ))}
          </div>
        </div>
      </div>

      {/* Featured */}
      <section className="py-14 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 style={{ fontFamily:'Rajdhani,sans-serif', fontWeight:700, color:'#fff', fontSize:'1.3rem' }} className="mb-6">📌 Featured Articles</h2>
          <div className="grid sm:grid-cols-2 gap-5 mb-14">
            {featured.map(b => (
              <Link key={b.id} href={`/blog/${b.id}`} className="group block glass-dark rounded-2xl overflow-hidden border border-white/5 hover:border-solar-yellow/25 transition-all card-hover">
                <div className="overflow-hidden" style={{ height:'clamp(160px,25vw,220px)' }}>
                  <Image src={b.image} alt={b.title} width={600} height={340} className="blog-thumb w-full h-full object-cover" />
                </div>
                <div className="p-5 sm:p-6">
                  <div className="flex items-center gap-2.5 mb-3 flex-wrap">
                    <span className="text-xs px-2.5 py-1 rounded-full bg-solar-yellow/14 text-solar-yellow border border-solar-yellow/22 font-semibold">{b.cat}</span>
                    <span className="text-white/30 text-xs flex items-center gap-1"><FaCalendar size={9}/>{fmtDate(b.date)}</span>
                  </div>
                  <h3 style={{ fontFamily:'Rajdhani,sans-serif', fontWeight:700, color:'#fff', fontSize:'clamp(1rem,3vw,1.25rem)', lineHeight:1.3 }} className="group-hover:text-solar-yellow transition-colors mb-2">{b.title}</h3>
                  <p className="text-white/45 text-sm leading-relaxed mb-4">{b.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-white/35 text-xs flex items-center gap-1"><FaUser size={9}/>{b.author}</span>
                    <span className="text-solar-yellow text-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">Read More <FaArrowRight size={11}/></span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <h2 style={{ fontFamily:'Rajdhani,sans-serif', fontWeight:700, color:'#fff', fontSize:'1.3rem' }} className="mb-6">📚 All Articles</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {rest.map(b => (
              <Link key={b.id} href={`/blog/${b.id}`} className="group block glass-dark rounded-2xl overflow-hidden border border-white/5 hover:border-solar-yellow/22 transition-all card-hover">
                <div className="overflow-hidden" style={{ height:'clamp(130px,20vw,180px)' }}>
                  <Image src={b.image} alt={b.title} width={600} height={340} className="blog-thumb w-full h-full object-cover" />
                </div>
                <div className="p-4 sm:p-5">
                  <span className="text-xs px-2.5 py-1 rounded-full bg-energy-green/12 text-energy-green border border-energy-green/22 font-semibold mb-3 inline-block">{b.cat}</span>
                  <h3 style={{ fontFamily:'Rajdhani,sans-serif', fontWeight:700, color:'#fff', fontSize:'1rem', lineHeight:1.3 }} className="group-hover:text-solar-yellow transition-colors mb-2">{b.title}</h3>
                  <p className="text-white/40 text-sm leading-relaxed mb-3 line-clamp-2">{b.excerpt}</p>
                  <div className="flex items-center justify-between text-xs text-white/28">
                    <span className="flex items-center gap-1"><FaUser size={9}/>{b.author}</span>
                    <span className="flex items-center gap-1"><FaCalendar size={9}/>{fmtDate(b.date)}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
