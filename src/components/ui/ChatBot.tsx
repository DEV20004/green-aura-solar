'use client'
import { useState, useRef, useEffect } from 'react'
import { FaTimes, FaPaperPlane, FaRobot } from 'react-icons/fa'

const RESPONSES: Record<string, string> = {
  default: "Hi! I'm Aura ☀️, your solar assistant. Ask me about services, pricing, PM Surya Ghar, or anything solar!",
  greeting: "Hello! Welcome to Green Aura Solar 🌞 How can I help you today?",
  services: "We offer:\n☀️ Residential Solar\n🏢 Commercial Solar\n🏭 Industrial Systems\n🔋 Battery Backup\n🔧 Solar Maintenance\n🏛️ PM Surya Ghar Assistance",
  price: "Solar costs vary by capacity:\n• 1kW: ~₹40,000-₹60,000 (after subsidy)\n• 3kW: ~₹80,000-₹1,00,000 (after subsidy)\n• PM Surya Ghar gives upto ₹78,000 subsidy!\n\nCall +91 9124632683 for exact quote.",
  subsidy: "PM Surya Ghar Muft Bijli Yojana:\n✅ Up to 3kW → 60% subsidy\n✅ 3-10kW → 40% subsidy\n✅ Max subsidy = ₹78,000\n✅ 300 units FREE electricity/month\n\nWe handle ALL paperwork for you!",
  contact: "📞 +91 9124632683\n📞 +91 9178620451\n📧 sgreenaura2023@gmail.com\n📍 Palasuni, Bhubaneswar\n\nOr fill the Contact form on the website!",
  warranty: "🛡️ 25-year panel performance warranty\n🛡️ 5-10 year product warranty\n🛡️ 1-year installation warranty\nAll backed by our certified engineers!",
  maintenance: "We offer Annual Maintenance Contracts (AMC):\n✅ Panel cleaning\n✅ Inverter health check\n✅ Performance monitoring\n✅ Wiring inspection\n\nCall us to set up AMC!",
  roi: "Great question! Typically:\n💰 Payback period: 3-5 years\n💰 After payback: 80-100% savings for 20+ years\n💰 Total 25yr benefit: ₹5-10 lakh\n\nUse our calculator on the Home page!",
  location: "We serve all of Odisha:\n✅ Bhubaneswar\n✅ Cuttack, Puri\n✅ Khordha, Berhampur\n✅ Sambalpur and more!",
}

function getResponse(msg: string): string {
  const m = msg.toLowerCase()
  if (m.match(/hi|hello|hey|namaste|good/)) return RESPONSES.greeting
  if (m.match(/service|offer|what do|provide/)) return RESPONSES.services
  if (m.match(/price|cost|rate|charge|how much|₹|rupee|money/)) return RESPONSES.price
  if (m.match(/subsidy|surya ghar|pm|government|scheme|free/)) return RESPONSES.subsidy
  if (m.match(/contact|phone|number|email|address|location|office|where/)) return RESPONSES.contact
  if (m.match(/warranty|guarantee|how long/)) return RESPONSES.warranty
  if (m.match(/maintain|service|repair|clean|amc/)) return RESPONSES.maintenance
  if (m.match(/roi|return|saving|benefit|profit|payback|invest/)) return RESPONSES.roi
  if (m.match(/area|city|district|state|serve|odisha|bhubaneswar/)) return RESPONSES.location
  return "Thanks for asking! For detailed info, please call us at +91 9124632683 or visit the Contact page. Our team is happy to help! 😊"
}

interface Msg { role: 'bot' | 'user'; text: string; time: string }

export default function ChatBot() {
  const [open, setOpen] = useState(false)
  const [msgs, setMsgs] = useState<Msg[]>([{ role: 'bot', text: RESPONSES.default, time: '' }])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [msgs, typing])

  const send = (text: string) => {
    if (!text.trim()) return
    const t = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    setMsgs(m => [...m, { role: 'user', text, time: t }])
    setInput('')
    setTyping(true)
    setTimeout(() => {
      setTyping(false)
      setMsgs(m => [...m, { role: 'bot', text: getResponse(text), time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }])
    }, 900)
  }

  return (
    <div className="chatbot-wrap">
      {open && (
        <div className="mb-3 w-[320px] sm:w-[360px] glass-dark rounded-2xl overflow-hidden border border-solar-yellow/20 flex flex-col" style={{ height: '430px' }}>
          {/* Header */}
          <div className="flex items-center gap-3 px-4 py-3" style={{ background: 'linear-gradient(135deg,#F5A623,#D97706)' }}>
            <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center"><FaRobot size={17} className="text-white" /></div>
            <div className="flex-1">
              <div style={{ fontFamily: 'Rajdhani,sans-serif', fontWeight: 700, color: '#0A0F1E', fontSize: '0.95rem' }}>Aura — Solar AI</div>
              <div className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" /><span style={{ color: '#0A0F1E', fontSize: '0.7rem', opacity: 0.75 }}>Online now</span></div>
            </div>
            <button onClick={() => setOpen(false)} className="text-navy-900/70 hover:text-navy-900"><FaTimes size={15} /></button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-3 space-y-3">
            {msgs.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[82%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                  m.role === 'user' ? 'bg-solar-yellow text-navy-900 font-semibold rounded-br-none' : 'bg-white/6 border border-white/8 text-white/90 rounded-bl-none'
                }`} style={{ whiteSpace: 'pre-line' }}>
                  {m.text}
                  {m.time && <div className={`text-xs mt-1 ${m.role === 'user' ? 'text-navy-900/50' : 'text-white/30'}`}>{m.time}</div>}
                </div>
              </div>
            ))}
            {typing && (
              <div className="flex justify-start">
                <div className="bg-white/6 border border-white/8 rounded-2xl rounded-bl-none px-4 py-3 flex gap-1.5">
                  {[0,1,2].map(i => <span key={i} className="w-2 h-2 rounded-full bg-solar-yellow animate-bounce" style={{ animationDelay: i*0.15+'s' }} />)}
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Quick replies */}
          <div className="px-3 py-2 flex gap-2 overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
            {['Services','Pricing','PM Surya Ghar','Contact','Warranty'].map(q => (
              <button key={q} onClick={() => send(q)} className="whitespace-nowrap text-xs px-3 py-1.5 rounded-full border border-solar-yellow/30 text-solar-yellow hover:bg-solar-yellow/10 transition-colors flex-shrink-0">{q}</button>
            ))}
          </div>

          {/* Input */}
          <div className="p-3 border-t border-white/5 flex gap-2">
            <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && send(input)}
              placeholder="Ask anything..." className="form-input flex-1 text-sm py-2" />
            <button onClick={() => send(input)} className="w-9 h-9 rounded-xl bg-solar-yellow flex items-center justify-center hover:bg-solar-amber transition-colors flex-shrink-0">
              <FaPaperPlane size={13} className="text-navy-900" />
            </button>
          </div>
        </div>
      )}

      <button onClick={() => setOpen(!open)} className="w-14 h-14 rounded-full flex items-center justify-center ml-auto transition-all hover:scale-110"
        style={{ background: 'linear-gradient(135deg,#F5A623,#D97706)', boxShadow: '0 0 25px rgba(245,166,35,0.5)' }}>
        {open ? <FaTimes size={19} className="text-navy-900" /> : <FaRobot size={22} className="text-navy-900" />}
      </button>
    </div>
  )
}
