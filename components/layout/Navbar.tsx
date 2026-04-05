'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Events', href: '/events' },
    { label: 'Contact', href: '/contact' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass-effect shadow-lg shadow-black/50' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="w-11 h-11 bg-gradient-to-br from-aws-orange to-yellow-500 rounded-xl flex items-center justify-center shadow-lg shadow-aws-orange/30 group-hover:shadow-aws-orange/60 transition-shadow neon-border">
                <span className="text-black font-black text-xl font-display">A</span>
              </div>
              <div className="absolute -inset-1 bg-gradient-to-br from-aws-orange to-yellow-500 rounded-xl opacity-0 group-hover:opacity-20 blur-lg transition-opacity" />
            </div>
            <div className="hidden sm:block">
              <div className="text-white font-black text-lg font-display tracking-tight leading-tight">
                AWS<span className="text-aws-orange">_</span>CLUB
              </div>
              <div className="text-xs text-gray-500 font-mono tracking-wider">GCET</div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {links.map((link, index) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative px-5 py-2.5 text-sm font-mono text-gray-300 hover:text-white transition-colors group"
              >
                <span className="text-aws-orange/50 text-xs">0{index + 1}/</span>
                {link.label}
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-aws-orange to-cyber-blue group-hover:w-full transition-all duration-300" />
              </Link>
            ))}

          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-gray-300 hover:text-white transition-colors glass-effect rounded-lg"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-6 pt-4 border-t border-white/10 glass-effect rounded-b-2xl mt-2 animate-in slide-in-from-top-5">
            <div className="space-y-2">
              {links.map((link, index) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block px-4 py-3 text-sm font-mono text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-all"
                  onClick={() => setIsOpen(false)}
                >
                  <span className="text-aws-orange/50 text-xs mr-2">0{index + 1}/</span>
                  {link.label}
                </Link>
              ))}

            </div>
          </div>
        )}
      </div>

      {/* Bottom glow line */}
      <div className="h-px bg-gradient-to-r from-transparent via-aws-orange/30 to-transparent" />
    </nav>
  );
};
