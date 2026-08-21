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
  const [sortBy, setSortBy] = useState('likes_asc');

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
          issue.locationName.toLowerCase().includes(q);
        if (!match) return false;
      }
      return true;
    })
    .sort((a, b) => {
      const votesA = Math.max(0, Number(a.upvotes) || 0);
      const votesB = Math.max(0, Number(b.upvotes) || 0);
      if (sortBy === 'likes_asc') {
        return votesA - votesB;
      }
      if (sortBy === 'likes_desc') {
        return votesB - votesA;
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
    <div id="myReportsView" className="max-w-6xl mx-auto pb-12 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-[#dc2626] uppercase tracking-wider mb-1">
            <History className="w-4 h-4 text-[#dc2626]" />
            <span>Civic Issue Registry</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">
            Community Reports
          </h1>
          <p className="text-xs md:text-sm text-slate-500 mt-0.5">
            Showing all public grievances submitted and tracked across Kathmandu Valley.
          </p>
        </div>

        <button
          onClick={() => setCurrentView('report-issue')}
          className="bg-[#dc2626] text-white px-4 py-2 rounded-lg font-medium text-xs md:text-sm shadow-sm hover:bg-[#b91c1c] active:scale-[0.98] transition-all flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Report Issue</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs mb-6 space-y-4">
        {/* Status Tabs */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3">
          <div className="flex items-center gap-1.5 overflow-x-auto customScrollbar">
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
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                  statusTab === tab.id
                    ? 'bg-[#dc2626] text-white shadow-xs'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search reports or tracking ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#dc2626] text-slate-900 placeholder:text-slate-400"
            />
          </div>
        </div>

        {/* Category Pills & Sort Bar */}
        <div className="flex flex-wrap items-center justify-between gap-2.5 pt-1">
          <div className="flex items-center gap-1.5 overflow-x-auto customScrollbar pb-1">
            <button
              onClick={() => setSelectedCategoryFilter('all')}
              className={`px-3 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                selectedCategoryFilter === 'all'
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              All Categories
            </button>
            {CATEGORIES_DATA.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategoryFilter(cat.id)}
                className={`px-3 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                  selectedCategoryFilter === cat.id
                    ? 'bg-slate-900 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-1.5 ml-auto">
            <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-xs text-slate-500 font-medium whitespace-nowrap">
              Sort:
            </span>
            <select
              id="sortReportsDropdown"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="text-xs bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1 text-slate-800 font-medium focus:outline-none focus:ring-1 focus:ring-[#dc2626]"
            >
              <option value="likes_asc">Likes: Low to High (Increasing)</option>
              <option value="likes_desc">Likes: High to Low (Decreasing)</option>
              <option value="newest">Newest First</option>
              <option value="priority">Highest Impact Score</option>
            </select>
          </div>
        </div>
      </div>

      {/* Reports Grid List */}
      {filteredIssues.length === 0 ? (
        <div className="bg-white rounded-xl p-12 text-center border border-slate-200 shadow-xs space-y-3">
          <Layers className="w-10 h-10 text-slate-400 mx-auto" />
          <h3 className="text-base font-bold text-slate-900">
            No reports found matching your criteria
          </h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Try adjusting your search or category filters, or submit a new
            infrastructure problem.
          </p>
          <button
            onClick={() => setCurrentView('report-issue')}
            className="mt-2 px-4 py-2 bg-[#dc2626] text-white rounded-lg text-xs font-medium hover:bg-[#b91c1c]"
          >
            Report an Issue
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredIssues.map((issue) => (
            <div
              key={issue.id}
              id={`reportCard-${issue.id}`}
              onClick={() => openIssueDetail(issue.id)}
              className="bg-white rounded-xl border border-slate-200 shadow-xs hover:shadow-md transition-all p-5 flex flex-col justify-between cursor-pointer group hover:border-slate-300"
            >
              <div>
                {/* Header Tag Bar */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="font-mono text-[11px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                    #{issue.trackingNumber}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <SeverityBadge severity={issue.severity} />
                    <StatusBadge status={issue.status} />
                  </div>
                </div>

                {/* Photo Thumbnail if present */}
                {issue.images && issue.images.length > 0 && (
                  <div className="h-36 rounded-lg overflow-hidden mb-3 bg-slate-100 border border-slate-100">
                    <img
                      src={issue.images[0]}
                      alt={issue.title}
                      className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
                    />
                  </div>
                )}

                <h3 className="text-sm md:text-base font-bold text-slate-900 group-hover:text-[#dc2626] line-clamp-1 mb-1 transition-colors">
                  {issue.title}
                </h3>

                <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed mb-3">
                  {issue.description}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 space-y-2.5">
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <div className="flex items-center gap-1 truncate">
                    <MapPin className="w-3.5 h-3.5 text-[#dc2626] flex-shrink-0" />
                    <span className="truncate">{issue.locationName}</span>
                  </div>
                  <span>{formatRelativeTime(issue.reportedAt)}</span>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      upvoteIssue(issue.id);
                    }}
                    className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium border transition-all ${
                      issue.hasUpvoted
                        ? 'bg-red-50 text-[#dc2626] border-red-200'
                        : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <ThumbsUp className="w-3.5 h-3.5" />
                    <span>{Math.max(0, Number(issue.upvotes) || 0)}</span>
                  </button>

                  <span className="text-xs font-semibold text-[#dc2626] flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                    <span>View Ticket</span>
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
