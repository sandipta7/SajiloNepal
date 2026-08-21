import React, { useState } from 'react';
import {
  Building2,
  CheckCircle2,
  Clock,
  Download,
  Flame,
  Layers,
  MapPin,
  Search,
  TrendingUp,
  User,
  Users,
  ExternalLink,
  Filter,
  Sparkles,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { CATEGORIES_DATA, KATHMANDU_WARDS } from '../../data/initialData';
import { exportIssuesToCSV } from '../../utils/exportUtils';
import { StatCard } from '../dashboard/StatCard';
import { StatusBadge } from '../common/StatusBadge';
import { SeverityBadge } from '../common/SeverityBadge';
import { formatRelativeTime } from '../../utils/formatters';

export const MunicipalityOverview = () => {
  const { issues, stats, openIssueDetail } = useApp();
  const [tableTab, setTableTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const handleExportData = () => {
    exportIssuesToCSV(issues);
  };

  const filteredIssues = issues
    .filter((issue) => {
      if (tableTab === 'pending' && issue.status !== 'pending' && issue.status !== 'under_review') return false;
      if (tableTab === 'assigned' && issue.status !== 'assigned') return false;
      if (tableTab === 'in_progress' && issue.status !== 'in_progress') return false;
      if (tableTab === 'resolved' && issue.status !== 'resolved') return false;
      if (selectedCategory !== 'all' && issue.category !== selectedCategory) return false;

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          issue.title.toLowerCase().includes(q) ||
          issue.trackingNumber.toLowerCase().includes(q) ||
          issue.locationName.toLowerCase().includes(q) ||
          (issue.reporterName && issue.reporterName.toLowerCase().includes(q))
        );
      }
      return true;
    })
    .sort((a, b) => {
      const timeA = new Date(a.reportedAt || a.createdAt || 0).getTime();
      const timeB = new Date(b.reportedAt || b.createdAt || 0).getTime();
      return timeB - timeA;
    });

  return (
    <div
      id="municipalityOverviewView"
      className="max-w-6xl mx-auto pb-12 space-y-6 animate-in fade-in duration-300"
    >
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 md:p-8 rounded-3xl border border-slate-200/90 shadow-xs relative overflow-hidden nepal-gradient-subtle">
        <div className="absolute top-0 left-0 right-0 h-1 nepal-gradient-line"></div>
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#dc2626] uppercase tracking-wider mb-1">
            <Building2 className="w-4 h-4 text-[#dc2626]" />
            <span>Kathmandu Metropolitan Authority • कार्यपालिका</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
            Municipal Command & Analytics
          </h1>
          <p className="text-xs md:text-sm text-slate-500 mt-1">
            Real-time urban governance, department response metrics, and municipal incident registry.
          </p>
        </div>

        <button
          onClick={handleExportData}
          className="bg-slate-900 text-white px-5 py-2.5 rounded-2xl text-xs font-bold flex items-center gap-2 hover:bg-slate-800 shadow-xs transition-all active:scale-95 cursor-pointer"
        >
          <Download className="w-4 h-4 text-amber-300" />
          <span>Export Grievance CSV</span>
        </button>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard
          id="statOverviewTotal"
          title="Total Registered"
          count={stats.total}
          icon={Layers}
          variant="surface"
        />
        <StatCard
          id="statOverviewResolution"
          title="Resolution Rate"
          count={`${stats.resolutionRate}%`}
          icon={TrendingUp}
          variant="resolved"
          subText="Target: 85%"
        />
        <StatCard
          id="statOverviewPending"
          title="Action Pending"
          count={stats.pending}
          icon={Clock}
          variant="pending"
        />
        <StatCard
          id="statOverviewCritical"
          title="Critical Alerts"
          count={stats.criticalAlerts}
          icon={Flame}
          variant="surface"
        />
      </div>

      {/* Grid: Category Breakdown & Ward Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Department Volume */}
        <div className="bg-white p-6 md:p-7 rounded-3xl border border-slate-200/90 shadow-xs space-y-4">
          <h3 className="text-sm font-bold text-slate-900 flex items-center justify-between">
            <span>Issues by Municipal Category</span>
            <span className="text-xs font-semibold text-slate-400">Department Share</span>
          </h3>

          <div className="space-y-3.5">
            {CATEGORIES_DATA.map((cat) => {
              const count = issues.filter((i) => i.category === cat.id).length;
              const pct =
                issues.length > 0
                  ? Math.round((count / issues.length) * 100)
                  : 0;

              return (
                <div key={cat.id} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-bold">
                    <span className="text-slate-800">{cat.name}</span>
                    <span className="text-slate-500 font-mono">
                      {count} ({pct}%)
                    </span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#003893] to-[#dc2626] rounded-full transition-all duration-500"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Priority Action Required List */}
        <div className="bg-white p-6 md:p-7 rounded-3xl border border-slate-200/90 shadow-xs space-y-4">
          <h3 className="text-sm font-bold text-slate-900 flex items-center justify-between">
            <span>High Priority Attention Queue</span>
            <span className="text-xs text-[#dc2626] font-bold bg-red-50 px-2 py-0.5 rounded border border-red-200">Urgent</span>
          </h3>

          <div className="divide-y divide-slate-100">
            {issues
              .filter(
                (i) => i.severity === 'critical' || i.severity === 'high'
              )
              .slice(0, 4)
              .map((issue) => (
                <div
                  key={issue.id}
                  onClick={() => openIssueDetail(issue.id)}
                  className="py-3 flex items-center justify-between gap-3 hover:bg-slate-50 p-2.5 rounded-2xl cursor-pointer transition-all"
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono font-bold text-[#003893] bg-blue-50 px-1.5 py-0.2 rounded border border-blue-100">
                        #{issue.trackingNumber}
                      </span>
                      <span className="text-xs font-bold text-slate-900 truncate">
                        {issue.title}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 truncate mt-0.5">
                      {issue.locationName}
                    </p>
                  </div>

                  <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-red-50 text-[#dc2626] border border-red-200 uppercase whitespace-nowrap">
                    Impact: {issue.impactScore}
                  </span>
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* Comprehensive Municipal Grievance Registry */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs p-6 md:p-7 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-black text-slate-900">
                Live Grievances & Incident Registry
              </h2>
              <span className="text-[10px] bg-red-50 text-[#dc2626] font-bold px-2 py-0.5 rounded-full border border-red-200 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>
                Newest First
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Full directory of citizen reports across all wards ({issues.length} total)
            </p>
          </div>

          {/* Quick Category Filter */}
          <div className="flex items-center gap-2">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#003893]/20"
            >
              <option value="all">All Departments</option>
              {CATEGORIES_DATA.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Tab Filters and Search */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-1.5">
            <button
              onClick={() => setTableTab('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                tableTab === 'all'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              All Records ({issues.length})
            </button>
            <button
              onClick={() => setTableTab('pending')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                tableTab === 'pending'
                  ? 'bg-[#dc2626] text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              Pending ({stats.pending})
            </button>
            <button
              onClick={() => setTableTab('assigned')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                tableTab === 'assigned'
                  ? 'bg-[#003893] text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              Assigned ({issues.filter((i) => i.status === 'assigned').length})
            </button>
            <button
              onClick={() => setTableTab('in_progress')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                tableTab === 'in_progress'
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              In Progress ({issues.filter((i) => i.status === 'in_progress').length})
            </button>
            <button
              onClick={() => setTableTab('resolved')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                tableTab === 'resolved'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              Resolved ({stats.resolved})
            </button>
          </div>

          <div className="relative w-full md:w-64">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by ticket #, ward, title..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#003893]/20 text-slate-900"
            />
          </div>
        </div>

        {/* Table / List */}
        {filteredIssues.length === 0 ? (
          <div className="p-8 text-center bg-slate-50 rounded-2xl border border-slate-100">
            <p className="text-xs text-slate-500 font-medium">
              No municipal records found matching the active filter.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-2xl border border-slate-200/90">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase font-bold text-[10px] tracking-wider">
                <tr>
                  <th className="px-3 py-3 w-12 text-center">SN</th>
                  <th className="px-4 py-3">Tracking / ID</th>
                  <th className="px-4 py-3">Title & Category</th>
                  <th className="px-4 py-3">Location / Ward</th>
                  <th className="px-4 py-3">Severity</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Reported</th>
                  <th className="px-4 py-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredIssues.map((issue, index) => {
                  const isRecent =
                    issue.reportedAt &&
                    (new Date().getTime() - new Date(issue.reportedAt).getTime() < 3600000 * 24 ||
                      issue.timeline?.[0]?.timestamp === 'Just now');

                  return (
                    <tr
                      key={issue.id}
                      onClick={() => openIssueDetail(issue.id)}
                      className={`hover:bg-slate-50/90 cursor-pointer transition-colors ${
                        isRecent && index === 0 ? 'bg-red-50/30' : ''
                      }`}
                    >
                      <td className="px-3 py-3 text-center font-mono font-bold text-slate-400 text-[11px]">
                        #{index + 1}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="flex items-center gap-1.5">
                          <span className="font-mono font-bold text-[#003893]">
                            #{issue.trackingNumber}
                          </span>
                          {isRecent && index < 3 && (
                            <span className="bg-red-100 text-red-700 text-[9px] font-bold px-1.5 py-0.2 rounded uppercase">
                              NEW
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-3 max-w-xs">
                        <p className="font-bold text-slate-900 truncate">{issue.title}</p>
                        <p className="text-[11px] text-slate-400 capitalize">{issue.category}</p>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <p className="text-slate-800 font-medium">{issue.locationName}</p>
                        <p className="text-[10px] text-slate-400">{issue.ward || 'KMC Ward'}</p>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <SeverityBadge severity={issue.severity} />
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <StatusBadge status={issue.status} />
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-slate-500 text-[11px]">
                        {formatRelativeTime(issue.reportedAt)}
                      </td>
                      <td className="px-4 py-3 text-right whitespace-nowrap">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            openIssueDetail(issue.id);
                          }}
                          className="px-3 py-1 bg-[#003893] hover:bg-[#002b70] text-white rounded-lg text-[11px] font-bold transition-colors"
                        >
                          Inspect →
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
