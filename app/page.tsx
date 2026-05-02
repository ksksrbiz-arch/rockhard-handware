import { AnnouncementBar } from '@/components/AnnouncementBar';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { TrustStrip } from '@/components/TrustStrip';
import { Categories } from '@/components/Categories';
import { StorySection } from '@/components/StorySection';
import { FooterStrip } from '@/components/FooterStrip';
import { Footer } from '@/components/Footer';

export default function HomePage() {
  return (
    <>
      <AnnouncementBar />
      <main>
        <div className="relative">
          <Header />
          <Hero />
        </div>
        <TrustStrip />
        <Categories />
        <StorySection />
      </main>
      <FooterStrip />
      <Footer />
    </>
  );
}
