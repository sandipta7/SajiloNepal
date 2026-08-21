import React from 'react';
import {
  MapPin,
  Trash2,
  Car,
  Zap,
  Droplets,
  Construction,
  ZoomIn,
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
        return <Trash2 className="w-4 h-4 text-emerald-600" />;
      case 'traffic':
        return <Car className="w-4 h-4 text-orange-600" />;
      case 'power':
        return <Zap className="w-4 h-4 text-amber-600" />;
      case 'water':
        return <Droplets className="w-4 h-4 text-blue-600" />;
      default:
        return <Construction className="w-4 h-4 text-slate-600" />;
    }
  };

  const getIconBg = (category) => {
    switch (category) {
      case 'waste':
        return 'bg-emerald-50 border border-emerald-100';
      case 'traffic':
        return 'bg-orange-50 border border-orange-100';
      case 'power':
        return 'bg-amber-50 border border-amber-100';
      case 'water':
        return 'bg-blue-50 border border-blue-100';
      default:
        return 'bg-slate-50 border border-slate-200';
    }
  };

  return (
    <section id="nearbyIssuesSection" className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <MapPin className="w-5 h-5 text-[#dc2626]" />
          <span>Nearby Issues</span>
        </h2>
        <button
          onClick={() => setCurrentView('explore-map')}
          className="text-xs font-semibold text-[#dc2626] hover:underline flex items-center gap-1"
        >
          <span>Full Map</span>
          <ZoomIn className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Map Interactive Banner */}
      <div
        id="nearbyMapBanner"
        onClick={() => setCurrentView('explore-map')}
        className="h-52 sm:h-60 rounded-xl overflow-hidden shadow-xs relative group cursor-pointer border border-slate-200"
        style={{
          backgroundImage:
            'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCdM0TnI640DvIOPc0vT-A0aCZ-hDvnJ_rwylKIpxr579XSL6o6TpgpHR1NblifmJFdvwjmHFoceRsQ1GK7Ar1rCQIKh9Tm6alil0TIwreRParXTsdY-ZYi9BtVwOqfO6l6dTujHN9aEfchJwJ76_rAjtEBbT8XQQoYrMtWYBVRfCIoa1hrMUnWG7AsQ9pK6d5p3uJwptM1xljjoZ7eU_HA0BKIPFpl6d0XcFRdzoE3aye-HDXoSXf-ZQ")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent flex items-end justify-between p-4">
          <div className="bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-lg shadow-sm border border-slate-200">
            <p className="text-xs font-bold text-slate-900">
              Kathmandu Valley Live Grid
            </p>
            <p className="text-[10px] text-slate-500 font-medium">
              {issues.length} active civic issues reported nearby
            </p>
          </div>
          <span className="text-xs font-medium bg-[#dc2626] text-white px-3.5 py-1.5 rounded-lg shadow-sm flex items-center gap-1.5 group-hover:bg-[#b91c1c] transition-colors">
            <ZoomIn className="w-3.5 h-3.5" />
            <span>Open Interactive Map</span>
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
            className="bg-white rounded-xl p-3.5 flex items-center justify-between shadow-xs hover:bg-slate-50 transition-all cursor-pointer border border-slate-200"
          >
            <div className="flex items-center gap-3.5 min-w-0">
              <div
                className={`w-9 h-9 rounded-lg ${getIconBg(
                  issue.category
                )} flex items-center justify-center flex-shrink-0`}
              >
                {getCategoryIcon(issue.category)}
              </div>
              <div className="min-w-0">
                <h4 className="text-sm font-semibold text-slate-900 truncate">
                  {issue.title}
                </h4>
                <p className="text-xs text-slate-500 truncate">
                  {issue.locationName} • {issue.distanceKm || '0.8'} km away
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 flex-shrink-0">
              <SeverityBadge severity={issue.severity} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
