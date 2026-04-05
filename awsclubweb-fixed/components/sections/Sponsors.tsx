'use client';

import { Container } from '@/components/ui/Container';
import { useState } from 'react';

interface Sponsor {
  name: string;
  logoUrl: string;
  link?: string;
}

interface SponsorsProps {
  sponsors: Sponsor[];
}

export const Sponsors: React.FC<SponsorsProps> = ({ sponsors }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="py-32 bg-black relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 cyber-grid opacity-20" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-neon-purple/5 rounded-full blur-[150px]" />

      <Container>
        {/* Section header */}
        <div className="mb-20 text-center">
          <div className="inline-block mb-4">
            <span className="text-aws-orange/60 text-sm font-mono tracking-widest uppercase">
              &lt;Partners/&gt;
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 tracking-tight">
            Powered by <span className="gradient-text">Innovation</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto font-light">
            In collaboration with industry leaders who share our vision for cloud excellence
          </p>
        </div>

        {/* Sponsors grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {sponsors.map((sponsor, index) => {
            const isHovered = hoveredIndex === index;
            const content = (
              <div
                className={`relative group h-32 glass-card rounded-2xl flex items-center justify-center transition-all duration-500 ${
                  isHovered ? 'scale-105' : 'scale-100'
                }`}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Glow effect on hover */}
                <div
                  className={`absolute inset-0 rounded-2xl transition-opacity duration-500 ${
                    isHovered ? 'opacity-100' : 'opacity-0'
                  }`}
                  style={{
                    background: 'linear-gradient(135deg, rgba(255,153,0,0.2), rgba(0,217,255,0.2))',
                    filter: 'blur(20px)',
                  }}
                />

                {/* Content */}
                <div className="relative z-10 text-center px-4">
                  <div
                    className={`text-xl md:text-2xl font-bold font-display transition-colors duration-300 ${
                      isHovered ? 'text-white glow-text' : 'text-gray-400'
                    }`}
                  >
                    {sponsor.name}
                  </div>
                  {sponsor.logoUrl && (
                    <div className="mt-2 text-xs text-gray-500 font-mono">PARTNER</div>
                  )}
                </div>

                {/* Corner accent */}
                <div
                  className={`absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 rounded-tr-2xl transition-colors duration-300 ${
                    isHovered ? 'border-aws-orange' : 'border-white/10'
                  }`}
                />
              </div>
            );

            return sponsor.link ? (
              <a
                key={sponsor.name}
                href={sponsor.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                {content}
              </a>
            ) : (
              <div key={sponsor.name}>{content}</div>
            );
          })}
        </div>

        {/* Decorative divider */}
        <div className="mt-20 flex justify-center">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-aws-orange animate-pulse-slow" />
            <div className="h-px w-64 bg-gradient-to-r from-transparent via-aws-orange/50 to-transparent" />
            <div className="w-2 h-2 rounded-full bg-cyber-blue animate-pulse-slow" style={{ animationDelay: '0.5s' }} />
          </div>
        </div>
      </Container>
    </section>
  );
};
