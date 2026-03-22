import React, { useEffect, useState } from 'react';
import { Phone, MessageCircle, MoreVertical, CheckCircle, XCircle, Clock, Loader2, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import api from '@/lib/api';
import { useToast } from '@/hooks/use-toast';
import { formatDistanceToNow } from 'date-fns';

const ApplicantsList = () => {
    const [applicants, setApplicants] = useState([]);
    const [loading, setLoading] = useState(true);
    const { toast } = useToast();

    const fetchApplicants = async () => {
        try {
            setLoading(true);
            const res = await api.get('/applications/employer');
            setApplicants(res.data);
        } catch (error) {
            toast({
                title: "Error fetching applicants",
                description: error.response?.data?.message || error.message,
                variant: "destructive"
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchApplicants();
    }, []);

    const updateStatus = async (appId, newStatus) => {
        try {
            await api.patch(`/applications/${appId}`, { status: newStatus });
            toast({
                title: `Candidate ${newStatus}`,
                description: `Application status updated to ${newStatus}.`,
            });
            setApplicants(applicants.map(app => 
                app._id === appId ? { ...app, status: newStatus } : app
            ));
        } catch (error) {
            toast({
                title: "Status update failed",
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
            <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800">Applicants</h1>
                    <p className="text-slate-500 text-sm">Manage candidates who applied to your jobs.</p>
                </div>
            </div>

            {applicants.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-slate-300">
                    <p className="text-slate-500 font-medium">No applicants found yet.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {applicants.map((app) => (
                        <Card key={app._id} className="border-slate-100 shadow-sm hover:shadow-md transition-shadow flex flex-col">
                            <CardHeader className="flex flex-row items-center gap-4 pb-4">
                                <Avatar className="h-12 w-12 border-2 border-white shadow-sm">
                                    <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${app.applicantId?.name}`} />
                                    <AvatarFallback>{app.applicantId?.name?.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div className="flex-1 min-w-0">
                                    <h3 className="font-bold text-slate-800 truncate">{app.applicantId?.name}</h3>
                                    <p className="text-sm text-slate-500 truncate">{app.jobId?.title}</p>
                                </div>
                                <Badge variant="outline"
                                    className={
                                        app.status === 'Shortlisted' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                                            app.status === 'Rejected' ? 'bg-rose-50 text-rose-700 border-rose-200' :
                                                app.status === 'Hired' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                                                    'bg-sky-50 text-primary border-sky-200'
                                    }
                                >
                                    {app.status}
                                </Badge>
                            </CardHeader>
                            <CardContent className="space-y-3 pb-4 flex-1">
                                <div className="flex justify-between text-sm py-2 border-t border-b border-slate-50">
                                    <span className="text-slate-500">Email</span>
                                    <span className="font-semibold text-slate-700 truncate ml-2">{app.applicantId?.email}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-slate-500">Applied</span>
                                    <span className="font-medium text-slate-700">
                                        {formatDistanceToNow(new Date(app.appliedAt), { addSuffix: true })}
                                    </span>
                                </div>
                            </CardContent>
                            <CardFooter className="grid grid-cols-2 gap-3 pt-0">
                                {app.status === 'Applied' && (
                                    <>
                                        <Button 
                                            variant="outline" 
                                            className="w-full gap-2 text-rose-600 hover:text-rose-700 hover:bg-rose-50 border-rose-100"
                                            onClick={() => updateStatus(app._id, 'Rejected')}
                                        >
                                            <XCircle size={16} /> Reject
                                        </Button>
                                        <Button 
                                            className="w-full gap-2 bg-amber-500 hover:bg-amber-600 text-white"
                                            onClick={() => updateStatus(app._id, 'Shortlisted')}
                                        >
                                            <CheckCircle size={16} /> Shortlist
                                        </Button>
                                    </>
                                )}
                                {app.status === 'Shortlisted' && (
                                    <Button 
                                        className="col-span-2 w-full gap-2 bg-emerald-500 hover:bg-emerald-600 text-white"
                                        onClick={() => updateStatus(app._id, 'Hired')}
                                    >
                                        <CheckCircle size={16} /> Hire Candidate
                                    </Button>
                                )}
                                <Button variant="secondary" className="col-span-2 w-full gap-2" asChild>
                                    <a href={`mailto:${app.applicantId?.email}`}>
                                        <Mail size={16} /> Contact Candidate
                                    </a>
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ApplicantsList;
