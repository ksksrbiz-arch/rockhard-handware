import { AnnouncementBar } from '@/components/AnnouncementBar';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export const metadata = { title: 'About' };

export default function AboutPage() {
  return (
    <>
      <AnnouncementBar />
      <Header />
      <main className="flex-1">
        <div className="mx-auto max-w-3xl px-4 py-16">
          <p className="text-accent font-display tracking-wider-2 uppercase mb-3">★ Our story ★</p>
          <h1 className="heading-mega text-4xl md:text-6xl mb-8">WE DON&apos;T MAKE SOFT GEAR.</h1>
          <p className="text-accent font-display tracking-wider-2 uppercase mb-6">ROCKHARD HANDWARE WAS BUILT FOR MEN WHO DON&apos;T SIT STILL.</p>
          <div className="text-muted leading-relaxed space-y-4">
            <p>Every glove we build is tested by real hands on real jobsites. We use premium materials, rugged construction, and zero shortcuts — because your work deserves more.</p>
            <p>If your hands pay the bills, you don&apos;t wear soft gear.</p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
