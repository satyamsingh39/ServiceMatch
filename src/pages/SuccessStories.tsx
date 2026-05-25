import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Quote } from 'lucide-react';

const SuccessStories = () => {
  const stories = [
    {
      name: 'Rohan Mehta',
      role: 'Head Bartender at SkyBar',
      text: 'Thanks to ServiceMatch, I landed a full-time lead mixologist position within 3 days of joining. The verification system made it extremely easy for the venue owners to trust my experience.',
      img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150'
    },
    {
      name: 'Elena Rostova',
      role: 'HR Director at Grand Palace Hotel',
      text: 'Finding premium banqueting staff during the peak wedding season used to be a nightmare. ServiceMatch helps us fill our slots with verified professionals in hours instead of weeks.',
      img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-24 pb-20 bg-slate-50">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">Success Stories</h1>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              See how ServiceMatch helps hospitality workers and employers thrive.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {stories.map((story, idx) => (
              <div key={idx} className="bg-white p-8 rounded-2xl border shadow-sm flex flex-col justify-between">
                <div>
                  <Quote className="text-primary mb-4" size={32} />
                  <p className="text-slate-600 italic mb-6 leading-relaxed">"{story.text}"</p>
                </div>
                <div className="flex items-center gap-4 border-t pt-4">
                  <img src={story.img} alt={story.name} className="w-12 h-12 rounded-full object-cover border" />
                  <div>
                    <h4 className="font-bold text-slate-800">{story.name}</h4>
                    <p className="text-xs text-slate-500">{story.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SuccessStories;
