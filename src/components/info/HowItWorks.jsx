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
  Sparkles,
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
      accentColor: 'text-[#dc2626] bg-red-50 border-red-100',
    },
    {
      num: '02',
      title: 'Pin Location & Submit',
      nepali: 'नक्शामा स्थान र दर्ता',
      desc: 'Use GPS or the interactive Kathmandu map to accurately pinpoint the ward and street. Provide urgency details.',
      icon: MapPin,
      badge: 'GPS Tagged',
      accentColor: 'text-[#003893] bg-blue-50 border-blue-100',
    },
    {
      num: '03',
      title: 'Community Verification & Upvotes',
      nepali: 'समुदायको समर्थन र मत',
      desc: 'Neighbors in your ward upvote and endorse the ticket, escalating the Civic Impact Score to ensure rapid municipal attention.',
      icon: ThumbsUp,
      badge: 'Public Audit',
      accentColor: 'text-amber-600 bg-amber-50 border-amber-100',
    },
    {
      num: '04',
      title: 'Dispatch & Resolution Proof',
      nepali: 'कारवाही र समाधान प्रमाण',
      desc: 'Municipal officers (KMC/NEA/KUKL) are deployed. Once fixed, photographic proof is attached and the ticket is officially closed.',
      icon: CheckCircle2,
      badge: 'Verified Proof',
      accentColor: 'text-emerald-700 bg-emerald-50 border-emerald-100',
    },
  ];

  return (
    <div
      id="howItWorksView"
      className="max-w-4xl mx-auto pb-12 space-y-8 animate-in fade-in duration-300"
    >
      {/* Header */}
      <div className="bg-white p-8 rounded-3xl border border-slate-200/90 shadow-xs text-center max-w-3xl mx-auto space-y-3 relative overflow-hidden nepal-gradient-subtle">
        <div className="absolute top-0 left-0 right-0 h-1 nepal-gradient-line"></div>
        <span className="text-xs font-black text-[#dc2626] uppercase tracking-wider">
          पारदर्शी नागरिक सेवा • Transparent Civic Platform
        </span>
        <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
          How <span className="text-[#003893]">Sajilo</span> <span className="text-[#dc2626]">Nepal</span> Works
        </h1>
        <p className="text-xs md:text-sm text-slate-500 max-w-xl mx-auto leading-relaxed">
          Bridging the gap between active citizens and local municipal ward
          officers for clean, safe, and accountable neighborhoods across Nepal.
        </p>
      </div>

      {/* 4 Steps Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {steps.map((step) => {
          const Icon = step.icon;
          return (
            <div
              key={step.num}
              className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-xs flex flex-col justify-between gap-5 group hover:border-slate-300 hover:shadow-md transition-all"
            >
              <div className="flex items-center justify-between">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border shadow-2xs ${step.accentColor}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <span className="text-3xl font-black text-slate-200 group-hover:text-[#003893]/20 transition-colors">
                  {step.num}
                </span>
              </div>

              <div>
                <h3 className="text-base font-bold text-slate-900 group-hover:text-[#003893] transition-colors">
                  {step.title}
                </h3>
                <p className="text-xs font-semibold text-[#dc2626] mb-2 mt-0.5">
                  {step.nepali}
                </p>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {step.desc}
                </p>
              </div>

              <div className="pt-3.5 border-t border-slate-100 flex justify-between items-center text-[10px] font-bold uppercase text-slate-400">
                <span>Phase {step.num}</span>
                <span className="bg-slate-100 px-2.5 py-1 rounded-full text-slate-700 font-bold border border-slate-200">
                  {step.badge}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Direct Action Banner */}
      <div className="bg-gradient-to-r from-[#003893] via-[#1e3a8a] to-[#0f172a] text-white p-8 md:p-10 rounded-3xl text-center space-y-4 shadow-md relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#dc2626] via-[#f59e0b] to-[#dc2626]"></div>
        <h2 className="text-xl md:text-2xl font-black tracking-tight">
          Witnessed a civic problem today in Kathmandu?
        </h2>
        <p className="text-xs md:text-sm text-blue-100 max-w-lg mx-auto leading-relaxed">
          It takes less than 60 seconds to take a photo, pin your ward, and
          alert the local municipal response squad.
        </p>
        <button
          onClick={() => setCurrentView('report-issue')}
          className="bg-white text-[#003893] hover:text-[#dc2626] font-bold text-xs md:text-sm px-8 py-3 rounded-2xl shadow-md hover:bg-slate-50 transition-all active:scale-95 cursor-pointer"
        >
          Submit Civic Report Now
        </button>
      </div>
    </div>
  );
};
