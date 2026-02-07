import React, { useState } from 'react';
import { Search, MapPin, Filter, SlidersHorizontal } from 'lucide-react';
import JobCard from '../components/JobCard';
import { MOCK_JOBS } from '../services/mockData';

const FindJobs: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('');

  const filteredJobs = MOCK_JOBS.filter(job =>
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-800">Find Jobs</h1>
        <p className="text-slate-500 mt-1 font-medium">Discover opportunities that match your skills.</p>
      </div>

      {/* Search Bar */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-soft border border-white/60 p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-3.5 text-slate-400" size={20} />
            <input
              type="text"
              placeholder="Search job title or company..."
              className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-100 focus:bg-white focus:border-primary/50 focus:ring-4 focus:ring-primary/10 rounded-xl outline-none transition-all placeholder:text-slate-400 text-slate-800"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex-1 relative">
            <MapPin className="absolute left-4 top-3.5 text-slate-400" size={20} />
            <input
              type="text"
              placeholder="Location (e.g. Manhattan)"
              className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-100 focus:bg-white focus:border-primary/50 focus:ring-4 focus:ring-primary/10 rounded-xl outline-none transition-all placeholder:text-slate-400 text-slate-800"
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
            />
          </div>
          <button className="bg-slate-900 hover:bg-black text-white px-6 py-3 rounded-xl font-medium transition-all shadow-lg shadow-slate-900/20 flex items-center justify-center gap-2">
            <Filter size={18} /> Filters
          </button>
        </div>

        {/* Quick Filters */}
        <div className="flex flex-wrap gap-2 mt-4">
          {['Full-time', 'Part-time', 'Casual', '$20+/hr', 'Immediate Start'].map(tag => (
            <button key={tag} className="px-3.5 py-1.5 text-xs font-semibold bg-white border border-slate-200 rounded-lg text-slate-600 hover:border-primary hover:text-primary hover:bg-sky-50 transition-all shadow-sm">
              {tag}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filters Sidebar (Desktop) */}
        <div className="hidden lg:block space-y-6">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-5 border border-white/60 shadow-soft">
            <div className="flex items-center gap-2 mb-4 text-slate-800 font-bold">
              <SlidersHorizontal size={18} />
              <h3>Refine Search</h3>
            </div>

            <div className="space-y-5">
              <div>
                <label className="text-sm font-bold text-slate-700 mb-2.5 block">Job Type</label>
                <div className="space-y-2.5">
                  {['Full-time', 'Part-time', 'Contract', 'Temporary'].map(t => (
                    <label key={t} className="flex items-center gap-2.5 text-sm text-slate-600 cursor-pointer hover:text-primary transition-colors">
                      <input type="checkbox" className="rounded border-slate-300 text-primary focus:ring-primary w-4 h-4" />
                      {t}
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-sm font-bold text-slate-700 mb-2.5 block">Experience</label>
                <div className="space-y-2.5">
                  {['Entry Level', '1-3 Years', '3-5 Years', 'Senior'].map(t => (
                    <label key={t} className="flex items-center gap-2.5 text-sm text-slate-600 cursor-pointer hover:text-primary transition-colors">
                      <input type="checkbox" className="rounded border-slate-300 text-primary focus:ring-primary w-4 h-4" />
                      {t}
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Job List */}
        <div className="lg:col-span-3 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-slate-800">{filteredJobs.length} Jobs Found</h3>
            <span className="text-sm text-slate-500">Sorted by: <span className="font-bold text-slate-900">Relevance</span></span>
          </div>

          {filteredJobs.length > 0 ? (
            filteredJobs.map(job => (
              <JobCard key={job.id} job={job} onApply={(id) => alert(`Applied to job ${id}!`)} />
            ))
          ) : (
            <div className="text-center py-12 bg-white/50 rounded-2xl border border-dashed border-slate-300">
              <p className="text-slate-500 font-medium">No jobs found matching your criteria.</p>
              <button onClick={() => setSearchTerm('')} className="mt-2 text-primary font-bold hover:underline">Clear filters</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FindJobs;