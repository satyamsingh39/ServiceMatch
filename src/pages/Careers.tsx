import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Briefcase, Heart, Smile, Sparkles } from 'lucide-react';

const Careers = () => {
  const openings = [
    { title: 'Senior Software Engineer (Full Stack)', dept: 'Engineering', type: 'Full-time' },
    { title: 'Product Designer', dept: 'Product', type: 'Full-time' },
    { title: 'Talent Acquisition Manager', dept: 'Operations', type: 'Full-time' },
    { title: 'Customer Support Lead', dept: 'Support', type: 'Full-time' }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-24 pb-20 bg-slate-50">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">Join Our Team</h1>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Help us reshape the future of hospitality work and staffing.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {[
              { icon: Heart, title: 'Incredible Culture', desc: 'Work with passionate, driven teammates who love to support one another.' },
              { icon: Smile, title: 'Work-Life Balance', desc: 'Unlimited time off, flexible working hours, and remote work options.' },
              { icon: Sparkles, title: 'Growth & Learning', desc: 'We sponsor educational courses, events, and career mentorship.' }
            ].map((perk, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl border text-center shadow-sm">
                <perk.icon className="mx-auto text-primary mb-3" size={32} />
                <h3 className="font-bold text-slate-800 mb-2">{perk.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{perk.desc}</p>
              </div>
            ))}
          </div>

          <h2 className="text-3xl font-bold text-slate-950 mb-6 text-center">Open Positions</h2>
          <div className="bg-white rounded-2xl border shadow-sm divide-y">
            {openings.map((job, idx) => (
              <div key={idx} className="p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h3 className="font-bold text-slate-800 text-lg">{job.title}</h3>
                  <div className="flex gap-2 text-sm text-slate-500 mt-1">
                    <span>{job.dept}</span>
                    <span>•</span>
                    <span>{job.type}</span>
                  </div>
                </div>
                <button className="bg-slate-950 hover:bg-slate-800 text-white font-medium px-4 py-2 rounded-xl text-sm transition-colors">
                  Apply Now
                </button>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Careers;
