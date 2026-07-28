import React, { useState } from 'react';
import { 
  Users, 
  ShieldAlert, 
  CheckCircle, 
  XCircle, 
  TrendingUp, 
  DollarSign, 
  Award, 
  AlertTriangle,
  Search,
  Check,
  Ban
} from 'lucide-react';
import { UserProfile } from '../../types';

interface AdminPanelProps {
  profiles: UserProfile[];
  onVerifyUser: (userId: string) => void;
  onSuspendUser: (userId: string) => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ profiles, onVerifyUser, onSuspendUser }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'moderation' | 'payments'>('overview');
  const [searchQuery, setSearchQuery] = useState('');

  const stats = [
    { label: 'Total Registered Users', value: '528,490', change: '+12.4%', icon: Users, color: 'text-[#C2185B]' },
    { label: 'Pending ID Verifications', value: '142', change: 'Action Required', icon: ShieldAlert, color: 'text-amber-500' },
    { label: 'AI Fraud Flags', value: '3', change: 'Low Risk', icon: AlertTriangle, color: 'text-rose-600' },
    { label: 'Monthly Revenue', value: '₹48,50,000', change: '+18.2%', icon: DollarSign, color: 'text-emerald-500' }
  ];

  const filteredUsers = profiles.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-rose-100 dark:bg-rose-950 text-[#C2185B] text-[10px] font-black uppercase">
              Admin Portal
            </span>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white">SoulMatch Command Center</h2>
          </div>
          <p className="text-xs text-slate-500">Moderation, ID Verification, Payment Reports & AI Fraud Monitoring</p>
        </div>

        {/* Tab Switcher */}
        <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-2xl">
          {[
            { id: 'overview', label: 'Overview' },
            { id: 'users', label: 'User Management' },
            { id: 'moderation', label: 'AI Moderation Queue' },
            { id: 'payments', label: 'Revenue Reports' }
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id as any)}
              className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === t.id
                  ? 'bg-gradient-to-r from-[#C2185B] to-[#6A1B9A] text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-300'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* OVERVIEW TAB */}
      {activeTab === 'overview' && (
        <div className="space-y-8">
          {/* Stat Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((s, i) => {
              const Icon = s.icon;
              return (
                <div key={i} className="p-6 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-md space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">{s.label}</span>
                    <Icon className={`w-5 h-5 ${s.color}`} />
                  </div>
                  <div className="text-2xl font-black text-slate-900 dark:text-white">{s.value}</div>
                  <span className="text-[10px] font-bold text-emerald-500">{s.change}</span>
                </div>
              );
            })}
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-md space-y-4">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">Recent ID Verification Requests</h3>
              <div className="space-y-3">
                {profiles.slice(0, 3).map((p) => (
                  <div key={p.id} className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 dark:bg-slate-900 border text-xs">
                    <div className="flex items-center gap-3">
                      <img src={p.photos[0]} alt={p.name} className="w-8 h-8 rounded-full object-cover" />
                      <div>
                        <span className="font-bold text-slate-900 dark:text-white block">{p.name}</span>
                        <span className="text-[10px] text-slate-400">Govt Aadhaar & Selfie</span>
                      </div>
                    </div>
                    <button
                      onClick={() => onVerifyUser(p.id)}
                      className="px-3 py-1 bg-emerald-500 text-white rounded-lg text-[10px] font-bold"
                    >
                      Approve & Badge
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-md space-y-4">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">AI Fraud Risk Alerts</h3>
              <div className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 text-xs space-y-2">
                <div className="flex items-center gap-2 text-rose-700 dark:text-rose-300 font-bold">
                  <AlertTriangle className="w-4 h-4" />
                  <span>1 Duplicate Photo Flagged</span>
                </div>
                <p className="text-[11px] text-slate-600 dark:text-slate-400">
                  AI Photo Analyzer detected potential stock photo reuse on Profile #USR-99. Flagged for human moderator review.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* USER MANAGEMENT TAB */}
      {activeTab === 'users' && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-lg space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">All Platform Users</h3>
            <div className="relative w-64">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name or email..."
                className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl border dark:bg-slate-800"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-800 text-slate-500 uppercase font-bold text-[10px]">
                <tr>
                  <th className="p-3">User</th>
                  <th className="p-3">Religion & Caste</th>
                  <th className="p-3">Location</th>
                  <th className="p-3">Verification</th>
                  <th className="p-3">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {filteredUsers.map((u) => (
                  <tr key={u.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                    <td className="p-3 flex items-center gap-2">
                      <img src={u.photos[0]} alt={u.name} className="w-8 h-8 rounded-full object-cover" />
                      <div>
                        <span className="font-bold block">{u.name}</span>
                        <span className="text-[10px] text-slate-400">{u.email}</span>
                      </div>
                    </td>
                    <td className="p-3">{u.religion} ({u.caste})</td>
                    <td className="p-3">{u.city}, {u.state}</td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        u.isVerified ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                      }`}>
                        {u.isVerified ? 'Verified' : 'Pending'}
                      </span>
                    </td>
                    <td className="p-3 flex items-center gap-2">
                      <button
                        onClick={() => onVerifyUser(u.id)}
                        className="p-1 rounded bg-emerald-500 text-white"
                        title="Verify User"
                      >
                        <Check className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => onSuspendUser(u.id)}
                        className="p-1 rounded bg-rose-600 text-white"
                        title="Suspend User"
                      >
                        <Ban className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

    </div>
  );
};
