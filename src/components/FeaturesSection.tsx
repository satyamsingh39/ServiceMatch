import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { UserCheck, Shield, Sparkles, Clock } from 'lucide-react';

const FeaturesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const features = [
    {
      icon: UserCheck,
      title: 'Easy Registration',
      description:
        'Simple, streamlined onboarding process that gets you started in minutes.',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Shield,
      title: 'Verified Profiles',
      description:
        'Every professional is thoroughly vetted to ensure quality and reliability.',
      color: 'from-primary to-secondary',
    },
    {
      icon: Sparkles,
      title: 'Smart Job Matching',
      description:
        'AI-powered algorithm connects you with the perfect opportunities.',
      color: 'from-purple-500 to-pink-500',
    },
    {
      icon: Clock,
      title: 'Instant Connections',
      description:
        'Real-time notifications and quick response times for faster hiring.',
      color: 'from-orange-500 to-red-500',
    },
  ];

  return (
    <section id="services" ref={ref} className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Features That
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              {' '}
              Make a Difference
            </span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Discover why thousands of businesses and professionals choose ServiceMatch
            as their trusted platform.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-2 border-none shadow-md">
                <CardContent className="p-6 space-y-4">
                  <div
                    className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center`}
                  >
                    <feature.icon className="text-white" size={28} />
                  </div>
                  <h3 className="text-xl font-bold">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
