import React from 'react';
import { PlusCircle, Edit, Trash2, Eye, MoreHorizontal, PauseCircle } from 'lucide-react';
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

const ManageJobs = () => {
    // Mock Data
    const jobs = [
        { id: 1, title: 'Senior Chef', type: 'Full Time', salary: '₹25k - ₹35k', applicants: 12, status: 'Active', posted: '2 days ago' },
        { id: 2, title: 'Waiter / Server', type: 'Part Time', salary: '₹12k - ₹15k', applicants: 8, status: 'Active', posted: '5 days ago' },
        { id: 3, title: 'Housekeeping Staff', type: 'Full Time', salary: '₹10k - ₹12k', applicants: 4, status: 'Closed', posted: '1 week ago' },
    ];

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
                                <th className="p-4 font-semibold text-slate-600 text-sm">Applicants</th>
                                <th className="p-4 font-semibold text-slate-600 text-sm">Status</th>
                                <th className="p-4 font-semibold text-slate-600 text-sm">Posted</th>
                                <th className="p-4 font-semibold text-slate-600 text-sm text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {jobs.map((job) => (
                                <tr key={job.id} className="hover:bg-slate-50/50 transition-colors">
                                    <td className="p-4">
                                        <h3 className="font-bold text-slate-800">{job.title}</h3>
                                        <span className="text-xs text-slate-400">ID: #{1000 + job.id}</span>
                                    </td>
                                    <td className="p-4">
                                        <div className="text-sm text-slate-600">{job.type}</div>
                                        <div className="text-sm font-medium text-slate-800">{job.salary}</div>
                                    </td>
                                    <td className="p-4">
                                        <div className="flex items-center gap-2">
                                            <span className="font-bold text-primary bg-blue-50 px-2 py-0.5 rounded text-sm">{job.applicants}</span>
                                            {job.applicants > 0 && <span className="text-xs text-slate-400">candidates</span>}
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <Badge variant={job.status === 'Active' ? 'default' : 'secondary'} className={job.status === 'Active' ? 'bg-emerald-500 hover:bg-emerald-600' : ''}>
                                            {job.status}
                                        </Badge>
                                    </td>
                                    <td className="p-4 text-sm text-slate-500">
                                        {job.posted}
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
                                                <DropdownMenuItem>
                                                    <Eye className="mr-2 h-4 w-4" /> View Applicants
                                                </DropdownMenuItem>
                                                <DropdownMenuItem>
                                                    <Edit className="mr-2 h-4 w-4" /> Edit Job
                                                </DropdownMenuItem>
                                                <DropdownMenuItem>
                                                    <PauseCircle className="mr-2 h-4 w-4" /> {job.status === 'Active' ? 'Close Job' : 'Reopen Job'}
                                                </DropdownMenuItem>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem className="text-rose-600 focus:text-rose-600">
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
