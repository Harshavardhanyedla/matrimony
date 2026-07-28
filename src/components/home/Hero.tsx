import React, { useState } from 'react';
import { Search, Heart, Sparkles, ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';
import { LanguageCode } from '../../types';
import { TRANSLATIONS } from '../../lib/i18n';

interface HeroProps {
  currentLang: LanguageCode;
  onSearch: (filters: any) => void;
  onRegisterClick: () => void;
  onLoginClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  currentLang,
  onSearch,
  onRegisterClick,
  onLoginClick
}) => {
  const t = TRANSLATIONS[currentLang];

  const [lookingFor, setLookingFor] = useState<'Female' | 'Male'>('Female');
  const [minAge, setMinAge] = useState(21);
  const [maxAge, setMaxAge] = useState(28);
  const [religion, setReligion] = useState('All');
  const [motherTongue, setMotherTongue] = useState('All');

  const handleQuickSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({
      gender: lookingFor,
      minAge,
      maxAge,
      religion: religion === 'All' ? '' : religion,
      motherTongue: motherTongue === 'All' ? '' : motherTongue
    });
  };

  return (
    <section className="relative min-h-[85vh] flex items-center justify-center pt-8 pb-16 overflow-hidden">
      
      {/* High-res romantic couple background image with gradient mask overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-25 dark:opacity-20 scale-105 transition-transform duration-1000"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1920&q=80')`
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-slate-50/90 via-rose-50/70 to-slate-50 dark:from-slate-950/95 dark:via-purple-950/80 dark:to-slate-950" />

      {/* Background glowing ambient light */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-rose-500/20 to-purple-600/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full text-center space-y-8">
        
        {/* Verified Badge Header Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 dark:bg-slate-900/80 border border-rose-200 dark:border-rose-900/50 shadow-sm backdrop-blur-md animate-bounce">
          <Sparkles className="w-4 h-4 text-[#C2185B]" />
          <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
            India's #1 AI-Powered Matrimony Experience
          </span>
          <ShieldCheck className="w-4 h-4 text-emerald-500" />
        </div>

        {/* Main Headline */}
        <div className="max-w-4xl mx-auto space-y-4">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-slate-900 dark:text-white leading-tight">
            {t.heroTitle || 'Find Your Perfect Life Partner'}
          </h1>
          <p className="text-base sm:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto font-medium">
            {t.heroSub || '100% Verified Profiles, AI-Powered Compatibility Matching & Trusted Security'}
          </p>
        </div>

        {/* Quick Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <button
            onClick={onRegisterClick}
            className="px-8 py-3.5 rounded-full bg-gradient-to-r from-[#C2185B] via-[#D81B60] to-[#6A1B9A] text-white font-bold text-sm sm:text-base shadow-xl shadow-rose-500/30 hover:scale-105 transition-all flex items-center gap-2"
          >
            <span>{t.registerFree}</span>
            <ArrowRight className="w-5 h-5" />
          </button>
          
          <button
            onClick={onLoginClick}
            className="px-8 py-3.5 rounded-full bg-white/90 dark:bg-slate-800/90 text-slate-800 dark:text-white border border-slate-200 dark:border-slate-700 font-bold text-sm sm:text-base hover:bg-slate-100 dark:hover:bg-slate-700 transition-all shadow-sm"
          >
            {t.login}
          </button>
        </div>

        {/* QUICK MATCH FINDER FLOATING CARD */}
        <div className="max-w-5xl mx-auto pt-6">
          <div className="glass-panel p-6 sm:p-8 rounded-3xl shadow-2xl border border-white/60 dark:border-slate-800 text-left">
            
            <div className="flex items-center gap-2 mb-4">
              <Search className="w-5 h-5 text-[#C2185B]" />
              <h3 className="text-base font-bold text-slate-800 dark:text-white">
                Quick Partner Search
              </h3>
            </div>

            <form onSubmit={handleQuickSearch} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              
              {/* Looking for */}
              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                  I'm looking for
                </label>
                <select
                  value={lookingFor}
                  onChange={(e) => setLookingFor(e.target.value as any)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-800 dark:text-white focus:ring-2 focus:ring-[#C2185B]"
                >
                  <option value="Female">Bride (Female)</option>
                  <option value="Male">Groom (Male)</option>
                </select>
              </div>

              {/* Age Range */}
              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                  Aged ({minAge} to {maxAge} yrs)
                </label>
                <div className="flex gap-2">
                  <select
                    value={minAge}
                    onChange={(e) => setMinAge(parseInt(e.target.value))}
                    className="w-1/2 px-2 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-medium"
                  >
                    {[20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30].map((a) => (
                      <option key={a} value={a}>{a} yrs</option>
                    ))}
                  </select>
                  <select
                    value={maxAge}
                    onChange={(e) => setMaxAge(parseInt(e.target.value))}
                    className="w-1/2 px-2 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-medium"
                  >
                    {[25, 26, 27, 28, 29, 30, 32, 35, 40].map((a) => (
                      <option key={a} value={a}>{a} yrs</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Religion */}
              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                  Religion
                </label>
                <select
                  value={religion}
                  onChange={(e) => setReligion(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-800 dark:text-white"
                >
                  <option value="All">All Religions</option>
                  <option value="Hindu">Hindu</option>
                  <option value="Muslim">Muslim</option>
                  <option value="Sikh">Sikh</option>
                  <option value="Christian">Christian</option>
                  <option value="Jain">Jain</option>
                </select>
              </div>

              {/* Mother Tongue */}
              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                  Mother Tongue
                </label>
                <select
                  value={motherTongue}
                  onChange={(e) => setMotherTongue(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-800 dark:text-white"
                >
                  <option value="All">All Languages</option>
                  <option value="Telugu">Telugu</option>
                  <option value="Hindi">Hindi</option>
                  <option value="Tamil">Tamil</option>
                  <option value="Marathi">Marathi</option>
                  <option value="Bengali">Bengali</option>
                  <option value="Gujarati">Gujarati</option>
                  <option value="Kannada">Kannada</option>
                  <option value="Malayalam">Malayalam</option>
                </select>
              </div>

              {/* Submit Search Button */}
              <div className="flex items-end">
                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#C2185B] to-[#6A1B9A] text-white font-bold text-xs shadow-md shadow-rose-500/20 hover:opacity-95 transition-opacity flex items-center justify-center gap-1.5"
                >
                  <Search className="w-4 h-4" />
                  <span>{t.searchProfiles || 'Search Matches'}</span>
                </button>
              </div>

            </form>
          </div>
        </div>

      </div>
    </section>
  );
};
