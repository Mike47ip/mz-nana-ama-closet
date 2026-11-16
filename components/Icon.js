const PATHS = {
  Dresses: <path d="M40 10h6l4 12 4-12h6l-3 30 15 50q-27 8-54 0l15-50z" fill="currentColor" />,
  Bags: (<><path d="M22 38h56l6 50H16z" fill="currentColor" /><path d="M36 38V28a14 14 0 0 1 28 0v10" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" /></>),
  Heels: <path d="M18 24l14-2q4 30 22 36 18 4 36 4v7q-18 1-36-1l-4 18h-6l1-19Q22 62 18 24z" fill="currentColor" />,
};
export default function Icon({ category, color, className = '' }) {
  return <svg viewBox="0 0 100 100" className={className} style={{ color }} aria-hidden="true">{PATHS[category]}</svg>;
}
