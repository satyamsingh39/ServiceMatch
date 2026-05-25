import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Target, Users, Zap, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

const ForEmployers = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-24 pb-20 bg-slate-50">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">ServiceMatch for Employers</h1>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Hire vetted, high-quality hospitality professionals instantly.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 mb-16 items-center">
            <div>
              <h2 className="text-3xl font-bold text-slate-800 mb-6">Staffing, Reimagined.</h2>
              <p className="text-slate-600 mb-6 leading-relaxed">
                Whether you operate a boutique hotel, a busy fine dining restaurant, or a seasonal catering company, finding qualified staff quickly can be stressful. ServiceMatch does the heavy lifting, delivering matches immediately.
              </p>
              
              <div className="space-y-4">
                {[
                  { icon: Target, title: 'AI Match Matchmaking', desc: 'Screen applicants by matching hospitality credentials and availability scores.' },
                  { icon: ShieldCheck, title: 'Background Checked & Vetted', desc: 'Reduce risk with verified profiles and references.' },
                  { icon: Zap, title: 'Lightning Fast Postings', desc: 'Post a shift or job opening in 2 minutes and get matches instantly.' }
                ].map((feat, idx) => (
                  <div key={idx} className="flex gap-3">
                    <feat.icon className="text-primary shrink-0 mt-1" size={20} />
                    <div>
                      <h4 className="font-bold text-slate-800">{feat.title}</h4>
                      <p className="text-sm text-slate-500">{feat.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl border shadow-sm text-center">
              <h3 className="text-2xl font-bold text-slate-800 mb-2">Ready to hire?</h3>
              <p className="text-slate-500 mb-6">Create an employer account to post your first job opening.</p>
              <Link to="/signup?role=employer" className="block w-full bg-slate-950 hover:bg-slate-800 text-white font-bold py-3 rounded-xl shadow-lg transition-colors mb-4">
                Get Started
              </Link>
              <Link to="/contact" className="text-sm font-semibold text-primary hover:underline">
                Talk to Sales
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ForEmployers;
