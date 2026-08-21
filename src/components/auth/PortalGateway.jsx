import React, { useState } from 'react';
import {
  Users,
  ShieldCheck,
  Building2,
  Lock,
  Mail,
  KeyRound,
  ArrowRight,
  ArrowLeft,
  AlertCircle,
  Eye,
  EyeOff,
  MapPin,
  Camera,
  CheckCircle2,
  Phone,
  Sparkles,
  Zap,
  Award,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Logo } from '../common/Logo';
import { INITIAL_RESPONDERS } from '../../data/initialData';

export const PortalGateway = () => {
  const { loginCitizen, loginAdmin } = useApp();

  const [selectedRole, setSelectedRole] = useState(null); // null | 'citizen' | 'admin'
  const [email, setEmail] = useState('admin@kathmandu.gov.np');
  const [password, setPassword] = useState('nepal2025');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const demoAccounts = [
    {
      name: 'Central Executive Officer',
      role: 'Super Admin',
      email: 'admin@kathmandu.gov.np',
      pass: 'nepal2025',
      dept: 'KMC Central Executive Office',
      badge: 'Admin',
    },
    {
      name: 'Ramesh Shrestha',
      role: 'Ward 10 Dispatcher',
      email: 'ramesh.ward10@kathmandu.gov.np',
      pass: 'officer123',
      dept: 'Ward 10 Quick Response Unit',
      badge: 'Officer',
    },
    {
      name: 'Sunita Gurung',
      role: 'Sanitation Lead',
      email: 'sunita.waste@kmc.gov.np',
      pass: 'waste2025',
      dept: 'KMC Environment & Waste Dept',
      badge: 'Sanitation',
    },
    {
      name: 'Er. Prakash Adhikari',
      role: 'Roads & Infra Engineer',
      email: 'prakash.roads@kmc.gov.np',
      pass: 'roads123',
      dept: 'Department of Roads & Infra',
      badge: 'Roads',
    },
    {
      name: 'Inspector Sita KC',
      role: 'Traffic Police Coordinator',
      email: 'sita.traffic@kmc.gov.np',
      pass: 'traffic123',
      dept: 'Kathmandu Valley Traffic Police',
      badge: 'Traffic',
    },
    {
      name: 'Bikram Thapa',
      role: 'Grid Field Engineer',
      email: 'bikram.power@nea.gov.np',
      pass: 'power123',
      dept: 'Nepal Electricity Authority (NEA)',
      badge: 'NEA Grid',
    },
  ];

  const handleEnterCitizen = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (e && e.stopPropagation) e.stopPropagation();
    loginCitizen('dashboard');
  };

  const handleAdminLogin = (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    setTimeout(() => {
      const result = loginAdmin(email, password);
      if (!result.success) {
        setError(result.message || 'Invalid official credentials. Please try again or select a demo account.');
        setIsLoading(false);
      }
      // If success, AppContext automatically updates portal to 'admin'
    }, 350);
  };

  const handleQuickFill = (acc) => {
    setEmail(acc.email);
    setPassword(acc.pass);
    setError('');
  };

  return (
    <div
      id="portalGatewayView"
      className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/40 text-slate-800 flex flex-col justify-between selection:bg-red-100 selection:text-red-900 font-sans"
    >
      {/* Top Subtle Nepal Gradient Line */}
      <div className="h-1.5 w-full nepal-gradient-line shadow-xs"></div>

      {/* Main Container */}
      <div className="flex-1 max-w-5xl mx-auto w-full px-4 py-8 md:py-12 flex flex-col justify-center items-center">
        {/* Brand Header */}
        <div className="text-center space-y-3 mb-8 md:mb-10 max-w-2xl">
          <div className="flex justify-center mb-2">
            <div className="p-3 bg-white rounded-3xl shadow-sm border border-slate-200/80 inline-flex items-center justify-center">
              <Logo size="lg" />
            </div>
          </div>
          <span className="text-xs font-black text-[#dc2626] uppercase tracking-widest bg-red-50 px-3 py-1 rounded-full border border-red-100">
            एकीकृत नागरिक तथा नगरपालिका प्रणाली • Nepal Civic Platform
          </span>
          <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
            Welcome to <span className="text-[#003893]">Sajilo</span> <span className="text-[#dc2626]">Nepal</span>
          </h1>
          <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
            Please select your portal to continue. Citizens can directly report and track neighborhood grievances, while municipal officers access the authorized dispatch desk.
          </p>
        </div>

        {/* Dynamic View: Role Selection VS Admin Login Form */}
        {!selectedRole || selectedRole === 'citizen' ? (
          /* Role Selection Cards */
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl animate-in fade-in zoom-in-95 duration-300">
            {/* Option 1: Client Portal Card */}
            <div
              id="clientLoginCard"
              onClick={handleEnterCitizen}
              className="bg-white rounded-3xl p-7 md:p-8 border-2 border-slate-200 hover:border-[#dc2626] shadow-md hover:shadow-2xl transition-all duration-200 group cursor-pointer flex flex-col justify-between space-y-6 relative overflow-hidden active:scale-[0.99] hover:-translate-y-1"
            >
              <div className="absolute top-0 right-0 w-36 h-36 bg-red-50 rounded-bl-full -z-0 group-hover:scale-110 transition-transform duration-300"></div>

              <div className="space-y-4 relative z-10">
                <div className="flex items-center justify-between">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#dc2626] to-[#b91c1c] text-white flex items-center justify-center shadow-md shadow-red-900/20 group-hover:rotate-3 transition-transform">
                    <Users className="w-7 h-7 stroke-[2.2]" />
                  </div>
                  <span className="text-[11px] font-black tracking-wider uppercase px-2.5 py-1 rounded-full bg-red-100 text-[#dc2626] border border-red-200">
                    Option 1
                  </span>
                </div>

                <div>
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span className="text-xs font-bold text-[#dc2626] uppercase tracking-wider">
                      Client Portal • सर्वसाधारण
                    </span>
                    <span className="bg-emerald-100 text-emerald-800 text-[10px] font-extrabold px-2 py-0.5 rounded-full flex items-center gap-1">
                      <Zap className="w-3 h-3 text-emerald-600" />
                      Direct Entry • No Account Needed
                    </span>
                  </div>
                  <h2 className="text-2xl font-black text-slate-900">
                    Enter as Client
                  </h2>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                    Instantly enter the client workspace with <strong>no account or sign-up required</strong>. Report civic grievances with photos, track status, and view the live Kathmandu Valley map.
                  </p>
                </div>

                {/* Feature Checklist */}
                <div className="space-y-2 pt-3 border-t border-slate-100 text-xs text-slate-600 font-medium">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span>Instant access without registration or login</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span>Report road potholes, waste, water leaks & power</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span>Track real-time ward resolution progress</span>
                  </div>
                </div>
              </div>

              <button
                type="button"
                id="btnEnterClient"
                onClick={handleEnterCitizen}
                className="w-full py-3.5 px-5 bg-slate-900 group-hover:bg-[#dc2626] text-white rounded-2xl text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer"
              >
                <span>Direct Access as Client (No Account)</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Option 2: Municipal Officer & Admin Desk Card */}
            <div
              id="adminLoginCard"
              onClick={() => setSelectedRole('admin')}
              className="bg-white rounded-3xl p-7 md:p-8 border-2 border-slate-200 hover:border-[#003893] shadow-md hover:shadow-2xl transition-all duration-200 group cursor-pointer flex flex-col justify-between space-y-6 relative overflow-hidden active:scale-[0.99] hover:-translate-y-1"
            >
              <div className="absolute top-0 right-0 w-36 h-36 bg-blue-50 rounded-bl-full -z-0 group-hover:scale-110 transition-transform duration-300"></div>

              <div className="space-y-4 relative z-10">
                <div className="flex items-center justify-between">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#003893] to-[#1e3a8a] text-white flex items-center justify-center shadow-md shadow-blue-950/20 group-hover:-rotate-3 transition-transform">
                    <Building2 className="w-7 h-7 stroke-[2.2]" />
                  </div>
                  <span className="text-[11px] font-black tracking-wider uppercase px-2.5 py-1 rounded-full bg-blue-100 text-[#003893] border border-blue-200">
                    Option 2
                  </span>
                </div>

                <div>
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span className="text-xs font-bold text-[#003893] uppercase tracking-wider">
                      Admin Portal • कर्मचारी
                    </span>
                    <span className="bg-amber-100 text-amber-900 text-[10px] font-extrabold px-2 py-0.5 rounded-full flex items-center gap-1">
                      <Lock className="w-3 h-3 text-amber-700" />
                      Email & Password Required
                    </span>
                  </div>
                  <h2 className="text-2xl font-black text-slate-900">
                    Enter as Admin
                  </h2>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                    Official command desk for Kathmandu Metropolitan City, Ward Officers, NEA, and KUKL teams. <strong>Requires official email and password</strong> to access.
                  </p>
                </div>

                {/* Feature Checklist */}
                <div className="space-y-2 pt-3 border-t border-slate-100 text-xs text-slate-600 font-medium">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#003893] flex-shrink-0" />
                    <span>Incident triage, severity tags & officer dispatch</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#003893] flex-shrink-0" />
                    <span>Upload completion photos & update statuses</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#003893] flex-shrink-0" />
                    <span>Ward performance metrics & analytics</span>
                  </div>
                </div>
              </div>

              <button
                type="button"
                id="btnEnterAdmin"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedRole('admin');
                }}
                className="w-full py-3.5 px-5 bg-[#003893] hover:bg-[#002b70] text-white rounded-2xl text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer"
              >
                <KeyRound className="w-4 h-4" />
                <span>Admin Login (Email & Password) 🔒</span>
              </button>
            </div>
          </div>
        ) : (
          /* Admin/Officer Login Form */
          <div className="w-full max-w-md bg-white border border-slate-200/90 rounded-3xl p-6 md:p-8 shadow-xl space-y-5 animate-in fade-in zoom-in-95 duration-200 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#003893] to-[#dc2626]"></div>

            {/* Back Button */}
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={() => {
                  setSelectedRole(null);
                  setError('');
                }}
                className="text-xs font-bold text-slate-500 hover:text-slate-900 flex items-center gap-1.5 transition-colors p-1.5 -ml-1 rounded-xl hover:bg-slate-100 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Change Portal</span>
              </button>

              <span className="text-[10px] font-mono font-bold text-[#003893] bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
                GovNet SSL 256-Bit
              </span>
            </div>

            <div className="text-center space-y-1">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#003893] flex items-center justify-center mx-auto border border-blue-100 shadow-2xs">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-black text-slate-900 tracking-tight">
                Officer & Admin Sign In
              </h2>
              <p className="text-xs text-slate-500">
                Enter your official government ID or choose a demo officer account below.
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <div
                id="gatewayLoginError"
                className="bg-red-50 border border-red-200 text-[#dc2626] text-xs p-3 rounded-2xl flex items-center gap-2 animate-in fade-in"
              >
                <AlertCircle className="w-4 h-4 text-[#dc2626] flex-shrink-0" />
                <span className="font-medium">{error}</span>
              </div>
            )}

            {/* Login Form */}
            <form onSubmit={handleAdminLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1.5">
                  Official Email / Gov ID
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="officer@kathmandu.gov.np"
                    className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#003893]/20 font-medium"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-bold text-slate-800">
                    Security Password
                  </label>
                  <span className="text-[10px] text-slate-400">Case-sensitive</span>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-9 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#003893]/20 font-medium"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 px-4 bg-[#003893] hover:bg-[#002b70] text-white text-xs font-bold rounded-2xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95 disabled:opacity-70"
              >
                {isLoading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Verifying Officer Credentials...</span>
                  </>
                ) : (
                  <>
                    <KeyRound className="w-4 h-4" />
                    <span>Authorize & Enter Command Desk</span>
                  </>
                )}
              </button>
            </form>

            {/* Quick Demo Accounts Helper */}
            <div className="pt-3 border-t border-slate-100 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                  Quick Demo Accounts
                </span>
                <span className="text-[10px] text-slate-400">Click to fill</span>
              </div>

              <div className="grid grid-cols-2 gap-1.5 max-h-36 overflow-y-auto customScrollbar p-1">
                {demoAccounts.map((acc, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleQuickFill(acc)}
                    className="p-2 rounded-xl bg-slate-50 hover:bg-blue-50/80 border border-slate-200 hover:border-blue-300 text-left transition-all cursor-pointer"
                  >
                    <p className="text-[11px] font-bold text-slate-900 truncate">
                      {acc.name}
                    </p>
                    <p className="text-[9px] text-[#003893] font-bold truncate">
                      {acc.role}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="py-4 px-6 text-center text-[11px] text-slate-500 border-t border-slate-200/80 bg-white/60 backdrop-blur-xs flex flex-col sm:flex-row items-center justify-between gap-2 max-w-5xl mx-auto w-full">
        <span>© {new Date().getFullYear()} Sajilo Nepal • National Civic Grievance Framework</span>
        <div className="flex items-center gap-4 text-slate-600 font-semibold">
          <span className="flex items-center gap-1">
            <Phone className="w-3 h-3 text-[#dc2626]" />
            KMC Helpline: 1184
          </span>
          <span>•</span>
          <span>Kathmandu Valley Command</span>
        </div>
      </footer>
    </div>
  );
};
