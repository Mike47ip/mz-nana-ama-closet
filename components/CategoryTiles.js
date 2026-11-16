// components/CategoryTiles.js
import Link from 'next/link';
import Image from 'next/image';
import Icon from './Icon';
import dresses from '@/app/assets/images/dresses.jpg';
import bags from '@/app/assets/images/bag.jpg';
import heels from '@/app/assets/images/heels.jpg';

const tiles = [
  ['Dresses', 'Wrap, slip, midi and more', '#e9a9c0', '#a63d6f', dresses],
  ['Bags', 'Totes, crossbodies and clutches', '#c4a06a', '#8a6a35', bags],
  ['Heels', 'Stilettos, blocks and kitten heels', '#2b2230', '#2b2230', heels],
];

export default function CategoryTiles() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {tiles.map(([name, text, bg, fg, image]) => (
        <Link
          key={name}
          href={`/shop?category=${name}`}
          style={{ background: `color-mix(in srgb, ${bg} 28%, var(--surface))` }}
          className="group flex min-h-[200px] flex-col justify-between gap-5 rounded-3xl p-5 transition-transform duration-500 hover:-translate-y-1.5"
        >
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl">
            <Image
              src={image}
              alt={name}
              fill
              sizes="(min-width: 768px) 33vw, 100vw"
              placeholder="blur"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div
              style={{ background: 'color-mix(in srgb, var(--surface) 90%, transparent)' }}
              className="absolute right-3 top-3 grid h-12 w-12 place-items-center rounded-full shadow-md backdrop-blur-sm transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110"
            >
              <Icon category={name} color={fg} className="w-7" />
            </div>
          </div>
          <div className="px-2 pb-2">
            <b className="block font-display text-3xl font-semibold">{name}</b>
            <span className="text-sm text-muted">{text}</span>
          </div>
        </Link>
      ))}
    </div>
  );
}