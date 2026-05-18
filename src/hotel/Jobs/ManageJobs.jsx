import React, { useEffect, useState } from 'react';
import { PlusCircle, Edit, Trash2, Eye, MoreHorizontal, PauseCircle, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import api from '@/lib/api';
import { useToast } from '@/hooks/use-toast';
import { formatDistanceToNow } from 'date-fns';

const ManageJobs = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const { toast } = useToast();

    const fetchJobs = async () => {
        try {
            setLoading(true);
            const res = await api.get('/jobs/my-jobs');
            setJobs(res.data.data || []);
        } catch (error) {
            toast({
                title: "Error fetching jobs",
                description: error.response?.data?.message || error.message,
                variant: "destructive"
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchJobs();
    }, []);

    const handleDelete = async (jobId) => {
        if (!window.confirm("Are you sure you want to delete this job listing?")) return;

        try {
            await api.delete(`/jobs/${jobId}`);
            toast({
                title: "Job deleted",
                description: "The job listing has been removed successfully.",
            });
            setJobs(jobs.filter(job => job._id !== jobId));
        } catch (error) {
            toast({
                title: "Delete failed",
                description: error.response?.data?.message || error.message,
                variant: "destructive"
            });
        }
    };

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
                    <h1 className="text-2xl font-bold text-slate-800">Manage Jobs</h1>
                    <p className="text-slate-500 text-sm">View and manage your job listings.</p>
                </div>
                <Link to="/hotel/post-job">
                    <Button className="gap-2 bg-primary hover:bg-blue-600">
                        <PlusCircle size={18} /> Post New Job
                    </Button>
                </Link>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-slate-50 border-b border-slate-100">
                            <tr>
                                <th className="p-4 font-semibold text-slate-600 text-sm">Job Title</th>
                                <th className="p-4 font-semibold text-slate-600 text-sm">Type & Salary</th>
                                <th className="p-4 font-semibold text-slate-600 text-sm text-center">Status</th>
                                <th className="p-4 font-semibold text-slate-600 text-sm">Posted</th>
                                <th className="p-4 font-semibold text-slate-600 text-sm text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {jobs.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="p-8 text-center text-slate-500">
                                        No jobs found. Post your first job!
                                    </td>
                                </tr>
                            ) : jobs.map((job) => (
                                <tr key={job._id} className="hover:bg-slate-50/50 transition-colors">
                                    <td className="p-4">
                                        <h3 className="font-bold text-slate-800">{job.title}</h3>
                                        <span className="text-xs text-slate-400 uppercase">ID: {job._id.slice(-6)}</span>
                                    </td>
                                    <td className="p-4">
                                        <div className="text-sm text-slate-600">{job.jobType}</div>
                                        <div className="text-sm font-medium text-slate-800">{job.salary || 'Not specified'}</div>
                                    </td>
                                    <td className="p-4 text-center">
                                        <Badge variant={job.status === 'Open' ? 'default' : 'secondary'} className={job.status === 'Open' ? 'bg-emerald-500 hover:bg-emerald-600' : ''}>
                                            {job.status}
                                        </Badge>
                                    </td>
                                    <td className="p-4 text-sm text-slate-500">
                                        {formatDistanceToNow(new Date(job.createdAt), { addSuffix: true })}
                                    </td>
                                    <td className="p-4 text-right">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                                    <MoreHorizontal size={18} className="text-slate-400" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem asChild>
                                                    <Link to="/hotel/applicants" className="w-full">
                                                        <Eye className="mr-2 h-4 w-4" /> View Applicants
                                                    </Link>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem disabled>
                                                    <Edit className="mr-2 h-4 w-4" /> Edit Job
                                                </DropdownMenuItem>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem 
                                                    className="text-rose-600 focus:text-rose-600"
                                                    onClick={() => handleDelete(job._id)}
                                                >
                                                    <Trash2 className="mr-2 h-4 w-4" /> Delete
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ManageJobs;
