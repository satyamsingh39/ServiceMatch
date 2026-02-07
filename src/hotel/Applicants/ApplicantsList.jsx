import React from 'react';
import { Phone, MessageCircle, MoreVertical, CheckCircle, XCircle, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { MOCK_APPLICATIONS } from '../../services/mockData'; // Adapting this mock data

const ApplicantsList = () => {
    // Using MOCK_APPLICATIONS but pretending they are incoming applicants
    // In a real app, this would be a different API response
    const applicants = [
        { id: 1, name: 'Rahul Kumar', role: 'Senior Chef', exp: '5 Years', status: 'Applied', phone: '+91 9876543210' },
        { id: 2, name: 'Priya Singh', role: 'Waiter', exp: '2 Years', status: 'Shortlisted', phone: '+91 9876543211' },
        { id: 3, name: 'Amit Sharma', role: 'Waiter', exp: 'Fresh', status: 'Rejected', phone: '+91 9876543212' },
        { id: 4, name: 'Sneha Gupta', role: 'Housekeeping', exp: '1 Year', status: 'Applied', phone: '+91 9876543213' },
    ];

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800">Applicants</h1>
                    <p className="text-slate-500 text-sm">Manage candidates who applied to your jobs.</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline">Filter</Button>
                    <Button variant="outline">Sort by</Button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {applicants.map((app) => (
                    <Card key={app.id} className="border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                        <CardHeader className="flex flex-row items-center gap-4 pb-4">
                            <Avatar className="h-12 w-12 border-2 border-white shadow-sm">
                                <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${app.name}`} />
                                <AvatarFallback>{app.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                                <h3 className="font-bold text-slate-800">{app.name}</h3>
                                <p className="text-sm text-slate-500">{app.role}</p>
                            </div>
                            <Badge variant="outline"
                                className={
                                    app.status === 'Shortlisted' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                                        app.status === 'Rejected' ? 'bg-rose-50 text-rose-700 border-rose-200' :
                                            'bg-sky-50 text-primary border-sky-200'
                                }
                            >
                                {app.status}
                            </Badge>
                        </CardHeader>
                        <CardContent className="space-y-3 pb-4">
                            <div className="flex justify-between text-sm py-2 border-t border-b border-slate-50">
                                <span className="text-slate-500">Experience</span>
                                <span className="font-semibold text-slate-700">{app.exp}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-slate-500">Applied</span>
                                <span className="font-medium text-slate-700">2 days ago</span>
                            </div>
                        </CardContent>
                        <CardFooter className="grid grid-cols-2 gap-3 pt-0">
                            <Button variant="outline" className="w-full gap-2 text-rose-600 hover:text-rose-700 hover:bg-rose-50 border-rose-100">
                                <XCircle size={16} /> Reject
                            </Button>
                            <Button className="w-full gap-2 bg-emerald-500 hover:bg-emerald-600 text-white">
                                <CheckCircle size={16} /> Shortlist
                            </Button>
                            <Button variant="secondary" className="col-span-2 w-full gap-2">
                                <Phone size={16} /> Contact Candidate
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default ApplicantsList;
