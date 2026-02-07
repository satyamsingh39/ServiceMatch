import { useState } from 'react';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const isContactPage = location.pathname === '/contact';

  const navLinks = [
    { label: 'Home', href: '/', isRoute: true },
    { label: 'About', href: '#about', isRoute: false },
    { label: 'Services', href: '#services', isRoute: false },
    { label: 'Contact', href: '/contact', isRoute: true },
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b shadow-sm"
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent"
          >
            ServiceMatch
          </motion.div>

          {/* Desktop Navigation - Centered */}
          <nav className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
            {navLinks.map((link, index) => (
              link.isRoute ? (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                >
                  <Link
                    to={link.href}
                    className="text-foreground hover:text-primary transition-colors font-medium"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ) : (
                <motion.a
                  key={link.label}
                  href={link.href}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className="text-foreground hover:text-primary transition-colors font-medium"
                >
                  {link.label}
                </motion.a>
              )
            ))}
          </nav>

          {/* Login/Signup Buttons - Desktop */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="hidden md:flex items-center gap-3"
          >
            <Link to="/login">
              <Button variant="ghost" className="font-medium">
                Login
              </Button>
            </Link>
            <Link to="/signup">
              <Button className="bg-gradient-primary hover:opacity-90 transition-opacity">
                Signup
              </Button>
            </Link>
          </motion.div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-foreground"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden mt-4 flex flex-col gap-4 pb-4"
          >
            {navLinks.map((link) => (
              link.isRoute ? (
                <Link
                  key={link.label}
                  to={link.href}
                  className="text-foreground hover:text-primary transition-colors font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ) : (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-foreground hover:text-primary transition-colors font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </a>
              )
            ))}
            <div className="flex gap-3">
              <Link to="/login" className="flex-1">
                <Button variant="ghost" className="font-medium w-full">
                  Login
                </Button>
              </Link>
              <Link to="/signup" className="flex-1">
                <Button className="bg-gradient-primary hover:opacity-90 transition-opacity w-full">
                  Signup
                </Button>
              </Link>
            </div>
          </motion.nav>
        )}
      </div>
    </motion.header>
  );
};

export default Header;
