import React from 'react';
import { Bell, Check, CheckCheck, X, AlertTriangle, ArrowRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const NotificationModal = () => {
  const {
    notifications,
    isNotificationOpen,
    setIsNotificationOpen,
    markNotificationRead,
    markAllNotificationsRead,
    openIssueDetail,
  } = useApp();

  if (!isNotificationOpen) return null;

  return (
    <div
      id="notificationModalBackdrop"
      className="fixed inset-0 z-50 flex items-start justify-end p-4 md:p-6 bg-black/20 backdrop-blur-2xs"
      onClick={() => setIsNotificationOpen(false)}
    >
      <div
        id="notificationModalPanel"
        className="w-full max-w-sm bg-white rounded-xl shadow-xl border border-slate-200 mt-12 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <Bell className="w-4 h-4 text-[#dc2626]" />
            <h3 className="text-sm font-bold text-slate-900">Notifications</h3>
            <span className="text-xs px-2 py-0.5 bg-slate-100 text-slate-600 rounded-full font-semibold">
              {notifications.filter((n) => !n.isRead).length}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              id="markAllReadBtn"
              onClick={markAllNotificationsRead}
              className="text-xs text-slate-500 hover:text-slate-800 flex items-center gap-1"
              title="Mark all as read"
            >
              <CheckCheck className="w-3.5 h-3.5" />
              <span>Mark read</span>
            </button>
            <button
              onClick={() => setIsNotificationOpen(false)}
              className="p-1 rounded-md text-slate-400 hover:bg-slate-100 hover:text-slate-700"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Notifications List */}
        <div className="divide-y divide-slate-100 max-h-96 overflow-y-auto customScrollbar">
          {notifications.length === 0 ? (
            <div className="p-8 text-center text-slate-400 text-xs">
              No notifications yet.
            </div>
          ) : (
            notifications.map((notif) => (
              <div
                key={notif.id}
                id={`notifItem-${notif.id}`}
                onClick={() => {
                  markNotificationRead(notif.id);
                  if (notif.relatedIssueId) {
                    openIssueDetail(notif.relatedIssueId);
                    setIsNotificationOpen(false);
                  }
                }}
                className={`p-3.5 hover:bg-slate-50 transition-colors cursor-pointer flex gap-3 ${
                  !notif.isRead ? 'bg-red-50/30' : ''
                }`}
              >
                <div className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0 bg-[#dc2626]" />

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1 mb-0.5">
                    <h4 className="text-xs font-bold text-slate-900 truncate">
                      {notif.title}
                    </h4>
                    <span className="text-[10px] text-slate-400 whitespace-nowrap">
                      {notif.timestamp}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-snug">
                    {notif.message}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-3 bg-slate-50 border-t border-slate-100 text-center text-[11px] text-slate-500">
          Real-time updates directly from municipal dispatchers
        </div>
      </div>
    </div>
  );
};
