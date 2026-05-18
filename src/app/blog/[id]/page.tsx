import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { FaCalendar, FaUser, FaArrowLeft, FaWhatsapp, FaFacebook, FaPhone } from 'react-icons/fa'
import { notFound } from 'next/navigation'

const BLOGS: Record<string, any> = {
  '1': {
    title: 'PM Surya Ghar Muft Bijli Yojana: Complete Guide for Odisha',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&h=500&fit=crop',
    cat: 'Government Scheme', author: 'Green Aura Team', date: '2024-05-10',
    content: [
      { type:'h2', text:'What is PM Surya Ghar?' },
      { type:'p', text:"PM Surya Ghar Muft Bijli Yojana is a central government scheme to provide free electricity to households through rooftop solar panels. Eligible families get 300 units FREE electricity per month and subsidy up to ₹78,000." },
      { type:'h2', text:'Subsidy Structure' },
      { type:'list', items:['Up to 2kW system: 60% subsidy on benchmark cost','2kW to 3kW: 60% for first 2kW + 40% for remaining','Above 3kW: Fixed subsidy of ₹78,000'] },
      { type:'h2', text:'Who Can Apply?' },
      { type:'p', text:"Any Indian household with a valid DISCOM electricity connection can apply. No income limit. You need: Valid electricity account, Aadhaar card, bank account, and suitable roof space." },
      { type:'h2', text:'How Green Aura Solar Helps' },
      { type:'list', items:['Free consultation and site assessment','Complete online registration on pmsuryaghar.gov.in','All document preparation and submission','DISCOM coordination and approval','Professional solar installation','Net meter application and approval','Subsidy claim filing and disbursement'] },
      { type:'h2', text:'Benefits for Odisha Families' },
      { type:'p', text:"Odisha receives excellent solar irradiation (4.5-5.5 kWh/m²/day). A 3kW system generates 12-15 units daily. At ₹8/unit, that saves ₹2,800-₹3,600 monthly. Investment payback in just 3-4 years!" },
      { type:'callout', text:'Ready to apply? Call us at +91 9124632683. We handle everything — you just wait for approval!' },
    ]
  },
  '2': {
    title: 'How Much Can You Save with Solar in Bhubaneswar? Real Numbers',
    image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1200&h=500&fit=crop',
    cat: 'Savings', author: 'Rahul Pradhan', date: '2024-04-22',
    content: [
      { type:'h2', text:'Real Savings from Our Installations' },
      { type:'p', text:"Based on 500+ installations in Bhubaneswar, here's what our customers actually experience after going solar." },
      { type:'h2', text:'Typical 3-Bedroom House (300 units/month)' },
      { type:'list', items:['Before solar: ₹2,400/month (₹28,800/year)','After 3kW solar: ₹200-400/month (fixed charges only)','Annual saving: ₹24,000 - ₹26,000'] },
      { type:'h2', text:'Investment & ROI' },
      { type:'list', items:['3kW system market price: ₹1,80,000','PM Surya Ghar subsidy: -₹78,000','Your net cost: ₹1,02,000','Annual savings: ₹24,000','Payback period: ~4.2 years','25-year total benefit: ~₹6,00,000'] },
      { type:'h2', text:'Bhubaneswar Solar Advantage' },
      { type:'p', text:"Bhubaneswar receives 5.2 peak solar hours daily — 15% above the national average. This means your 3kW system generates ~5,700 units per year, maximizing your savings compared to other cities." },
      { type:'h2', text:'Real Customer Cases' },
      { type:'list', items:['Patrapada family: Bill from ₹3,200 to ₹180/month (saving ₹36,240/year)','Saheed Nagar commercial: Bill from ₹45,000 to ₹8,000/month (saving ₹4.4 lakh/year)','Khordha school: 10kW system saving ₹1.2 lakh annually'] },
      { type:'callout', text:'Call +91 9124632683 for your personalized savings calculation. Free, no obligation!' },
    ]
  },
  '3': { title:'Residential vs Commercial Solar', image:'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=1200&h=500&fit=crop', cat:'Guides', author:'Anjali Nayak', date:'2024-04-05', content:[{ type:'p', text:'Detailed comparison coming soon. Contact us for personalized advice.' }] },
  '4': { title:'Battery Backup vs Grid-Connected Solar', image:'https://images.unsplash.com/photo-1620714223084-8fcacc2dbe8d?w=1200&h=500&fit=crop', cat:'Technology', author:'Bikash Mohanty', date:'2024-03-18', content:[{ type:'p', text:'Detailed comparison coming soon. Contact us for personalized advice.' }] },
  '5': { title:'Solar Panel Maintenance Tips', image:'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=500&fit=crop', cat:'Maintenance', author:'Green Aura Team', date:'2024-03-01', content:[{ type:'p', text:'Maintenance guide coming soon. Contact us for AMC information.' }] },
  '6': { title:'Net Metering in Odisha Guide', image:'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=1200&h=500&fit=crop', cat:'Guides', author:'Anjali Nayak', date:'2024-02-14', content:[{ type:'p', text:'Net metering guide coming soon. Contact us for more information.' }] },
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const blog = BLOGS[params.id]
  if (!blog) return { title: 'Blog Not Found' }
  return { title: `${blog.title} | Green Aura Solar Blog`, description: blog.content?.[0]?.text || '' }
}

export default function BlogPost({ params }: { params: { id: string } }) {
  const blog = BLOGS[params.id]
  if (!blog) notFound()

  return (
    <div className="min-h-screen bg-navy-900 pt-20">
      {/* Hero */}
      <div className="relative h-48 sm:h-72 md:h-80 overflow-hidden">
        <Image src={blog.image} alt={blog.title} fill className="object-cover opacity-55" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-navy-900/60 to-transparent" />
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 -mt-16 sm:-mt-24 relative z-10 pb-16 sm:pb-20">
        <Link href="/blog" className="inline-flex items-center gap-2 text-white/45 hover:text-solar-yellow transition-colors text-sm mb-5">
          <FaArrowLeft size={11}/> Back to Blog
        </Link>

        {/* Meta */}
        <div className="flex flex-wrap items-center gap-2.5 mb-4">
          <span className="section-badge">{blog.cat}</span>
          <span className="text-white/35 text-xs flex items-center gap-1"><FaCalendar size={9}/>{new Date(blog.date).toLocaleDateString('en-IN',{day:'2-digit',month:'long',year:'numeric'})}</span>
          <span className="text-white/35 text-xs flex items-center gap-1"><FaUser size={9}/>{blog.author}</span>
        </div>

        <h1 className="section-heading text-white mb-8 leading-tight">{blog.title}</h1>

        {/* Content */}
        <div className="glass-dark rounded-2xl p-5 sm:p-8 border border-white/5 mb-7 space-y-4">
          {blog.content.map((block: any, i: number) => {
            if (block.type === 'h2') return <h2 key={i} style={{ fontFamily:'Rajdhani,sans-serif', fontWeight:700, color:'#fff', fontSize:'clamp(1.2rem,4vw,1.6rem)', marginTop: i > 0 ? '1.5rem' : 0 }}>{block.text}</h2>
            if (block.type === 'p') return <p key={i} className="text-white/65 leading-relaxed text-sm sm:text-base">{block.text}</p>
            if (block.type === 'list') return <ul key={i} className="space-y-2">{block.items.map((item: string, j: number) => <li key={j} className="flex items-start gap-2 text-white/65 text-sm sm:text-base"><span className="text-solar-yellow mt-1 flex-shrink-0">•</span>{item}</li>)}</ul>
            if (block.type === 'callout') return <div key={i} className="glass-solar rounded-xl p-4 border border-solar-yellow/25 text-solar-yellow font-semibold text-sm sm:text-base">{block.text}</div>
            return null
          })}
        </div>

        {/* Share */}
        <div className="flex items-center gap-3 flex-wrap mb-7">
          <span className="text-white/35 text-sm">Share:</span>
          <a href={`https://wa.me/?text=${encodeURIComponent(blog.title + ' - Green Aura Solar')}`} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-green-500/12 border border-green-500/25 text-green-400 text-sm hover:bg-green-500/22 transition-colors">
            <FaWhatsapp size={13}/>WhatsApp
          </a>
          <a href={`https://www.facebook.com/sharer/sharer.php?u=https://greenaurasolar.com/blog/${params.id}`} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-500/12 border border-blue-500/25 text-blue-400 text-sm hover:bg-blue-500/22 transition-colors">
            <FaFacebook size={13}/>Facebook
          </a>
        </div>

        {/* CTA */}
        <div className="glass-solar rounded-2xl p-6 border border-solar-yellow/18 text-center">
          <h3 style={{ fontFamily:'Rajdhani,sans-serif', fontWeight:700, color:'#fff', fontSize:'1.3rem' }} className="mb-2">Interested in Going Solar?</h3>
          <p className="text-white/55 text-sm mb-4">Get a free consultation from Green Aura Solar. We serve all of Odisha.</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link href="/contact" className="btn-solar px-6 py-2.5 text-sm">Get Free Quote</Link>
            <a href="tel:+919124632683" className="btn-outline px-6 py-2.5 text-sm flex items-center gap-1.5"><FaPhone size={12}/>Call Now</a>
          </div>
        </div>
      </div>
    </div>
  )
}
