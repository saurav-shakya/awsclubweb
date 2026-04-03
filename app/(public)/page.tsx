import { HeroSection } from '@/components/sections/HeroSection';
import { FeaturedEvent } from '@/components/sections/FeaturedEvent';
import { Sponsors } from '@/components/sections/Sponsors';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

export const metadata = {
  title: 'AWS Cloud Club GCET',
  description: 'AWS Cloud Club at  College of Engineering and Technology',
};

const featuredEvent = {
  title: 'AWS Cloud Fundamentals Workshop',
  date: 'April 15, 2026 | 2:00 PM - 4:00 PM IST',
  mode: 'hybrid' as const,
  tags: ['Workshop', 'Beginner-Friendly'],
  description:
    'Join us for an in-depth workshop on AWS cloud fundamentals. Learn about EC2, S3, and core services. Perfect for students new to cloud computing.',
  lumaUrl: 'https://luma.com/example-event',
};

const sponsors = [
  { name: 'AWS', logoUrl: '' },
  { name: 'TechCorp', logoUrl: '' },
  { name: 'CloudSystems', logoUrl: '' },
  { name: 'DevTools Inc', logoUrl: '' },
];

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection
          title="AWS Cloud Club GCET"
          subtitle="Discover cloud computing through events, workshops, and community"
          ctaText="Explore Events"
          ctaLink="/events"
          size="full"
        />

        <FeaturedEvent event={featuredEvent} />

        <Sponsors sponsors={sponsors} />
      </main>
      <Footer />
    </>
  );
}
