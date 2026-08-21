import React from 'react';
import {
  Flame,
  Menu,
  User,
  LogOut,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const AdminHeader = ({ onMobileMenuToggle }) => {
  const { adminUser, logoutAdmin, stats, setSelectedIssueId, setAdminView } = useApp();

  const handleLogout = () => {
    logoutAdmin();
  };

  return (
    <header
      id="adminAppHeader"
      className="fixed top-0 right-0 left-0 md:left-72 h-16 bg-slate-900 border-b border-slate-800 z-30 flex items-center justify-between px-4 md:px-8 shadow-md text-white"
    >
      {/* Left Title & Mobile Toggle */}
      <div className="flex items-center gap-3">
        <button
          id="adminMobileMenuToggleBtn"
          onClick={onMobileMenuToggle}
          className="md:hidden p-2 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white"
          aria-label="Open mobile admin menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <span className="text-xs md:text-sm font-semibold text-slate-200">
          Kathmandu Municipal Executive Portal
        </span>
      </div>

      {/* Right Controls & Profile */}
      <div className="flex items-center gap-2 md:gap-4">
        {/* Urgent Critical Alerts Pill */}
        {stats.criticalAlerts > 0 && (
          <div
            onClick={() => setAdminView('dispatch')}
            className="flex items-center gap-1.5 bg-red-600/20 border border-red-500/40 text-red-300 text-xs px-2.5 py-1 rounded-lg font-medium cursor-pointer hover:bg-red-600/30 transition-colors"
          >
            <Flame className="w-3.5 h-3.5 text-red-400 animate-bounce" />
            <span>{stats.criticalAlerts} Critical</span>
          </div>
        )}

        {/* Admin Header Logout Button */}
        <button
          id="adminHeaderLogoutBtn"
          onClick={handleLogout}
          className="flex items-center gap-1.5 bg-red-950/60 hover:bg-red-900 text-red-200 hover:text-white text-xs px-2.5 py-1.5 rounded-lg border border-red-800/80 font-semibold transition-all cursor-pointer shadow-2xs active:scale-95"
          title="Sign Out of Admin"
        >
          <LogOut className="w-3.5 h-3.5 text-red-400" />
          <span className="hidden sm:inline">Logout</span>
        </button>

        {/* Admin Officer Profile Card */}
        <div className="flex items-center gap-2 pl-2 border-l border-slate-800">
          <div className="w-8 h-8 rounded-lg overflow-hidden border border-slate-700 bg-slate-800 flex items-center justify-center">
            {adminUser?.avatar ? (
              <img
                src={adminUser.avatar}
                alt={adminUser.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <User className="w-4 h-4 text-slate-400" />
            )}
          </div>

          <div className="hidden md:block text-left">
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-bold text-slate-200 leading-tight">
                {adminUser?.name || 'Officer Ramesh'}
              </span>
              <span className="text-[9px] font-mono font-bold bg-red-900/60 text-red-300 px-1 py-0.2 rounded border border-red-800">
                {adminUser?.role || 'Admin'}
              </span>
            </div>
            <p className="text-[10px] text-slate-400 leading-tight truncate max-w-[140px]">
              {adminUser?.department || 'KMC Command'}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};
