import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const FAQSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const faqs = [
    {
      question: 'How does ServiceMatch verify professionals?',
      answer:
        'We conduct thorough background checks, verify work history, and review references for all professionals on our platform. This ensures you connect with qualified, trustworthy candidates.',
    },
    {
      question: 'What industries does ServiceMatch serve?',
      answer:
        'We specialize in hospitality, food service, retail, and other service-based industries. Our platform connects businesses with professionals including chefs, housekeeping staff, servers, front desk personnel, and more.',
    },
    {
      question: 'How long does it take to find the right candidate?',
      answer:
        'Most businesses find suitable candidates within 24-48 hours. Our AI-powered matching algorithm ensures you see the most relevant profiles immediately after posting a job.',
    },
    {
      question: 'Is there a fee for job seekers?',
      answer:
        'No! Job seekers can create profiles, browse opportunities, and apply for jobs completely free. We only charge businesses for successful placements.',
    },
    {
      question: 'Can I hire for temporary or seasonal positions?',
      answer:
        'Absolutely! ServiceMatch supports all types of employment including full-time, part-time, temporary, and seasonal positions. You can specify your requirements when posting a job.',
    },
  ];

  return (
    <section ref={ref} className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Frequently Asked
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              {' '}
              Questions
            </span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Find answers to common questions about ServiceMatch.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-3xl mx-auto"
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-card rounded-lg px-6 shadow-sm border-none"
              >
                <AccordionTrigger className="hover:no-underline hover:text-primary transition-colors text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;
