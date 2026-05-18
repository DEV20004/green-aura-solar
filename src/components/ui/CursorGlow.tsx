'use client'
import { useEffect, useRef } from 'react'
export default function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (/Mobi|Android/i.test(navigator.userAgent)) return
    const fn = (e: MouseEvent) => { if (ref.current) { ref.current.style.left = e.clientX - 9 + 'px'; ref.current.style.top = e.clientY - 9 + 'px' } }
    window.addEventListener('mousemove', fn)
    return () => window.removeEventListener('mousemove', fn)
  }, [])
  return <div ref={ref} className="cursor-glow hidden md:block" />
}
