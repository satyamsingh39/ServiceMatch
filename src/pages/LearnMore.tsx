import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Users,
  TrendingUp,
  Shield,
  Clock,
  Target,
  Zap,
  Heart
} from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const LearnMore = () => {
  const stats = [
    { number: '10K+', label: 'Active Jobs', icon: Users },
    { number: '50K+', label: 'Verified Professionals', icon: Shield },
    { number: '98%', label: 'Success Rate', icon: TrendingUp },
    { number: '24/7', label: 'Support Available', icon: Clock },
  ];

  const features = [
    {
      icon: Target,
      title: 'Smart Matching',
      description: 'Our AI-powered algorithm connects the right talent with the perfect opportunities, ensuring optimal matches every time.',
    },
    {
      icon: Shield,
      title: 'Verified & Trusted',
      description: 'Every professional undergoes thorough background checks and verification to ensure quality and reliability.',
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Real-time notifications and instant connections mean you never miss out on great opportunities.',
    },
    {
      icon: Heart,
      title: 'Community Driven',
      description: 'Built by hospitality professionals for hospitality professionals, creating a supportive and thriving community.',
    },
  ];

  const industries = [
    { name: 'Fine Dining', count: '2,500+ Jobs' },
    { name: 'Hotels & Resorts', count: '3,200+ Jobs' },
    { name: 'Quick Service', count: '1,800+ Jobs' },
    { name: 'Catering', count: '950+ Jobs' },
    { name: 'Event Services', count: '600+ Jobs' },
    { name: 'Cafes & Bakeries', count: '1,100+ Jobs' },
  ];

  return (
    <>
      <title>Learn More About ServiceMatch | Connecting Hospitality Talent</title>
      <meta name="description" content="Discover how ServiceMatch revolutionizes hospitality hiring. Connect verified professionals with top opportunities in hotels, restaurants, and service industries." />

      <div className="min-h-screen flex flex-col">
        <Header />

        <main className="flex-grow pt-24 pb-20 bg-gradient-subtle">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Revolutionizing <span className="bg-gradient-primary bg-clip-text text-transparent">Hospitality Hiring</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Discover how we're transforming the way businesses and professionals connect in the hospitality industry.
                Join thousands who trust ServiceMatch for their career and hiring needs.
              </p>
            </motion.div>

            {/* Stats Grid */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="grid md:grid-cols-4 gap-6 mb-20"
            >
              {stats.map((stat, index) => (
                <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow">
                  <CardContent className="space-y-2">
                    <stat.icon className="w-8 h-8 text-primary mx-auto" />
                    <div className="text-3xl font-bold text-primary">{stat.number}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </CardContent>
                </Card>
              ))}
            </motion.div>

            {/* Features Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Why ServiceMatch <span className="bg-gradient-primary bg-clip-text text-transparent">Stands Out</span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Our platform combines cutting-edge technology with deep industry expertise to deliver unmatched results.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-12 mb-20">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                  className="flex gap-8 items-center"
                >
                  <div className="flex-1">
                    <div className="w-16 h-16 rounded-xl bg-gradient-primary flex items-center justify-center mb-4">
                      <feature.icon className="text-white" size={32} />
                    </div>
                    <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
                    <p className="text-muted-foreground text-lg">{feature.description}</p>
                  </div>
                  <div className="w-48 h-32 bg-muted rounded-lg flex items-center justify-center">
                    <span className="text-muted-foreground">Feature Image</span>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Industries Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Serving All <span className="bg-gradient-primary bg-clip-text text-transparent">Hospitality Sectors</span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                From fine dining to budget hotels, we connect talent across the entire hospitality industry.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="grid md:grid-cols-3 gap-6"
            >
              {industries.map((industry, index) => (
                <Card key={industry.name} className="p-6 hover:shadow-lg transition-shadow">
                  <CardContent className="text-center space-y-2">
                    <h3 className="text-xl font-bold">{industry.name}</h3>
                    <p className="text-primary font-semibold">{industry.count}</p>
                  </CardContent>
                </Card>
              ))}
            </motion.div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default LearnMore;
