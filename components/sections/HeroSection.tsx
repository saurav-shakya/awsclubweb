'use client';

import { Button } from '@/components/ui/Button';
import { useEffect, useRef } from 'react';

interface HeroSectionProps {
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
  size?: 'full' | 'half';
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  title,
  subtitle,
  ctaText,
  ctaLink,
  size = 'full',
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const heightClass = size === 'full' ? 'min-h-screen' : 'min-h-96';

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Grid settings
    const gridSize = 60;
    const nodes: { x: number; y: number; pulse: number; pulseSpeed: number }[] = [];

    // Create grid nodes
    for (let x = 0; x < canvas.width; x += gridSize) {
      for (let y = 0; y < canvas.height; y += gridSize) {
        nodes.push({
          x,
          y,
          pulse: Math.random() * Math.PI * 2,
          pulseSpeed: 0.02 + Math.random() * 0.03,
        });
      }
    }

    // Animation loop
    let animationId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw grid lines
      ctx.strokeStyle = 'rgba(255, 153, 0, 0.1)';
      ctx.lineWidth = 1;

      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }

      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Draw and animate nodes
      nodes.forEach((node) => {
        node.pulse += node.pulseSpeed;
        const alpha = (Math.sin(node.pulse) + 1) / 2;
        const radius = 2 + alpha * 3;

        // Draw node
        ctx.fillStyle = `rgba(255, 153, 0, ${alpha * 0.8})`;
        ctx.beginPath();
        ctx.arc(node.x, node.y, radius, 0, Math.PI * 2);
        ctx.fill();

        // Draw glow
        const gradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, 15);
        gradient.addColorStop(0, `rgba(255, 153, 0, ${alpha * 0.3})`);
        gradient.addColorStop(1, 'rgba(255, 153, 0, 0)');
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(node.x, node.y, 15, 0, Math.PI * 2);
        ctx.fill();
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <section
      className={`${heightClass} flex items-center justify-center relative overflow-hidden bg-black`}
    >
      {/* Animated canvas grid */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0"
        style={{ mixBlendMode: 'screen' }}
      />

      {/* Perspective gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black z-[1]" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-aws-orange/20 rounded-full blur-[120px] z-[2]" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-cyber-blue/10 rounded-full blur-[100px] z-[2]" />

      {/* Scanline effect */}
      <div className="absolute inset-0 scanline-effect z-[3]" />

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-6 lg:px-8 text-center">
        {/* Glitch effect subtitle */}
        <div className="mb-4 inline-block">
          <div className="px-4 py-1.5 glass-effect rounded-full border border-aws-orange/30">
            <span className="text-aws-orange text-xs md:text-sm font-mono tracking-wider uppercase">
              // Powered by AWS Cloud
            </span>
          </div>
        </div>

        {/* Main title with gradient */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-6 leading-[1.1] tracking-tight">
          <span className="inline-block glow-text">{title.split(' ')[0]}</span>
          <br />
          <span className="gradient-text inline-block">
            {title.split(' ').slice(1).join(' ')}
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-base md:text-xl text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed font-light tracking-wide">
          {subtitle}
        </p>

        {/* CTA with glow effect */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button variant="primary" size="lg" href={ctaLink}>
            {ctaText}
          </Button>
          <button className="px-8 py-4 text-lg font-semibold rounded-lg transition-all duration-200 border-2 border-white/20 text-white hover:border-aws-orange hover:bg-aws-orange/10 backdrop-blur-sm">
            Learn More
          </button>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-1/2 left-10 w-2 h-2 bg-aws-orange rounded-full animate-pulse-slow" />
        <div className="absolute top-1/3 right-20 w-2 h-2 bg-cyber-blue rounded-full animate-pulse-slow" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-1/3 left-1/4 w-2 h-2 bg-neon-purple rounded-full animate-pulse-slow" style={{ animationDelay: '2s' }} />
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent z-[4]" />
    </section>
  );
};
