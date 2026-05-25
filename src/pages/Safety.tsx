import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ShieldAlert, ShieldCheck, HeartHandshake, Eye } from 'lucide-react';

const Safety = () => {
  const sections = [
    { icon: ShieldCheck, title: 'Verified Backgrounds', text: 'All workers undergo robust national identity and professional history checks to maintain a high-trust platform environment.' },
    { icon: Eye, title: 'Privacy First', text: 'We hide sensitive contact details until you match or approve a connection, ensuring you are in complete control of your data.' },
    { icon: HeartHandshake, title: 'Fair Compensation Guarantee', text: 'ServiceMatch checks that pay rates comply with national labor laws and guarantees payment processing for all hours worked.' },
    { icon: ShieldAlert, title: 'Report Incidents', text: 'If you encounter safety issues, abuse, or wage discrepancy, you can immediately report it via the Support center.' }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-24 pb-20 bg-slate-50">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">Safety & Trust</h1>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Our priority is keeping your job search and hiring experience secure, transparent, and fair.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {sections.map((section, idx) => (
              <div key={idx} className="bg-white p-6 rounded-2xl border shadow-sm flex gap-4">
                <div className="p-3 bg-sky-50 rounded-xl text-primary h-12 w-12 flex items-center justify-center shrink-0">
                  <section.icon size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 text-lg mb-2">{section.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{section.text}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-rose-50 border border-rose-100 p-8 rounded-2xl">
            <h3 className="font-bold text-rose-800 text-lg mb-2">Zero Tolerance Policy</h3>
            <p className="text-rose-700 text-sm leading-relaxed">
              ServiceMatch enforces a zero-tolerance policy against discrimination, verbal abuse, fraud, or unsafe work environments. Any user breaching these standards will face permanent account suspension.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Safety;
