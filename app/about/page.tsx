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
          <p className="text-accent font-display tracking-wider-3 uppercase text-sm mb-4">★ THE HANDWARE STORY</p>
          <h1 className="heading-mega text-4xl md:text-6xl mb-8 whitespace-pre-line">WE DON'T MAKE\nSOFT GEAR.</h1>
          <div className="prose prose-invert max-w-none text-muted text-lg leading-relaxed space-y-6">
            <p>Rockhard started on a jobsite where the gloves we bought split open by Wednesday. So we built our own. Heavyweight palms. Real cut ratings. Knuckle pads that take a hit. Every piece tested by ironworkers, framers, mechanics, and welders before it ships. If it's not bombproof, it doesn't get the patch.</p>
            <p>
              We don&apos;t apologize for what we make or who we make it for. We design hard, print loud,
              and ship fast. Every piece is field-tested before it goes live, and we stand behind every order
              with a 30-day no-questions return.
            </p>
            <p>
              If you wear our gear, you&apos;re part of the crew. Tag us, send us photos from your shop, your
              jobsite, your tailgate, your back porch. We see you. We make this for you.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
