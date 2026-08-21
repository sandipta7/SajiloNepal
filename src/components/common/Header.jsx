import React, { useState } from 'react';
import {
  Bell,
  Search,
  Menu,
  Plus,
  ShieldCheck,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Logo } from './Logo';

export const Header = ({ onMobileMenuToggle }) => {
  const {
    setCurrentView,
    navigateToAdmin,
    notifications,
    setIsNotificationOpen,
    issues,
    openIssueDetail,
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const searchResults = searchQuery.trim()
    ? issues.filter(
        (i) =>
          i.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          i.trackingNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
          i.locationName.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  return (
    <header
      id="mainAppHeader"
      className="fixed top-0 right-0 left-0 md:left-72 h-16 bg-white border-b border-slate-200 z-30 flex items-center justify-between px-4 md:px-8 shadow-xs"
    >
      {/* Left Search and Mobile Toggle */}
      <div className="flex items-center gap-2.5 flex-1 max-w-md">
        <button
          id="mobileMenuToggleBtn"
          onClick={onMobileMenuToggle}
          className="md:hidden p-1.5 rounded-lg text-slate-600 hover:bg-slate-100"
          aria-label="Open mobile menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="md:hidden flex-shrink-0">
          <Logo size="sm" showText={false} />
        </div>

        {/* Global Instant Search Bar */}
        <div className="relative w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            id="globalSearchInput"
            type="text"
            placeholder="Search tickets, locations, tracking ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
            className="w-full pl-9 pr-4 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#dc2626] focus:bg-white text-slate-900 placeholder:text-slate-400 transition-all"
          />

          {/* Quick Search Dropdown Preview */}
          {isSearchFocused && searchQuery && (
            <div
              id="searchPreviewDropdown"
              className="absolute left-0 right-0 top-full mt-2 bg-white rounded-xl shadow-lg border border-slate-200 max-h-72 overflow-y-auto z-50 divide-y divide-slate-100"
            >
              {searchResults.length === 0 ? (
                <div className="p-4 text-xs text-slate-500 text-center">
                  No issues found matching "{searchQuery}"
                </div>
              ) : (
                searchResults.map((issue) => (
                  <div
                    key={issue.id}
                    onClick={() => {
                      openIssueDetail(issue.id);
                      setSearchQuery('');
                    }}
                    className="p-3 hover:bg-slate-50 cursor-pointer flex items-center justify-between gap-3 text-left"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono font-semibold text-slate-500">
                          #{issue.trackingNumber}
                        </span>
                        <span className="text-xs font-semibold text-slate-900 line-clamp-1">
                          {issue.title}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 line-clamp-1">
                        {issue.locationName}
                      </p>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 uppercase font-bold">
                      {issue.status.replace('_', ' ')}
                    </span>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>

      {/* Right Controls & Actions */}
      <div className="flex items-center gap-2 md:gap-3">
        {/* Officer Desk Quick Switcher */}
        <button
          id="headerOfficerDeskBtn"
          onClick={() => navigateToAdmin('overview')}
          className="hidden lg:flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold px-3 py-1.5 rounded-lg shadow-xs transition-all"
        >
          <ShieldCheck className="w-3.5 h-3.5 text-red-400" />
          <span>Officer Desk</span>
        </button>

        {/* Quick Report Trigger */}
        <button
          id="headerQuickReportBtn"
          onClick={() => setCurrentView('report-issue')}
          className="hidden sm:flex items-center gap-1.5 bg-[#dc2626] text-white text-xs font-medium px-3.5 py-1.5 rounded-lg shadow-sm hover:bg-[#b91c1c] active:scale-[0.98] transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Report Issue</span>
        </button>

        {/* Notifications Bell */}
        <button
          id="notificationsToggleBtn"
          onClick={() => setIsNotificationOpen(true)}
          className="relative p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
          aria-label="View notifications"
        >
          <Bell className="w-5 h-5 text-slate-700" />
          {unreadCount > 0 && (
            <span
              id="headerNotifBadge"
              className="absolute top-1 right-1 w-4 h-4 bg-[#dc2626] text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white"
            >
              {unreadCount}
            </span>
          )}
        </button>

        {/* Citizen Mini Avatar */}
        <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
          <div className="w-8 h-8 rounded-full overflow-hidden border border-slate-200 bg-slate-100">
            <img
              src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80"
              alt="Citizen Profile"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </header>
  );
};
