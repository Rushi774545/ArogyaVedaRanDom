import React from 'react';
import { motion } from 'framer-motion';
import { LayoutDashboard, Brain, BookOpen, MessageSquare, LogOut, User } from 'lucide-react';
import { Link, useLocation, useNavigate, Outlet } from 'react-router-dom';

const DashboardLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const patientName = localStorage.getItem('patient_name') || 'Vedic Soul';

  const menuItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Prediction', path: '/prediction', icon: Brain },
    { name: 'About Disease', path: '/about-disease', icon: BookOpen },
    { name: 'Veda AI Chat', path: '/chatbot', icon: MessageSquare },
  ];

  const handleLogout = () => {
    localStorage.removeItem('patient_id');
    localStorage.removeItem('patient_name');
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-[#FDFCFB] flex">
      {/* Sidebar */}
      <aside className="w-72 bg-white border-r border-[var(--color-primary)]/5 p-8 flex flex-col fixed h-full z-20">
        <Link to="/" className="flex items-center gap-2 mb-12 group">
          <div className="w-10 h-10 bg-[var(--color-primary)] rounded-xl flex items-center justify-center text-white">
            <LayoutDashboard size={24} />
          </div>
          <span className="text-xl font-black text-[var(--color-primary)]">ArogyaVeda</span>
        </Link>

        <nav className="space-y-2 flex-grow">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center gap-4 px-6 py-4 rounded-2xl font-bold transition-all ${
                  isActive 
                    ? 'bg-[var(--color-primary)] text-white shadow-lg shadow-[var(--color-primary)]/20' 
                    : 'text-[var(--color-text-light)] hover:bg-[var(--color-primary-light)] hover:text-[var(--color-primary)]'
                }`}
              >
                <item.icon size={22} />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <button
          onClick={handleLogout}
          className="mt-auto flex items-center gap-4 px-6 py-4 rounded-2xl font-bold text-red-500 hover:bg-red-50 transition-all border border-transparent hover:border-red-100"
        >
          <LogOut size={22} />
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-grow ml-72">
        {/* Header */}
        <header className="h-24 bg-white/40 backdrop-blur-md border-b border-[var(--color-primary)]/5 sticky top-0 px-12 flex items-center justify-between z-10">
          <h2 className="text-2xl font-black">
            {menuItems.find(i => i.path === location.pathname)?.name || 'Dashboard'}
          </h2>
          <div className="flex items-center gap-4 px-4 py-2 bg-white rounded-2xl shadow-sm border border-[var(--color-primary)]/5">
            <div className="w-10 h-10 bg-[var(--color-primary-light)] rounded-xl flex items-center justify-center text-[var(--color-primary)]">
              <User size={24} />
            </div>
            <div className="text-left">
              <div className="text-xs text-[var(--color-text-light)] font-bold">Namaste,</div>
              <div className="text-sm font-black">{patientName}</div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="p-12">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
