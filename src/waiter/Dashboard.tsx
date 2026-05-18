import React, { useEffect, useState } from 'react';
import { Send, FileCheck, Users, CheckCircle, ChevronRight, AlertCircle, Loader2 } from 'lucide-react';
import StatCard from '../components/StatCard';
import JobCard from '../components/JobCard';
import { Link } from 'react-router-dom';
import api from '@/lib/api';
import { formatDistanceToNow } from 'date-fns';

const Dashboard: React.FC = () => {
  const [data, setData] = useState({
    applications: [],
    recommendedJobs: [],
    user: null,
    loading: true
  });

  const fetchData = async () => {
    try {
      const [appsRes, jobsRes, userRes] = await Promise.all([
        api.get('/applications/my-applications'),
        api.get('/jobs'),
        api.get('/auth/me')
      ]);
      setData({
        applications: appsRes.data.data || [],
        recommendedJobs: (jobsRes.data.data || []).slice(0, 3),
        user: userRes.data.data,
        loading: false
      });
    } catch (error) {
      console.error("Error fetching waiter dashboard data:", error);
      setData(prev => ({ ...prev, loading: false }));
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (data.loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="animate-spin text-primary" size={40} />
      </div>
    );
  }

  const stats = {
    applied: data.applications.length,
    shortlisted: data.applications.filter((a: any) => a.status === 'Shortlisted').length,
    interview: data.applications.filter((a: any) => a.status === 'Interview').length,
    hired: data.applications.filter((a: any) => a.status === 'Hired').length
  };

  const userName = data.user?.name || "User";
  const completionPercentage = data.user?.profileCompleted || 60;

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Welcome back, {userName.split(' ')[0]}! 👋</h1>
          <p className="text-slate-500 mt-1 font-medium">Here's what's happening with your job search today.</p>
        </div>
        <Link to="/waiter/jobs" className="bg-gradient-to-r from-primary to-blue-600 hover:to-blue-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg shadow-blue-500/20 transition-all flex items-center gap-2 transform hover:-translate-y-0.5">
          Find New Jobs <ChevronRight size={18} />
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Applications" value={stats.applied} icon={Send} trend="Total Sent" color="text-primary" bg="bg-sky-100" />
        <StatCard title="Shortlisted" value={stats.shortlisted} icon={FileCheck} color="text-amber-500" bg="bg-amber-50" />
        <StatCard title="Interviews" value={stats.interview} icon={Users} color="text-violet-500" bg="bg-violet-50" />
        <StatCard title="Hired" value={stats.hired} icon={CheckCircle} color="text-emerald-500" bg="bg-emerald-50" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content Area */}
        <div className="lg:col-span-2 space-y-8">

          {/* Profile Completion Warning */}
          {completionPercentage < 100 && (
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-soft border border-sky-100 flex items-center gap-4 relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-primary to-secondary"></div>
              <div className="p-3 bg-sky-50 rounded-full text-primary shrink-0 group-hover:scale-110 transition-transform">
                <AlertCircle size={24} />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-slate-800">Complete your profile</h3>
                <p className="text-sm text-slate-500 mt-1">
                  Your profile is {completionPercentage}% complete. Adding more skills increases your visibility by 2x.
                </p>
                <div className="w-full bg-slate-100 rounded-full h-2.5 mt-3 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-primary to-secondary h-full rounded-full transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(92,154,255,0.5)]"
                    style={{ width: `${completionPercentage}%` }}
                  ></div>
                </div>
              </div>
              <Link to="/waiter/profile" className="hidden sm:block text-sm font-bold text-primary hover:text-blue-700 hover:underline">
                Update Now
              </Link>
            </div>
          )}

          {/* Recommended Jobs */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-slate-800">Available Jobs</h2>
              <Link to="/waiter/jobs" className="text-sm text-primary font-medium hover:underline">View all</Link>
            </div>
            <div className="grid gap-4">
              {data.recommendedJobs.map((job: any) => (
                <JobCard 
                  key={job._id} 
                  job={{
                      ...job,
                      id: job._id,
                      company: job.employerId?.businessName || job.employerId?.name || "Employer",
                      type: job.jobType
                  }} 
                />
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
              {data.applications.length === 0 ? (
                <p className="text-sm text-slate-500">No applications yet.</p>
              ) : data.applications.slice(0, 5).map((app: any) => (
                <div key={app._id} className="flex items-center gap-3 p-3 hover:bg-white rounded-xl transition-all border border-transparent hover:border-white hover:shadow-sm group">
                  <div className={`w-2.5 h-2.5 rounded-full shrink-0 ring-2 ring-white
                    ${app.status === 'Interview' ? 'bg-violet-500' :
                      app.status === 'Shortlisted' ? 'bg-amber-500' :
                        app.status === 'Rejected' ? 'bg-rose-500' : 'bg-blue-500'}`}
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-slate-800 text-sm truncate group-hover:text-primary transition-colors">{app.jobId?.title}</h4>
                    <p className="text-xs text-slate-500 truncate">{app.jobId?.employerId?.businessName || app.jobId?.employerId?.name || "ServiceMatch Partner"}</p>
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
            <Link to="/waiter/applications" className="block text-center text-sm text-slate-500 hover:text-primary mt-4 py-2 font-medium">
              View All Applications
            </Link>
          </div>

          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-white/20 rounded-full blur-2xl"></div>
            <h3 className="font-bold text-lg mb-2 relative z-10">Pro Tip 💡</h3>
            <p className="text-sm text-slate-300 leading-relaxed mb-4 relative z-10 font-medium">
              Waiters with a complete profile get 3x more interview calls. Make sure to list all your skills!
            </p>
            <button className="w-full bg-white text-slate-900 text-sm font-bold py-2.5 rounded-xl transition-colors relative z-10 hover:bg-slate-50">
              Complete Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;