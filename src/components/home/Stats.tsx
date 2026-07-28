import React from 'react';
import { Users, Heart, UserCheck, ShieldCheck } from 'lucide-react';
import { LanguageCode } from '../../types';
import { TRANSLATIONS } from '../../lib/i18n';

interface StatsProps {
  currentLang: LanguageCode;
}

export const Stats: React.FC<StatsProps> = ({ currentLang }) => {
  const t = TRANSLATIONS[currentLang];

  const stats = [
    {
      value: t.totalMembers || '500,000+',
      label: t.totalMembersLabel || 'Verified Profiles',
      icon: Users,
      color: 'from-rose-500 to-pink-600'
    },
    {
      value: t.successStories || '50,000+',
      label: t.successStoriesLabel || 'Weddings Celebrated',
      icon: Heart,
      color: 'from-purple-600 to-indigo-600'
    },
    {
      value: t.activeUsers || '120,000+',
      label: t.activeUsersLabel || 'Active Monthly Users',
      icon: UserCheck,
      color: 'from-amber-500 to-rose-500'
    },
    {
      value: t.verifiedProfiles || '100%',
      label: t.verifiedProfilesLabel || 'ID & Photo Verified',
      icon: ShieldCheck,
      color: 'from-emerald-500 to-teal-600'
    }
  ];

  return (
    <section className="py-12 bg-white dark:bg-slate-900 border-y border-slate-100 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div
                key={i}
                className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/50 text-center hover:scale-105 transition-transform"
              >
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-r ${stat.color} text-white flex items-center justify-center mx-auto mb-3 shadow-md`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                  {stat.value}
                </div>
                <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-1">
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
