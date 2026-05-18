'use client'
import { useEffect, useState } from 'react'
export default function ScrollProgress() {
  const [p, setP] = useState(0)
  useEffect(() => {
    const fn = () => { const t = document.documentElement.scrollHeight - window.innerHeight; setP(t > 0 ? (window.scrollY / t) * 100 : 0) }
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])
  return <div className="scroll-progress" style={{ width: `${p}%` }} />
}
