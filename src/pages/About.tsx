import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Shield, Sparkles, Star, Users } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-24 pb-20 bg-slate-50">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">About ServiceMatch</h1>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Connecting exceptional hospitality professionals with premium service venues.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <div className="bg-white p-8 rounded-2xl border shadow-sm flex flex-col justify-center">
              <h2 className="text-2xl font-bold text-slate-800 mb-4">Our Mission</h2>
              <p className="text-slate-600 leading-relaxed">
                At ServiceMatch, our mission is to empower the service industry by offering a seamless job matchmaking platform. We believe that staffing in fine dining, hotels, and events should be efficient, fast, and high-quality.
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl border shadow-sm flex flex-col justify-center">
              <h2 className="text-2xl font-bold text-slate-800 mb-4">Our Vision</h2>
              <p className="text-slate-600 leading-relaxed">
                We envision a world where hiring is transparent and fair, enabling skilled waiters, chefs, and bartenders to grow their careers while assisting premier establishments in finding reliable talent instantly.
              </p>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-center text-slate-800 mb-8">Our Core Values</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { icon: Users, title: 'Community First', desc: 'We build relationships that matter.' },
              { icon: Shield, title: 'Trust & Safety', desc: 'Thorough background checks for all.' },
              { icon: Sparkles, title: 'AI Matching', desc: 'Connecting skills to perfect roles.' },
              { icon: Star, title: 'Premium Service', desc: 'Maintaining high hospitality standards.' },
            ].map((value, i) => (
              <div key={i} className="bg-white p-6 rounded-xl border text-center">
                <value.icon className="mx-auto text-primary mb-3" size={32} />
                <h3 className="font-bold text-slate-800 mb-1">{value.title}</h3>
                <p className="text-xs text-slate-500">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default About;
