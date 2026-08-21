import React from 'react';
import {
  LayoutDashboard,
  PlusCircle,
  MapPin,
  FileText,
  HelpCircle,
  Landmark,
  PhoneCall,
  ShieldCheck,
  ArrowRight,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Logo } from './Logo';

export const Sidebar = ({ className = '', onNavigate }) => {
  const { currentView, setCurrentView, navigateToAdmin } = useApp();

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
      nepali: 'काठमाडौँ उपत्यका नक्शा',
      icon: MapPin,
    },
    {
      id: 'my-reports',
      label: 'Community Reports',
      nepali: 'सार्वजनिक उजुरीहरू',
      icon: FileText,
    },
    {
      id: 'how-it-works',
      label: 'How It Works',
      nepali: 'प्रयोग विधि',
      icon: HelpCircle,
    },
  ];

  const handleNavClick = (viewId) => {
    setCurrentView(viewId);
    if (onNavigate) {
      onNavigate();
    }
  };

  const handleAdminPortalClick = () => {
    navigateToAdmin('overview');
    if (onNavigate) {
      onNavigate();
    }
  };

  return (
    <aside
      id="desktopAppSidebar"
      className={`w-72 fixed top-0 bottom-0 left-0 bg-white border-r border-slate-200 flex flex-col justify-between p-4 z-40 select-none shadow-xs ${className}`}
    >
      {/* Brand Header */}
      <div className="space-y-5">
        <div
          id="sidebarBrandLogo"
          onClick={() => handleNavClick('dashboard')}
          className="flex items-center gap-2.5 px-2 py-1 cursor-pointer group bg-slate-50 hover:bg-slate-100 rounded-xl border border-slate-200 transition-all"
        >
          <Logo size="md" />
        </div>

        {/* Public Citizen Navigation Items */}
        <nav id="sidebarNavContainer" className="space-y-1">
          {citizenNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                id={`sidebarNavItem-${item.id}`}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-xs font-semibold transition-all text-left ${
                  isActive
                    ? 'bg-[#dc2626] text-white shadow-xs font-bold'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <Icon
                    className={`w-4 h-4 flex-shrink-0 ${
                      isActive ? 'text-white' : 'text-slate-500'
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
              </button>
            );
          })}
        </nav>
      </div>

      {/* Ward Hotline & Municipal Admin Switcher Footer */}
      <div className="space-y-3 pt-3 border-t border-slate-100">
        {/* Officer / Admin Portal Switch Button */}
        <button
          onClick={handleAdminPortalClick}
          className="w-full p-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold flex items-center justify-between transition-all group shadow-sm"
        >
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-6 h-6 rounded-lg bg-red-600 flex items-center justify-center text-white">
              <ShieldCheck className="w-3.5 h-3.5" />
            </div>
            <div className="text-left truncate">
              <p className="text-[11px] font-bold text-white leading-tight truncate">
                Municipal Officer Desk
              </p>
              <p className="text-[9px] text-slate-400 truncate">
                Admin & Dispatch Roster
              </p>
            </div>
          </div>
          <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 group-hover:text-white transition-all flex-shrink-0" />
        </button>

        {/* Kathmandu Hotline */}
        <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-900 mb-1">
            <span className="flex items-center gap-1.5">
              <Landmark className="w-3.5 h-3.5 text-[#dc2626]" />
              <span className="text-[11px]">Kathmandu Metro</span>
            </span>
            <span className="text-[9px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
              Toll-Free 1184
            </span>
          </div>
          <p className="text-[10px] text-slate-500 mb-1.5">
            Ward 1–32 Emergency Dispatch Desk
          </p>
          <div className="flex items-center gap-1 text-[10px] font-semibold text-slate-700 bg-white p-1.5 rounded-lg border border-slate-200">
            <PhoneCall className="w-3 h-3 text-[#dc2626]" />
            <span>Police: 100 / Fire: 101</span>
          </div>
        </div>
      </div>
    </aside>
  );
};
