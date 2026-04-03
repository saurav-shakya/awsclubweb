import { Container } from '@/components/ui/Container';

interface Sponsor {
  name: string;
  logoUrl: string;
  link?: string;
}

interface SponsorsProps {
  sponsors: Sponsor[];
}

export const Sponsors: React.FC<SponsorsProps> = ({ sponsors }) => {
  return (
    <section className="py-20 bg-gray-950">
      <Container>
        <div className="mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-2">Our Partners</h2>
          <div className="w-12 h-1 bg-aws-orange rounded" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {sponsors.map((sponsor) => (
            <div
              key={sponsor.name}
              className="flex items-center justify-center p-6 bg-gray-900 rounded-lg border border-gray-800 hover:border-aws-orange transition-colors"
            >
              {sponsor.link ? (
                <a href={sponsor.link} target="_blank" rel="noopener noreferrer" className="w-full h-full flex items-center justify-center">
                  <div className="text-gray-400 hover:text-aws-orange transition-colors font-semibold text-center">
                    {sponsor.name}
                  </div>
                </a>
              ) : (
                <div className="text-gray-400 font-semibold text-center">{sponsor.name}</div>
              )}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};
