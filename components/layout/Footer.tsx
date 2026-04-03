import Link from 'next/link';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-aws-navy border-t border-gray-800 mt-20">
      <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-8">
          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-gray-400 hover:text-aws-orange transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/events" className="text-gray-400 hover:text-aws-orange transition-colors">
                  Events
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-aws-orange transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Follow Us */}
          <div>
            <h3 className="text-white font-bold mb-4">Follow Us</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://linkedin.com"
                  className="text-gray-400 hover:text-aws-orange transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com"
                  className="text-gray-400 hover:text-aws-orange transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href="https://twitter.com"
                  className="text-gray-400 hover:text-aws-orange transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Twitter
                </a>
              </li>
            </ul>
          </div>

          {/* AWS Badge */}
          <div>
            <h3 className="text-white font-bold mb-4">About</h3>
            <p className="text-gray-400 text-sm">
              AWS Cloud Club at Goa College of Engineering and Technology
            </p>
            <p className="text-gray-500 text-xs mt-4">
              An initiative to promote cloud computing knowledge and skills.
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm">
              &copy; {currentYear} AWS Cloud Club GCET. All rights reserved.
            </p>
            <div className="mt-4 md:mt-0">
              <p className="text-gray-500 text-sm">AWS and the AWS logo are trademarks of Amazon.com, Inc.</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
