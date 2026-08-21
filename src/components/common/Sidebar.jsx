import React from 'react';
import {
  LayoutDashboard,
  PlusCircle,
  MapPin,
  FileText,
  HelpCircle,
  Landmark,
  PhoneCall,
  LogOut,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Logo } from './Logo';

export const Sidebar = ({ className = '', onNavigate }) => {
  const { currentView, setCurrentView, logoutCitizen, stats } = useApp();

  const citizenNavItems = [
    {
      id: 'dashboard',
      label: 'Citizen Dashboard',
      nepali: 'नागरिक ड्यासबोर्ड',
      icon: LayoutDashboard,
    },
    {
      id: 'report-issue',
      label: 'Report an Issue',
      nepali: 'समस्या दर्ता गर्नुहोस्',
      icon: PlusCircle,
      highlight: true,
    },
    {
      id: 'explore-map',
      label: 'Valley Live Map',
      nepali: 'काठमाडौँ प्रत्यक्ष नक्शा',
      icon: MapPin,
      badge: 'Live',
    },
    {
      id: 'my-reports',
      label: 'Community Reports',
      nepali: 'सार्वजनिक उजुरीहरू',
      icon: FileText,
      count: stats.total,
    },
    {
      id: 'how-it-works',
      label: 'How It Works',
      nepali: 'नागरिक प्रयोग विधि',
      icon: HelpCircle,
    },
  ];

  const handleNavClick = (viewId) => {
    setCurrentView(viewId);
    if (onNavigate) {
      onNavigate();
    }
  };

  return (
    <aside
      id="desktopAppSidebar"
      className={`w-72 fixed top-0 bottom-0 left-0 bg-white border-r border-slate-200/90 flex flex-col justify-between p-4 z-40 select-none shadow-xs ${className}`}
    >
      {/* Brand Header */}
      <div className="space-y-5">
        <div
          id="sidebarBrandLogo"
          onClick={() => handleNavClick('dashboard')}
          className="flex items-center gap-2.5 px-3 py-2.5 cursor-pointer group bg-slate-50/80 hover:bg-slate-100/80 rounded-2xl border border-slate-200/80 transition-all hover:shadow-2xs"
        >
          <Logo size="md" />
        </div>

        {/* Public Citizen Navigation Items */}
        <nav id="sidebarNavContainer" className="space-y-1.5">
          {citizenNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                id={`sidebarNavItem-${item.id}`}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all text-left group active:scale-[0.98] ${
                  isActive
                    ? 'bg-[#dc2626] text-white shadow-sm font-bold ring-2 ring-[#dc2626]/20'
                    : item.highlight
                    ? 'bg-red-50/60 text-[#dc2626] hover:bg-red-50 border border-red-100 hover:border-red-200'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 border border-transparent'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors ${
                      isActive
                        ? 'bg-white/20 text-white'
                        : item.highlight
                        ? 'bg-white text-[#dc2626] shadow-2xs'
                        : 'bg-slate-100/80 text-slate-500 group-hover:bg-slate-200/70 group-hover:text-slate-800'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="truncate">
                    <p className="truncate leading-tight">{item.label}</p>
                    <p
                      className={`text-[10px] truncate mt-0.5 ${
                        isActive ? 'text-white/80' : 'text-slate-400'
                      }`}
                    >
                      {item.nepali}
                    </p>
                  </div>
                </div>

                {item.badge && (
                  <span
                    className={`text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                      isActive
                        ? 'bg-white text-[#dc2626]'
                        : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}

                {item.count !== undefined && !item.badge && (
                  <span
                    className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${
                      isActive
                        ? 'bg-white/20 text-white'
                        : 'bg-slate-100 text-slate-500 group-hover:bg-slate-200'
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

      {/* Ward Hotline & Municipal Helpline Footer */}
      <div className="space-y-3 pt-3 border-t border-slate-100">
        {/* Kathmandu Hotline & Emergency Response Card */}
        <div className="bg-slate-50/90 p-3 rounded-2xl border border-slate-200/90 shadow-2xs space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-slate-900">
            <span className="flex items-center gap-1.5">
              <Landmark className="w-3.5 h-3.5 text-[#dc2626]" />
              <span className="text-[11px]">Kathmandu Metro</span>
            </span>
            <span className="text-[9px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
              Toll-Free 1184
            </span>
          </div>
          <p className="text-[10px] text-slate-500 leading-tight">
            Ward 1–32 Quick Response Helpline
          </p>
          <div className="flex items-center justify-between text-[10px] font-semibold text-slate-700 bg-white p-2 rounded-xl border border-slate-200">
            <span className="flex items-center gap-1">
              <PhoneCall className="w-3 h-3 text-[#dc2626]" />
              <span>Police: 100</span>
            </span>
            <span className="text-slate-300">•</span>
            <span>Fire: 101</span>
            <span className="text-slate-300">•</span>
            <span>Ambulance: 102</span>
          </div>
        </div>

        {/* Citizen Exit / Logout Button */}
        <button
          id="sidebarCitizenLogoutBtn"
          onClick={() => {
            logoutCitizen();
            if (onNavigate) onNavigate();
          }}
          className="w-full flex items-center justify-center gap-2 py-2 px-3 text-slate-500 hover:text-red-600 hover:bg-red-50/80 rounded-xl text-xs font-semibold border border-slate-200/90 transition-colors cursor-pointer"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Exit Client Portal • बाहिरिनुहोस्</span>
        </button>
      </div>
    </aside>
  );
};
