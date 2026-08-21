import React, { useState } from 'react';
import {
  AlertTriangle,
  CheckCircle2,
  Clock,
  MapPin,
  Phone,
  RotateCw,
  Search,
  Shield,
  Upload,
  User,
  UserCheck,
  Wrench,
  Sparkles,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useApp } from '../../context/AppContext';
import { INITIAL_RESPONDERS } from '../../data/initialData';
import { StatusBadge } from '../common/StatusBadge';
import { SeverityBadge } from '../common/SeverityBadge';

export const ResponderPanel = () => {
  const { issues, updateIssueStatus, assignResponder, openIssueDetail } = useApp();

  const [activeTab, setActiveTab] = useState('all');
  const [searchFilter, setSearchFilter] = useState('');
  const [resolutionModalIssue, setResolutionModalIssue] = useState(null);
  const [resolutionNotes, setResolutionNotes] = useState('');
  const [resolutionPhoto, setResolutionPhoto] = useState(
    'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&auto=format&fit=crop&q=80'
  );

  const [selectedResponderId, setSelectedResponderId] = useState(INITIAL_RESPONDERS[0].id);

  const activeResponder =
    INITIAL_RESPONDERS.find((r) => r.id === selectedResponderId) || INITIAL_RESPONDERS[0];

  const pendingCount = issues.filter((i) => i.status === 'pending' || i.status === 'under_review').length;
  const assignedCount = issues.filter((i) => i.status === 'assigned').length;
  const inProgressCount = issues.filter((i) => i.status === 'in_progress').length;
  const resolvedCount = issues.filter((i) => i.status === 'resolved').length;

  const responderIssues = issues
    .filter((i) => {
      if (activeTab === 'pending') return i.status === 'pending' || i.status === 'under_review';
      if (activeTab === 'assigned') return i.status === 'assigned';
      if (activeTab === 'in_progress') return i.status === 'in_progress';
      if (activeTab === 'resolved') return i.status === 'resolved';
      return true;
    })
    .filter((i) => {
      if (!searchFilter.trim()) return true;
      const q = searchFilter.toLowerCase();
      return (
        i.title.toLowerCase().includes(q) ||
        i.trackingNumber.toLowerCase().includes(q) ||
        i.locationName.toLowerCase().includes(q) ||
        (i.reporterName && i.reporterName.toLowerCase().includes(q))
      );
    })
    .sort((a, b) => {
      const timeA = new Date(a.reportedAt || a.createdAt || 0).getTime();
      const timeB = new Date(b.reportedAt || b.createdAt || 0).getTime();
      return timeB - timeA;
    });

  const handleAssignToSelf = (issueId) => {
    assignResponder(issueId, activeResponder.id);
  };

  const handleStartWork = (issueId) => {
    updateIssueStatus(
      issueId,
      'in_progress',
      'Field team has arrived on site. Maintenance and cleanup initiated.'
    );
  };

  const handleCompleteResolution = (e) => {
    e.preventDefault();
    if (!resolutionModalIssue) return;

    updateIssueStatus(
      resolutionModalIssue.id,
      'resolved',
      resolutionNotes || 'Hazard cleared and verified by municipal crew.',
      resolutionPhoto
    );

    try {
      confetti({
        particleCount: 70,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#dc2626', '#003893', '#f59e0b', '#059669'],
      });
    } catch {
      // ignore
    }

    setResolutionModalIssue(null);
    setResolutionNotes('');
  };

  return (
    <div
      id="responderPanelView"
      className="max-w-5xl mx-auto pb-12 animate-in fade-in duration-300 space-y-6"
    >
      {/* Officer ID Banner & Category Officer Selector */}
      <div className="bg-gradient-to-r from-[#003893] via-[#1e3a8a] to-[#0f172a] text-white p-6 md:p-8 rounded-3xl shadow-md space-y-6 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#dc2626] via-[#f59e0b] to-[#dc2626]"></div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-5">
          <div className="flex items-center gap-4">
            <img
              src={activeResponder.avatar}
              alt={activeResponder.name}
              className="w-16 h-16 rounded-2xl object-cover border-2 border-white/40 shadow-sm ring-2 ring-blue-400/30"
            />
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-bold uppercase tracking-wider bg-white/15 px-2.5 py-0.5 rounded-full text-blue-100 border border-white/10">
                  {activeResponder.categoryName || 'Civic'} Specialist
                </span>
                <span className="text-xs text-emerald-400 font-bold flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  On Duty
                </span>
              </div>
              <h1 className="text-xl md:text-2xl font-black tracking-tight">
                {activeResponder.name}
              </h1>
              <p className="text-xs text-blue-200 mt-0.5">{activeResponder.department}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-white/10 backdrop-blur-xs p-3.5 rounded-2xl border border-white/15">
            <div className="text-center px-3 border-r border-white/20">
              <p className="text-lg font-black text-amber-300">
                {issues.filter((i) => i.status === 'in_progress').length}
              </p>
              <p className="text-[10px] text-blue-200 uppercase font-bold">In Progress</p>
            </div>
            <div className="text-center px-3 border-r border-white/20">
              <p className="text-lg font-black text-blue-200">
                {issues.filter((i) => i.status === 'assigned').length}
              </p>
              <p className="text-[10px] text-blue-200 uppercase font-bold">Assigned</p>
            </div>
            <div className="text-center px-3">
              <p className="text-lg font-black text-emerald-400">
                {issues.filter((i) => i.status === 'resolved').length}
              </p>
              <p className="text-[10px] text-blue-200 uppercase font-bold">Resolved</p>
            </div>
          </div>
        </div>

        {/* Category Officers Selector Row */}
        <div className="pt-4 border-t border-white/15">
          <p className="text-[11px] font-bold text-blue-200 uppercase tracking-wider mb-2.5">
            Switch Category Officer Desk:
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5">
            {INITIAL_RESPONDERS.map((officer) => {
              const isSelected = officer.id === activeResponder.id;
              return (
                <button
                  key={officer.id}
                  onClick={() => setSelectedResponderId(officer.id)}
                  className={`flex flex-col items-center p-2 rounded-2xl text-center transition-all cursor-pointer active:scale-95 ${
                    isSelected
                      ? 'bg-white text-[#003893] shadow-md ring-2 ring-white/60 font-bold'
                      : 'bg-white/10 hover:bg-white/20 border border-white/10 text-white'
                  }`}
                >
                  <img
                    src={officer.avatar}
                    alt={officer.name}
                    className={`w-9 h-9 rounded-xl object-cover mb-1 border ${
                      isSelected ? 'border-[#003893]' : 'border-white/30'
                    }`}
                  />
                  <span className="text-[11px] font-bold truncate w-full">{officer.name.split(' ')[0]}</span>
                  <span className={`text-[9px] truncate w-full ${isSelected ? 'text-[#003893]/70 font-semibold' : 'text-blue-200'}`}>
                    {officer.categoryName || officer.category}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Task Queue Tabs and Search */}
      <div className="bg-white p-4 rounded-3xl border border-slate-200/90 shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-1.5 overflow-x-auto customScrollbar pb-1 md:pb-0">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === 'all'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            All Reports ({issues.length})
          </button>
          <button
            onClick={() => setActiveTab('pending')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'pending'
                ? 'bg-[#dc2626] text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <span>Pending Review</span>
            <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono font-bold ${activeTab === 'pending' ? 'bg-white/20 text-white' : 'bg-red-100 text-red-700'}`}>
              {pendingCount}
            </span>
          </button>
          <button
            onClick={() => setActiveTab('assigned')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === 'assigned'
                ? 'bg-[#003893] text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Assigned ({assignedCount})
          </button>
          <button
            onClick={() => setActiveTab('in_progress')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === 'in_progress'
                ? 'bg-amber-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Active Field Work ({inProgressCount})
          </button>
          <button
            onClick={() => setActiveTab('resolved')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === 'resolved'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Resolved ({resolvedCount})
          </button>
        </div>

        <div className="relative w-full md:w-56">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search queue..."
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#003893]/20 text-slate-900"
          />
        </div>
      </div>

      {/* Responder Cards List */}
      <div className="space-y-4">
        {responderIssues.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200/90 shadow-xs">
            <CheckCircle2 className="w-12 h-12 text-slate-400 mx-auto mb-2" />
            <h3 className="text-base font-bold text-slate-900">
              No tickets found in this queue
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              {searchFilter ? 'Try clearing your search keyword.' : 'All grievances in this category are up to date.'}
            </p>
          </div>
        ) : (
          responderIssues.map((issue, index) => {
            const isRecent =
              issue.reportedAt &&
              (new Date().getTime() - new Date(issue.reportedAt).getTime() < 3600000 * 24 ||
                issue.timeline?.[0]?.timestamp === 'Just now');

            return (
              <div
                key={issue.id}
                className={`bg-white rounded-3xl border ${
                  isRecent && index === 0 ? 'border-red-200 ring-2 ring-red-100' : 'border-slate-200/90'
                } shadow-xs p-5 md:p-6 flex flex-col md:flex-row justify-between gap-5 hover:border-slate-300 transition-all`}
              >
                <div className="flex-1 space-y-3">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-mono text-xs font-bold text-[#003893] bg-blue-50 px-2 py-0.5 rounded-md border border-blue-100">
                      #{issue.trackingNumber}
                    </span>
                    {isRecent && index < 3 && (
                      <span className="bg-red-100 text-red-700 text-[9px] font-bold px-2 py-0.5 rounded-full uppercase flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse"></span>
                        NEW
                      </span>
                    )}
                    <SeverityBadge severity={issue.severity} />
                    <StatusBadge status={issue.status} />
                    {issue.assignedResponder && (
                      <span className="text-[10px] bg-slate-100 text-slate-700 font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1 border border-slate-200">
                        <UserCheck className="w-3 h-3 text-[#003893]" />
                        Assigned: {issue.assignedResponder.name}
                      </span>
                    )}
                  </div>

                  <div>
                    <h3
                      onClick={() => openIssueDetail(issue.id)}
                      className="text-base font-bold text-slate-900 hover:text-[#dc2626] cursor-pointer transition-colors"
                    >
                      {issue.title}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                      {issue.description}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-[#dc2626]" />
                      {issue.locationName} ({issue.ward})
                    </span>
                    <span className="flex items-center gap-1">
                      <User className="w-3.5 h-3.5" />
                      Reporter: {issue.reporterName}
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col justify-between gap-2.5 md:w-56 border-t md:border-t-0 md:border-l border-slate-100 pt-3 md:pt-0 md:pl-5">
                  {issue.reporterPhone && (
                    <a
                      href={`tel:${issue.reporterPhone}`}
                      className="w-full flex items-center justify-center gap-1.5 py-2 px-3 bg-slate-50 hover:bg-slate-100 text-slate-800 rounded-xl text-xs font-bold border border-slate-200 transition-colors"
                    >
                      <Phone className="w-3.5 h-3.5 text-[#dc2626]" />
                      <span>Call Citizen</span>
                    </a>
                  )}

                  {(issue.status === 'pending' || issue.status === 'under_review') && (
                    <button
                      onClick={() => handleAssignToSelf(issue.id)}
                      className="w-full py-2.5 px-3 bg-[#dc2626] hover:bg-[#b91c1c] text-white rounded-xl text-xs font-bold shadow-xs flex items-center justify-center gap-1.5 transition-all active:scale-95 cursor-pointer"
                    >
                      <UserCheck className="w-3.5 h-3.5" />
                      <span>Assign Field Team</span>
                    </button>
                  )}

                  {issue.status === 'assigned' && (
                    <button
                      onClick={() => handleStartWork(issue.id)}
                      className="w-full py-2.5 px-3 bg-[#003893] hover:bg-[#002b70] text-white rounded-xl text-xs font-bold shadow-xs flex items-center justify-center gap-1.5 transition-all active:scale-95 cursor-pointer"
                    >
                      <RotateCw className="w-3.5 h-3.5" />
                      <span>Start Field Work</span>
                    </button>
                  )}

                  {issue.status === 'in_progress' && (
                    <button
                      onClick={() => setResolutionModalIssue(issue)}
                      className="w-full py-2.5 px-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-xs flex items-center justify-center gap-1.5 transition-all active:scale-95 cursor-pointer"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Resolve Issue ✓</span>
                    </button>
                  )}

                  <button
                    onClick={() => openIssueDetail(issue.id)}
                    className="py-1 text-xs text-[#003893] hover:text-[#dc2626] font-bold text-center transition-colors cursor-pointer"
                  >
                    View Full History →
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Resolution Modal */}
      {resolutionModalIssue && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/50 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 md:p-8 shadow-2xl border border-slate-200 space-y-4 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-black text-slate-900">
                Submit Resolution Report
              </h3>
              <button
                onClick={() => setResolutionModalIssue(null)}
                className="text-slate-400 hover:bg-slate-100 p-1.5 rounded-full text-sm cursor-pointer"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-slate-500">
              Marking ticket <strong className="text-[#003893]">#{resolutionModalIssue.trackingNumber}</strong> (
              {resolutionModalIssue.title}) as officially resolved.
            </p>

            <form onSubmit={handleCompleteResolution} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-900 mb-1">
                  Resolution Notes & Actions Taken *
                </label>
                <textarea
                  required
                  rows={3}
                  value={resolutionNotes}
                  onChange={(e) => setResolutionNotes(e.target.value)}
                  placeholder="e.g. Cleared 2 tons of waste, sanitized area with bleaching powder, and coordinated with local school."
                  className="w-full p-3.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#003893]/20 text-slate-900 placeholder:text-slate-400 font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-900 mb-1">
                  Post-Resolution Proof Photo URL
                </label>
                <input
                  type="url"
                  value={resolutionPhoto}
                  onChange={(e) => setResolutionPhoto(e.target.value)}
                  className="w-full p-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#003893]/20 text-slate-900 font-medium"
                />
                <div className="mt-2 h-32 rounded-2xl overflow-hidden border border-slate-200">
                  <img
                    src={resolutionPhoto}
                    alt="Resolved evidence"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={() => setResolutionModalIssue(null)}
                  className="px-5 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-100 rounded-xl border border-slate-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-emerald-600 text-white text-xs font-bold rounded-xl shadow-xs hover:bg-emerald-700 cursor-pointer"
                >
                  Confirm Resolution
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
