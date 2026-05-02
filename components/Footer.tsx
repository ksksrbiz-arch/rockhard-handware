import Link from 'next/link';
import { Logo } from './Logo';
import { SocialIcons } from './SocialIcons';

export function Footer() {
  return (
    <footer className="bg-bg border-t border-border mt-auto">
      <div className="mx-auto max-w-7xl px-5 py-14 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-10 md:gap-8">
        {/* Brand block */}
        <div className="md:col-span-4">
          <Logo size="sm" />
          <p className="text-muted text-sm leading-relaxed mt-5 max-w-xs mb-6">
            Tested by hands that don&apos;t quit. Built for the trades, the fields, and the long days
            that pay the bills.
          </p>
          <SocialIcons />
        </div>

        {/* Shop */}
        <div className="md:col-span-2">
          <p className="font-display tracking-wider-3 uppercase text-sm text-ink mb-4">Shop</p>
          <ul className="space-y-2.5 text-sm text-muted">
            <li><Link href="/shop" className="hover:text-accent transition-colors">All Gloves</Link></li>
            <li><Link href="/shop?category=Tactical" className="hover:text-accent transition-colors">Heavy Duty</Link></li>
            <li><Link href="/shop?category=Tactical" className="hover:text-accent transition-colors">Cut Resistant</Link></li>
            <li><Link href="/shop?category=Work%20Gloves" className="hover:text-accent transition-colors">Cold Weather</Link></li>
            <li><Link href="/shop?category=Work%20Gloves" className="hover:text-accent transition-colors">Mechanic</Link></li>
            <li><Link href="/shop?category=Accessories" className="hover:text-accent transition-colors">Accessories</Link></li>
          </ul>
        </div>

        {/* Support */}
        <div className="md:col-span-2">
          <p className="font-display tracking-wider-3 uppercase text-sm text-ink mb-4">Support</p>
          <ul className="space-y-2.5 text-sm text-muted">
            <li><Link href="/orders" className="hover:text-accent transition-colors">Track Order</Link></li>
            <li><Link href="/contact" className="hover:text-accent transition-colors">Shipping &amp; Returns</Link></li>
            <li><Link href="/contact" className="hover:text-accent transition-colors">Glove Sizing</Link></li>
            <li><Link href="/contact" className="hover:text-accent transition-colors">Care Guide</Link></li>
            <li><Link href="/contact" className="hover:text-accent transition-colors">Contact</Link></li>
            <li><Link href="/about" className="hover:text-accent transition-colors">About Us</Link></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div className="md:col-span-4">
          <p className="font-display tracking-wider-3 uppercase text-sm text-ink mb-2">Jobsite Bulletin</p>
          <p className="text-sm text-muted mb-4 leading-relaxed">
            Field-tested updates from the team. New drops, sizing tips, real reviews. Zero filler.
          </p>
          <form className="flex" method="POST" action="/api/subscribe">
            <input
              type="email"
              required
              name="email"
              placeholder="your@email.com"
              autoComplete="email"
              className="flex-1 bg-bg-alt border border-border px-3 py-2.5 text-sm focus:outline-none focus:border-accent text-ink placeholder:text-muted/60"
            />
            <button type="submit" className="bg-accent px-5 text-xs font-display tracking-wider-3 uppercase text-white hover:bg-[#c4540f] transition-colors">
              SUBSCRIBE
            </button>
          </form>
          <p className="text-[10px] text-muted/70 mt-3 leading-relaxed uppercase tracking-wider-2">
            By subscribing you agree to receive marketing emails. Unsubscribe anytime.
          </p>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto max-w-7xl px-5 py-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-xs text-muted">
          <p>© {new Date().getFullYear()} Rockhard Handware · 1Commerce LLC. All rights reserved.</p>
          <p className="font-display tracking-wider-3 uppercase text-accent">Built for Glory.</p>
          <div className="flex items-center gap-4 text-[11px]">
            <Link href="/privacy" className="hover:text-accent">Privacy</Link>
            <span className="opacity-30">·</span>
            <Link href="/terms" className="hover:text-accent">Terms</Link>
            <span className="opacity-30">·</span>
            <Link href="/accessibility" className="hover:text-accent">Accessibility</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
