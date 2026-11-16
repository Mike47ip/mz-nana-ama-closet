import './globals.css';
import { Cormorant_Garamond, Manrope } from 'next/font/google';
import { CartProvider } from '@/components/CartProvider';

const display = Cormorant_Garamond({ subsets: ['latin'], weight: ['500', '600', '700'], variable: '--font-display' });
const body = Manrope({ subsets: ['latin'], variable: '--font-body' });

export const metadata = { title: 'Nana Ama Closet. | Dresses, Bags & Heels', description: 'Women’s dresses, bags and heels.' };

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body className="font-sans leading-relaxed antialiased"><CartProvider>{children}</CartProvider></body>
    </html>
  );
}
