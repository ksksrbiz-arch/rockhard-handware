import { Instagram, Facebook, Youtube } from 'lucide-react';

const TikTok = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
  </svg>
);

export function SocialIcons({ className = '' }: { className?: string }) {
  const links = [
    { href: 'https://instagram.com', label: 'Instagram', Icon: Instagram },
    { href: 'https://facebook.com',  label: 'Facebook',  Icon: Facebook },
    { href: 'https://tiktok.com',    label: 'TikTok',    Icon: TikTok },
    { href: 'https://youtube.com',   label: 'YouTube',   Icon: Youtube },
  ];
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {links.map(({ href, label, Icon }) => (
        <a
          key={label}
          href={href}
          aria-label={label}
          target="_blank"
          rel="noopener noreferrer"
          className="w-9 h-9 inline-flex items-center justify-center border border-border text-ink hover:text-accent hover:border-accent transition-colors"
        >
          <Icon className="w-4 h-4" />
        </a>
      ))}
    </div>
  );
}
