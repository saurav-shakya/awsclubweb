'use client';

import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { Calendar, MapPin, Users } from 'lucide-react';
import { useState } from 'react';

interface FeaturedEventProps {
  event: {
    title: string;
    date: string;
    mode: 'online' | 'offline' | 'hybrid';
    tags: string[];
    description: string;
    lumaUrl: string;
  };
}

export const FeaturedEvent: React.FC<FeaturedEventProps> = ({ event }) => {
  const [isHovered, setIsHovered] = useState(false);
  const modeVariant = event.mode === 'online' ? 'online' : 'offline';

  return (
    <section className="py-32 bg-black relative overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 cyber-grid opacity-30" />

      {/* Gradient overlays */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-aws-orange/10 rounded-full blur-[150px]" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-cyber-blue/10 rounded-full blur-[120px]" />

      <Container>
        {/* Section header */}
        <div className="mb-16 relative">
          <div className="inline-block mb-4">
            <span className="text-aws-orange/60 text-sm font-mono tracking-widest uppercase">
              &lt;NextEvent/&gt;
            </span>
          </div>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-4 tracking-tight">
            Featured <span className="gradient-text">Event</span>
          </h2>
          <div className="flex items-center gap-3">
            <div className="h-1 w-20 bg-gradient-to-r from-aws-orange to-transparent rounded-full" />
            <div className="h-0.5 w-40 bg-gradient-to-r from-aws-orange/50 to-transparent rounded-full" />
          </div>
        </div>

        {/* Event card with 3D effect */}
        <div
          className="max-w-5xl mx-auto perspective-card"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          style={{
            transform: isHovered
              ? 'perspective(1000px) rotateX(2deg) rotateY(-3deg)'
              : 'perspective(1000px) rotateX(0deg) rotateY(0deg)',
            transition: 'transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)',
          }}
        >
          <div className="glass-card rounded-3xl p-8 md:p-12 relative overflow-hidden group">
            {/* Animated border glow */}
            <div
              className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{
                background: 'linear-gradient(135deg, rgba(255,153,0,0.3), rgba(0,217,255,0.3))',
                filter: 'blur(20px)',
                zIndex: -1,
              }}
            />

            {/* Corner accents */}
            <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-aws-orange/50 rounded-tl-3xl" />
            <div className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-cyber-blue/50 rounded-br-3xl" />

            <div className="space-y-8">
              {/* Event Title & Tags */}
              <div>
                <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight glow-text">
                  {event.title}
                </h3>
                <div className="flex flex-wrap gap-3">
                  <Badge text={event.mode.charAt(0).toUpperCase() + event.mode.slice(1)} variant={modeVariant} />
                  {event.tags.map((tag) => (
                    <Badge key={tag} text={tag} variant="default" />
                  ))}
                </div>
              </div>

              {/* Event metadata */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex items-start gap-4 group/item">
                  <div className="p-3 rounded-xl glass-effect group-hover/item:bg-aws-orange/20 transition-colors">
                    <Calendar className="w-6 h-6 text-aws-orange" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider mb-1 font-mono">Date & Time</p>
                    <p className="text-white font-medium">{event.date}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 group/item">
                  <div className="p-3 rounded-xl glass-effect group-hover/item:bg-cyber-blue/20 transition-colors">
                    <MapPin className="w-6 h-6 text-cyber-blue" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider mb-1 font-mono">Mode</p>
                    <p className="text-white font-medium capitalize">{event.mode} Event</p>
                  </div>
                </div>
              </div>

              {/* Event Description */}
              <div className="pt-6 border-t border-white/10">
                <p className="text-gray-300 leading-relaxed text-base md:text-lg">
                  {event.description}
                </p>
              </div>

              {/* CTA Section */}
              <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row gap-4 items-center justify-between">
                <div className="flex items-center gap-3 text-gray-400">
                  <Users className="w-5 h-5" />
                  <span className="text-sm font-mono">Limited seats available</span>
                </div>
                <Button variant="primary" size="lg" href={event.lumaUrl}>
                  Register on Luma →
                </Button>
              </div>
            </div>

            {/* Decorative corner dots */}
            <div className="absolute top-4 right-4 flex gap-1.5">
              <div className="w-2 h-2 rounded-full bg-aws-orange animate-pulse-slow" />
              <div className="w-2 h-2 rounded-full bg-cyber-blue animate-pulse-slow" style={{ animationDelay: '0.5s' }} />
              <div className="w-2 h-2 rounded-full bg-neon-purple animate-pulse-slow" style={{ animationDelay: '1s' }} />
            </div>
          </div>
        </div>

        {/* Bottom decorative line */}
        <div className="mt-12 flex justify-center">
          <div className="h-px w-96 bg-gradient-to-r from-transparent via-aws-orange/50 to-transparent" />
        </div>
      </Container>
    </section>
  );
};
