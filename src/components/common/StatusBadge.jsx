import React from 'react';
import {
  Hourglass,
  UserCheck,
  RotateCw,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';

export const StatusBadge = ({ status, className = '' }) => {
  const getBadgeConfig = () => {
    switch (status) {
      case 'pending':
      case 'under_review':
        return {
          bg: 'bg-blue-50',
          text: 'text-blue-700',
          border: 'border-blue-200',
          icon: Hourglass,
          label: 'Pending',
        };
      case 'assigned':
        return {
          bg: 'bg-indigo-50',
          text: 'text-indigo-700',
          border: 'border-indigo-200',
          icon: UserCheck,
          label: 'Assigned',
        };
      case 'in_progress':
        return {
          bg: 'bg-amber-50',
          text: 'text-amber-700',
          border: 'border-amber-200',
          icon: RotateCw,
          label: 'In Progress',
        };
      case 'resolved':
        return {
          bg: 'bg-emerald-50',
          text: 'text-emerald-700',
          border: 'border-emerald-200',
          icon: CheckCircle2,
          label: 'Resolved',
        };
      default:
        return {
          bg: 'bg-slate-50',
          text: 'text-slate-700',
          border: 'border-slate-200',
          icon: AlertCircle,
          label: status || 'Pending',
        };
    }
  };

  const config = getBadgeConfig();
  const Icon = config.icon;

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${config.bg} ${config.text} ${config.border} ${className}`}
    >
      <Icon className="w-3 h-3" />
      <span>{config.label}</span>
    </span>
  );
};
