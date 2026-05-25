import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const FAQ = () => {
  const faqs = [
    { q: 'How does the Match Score work?', a: 'Our AI engine compares your listed hospitality skills, location, hourly expectations, and verification status against the requirements of the job opening to score suitability out of 100.' },
    { q: 'Is there a fee to sign up?', a: 'No, signing up is completely free for jobseekers. For employers, we offer subscription plans and per-job posting packages.' },
    { q: 'How do background checks work?', a: 'ServiceMatch partners with leading verified third-party background checkers to run identification, license validation, and professional reference checks.' },
    { q: 'How are wages processed?', a: 'Hourly shift wages are directly tracked via the portal and deposited into your registered bank account weekly once approved by the venue manager.' }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-24 pb-20 bg-slate-50">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-slate-900 mb-4">Frequently Asked Questions</h1>
            <p className="text-slate-600">
              Clear answers to common questions about using ServiceMatch.
            </p>
          </div>

          <div className="bg-white p-6 md:p-8 rounded-2xl border shadow-sm">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, idx) => (
                <AccordionItem key={idx} value={`item-${idx}`} className="border-b last:border-0 py-2">
                  <AccordionTrigger className="text-left font-bold text-slate-800 hover:text-primary transition-colors text-base md:text-lg">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-slate-600 text-sm leading-relaxed pt-2">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default FAQ;
