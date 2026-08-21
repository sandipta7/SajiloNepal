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
  Sparkles,
  ShieldCheck,
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
    if (hour < 12) return 'शुभ प्रभात • Good morning';
    if (hour < 17) return 'शुभ दिन • Good afternoon';
    return 'शुभ सन्ध्या • Good evening';
  };

  const handleDetectLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        () => {
          setUserLocation('Ward 10: Baneshwor');
        },
        () => {
          setUserLocation('Ward 10: Baneshwor');
        }
      );
    }
  };

  return (
    <div id="citizenDashboardView" className="flex flex-col gap-6 md:gap-8 max-w-[1280px] mx-auto animate-in fade-in duration-300">
      {/* Citizen Profile Greeting & Fast Actions Hero Card */}
      <section
        id="dashboardGreetingSection"
        className="relative overflow-hidden bg-white p-6 md:p-8 rounded-3xl border border-slate-200/90 shadow-xs nepal-gradient-subtle"
      >
        {/* Subtle decorative geometric Nepal flag accent line */}
        <div className="absolute top-0 left-0 right-0 h-1 nepal-gradient-line"></div>

        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 relative z-10">
          {/* Left: Citizen Profile */}
          <div id="citizenGreetingProfile" className="flex items-center gap-4">
            {/* Avatar Frame with Nepal Azure & Crimson Ring */}
            <div
              id="citizenAvatarFrame"
              className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-white border-2 border-slate-200 shadow-sm flex items-center justify-center flex-shrink-0 relative group"
              title="Citizen User (Sajilo Nepal)"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-slate-100 to-slate-50 flex items-center justify-center text-[#003893]">
                <User className="w-6 h-6 text-[#003893] stroke-[2]" />
              </div>
              <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full"></span>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-0.5">
                <span className="text-[11px] font-bold text-[#dc2626] uppercase tracking-wider">
                  {getGreeting()}
                </span>
                <span className="text-slate-300">•</span>
                <span className="text-[10px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-[#003893]" />
                  Verified Citizen
                </span>
              </div>
              <h1 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
                Namaste, Citizen
              </h1>
              <p className="text-xs text-slate-500 mt-0.5">
                Kathmandu Valley Civic Resolution Grid • Active Ward Desk
              </p>
            </div>
          </div>

          {/* Right: Location Selector + Report Issue Button */}
          <div id="citizenHeaderActions" className="flex flex-wrap sm:flex-nowrap items-center gap-3 w-full lg:w-auto">
            {/* Interactive Selectable Location Dropdown */}
            <div
              id="citizenLocationSelectBox"
              className="flex items-center gap-2.5 bg-white px-3.5 py-2 rounded-2xl border border-slate-200 shadow-2xs hover:border-slate-300 transition-all flex-1 sm:flex-initial"
            >
              <div className="w-7 h-7 rounded-xl bg-red-50 text-[#dc2626] flex items-center justify-center flex-shrink-0">
                <MapPin className="w-4 h-4" />
              </div>
              <div className="flex flex-col min-w-0">
                <label htmlFor="citizenWardSelect" className="text-[9px] font-bold text-slate-400 uppercase tracking-wider leading-none">
                  Ward Region
                </label>
                <div className="relative flex items-center">
                  <select
                    id="citizenWardSelect"
                    value={userLocation}
                    onChange={(e) => setUserLocation(e.target.value)}
                    className="bg-transparent text-xs font-bold text-slate-800 pr-5 appearance-none cursor-pointer focus:outline-none truncate py-0.5"
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
                className="p-1.5 text-slate-400 hover:text-[#dc2626] rounded-lg hover:bg-slate-50 transition-colors ml-1"
              >
                <LocateFixed className="w-3.5 h-3.5" />
              </button>
            </div>

            <button
              id="dashboardReportActionBtn"
              onClick={() => setCurrentView('report-issue')}
              className="flex-1 sm:flex-initial bg-[#dc2626] text-white px-6 py-3 rounded-2xl font-bold text-xs md:text-sm shadow-md shadow-red-950/15 hover:bg-[#b91c1c] active:scale-[0.98] transition-all flex items-center justify-center gap-2 whitespace-nowrap"
            >
              <Plus className="w-4 h-4 stroke-[2.5]" />
              <span>Report Issue</span>
            </button>
          </div>
        </div>
      </section>

      {/* 4 Metric KPI Bento Cards */}
      <section
        id="dashboardKpiGrid"
        className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4"
      >
        <StatCard
          id="kpiMyReportsCard"
          title="All Reports"
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
          title="Pending Action"
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
          title="Resolved ✓"
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
