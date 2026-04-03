import { HeroSection } from '@/components/sections/HeroSection';
import { ContactForm } from '@/components/sections/ContactForm';
import { Container } from '@/components/ui/Container';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

export default function Contact() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection
          title="Get in Touch"
          subtitle="Have questions? Want to collaborate? We'd love to hear from you."
          ctaText="Contact Us"
          ctaLink="#contact-form"
          size="half"
        />

        <section id="contact-form" className="py-20 bg-aws-navy">
          <Container>
            <div className="grid md:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div>
                <h2 className="text-3xl font-bold text-white mb-2">Send us a Message</h2>
                <div className="w-12 h-1 bg-aws-orange rounded mb-8" />
                <ContactForm />
              </div>

              {/* Contact Info */}
              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-4">Contact Information</h3>
                  <div className="w-12 h-1 bg-aws-orange rounded" />
                </div>

                {/* Email */}
                <div>
                  <h4 className="text-lg font-semibold text-aws-orange mb-2">Email</h4>
                  <a
                    href="mailto:club@awsclubgcet.com"
                    className="text-gray-300 hover:text-aws-orange transition-colors"
                  >
                    club@awsclubgcet.com
                  </a>
                </div>

                {/* Social Links */}
                <div>
                  <h4 className="text-lg font-semibold text-aws-orange mb-4">Follow Us</h4>
                  <div className="flex gap-4">
                    <a
                      href="https://linkedin.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center w-12 h-12 bg-gray-800 rounded-lg hover:bg-aws-orange hover:text-aws-navy transition-colors"
                      aria-label="LinkedIn"
                    >
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
                      </svg>
                    </a>
                    <a
                      href="https://instagram.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center w-12 h-12 bg-gray-800 rounded-lg hover:bg-aws-orange hover:text-aws-navy transition-colors"
                      aria-label="Instagram"
                    >
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163C8.756 0 8.331.012 7.052.07 2.696.278.278 2.579.07 7.052.012 8.331 0 8.756 0 12s.012 3.669.07 4.948c.208 4.474 2.626 6.875 7.052 7.083 1.28.058 1.704.07 4.948.07s3.668-.012 4.948-.07c4.47-.208 6.875-2.626 7.083-7.053.058-1.28.07-1.704.07-4.948s-.012-3.669-.07-4.948c-.208-4.474-2.626-6.875-7.053-7.083C15.668.012 15.244 0 12 0z" />
                        <circle cx="12" cy="12" r="3.6" fill="currentColor" />
                        <circle cx="18.406" cy="5.594" r=".6" fill="currentColor" />
                      </svg>
                    </a>
                    <a
                      href="https://twitter.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center w-12 h-12 bg-gray-800 rounded-lg hover:bg-aws-orange hover:text-aws-navy transition-colors"
                      aria-label="Twitter"
                    >
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                      </svg>
                    </a>
                  </div>
                </div>

                {/* Map Section */}
                <div>
                  <h4 className="text-lg font-semibold text-aws-orange mb-4">Location</h4>
                  <p className="text-gray-300 mb-4">
                    Goa College of Engineering and Technology<br />
                    Farmagudi, Ponda, Goa 403401, India
                  </p>
                  <div className="w-full h-64 bg-gray-800 rounded-lg border border-gray-700 flex items-center justify-center">
                    <p className="text-gray-400">Map embed coming soon</p>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
