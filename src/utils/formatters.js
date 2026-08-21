export const getCategoryBadgeStyle = (category) => {
  switch (category) {
    case 'waste':
      return { bg: 'bg-[#ffdad6]', text: 'text-[#93000a]', border: 'border-[#ffdad6]' };
    case 'roads':
      return { bg: 'bg-[#fef3c7]', text: 'text-[#92400e]', border: 'border-[#fde68a]' };
    case 'traffic':
      return { bg: 'bg-[#ffedd5]', text: 'text-[#9a3412]', border: 'border-[#fed7aa]' };
    case 'power':
      return { bg: 'bg-[#fef9c3]', text: 'text-[#854d0e]', border: 'border-[#fef08a]' };
    case 'water':
      return { bg: 'bg-[#e0f2fe]', text: 'text-[#0369a1]', border: 'border-[#bae6fd]' };
    case 'streetlight':
      return { bg: 'bg-[#e0e7ff]', text: 'text-[#3730a3]', border: 'border-[#c7d2fe]' };
    case 'disaster':
      return { bg: 'bg-[#fee2e2]', text: 'text-[#991b1b]', border: 'border-[#fecaca]' };
    case 'commerce':
      return { bg: 'bg-[#d1fae5]', text: 'text-[#065f46]', border: 'border-[#a7f3d0]' };
    default:
      return { bg: 'bg-[#f1f5f9]', text: 'text-[#334155]', border: 'border-[#e2e8f0]' };
  }
};

export const getSeverityBadgeStyle = (severity) => {
  switch (severity) {
    case 'critical':
      return {
        bg: 'bg-[#ba1a1a]',
        text: 'text-white',
        label: 'CRITICAL',
        subtleBg: 'bg-[#ffdad6]',
        subtleText: 'text-[#93000a]',
      };
    case 'high':
      return {
        bg: 'bg-[#ba1a1a]/10',
        text: 'text-[#ba1a1a]',
        label: 'HIGH',
        subtleBg: 'bg-[#ffdad6]/60',
        subtleText: 'text-[#ba1a1a]',
      };
    case 'medium':
      return {
        bg: 'bg-[#3e2700]/10',
        text: 'text-[#5d4217]',
        label: 'MEDIUM',
        subtleBg: 'bg-[#ffddb1]/50',
        subtleText: 'text-[#5d4217]',
      };
    case 'low':
      return {
        bg: 'bg-[#545f72]/10',
        text: 'text-[#545f72]',
        label: 'LOW',
        subtleBg: 'bg-[#e9e7eb]',
        subtleText: 'text-[#44474e]',
      };
    default:
      return {
        bg: 'bg-[#545f72]/10',
        text: 'text-[#545f72]',
        label: 'INFO',
        subtleBg: 'bg-[#e9e7eb]',
        subtleText: 'text-[#44474e]',
      };
  }
};

export const getStatusBadgeStyle = (status) => {
  switch (status) {
    case 'pending':
    case 'under_review':
      return {
        bg: 'bg-[#ffdad6]/60',
        text: 'text-[#93000a]',
        dot: 'bg-[#ba1a1a]',
        label: 'Pending',
        icon: 'Hourglass',
      };
    case 'assigned':
      return {
        bg: 'bg-[#d8e2ff]/50',
        text: 'text-[#081b3a]',
        dot: 'bg-[#031635]',
        label: 'Assigned',
        icon: 'UserCheck',
      };
    case 'in_progress':
      return {
        bg: 'bg-[#ffddb1]/40',
        text: 'text-[#5d4217]',
        dot: 'bg-[#b08d5b]',
        label: 'In Progress',
        icon: 'RotateCw',
      };
    case 'resolved':
      return {
        bg: 'bg-[#d5e0f7]/60',
        text: 'text-[#2e7d32]',
        dot: 'bg-[#2e7d32]',
        label: 'Resolved',
        icon: 'CheckCircle',
      };
    default:
      return {
        bg: 'bg-slate-100',
        text: 'text-slate-700',
        dot: 'bg-slate-500',
        label: status || 'Unknown',
        icon: 'Hourglass',
      };
  }
};

export const formatRelativeTime = (isoString) => {
  try {
    const date = new Date(isoString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);

    if (diffDays > 7) {
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      });
    }
    if (diffDays > 1) {
      return `${diffDays} days ago`;
    }
    if (diffDays === 1) {
      return 'Yesterday';
    }
    if (diffHours >= 1) {
      return `${diffHours} hours ago`;
    }
    const diffMins = Math.floor(diffMs / (1000 * 60));
    if (diffMins > 0) {
      return `${diffMins} min ago`;
    }
    return 'Just now';
  } catch {
    return 'Recently';
  }
};
