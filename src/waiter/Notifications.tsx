// No imports to change based on previous view, but if there were:
// import { MOCK_NOTIFICATIONS } from '../services/mockData';
import { MOCK_NOTIFICATIONS } from '../services/mockData';
import { Bell, CheckCircle, Info, AlertTriangle } from 'lucide-react';

const Notifications: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Notifications</h1>
          <p className="text-slate-500 mt-1 font-medium">Keep track of your application status and updates.</p>
        </div>
        <button className="bg-white hover:bg-slate-50 text-slate-600 px-4 py-2 rounded-xl text-sm font-bold shadow-sm border border-slate-100 transition-all flex items-center gap-2">
          Mark all as read
        </button>
      </div>

      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-soft border border-white/60 overflow-hidden divide-y divide-slate-50">
        {MOCK_NOTIFICATIONS.map(notif => (
          <div key={notif.id} className={`p-5 flex gap-4 transition-all hover:bg-white ${notif.read ? 'bg-transparent' : 'bg-sky-50/40'}`}>
            <div className={`shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm
              ${notif.type === 'success' ? 'bg-emerald-100 text-emerald-600' :
                notif.type === 'warning' ? 'bg-amber-100 text-amber-600' :
                  notif.type === 'error' ? 'bg-rose-100 text-rose-600' :
                    'bg-blue-100 text-blue-600'}
            `}>
              {notif.type === 'success' ? <CheckCircle size={22} /> :
                notif.type === 'warning' ? <AlertTriangle size={22} /> :
                  <Info size={22} />}
            </div>

            <div className="flex-1 pt-1">
              <div className="flex justify-between items-start">
                <h3 className={`text-sm font-bold ${notif.read ? 'text-slate-600' : 'text-slate-900'}`}>
                  {notif.title}
                </h3>
                <span className="text-xs text-slate-400 whitespace-nowrap ml-2 font-medium">{notif.date}</span>
              </div>
              <p className="text-sm text-slate-500 mt-1 leading-relaxed">{notif.message}</p>
            </div>

            {!notif.read && (
              <div className="shrink-0 flex items-center">
                <div className="w-2.5 h-2.5 bg-primary rounded-full ring-2 ring-white shadow-sm"></div>
              </div>
            )}
          </div>
        ))}
        {MOCK_NOTIFICATIONS.length === 0 && (
          <div className="p-12 text-center text-slate-400">
            <Bell className="mx-auto mb-4 opacity-20" size={64} />
            <p className="font-medium">No notifications yet</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Notifications;