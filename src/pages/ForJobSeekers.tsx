import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { IndianRupee, Clock, Award, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

const ForJobSeekers = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-24 pb-20 bg-slate-50">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">ServiceMatch for Job Seekers</h1>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Find flexible shifts and permanent roles that match your expertise.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 mb-16 items-center">
            <div className="bg-white p-8 rounded-2xl border shadow-sm text-center md:order-2">
              <h3 className="text-2xl font-bold text-slate-800 mb-2">Find your next role</h3>
              <p className="text-slate-500 mb-6">Create a jobseeker account to apply for active shifts and jobs.</p>
              <Link to="/signup?role=waiter" className="block w-full bg-slate-950 hover:bg-slate-800 text-white font-bold py-3 rounded-xl shadow-lg transition-colors mb-4">
                Sign Up as Waiter/Chef
              </Link>
              <Link to="/login" className="text-sm font-semibold text-primary hover:underline">
                Log In to Account
              </Link>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-slate-800 mb-6">Your Career, Your Rules.</h2>
              <p className="text-slate-600 mb-6 leading-relaxed">
                Whether you are looking for part-time waiter shifts, professional kitchen roles, or event gigs, ServiceMatch connects you with premium hospitality venues looking for your skills.
              </p>
              
              <div className="space-y-4">
                {[
                  { icon: IndianRupee, title: 'Competitive, Guaranteed Pay', desc: 'Secure transparent, verified hourly rates paid directly to you.' },
                  { icon: Clock, title: 'Flexible Schedule', desc: 'Choose shifts and positions that match your personal lifestyle and timing.' },
                  { icon: Award, title: 'Showcase Credentials', desc: 'Construct a verified profile highlighting health certifications, experience, and ratings.' }
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
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ForJobSeekers;
