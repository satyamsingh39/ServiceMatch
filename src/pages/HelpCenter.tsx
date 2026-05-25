import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Search, Compass, BookOpen, AlertCircle, Mail } from 'lucide-react';

const HelpCenter = () => {
  const categories = [
    { icon: Compass, title: 'Getting Started', desc: 'Setting up your profile, uploading verification documents, and applying for roles.' },
    { icon: BookOpen, title: 'For Jobseekers', desc: 'Understanding match scores, tracking applications, and preparing for interviews.' },
    { icon: AlertCircle, title: 'For Employers', desc: 'Posting job listings, reviewing applicants, and subscribing to talent pools.' }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-24 pb-20 bg-slate-50">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">How can we help?</h1>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-6">
              Search our help documentation or explore support articles.
            </p>
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text" 
                placeholder="Search help articles..." 
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-white text-slate-800"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {categories.map((cat, idx) => (
              <div key={idx} className="bg-white p-6 rounded-2xl border shadow-sm hover:shadow-md transition-shadow">
                <cat.icon className="text-primary mb-3" size={28} />
                <h3 className="font-bold text-slate-800 mb-2">{cat.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{cat.desc}</p>
                <button className="text-sm font-bold text-primary mt-4 hover:underline">Explore Articles →</button>
              </div>
            ))}
          </div>

          <div className="bg-sky-50 rounded-2xl p-8 border border-sky-100 flex flex-col sm:flex-row justify-between items-center gap-6">
            <div>
              <h3 className="font-bold text-slate-800 text-lg mb-1 flex items-center gap-2">
                <Mail className="text-primary" size={20} /> Still need assistance?
              </h3>
              <p className="text-slate-600 text-sm">Our support team is available 24/7. Drop us a line and we will reply within an hour.</p>
            </div>
            <button className="bg-slate-950 hover:bg-slate-800 text-white font-medium px-5 py-2.5 rounded-xl text-sm transition-colors shrink-0">
              Contact Support
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default HelpCenter;
