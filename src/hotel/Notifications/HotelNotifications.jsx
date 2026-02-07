import React from 'react';
import { Bell, Briefcase, UserCheck, MessageSquare, CheckCircle, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const HotelNotifications = () => {
    const notifications = [
        {
            id: 1,
            type: 'application',
            title: 'New Application Received',
            message: 'Rahul Kumar applied for Senior Chef position.',
            time: '2 hours ago',
            read: false,
            icon: Briefcase,
            color: 'text-blue-500 bg-blue-50'
        },
        {
            id: 2,
            type: 'interview',
            title: 'Interview Confirmed',
            message: 'Priya Singh accepted the interview request for Waiter role.',
            time: '5 hours ago',
            read: true,
            icon: UserCheck,
            color: 'text-violet-500 bg-violet-50'
        },
        {
            id: 3,
            type: 'system',
            title: 'Profile Verified',
            message: 'Your hotel profile has been verified by the admin team.',
            time: '1 day ago',
            read: true,
            icon: CheckCircle,
            color: 'text-emerald-500 bg-emerald-50'
        }
    ];

    return (
        <div className="max-w-3xl mx-auto space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800">Notifications</h1>
                    <p className="text-slate-500 text-sm">Stay updated with your hiring activities.</p>
                </div>
                <Button variant="ghost" className="text-primary hover:bg-blue-50">
                    Mark all as read
                </Button>
            </div>

            <div className="space-y-4">
                {notifications.map((notification) => (
                    <div
                        key={notification.id}
                        className={`p-4 rounded-xl border transition-all hover:shadow-md flex gap-4 ${notification.read ? 'bg-white border-slate-100' : 'bg-blue-50/30 border-blue-100'}`}
                    >
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${notification.color}`}>
                            <notification.icon size={20} />
                        </div>
                        <div className="flex-1">
                            <div className="flex justify-between items-start">
                                <h3 className={`font-bold text-slate-800 ${!notification.read && 'text-blue-700'}`}>{notification.title}</h3>
                                <span className="text-xs text-slate-400 flex items-center gap-1">
                                    <Clock size={12} /> {notification.time}
                                </span>
                            </div>
                            <p className="text-slate-600 text-sm mt-1 leading-relaxed">
                                {notification.message}
                            </p>
                            {!notification.read && (
                                <div className="mt-3 flex gap-2">
                                    <Button size="sm" variant="secondary" className="h-8 text-xs">View Details</Button>
                                </div>
                            )}
                        </div>
                    </div>
                ))}

                {notifications.length === 0 && (
                    <div className="text-center py-12 bg-white rounded-xl border border-dashed border-slate-200">
                        <Bell className="mx-auto text-slate-300 mb-3" size={48} />
                        <h3 className="text-slate-500 font-medium">No new notifications</h3>
                    </div>
                )}
            </div>
        </div>
    );
};

export default HotelNotifications;
