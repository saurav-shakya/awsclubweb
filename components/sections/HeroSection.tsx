import { Button } from '@/components/ui/Button';

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
  const heightClass = size === 'full' ? 'min-h-screen' : 'min-h-96';

  return (
    <section
      className={`${heightClass} flex items-center justify-center bg-gradient-to-b from-aws-navy to-gray-900 relative overflow-hidden`}
    >
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-aws-orange/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-aws-orange/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 md:px-6 lg:px-8 text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
          {title}
        </h1>
        <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">{subtitle}</p>
        <Button variant="primary" size="lg" href={ctaLink}>
          {ctaText}
        </Button>
      </div>
    </section>
  );
};
