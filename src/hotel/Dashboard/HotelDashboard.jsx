import React from 'react';
import { PlusCircle, Users, FileCheck, UserCheck, ChevronRight, Briefcase } from 'lucide-react';
import { Link } from 'react-router-dom';
import StatCard from '../../components/StatCard'; // Reusing existing component
// Reusing mock data for now, but in real app would fetch hotel specific data
import { MOCK_APPLICATIONS } from '../../services/mockData';

const HotelDashboard = () => {
    // Mock Stats
    const activeJobsCount = 3;
    const applicationsReceived = 12; // Example
    const shortlistedCount = 5;
    const hiredCount = 2;

    return (
        <div className="space-y-8">
            {/* Welcome Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Welcome, The Taj Mahal Palace! 👋</h1>
                    <p className="text-slate-500 mt-1 font-medium">Manage your hiring pipeline and post new jobs.</p>
                </div>
                <Link to="/hotel/post-job" className="bg-gradient-to-r from-primary to-blue-600 hover:to-blue-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg shadow-blue-500/20 transition-all flex items-center gap-2 transform hover:-translate-y-0.5">
                    <PlusCircle size={18} /> Post New Job
                </Link>
            </div>

            {/* Stats Grid - Reusing Waiter Dashboard Style */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard title="Active Jobs" value={activeJobsCount} icon={Briefcase} trend="+1 this week" color="text-primary" bg="bg-sky-100" />
                <StatCard title="Applications" value={applicationsReceived} icon={Users} color="text-violet-500" bg="bg-violet-50" />
                <StatCard title="Shortlisted" value={shortlistedCount} icon={FileCheck} color="text-amber-500" bg="bg-amber-50" />
                <StatCard title="Hired" value={hiredCount} icon={UserCheck} color="text-emerald-500" bg="bg-emerald-50" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content Area */}
                <div className="lg:col-span-2 space-y-8">

                    {/* Quick Actions / Recent Activity */}
                    <div>
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-bold text-slate-800">Recent Applicants</h2>
                            <Link to="/hotel/applicants" className="text-sm text-primary font-medium hover:underline">View all</Link>
                        </div>

                        {/* Applicant List Preview */}
                        <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white hover:border-primary/20 shadow-sm overflow-hidden">
                            <div className="divide-y divide-slate-100">
                                {MOCK_APPLICATIONS.slice(0, 4).map((app, index) => (
                                    <div key={index} className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-500 font-bold">
                                                {app.jobTitle.charAt(0)}
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-slate-800">Candidate Name {index + 1}</h4>
                                                <p className="text-sm text-slate-500">{app.jobTitle} • 2 years exp</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-600">New</span>
                                            <button className="text-slate-400 hover:text-primary">
                                                <ChevronRight size={20} />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sidebar Widgets */}
                <div className="space-y-6">

                    {/* Quick Stats or Tips */}
                    <div className="bg-white/60 backdrop-blur-md rounded-2xl p-6 border border-white/60 shadow-soft">
                        <h3 className="font-bold text-slate-800 mb-4">Hiring Pipeline</h3>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-slate-600">Waiter Position</span>
                                <span className="font-bold text-slate-800">5 New</span>
                            </div>
                            <div className="w-full bg-slate-100 rounded-full h-2">
                                <div className="bg-blue-500 h-2 rounded-full" style={{ width: '40%' }}></div>
                            </div>

                            <div className="flex justify-between items-center text-sm">
                                <span className="text-slate-600">Chef Position</span>
                                <span className="font-bold text-slate-800">2 New</span>
                            </div>
                            <div className="w-full bg-slate-100 rounded-full h-2">
                                <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '20%' }}></div>
                            </div>
                        </div>
                        <Link to="/hotel/manage-jobs" className="block text-center text-sm text-slate-500 hover:text-primary mt-6 py-2 font-medium border-t border-slate-100 pt-4">
                            Manage All Jobs
                        </Link>
                    </div>

                    {/* Upgrade / Premium Card */}
                    <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
                        <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-white/10 rounded-full blur-2xl"></div>
                        <h3 className="font-bold text-lg mb-2 relative z-10">Premium Hiring 🚀</h3>
                        <p className="text-sm text-slate-300 leading-relaxed mb-4 relative z-10 font-medium">
                            Boost your job posts to reach 3x more candidates.
                        </p>
                        <button className="w-full bg-white text-slate-900 text-sm font-bold py-2.5 rounded-xl transition-colors relative z-10 hover:bg-slate-50">
                            Upgrade Plan
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HotelDashboard;

