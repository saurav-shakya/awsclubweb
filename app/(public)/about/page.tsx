import { HeroSection } from '@/components/sections/HeroSection';
import { Container } from '@/components/ui/Container';
import { Card } from '@/components/ui/Card';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

export default function About() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection
          title="About AWS Cloud Club"
          subtitle="Building a community of cloud enthusiasts"
          ctaText="Get in Touch"
          ctaLink="/contact"
          size="half"
        />

        <section className="py-20 bg-aws-navy">
          <Container>
            <div className="space-y-16">
              {/* Mission & Vision */}
              <div className="grid md:grid-cols-2 gap-8">
                <Card>
                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold text-aws-orange">Our Mission</h3>
                    <p className="text-gray-300 leading-relaxed">
                      To empower students at GCET with practical cloud computing knowledge and skills through hands-on workshops, industry mentorship, and collaborative projects.
                    </p>
                  </div>
                </Card>

                <Card>
                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold text-aws-orange">Our Vision</h3>
                    <p className="text-gray-300 leading-relaxed">
                      To establish AWS Cloud Club as the premier cloud computing community at GCET, fostering innovation and preparing students for careers in cloud technology.
                    </p>
                  </div>
                </Card>
              </div>

              {/* Club Story */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-3xl font-bold text-white mb-4">Our Story</h3>
                  <div className="w-12 h-1 bg-aws-orange rounded mb-6" />
                </div>

                <p className="text-gray-300 leading-relaxed text-lg">
                  AWS Cloud Club at GCET was founded in 2025 with a mission to bridge the gap between academic learning and industry-relevant cloud computing skills. What started as a small group of passionate students has grown into a vibrant community dedicated to exploring AWS technologies and cloud solutions.
                </p>

                <p className="text-gray-300 leading-relaxed text-lg">
                  Through regular workshops, hackathons, and industry collaborations, we provide students with practical experience and networking opportunities. Our club serves as a hub for innovation, learning, and collaboration in the cloud computing space.
                </p>

                <p className="text-gray-300 leading-relaxed text-lg">
                  Today, AWS Cloud Club continues to grow, bringing together students, faculty, and industry partners to advance cloud computing education and practice at GCET.
                </p>
              </div>

              {/* AWS Partnership */}
              <div className="flex flex-col items-center text-center">
                <Card className="max-w-2xl w-full">
                  <div className="space-y-6">
                    <h3 className="text-2xl font-bold text-aws-orange">AWS Partnership</h3>
                    <div className="bg-aws-navy/50 border border-aws-orange/30 rounded-lg p-8">
                      <div className="text-6xl font-bold text-aws-orange mb-4">AWS</div>
                      <p className="text-gray-300">
                        We are proud to partner with Amazon Web Services, the leading cloud computing platform, to bring cutting-edge cloud technologies and educational resources to our community.
                      </p>
                    </div>
                    <p className="text-gray-400 text-sm">
                      AWS and the AWS logo are trademarks of Amazon.com, Inc. or its affiliates.
                    </p>
                  </div>
                </Card>
              </div>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
