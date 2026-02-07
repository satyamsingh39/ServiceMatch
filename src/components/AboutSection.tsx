import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Target, Users, Zap } from 'lucide-react';

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const features = [
    {
      icon: Target,
      title: 'Our Mission',
      description: 'To revolutionize how businesses find skilled professionals',
    },
    {
      icon: Users,
      title: 'Our Community',
      description: 'Building a trusted network of verified professionals',
    },
    {
      icon: Zap,
      title: 'Our Promise',
      description: 'Fast, reliable, and efficient matching every time',
    },
  ];

  return (
    <section id="about" ref={ref} className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Empowering Connections,
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              {' '}
              Building Futures
            </span>
          </h2>
          <p className="text-lg text-muted-foreground">
            ServiceMatch is more than a platform—it's a movement to transform how
            businesses and professionals connect. We believe in creating opportunities
            that foster growth, trust, and success for everyone involved.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="bg-card rounded-2xl p-8 shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="w-14 h-14 rounded-xl bg-gradient-primary flex items-center justify-center mb-4">
                <feature.icon className="text-white" size={28} />
              </div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
