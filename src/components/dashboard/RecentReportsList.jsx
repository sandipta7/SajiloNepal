import React from 'react';
import { History, ArrowRight } from 'lucide-react';
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
        <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <History className="w-5 h-5 text-[#dc2626]" />
          <span>Recent Reports</span>
        </h2>
      </div>

      <div
        id="recentReportsCard"
        className="bg-white rounded-xl p-5 flex flex-col justify-between shadow-xs border border-slate-200 min-h-[380px]"
      >
        <div className="divide-y divide-slate-100">
          {recentReports.map((report, idx) => (
            <div
              key={report.id}
              id={`recentReportItem-${report.id}`}
              onClick={() => openIssueDetail(report.id)}
              className={`flex flex-col gap-1.5 cursor-pointer group hover:bg-slate-50 p-2.5 rounded-lg transition-colors ${
                idx === 0 ? 'pb-3.5' : 'py-3.5'
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <h4 className="text-sm font-semibold text-slate-900 group-hover:text-[#dc2626] transition-colors truncate">
                  {report.title}
                </h4>
                <StatusBadge status={report.status} />
              </div>

              <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                {report.description}
              </p>

              <div className="flex items-center justify-between text-[11px] text-slate-400 mt-1">
                <span>{report.locationName}</span>
                <span>Reported {formatRelativeTime(report.reportedAt)}</span>
              </div>
            </div>
          ))}
        </div>

        {/* View All Reports Button */}
        <button
          id="viewAllReportsBtn"
          onClick={() => setCurrentView('my-reports')}
          className="mt-4 pt-3 border-t border-slate-100 w-full text-[#dc2626] font-medium text-xs flex items-center justify-center gap-2 hover:text-[#b91c1c] transition-colors group"
        >
          <span>View All Reports ({issues.length})</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>
    </section>
  );
};
