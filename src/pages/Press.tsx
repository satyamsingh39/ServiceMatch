import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Download, FileText, Share2 } from 'lucide-react';

const Press = () => {
  const releases = [
    { date: 'May 15, 2026', title: 'ServiceMatch Closes $12M Series A Funding to Accelerate AI Job Matching Capabilities', category: 'Corporate' },
    { date: 'April 2, 2026', title: 'ServiceMatch Introduces Luminous UI Redesign & New Verification System', category: 'Product' },
    { date: 'February 10, 2026', title: 'ServiceMatch Partners with Leading National Hotel Chains for Elite Hospitality Staffing', category: 'Partnership' }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-24 pb-20 bg-slate-50">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">Press Room</h1>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Find our latest press releases, brand assets, and company updates.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-16">
            <div className="bg-white p-6 rounded-2xl border shadow-sm flex flex-col items-center text-center">
              <FileText className="text-primary mb-3" size={32} />
              <h3 className="font-bold text-slate-800 mb-1">Media Kit</h3>
              <p className="text-sm text-slate-500 mb-4">Download company bios, logos, and high-res team photos.</p>
              <button className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 rounded-xl text-xs font-semibold">
                <Download size={14} /> Download ZIP
              </button>
            </div>
            <div className="bg-white p-6 rounded-2xl border shadow-sm flex flex-col items-center text-center">
              <Share2 className="text-primary mb-3" size={32} />
              <h3 className="font-bold text-slate-800 mb-1">PR Contact</h3>
              <p className="text-sm text-slate-500 mb-4">For press inquiries, please email our communications team.</p>
              <a href="mailto:press@servicematch.com" className="text-sm font-bold text-primary hover:underline">press@servicematch.com</a>
            </div>
            <div className="bg-white p-6 rounded-2xl border shadow-sm flex flex-col items-center text-center">
              <FileText className="text-primary mb-3" size={32} />
              <h3 className="font-bold text-slate-800 mb-1">Quick Facts</h3>
              <p className="text-sm text-slate-500 mb-4">Founded: 2024. Active Cities: 50+. Users: 100K+.</p>
              <button className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 rounded-xl text-xs font-semibold">
                View Factsheet
              </button>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-slate-800 mb-6">Press Releases</h2>
          <div className="space-y-6">
            {releases.map((item, idx) => (
              <div key={idx} className="bg-white p-6 rounded-xl border shadow-sm">
                <span className="bg-sky-50 text-primary text-xs font-bold px-2.5 py-1 rounded-md">{item.category}</span>
                <span className="text-xs text-slate-400 ml-3">{item.date}</span>
                <h3 className="font-bold text-slate-800 text-lg mt-2 mb-2 hover:text-primary cursor-pointer">{item.title}</h3>
                <p className="text-slate-500 text-sm">Read the full release to learn more about this announcement.</p>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Press;
