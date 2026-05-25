import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Terms = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-24 pb-20 bg-slate-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl font-bold text-slate-900 mb-6">Terms of Service</h1>
          
          <div className="bg-white p-8 rounded-2xl border shadow-sm prose max-w-none text-slate-600 leading-relaxed space-y-6">
            <p><strong>Effective Date: May 25, 2026</strong></p>
            
            <p>Welcome to ServiceMatch. By accessing our platform, website, or services, you agree to comply with and be bound by the following Terms of Service. Please review these terms carefully.</p>

            <h2 className="text-xl font-bold text-slate-800 pt-4 border-t">1. User Accounts</h2>
            <p>You must provide accurate, current, and complete information when registering an account. You are solely responsible for maintaining the confidentiality of your credentials and all activities occurring under your account.</p>

            <h2 className="text-xl font-bold text-slate-800 pt-4 border-t">2. Platform Usage</h2>
            <p>ServiceMatch connects hospitality jobseekers with hiring venues. We do not act as an employer of jobseekers, nor are we responsible for direct hiring decisions or on-site workplace safety, which remain the sole obligation of respective hiring venues.</p>

            <h2 className="text-xl font-bold text-slate-800 pt-4 border-t">3. Acceptable Conduct</h2>
            <p>All users agree to interact in a professional, legal, and respectful manner. You must not post fraudulent listings, impersonate others, or scrape platform data. Failure to comply will result in account cancellation.</p>

            <h2 className="text-xl font-bold text-slate-800 pt-4 border-t">4. Limitation of Liability</h2>
            <p>ServiceMatch is provided "as is". In no event shall ServiceMatch be liable for any indirect, incidental, or consequential damages arising out of your use or inability to use the platform.</p>

            <h2 className="text-xl font-bold text-slate-800 pt-4 border-t">5. Changes to Terms</h2>
            <p>We reserve the right to modify these terms at any time. We will notify users of significant updates by posting a notice on our site.</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Terms;
