import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import heroImage from '@/assets/hero-illustration.png';
import { ArrowRight, Hotel, ChefHat, UtensilsCrossed, Coffee } from 'lucide-react';

const HeroSection = () => {
  return (
    <section id="home" className="pt-24 pb-20 bg-gradient-subtle">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-5xl md:text-6xl font-bold leading-tight"
            >
              Connect the Right
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                {' '}
                Talent{' '}
              </span>
              with the Perfect Job
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl text-muted-foreground"
            >
              ServiceMatch bridges the gap between talented professionals and businesses
              seeking exceptional service. Find your perfect match today.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap gap-4"
            >
              <Link to="/signup">
                <Button
                  size="lg"
                  className="bg-gradient-primary hover:opacity-90 transition-opacity group"
                >
                  Get Started
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/learn-more">
                <Button size="lg" variant="outline">
                  Learn More
                </Button>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="flex gap-8 pt-4"
            >
              <div>
                <div className="text-3xl font-bold text-primary">10K+</div>
                <div className="text-sm text-muted-foreground">Active Jobs</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary">50K+</div>
                <div className="text-sm text-muted-foreground">Professionals</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary">98%</div>
                <div className="text-sm text-muted-foreground">Success Rate</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative"
          >
            <img
              src={heroImage}
              alt="ServiceMatch team collaboration"
              className="w-full h-auto rounded-2xl shadow-lg"
            />
            
            {/* Animated Icons */}
            <motion.div
              animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute top-8 -left-6 bg-white dark:bg-card p-3 rounded-xl shadow-lg"
            >
              <Hotel className="w-6 h-6 text-primary" />
            </motion.div>
            
            <motion.div
              animate={{ y: [0, -12, 0], rotate: [0, -5, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
              className="absolute top-1/4 -right-6 bg-white dark:bg-card p-3 rounded-xl shadow-lg"
            >
              <ChefHat className="w-6 h-6 text-primary" />
            </motion.div>
            
            <motion.div
              animate={{ y: [0, -10, 0], rotate: [0, 8, 0] }}
              transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
              className="absolute bottom-1/4 -left-4 bg-white dark:bg-card p-3 rounded-xl shadow-lg"
            >
              <UtensilsCrossed className="w-6 h-6 text-primary" />
            </motion.div>
            
            <motion.div
              animate={{ y: [0, -18, 0], rotate: [0, -8, 0] }}
              transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut', delay: 0.9 }}
              className="absolute bottom-12 -right-4 bg-white dark:bg-card p-3 rounded-xl shadow-lg"
            >
              <Coffee className="w-6 h-6 text-primary" />
            </motion.div>
            
            <div className="absolute -bottom-4 -right-4 w-72 h-72 bg-primary/20 rounded-full blur-3xl -z-10" />
            <div className="absolute -top-4 -left-4 w-72 h-72 bg-secondary/20 rounded-full blur-3xl -z-10" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
