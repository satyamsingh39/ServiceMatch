import React, { useEffect, useState } from 'react';
import { PlusCircle, Users, FileCheck, UserCheck, ChevronRight, Briefcase, Loader2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import StatCard from '../../components/StatCard';
import api from '@/lib/api';
import { formatDistanceToNow } from 'date-fns';
import { motion, AnimatePresence } from 'framer-motion';

const HotelDashboard = () => {
    const [data, setData] = useState({
        jobs: [],
        applications: [],
        loading: true
    });

    const fetchData = async () => {
        try {
            const [jobsRes, appsRes] = await Promise.all([
                api.get('/jobs/my-jobs'),
                api.get('/applications/employer')
            ]);
            setData({
                jobs: jobsRes.data.data || [],
                applications: appsRes.data.data || [],
                loading: false
            });
        } catch (error) {
            console.error("Error fetching dashboard data:", error);
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
        active: data.jobs.filter(j => j.status === 'Open').length,
        totalApps: data.applications.length,
        shortlisted: data.applications.filter(a => a.status === 'Shortlisted').length,
        hired: data.applications.filter(a => a.status === 'Hired').length
    };

    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8 relative pb-10"
        >
            {/* Decorative Background Elements */}
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10 animate-pulse"></div>
            <div className="absolute top-1/2 -left-20 w-72 h-72 bg-violet-500/5 rounded-full blur-3xl -z-10"></div>

            {/* Welcome Section */}
            <div className="relative overflow-hidden rounded-3xl bg-slate-950 p-8 md:p-10 text-white shadow-2xl border border-white/10">
                <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/30 to-transparent opacity-60"></div>
                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-primary/20 rounded-full blur-3xl opacity-50"></div>
                
                <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div className="max-w-xl">
                        <motion.h1 
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-3xl md:text-4xl font-extrabold tracking-tight"
                        >
                            Hotel Dashboard 👋
                        </motion.h1>
                        <motion.p 
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 }}
                            className="text-slate-400 mt-2 text-lg font-medium"
                        >
                            Welcome back! You have <span className="text-primary font-bold">{data.applications.length} new applicants</span> to review today.
                        </motion.p>
                    </div>
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Link to="/hotel/post-job" className="bg-primary hover:bg-blue-600 text-white px-8 py-4 rounded-2xl font-bold shadow-xl shadow-primary/25 transition-all flex items-center gap-2 group">
                            <PlusCircle size={20} className="group-hover:rotate-90 transition-transform duration-300" /> Post New Job
                        </Link>
                    </motion.div>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard title="Active Jobs" value={stats.active} icon={Briefcase} trend={`${data.jobs.length} total`} color="text-primary" bg="bg-sky-100" />
                <StatCard title="Applications" value={stats.totalApps} icon={Users} color="text-violet-500" bg="bg-violet-50" />
                <StatCard title="Shortlisted" value={stats.shortlisted} icon={FileCheck} color="text-amber-500" bg="bg-amber-50" />
                <StatCard title="Hired" value={stats.hired} icon={UserCheck} color="text-emerald-500" bg="bg-emerald-50" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content Area */}
                <div className="lg:col-span-2 space-y-8">
                    <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-3xl p-6 border border-primary/20 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="font-bold text-slate-800">Recent Applicants</h3>
                            <Link to="/hotel/applicants" className="text-sm text-primary font-bold hover:underline">View all</Link>
                        </div>

                        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                            <div className="divide-y divide-slate-100">
                                <AnimatePresence mode="popLayout">
                                {data.applications.length === 0 ? (
                                    <motion.div 
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="p-12 text-center text-slate-500 font-medium"
                                    >
                                        No applicants yet. Post your job to attract talent!
                                    </motion.div>
                                ) : data.applications.slice(0, 5).map((app, index) => (
                                    <motion.div 
                                        key={app._id}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        className="p-5 flex items-center justify-between hover:bg-slate-50/80 transition-all group border-l-4 border-l-transparent hover:border-l-primary"
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center text-primary font-bold text-lg shadow-sm group-hover:scale-110 transition-transform">
                                                {app.applicantId?.name?.charAt(0) || 'A'}
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-slate-800 group-hover:text-primary transition-colors">{app.applicantId?.name || 'Anonymous candidate'}</h4>
                                                <p className="text-sm text-slate-500 font-medium">{app.jobId?.title} • <span className="text-slate-400">{formatDistanceToNow(new Date(app.appliedAt), { addSuffix: true })}</span></p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <Badge variant="outline" className="bg-blue-50/50 text-blue-600 border-blue-100 px-3 py-1 rounded-lg font-bold text-[10px] uppercase tracking-wider">{app.status}</Badge>
                                            <Link to="/hotel/applicants" className="p-2 rounded-xl bg-slate-50 text-slate-400 hover:text-primary hover:bg-primary/5 transition-all">
                                                <ChevronRight size={20} />
                                            </Link>
                                        </div>
                                    </motion.div>
                                ))}
                                </AnimatePresence>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sidebar Widgets */}
                <div className="space-y-6">
                    <div className="bg-white/60 backdrop-blur-md rounded-3xl p-6 border border-white hover:border-primary/20 shadow-sm transition-all hover:shadow-md group">
                        <h3 className="font-bold text-slate-800 mb-6 flex items-center justify-between">
                            Hiring Summary
                            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                                <FileCheck size={16} />
                            </div>
                        </h3>
                        <div className="space-y-6">
                            {data.jobs.slice(0, 3).map((job, idx) => (
                                <div key={job._id} className="space-y-2">
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-slate-600 truncate mr-2 font-medium">{job.title}</span>
                                        <span className="font-bold text-slate-900 shrink-0 bg-slate-100 px-2 py-0.5 rounded-lg text-[10px]">
                                            {data.applications.filter(a => a.jobId?._id === job._id).length} Apps
                                        </span>
                                    </div>
                                    <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                                        <motion.div 
                                            initial={{ width: 0 }}
                                            animate={{ width: `${Math.min(100, (data.applications.filter(a => a.jobId?._id === job._id).length / 5) * 100)}%` }}
                                            transition={{ duration: 1, delay: idx * 0.2 }}
                                            className="bg-gradient-to-r from-primary to-blue-400 h-full rounded-full shadow-[0_0_10px_rgba(59,130,246,0.3)]"
                                        ></motion.div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <Link to="/hotel/manage-jobs" className="block text-center text-xs text-slate-400 hover:text-primary mt-8 py-3 font-bold border-t border-slate-100/50 uppercase tracking-widest transition-colors">
                            Manage All Jobs
                        </Link>
                    </div>

                    <div className="bg-gradient-to-br from-slate-800 to-slate-950 rounded-3xl p-6 text-white shadow-xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-32 h-32 bg-primary/20 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
                        <h3 className="font-bold text-lg mb-2 relative z-10 flex items-center gap-2">
                            Premium Hiring <span className="text-[10px] bg-primary px-2 py-0.5 rounded-md uppercase tracking-tight">Pro</span>
                        </h3>
                        <p className="text-sm text-slate-400 leading-relaxed mb-6 font-medium relative z-10">
                            Boost your job posts to reach 3x more candidates and find top talent faster.
                        </p>
                        <motion.button 
                            whileHover={{ y: -2 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full bg-white text-slate-900 text-sm font-bold py-3 rounded-2xl shadow-lg hover:shadow-white/10 transition-all relative z-10"
                        >
                            Upgrade Now
                        </motion.button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default HotelDashboard;

