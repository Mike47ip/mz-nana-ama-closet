module.exports = {
  content: ['./app/**/*.{js,jsx}', './components/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: { bg: 'var(--bg)', surface: 'var(--surface)', ink: 'var(--ink)', muted: 'var(--muted)', line: 'var(--line)', accent: 'var(--accent)', 'accent-ink': 'var(--accent-ink)' },
      fontFamily: { display: ['var(--font-display)', 'serif'], sans: ['var(--font-body)', 'system-ui', 'sans-serif'] },
      keyframes: {
        rise: { from: { opacity: 0, transform: 'translateY(24px)' }, to: { opacity: 1, transform: 'none' } },
        pop: { from: { opacity: 0, transform: 'scale(.96) translateY(14px)' }, to: { opacity: 1, transform: 'none' } },
        float: { '50%': { transform: 'translateY(-12px)' } },
      },
      animation: { rise: 'rise .9s cubic-bezier(.2,.7,.2,1) both', pop: 'pop .5s cubic-bezier(.2,.7,.2,1) both', float: 'float 6s ease-in-out infinite' },
    },
  },
  plugins: [],
};
