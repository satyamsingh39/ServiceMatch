import { Facebook, Instagram, Linkedin, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const footerLinks = {
    Company: ['About Us', 'Careers', 'Press', 'Blog'],
    Support: ['Help Center', 'Safety', 'Contact Us', 'Terms of Service'],
    Resources: ['For Employers', 'For Job Seekers', 'Success Stories', 'FAQ'],
  };

  const linkRoutes: Record<string, string> = {
    'About Us': '/about',
    'Careers': '/careers',
    'Press': '/press',
    'Blog': '/blog',
    'Help Center': '/help-center',
    'Safety': '/safety',
    'Contact Us': '/contact',
    'Terms of Service': '/terms',
    'For Employers': '/for-employers',
    'For Job Seekers': '/for-job-seekers',
    'Success Stories': '/success-stories',
    'FAQ': '/faq',
  };

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Mail, href: '#', label: 'Email' },
  ];

  return (
    <footer className="bg-card border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              ServiceMatch
            </div>
            <p className="text-sm text-muted-foreground">
              Connecting exceptional talent with outstanding opportunities in the
              service industry.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-full bg-muted hover:bg-primary hover:text-white transition-colors flex items-center justify-center"
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="font-semibold mb-4">{category}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link}>
                    <Link
                      to={linkRoutes[link] || '#'}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t text-center md:text-left">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} ServiceMatch. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm text-muted-foreground">
              <a href="/privacy-policy" className="hover:text-primary transition-colors">
                Privacy Policy
              </a>
              <a href="/cookie-policy" className="hover:text-primary transition-colors">
                Cookie Policy
              </a>
              <a href="/accessibility" className="hover:text-primary transition-colors">
                Accessibility
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
