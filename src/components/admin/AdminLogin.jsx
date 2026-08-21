import React, { useState } from 'react';
import {
  Building2,
  Lock,
  Mail,
  Shield,
  ShieldCheck,
  UserCheck,
  AlertCircle,
  Eye,
  EyeOff,
  ArrowLeft,
  KeyRound,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Logo } from '../common/Logo';

export const AdminLogin = ({ onBackToGateway, onBackToCitizen }) => {
  const { loginAdmin, navigateToGateway } = useApp();
  const handleBack = onBackToGateway || onBackToCitizen || navigateToGateway;
  const [email, setEmail] = useState('admin@kathmandu.gov.np');
  const [password, setPassword] = useState('nepal2025');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const demoAccounts = [
    {
      role: 'Super Admin / Chief',
      name: 'Municipal Authority Officer',
      email: 'admin@kathmandu.gov.np',
      pass: 'nepal2025',
      dept: 'KMC Central Executive Office',
      badge: 'Admin',
    },
    {
      role: 'Field Dispatcher',
      name: 'Ramesh Shrestha',
      email: 'ramesh.ward10@kathmandu.gov.np',
      pass: 'officer123',
      dept: 'Ward 10 Quick Response Unit',
      badge: 'Officer',
    },
    {
      role: 'Sanitation Division',
      name: 'Sunita Gurung',
      email: 'sunita.waste@kmc.gov.np',
      pass: 'waste2025',
      dept: 'Environment & Waste Dept',
      badge: 'Officer',
    },
  ];

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    setTimeout(() => {
      const result = loginAdmin(email, password);
      if (!result.success) {
        setError(result.message || 'Invalid government credentials. Please try again.');
        setIsLoading(false);
      }
    }, 400);
  };

  const handleQuickFill = (acc) => {
    setEmail(acc.email);
    setPassword(acc.pass);
    setError('');
  };

  return (
    <div
      id="adminLoginView"
      className="min-h-screen bg-slate-900 flex flex-col justify-center items-center p-4 selection:bg-red-500 selection:text-white"
    >
      {/* Top back button */}
      <div className="w-full max-w-md mb-4 flex justify-between items-center">
        <button
          onClick={handleBack}
          className="text-xs font-semibold text-slate-400 hover:text-white flex items-center gap-1.5 transition-colors px-3 py-1.5 rounded-lg hover:bg-slate-800 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Portal Selection</span>
        </button>

        <span className="text-[10px] font-mono text-slate-400 bg-slate-800/80 px-2 py-0.5 rounded border border-slate-700">
          GovNet SSL 256-Bit
        </span>
      </div>

      {/* Main Login Card */}
      <div className="w-full max-w-md bg-slate-800 border border-slate-700 rounded-2xl p-6 md:p-8 shadow-2xl space-y-6">
        {/* Emblem & Branding */}
        <div className="text-center space-y-3">
          <div className="flex justify-center">
            <div className="bg-white p-3 rounded-2xl shadow-lg inline-flex items-center justify-center">
              <Logo size="lg" />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-widest">
              <ShieldCheck className="w-4 h-4" />
              <span>Government of Nepal</span>
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight mt-1">
              Municipal Admin Portal
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Kathmandu Metropolitan & Ward Officers Command Desk
            </p>
          </div>
        </div>

        {/* Error Alert */}
        {error && (
          <div
            id="adminLoginErrorAlert"
            className="bg-red-950/60 border border-red-800 text-red-200 text-xs p-3 rounded-xl flex items-center gap-2 animate-in fade-in duration-200"
          >
            <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">
              Official Email / Gov ID
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                id="adminLoginEmailInput"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="officer@kathmandu.gov.np"
                className="w-full pl-9 pr-4 py-2.5 bg-slate-900/90 border border-slate-700 rounded-xl text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-medium text-slate-300">
                Security Password
              </label>
              <span className="text-[10px] text-slate-400">
                Case-sensitive
              </span>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                id="adminLoginPasswordInput"
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 pr-10 py-2.5 bg-slate-900/90 border border-slate-700 rounded-xl text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 p-1"
                aria-label="Toggle password visibility"
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          <button
            id="adminLoginSubmitBtn"
            type="submit"
            disabled={isLoading}
            className="w-full py-2.5 px-4 bg-[#dc2626] hover:bg-[#b91c1c] active:scale-[0.99] text-white text-xs font-bold rounded-xl shadow-lg shadow-red-900/40 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
          >
            {isLoading ? (
              <>
                <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Authenticating Officer...</span>
              </>
            ) : (
              <>
                <KeyRound className="w-4 h-4" />
                <span>Authorize & Enter Command Desk</span>
              </>
            )}
          </button>
        </form>

        {/* Demo Fast Logins Section */}
        <div className="pt-4 border-t border-slate-700/80 space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              Quick Demo Accounts
            </span>
            <span className="text-[10px] text-slate-400">Click to fill</span>
          </div>

          <div className="space-y-1.5">
            {demoAccounts.map((acc, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleQuickFill(acc)}
                className="w-full p-2.5 rounded-xl bg-slate-900/60 hover:bg-slate-900 border border-slate-700/60 hover:border-red-500/50 flex items-center justify-between text-left transition-all group"
              >
                <div className="min-w-0 pr-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-200 group-hover:text-white">
                      {acc.name}
                    </span>
                    <span className="text-[9px] px-1.5 py-0.2 rounded bg-slate-800 text-slate-300 border border-slate-700">
                      {acc.badge}
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-400 truncate">
                    {acc.dept}
                  </p>
                </div>
                <span className="text-[10px] text-red-400 font-mono font-medium whitespace-nowrap">
                  {acc.role}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Security Warning Notice */}
        <div className="text-[10px] text-slate-400 text-center leading-relaxed">
          Authorized municipal personnel and emergency responders only. Unauthorized access is logged under the Nepal Cyber Security Act.
        </div>
      </div>
    </div>
  );
};
