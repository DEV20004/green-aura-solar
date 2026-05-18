'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { FaSignOutAlt, FaEnvelope, FaCheck, FaTrash, FaBars, FaTimes, FaSun, FaTachometerAlt, FaPhone, FaExternalLinkAlt, FaSync } from 'react-icons/fa'
import { MdSolarPower } from 'react-icons/md'
import toast from 'react-hot-toast'

/* ── Login Form ── */
function LoginForm({ onLogin }: { onLogin: (token: string, user: any) => void }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const submit = async (e: React.FormEvent) => {
    e.preventDefault(); setLoading(true); setError('')
    try {
      const r = await fetch('/api/auth/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, password }) })
      const d = await r.json()
      if (r.ok) { localStorage.setItem('gas_token', d.token); localStorage.setItem('gas_user', JSON.stringify(d.user)); onLogin(d.token, d.user) }
      else setError(d.error || 'Login failed')
    } catch { setError('Network error. Please try again.') }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-navy-900 flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="relative w-20 h-20 mx-auto mb-4 rounded-full overflow-hidden border-2 border-solar-yellow/40" style={{ boxShadow: '0 0 30px rgba(245,166,35,0.35)' }}>
            <Image src="/logo.jpeg" alt="Green Aura Solar" fill className="object-cover" />
          </div>
          <h1 style={{ fontFamily: 'Rajdhani,sans-serif', fontWeight: 700, fontSize: '1.7rem', color: '#fff' }}>Admin Panel</h1>
          <p className="text-white/40 text-sm mt-1">Green Aura Solar Management</p>
        </div>

        <div className="glass-dark rounded-2xl p-7 border border-solar-yellow/18">
          {error && <div className="bg-red-500/10 border border-red-500/25 rounded-xl p-3 mb-5 text-red-400 text-sm text-center">{error}</div>}
          <form onSubmit={submit} className="space-y-4">
            <div>
              <label className="block text-white/65 text-sm mb-1.5 font-semibold">Admin Email</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="admin@greenaurasolar.com" className="form-input" required />
            </div>
            <div>
              <label className="block text-white/65 text-sm mb-1.5 font-semibold">Password</label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" className="form-input" required />
            </div>
            <button type="submit" disabled={loading} className="btn-solar w-full py-3 text-base">
              {loading ? 'Signing in...' : 'Sign In →'}
            </button>
          </form>
          <p className="text-white/25 text-xs text-center mt-4">Protected with JWT Authentication</p>
          <div className="mt-4 p-3 bg-solar-yellow/5 rounded-xl border border-solar-yellow/15 text-xs text-white/40 space-y-1">
            <p>📧 Default: admin@greenaurasolar.com</p>
            <p>🔑 Password: Set in .env.local file</p>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ── Dashboard ── */
interface Enq { _id: string; name: string; phone: string; email?: string; message: string; status: string; createdAt: string }

export default function AdminPage() {
  const [token, setToken] = useState<string|null>(null)
  const [user, setUser] = useState<any>(null)
  const [tab, setTab] = useState('dashboard')
  const [sideOpen, setSideOpen] = useState(false)
  const [enquiries, setEnquiries] = useState<Enq[]>([])
  const [loadingEnq, setLoadingEnq] = useState(false)

  useEffect(() => {
    const t = localStorage.getItem('gas_token')
    const u = localStorage.getItem('gas_user')
    if (t) { setToken(t); setUser(u ? JSON.parse(u) : {}) }
  }, [])

  useEffect(() => { if (token && tab === 'enquiries') loadEnquiries() }, [token, tab])

  const loadEnquiries = async () => {
    setLoadingEnq(true)
    try {
      const r = await fetch('/api/enquiry', { headers: { Authorization: `Bearer ${token}` } })
      const d = await r.json()
      if (d.enquiries) setEnquiries(d.enquiries)
      else toast.error('Connect MongoDB to see enquiries')
    } catch { toast.error('Failed to load enquiries') }
    setLoadingEnq(false)
  }

  const updateStatus = async (id: string, status: string) => {
    try {
      await fetch(`/api/enquiry/${id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }, body: JSON.stringify({ status }) })
      setEnquiries(es => es.map(e => e._id === id ? { ...e, status } : e))
      toast.success('Status updated!')
    } catch { toast.error('Update failed') }
  }

  const deleteEnq = async (id: string) => {
    if (!confirm('Delete this enquiry permanently?')) return
    try {
      await fetch(`/api/enquiry/${id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } })
      setEnquiries(es => es.filter(e => e._id !== id))
      toast.success('Deleted!')
    } catch { toast.error('Delete failed') }
  }

  const logout = () => { localStorage.removeItem('gas_token'); localStorage.removeItem('gas_user'); setToken(null) }

  if (!token) return <LoginForm onLogin={(t, u) => { setToken(t); setUser(u) }} />

  const newCount = enquiries.filter(e => e.status === 'new').length

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: FaTachometerAlt },
    { id: 'enquiries', label: 'Enquiries', icon: FaEnvelope, badge: newCount },
    { id: 'how-to', label: 'Setup Guide', icon: MdSolarPower },
  ]

  return (
    <div className="min-h-screen bg-navy-900 flex">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-60 admin-sidebar transition-transform duration-300 ${sideOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:static flex flex-col`}>
        <div className="p-5 border-b border-solar-yellow/10 flex items-center gap-3">
          <div className="relative w-9 h-9 rounded-full overflow-hidden border border-solar-yellow/35 flex-shrink-0">
            <Image src="/logo.jpeg" alt="Logo" fill className="object-cover" />
          </div>
          <div>
            <div style={{ fontFamily: 'Rajdhani,sans-serif', fontWeight: 700, color: '#fff', fontSize: '0.9rem', lineHeight: 1.1 }}>Green Aura Solar</div>
            <div className="text-white/35 text-xs">Admin Panel</div>
          </div>
          <button onClick={() => setSideOpen(false)} className="ml-auto lg:hidden text-white/35"><FaTimes size={15}/></button>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {tabs.map(({ id, label, icon: Icon, badge }) => (
            <button key={id} onClick={() => { setTab(id); setSideOpen(false) }}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all ${tab === id ? 'bg-solar-yellow/14 text-solar-yellow border border-solar-yellow/28' : 'text-white/55 hover:bg-white/5 hover:text-white'}`}
              style={{ fontFamily: 'Rajdhani,sans-serif', fontWeight: 600 }}>
              <Icon size={15}/>{label}
              {badge && badge > 0 ? <span className="ml-auto bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0">{badge}</span> : null}
            </button>
          ))}
          <div className="pt-2">
            <Link href="/" target="_blank" className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold text-white/55 hover:bg-white/5 hover:text-white transition-all"
              style={{ fontFamily: 'Rajdhani,sans-serif', fontWeight: 600 }}>
              <FaExternalLinkAlt size={13}/>View Website
            </Link>
          </div>
        </nav>

        <div className="p-4 border-t border-white/5">
          <div className="flex items-center gap-2 px-3 mb-2">
            <div className="w-7 h-7 rounded-full bg-solar-yellow/18 flex items-center justify-center"><FaSun size={12} className="text-solar-yellow"/></div>
            <div><div className="text-white text-xs font-semibold">{user?.name}</div><div className="text-white/30 text-xs">Admin</div></div>
          </div>
          <button onClick={logout} className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-sm text-white/45 hover:text-red-400 hover:bg-red-500/8 transition-all" style={{ fontFamily: 'Rajdhani,sans-serif', fontWeight: 600 }}>
            <FaSignOutAlt size={13}/>Sign Out
          </button>
        </div>
      </aside>

      {sideOpen && <div className="fixed inset-0 bg-black/55 z-40 lg:hidden" onClick={() => setSideOpen(false)}/>}

      {/* Main */}
      <div className="flex-1 flex flex-col min-h-screen overflow-auto">
        {/* Topbar */}
        <header className="sticky top-0 z-30 bg-navy-800/90 backdrop-blur border-b border-white/5 px-4 sm:px-6 py-3.5 flex items-center gap-4">
          <button onClick={() => setSideOpen(true)} className="lg:hidden text-white/50 hover:text-white"><FaBars size={19}/></button>
          <h1 style={{ fontFamily: 'Rajdhani,sans-serif', fontWeight: 700, color: '#fff', fontSize: '1.2rem' }} className="flex-1 capitalize">
            {tab === 'dashboard' ? '📊 Dashboard' : tab === 'enquiries' ? '📨 Customer Enquiries' : '⚙️ Setup Guide'}
          </h1>
          {tab === 'enquiries' && <button onClick={loadEnquiries} className="btn-outline text-xs px-4 py-2 flex items-center gap-1.5"><FaSync size={11}/>Refresh</button>}
        </header>

        <div className="p-4 sm:p-6 lg:p-8 flex-1">

          {/* ── DASHBOARD TAB ── */}
          {tab === 'dashboard' && (
            <div className="space-y-6">
              {/* Stats */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                {[
                  { l:'Total Enquiries', v: enquiries.length || '—', c:'#F5A623', e:'📨' },
                  { l:'New Enquiries', v: newCount || '—', c:'#EF4444', e:'🔔' },
                  { l:'Clients Served', v:'500+', c:'#22C55E', e:'😊' },
                  { l:'Projects Done', v:'650+', c:'#38BDF8', e:'☀️' },
                ].map(({ l, v, c, e }) => (
                  <div key={l} className="admin-card rounded-2xl p-4 sm:p-5 flex items-center gap-3">
                    <div className="text-2xl flex-shrink-0">{e}</div>
                    <div>
                      <div style={{ fontFamily: 'Rajdhani,sans-serif', fontWeight: 700, fontSize: '1.5rem', color: c }}>{v}</div>
                      <div className="text-white/40 text-xs">{l}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Company Info */}
              <div className="admin-card rounded-2xl p-5 sm:p-6">
                <h2 style={{ fontFamily: 'Rajdhani,sans-serif', fontWeight: 700, color: '#fff', fontSize: '1.15rem' }} className="mb-4">Company Information</h2>
                <div className="grid sm:grid-cols-2 gap-3 text-sm">
                  {[
                    ['Company', 'Green Aura Solar'],
                    ['Phone 1', '+91 9124632683'],
                    ['Phone 2', '+91 9178620451'],
                    ['Email', 'sgreenaura2023@gmail.com'],
                    ['Address', 'Plot No-2945/98, Palasuni, Bhubaneswar, Odisha 751010'],
                    ['Website', 'yoursite.com (GoDaddy domain)'],
                  ].map(([k,v]) => (
                    <div key={k} className="flex gap-2"><span className="text-white/35 flex-shrink-0">{k}:</span><span className="text-white font-medium">{v}</span></div>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="admin-card rounded-2xl p-5 sm:p-6">
                <h2 style={{ fontFamily: 'Rajdhani,sans-serif', fontWeight: 700, color: '#fff', fontSize: '1.15rem' }} className="mb-4">Quick Actions</h2>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { l:'View Enquiries', e:'📨', t:'enquiries' },
                    { l:'View Website', e:'🌐', url:'/' },
                    { l:'Setup Guide', e:'📖', t:'how-to' },
                    { l:'Call Us', e:'📞', tel:'+919124632683' },
                  ].map(({ l, e, t, url, tel }) => (
                    <button key={l}
                      onClick={() => { if (t) setTab(t); else if (url) window.open(url, '_blank'); else if (tel) window.open('tel:'+tel) }}
                      className="flex flex-col items-center gap-2 p-4 glass rounded-xl border border-white/5 hover:border-solar-yellow/28 hover:bg-solar-yellow/4 transition-all">
                      <span className="text-3xl">{e}</span>
                      <span className="text-white/65 text-xs font-semibold text-center">{l}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ── ENQUIRIES TAB ── */}
          {tab === 'enquiries' && (
            <div className="space-y-4">
              <p className="text-white/40 text-sm">
                {enquiries.length} enquiries total &nbsp;•&nbsp; {newCount} new
              </p>

              {loadingEnq ? (
                <div className="text-center py-16"><div className="loader-ring mx-auto mb-4"/><p className="text-white/35">Loading enquiries...</p></div>
              ) : enquiries.length === 0 ? (
                <div className="text-center py-16 admin-card rounded-2xl">
                  <div className="text-5xl mb-3">📭</div>
                  <h3 style={{ fontFamily: 'Rajdhani,sans-serif', fontWeight: 700, color: '#fff', fontSize: '1.2rem' }}>No Enquiries Yet</h3>
                  <p className="text-white/40 text-sm mt-2 max-w-sm mx-auto">Customer enquiries from your website will appear here. Make sure MongoDB is connected in .env.local</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {enquiries.map(enq => (
                    <div key={enq._id} className="admin-card rounded-2xl p-4 sm:p-5">
                      <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                        <div className="flex-1">
                          <div className="flex flex-wrap items-center gap-2 mb-2">
                            <span style={{ fontFamily: 'Rajdhani,sans-serif', fontWeight: 700, color: '#fff', fontSize: '1.05rem' }}>{enq.name}</span>
                            <span className={`text-xs px-2.5 py-0.5 rounded-full font-semibold border ${
                              enq.status==='new' ? 'bg-red-500/15 text-red-400 border-red-500/25' :
                              enq.status==='contacted' ? 'bg-solar-yellow/15 text-solar-yellow border-solar-yellow/25' :
                              'bg-energy-green/15 text-energy-green border-energy-green/25'}`}>
                              {enq.status}
                            </span>
                            <span className="text-white/30 text-xs">{new Date(enq.createdAt).toLocaleString('en-IN', { day:'2-digit', month:'short', year:'numeric', hour:'2-digit', minute:'2-digit' })}</span>
                          </div>
                          <div className="flex flex-wrap gap-x-5 gap-y-1 text-sm mb-3">
                            <a href={`tel:${enq.phone}`} className="text-solar-yellow hover:underline flex items-center gap-1"><FaPhone size={11}/>{enq.phone}</a>
                            {enq.email && <span className="text-white/50">✉️ {enq.email}</span>}
                          </div>
                          <div className="bg-white/4 rounded-xl p-3 text-white/70 text-sm leading-relaxed">{enq.message}</div>
                        </div>
                        <div className="flex sm:flex-col gap-2 flex-wrap flex-shrink-0">
                          <button onClick={() => updateStatus(enq._id,'contacted')} className="flex items-center gap-1.5 text-xs px-3 py-2 rounded-lg bg-solar-yellow/10 text-solar-yellow border border-solar-yellow/18 hover:bg-solar-yellow/18 transition-colors whitespace-nowrap">
                            <FaCheck size={9}/>Contacted
                          </button>
                          <button onClick={() => updateStatus(enq._id,'closed')} className="flex items-center gap-1.5 text-xs px-3 py-2 rounded-lg bg-energy-green/10 text-energy-green border border-energy-green/18 hover:bg-energy-green/18 transition-colors whitespace-nowrap">
                            <FaCheck size={9}/>Close
                          </button>
                          <button onClick={() => deleteEnq(enq._id)} className="flex items-center gap-1.5 text-xs px-3 py-2 rounded-lg bg-red-500/10 text-red-400 border border-red-500/18 hover:bg-red-500/18 transition-colors">
                            <FaTrash size={9}/>Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ── HOW-TO / SETUP GUIDE TAB ── */}
          {tab === 'how-to' && (
            <div className="max-w-2xl space-y-5">
              <div className="admin-card rounded-2xl p-6">
                <h2 style={{ fontFamily: 'Rajdhani,sans-serif', fontWeight: 700, color: '#fff', fontSize: '1.25rem' }} className="mb-4">
                  🔑 What You Need to Set Up
                </h2>
                <div className="space-y-4">
                  {[
                    {
                      n:'1',
                      t:'MongoDB (FREE Database)',
                      steps:['Go to mongodb.com/atlas','Create free account → New Cluster (Free tier)','Database Access → Add User (create username & password)','Network Access → Add IP → Allow All: 0.0.0.0/0','Click Connect → Drivers → Copy connection string','Paste in .env.local as MONGODB_URI'],
                      note:'This stores all customer enquiries',
                      color:'#22C55E',
                    },
                    {
                      n:'2',
                      t:'Gmail App Password (For Email Alerts)',
                      steps:['Go to myaccount.google.com','Security → 2-Step Verification → Turn ON','Security → App Passwords → Create one for "Mail"','Copy the 16-digit code (e.g. abcd efgh ijkl mnop)','Paste in .env.local as EMAIL_PASS'],
                      note:'You will get email when a customer enquires',
                      color:'#38BDF8',
                    },
                    {
                      n:'3',
                      t:'Admin Login Password',
                      steps:['Open .env.local file','Change ADMIN_EMAIL to your email','Change ADMIN_PASSWORD to a strong password','Restart the server'],
                      note:'This is your admin panel login (yoursite.com/admin)',
                      color:'#F5A623',
                    },
                    {
                      n:'4',
                      t:'JWT Secret (Just a Random Password)',
                      steps:['Open .env.local file','Change JWT_SECRET to any long random text','Example: GreenAuraSolar@Bhubaneswar#2024$Secret','No website needed — you just make this up!'],
                      note:'This protects your admin login session',
                      color:'#A78BFA',
                    },
                  ].map(({ n, t, steps, note, color }) => (
                    <div key={n} className="bg-white/3 rounded-xl p-4 border border-white/5">
                      <div className="flex items-center gap-2.5 mb-3">
                        <div className="w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold text-navy-900 flex-shrink-0" style={{ background: color }}>{n}</div>
                        <h3 className="text-white font-semibold text-sm sm:text-base">{t}</h3>
                      </div>
                      <ol className="space-y-1.5 ml-9">
                        {steps.map((s, i) => <li key={i} className="text-white/60 text-sm flex gap-2"><span className="text-white/25 flex-shrink-0">{i+1}.</span>{s}</li>)}
                      </ol>
                      <div className="mt-3 ml-9 text-xs px-2.5 py-1.5 rounded-lg inline-block" style={{ background: color+'18', color, border: `1px solid ${color}28` }}>
                        ✓ {note}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="admin-card rounded-2xl p-6">
                <h2 style={{ fontFamily: 'Rajdhani,sans-serif', fontWeight: 700, color: '#fff', fontSize: '1.15rem' }} className="mb-4">🚀 Deploy on GoDaddy (VPS)</h2>
                <div className="space-y-2 text-sm text-white/60">
                  <p className="text-white/80 font-semibold">Since you have a GoDaddy domain, use Vercel (free) + GoDaddy domain:</p>
                  <ol className="space-y-2 mt-3">
                    {[
                      'Go to vercel.com → Sign up free with GitHub',
                      'Upload your project to GitHub (free)',
                      'In Vercel → New Project → Import from GitHub',
                      'Add all .env.local variables in Vercel dashboard',
                      'Deploy — Vercel gives you a free URL',
                      'In Vercel → Settings → Domains → Add your GoDaddy domain',
                      'In GoDaddy DNS → Add CNAME record pointing to Vercel',
                      'Done! Your site is live at your domain!',
                    ].map((s,i) => <li key={i} className="flex gap-2"><span className="text-solar-yellow font-bold flex-shrink-0">{i+1}.</span>{s}</li>)}
                  </ol>
                  <div className="mt-4 p-3 bg-solar-yellow/6 rounded-xl border border-solar-yellow/18 text-solar-yellow text-xs">
                    💡 Vercel is the best hosting for Next.js — it's FREE and very fast. Much better than GoDaddy shared hosting for Next.js.
                  </div>
                </div>
              </div>

              <div className="admin-card rounded-2xl p-5">
                <h2 style={{ fontFamily: 'Rajdhani,sans-serif', fontWeight: 700, color: '#fff', fontSize: '1.1rem' }} className="mb-3">👥 How Customers Access Your Site</h2>
                <div className="space-y-2 text-sm text-white/60">
                  <div className="flex gap-2"><span className="text-energy-green flex-shrink-0">✅</span> Customers visit yourwebsite.com — they see the main website</div>
                  <div className="flex gap-2"><span className="text-energy-green flex-shrink-0">✅</span> They fill the Contact form → enquiry saved + email sent to you</div>
                  <div className="flex gap-2"><span className="text-energy-green flex-shrink-0">✅</span> They click WhatsApp button → direct chat with you</div>
                  <div className="flex gap-2"><span className="text-energy-green flex-shrink-0">✅</span> They talk to Aura chatbot → AI answers basic questions</div>
                  <div className="flex gap-2"><span className="text-solar-yellow flex-shrink-0">🔒</span> Only YOU can access yourwebsite.com/admin (password protected)</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
