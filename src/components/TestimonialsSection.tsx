import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Star, Quote } from 'lucide-react';

const TestimonialsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const testimonials = [
    {
      name: 'Rahul Jain',
      role: 'Hotel Manager',
      company: 'Grand Plaza Hotel',
      content:
        'ServiceMatch helped us find exceptional housekeeping staff within days. The quality of candidates exceeded our expectations!',
      rating: 5,
      image: '👩‍💼',
    },
    {
      name: 'Nirmit Garg',
      role: 'Restaurant Owner',
      company: 'Urban Bistro',
      content:
        "Finding skilled chefs has never been easier. ServiceMatch's verification process gave us confidence in our hires.",
      rating: 5,
      image: '👨‍🍳',
    },
    {
      name: 'Mohit Yadav',
      role: 'Job Seeker',
      company: 'Hospitality Professional',
      content:
        'I landed my dream job through ServiceMatch! The platform is user-friendly and the opportunities are genuine.',
      rating: 5,
      image: '👩',
    },
  ];

  return (
    <section ref={ref} className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            What Our Community
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              {' '}
              Says About Us
            </span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Real stories from real people who found success through ServiceMatch.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardContent className="p-6 space-y-4">
                  <Quote className="text-primary opacity-50" size={32} />
                  <p className="text-muted-foreground italic">
                    "{testimonial.content}"
                  </p>
                  <div className="flex gap-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="text-yellow-400 fill-yellow-400"
                        size={16}
                      />
                    ))}
                  </div>
                  <div className="flex items-center gap-3 pt-4 border-t">
                    <div className="text-3xl">{testimonial.image}</div>
                    <div>
                      <div className="font-semibold">{testimonial.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {testimonial.role}
                      </div>
                      <div className="text-xs text-primary">
                        {testimonial.company}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
