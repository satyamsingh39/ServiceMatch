import React, { useState, useEffect } from 'react';
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, User, Briefcase, FileCheck, Bell, LogOut, Menu, X, ChefHat, Loader2 } from 'lucide-react';
import api from '@/lib/api';

const Layout: React.FC = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [profile, setProfile] = useState<any>(() => {
    // Initial fallback to localStorage if available
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [loading, setLoading] = useState(!profile);
  const location = useLocation();
  const navigate = useNavigate();

  const getDisplayName = () => {
    if (loading && !profile) return 'Loading...';
    if (profile?.name) return profile.name;
    if (profile?.firstName && profile?.lastName) return `${profile.firstName} ${profile.lastName}`;
    if (profile?.firstName) return profile.firstName;
    return 'User';
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get('/users/profile');
        if (res.data?.success) {
          const userData = res.data.data?.user || res.data.data || res.data.user;
          if (userData) {
            setProfile(userData);
            localStorage.setItem("user", JSON.stringify(userData));
          }
        }
      } catch (err) {
        console.error("Error fetching profile:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  const navItems = [
    { path: '/waiter', label: 'Dashboard', icon: LayoutDashboard, exact: true },
    { path: '/waiter/jobs', label: 'Find Jobs', icon: Briefcase },
    { path: '/waiter/applications', label: 'Applied Jobs', icon: FileCheck },
    { path: '/waiter/notifications', label: 'Notifications', icon: Bell },
    { path: '/waiter/profile', label: 'My Profile', icon: User },
  ];

  const getPageTitle = () => {
    const item = navItems.find(i => i.path === location.pathname);
    return item ? item.label : 'Dashboard';
  };

  return (
    <div className="flex min-h-screen text-slate-700 font-sans">
      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/20 z-40 md:hidden backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed md:sticky top-0 left-0 h-screen w-64 bg-white/80 backdrop-blur-xl border-r border-sky-100 z-50 transform transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0
        flex flex-col
      `}>
        <div className="p-6 flex items-center gap-3 border-b border-sky-50">
          <div className="bg-gradient-to-br from-primary to-secondary p-2 rounded-xl text-white shadow-lg shadow-blue-500/20">
            <ChefHat size={28} />
          </div>
          <div>
            <h1 className="font-bold text-xl tracking-tight text-slate-800">ServiceMatch</h1>
            <p className="text-xs text-primary font-bold tracking-wide">WAITER PORTAL</p>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="md:hidden ml-auto text-gray-500">
            <X size={24} />
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-2 mt-2">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.exact}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) => `
                flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium
                ${isActive 
                  ? 'bg-sky-50 text-primary shadow-sm ring-1 ring-sky-100' 
                  : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'}
              `}
            >
              <item.icon size={20} />
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-sky-50">
          <div className="flex items-center gap-3 px-4 py-3 mb-2 rounded-xl bg-gradient-to-br from-slate-50 to-sky-50 border border-sky-100">
            <div className="w-10 h-10 rounded-full border-2 border-white shadow-sm bg-primary/10 flex items-center justify-center text-primary font-bold uppercase shrink-0">
               {getDisplayName().charAt(0)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold truncate text-slate-800">
                {getDisplayName()}
              </p>
              <p className="text-xs text-slate-500 truncate capitalize">
                {profile?.role || 'Jobseeker'}
              </p>
            </div>
          </div>
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-rose-500 hover:bg-rose-50 rounded-xl transition-colors font-medium"
          >
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="sticky top-0 z-30 bg-white/60 backdrop-blur-xl border-b border-white/50 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(true)} className="md:hidden text-gray-600">
              <Menu size={24} />
            </button>
            <h2 className="text-xl font-bold text-slate-800 hidden sm:block">{getPageTitle()}</h2>
          </div>
          
          <div className="flex items-center gap-4">
            <button 
              onClick={() => navigate('/waiter/notifications')}
              className="relative p-2 text-slate-500 hover:bg-white hover:shadow-sm rounded-full transition-all"
            >
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-rose-500 rounded-full border-2 border-white"></span>
            </button>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 p-4 md:p-8 overflow-y-auto">
          <div className="max-w-6xl mx-auto">
            <Outlet />
          </div>
        </div>
      </main>


    </div>
  );
};

export default Layout;