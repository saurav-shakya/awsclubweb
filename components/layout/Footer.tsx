import Link from 'next/link';
import { Linkedin, Instagram, Mail } from 'lucide-react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: Instagram, href: 'https://www.instagram.com/awscloudcommunity_gcet/', label: 'Instagram' },
  ];

  const quickLinks = [
    { label: 'About', href: '/about' },
    { label: 'Events', href: '/events' },
    { label: 'Contact', href: '/contact' },
  ];

  return (
    <footer className="bg-black border-t border-white/10 mt-32 relative overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 cyber-grid opacity-20" />

      {/* Gradient overlay */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-aws-orange/5 rounded-full blur-[150px]" />

      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-16 relative z-10">
        {/* Top section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-aws-orange to-yellow-500 rounded-xl flex items-center justify-center shadow-lg shadow-aws-orange/30 neon-border">
                <span className="text-black font-black text-2xl font-display">A</span>
              </div>
              <div>
                <div className="text-white font-black text-xl font-display tracking-tight">
                  AWS<span className="text-aws-orange">_</span>CLOUD<span className="text-aws-orange">_</span>CLUB
                </div>
                <div className="text-xs text-gray-500 font-mono tracking-wider">GCET</div>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed max-w-md mb-6">
              AWS Cloud Club at College of Engineering and Technology. Building cloud skills through workshops, events, and community learning.
            </p>
            {/* Social links */}
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 glass-effect rounded-lg flex items-center justify-center text-gray-400 hover:text-aws-orange hover:border-aws-orange/50 transition-all duration-300 group"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold mb-6 font-display text-lg">
              <span className="text-aws-orange/50 text-sm mr-2">//</span>
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-aws-orange transition-colors text-sm font-mono flex items-center group"
                  >
                    <span className="text-aws-orange/50 mr-2 group-hover:mr-3 transition-all">▸</span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-bold mb-6 font-display text-lg">
              <span className="text-aws-orange/50 text-sm mr-2">//</span>
              Contact
            </h3>
            <div className="space-y-4">
              <a
                href="mailto:awsclub@gcet.edu"
                className="flex items-center gap-3 text-gray-400 hover:text-aws-orange transition-colors text-sm group"
              >
                <div className="w-8 h-8 glass-effect rounded-lg flex items-center justify-center group-hover:border-aws-orange/50">
                  <Mail className="w-4 h-4" />
                </div>
                <span className="font-mono">awsclub@gcet.edu</span>
              </a>
              <div className="text-gray-500 text-xs font-mono leading-relaxed">
                 College of Engineering<br />
                and Technology<br />
                Greater Noida 
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-8" />

        {/* Bottom section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-gray-500 text-xs font-mono">
            <span className="text-aws-orange/50">©</span> {currentYear} AWS Cloud Club GCET
            <span className="mx-2 text-gray-700">|</span>
            All rights reserved
          </div>
          <div className="text-gray-600 text-xs font-mono">
            AWS and the AWS logo are trademarks of Amazon.com, Inc.
          </div>
        </div>

        {/* Decorative corner accents */}
        <div className="absolute top-0 left-0 w-32 h-32 border-t border-l border-aws-orange/10" />
        <div className="absolute bottom-0 right-0 w-32 h-32 border-b border-r border-cyber-blue/10" />
      </div>
    </footer>
  );
};
