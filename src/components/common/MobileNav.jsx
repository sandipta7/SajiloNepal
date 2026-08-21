import React from 'react';
import {
  LayoutDashboard,
  PlusCircle,
  MapPin,
  FileText,
  ShieldCheck,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const MobileNav = () => {
  const { currentView, setCurrentView, navigateToAdmin } = useApp();

  const navItems = [
    { id: 'dashboard', label: 'Home', icon: LayoutDashboard },
    { id: 'explore-map', label: 'Map', icon: MapPin },
    { id: 'report-issue', label: 'Report', icon: PlusCircle, isMain: true },
    { id: 'my-reports', label: 'Reports', icon: FileText },
    { id: 'admin-portal', label: 'Desk', icon: ShieldCheck, isAdmin: true },
  ];

  const handleClick = (item) => {
    if (item.isAdmin) {
      navigateToAdmin('overview');
    } else {
      setCurrentView(item.id);
    }
  };

  return (
    <nav
      id="mobileBottomNav"
      className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-white/95 backdrop-blur-md border-t border-slate-200 z-40 px-2 flex items-center justify-around shadow-lg"
    >
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = currentView === item.id;

        if (item.isMain) {
          return (
            <button
              key={item.id}
              id={`mobileNavItem-${item.id}`}
              onClick={() => handleClick(item)}
              className="flex flex-col items-center justify-center -mt-5 relative group"
            >
              <div className="w-12 h-12 rounded-full bg-[#dc2626] text-white flex items-center justify-center shadow-md active:scale-95 transition-transform">
                <Icon className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-bold text-slate-800 mt-1">
                {item.label}
              </span>
            </button>
          );
        }

        return (
          <button
            key={item.id}
            id={`mobileNavItem-${item.id}`}
            onClick={() => handleClick(item)}
            className={`flex flex-col items-center justify-center py-1 px-2 rounded-lg transition-colors ${
              isActive ? 'text-[#dc2626]' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Icon className="w-5 h-5" />
            <span className={`text-[10px] mt-0.5 ${isActive ? 'font-bold' : 'font-medium'}`}>
              {item.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
};
