import React from 'react';
import { History, ArrowRight, ThumbsUp, Clock } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { StatusBadge } from '../common/StatusBadge';
import { formatRelativeTime } from '../../utils/formatters';

export const RecentReportsList = () => {
  const { issues, setCurrentView, openIssueDetail } = useApp();

  // Get most recent 3-4 issues
  const recentReports = [...issues].slice(0, 3);

  return (
    <section id="recentReportsSection" className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-blue-50 text-[#003893] flex items-center justify-center">
            <History className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-lg font-black text-slate-900 tracking-tight">
              Recent Feed
            </h2>
            <p className="text-[11px] text-slate-500">Latest public filings across Kathmandu</p>
          </div>
        </div>
      </div>

      <div
        id="recentReportsCard"
        className="bg-white rounded-3xl p-5 md:p-6 flex flex-col justify-between shadow-xs border border-slate-200/90 min-h-[380px]"
      >
        <div className="divide-y divide-slate-100 space-y-2">
          {recentReports.map((report, idx) => (
            <div
              key={report.id}
              id={`recentReportItem-${report.id}`}
              onClick={() => openIssueDetail(report.id)}
              className={`flex flex-col gap-2 cursor-pointer group hover:bg-slate-50/90 p-3 rounded-2xl transition-all ${
                idx === 0 ? 'pt-0' : 'pt-3'
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <span className="text-[10px] font-mono font-bold text-[#003893] bg-blue-50 px-1.5 py-0.2 rounded border border-blue-100 mb-1 inline-block">
                    #{report.trackingNumber}
                  </span>
                  <h4 className="text-xs md:text-sm font-bold text-slate-900 group-hover:text-[#dc2626] transition-colors line-clamp-1">
                    {report.title}
                  </h4>
                </div>
                <StatusBadge status={report.status} />
              </div>

              <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                {report.description}
              </p>

              <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                <span className="truncate max-w-[150px] font-medium text-slate-600">{report.locationName}</span>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <span className="flex items-center gap-1 font-bold text-slate-600">
                    <ThumbsUp className={`w-3 h-3 ${report.hasUpvoted ? 'fill-[#dc2626] text-[#dc2626]' : 'text-slate-400'}`} />
                    <span>{Math.max(0, Number(report.upvotes) || 0)}</span>
                  </span>
                  <span>•</span>
                  <span>{formatRelativeTime(report.reportedAt)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Reports Button */}
        <button
          id="viewAllReportsBtn"
          onClick={() => setCurrentView('my-reports')}
          className="mt-4 pt-3.5 border-t border-slate-100 w-full text-[#003893] hover:text-[#dc2626] font-bold text-xs flex items-center justify-center gap-2 transition-colors group cursor-pointer"
        >
          <span>View All Valley Reports ({issues.length})</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>
    </section>
  );
};
