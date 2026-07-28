import React from 'react';
import { ShieldCheck, Heart, Sparkles, MapPin, Briefcase, GraduationCap, MessageCircle, ArrowRight } from 'lucide-react';
import { UserProfile, LanguageCode } from '../../types';
import { TRANSLATIONS } from '../../lib/i18n';
import { calculateCompatibilityScore } from '../../lib/ai-engine';

interface FeaturedProfilesProps {
  profiles: UserProfile[];
  currentUser: UserProfile;
  currentLang: LanguageCode;
  onSelectProfile: (profile: UserProfile) => void;
  onSendInterest: (profile: UserProfile) => void;
  onStartChat: (profile: UserProfile) => void;
  onViewAllClick: () => void;
}

export const FeaturedProfiles: React.FC<FeaturedProfilesProps> = ({
  profiles,
  currentUser,
  currentLang,
  onSelectProfile,
  onSendInterest,
  onStartChat,
  onViewAllClick
}) => {
  const t = TRANSLATIONS[currentLang];

  return (
    <section className="py-20 bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#C2185B]">Handpicked For You</span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white mt-1">
              {t.featuredMatches || 'Featured Premium Matches'}
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
              Verified high-compatibility profiles active today.
            </p>
          </div>

          <button
            onClick={onViewAllClick}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-rose-50 dark:hover:bg-slate-700 text-[#C2185B] dark:text-rose-400 font-bold text-xs transition-colors self-start md:self-auto"
          >
            <span>View All Matches</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Profile Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {profiles.slice(0, 4).map((profile) => {
            const compat = calculateCompatibilityScore(currentUser, profile);

            return (
              <div
                key={profile.id}
                className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200/80 dark:border-slate-700 overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group flex flex-col"
              >
                {/* Photo Banner with Badges */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={profile.photos[0]}
                    alt={profile.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />

                  {/* Online indicator */}
                  {profile.isOnline && (
                    <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-emerald-500/90 text-white text-[10px] font-bold backdrop-blur-xs flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                      Online Now
                    </span>
                  )}

                  {/* Match % pill */}
                  <span className="absolute top-3 right-3 px-3 py-1 rounded-full bg-gradient-to-r from-[#C2185B] to-[#6A1B9A] text-white text-xs font-black shadow-md flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-amber-300" />
                    {compat.totalScore}% Match
                  </span>

                  {/* Bottom Image Overlay Details */}
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <div className="flex items-center gap-1.5">
                      <h3 className="text-lg font-bold truncate">{profile.name}</h3>
                      {profile.isVerified && (
                        <span title="Govt ID Verified">
                          <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-rose-200 font-medium">
                      {profile.age} yrs • {profile.height} • {profile.religion}
                    </p>
                  </div>
                </div>

                {/* Card Content Details */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
                    <div className="flex items-center gap-2">
                      <Briefcase className="w-3.5 h-3.5 text-[#C2185B] shrink-0" />
                      <span className="truncate font-semibold text-slate-800 dark:text-slate-200">
                        {profile.occupation} ({profile.annualIncome})
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <GraduationCap className="w-3.5 h-3.5 text-purple-600 shrink-0" />
                      <span className="truncate">{profile.qualification}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                      <span>{profile.city}, {profile.state}</span>
                    </div>

                    <p className="line-clamp-2 text-[11px] text-slate-500 dark:text-slate-400 italic pt-1 border-t border-slate-100 dark:border-slate-700/50">
                      "{profile.bio}"
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-700">
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => onSendInterest(profile)}
                        className="py-2 px-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 text-[#C2185B] dark:text-rose-300 font-bold text-xs hover:bg-rose-100 dark:hover:bg-rose-900/60 transition-colors flex items-center justify-center gap-1"
                      >
                        <Heart className="w-3.5 h-3.5" />
                        <span>Interest</span>
                      </button>

                      <button
                        onClick={() => onStartChat(profile)}
                        className="py-2 px-3 rounded-xl bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-300 font-bold text-xs hover:bg-purple-100 dark:hover:bg-purple-900/60 transition-colors flex items-center justify-center gap-1"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>Chat</span>
                      </button>
                    </div>

                    <button
                      onClick={() => onSelectProfile(profile)}
                      className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#C2185B] to-[#6A1B9A] text-white font-bold text-xs shadow-sm hover:opacity-95 transition-opacity"
                    >
                      {t.viewProfile || 'View Full Profile'}
                    </button>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
