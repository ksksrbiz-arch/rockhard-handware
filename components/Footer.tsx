import Link from 'next/link';
import { Logo } from './Logo';

export function Footer() {
  return (
    <footer className="bg-bg border-t border-border mt-auto">
      <div className="mx-auto max-w-7xl px-5 py-14 grid grid-cols-2 md:grid-cols-4 gap-8">
        <div>
          <Logo size="sm" />
          <p className="text-muted text-sm leading-relaxed mt-4 max-w-xs">Real gloves. Real work. Real support — built for the people who don&apos;t sit still.</p>
        </div>
        <div>
          <p className="font-display tracking-wider-3 uppercase text-sm text-ink mb-4">SHOP</p>
          <ul className="space-y-2 text-sm text-muted">
            <li><Link href="/shop" className="hover:text-accent">All Gloves</Link></li>
            <li><Link href="/shop?category=Tactical" className="hover:text-accent">Tactical</Link></li>
            <li><Link href="/shop?category=Work%20Gloves" className="hover:text-accent">Work Gloves</Link></li>
            <li><Link href="/shop?category=Accessories" className="hover:text-accent">Accessories</Link></li>
          </ul>
        </div>
        <div>
          <p className="font-display tracking-wider-3 uppercase text-sm text-ink mb-4">SUPPORT</p>
          <ul className="space-y-2 text-sm text-muted">
            <li><Link href="/contact" className="hover:text-accent">Contact</Link></li>
            <li><Link href="/orders" className="hover:text-accent">Track Order</Link></li>
            <li><Link href="/about" className="hover:text-accent">About Us</Link></li>
          </ul>
        </div>
        <div>
          <p className="font-display tracking-wider-3 uppercase text-sm text-ink mb-4">JOBSITE EMAIL</p>
          <p className="text-sm text-muted mb-3">New drops. Field tests. No filler.</p>
          <form className="flex">
            <input type="email" required placeholder="your@email.com"
              className="flex-1 bg-bg-alt border border-border px-3 py-2 text-sm focus:outline-none focus:border-accent text-ink" />
            <button type="submit" className="bg-accent px-4 text-xs font-display tracking-wider-3 uppercase text-white hover:bg-[#c4540f]">GO</button>
          </form>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="mx-auto max-w-7xl px-5 py-4 flex flex-wrap items-center justify-between gap-3 text-xs text-muted">
          <p>© {new Date().getFullYear()} Rockhard Handware. All rights reserved.</p>
          <p className="font-display tracking-wider-3 uppercase text-accent">Built for Glory.</p>
        </div>
      </div>
    </footer>
  );
}
