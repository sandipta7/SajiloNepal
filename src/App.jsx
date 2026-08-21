import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/common/Header';
import { Sidebar } from './components/common/Sidebar';
import { MobileNav } from './components/common/MobileNav';
import { NotificationModal } from './components/common/NotificationModal';
import { CitizenDashboard } from './components/dashboard/CitizenDashboard';
import { ExploreMap } from './components/map/ExploreMap';
import { ReportIssue } from './components/report/ReportIssue';
import { MyReports } from './components/reports/MyReports';
import { IssueDetail } from './components/detail/IssueDetail';
import { HowItWorks } from './components/info/HowItWorks';
import { AdminLayout } from './components/admin/AdminLayout';
import { PortalGateway } from './components/auth/PortalGateway';

const CitizenLayout = () => {
  const { currentView, setCurrentView } = useApp();
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const renderCurrentView = () => {
    switch (currentView) {
      case 'dashboard':
        return <CitizenDashboard />;
      case 'explore-map':
        return <ExploreMap />;
      case 'report-issue':
        return <ReportIssue />;
      case 'my-reports':
        return <MyReports />;
      case 'issue-detail':
        return <IssueDetail onBack={() => setCurrentView('dashboard')} />;
      case 'how-it-works':
        return <HowItWorks />;
      default:
        return <CitizenDashboard />;
    }
  };

  return (
    <div
      id="solveForNepalCitizenRoot"
      className="min-h-screen bg-slate-50 text-slate-800 font-sans flex flex-col selection:bg-red-100 selection:text-red-900"
    >
      {/* Desktop Persistent Citizen Sidebar */}
      <Sidebar className="hidden md:flex" />

      {/* Mobile Drawer Sidebar */}
      {isMobileSidebarOpen && (
        <div
          id="mobileSidebarOverlay"
          className="fixed inset-0 bg-black/40 z-50 md:hidden backdrop-blur-2xs"
          onClick={() => setIsMobileSidebarOpen(false)}
        >
          <div
            className="w-72 h-full bg-white animate-in slide-in-from-left duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <Sidebar onNavigate={() => setIsMobileSidebarOpen(false)} />
          </div>
        </div>
      )}

      {/* Top Citizen Header */}
      <Header onMobileMenuToggle={() => setIsMobileSidebarOpen(true)} />

      {/* Main Content Workspace */}
      <main
        id="citizenMainContentWorkspace"
        className="flex-1 md:pl-72 pt-16 pb-20 md:pb-8 px-4 md:px-8 transition-all"
      >
        <div className="py-6">{renderCurrentView()}</div>
      </main>

      {/* Mobile Bottom Navigation */}
      <MobileNav />

      {/* Global Modals & Notifications */}
      <NotificationModal />
    </div>
  );
};

const RootRouter = () => {
  const { portal } = useApp();

  if (portal === 'admin') {
    return <AdminLayout />;
  }

  if (portal === 'citizen') {
    return <CitizenLayout />;
  }

  return <PortalGateway />;
};

export default function App() {
  return (
    <AppProvider>
      <RootRouter />
    </AppProvider>
  );
}
