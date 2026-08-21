import React from 'react';
import {
  LayoutDashboard,
  PlusCircle,
  MapPin,
  FileText,
  HelpCircle,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const MobileNav = () => {
  const { currentView, setCurrentView } = useApp();

  const navItems = [
    { id: 'dashboard', label: 'Home', icon: LayoutDashboard },
    { id: 'explore-map', label: 'Live Map', icon: MapPin },
    { id: 'report-issue', label: 'Report', icon: PlusCircle, isMain: true },
    { id: 'my-reports', label: 'Reports', icon: FileText },
    { id: 'how-it-works', label: 'Guide', icon: HelpCircle },
  ];

  const handleClick = (item) => {
    setCurrentView(item.id);
  };

  return (
    <nav
      id="mobileBottomNav"
      className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-white/95 backdrop-blur-lg border-t border-slate-200/90 z-40 px-3 flex items-center justify-around shadow-lg"
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
              className="flex flex-col items-center justify-center -mt-6 relative group"
            >
              <div className="w-13 h-13 rounded-2xl bg-gradient-to-tr from-[#dc2626] to-[#b91c1c] text-white flex items-center justify-center shadow-lg shadow-red-950/20 ring-4 ring-white active:scale-95 transition-all">
                <Icon className="w-6 h-6 stroke-[2.2]" />
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
            className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all relative ${
              isActive
                ? 'text-[#dc2626]'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            <Icon className={`w-5 h-5 transition-transform ${isActive ? 'scale-110' : ''}`} />
            <span className={`text-[10px] mt-0.5 ${isActive ? 'font-black text-[#dc2626]' : 'font-medium'}`}>
              {item.label}
            </span>
            {isActive && (
              <span className="w-1 h-1 rounded-full bg-[#dc2626] absolute -bottom-1"></span>
            )}
          </button>
        );
      })}
    </nav>
  );
};
