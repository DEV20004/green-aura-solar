/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        solar: { yellow: '#F5A623', amber: '#F59E0B', gold: '#D97706' },
        navy: { 900: '#0A0F1E', 800: '#0D1426', 700: '#111827', 600: '#1A2540' },
        sky: { glow: '#38BDF8' },
        energy: { green: '#22C55E', teal: '#14B8A6' },
      },
      fontFamily: {
        display: ['Rajdhani', 'sans-serif'],
        body: ['Nunito', 'sans-serif'],
      },
      keyframes: {
        float: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-18px)' },
        },
        pulseGlow: {
          '0%,100%': { boxShadow: '0 0 20px rgba(245,166,35,0.3)' },
          '50%': { boxShadow: '0 0 50px rgba(245,166,35,0.8)' },
        },
        slideUp: {
          from: { opacity: '0', transform: 'translateY(30px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: { from: { opacity: '0' }, to: { opacity: '1' } },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'slide-up': 'slideUp 0.6s ease-out forwards',
        'fade-in': 'fadeIn 0.8s ease-out forwards',
        'spin-slow': 'spin 20s linear infinite',
      },
    },
  },
  plugins: [],
}
