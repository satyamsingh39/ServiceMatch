import React, { useEffect, useState } from 'react';
import { Calendar, MoreHorizontal, Building2, Loader2 } from 'lucide-react';
import api from '@/lib/api';
import { formatDistanceToNow } from 'date-fns';

const AppliedJobs: React.FC = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const res = await api.get('/applications/my-applications');
      setApplications(res.data.data || []);
    } catch (error) {
      console.error("Error fetching applications:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="animate-spin text-primary" size={40} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">My Applications</h1>
          <p className="text-slate-500 mt-1 font-medium">Track the status of your current job applications.</p>
        </div>
      </div>

      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-soft border border-white/60 overflow-hidden">
        {/* Table Header (Desktop) */}
        <div className="hidden md:grid grid-cols-12 gap-4 p-5 bg-slate-50/80 border-b border-slate-100 text-xs font-bold text-slate-500 uppercase tracking-wider">
          <div className="col-span-4">Job Role</div>
          <div className="col-span-3">Company</div>
          <div className="col-span-2">Date Applied</div>
          <div className="col-span-2">Status</div>
          <div className="col-span-1 text-right">Action</div>
        </div>

        {/* List Items */}
        <div className="divide-y divide-slate-50">
          {applications.length === 0 ? (
            <div className="p-8 text-center text-slate-500">You haven't applied to any jobs yet.</div>
          ) : applications.map((app: any) => (
            <div key={app._id} className="p-5 md:grid md:grid-cols-12 md:gap-4 md:items-center hover:bg-white/60 transition-colors group">

              {/* Job & Company Mobile/Desktop */}
              <div className="col-span-4 mb-2 md:mb-0">
                <h3 className="font-bold text-slate-800 text-lg md:text-base group-hover:text-primary transition-colors">
                    {app.jobId?.title || "Unknown Position"}
                </h3>
                <p className="text-sm text-slate-500 md:hidden">{app.jobId?.employerId?.businessName || "ServiceMatch Partner"}</p>
              </div>

              <div className="col-span-3 hidden md:flex items-center gap-2 text-slate-600 font-medium">
                <Building2 size={16} className="text-slate-400" />
                {app.jobId?.employerId?.businessName || "ServiceMatch Partner"}
              </div>

              <div className="col-span-2 hidden md:flex items-center gap-2 text-sm text-slate-500">
                <Calendar size={14} />
                {formatDistanceToNow(new Date(app.appliedAt), { addSuffix: true })}
              </div>

              <div className="col-span-2 flex items-center justify-between md:justify-start mt-2 md:mt-0">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold border shadow-sm
                     ${app.status === 'Interview' ? 'bg-violet-50 text-violet-700 border-violet-100' :
                    app.status === 'Shortlisted' ? 'bg-amber-50 text-amber-700 border-amber-100' :
                      app.status === 'Rejected' ? 'bg-rose-50 text-rose-600 border-rose-100' :
                        app.status === 'Hired' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' :
                          'bg-blue-50 text-blue-700 border-blue-100'}
                  `}>
                  {app.status === 'Interview' && <span className="w-1.5 h-1.5 bg-violet-500 rounded-full mr-2 animate-pulse"></span>}
                  {app.status}
                </span>
                <span className="md:hidden text-xs text-slate-400 font-medium">
                    {formatDistanceToNow(new Date(app.appliedAt), { addSuffix: true })}
                </span>
              </div>

              <div className="col-span-1 text-right mt-2 md:mt-0 hidden md:block">
                <button className="text-slate-400 hover:text-slate-600 p-1 rounded-full hover:bg-slate-100 transition-colors">
                  <MoreHorizontal size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AppliedJobs;