import React from 'react';
import {
  Building2,
  CheckCircle2,
  FileSpreadsheet,
  Globe,
  HelpCircle,
  LayoutDashboard,
  LogOut,
  MapPin,
  Shield,
  ShieldAlert,
  ShieldCheck,
  Sliders,
  Users,
  ExternalLink,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Logo } from '../common/Logo';

export const AdminSidebar = ({ className = '', onNavigate, onExitToCitizen }) => {
  const { adminView, setAdminView, logoutAdmin, stats, adminUser } = useApp();

  const adminNavItems = [
    {
      id: 'overview',
      label: 'Command & Analytics',
      nepali: 'नगरपालिका अवलोकन',
      icon: Building2,
      count: stats.total,
    },
    {
      id: 'dispatch',
      label: 'Officer Triage & Field Desk',
      nepali: 'कर्मचारी कार्यक्षेत्र',
      icon: ShieldAlert,
      badge: 'Action Required',
      count: stats.pending + stats.inProgress,
    },
    {
      id: 'map',
      label: 'Tactical Incident Map',
      nepali: 'काठमाडौँ प्रत्यक्ष नक्शा',
      icon: MapPin,
    },
    {
      id: 'roster',
      label: 'Department Roster & Staff',
      nepali: 'विभाग र कर्मचारी सूची',
      icon: Users,
    },
    {
      id: 'settings',
      label: 'System Audit & Settings',
      nepali: 'सुरक्षा तथा अभिलेख',
      icon: Sliders,
    },
  ];

  const handleNavClick = (viewId) => {
    setAdminView(viewId);
    if (onNavigate) {
      onNavigate();
    }
  };

  const handleLogout = () => {
    logoutAdmin();
    if (onNavigate) {
      onNavigate();
    }
  };

  return (
    <aside
      id="adminAppSidebar"
      className={`w-72 fixed top-0 bottom-0 left-0 bg-slate-900 border-r border-slate-800 flex flex-col justify-between p-4 z-40 select-none shadow-xl text-white ${className}`}
    >
      {/* Brand Header */}
      <div className="space-y-6">
        <div
          id="adminSidebarBrand"
          onClick={() => handleNavClick('overview')}
          className="flex items-center justify-between gap-2 px-2.5 py-2 cursor-pointer group bg-slate-800/90 rounded-xl border border-slate-700 hover:border-slate-600 transition-all"
        >
          <div className="bg-white p-1 rounded-lg">
            <Logo size="sm" showText={false} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <span className="font-bold text-xs text-white tracking-tight truncate">
                Sajilo Nepal Desk
              </span>
              <span className="text-[8px] bg-red-600 text-white font-bold px-1.5 py-0.5 rounded uppercase">
                Officer
              </span>
            </div>
            <p className="text-[9px] font-medium text-slate-400 truncate">
              Kathmandu Metropolitan City
            </p>
          </div>
        </div>

        {/* Navigation Items */}
        <nav id="adminSidebarNav" className="space-y-1">
          {adminNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = adminView === item.id;
            return (
              <button
                key={item.id}
                id={`adminNavItem-${item.id}`}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all text-left ${
                  isActive
                    ? 'bg-[#dc2626] text-white shadow-md font-bold'
                    : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <Icon
                    className={`w-4 h-4 flex-shrink-0 ${
                      isActive ? 'text-white' : 'text-slate-400'
                    }`}
                  />
                  <div className="truncate">
                    <p className="truncate leading-tight">{item.label}</p>
                    <p
                      className={`text-[10px] truncate ${
                        isActive ? 'text-white/80' : 'text-slate-400'
                      }`}
                    >
                      {item.nepali}
                    </p>
                  </div>
                </div>

                {item.count !== undefined && (
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full font-mono font-bold ${
                      isActive
                        ? 'bg-white/20 text-white'
                        : 'bg-slate-800 text-slate-300'
                    }`}
                  >
                    {item.count}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Footer Section with Officer Profile & Portal Switch */}
      <div className="space-y-3 pt-4 border-t border-slate-800">
        {/* Officer Status Badge */}
        <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700/80">
          <div className="flex items-center justify-between text-xs font-semibold text-white mb-1">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Authenticated Session</span>
            </span>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          </div>
          <p className="text-[11px] text-slate-300 truncate">
            {adminUser?.email || 'admin@kathmandu.gov.np'}
          </p>
        </div>

        {/* Exit to Citizen Portal Button */}
        <button
          onClick={onExitToCitizen}
          className="w-full flex items-center justify-center gap-2 py-2 px-3 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-xl text-xs font-semibold border border-slate-700 transition-colors"
        >
          <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
          <span>Switch to Citizen View</span>
        </button>

        {/* Logout Action */}
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 py-2 px-3 text-red-400 hover:bg-red-950/40 rounded-xl text-xs font-semibold transition-colors"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Sign Out of Admin</span>
        </button>
      </div>
    </aside>
  );
};
