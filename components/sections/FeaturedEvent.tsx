import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';

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
  const modeVariant = event.mode === 'online' ? 'online' : 'offline';

  return (
    <section className="py-20 bg-aws-navy">
      <Container>
        <div className="mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-2">Featured Event</h2>
          <div className="w-12 h-1 bg-aws-orange rounded" />
        </div>

        <Card className="max-w-2xl">
          <div className="space-y-6">
            {/* Event Title */}
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">{event.title}</h3>
              <div className="flex flex-wrap gap-3">
                <Badge text={event.mode.charAt(0).toUpperCase() + event.mode.slice(1)} variant={modeVariant} />
                {event.tags.map((tag) => (
                  <Badge key={tag} text={tag} variant="default" />
                ))}
              </div>
            </div>

            {/* Event Date */}
            <div className="pt-4 border-t border-gray-800">
              <p className="text-gray-400">
                <span className="font-semibold text-aws-orange">Date & Time:</span> {event.date}
              </p>
            </div>

            {/* Event Description */}
            <div className="pt-4 border-t border-gray-800">
              <p className="text-gray-300 leading-relaxed">{event.description}</p>
            </div>

            {/* CTA Button */}
            <div className="pt-4 border-t border-gray-800">
              <Button variant="primary" size="md" href={event.lumaUrl}>
                Register on Luma
              </Button>
            </div>
          </div>
        </Card>
      </Container>
    </section>
  );
};
