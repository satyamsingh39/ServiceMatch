import React from 'react';
import { Bell, Clock, CheckCircle, Info, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MOCK_NOTIFICATIONS } from '../../services/mockData';

const HotelNotifications = () => {
    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Notifications</h1>
                    <p className="text-slate-500 mt-1 font-medium">Stay updated with your hiring activities.</p>
                </div>
                <Button variant="outline" className="bg-white hover:bg-slate-50 text-slate-600 border-slate-100 rounded-xl font-bold shadow-sm">
                    Mark all as read
                </Button>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-soft border border-white/60 overflow-hidden divide-y divide-slate-100">
                {MOCK_NOTIFICATIONS.map((notif) => (
                    <div
                        key={notif.id}
                        className={`p-5 flex gap-4 transition-all hover:bg-white ${notif.read ? 'bg-transparent' : 'bg-blue-50/40'}`}
                    >
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-sm
                            ${notif.type === 'success' ? 'bg-emerald-100 text-emerald-600' :
                                notif.type === 'warning' ? 'bg-amber-100 text-amber-600' :
                                    notif.type === 'error' ? 'bg-rose-100 text-rose-600' :
                                        'bg-blue-100 text-blue-600'}
                        `}>
                            {notif.type === 'success' ? <CheckCircle size={22} /> :
                                notif.type === 'warning' ? <AlertTriangle size={22} /> :
                                    <Info size={22} />}
                        </div>
                        <div className="flex-1">
                            <div className="flex justify-between items-start">
                                <h3 className={`text-sm font-bold ${notif.read ? 'text-slate-700' : 'text-slate-900'}`}>{notif.title}</h3>
                                <span className="text-xs text-slate-400 flex items-center gap-1 font-medium">
                                    <Clock size={12} /> {notif.date}
                                </span>
                            </div>
                            <p className="text-slate-500 text-sm mt-1 leading-relaxed">
                                {notif.message}
                            </p>
                        </div>
                    </div>
                ))}

                {MOCK_NOTIFICATIONS.length === 0 && (
                    <div className="text-center py-16 bg-white/50">
                        <Bell className="mx-auto text-slate-300 mb-4 opacity-30" size={64} />
                        <h3 className="text-slate-400 font-medium text-lg">No new notifications</h3>
                    </div>
                )}
            </div>
        </div>
    );
};

export default HotelNotifications;
