import React from 'react';
import { Send, FileCheck, Users, CheckCircle, ChevronRight, AlertCircle } from 'lucide-react';
import StatCard from '../components/StatCard';
import JobCard from '../components/JobCard';
import { MOCK_APPLICATIONS, MOCK_JOBS, MOCK_USER } from '../services/mockData';
import { Link } from 'react-router-dom';

const Dashboard: React.FC = () => {
  // Calculate mock stats
  const appliedCount = MOCK_APPLICATIONS.length;
  const shortlistedCount = MOCK_APPLICATIONS.filter(a => a.status === 'Shortlisted').length;
  const interviewCount = MOCK_APPLICATIONS.filter(a => a.status === 'Interview').length;

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Welcome back, {MOCK_USER.name.split(' ')[0]}! 👋</h1>
          <p className="text-slate-500 mt-1 font-medium">Here's what's happening with your job search today.</p>
        </div>
        <Link to="/jobs" className="bg-gradient-to-r from-primary to-blue-600 hover:to-blue-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg shadow-blue-500/20 transition-all flex items-center gap-2 transform hover:-translate-y-0.5">
          Find New Jobs <ChevronRight size={18} />
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Applications" value={appliedCount} icon={Send} trend="+2 this week" color="text-primary" bg="bg-sky-100" />
        <StatCard title="Shortlisted" value={shortlistedCount} icon={FileCheck} color="text-amber-500" bg="bg-amber-50" />
        <StatCard title="Interviews" value={interviewCount} icon={Users} trend="1 upcoming" color="text-violet-500" bg="bg-violet-50" />
        <StatCard title="Hired" value="0" icon={CheckCircle} color="text-emerald-500" bg="bg-emerald-50" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content Area */}
        <div className="lg:col-span-2 space-y-8">

          {/* Profile Completion Warning */}
          {MOCK_USER.completionPercentage < 100 && (
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-soft border border-sky-100 flex items-center gap-4 relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-primary to-secondary"></div>
              <div className="p-3 bg-sky-50 rounded-full text-primary shrink-0 group-hover:scale-110 transition-transform">
                <AlertCircle size={24} />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-slate-800">Complete your profile</h3>
                <p className="text-sm text-slate-500 mt-1">
                  Your profile is {MOCK_USER.completionPercentage}% complete. Adding more skills increases your visibility by 2x.
                </p>
                <div className="w-full bg-slate-100 rounded-full h-2.5 mt-3 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-primary to-secondary h-full rounded-full transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(92,154,255,0.5)]"
                    style={{ width: `${MOCK_USER.completionPercentage}%` }}
                  ></div>
                </div>
              </div>
              <Link to="/profile" className="hidden sm:block text-sm font-bold text-primary hover:text-blue-700 hover:underline">
                Update Now
              </Link>
            </div>
          )}

          {/* Recommended Jobs */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-slate-800">Recommended for you</h2>
              <Link to="/jobs" className="text-sm text-primary font-medium hover:underline">View all</Link>
            </div>
            <div className="grid gap-4">
              {MOCK_JOBS.slice(0, 3).map(job => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar Widgets */}
        <div className="space-y-6">

          {/* Recent Applications */}
          <div className="bg-white/60 backdrop-blur-md rounded-2xl p-6 border border-white/60 shadow-soft">
            <h3 className="font-bold text-slate-800 mb-4">Recent Applications</h3>
            <div className="space-y-4">
              {MOCK_APPLICATIONS.map(app => (
                <div key={app.id} className="flex items-center gap-3 p-3 hover:bg-white rounded-xl transition-all border border-transparent hover:border-white hover:shadow-sm group">
                  <div className={`w-2.5 h-2.5 rounded-full shrink-0 ring-2 ring-white
                    ${app.status === 'Interview' ? 'bg-violet-500' :
                      app.status === 'Shortlisted' ? 'bg-amber-500' :
                        app.status === 'Rejected' ? 'bg-rose-500' : 'bg-blue-500'}`}
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-slate-800 text-sm truncate group-hover:text-primary transition-colors">{app.jobTitle}</h4>
                    <p className="text-xs text-slate-500 truncate">{app.company}</p>
                  </div>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider
                     ${app.status === 'Interview' ? 'bg-violet-100 text-violet-700' :
                      app.status === 'Shortlisted' ? 'bg-amber-100 text-amber-700' :
                        app.status === 'Rejected' ? 'bg-rose-100 text-rose-600' : 'bg-blue-100 text-blue-700'}
                  `}>
                    {app.status}
                  </span>
                </div>
              ))}
            </div>
            <Link to="/applications" className="block text-center text-sm text-slate-500 hover:text-primary mt-4 py-2 font-medium">
              View All Applications
            </Link>
          </div>

          {/* Quick Tip Card */}
          <div className="bg-gradient-to-br from-secondary to-primary rounded-2xl p-6 text-white shadow-lg shadow-blue-500/20 relative overflow-hidden">
            <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-white/20 rounded-full blur-2xl"></div>
            <h3 className="font-bold text-lg mb-2 relative z-10">Pro Tip 💡</h3>
            <p className="text-sm text-blue-50 leading-relaxed mb-4 relative z-10 font-medium">
              Waiters with a professional profile photo get 40% more interview calls. Make sure your smile shines!
            </p>
            <button className="w-full bg-white/20 hover:bg-white/30 text-white text-sm font-bold py-2.5 rounded-xl transition-colors relative z-10 border border-white/20 backdrop-blur-sm">
              Upload Photo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;