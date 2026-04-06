import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import TeamSection from '@/components/TeamSection';
import BookingSection from '@/components/BookingSection';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <TeamSection />
        <BookingSection />
      </main>
      <Footer />
    </div>
  );
}
