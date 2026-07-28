import React from 'react';
import { UserPlus, Search, MessageCircle, HeartHandshake } from 'lucide-react';
import { LanguageCode } from '../../types';
import { TRANSLATIONS } from '../../lib/i18n';

interface HowItWorksProps {
  currentLang: LanguageCode;
  onRegisterClick: () => void;
}

export const HowItWorks: React.FC<HowItWorksProps> = ({ currentLang, onRegisterClick }) => {
  const t = TRANSLATIONS[currentLang];

  const steps = [
    {
      step: '01',
      title: t.step1Title || 'Create Profile',
      desc: t.step1Desc || 'Register free with your basic details, photos, and partner expectations.',
      icon: UserPlus,
      color: 'border-rose-500 text-rose-500'
    },
    {
      step: '02',
      title: t.step2Title || 'Search Matches',
      desc: t.step2Desc || 'Use smart AI filters and Kundali Milan to discover matching profiles.',
      icon: Search,
      color: 'border-purple-500 text-purple-500'
    },
    {
      step: '03',
      title: t.step3Title || 'Connect',
      desc: t.step3Desc || 'Send express interest, chat in real-time, or request video calls.',
      icon: MessageCircle,
      color: 'border-pink-500 text-pink-500'
    },
    {
      step: '04',
      title: t.step4Title || 'Get Married',
      desc: t.step4Desc || 'Meet with family blessing and start your beautiful wedding journey!',
      icon: HeartHandshake,
      color: 'border-emerald-500 text-emerald-500'
    }
  ];

  return (
    <section className="py-20 bg-slate-50 dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-[#C2185B]">Simple & Trustworthy</span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">
            {t.howItWorks || 'How SoulMatch Works'}
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Four easy steps to finding your verified life partner with complete family peace of mind.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {steps.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-lg relative group hover:-translate-y-2 transition-transform duration-300"
              >
                <div className="absolute top-4 right-6 text-3xl font-black text-slate-200 dark:text-slate-800 group-hover:text-rose-200 dark:group-hover:text-rose-950 transition-colors">
                  {item.step}
                </div>

                <div className={`w-14 h-14 rounded-2xl border-2 ${item.color} bg-rose-50/50 dark:bg-slate-800 flex items-center justify-center mb-6`}>
                  <Icon className="w-7 h-7" />
                </div>

                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                  {item.title}
                </h3>
                
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <button
            onClick={onRegisterClick}
            className="px-8 py-3.5 rounded-full bg-gradient-to-r from-[#C2185B] to-[#6A1B9A] text-white font-bold text-sm shadow-xl shadow-rose-500/25 hover:opacity-95 transition-opacity"
          >
            Start Your Journey Now
          </button>
        </div>

      </div>
    </section>
  );
};
