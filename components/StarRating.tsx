import { Star } from 'lucide-react';

export function StarRating({ value, size = 16 }: { value: number; size?: number }) {
  const full = Math.floor(value);
  return (
    <div className="inline-flex items-center text-accent">
      {[1, 2, 3, 4, 5].map((n) => (
        <Star
          key={n}
          size={size}
          fill={n <= full ? 'currentColor' : 'none'}
          opacity={n <= full ? 1 : 0.25}
        />
      ))}
    </div>
  );
}
