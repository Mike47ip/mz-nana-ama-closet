export const metadata = { title: 'About | Nana Ama Closet.' };

const values = [
  ['Chosen with care', 'Small batches, checked by hand before they ship.'],
  ['Made to move', 'Comfort is part of the design, from the insole to the lining.'],
  ['Easy to get right', 'Clear sizes, honest descriptions and simple returns.'],
];
export default function About() {
  return (
    <section className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-16 md:grid-cols-2">
      <div className="animate-rise">
        <h1 className="font-display text-5xl font-semibold">About Adwoa &amp; Co.</h1>
        <p className="mt-4 text-muted">We started with one idea: women should find a dress, a bag and the right pair of heels in one place, without hunting. Every piece is chosen for fit, finish and how it wears over a long day.</p>
        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          {[['Delivery', 'Across Ghana'], ['Returns', 'Within 7 days'], ['Payment', 'Mobile Money & cards']].map(([a, b]) => (
            <div key={a} className="rounded-2xl bg-surface p-4 text-sm text-muted"><b className="block text-base text-ink">{a}</b>{b}</div>
          ))}
        </div>
      </div>
      <div className="grid gap-3.5">
        {values.map(([a, b]) => <div key={a} className="rounded-3xl bg-surface p-6 transition hover:translate-x-1.5"><b className="block">{a}</b><span className="text-muted">{b}</span></div>)}
      </div>
    </section>
  );
}
