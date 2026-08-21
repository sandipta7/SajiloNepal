import React from 'react';
import {
  Camera,
  CheckCircle2,
  FileText,
  MapPin,
  Shield,
  ThumbsUp,
  UserCheck,
  Zap,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const HowItWorks = () => {
  const { setCurrentView } = useApp();

  const steps = [
    {
      num: '01',
      title: 'Spot & Capture Evidence',
      nepali: 'समस्या पहिचान र तस्विर',
      desc: 'Take a clear photograph of any damaged road, garbage pile, unlit street, or dangerous overhead wire in your neighborhood.',
      icon: Camera,
      badge: 'Citizen',
    },
    {
      num: '02',
      title: 'Pin Location & Submit',
      nepali: 'नक्शामा स्थान र दर्ता',
      desc: 'Use GPS or the interactive Kathmandu map to accurately pinpoint the ward and street. Provide urgency details.',
      icon: MapPin,
      badge: 'GPS Tagged',
    },
    {
      num: '03',
      title: 'Community Verification & Upvotes',
      nepali: 'समुदायको समर्थन',
      desc: 'Neighbors in your ward upvote and endorse the ticket, escalating the Civic Impact Score to ensure rapid municipal attention.',
      icon: ThumbsUp,
      badge: 'Public Audit',
    },
    {
      num: '04',
      title: 'Dispatch & Resolution Proof',
      nepali: 'कारवाही र समाधान',
      desc: 'Municipal officers (KMC/NEA/KUKL) are deployed. Once fixed, photographic proof is attached and the ticket is officially closed.',
      icon: CheckCircle2,
      badge: 'Verified',
    },
  ];

  return (
    <div
      id="howItWorksView"
      className="max-w-4xl mx-auto pb-12 space-y-8 animate-in fade-in duration-300"
    >
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="text-xs font-bold text-[#dc2626] uppercase tracking-wider">
          Transparent Nepal Civic Platform
        </span>
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
          How Solve For Nepal Works
        </h1>
        <p className="text-sm text-slate-500">
          Bridging the gap between active citizens and local municipal ward
          officers for clean, safe, and accountable neighborhoods.
        </p>
      </div>

      {/* 4 Steps Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {steps.map((step) => {
          const Icon = step.icon;
          return (
            <div
              key={step.num}
              className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between gap-4 group hover:border-slate-300 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-[#dc2626]">
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-2xl font-black text-slate-200 group-hover:text-slate-300 transition-colors">
                  {step.num}
                </span>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-base font-bold text-slate-900">
                    {step.title}
                  </h3>
                </div>
                <p className="text-xs font-medium text-slate-400 mb-2">
                  {step.nepali}
                </p>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {step.desc}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex justify-between items-center text-[10px] font-bold uppercase text-slate-400">
                <span>Phase {step.num}</span>
                <span className="bg-slate-100 px-2 py-0.5 rounded text-slate-600">
                  {step.badge}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Direct Action Banner */}
      <div className="bg-[#dc2626] text-white p-8 rounded-xl text-center space-y-4 shadow-sm">
        <h2 className="text-xl font-bold">
          Witnessed a civic problem today in Kathmandu?
        </h2>
        <p className="text-xs md:text-sm text-white/90 max-w-lg mx-auto">
          It takes less than 60 seconds to take a photo, pin your ward, and
          alert the local response squad.
        </p>
        <button
          onClick={() => setCurrentView('report-issue')}
          className="bg-white text-[#dc2626] font-bold text-xs md:text-sm px-6 py-2.5 rounded-lg shadow-sm hover:bg-slate-50 transition-colors active:scale-95"
        >
          Submit Issue Now
        </button>
      </div>
    </div>
  );
};
