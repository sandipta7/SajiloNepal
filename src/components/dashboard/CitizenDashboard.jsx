import React from 'react';
import {
  ClipboardList,
  Hourglass,
  RefreshCw,
  CheckCircle2,
  MapPin,
  Plus,
  User,
  ChevronDown,
  LocateFixed,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { StatCard } from './StatCard';
import { NearbyIssuesList } from './NearbyIssuesList';
import { RecentReportsList } from './RecentReportsList';
import { KATHMANDU_WARDS } from '../../data/initialData';

export const CitizenDashboard = () => {
  const {
    stats,
    setCurrentView,
    userLocation,
    setUserLocation,
    setSelectedCategoryFilter,
  } = useApp();

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  const handleDetectLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        () => {
          setUserLocation('Ward 10: Baneshwor, Kathmandu');
        },
        () => {
          setUserLocation('Ward 10: Baneshwor, Kathmandu');
        }
      );
    }
  };

  return (
    <div id="citizenDashboardView" className="flex flex-col gap-6 md:gap-8 max-w-[1280px] mx-auto">
      {/* Citizen Profile Greeting & Fast Actions */}
      <section
        id="dashboardGreetingSection"
        className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 bg-white p-5 md:p-6 rounded-xl border border-slate-200 shadow-xs"
      >
        {/* Left: Citizen Faceless Avatar and Title */}
        <div id="citizenGreetingProfile" className="flex items-center gap-3.5 sm:gap-4">
          {/* Default No-Face / Silhouette Avatar */}
          <div
            id="citizenAvatarFrame"
            className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-tr from-slate-200 via-slate-100 to-slate-200 border-2 border-slate-300 flex items-center justify-center flex-shrink-0 shadow-inner"
            title="Citizen (Anonymous User)"
          >
            <div className="w-full h-full rounded-full flex items-center justify-center bg-slate-100 text-slate-400">
              <User className="w-6 h-6 md:w-7 md:h-7 text-slate-500 stroke-[1.75]" />
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-0.5">
              {getGreeting()}
            </p>
            <h1 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">
              Citizen
            </h1>
          </div>
        </div>

        {/* Right: Location Selector in Same Box + Report Issue Button */}
        <div id="citizenHeaderActions" className="flex flex-wrap sm:flex-nowrap items-center gap-2.5 sm:gap-3 w-full lg:w-auto">
          {/* Interactive Selectable Location Dropdown */}
          <div
            id="citizenLocationSelectBox"
            className="flex items-center gap-2 bg-slate-50 hover:bg-slate-100/80 px-3 py-1.5 rounded-lg border border-slate-200 transition-all flex-1 sm:flex-initial"
          >
            <MapPin className="w-4 h-4 text-[#dc2626] flex-shrink-0" />
            <div className="flex flex-col min-w-0">
              <label htmlFor="citizenWardSelect" className="text-[9px] font-bold text-slate-400 uppercase leading-none">
                Active Ward / Area
              </label>
              <div className="relative flex items-center">
                <select
                  id="citizenWardSelect"
                  value={userLocation}
                  onChange={(e) => setUserLocation(e.target.value)}
                  className="bg-transparent text-xs font-semibold text-slate-800 pr-5 appearance-none cursor-pointer focus:outline-none truncate py-0.5"
                >
                  <option value="Baneshwor, Kathmandu">Baneshwor, Kathmandu</option>
                  <option value="Kathmandu Metropolitan City">All Kathmandu Metro</option>
                  {KATHMANDU_WARDS.map((ward) => (
                    <option key={ward} value={ward}>
                      {ward}
                    </option>
                  ))}
                  <option value="Lalitpur Metropolitan City">Lalitpur Metro</option>
                  <option value="Bhaktapur Municipality">Bhaktapur Municipality</option>
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-0 pointer-events-none" />
              </div>
            </div>

            <button
              onClick={handleDetectLocation}
              title="Detect Current Location (GPS)"
              className="p-1 text-slate-400 hover:text-[#dc2626] rounded-md hover:bg-white transition-colors ml-1"
            >
              <LocateFixed className="w-3.5 h-3.5" />
            </button>
          </div>

          <button
            id="dashboardReportActionBtn"
            onClick={() => setCurrentView('report-issue')}
            className="flex-1 sm:flex-initial bg-[#dc2626] text-white px-5 py-2.5 rounded-lg font-medium text-xs md:text-sm shadow-sm hover:bg-[#b91c1c] active:scale-[0.98] transition-all flex items-center justify-center gap-2 whitespace-nowrap"
          >
            <Plus className="w-4 h-4" />
            <span>Report Issue</span>
          </button>
        </div>
      </section>

      {/* 4 Metric KPI Bento Cards */}
      <section
        id="dashboardKpiGrid"
        className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4"
      >
        <StatCard
          id="kpiMyReportsCard"
          title="My Reports"
          count={stats.total}
          icon={ClipboardList}
          variant="surface"
          onClick={() => {
            setSelectedCategoryFilter('all');
            setCurrentView('my-reports');
          }}
        />
        <StatCard
          id="kpiPendingCard"
          title="Pending"
          count={stats.pending}
          icon={Hourglass}
          variant="pending"
          onClick={() => {
            setCurrentView('my-reports');
          }}
        />
        <StatCard
          id="kpiInProgressCard"
          title="In Progress"
          count={stats.inProgress}
          icon={RefreshCw}
          variant="inProgress"
          onClick={() => {
            setCurrentView('my-reports');
          }}
        />
        <StatCard
          id="kpiResolvedCard"
          title="Resolved"
          count={stats.resolved}
          icon={CheckCircle2}
          variant="resolved"
          onClick={() => {
            setCurrentView('my-reports');
          }}
        />
      </section>

      {/* Main Split Grid: Nearby Issues & Recent Reports */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
        <div className="lg:col-span-2">
          <NearbyIssuesList />
        </div>
        <div className="lg:col-span-1">
          <RecentReportsList />
        </div>
      </div>
    </div>
  );
};
