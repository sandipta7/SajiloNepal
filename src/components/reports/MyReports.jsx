import React, { useState } from 'react';
import {
  Filter,
  History,
  MapPin,
  Plus,
  Search,
  ThumbsUp,
  Layers,
  ArrowRight,
  ArrowUpDown,
  X,
  Sparkles,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { CATEGORIES_DATA } from '../../data/initialData';
import { StatusBadge } from '../common/StatusBadge';
import { SeverityBadge } from '../common/SeverityBadge';
import { formatRelativeTime } from '../../utils/formatters';

export const MyReports = () => {
  const {
    issues,
    openIssueDetail,
    setCurrentView,
    upvoteIssue,
    selectedCategoryFilter,
    setSelectedCategoryFilter,
  } = useApp();

  const [statusTab, setStatusTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('newest');

  const filteredIssues = issues
    .filter((issue) => {
      if (
        selectedCategoryFilter !== 'all' &&
        issue.category !== selectedCategoryFilter
      ) {
        return false;
      }
      if (
        statusTab === 'pending' &&
        issue.status !== 'pending' &&
        issue.status !== 'under_review'
      ) {
        return false;
      }
      if (
        statusTab === 'in_progress' &&
        issue.status !== 'in_progress' &&
        issue.status !== 'assigned'
      ) {
        return false;
      }
      if (statusTab === 'resolved' && issue.status !== 'resolved') {
        return false;
      }
      if (searchTerm) {
        const q = searchTerm.toLowerCase();
        const match =
          issue.title.toLowerCase().includes(q) ||
          issue.trackingNumber.toLowerCase().includes(q) ||
          issue.locationName.toLowerCase().includes(q) ||
          (issue.ward && issue.ward.toLowerCase().includes(q));
        if (!match) return false;
      }
      return true;
    })
    .sort((a, b) => {
      const votesA = Math.max(0, Number(a.upvotes) || 0);
      const votesB = Math.max(0, Number(b.upvotes) || 0);
      if (sortBy === 'likes_desc') {
        return votesB - votesA;
      }
      if (sortBy === 'likes_asc') {
        return votesA - votesB;
      }
      if (sortBy === 'priority') {
        return (b.impactScore || 0) - (a.impactScore || 0);
      }
      // default newest
      const timeA = new Date(a.reportedAt || a.createdAt || 0).getTime();
      const timeB = new Date(b.reportedAt || b.createdAt || 0).getTime();
      return timeB - timeA;
    });

  return (
    <div id="myReportsView" className="max-w-6xl mx-auto pb-12 animate-in fade-in duration-300 space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 md:p-8 rounded-3xl border border-slate-200/90 shadow-xs relative overflow-hidden nepal-gradient-subtle">
        <div className="absolute top-0 left-0 right-0 h-1 nepal-gradient-line"></div>
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#dc2626] uppercase tracking-wider mb-1">
            <History className="w-4 h-4 text-[#dc2626]" />
            <span>Civic Issue Registry • सार्वजनिक उजुरीहरू</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
            Community Reports
          </h1>
          <p className="text-xs md:text-sm text-slate-500 mt-1">
            Browse, endorse, and track public municipal grievances across Kathmandu Valley.
          </p>
        </div>

        <button
          onClick={() => setCurrentView('report-issue')}
          className="bg-[#dc2626] text-white px-5 py-2.5 rounded-2xl font-bold text-xs md:text-sm shadow-md shadow-red-950/15 hover:bg-[#b91c1c] active:scale-[0.98] transition-all flex items-center gap-2"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span>Report Issue</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-5 rounded-3xl border border-slate-200/90 shadow-xs space-y-4">
        {/* Status Tabs */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3">
          <div className="flex items-center gap-1.5 overflow-x-auto customScrollbar max-w-full">
            {[
              { id: 'all', label: `All Reports (${issues.length})` },
              {
                id: 'pending',
                label: `Pending (${
                  issues.filter(
                    (i) => i.status === 'pending' || i.status === 'under_review'
                  ).length
                })`,
              },
              {
                id: 'in_progress',
                label: `In Progress (${
                  issues.filter(
                    (i) =>
                      i.status === 'in_progress' || i.status === 'assigned'
                  ).length
                })`,
              },
              {
                id: 'resolved',
                label: `Resolved (${
                  issues.filter((i) => i.status === 'resolved').length
                })`,
              },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setStatusTab(tab.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap active:scale-95 ${
                  statusTab === tab.id
                    ? 'bg-[#003893] text-white shadow-xs'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by title, ward, tracking #..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-8 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#003893]/20 focus:border-[#003893] text-slate-900 placeholder:text-slate-400"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Category Pills & Sort Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
          <div className="flex items-center gap-1.5 overflow-x-auto customScrollbar pb-1 max-w-full">
            <button
              onClick={() => setSelectedCategoryFilter('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                selectedCategoryFilter === 'all'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-slate-100/90 text-slate-600 hover:bg-slate-200'
              }`}
            >
              All Categories
            </button>
            {CATEGORIES_DATA.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategoryFilter(cat.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  selectedCategoryFilter === cat.id
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-slate-100/90 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-2 ml-auto">
            <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-xs text-slate-500 font-bold whitespace-nowrap">
              Sort:
            </span>
            <select
              id="sortReportsDropdown"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-slate-800 font-bold focus:outline-none focus:ring-2 focus:ring-[#003893]/20"
            >
              <option value="newest">Newest First</option>
              <option value="likes_desc">Most Supported (Likes: High to Low)</option>
              <option value="likes_asc">Least Supported (Likes: Low to High)</option>
              <option value="priority">Highest Impact Score</option>
            </select>
          </div>
        </div>
      </div>

      {/* Reports Grid List */}
      {filteredIssues.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200/90 shadow-xs space-y-3">
          <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
            <Layers className="w-8 h-8" />
          </div>
          <h3 className="text-base font-bold text-slate-900">
            No civic reports found matching your criteria
          </h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Try adjusting your search query, status, or category filter.
          </p>
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedCategoryFilter('all');
              setStatusTab('all');
            }}
            className="mt-2 px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredIssues.map((issue) => (
            <div
              key={issue.id}
              id={`reportCard-${issue.id}`}
              onClick={() => openIssueDetail(issue.id)}
              className="bg-white rounded-3xl border border-slate-200/90 shadow-xs hover:border-slate-300 hover:shadow-md transition-all duration-200 p-5 flex flex-col justify-between cursor-pointer group select-none relative overflow-hidden"
            >
              <div>
                {/* Header Tag Bar */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="font-mono text-[11px] font-bold text-[#003893] bg-blue-50 px-2 py-0.5 rounded-md border border-blue-100">
                    #{issue.trackingNumber}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <SeverityBadge severity={issue.severity} />
                    <StatusBadge status={issue.status} />
                  </div>
                </div>

                {/* Photo Thumbnail if present */}
                {issue.images && issue.images.length > 0 && (
                  <div className="h-40 rounded-2xl overflow-hidden mb-3 bg-slate-100 border border-slate-100 relative">
                    <img
                      src={issue.images[0]}
                      alt={issue.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-2 left-2 bg-black/60 backdrop-blur-xs text-white text-[9px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider">
                      {issue.category}
                    </div>
                  </div>
                )}

                <h3 className="text-sm md:text-base font-bold text-slate-900 group-hover:text-[#dc2626] line-clamp-1 mb-1.5 transition-colors">
                  {issue.title}
                </h3>

                <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed mb-3">
                  {issue.description}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <div className="flex items-center gap-1 truncate max-w-[170px]">
                    <MapPin className="w-3.5 h-3.5 text-[#dc2626] flex-shrink-0" />
                    <span className="truncate font-medium">{issue.locationName}</span>
                  </div>
                  <span className="text-[11px] text-slate-400">{formatRelativeTime(issue.reportedAt)}</span>
                </div>

                <div className="flex items-center justify-between pt-0.5">
                  <button
                    id={`likeBtn-${issue.id}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      upvoteIssue(issue.id);
                    }}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border transition-all active:scale-95 ${
                      issue.hasUpvoted
                        ? 'bg-red-50 text-[#dc2626] border-red-200 shadow-2xs'
                        : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50 hover:border-slate-300'
                    }`}
                    title={issue.hasUpvoted ? 'Remove support / like' : 'Support / like this report'}
                  >
                    <ThumbsUp
                      className={`w-3.5 h-3.5 transition-transform duration-200 ${
                        issue.hasUpvoted ? 'fill-[#dc2626] text-[#dc2626] scale-110' : ''
                      }`}
                    />
                    <span className="tabular-nums">{Math.max(0, Number(issue.upvotes) || 0)}</span>
                  </button>

                  <span className="text-xs font-bold text-[#003893] group-hover:text-[#dc2626] flex items-center gap-1 group-hover:translate-x-0.5 transition-all">
                    <span>Inspect</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
