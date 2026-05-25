import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Calendar, User, Clock } from 'lucide-react';

const Blog = () => {
  const posts = [
    {
      title: 'Top 5 Hospitality Resume Tips for 2026',
      excerpt: 'Learn how to construct a resume that stands out to premier fine dining managers and hotel operators.',
      author: 'Satyam Singh',
      date: 'May 20, 2026',
      readTime: '5 min read'
    },
    {
      title: 'Hiring Efficiency: How AI Match Scores Reduce Staffing Costs',
      excerpt: 'Discover how using automated screening score metrics saves hotels and caterers hours of scheduling.',
      author: 'Deepak Kumar',
      date: 'May 12, 2026',
      readTime: '7 min read'
    },
    {
      title: 'Mastering the Bartender Technical Interview',
      excerpt: 'A comprehensive guide to demonstrating mixology skills and customer rapport under pressure.',
      author: 'Anjali Sharma',
      date: 'April 28, 2026',
      readTime: '4 min read'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-24 pb-20 bg-slate-50">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">ServiceMatch Blog</h1>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Tips, tricks, and industry stories for hospitality workers and hiring managers.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {posts.map((post, idx) => (
              <div key={idx} className="bg-white rounded-2xl border shadow-sm overflow-hidden flex flex-col hover:shadow-md transition-shadow">
                <div className="h-48 bg-slate-200 w-full flex items-center justify-center text-slate-400">
                  Blog Post Image
                </div>
                <div className="p-6 flex-grow flex flex-col">
                  <h3 className="font-bold text-slate-800 text-lg mb-2 line-clamp-2 hover:text-primary cursor-pointer">{post.title}</h3>
                  <p className="text-slate-500 text-sm mb-4 line-clamp-3 leading-relaxed">{post.excerpt}</p>
                  
                  <div className="mt-auto pt-4 border-t border-slate-100 flex flex-wrap gap-x-4 gap-y-2 text-xs text-slate-400">
                    <span className="flex items-center gap-1"><User size={12} /> {post.author}</span>
                    <span className="flex items-center gap-1"><Calendar size={12} /> {post.date}</span>
                    <span className="flex items-center gap-1"><Clock size={12} /> {post.readTime}</span>
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

export default Blog;
