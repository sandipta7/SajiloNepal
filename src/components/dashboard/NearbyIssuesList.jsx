import React from 'react';
import {
  MapPin,
  Trash2,
  Car,
  Zap,
  Droplets,
  Construction,
  ZoomIn,
  ThumbsUp,
  ArrowRight,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { SeverityBadge } from '../common/SeverityBadge';

export const NearbyIssuesList = () => {
  const { issues, setCurrentView, openIssueDetail } = useApp();

  // Get active issues sorted by proximity / distance
  const nearbyIssues = [...issues]
    .filter((i) => i.status !== 'resolved')
    .slice(0, 4);

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'waste':
        return <Trash2 className="w-4 h-4 text-[#dc2626]" />;
      case 'traffic':
        return <Car className="w-4 h-4 text-orange-600" />;
      case 'power':
        return <Zap className="w-4 h-4 text-amber-600" />;
      case 'water':
        return <Droplets className="w-4 h-4 text-[#003893]" />;
      default:
        return <Construction className="w-4 h-4 text-slate-700" />;
    }
  };

  const getIconBg = (category) => {
    switch (category) {
      case 'waste':
        return 'bg-red-50 border border-red-100 text-[#dc2626]';
      case 'traffic':
        return 'bg-orange-50 border border-orange-100 text-orange-700';
      case 'power':
        return 'bg-amber-50 border border-amber-100 text-amber-700';
      case 'water':
        return 'bg-blue-50 border border-blue-100 text-[#003893]';
      default:
        return 'bg-slate-50 border border-slate-200 text-slate-700';
    }
  };

  return (
    <section id="nearbyIssuesSection" className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-red-50 text-[#dc2626] flex items-center justify-center">
            <MapPin className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-lg font-black text-slate-900 tracking-tight">
              Nearby Ward Hazards
            </h2>
            <p className="text-[11px] text-slate-500">Live geo-tagged grievances in your vicinity</p>
          </div>
        </div>
        <button
          onClick={() => setCurrentView('explore-map')}
          className="text-xs font-bold text-[#003893] hover:text-[#dc2626] flex items-center gap-1.5 transition-colors group"
        >
          <span>Open Live Map</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>

      {/* Map Interactive Banner */}
      <div
        id="nearbyMapBanner"
        onClick={() => setCurrentView('explore-map')}
        className="h-52 sm:h-60 rounded-3xl overflow-hidden shadow-xs relative group cursor-pointer border border-slate-200/90"
        style={{
          backgroundImage:
            'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCdM0TnI640DvIOPc0vT-A0aCZ-hDvnJ_rwylKIpxr579XSL6o6TpgpHR1NblifmJFdvwjmHFoceRsQ1GK7Ar1rCQIKh9Tm6alil0TIwreRParXTsdY-ZYi9BtVwOqfO6l6dTujHN9aEfchJwJ76_rAjtEBbT8XQQoYrMtWYBVRfCIoa1hrMUnWG7AsQ9pK6d5p3uJwptM1xljjoZ7eU_HA0BKIPFpl6d0XcFRdzoE3aye-HDXoSXf-ZQ")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent flex items-end justify-between p-5">
          <div className="bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-2xl shadow-sm border border-white/50">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
              <p className="text-xs font-bold text-slate-900">
                Kathmandu Valley Incident Grid
              </p>
            </div>
            <p className="text-[10px] text-slate-500 font-medium mt-0.5">
              {issues.length} active civic issues reported nearby
            </p>
          </div>
          <span className="text-xs font-bold bg-[#dc2626] text-white px-4 py-2 rounded-2xl shadow-sm flex items-center gap-1.5 group-hover:bg-[#b91c1c] active:scale-95 transition-all">
            <ZoomIn className="w-4 h-4" />
            <span>Interactive Map</span>
          </span>
        </div>
      </div>

      {/* Quick nearby issues list */}
      <div id="nearbyIssuesListWrapper" className="flex flex-col gap-2.5">
        {nearbyIssues.map((issue) => (
          <div
            key={issue.id}
            id={`nearbyItem-${issue.id}`}
            onClick={() => openIssueDetail(issue.id)}
            className="bg-white rounded-2xl p-4 flex items-center justify-between shadow-xs hover:border-slate-300 hover:shadow-sm transition-all cursor-pointer border border-slate-200/90 group"
          >
            <div className="flex items-center gap-3.5 min-w-0">
              <div
                className={`w-10 h-10 rounded-xl ${getIconBg(
                  issue.category
                )} flex items-center justify-center flex-shrink-0 shadow-2xs`}
              >
                {getCategoryIcon(issue.category)}
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono font-bold text-[#003893] bg-blue-50 px-1.5 py-0.2 rounded border border-blue-100">
                    #{issue.trackingNumber}
                  </span>
                  <h4 className="text-sm font-bold text-slate-900 group-hover:text-[#dc2626] transition-colors truncate">
                    {issue.title}
                  </h4>
                </div>
                <p className="text-xs text-slate-500 truncate mt-0.5">
                  {issue.locationName} • <span className="font-semibold text-slate-700">{issue.distanceKm || '0.8'} km away</span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 flex-shrink-0">
              <div className="flex items-center gap-1 text-[11px] font-bold text-slate-600 bg-slate-50 px-2 py-1 rounded-lg border border-slate-200">
                <ThumbsUp className={`w-3 h-3 ${issue.hasUpvoted ? 'fill-[#dc2626] text-[#dc2626]' : 'text-slate-400'}`} />
                <span>{Math.max(0, Number(issue.upvotes) || 0)}</span>
              </div>
              <SeverityBadge severity={issue.severity} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
