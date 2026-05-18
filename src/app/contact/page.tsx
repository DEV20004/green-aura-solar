'use client'
import { useState } from 'react'
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaFacebook, FaInstagram, FaLinkedin, FaYoutube, FaWhatsapp, FaCheckCircle } from 'react-icons/fa'
import toast from 'react-hot-toast'

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', message: '' })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.phone || !form.message) { toast.error('Please fill in Name, Phone and Message.'); return }
    setLoading(true)
    try {
      const r = await fetch('/api/enquiry', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
      if (r.ok) { setSuccess(true); setForm({ name:'', phone:'', email:'', message:'' }); toast.success('Enquiry sent! We\'ll contact you soon.') }
      else toast.error('Something went wrong. Please call us directly.')
    } catch { toast.error('Network error. Please call +91 9124632683') }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-navy-900 pt-20">
      {/* Header */}
      <section className="relative py-14 hero-gradient overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-20" />
        <div className="relative z-10 max-w-3xl mx-auto px-4 text-center">
          <div className="section-badge mb-3">📞 Contact Us</div>
          <h1 className="section-heading text-white mb-3">Let's Talk <span className="gradient-text">Solar</span></h1>
          <p className="text-white/55 text-sm sm:text-base max-w-xl mx-auto">Free consultation, no obligation. We respond within 24 hours.</p>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">

            {/* ── Left: Contact Info ── */}
            <div>
              <h2 className="section-heading text-white mb-7">Get in <span className="gradient-text">Touch</span></h2>

              {/* Phone */}
              <a href="tel:+919178620451" className="flex items-center gap-4 glass-dark rounded-2xl p-4 sm:p-5 border border-white/5 hover:border-solar-yellow/35 transition-all card-hover mb-4 group">
                <div className="w-12 h-12 rounded-xl bg-solar-yellow/12 flex items-center justify-center flex-shrink-0 group-hover:bg-solar-yellow/22 transition-colors">
                  <FaPhone className="text-solar-yellow" size={18} />
                </div>
                <div>
                  <div className="text-white/45 text-xs uppercase tracking-widest mb-1">Phone / WhatsApp</div>
                  <div style={{ fontFamily: 'Rajdhani,sans-serif', fontWeight: 700, color: '#fff', fontSize: '1.2rem' }}>+91 9124632683</div>
                  <div style={{ fontFamily: 'Rajdhani,sans-serif', fontWeight: 700, color: '#fff', fontSize: '1.1rem' }}>+91 9178620451</div>
                </div>
              </a>

              {/* Email */}
              <a href="mailto:sgreenaura2023@gmail.com" className="flex items-center gap-4 glass-dark rounded-2xl p-4 sm:p-5 border border-white/5 hover:border-sky-glow/35 transition-all card-hover mb-4 group">
                <div className="w-12 h-12 rounded-xl bg-sky-glow/10 flex items-center justify-center flex-shrink-0 group-hover:bg-sky-glow/18 transition-colors">
                  <FaEnvelope className="text-sky-glow" size={18} />
                </div>
                <div>
                  <div className="text-white/45 text-xs uppercase tracking-widest mb-1">Email</div>
                  <div className="text-white font-semibold text-sm sm:text-base break-all">sgreenaura2023@gmail.com</div>
                </div>
              </a>

              {/* Address */}
              <div className="flex items-start gap-4 glass-dark rounded-2xl p-4 sm:p-5 border border-white/5 hover:border-energy-green/35 transition-all mb-6 group">
                <div className="w-12 h-12 rounded-xl bg-energy-green/10 flex items-center justify-center flex-shrink-0 group-hover:bg-energy-green/18 transition-colors">
                  <FaMapMarkerAlt className="text-energy-green" size={18} />
                </div>
                <div>
                  <div className="text-white/45 text-xs uppercase tracking-widest mb-1">Office Address</div>
                  <address className="text-white/75 not-italic text-sm leading-relaxed">
                    Plot No-2945/98, Near Modern Furniture Show Room,<br />
                    Palasuni, Bhubaneswar, Khordha,<br />
                    Odisha, India — 751010
                  </address>
                </div>
              </div>

              {/* Social */}
              <h3 className="text-white font-semibold mb-3" style={{ fontFamily: 'Rajdhani,sans-serif', fontWeight: 600, fontSize: '1.05rem' }}>Follow Us</h3>
              <div className="flex gap-3 flex-wrap mb-7">
                {[
                  { i: FaFacebook, h: 'FACEBOOK_LINK', l: 'Facebook', c: '#1877F2' },
                  { i: FaInstagram, h: 'INSTAGRAM_LINK', l: 'Instagram', c: '#E4405F' },
                  { i: FaLinkedin, h: 'LINKEDIN_LINK', l: 'LinkedIn', c: '#0A66C2' },
                  { i: FaYoutube, h: 'YOUTUBE_LINK', l: 'YouTube', c: '#FF0000' },
                  { i: FaWhatsapp, h: 'https://wa.me/919178620451', l: 'WhatsApp', c: '#25D366' },
                ].map(({ i: Icon, h, l, c }) => (
                  <a key={l} href={h} target="_blank" rel="noopener noreferrer" aria-label={l}
                    className="w-11 h-11 rounded-xl glass border border-white/10 hover:border-white/25 flex items-center justify-center transition-all hover:scale-110">
                    <Icon size={17} style={{ color: c }} />
                  </a>
                ))}
              </div>

              {/* Map */}
              <div className="glass-dark rounded-2xl overflow-hidden border border-white/5 h-48 sm:h-56">
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3742.76!2d85.8245!3d20.2961!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a19a7a879e7cfcd%3A0x1f7e00d47e4e76de!2sPalasuni%2C%20Bhubaneswar%2C%20Odisha!5e0!3m2!1sen!2sin!4v1680000000000"
                  width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" title="Green Aura Solar Location" />
              </div>
            </div>

            {/* ── Right: Form ── */}
            <div>
              <div className="glass-dark rounded-2xl p-6 sm:p-8 border border-solar-yellow/18">
                <h2 style={{ fontFamily: 'Rajdhani,sans-serif', fontWeight: 700, fontSize: '1.7rem', color: '#fff' }} className="mb-1">
                  Send an <span className="gradient-text">Enquiry</span>
                </h2>
                <p className="text-white/45 text-sm mb-6">We'll call you back within 24 hours.</p>

                {success ? (
                  <div className="text-center py-12">
                    <div className="w-20 h-20 rounded-full bg-energy-green/15 flex items-center justify-center mx-auto mb-4 border-2 border-energy-green/35">
                      <FaCheckCircle className="text-energy-green" size={34} />
                    </div>
                    <h3 style={{ fontFamily: 'Rajdhani,sans-serif', fontWeight: 700, fontSize: '1.5rem', color: '#fff' }}>Enquiry Sent!</h3>
                    <p className="text-white/55 text-sm mt-2 mb-5">Our team will contact you within 24 hours.</p>
                    <button onClick={() => setSuccess(false)} className="btn-outline px-8 py-2.5">Send Another</button>
                  </div>
                ) : (
                  <form onSubmit={submit} className="space-y-4">
                    <div>
                      <label className="block text-white/65 text-sm mb-1.5 font-semibold">Full Name <span className="text-solar-yellow">*</span></label>
                      <input type="text" value={form.name} onChange={e => setForm({...form,name:e.target.value})} placeholder="Your full name" className="form-input" required />
                    </div>
                    <div>
                      <label className="block text-white/65 text-sm mb-1.5 font-semibold">Phone Number <span className="text-solar-yellow">*</span></label>
                      <input type="tel" value={form.phone} onChange={e => setForm({...form,phone:e.target.value})} placeholder="+91 XXXXX XXXXX" className="form-input" required />
                    </div>
                    <div>
                      <label className="block text-white/65 text-sm mb-1.5 font-semibold">Email Address <span className="text-white/30">(optional)</span></label>
                      <input type="email" value={form.email} onChange={e => setForm({...form,email:e.target.value})} placeholder="your@email.com" className="form-input" />
                    </div>
                    <div>
                      <label className="block text-white/65 text-sm mb-1.5 font-semibold">Message <span className="text-solar-yellow">*</span></label>
                      <textarea value={form.message} onChange={e => setForm({...form,message:e.target.value})} placeholder="Tell us your property type, monthly bill, and any questions..." rows={5} className="form-input resize-none" required />
                    </div>
                    <button type="submit" disabled={loading} className="btn-solar w-full py-3.5 text-base disabled:opacity-55 disabled:cursor-not-allowed">
                      {loading ? <span className="flex items-center justify-center gap-2"><span className="w-4 h-4 border-2 border-navy-900/40 border-t-navy-900 rounded-full animate-spin"/>Sending...</span> : 'Send Enquiry ⚡'}
                    </button>
                    <p className="text-white/25 text-xs text-center">🔒 Your info is private and never shared.</p>
                  </form>
                )}
              </div>

              {/* Quick contact tiles */}
              <div className="grid grid-cols-2 gap-3 mt-4">
                <a href="tel:+919178620451" className="glass-dark rounded-xl p-4 border border-solar-yellow/12 hover:border-solar-yellow/35 transition-all text-center card-hover">
                  <FaPhone className="text-solar-yellow mx-auto mb-2" size={18}/>
                  <div className="text-white/80 text-sm font-semibold">Call Directly</div>
                  <div className="text-white/35 text-xs">Mon–Sun 9am–6pm</div>
                </a>
                <a href="https://wa.me/919178620451?text=Hello%20Green%20Aura%20Solar!" target="_blank" rel="noopener noreferrer" className="glass-dark rounded-xl p-4 border border-energy-green/12 hover:border-energy-green/35 transition-all text-center card-hover">
                  <FaWhatsapp className="text-energy-green mx-auto mb-2" size={18}/>
                  <div className="text-white/80 text-sm font-semibold">WhatsApp</div>
                  <div className="text-white/35 text-xs">Instant Reply</div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
