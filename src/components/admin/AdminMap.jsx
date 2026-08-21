import React, { useState } from 'react';
import {
  Search,
  Filter,
  Layers,
  MapPin,
  Shield,
  Clock,
  CheckCircle2,
  X,
  Phone,
  RotateCw,
  Eye,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { CATEGORIES_DATA } from '../../data/initialData';
import { MapLeaflet } from '../map/MapLeaflet';
import { StatusBadge } from '../common/StatusBadge';
import { SeverityBadge } from '../common/SeverityBadge';

export const AdminMap = () => {
  const { issues, openIssueDetail, updateIssueStatus, setSelectedIssueId } = useApp();
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [selectedMapIssue, setSelectedMapIssue] = useState(issues[0] || null);

  const filteredIssues = issues.filter((issue) => {
    if (categoryFilter !== 'all' && issue.category !== categoryFilter) return false;
    if (statusFilter !== 'all' && issue.status !== statusFilter) return false;
    if (search) {
      const q = search.toLowerCase();
      return (
        issue.title.toLowerCase().includes(q) ||
        issue.locationName.toLowerCase().includes(q) ||
        issue.trackingNumber.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handleSelectIssue = (issue) => {
    setSelectedMapIssue(issue);
    setSelectedIssueId(issue.id);
  };

  return (
    <div id="adminTacticalMapView" className="flex flex-col h-[calc(100vh-112px)] relative space-y-3">
      {/* Top Filter Bar */}
      <div className="bg-white p-3 rounded-xl shadow-xs border border-slate-200 flex flex-wrap items-center justify-between gap-3 z-20">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 bg-slate-900 text-white text-xs font-bold px-2.5 py-1 rounded-lg">
            <Shield className="w-3.5 h-3.5 text-red-500" />
            <span>GIS Triage Map</span>
          </div>

          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="text-xs bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1 font-semibold text-slate-800 focus:outline-none focus:ring-1 focus:ring-red-500"
          >
            <option value="all">All Incident Categories</option>
            {CATEGORIES_DATA.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="text-xs bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1 font-semibold text-slate-800 focus:outline-none focus:ring-1 focus:ring-red-500"
          >
            <option value="all">All Response Statuses</option>
            <option value="pending">Pending Review</option>
            <option value="assigned">Assigned to Officer</option>
            <option value="in_progress">Field Work In Progress</option>
            <option value="resolved">Resolved</option>
          </select>
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Filter map by ward, street..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-8 pr-3 py-1 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-red-500 text-slate-900"
          />
        </div>
      </div>

      {/* Main Map Container */}
      <div className="flex-1 relative rounded-xl overflow-hidden shadow-xs border border-slate-200">
        <MapLeaflet
          issues={filteredIssues}
          onSelectIssue={handleSelectIssue}
          selectedIssueId={selectedMapIssue?.id}
        />

        {/* Selected Incident Drawer/Card */}
        {selectedMapIssue && (
          <div className="absolute bottom-4 left-4 right-4 md:right-auto md:w-96 bg-white/95 backdrop-blur-md rounded-xl p-4 shadow-xl border border-slate-200 z-30 space-y-2.5 animate-in slide-in-from-bottom-3 duration-200">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded">
                  #{selectedMapIssue.trackingNumber}
                </span>
                <SeverityBadge severity={selectedMapIssue.severity} />
                <StatusBadge status={selectedMapIssue.status} />
              </div>
              <button
                onClick={() => setSelectedMapIssue(null)}
                className="text-slate-400 hover:bg-slate-100 p-1 rounded-md"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <h3 className="text-sm font-bold text-slate-900 line-clamp-1">
              {selectedMapIssue.title}
            </h3>

            <p className="text-xs text-slate-600 line-clamp-2">
              {selectedMapIssue.description}
            </p>

            <div className="text-xs text-slate-500 bg-slate-50 p-2 rounded-lg border border-slate-100 space-y-1">
              <div className="flex items-center gap-1.5 truncate">
                <MapPin className="w-3.5 h-3.5 text-[#dc2626]" />
                <span className="truncate">{selectedMapIssue.locationName} ({selectedMapIssue.ward})</span>
              </div>
              <div className="flex justify-between items-center text-[11px]">
                <span>Reporter: {selectedMapIssue.reporterName}</span>
                <span className="font-semibold text-red-600">Impact Score: {selectedMapIssue.impactScore}/100</span>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-1">
              <button
                onClick={() => openIssueDetail(selectedMapIssue.id)}
                className="flex-1 py-1.5 px-3 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 shadow-xs"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Open Ticket</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
