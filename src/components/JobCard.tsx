import React from 'react';
import { Job } from '../types';
import { MapPin, IndianRupee, Clock, Sparkles } from 'lucide-react';

interface JobCardProps {
  job: Job;
  compact?: boolean;
  onApply?: (id: string) => void;
}

const JobCard: React.FC<JobCardProps> = ({ job, compact = false, onApply }) => {
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-5 shadow-sm border border-white hover:border-primary/40 hover:shadow-soft transition-all duration-300 group relative overflow-hidden">
      {/* AI Match Badge */}
      {job.matchScore && job.matchScore > 80 && (
        <div className="absolute top-0 right-0 bg-gradient-to-l from-primary to-secondary text-white text-xs font-bold px-3 py-1 rounded-bl-xl flex items-center gap-1 shadow-md">
          <Sparkles size={12} />
          {job.matchScore}% Match
        </div>
      )}

      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className={`font-bold text-slate-800 ${compact ? 'text-base' : 'text-lg'}`}>{job.title}</h3>
          <p className="text-primary font-medium">{job.company}</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 text-sm text-slate-500 mb-4">
        <span className="flex items-center gap-1 bg-sky-50/50 border border-sky-100 px-2.5 py-1 rounded-lg">
          <MapPin size={14} className="text-primary" /> {job.location}
        </span>
        <span className="flex items-center gap-1 bg-emerald-50/50 border border-emerald-100 px-2.5 py-1 rounded-lg text-emerald-700">
          <IndianRupee size={14} /> {job.salary}
        </span>
        {!compact && (
          <span className="flex items-center gap-1 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-100">
            <Clock size={14} /> {job.type}
          </span>
        )}
      </div>

      {!compact && (
        <p className="text-slate-600 text-sm mb-4 line-clamp-2 leading-relaxed">
          {job.description}
        </p>
      )}

      <div className="flex items-center justify-between mt-auto pt-2">
        <span className="text-xs text-slate-400 font-medium">{job.postedAt}</span>
        <button 
          onClick={() => onApply && onApply(job.id)}
          className="bg-slate-900 text-white px-5 py-2 rounded-xl text-sm font-medium hover:bg-primary hover:shadow-lg hover:shadow-primary/30 transition-all duration-300 transform active:scale-95"
        >
          Apply Now
        </button>
      </div>
    </div>
  );
};

export default JobCard;