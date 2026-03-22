import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: string;
  color?: string;
  bg?: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon: Icon, trend, color = "text-primary", bg = "bg-sky-50" }) => {
  return (
    <div className="bg-white/70 backdrop-blur-md rounded-2xl p-6 shadow-soft border border-sky-100/50 hover:border-primary/40 hover:shadow-[0_0_20px_rgba(59,130,246,0.2)] transition-all duration-300 transform hover:-translate-y-1 group">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-slate-500 text-sm font-medium">{title}</p>
          <h3 className="text-2xl font-bold text-slate-800 mt-1">{value}</h3>
          {trend && <p className="text-xs text-emerald-600 mt-1 font-medium">{trend}</p>}
        </div>
        <div className={`p-3.5 rounded-xl ${bg} ${color} transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3`}>
          <Icon size={24} />
        </div>
      </div>
    </div>
  );
};

export default StatCard;