import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Eye, 
  Heart, 
  MessageSquare, 
  ShieldCheck, 
  Sparkles, 
  Crown, 
  UserCheck, 
  Ban, 
  Bookmark, 
  Bell, 
  TrendingUp,
  MapPin,
  Briefcase
} from 'lucide-react';
import { UserProfile } from '../../types';
import { calculateCompatibilityScore } from '../../lib/ai-engine';

interface DashboardViewProps {
  currentUser: UserProfile;
  allProfiles: UserProfile[];
  onSelectProfile: (profile: UserProfile) => void;
  onStartChat: (profile: UserProfile) => void;
  onSendInterest: (profile: UserProfile) => void;
  onOpenCheckout: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  currentUser,
  allProfiles,
  onSelectProfile,
  onStartChat,
  onSendInterest,
  onOpenCheckout
}) => {
  const [activeTab, setActiveTab] = useState<'matches' | 'visitors' | 'interests' | 'shortlist' | 'blocked'>('matches');

  // Simulated subsets
  const visitors = allProfiles.slice(0, 4);
  const interestReceived = allProfiles.slice(1, 3);
  const shortlisted = allProfiles.slice(2, 5);
  const blockedUsers = allProfiles.slice(6, 7);

  const profileCompletion = 85; // 85% complete

  return (
    <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      
      {/* Top Banner & Profile Completion Gauge */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-rose-100 dark:border-slate-800 shadow-xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
          
          {/* User info */}
          <div className="flex items-center gap-4">
            <div className="relative">
              <img
                src={currentUser.photos[0]}
                alt={currentUser.name}
                className="w-20 h-20 rounded-full object-cover ring-4 ring-[#C2185B]/30"
              />
              <span className="absolute bottom-0 right-0 w-6 h-6 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center text-white" title="Verified">
                <CheckCircle2 className="w-4 h-4" />
              </span>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-2xl font-black text-slate-900 dark:text-white">
                  Welcome back, {currentUser.name}!
                </h2>
                <span className="px-2.5 py-0.5 rounded-full bg-gradient-to-r from-amber-400 to-rose-500 text-white text-[10px] font-extrabold uppercase">
                  VIP Member
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                {currentUser.qualification} • {currentUser.city}, {currentUser.state}
              </p>
              
              <div className="flex items-center gap-2 mt-2">
                <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> Govt ID Verified
                </span>
                <span className="text-[11px] font-semibold text-purple-600 dark:text-purple-400 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" /> AI Photo Checked
                </span>
              </div>
            </div>
          </div>

          {/* Profile Completion Circle & VIP CTA */}
          <div className="flex items-center gap-6 bg-white/80 dark:bg-slate-800/80 p-4 rounded-2xl border border-slate-200/60 dark:border-slate-700">
            
            <div className="text-center space-y-1">
              <div className="relative w-16 h-16 flex items-center justify-center">
                <svg className="w-16 h-16 transform -rotate-90">
                  <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="6" className="text-slate-200 dark:text-slate-700" fill="transparent" />
                  <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="6" className="text-[#C2185B]" fill="transparent" strokeDasharray="175" strokeDashoffset={175 - (175 * profileCompletion) / 100} strokeLinecap="round" />
                </svg>
                <span className="absolute text-xs font-black text-slate-900 dark:text-white">
                  {profileCompletion}%
                </span>
              </div>
              <span className="block text-[10px] font-bold text-slate-500">Profile Score</span>
            </div>

            <div className="space-y-2">
              <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Complete photo gallery for 3x more views!
              </p>
              <button
                onClick={onOpenCheckout}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-400 via-rose-500 to-purple-600 text-white font-bold text-xs shadow-md flex items-center gap-1.5 hover:opacity-95"
              >
                <Crown className="w-3.5 h-3.5 fill-amber-200 text-amber-200" />
                <span>Boost Profile Now</span>
              </button>
            </div>

          </div>

        </div>
      </div>

      {/* Quick Dashboard Stat Counters */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm flex items-center justify-between">
          <div>
            <span className="block text-2xl font-black text-[#C2185B]">14</span>
            <span className="text-xs font-semibold text-slate-500">New Matches</span>
          </div>
          <Heart className="w-8 h-8 text-rose-500/20" />
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm flex items-center justify-between">
          <div>
            <span className="block text-2xl font-black text-purple-600">42</span>
            <span className="text-xs font-semibold text-slate-500">Profile Views</span>
          </div>
          <Eye className="w-8 h-8 text-purple-500/20" />
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm flex items-center justify-between">
          <div>
            <span className="block text-2xl font-black text-emerald-600">8</span>
            <span className="text-xs font-semibold text-slate-500">Interests Received</span>
          </div>
          <UserCheck className="w-8 h-8 text-emerald-500/20" />
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm flex items-center justify-between">
          <div>
            <span className="block text-2xl font-black text-amber-500">97%</span>
            <span className="text-xs font-semibold text-slate-500">Top Match Score</span>
          </div>
          <Sparkles className="w-8 h-8 text-amber-500/20" />
        </div>
      </div>

      {/* Main Dashboard Navigation Tabs */}
      <div className="space-y-6">
        <div className="flex border-b border-slate-200 dark:border-slate-800 overflow-x-auto gap-2">
          {[
            { id: 'matches', label: "Today's Matches", count: allProfiles.length },
            { id: 'visitors', label: 'Who Viewed Me', count: visitors.length },
            { id: 'interests', label: 'Interests Received', count: interestReceived.length },
            { id: 'shortlist', label: 'Shortlisted Profiles', count: shortlisted.length },
            { id: 'blocked', label: 'Blocked Users', count: blockedUsers.length }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`pb-3 px-4 text-xs font-bold transition-all border-b-2 whitespace-nowrap flex items-center gap-1.5 ${
                activeTab === tab.id
                  ? 'border-[#C2185B] text-[#C2185B]'
                  : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              <span>{tab.label}</span>
              <span className="px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-[10px]">
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Tab Profiles Display Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {(activeTab === 'matches'
            ? allProfiles
            : activeTab === 'visitors'
            ? visitors
            : activeTab === 'interests'
            ? interestReceived
            : activeTab === 'shortlist'
            ? shortlisted
            : blockedUsers
          ).map((profile) => {
            const compat = calculateCompatibilityScore(currentUser, profile);

            return (
              <div
                key={profile.id}
                className="bg-white dark:bg-slate-800 rounded-3xl p-5 border border-slate-200/80 dark:border-slate-700 shadow-md hover:shadow-xl transition-all flex gap-4"
              >
                <img
                  src={profile.photos[0]}
                  alt={profile.name}
                  className="w-24 h-32 rounded-2xl object-cover shrink-0"
                />

                <div className="flex-1 flex flex-col justify-between space-y-2">
                  <div>
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-slate-900 dark:text-white text-sm truncate">{profile.name}</h4>
                      <span className="text-[10px] font-black text-[#C2185B] bg-rose-50 dark:bg-rose-950 px-2 py-0.5 rounded-full">
                        {compat.totalScore}%
                      </span>
                    </div>

                    <p className="text-xs text-rose-600 dark:text-rose-400 font-semibold mt-0.5">
                      {profile.age} yrs • {profile.height} • {profile.religion}
                    </p>

                    <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate mt-1">
                      {profile.occupation} ({profile.city})
                    </p>
                  </div>

                  <div className="flex gap-2 pt-2 border-t border-slate-100 dark:border-slate-700">
                    <button
                      onClick={() => onSelectProfile(profile)}
                      className="flex-1 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-white text-[11px] font-bold"
                    >
                      View
                    </button>
                    <button
                      onClick={() => onStartChat(profile)}
                      className="flex-1 py-1.5 rounded-xl bg-[#C2185B] text-white text-[11px] font-bold"
                    >
                      Chat
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>

    </div>
  );
};
