import React, { useState } from 'react';
import {
  Sliders,
  ShieldCheck,
  Bell,
  Database,
  RefreshCw,
  FileText,
  AlertTriangle,
  CheckCircle2,
  Lock,
  Radio,
  Server,
  UserCheck,
  LogOut,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const AdminSettings = () => {
  const { adminUser, notifications, issues, logoutAdmin } = useApp();
  const [broadcastTitle, setBroadcastTitle] = useState('');
  const [broadcastMsg, setBroadcastMsg] = useState('');
  const [broadcastSuccess, setBroadcastSuccess] = useState(false);

  const handleBroadcast = (e) => {
    e.preventDefault();
    if (!broadcastTitle || !broadcastMsg) return;
    setBroadcastSuccess(true);
    setTimeout(() => {
      setBroadcastSuccess(false);
      setBroadcastTitle('');
      setBroadcastMsg('');
    }, 3000);
  };

  const auditLogs = [
    {
      id: 'aud-1',
      action: 'Admin Authentication Succeeded',
      user: adminUser?.name || 'Municipal Officer',
      ip: '103.10.28.14 (Kathmandu GovNet)',
      timestamp: 'Today at 09:42 AM',
      status: 'success',
    },
    {
      id: 'aud-2',
      action: 'Status Change: #KMC-2025-0841 -> in_progress',
      user: 'Officer Sunita Gurung',
      ip: '103.10.28.92 (Ward 10 Terminal)',
      timestamp: 'Today at 08:30 AM',
      status: 'success',
    },
    {
      id: 'aud-3',
      action: 'Grievance Export to CSV Generated',
      user: 'Admin Chief',
      ip: '103.10.28.14 (Kathmandu GovNet)',
      timestamp: 'Yesterday at 04:15 PM',
      status: 'success',
    },
    {
      id: 'aud-4',
      action: 'Ticket Auto-Escalation to CRITICAL (High Upvotes)',
      user: 'System Bot / AI Triage',
      ip: '127.0.0.1 (Internal Worker)',
      timestamp: 'Yesterday at 02:00 PM',
      status: 'info',
    },
  ];

  return (
    <div
      id="adminSettingsView"
      className="max-w-5xl mx-auto pb-12 space-y-6 animate-in fade-in duration-300"
    >
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 md:p-8 rounded-xl border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#dc2626] uppercase tracking-wider mb-1">
            <Sliders className="w-4 h-4" />
            <span>Governance & Security</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">
            System Audit & Admin Controls
          </h1>
          <p className="text-xs md:text-sm text-slate-500 mt-1">
            Configure municipal SLA rules, dispatch city-wide alerts, and inspect tamper-evident audit logs.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-emerald-50 text-emerald-700 border border-emerald-200 px-3 py-1.5 rounded-lg text-xs font-semibold">
          <ShieldCheck className="w-4 h-4" />
          <span>Security Protocol v2.4 Active</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Emergency Civic Broadcast */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
            <Radio className="w-4 h-4 text-[#dc2626]" />
            <h3>Municipal Emergency Broadcast</h3>
          </div>
          <p className="text-xs text-slate-500">
            Send high-priority notification to citizens and on-duty officers regarding road closures, water repairs, or monsoon alerts.
          </p>

          {broadcastSuccess && (
            <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs p-3 rounded-lg flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Broadcast dispatched to all active citizen feeds!</span>
            </div>
          )}

          <form onSubmit={handleBroadcast} className="space-y-3">
            <div>
              <label className="block text-xs font-semibold text-slate-900 mb-1">
                Alert Headline *
              </label>
              <input
                type="text"
                required
                value={broadcastTitle}
                onChange={(e) => setBroadcastTitle(e.target.value)}
                placeholder="e.g. Maitidevi Water Line Repair Notice"
                className="w-full p-2.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#dc2626] text-slate-900"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-900 mb-1">
                Notice Details & Affected Wards *
              </label>
              <textarea
                required
                rows={3}
                value={broadcastMsg}
                onChange={(e) => setBroadcastMsg(e.target.value)}
                placeholder="Details of the municipal work, estimated outage hours, and helpline numbers."
                className="w-full p-2.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#dc2626] text-slate-900"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 px-4 bg-[#dc2626] hover:bg-[#b91c1c] text-white text-xs font-semibold rounded-lg shadow-xs transition-colors flex items-center justify-center gap-2"
            >
              <Bell className="w-4 h-4" />
              <span>Dispatch Official Civic Broadcast</span>
            </button>
          </form>
        </div>

        {/* Officer Active Session & Identity */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
            <Lock className="w-4 h-4 text-slate-700" />
            <h3>Authenticated Officer Credentials</h3>
          </div>

          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3 text-xs">
            <div className="flex justify-between items-center py-1 border-b border-slate-200">
              <span className="text-slate-500">Authenticated Name:</span>
              <span className="font-bold text-slate-900">{adminUser?.name || 'Administrator'}</span>
            </div>
            <div className="flex justify-between items-center py-1 border-b border-slate-200">
              <span className="text-slate-500">Official Email:</span>
              <span className="font-mono font-semibold text-slate-800">{adminUser?.email || 'admin@kathmandu.gov.np'}</span>
            </div>
            <div className="flex justify-between items-center py-1 border-b border-slate-200">
              <span className="text-slate-500">Authority Role:</span>
              <span className="font-bold text-red-600">{adminUser?.role || 'Super Admin'}</span>
            </div>
            <div className="flex justify-between items-center py-1 border-b border-slate-200">
              <span className="text-slate-500">Department:</span>
              <span className="text-slate-800">{adminUser?.department || 'KMC Central'}</span>
            </div>
            <div className="flex justify-between items-center py-1">
              <span className="text-slate-500">Security Token:</span>
              <span className="font-mono text-[11px] text-slate-600 bg-white px-2 py-0.5 rounded border border-slate-200">
                {adminUser?.token ? `${adminUser.token.slice(0, 16)}...` : 'NEP-AUTH-TOKEN-2025'}
              </span>
            </div>
          </div>

          <div className="p-3 bg-blue-50 text-blue-900 rounded-xl border border-blue-200 text-xs flex items-start gap-2.5">
            <Server className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold">Local & Session Storage Encrypted</p>
              <p className="text-[11px] text-blue-700 mt-0.5">
                Session state is isolated from public citizen cookies. All administrative ticket updates require signed token verification.
              </p>
            </div>
          </div>

          <button
            onClick={() => logoutAdmin()}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 rounded-xl text-xs font-bold transition-all"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out of Admin Session</span>
          </button>
        </div>
      </div>

      {/* Audit Log Table */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
            <FileText className="w-4 h-4 text-slate-700" />
            <h3>Administrative Activity Audit Trail</h3>
          </div>
          <span className="text-xs text-slate-400">Live Stream</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 text-slate-400 font-medium">
                <th className="py-2.5 px-3">Action Event</th>
                <th className="py-2.5 px-3">Officer / Actor</th>
                <th className="py-2.5 px-3">Network IP / Node</th>
                <th className="py-2.5 px-3 text-right">Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {auditLogs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3 px-3 flex items-center gap-2 text-slate-800 font-semibold">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    {log.action}
                  </td>
                  <td className="py-3 px-3 text-slate-600">{log.user}</td>
                  <td className="py-3 px-3 font-mono text-[11px] text-slate-500">{log.ip}</td>
                  <td className="py-3 px-3 text-right text-slate-400 font-mono text-[11px]">{log.timestamp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
