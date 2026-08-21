import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { AdminHeader } from './AdminHeader';
import { AdminSidebar } from './AdminSidebar';
import { AdminLogin } from './AdminLogin';
import { MunicipalityOverview } from '../overview/MunicipalityOverview';
import { ResponderPanel } from '../responder/ResponderPanel';
import { AdminMap } from './AdminMap';
import { AdminRoster } from './AdminRoster';
import { AdminSettings } from './AdminSettings';
import { IssueDetail } from '../detail/IssueDetail';

export const AdminLayout = () => {
  const { adminAuth, adminView, setAdminView, navigateToGateway } = useApp();
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // If not authenticated, render the secure Admin Login portal
  if (!adminAuth?.isAuthenticated) {
    return <AdminLogin onBackToGateway={navigateToGateway} />;
  }

  const renderAdminView = () => {
    switch (adminView) {
      case 'overview':
        return <MunicipalityOverview />;
      case 'dispatch':
        return <ResponderPanel />;
      case 'map':
        return <AdminMap />;
      case 'roster':
        return <AdminRoster />;
      case 'settings':
        return <AdminSettings />;
      case 'issue-detail':
        return <IssueDetail onBack={() => setAdminView('dispatch')} />;
      default:
        return <MunicipalityOverview />;
    }
  };

  return (
    <div
      id="adminPanelRoot"
      className="min-h-screen bg-slate-100 text-slate-800 font-sans flex flex-col selection:bg-red-500 selection:text-white"
    >
      {/* Desktop Persistent Admin Sidebar */}
      <AdminSidebar
        className="hidden md:flex"
      />

      {/* Mobile Drawer Admin Sidebar */}
      {isMobileSidebarOpen && (
        <div
          id="adminMobileSidebarOverlay"
          className="fixed inset-0 bg-black/60 z-50 md:hidden backdrop-blur-2xs"
          onClick={() => setIsMobileSidebarOpen(false)}
        >
          <div
            className="w-72 h-full bg-slate-900 animate-in slide-in-from-left duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <AdminSidebar
              onNavigate={() => setIsMobileSidebarOpen(false)}
            />
          </div>
        </div>
      )}

      {/* Admin Top Header */}
      <AdminHeader
        onMobileMenuToggle={() => setIsMobileSidebarOpen(true)}
      />

      {/* Main Admin Content Workspace */}
      <main
        id="adminMainWorkspace"
        className="flex-1 md:pl-72 pt-16 pb-12 px-4 md:px-8 transition-all"
      >
        <div className="py-6">{renderAdminView()}</div>
      </main>
    </div>
  );
};
