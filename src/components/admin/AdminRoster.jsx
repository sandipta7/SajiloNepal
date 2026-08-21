import React, { useState } from 'react';
import {
  Users,
  Shield,
  Phone,
  CheckCircle2,
  Clock,
  Plus,
  Building2,
  Search,
  UserCheck,
  UserX,
  Mail,
  Zap,
  Droplets,
  Truck,
  Construction,
  Trash2,
  Car,
  Lightbulb,
  AlertTriangle,
  Store,
  ExternalLink,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { INITIAL_RESPONDERS, CATEGORIES_DATA } from '../../data/initialData';

export const AdminRoster = () => {
  const { issues, setCurrentView, openIssueDetail } = useApp();
  const [responders, setResponders] = useState(INITIAL_RESPONDERS);
  const [filterCategory, setFilterCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const categoryFilters = [
    { id: 'all', name: 'All Problem Leads', icon: Users },
    { id: 'waste', name: 'Waste & Sanitation', icon: Trash2 },
    { id: 'roads', name: 'Roads & Potholes', icon: Construction },
    { id: 'traffic', name: 'Traffic & Signals', icon: Car },
    { id: 'power', name: 'Electricity (NEA)', icon: Zap },
    { id: 'water', name: 'Water (KUKL)', icon: Droplets },
    { id: 'streetlight', name: 'Street Lights', icon: Lightbulb },
    { id: 'disaster', name: 'Disaster Hazard', icon: AlertTriangle },
    { id: 'commerce', name: 'Nagar Prahari', icon: Store },
  ];

  const filteredResponders = responders.filter((resp) => {
    const matchesSearch =
      resp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resp.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resp.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (resp.categoryName && resp.categoryName.toLowerCase().includes(searchTerm.toLowerCase()));

    if (filterCategory === 'all') return matchesSearch;
    return matchesSearch && resp.category === filterCategory;
  });

  return (
    <div
      id="adminRosterView"
      className="max-w-6xl mx-auto pb-12 space-y-6 animate-in fade-in duration-300"
    >
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 md:p-8 rounded-xl border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#dc2626] uppercase tracking-wider mb-1">
            <Users className="w-4 h-4" />
            <span>Category Incident Commanders & Officers</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">
            Municipal Problem Leads & Roster
          </h1>
          <p className="text-xs md:text-sm text-slate-500 mt-1">
            Designated officers with facial verification assigned across all 8 problem categories (Waste, Roads, Traffic, NEA, KUKL, Lighting, Disaster, Police).
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="text-right hidden sm:block">
            <p className="text-xs font-bold text-slate-900">
              {responders.length} Category Officers Active
            </p>
            <p className="text-[10px] text-emerald-600 font-semibold flex items-center justify-end gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              100% Department Coverage
            </p>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-col gap-3">
        <div className="flex flex-col md:flex-row gap-3 items-center justify-between">
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search officer name, department, category..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#dc2626] text-slate-900"
            />
          </div>

          <span className="text-xs text-slate-500 font-medium">
            Showing {filteredResponders.length} of {responders.length} Officers
          </span>
        </div>

        {/* Category Pills Bar */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full pb-1 pt-1 border-t border-slate-100">
          {categoryFilters.map((cat) => {
            const Icon = cat.icon;
            return (
              <button
                key={cat.id}
                onClick={() => setFilterCategory(cat.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                  filterCategory === cat.id
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{cat.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Responder Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {filteredResponders.map((responder) => {
          // calculate live active tickets assigned to this responder
          const activeTasks = issues.filter(
            (i) =>
              (i.status === 'assigned' || i.status === 'in_progress') &&
              (i.assignedResponder?.name === responder.name || i.category === responder.category)
          ).length;

          const resolvedTasks = issues.filter(
            (i) =>
              i.status === 'resolved' &&
              (i.assignedResponder?.name === responder.name || i.category === responder.category)
          ).length;

          return (
            <div
              key={responder.id}
              className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs hover:border-slate-300 hover:shadow-sm transition-all flex flex-col justify-between space-y-4"
            >
              {/* Officer Header with Face Photo */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-bold text-[#dc2626] bg-red-50 px-2 py-0.5 rounded border border-red-200 uppercase tracking-wider">
                    {responder.categoryName || responder.badge || 'Civic'}
                  </span>
                  <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    On Duty
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="relative">
                    <img
                      src={responder.avatar}
                      alt={responder.name}
                      className="w-16 h-16 rounded-xl object-cover border-2 border-slate-200 shadow-2xs"
                    />
                    <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full"></span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-sm font-bold text-slate-900 leading-tight">
                      {responder.name}
                    </h3>
                    <p className="text-xs text-[#dc2626] font-semibold mt-0.5 line-clamp-1">
                      {responder.role}
                    </p>
                    <p className="text-[10px] text-slate-400 font-mono mt-0.5">
                      ID: {responder.id}
                    </p>
                  </div>
                </div>
              </div>

              {/* Department Info */}
              <div className="bg-slate-50 p-3 rounded-lg border border-slate-100 space-y-1 text-xs">
                <p className="text-[11px] font-medium text-slate-700 line-clamp-2 leading-relaxed">
                  {responder.department}
                </p>
                <div className="pt-2 flex items-center justify-between text-[11px] text-slate-500 border-t border-slate-200/60">
                  <span className="flex items-center gap-1 font-mono font-medium">
                    <Phone className="w-3 h-3 text-[#dc2626]" />
                    {responder.phone}
                  </span>
                </div>
              </div>

              {/* Caseload Metrics */}
              <div className="grid grid-cols-2 gap-2 text-center pt-1">
                <div className="bg-slate-50 p-2 rounded-lg border border-slate-100">
                  <p className="text-base font-bold text-slate-900">
                    {activeTasks || responder.activeTasksCount || 2}
                  </p>
                  <p className="text-[10px] text-slate-500 font-semibold uppercase">
                    Active Caseload
                  </p>
                </div>
                <div className="bg-slate-50 p-2 rounded-lg border border-slate-100">
                  <p className="text-base font-bold text-emerald-600">
                    {resolvedTasks || responder.completedTasksCount || 45}
                  </p>
                  <p className="text-[10px] text-slate-500 font-semibold uppercase">
                    Resolved
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
                <a
                  href={`tel:${responder.phone}`}
                  className="flex-1 py-2 px-3 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 shadow-xs transition-colors"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call Officer</span>
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
