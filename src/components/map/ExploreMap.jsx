import React, { useState } from 'react';
import {
  Filter,
  Layers,
  MapPin,
  Plus,
  Search,
  ThumbsUp,
  X,
  ArrowRight,
  Crosshair,
  Sparkles,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { CATEGORIES_DATA } from '../../data/initialData';
import { MapLeaflet } from './MapLeaflet';
import { StatusBadge } from '../common/StatusBadge';
import { SeverityBadge } from '../common/SeverityBadge';

export const ExploreMap = () => {
  const {
    issues,
    openIssueDetail,
    setCurrentView,
    upvoteIssue,
    selectedIssueId,
    setSelectedIssueId,
  } = useApp();

  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [localSearch, setLocalSearch] = useState('');
  const [focusedIssueId, setFocusedIssueId] = useState(selectedIssueId || null);

  // Filter issues
  const filteredIssues = issues.filter((issue) => {
    if (categoryFilter !== 'all' && issue.category !== categoryFilter) {
      return false;
    }
    if (statusFilter !== 'all' && issue.status !== statusFilter) {
      return false;
    }
    if (localSearch) {
      const q = localSearch.toLowerCase();
      const match =
        issue.title.toLowerCase().includes(q) ||
        issue.locationName.toLowerCase().includes(q) ||
        issue.trackingNumber.toLowerCase().includes(q);
      if (!match) return false;
    }
    return true;
  });

  const selectedMapIssue =
    (focusedIssueId ? issues.find((i) => i.id === focusedIssueId) : null) ||
    filteredIssues[0] ||
    issues[0] ||
    null;

  const handleMarkerSelect = (issue) => {
    setFocusedIssueId(issue.id);
    setSelectedIssueId(issue.id);
  };

  return (
    <div id="exploreMapView" className="flex flex-col h-[calc(100vh-112px)] relative space-y-3 animate-in fade-in duration-300">
      {/* Top Filter Bar */}
      <div
        id="mapTopFilterBar"
        className="bg-white p-3.5 rounded-2xl shadow-xs border border-slate-200/90 flex flex-wrap items-center justify-between gap-3 z-20"
      >
        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto customScrollbar pb-1 md:pb-0 max-w-full">
          <button
            onClick={() => setCategoryFilter('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all active:scale-95 ${categoryFilter === 'all'
                ? 'bg-[#003893] text-white shadow-xs'
                : 'bg-slate-100/90 text-slate-600 hover:bg-slate-200'
              }`}
          >
            All Categories ({issues.length})
          </button>
          {CATEGORIES_DATA.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setCategoryFilter(cat.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 active:scale-95 ${categoryFilter === cat.id
                  ? 'bg-[#dc2626] text-white shadow-xs'
                  : 'bg-slate-100/90 text-slate-600 hover:bg-slate-200'
                }`}
            >
              <span>{cat.name}</span>
            </button>
          ))}
        </div>

        {/* Search & Status Filter */}
        <div className="flex items-center gap-2 w-full md:w-auto justify-between md:justify-end">
          <div className="relative flex-1 md:w-48">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search valley map..."
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#003893]/20 text-slate-900 placeholder:text-slate-400"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#003893]/20"
          >
            <option value="all">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="assigned">Assigned</option>
            <option value="in_progress">In Progress</option>
            <option value="resolved">Resolved</option>
          </select>

          <button
            onClick={() => setCurrentView('report-issue')}
            className="bg-[#dc2626] text-white px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 hover:bg-[#b91c1c] active:scale-95 shadow-xs flex-shrink-0 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
            <span className="hidden sm:inline">Report Pin</span>
          </button>
        </div>
      </div>

      {/* Main Map & Interactive Overlays */}
      <div id="mapWorkspaceContainer" className="flex-1 relative rounded-3xl overflow-hidden shadow-xs border border-slate-200/90">
        <MapLeaflet
          issues={filteredIssues}
          onSelectIssue={handleMarkerSelect}
          selectedIssueId={selectedMapIssue?.id}
        />

        {/* Selected Issue Floating Card (Bottom or Side) */}
        {selectedMapIssue && (
          <div
            id="mapSelectedIssueCard"
            className="absolute bottom-5 left-5 right-5 md:right-auto md:w-96 bg-white/95 backdrop-blur-md rounded-3xl p-5 shadow-xl border border-white/80 z-30 animate-in slide-in-from-bottom-4 duration-300"
          >
            <div className="flex items-start justify-between gap-2 mb-2.5">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono font-bold text-[#003893] bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
                  #{selectedMapIssue.trackingNumber}
                </span>
                <SeverityBadge severity={selectedMapIssue.severity} />
              </div>
              <button
                onClick={() => setFocusedIssueId(null)}
                className="text-slate-400 hover:bg-slate-100 p-1 rounded-full cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <h3 className="text-sm font-bold text-slate-900 line-clamp-1 mb-1">
              {selectedMapIssue.title}
            </h3>

            <p className="text-xs text-slate-600 line-clamp-2 mb-3 leading-relaxed">
              {selectedMapIssue.description}
            </p>

            <div className="flex items-center justify-between text-xs text-slate-500 mb-3.5 bg-slate-50/90 p-2.5 rounded-2xl border border-slate-100">
              <div className="flex items-center gap-1.5 truncate max-w-[170px]">
                <MapPin className="w-3.5 h-3.5 text-[#dc2626] flex-shrink-0" />
                <span className="truncate font-medium">{selectedMapIssue.locationName}</span>
              </div>
              <StatusBadge status={selectedMapIssue.status} />
            </div>

            <div className="flex items-center justify-between gap-2.5 pt-1">
              <button
                id={`mapUpvoteBtn-${selectedMapIssue.id}`}
                onClick={() => upvoteIssue(selectedMapIssue.id)}
                className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 border transition-all active:scale-95 cursor-pointer ${selectedMapIssue.hasUpvoted
                    ? 'bg-red-50 text-[#dc2626] border-red-200'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                  }`}
                title={selectedMapIssue.hasUpvoted ? 'Remove support / like' : 'Support / like'}
              >
                <ThumbsUp
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${selectedMapIssue.hasUpvoted ? 'fill-[#dc2626] text-[#dc2626] scale-110' : ''
                    }`}
                />
                <span className="tabular-nums">
                  {Math.max(0, Number(selectedMapIssue.upvotes) || 0)}{' '}
                  {selectedMapIssue.hasUpvoted ? 'Endorsed' : 'Endorse'}
                </span>
              </button>

              <button
                onClick={() => openIssueDetail(selectedMapIssue.id)}
                className="flex-1 py-2 px-3 bg-[#003893] hover:bg-[#002b70] text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs transition-all cursor-pointer"
              >
                <span>Inspect Ticket</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
