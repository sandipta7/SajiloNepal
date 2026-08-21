import React, { useState } from 'react';
import {
  ArrowLeft,
  Calendar,
  CheckCircle2,
  Clock,
  ExternalLink,
  MapPin,
  MessageSquare,
  Phone,
  Send,
  Share2,
  Shield,
  ThumbsUp,
  RotateCw,
  UserCheck,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useApp } from '../../context/AppContext';
import { INITIAL_RESPONDERS } from '../../data/initialData';
import { StatusBadge } from '../common/StatusBadge';
import { SeverityBadge } from '../common/SeverityBadge';
import { ImpactBar } from '../common/ImpactBar';
import { formatRelativeTime } from '../../utils/formatters';

export const IssueDetail = ({ onBack }) => {
  const {
    selectedIssue,
    setCurrentView,
    upvoteIssue,
    updateIssueStatus,
    assignResponder,
    currentRole,
    portal,
    adminUser,
  } = useApp();

  const [newStatusNote, setNewStatusNote] = useState('');
  const [isCopied, setIsCopied] = useState(false);

  const isAdminOrResponder = portal === 'admin';
  const showAssignedResponder = !!selectedIssue?.assignedResponder || isAdminOrResponder;
  const hasRightCol = showAssignedResponder || isAdminOrResponder;

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      setCurrentView('dashboard');
    }
  };

  if (!selectedIssue) {
    return (
      <div className="p-12 text-center">
        <p className="text-sm text-[#75777f]">No issue selected.</p>
        <button
          onClick={handleBack}
          className="mt-4 px-4 py-2 bg-[#031635] text-white rounded-xl text-xs font-semibold"
        >
          Return Back
        </button>
      </div>
    );
  }

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(
        `${window.location.origin}#ticket-${selectedIssue.trackingNumber}`
      );
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  const handleApplyStatusChange = (status) => {
    updateIssueStatus(
      selectedIssue.id,
      status,
      newStatusNote || `Official update by ${currentRole}.`
    );
    if (status === 'resolved') {
      try {
        confetti({
          particleCount: 60,
          spread: 60,
          origin: { y: 0.7 },
        });
      } catch {
        // ignore
      }
    }
    setNewStatusNote('');
  };

  return (
    <div
      id="issueDetailView"
      className="max-w-5xl mx-auto pb-12 animate-in fade-in duration-300"
    >
      {/* Top Bar Navigation */}
      <div className="flex items-center justify-between gap-4 mb-6">
        <button
          id="backToReportsBtn"
          onClick={handleBack}
          className="flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-medium text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 shadow-xs transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            id="shareIssueBtn"
            onClick={handleShare}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 shadow-xs transition-all"
          >
            <Share2 className="w-4 h-4" />
            <span>{isCopied ? 'Link Copied!' : 'Share Ticket'}</span>
          </button>

          <button
            id="upvoteDetailBtn"
            onClick={() => upvoteIssue(selectedIssue.id)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-medium transition-all shadow-xs ${
              selectedIssue.hasUpvoted
                ? 'bg-red-50 text-[#dc2626] border border-red-200'
                : 'bg-[#dc2626] text-white hover:bg-[#b91c1c]'
            }`}
          >
            <ThumbsUp className="w-4 h-4" />
            <span>
              {Math.max(0, Number(selectedIssue.upvotes) || 0)}{' '}
              {selectedIssue.hasUpvoted ? 'Upvoted' : 'Support Issue'}
            </span>
          </button>
        </div>
      </div>

      {/* Main Issue Header Card */}
      <div
        id="issueHeaderCard"
        className="bg-white rounded-xl p-6 md:p-8 border border-slate-200 shadow-xs mb-6"
      >
        <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-2.5">
            <span className="font-mono text-xs font-semibold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-md">
              #{selectedIssue.trackingNumber}
            </span>
            <SeverityBadge severity={selectedIssue.severity} />
            <StatusBadge status={selectedIssue.status} />
          </div>

          <div className="text-xs text-slate-500 flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" />
            <span>Reported {formatRelativeTime(selectedIssue.reportedAt)}</span>
          </div>
        </div>

        <h1 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight mb-2">
          {selectedIssue.title}
        </h1>

        <div className="flex items-center gap-2 text-xs md:text-sm font-medium text-slate-500 mb-6">
          <MapPin className="w-4 h-4 text-[#dc2626] flex-shrink-0" />
          <span>
            {selectedIssue.locationName} • {selectedIssue.ward} •{' '}
            {selectedIssue.municipality}
          </span>
        </div>

        {/* Hero Photo Banner */}
        {selectedIssue.images && selectedIssue.images.length > 0 && (
          <div className="relative rounded-lg overflow-hidden max-h-[380px] w-full border border-slate-200 shadow-inner">
            <img
              src={selectedIssue.images[0]}
              alt={selectedIssue.title}
              className="w-full h-full object-cover max-h-[380px]"
            />
            <div className="absolute bottom-3 left-3 bg-slate-950/70 backdrop-blur-md text-white text-xs px-3 py-1.5 rounded-md flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-red-400" />
              <span>Verified Photo Evidence • Geo-tagged</span>
            </div>
          </div>
        )}
      </div>

      {/* Split Grid: Timeline & Impact vs. Responder & Authority Controls */}
      <div className={`grid grid-cols-1 ${hasRightCol ? 'lg:grid-cols-3' : 'lg:grid-cols-1'} gap-6`}>
        {/* Left Column: Resolution Progress & Issue Description */}
        <div className={`${hasRightCol ? 'lg:col-span-2' : 'lg:col-span-1'} space-y-6`}>
          {/* Civic Resolution Progress Timeline */}
          <div
            id="resolutionTimelineCard"
            className="bg-white p-6 md:p-8 rounded-xl border border-slate-200 shadow-xs"
          >
            <h2 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
              <RotateCw className="w-5 h-5 text-[#dc2626]" />
              <span>Resolution Progress Tracker</span>
            </h2>

            {/* Stepper Timeline */}
            <div className="relative pl-6 space-y-8 before:absolute before:left-2.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-slate-200">
              {selectedIssue.timeline.map((item, idx) => {
                return (
                  <div
                    key={idx}
                    className="relative flex items-start justify-between gap-4"
                  >
                    {/* Circle marker */}
                    <div
                      className={`absolute -left-6 top-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                        item.isCompleted
                          ? 'bg-[#dc2626] text-white shadow-xs'
                          : item.isCurrent
                          ? 'bg-amber-500 text-white ring-4 ring-amber-100'
                          : 'bg-slate-100 text-slate-400 border border-slate-200'
                      }`}
                    >
                      {item.isCompleted ? (
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      ) : (
                        idx + 1
                      )}
                    </div>

                    {/* Step details */}
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4
                          className={`text-sm font-semibold ${
                            item.isCompleted || item.isCurrent
                              ? 'text-slate-900'
                              : 'text-slate-500'
                          }`}
                        >
                          {item.label}
                        </h4>
                        {item.timestamp && (
                          <span className="text-[11px] text-slate-400">
                            {item.timestamp}
                          </span>
                        )}
                      </div>
                      {item.notes && (
                        <p className="text-xs text-slate-600 mt-1 bg-slate-50 p-2.5 rounded-lg border border-slate-100 leading-relaxed">
                          {item.notes}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Description & Impact Metrics Card */}
          <div
            id="issueDescriptionCard"
            className="bg-white p-6 md:p-8 rounded-xl border border-slate-200 shadow-xs space-y-6"
          >
            <div>
              <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                Citizen Statement & Hazard Description
              </h3>
              <p className="text-sm text-slate-800 leading-relaxed">
                {selectedIssue.description}
              </p>
            </div>

            {/* Impact Metric & Civic Priority */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="text-xs font-semibold text-slate-900 uppercase tracking-wider">
                  Civic Impact Score
                </span>
                <p className="text-[11px] text-slate-500">
                  Calculated based on traffic density, school proximity, and
                  citizen upvotes.
                </p>
              </div>
              <ImpactBar score={selectedIssue.impactScore} />
            </div>

            {/* Resolution Verification (if resolved) */}
            {selectedIssue.status === 'resolved' && (
              <div className="bg-emerald-50/70 border border-emerald-200 p-4 rounded-xl space-y-2">
                <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <span>Officially Resolved & Verified</span>
                </div>
                {selectedIssue.resolutionNotes && (
                  <p className="text-xs text-slate-800">
                    <strong>Resolution Note:</strong>{' '}
                    {selectedIssue.resolutionNotes}
                  </p>
                )}
                {selectedIssue.resolutionPhoto && (
                  <div className="mt-2 rounded-lg overflow-hidden h-36 border border-emerald-200">
                    <img
                      src={selectedIssue.resolutionPhoto}
                      alt="Resolution proof"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Responder Info & Admin Tools (Shown when assigned or in admin mode) */}
        {hasRightCol && (
          <div className="space-y-6">
            {/* Assigned Field Responder or Dedicated Category Officer Assignment */}
            {selectedIssue.assignedResponder ? (
              <div
                id="assignedResponderCard"
                className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-4"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    Assigned Field Officer
                  </h3>
                  {selectedIssue.assignedResponder.badge && (
                    <span className="text-[10px] bg-red-50 text-[#dc2626] font-bold px-2 py-0.5 rounded border border-red-200">
                      {selectedIssue.assignedResponder.badge}
                    </span>
                  )}
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={selectedIssue.assignedResponder.avatar}
                      alt={selectedIssue.assignedResponder.name}
                      className="w-14 h-14 rounded-full object-cover border-2 border-[#dc2626]/30 shadow-xs ring-2 ring-slate-100"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-bold text-slate-900 truncate">
                        {selectedIssue.assignedResponder.name}
                      </h4>
                      <p className="text-[11px] font-medium text-[#dc2626]">
                        {selectedIssue.assignedResponder.role}
                      </p>
                      <p className="text-[10px] text-slate-500 leading-tight truncate">
                        {selectedIssue.assignedResponder.department}
                      </p>
                    </div>
                  </div>

                  <div className="bg-slate-50 p-3 rounded-lg flex items-center justify-between text-xs font-medium text-slate-800 border border-slate-100">
                    <span className="text-slate-600">Active Tasks: <strong className="text-slate-900">{selectedIssue.assignedResponder.activeTasksCount || 3}</strong></span>
                    <span className="text-slate-600">Resolved: <strong className="text-emerald-700">{selectedIssue.assignedResponder.completedTasksCount || 42}</strong></span>
                  </div>

                  <a
                    href={`tel:${selectedIssue.assignedResponder.phone}`}
                    className="w-full flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-800 py-2.5 rounded-lg font-medium text-xs transition-colors border border-slate-200"
                  >
                    <Phone className="w-3.5 h-3.5 text-[#dc2626]" />
                    <span>Direct Call ({selectedIssue.assignedResponder.phone})</span>
                  </a>

                  {isAdminOrResponder && (
                    <div className="pt-2 border-t border-slate-100">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
                        Reassign to Department Officer:
                      </label>
                      <select
                        value={selectedIssue.assignedResponder.id}
                        onChange={(e) => assignResponder(selectedIssue.id, e.target.value)}
                        className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 font-medium text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#dc2626]"
                      >
                        {INITIAL_RESPONDERS.map((r) => (
                          <option key={r.id} value={r.id}>
                            {r.name} ({r.categoryName || r.role})
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>
              </div>
            ) : isAdminOrResponder ? (
              (() => {
                const defaultOfficer =
                  INITIAL_RESPONDERS.find((r) => r.category === selectedIssue.category) ||
                  INITIAL_RESPONDERS[0];

                return (
                  <div
                    id="assignedResponderCard"
                    className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-4"
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                        Designated Category Officer
                      </h3>
                      <span className="text-[10px] bg-amber-50 text-amber-700 font-bold px-2 py-0.5 rounded border border-amber-200">
                        Pending Dispatch
                      </span>
                    </div>

                    <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
                      <img
                        src={defaultOfficer.avatar}
                        alt={defaultOfficer.name}
                        className="w-12 h-12 rounded-full object-cover border-2 border-slate-200 shadow-xs"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-[10px] font-semibold text-[#dc2626] uppercase">
                          {defaultOfficer.categoryName || selectedIssue.category} Lead
                        </p>
                        <h4 className="text-xs font-bold text-slate-900 truncate">
                          {defaultOfficer.name}
                        </h4>
                        <p className="text-[10px] text-slate-500 truncate">
                          {defaultOfficer.department}
                        </p>
                      </div>
                    </div>

                    <p className="text-xs text-slate-500">
                      Dispatch the official lead assigned to handle <strong>{selectedIssue.category}</strong> problems.
                    </p>

                    <button
                      onClick={() => assignResponder(selectedIssue.id, defaultOfficer.id)}
                      className="w-full py-2.5 bg-[#dc2626] hover:bg-[#b91c1c] text-white rounded-lg text-xs font-bold flex items-center justify-center gap-2 shadow-xs transition-colors"
                    >
                      <UserCheck className="w-4 h-4" />
                      <span>Dispatch {defaultOfficer.name}</span>
                    </button>

                    <div className="pt-2 border-t border-slate-100">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
                        Or Select Other Officer:
                      </label>
                      <select
                        defaultValue=""
                        onChange={(e) => {
                          if (e.target.value) assignResponder(selectedIssue.id, e.target.value);
                        }}
                        className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 font-medium text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#dc2626]"
                      >
                        <option value="" disabled>Choose Officer from Roster...</option>
                        {INITIAL_RESPONDERS.map((r) => (
                          <option key={r.id} value={r.id}>
                            {r.name} — {r.categoryName || r.role} ({r.department.split(' ')[0]})
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                );
              })()
            ) : null}

            {/* Municipal Field Controls (For Responder or Ward Admin only) */}
            {isAdminOrResponder && (
              <div
                id="municipalActionCard"
                className="bg-slate-50 p-6 rounded-xl border border-slate-200 shadow-xs space-y-4"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-semibold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                    <Shield className="w-4 h-4 text-[#dc2626]" />
                    <span>Authority Controls</span>
                  </h3>
                  <span className="text-[10px] bg-white border border-slate-200 px-2 py-0.5 rounded font-semibold uppercase text-slate-600">
                    {currentRole}
                  </span>
                </div>

                <div className="space-y-2">
                  <p className="text-xs text-slate-600">
                    Update progress status of this civic ticket:
                  </p>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => handleApplyStatusChange('in_progress')}
                      className="py-2 px-3 bg-white hover:bg-amber-50 border border-slate-200 text-amber-900 font-medium text-xs rounded-lg transition-all shadow-2xs"
                    >
                      Mark In Progress
                    </button>
                    <button
                      onClick={() => handleApplyStatusChange('resolved')}
                      className="py-2 px-3 bg-[#dc2626] hover:bg-[#b91c1c] text-white font-medium text-xs rounded-lg transition-all shadow-2xs"
                    >
                      Mark Resolved ✓
                    </button>
                  </div>
                </div>

                {/* Quick Status Note input */}
                <div>
                  <input
                    type="text"
                    placeholder="Add official progress update note..."
                    value={newStatusNote}
                    onChange={(e) => setNewStatusNote(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#dc2626] text-slate-900 placeholder:text-slate-400"
                  />
                </div>
              </div>
            )}

            {/* Activity Logs & Audit History (Admin Portal only) */}
            {isAdminOrResponder && (
              <div
                id="activityLogsCard"
                className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-3"
              >
                <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Activity & Audit Trail
                </h3>

                <div className="divide-y divide-slate-100 max-h-60 overflow-y-auto customScrollbar">
                  {selectedIssue.activityLogs.map((log) => (
                    <div key={log.id} className="py-2.5 space-y-1">
                      <div className="flex items-center justify-between">
                        <p className="text-xs font-bold text-slate-900">
                          {log.title}
                        </p>
                        <span className="text-[10px] text-slate-400">
                          {log.timestamp}
                        </span>
                      </div>
                      {log.details && (
                        <p className="text-[11px] text-slate-500 leading-tight">
                          {log.details}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
