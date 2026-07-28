import React, { useState } from 'react';
import { Sparkles, Moon, Sun, CheckCircle, ShieldCheck, RefreshCw } from 'lucide-react';
import { calculateKundaliGunaMilan, KundaliResult } from '../../lib/ai-engine';

export const KundaliMatching: React.FC = () => {
  const [groomRashi, setGroomRashi] = useState('Simha (Leo)');
  const [groomNakshatra, setGroomNakshatra] = useState('Magha');
  const [brideRashi, setBrideRashi] = useState('Kanya (Virgo)');
  const [brideNakshatra, setBrideNakshatra] = useState('Hasta');

  const [result, setResult] = useState<KundaliResult>(
    calculateKundaliGunaMilan(groomRashi, groomNakshatra, brideRashi, brideNakshatra)
  );

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    const res = calculateKundaliGunaMilan(groomRashi, groomNakshatra, brideRashi, brideNakshatra);
    setResult(res);
  };

  const rashis = [
    'Mesha (Aries)', 'Vrishabha (Taurus)', 'Mithuna (Gemini)', 'Karka (Cancer)',
    'Simha (Leo)', 'Kanya (Virgo)', 'Tula (Libra)', 'Vrishchika (Scorpio)',
    'Dhanu (Sagittarius)', 'Makara (Capricorn)', 'Kumbha (Aquarius)', 'Meena (Pisces)'
  ];

  const nakshatras = [
    'Ashwini', 'Bharani', 'Krittika', 'Rohini', 'Mrigashirsha', 'Ardra', 'Punarvasu', 'Pushya', 'Ashlesha',
    'Magha', 'Purva Phalguni', 'Uttara Phalguni', 'Hasta', 'Chitra', 'Swati', 'Vishakha', 'Anuradha', 'Jyeshtha',
    'Mula', 'Purva Ashadha', 'Uttara Ashadha', 'Shravana', 'Dhanishta', 'Shatabhisha', 'Purva Bhadrapada', 'Uttara Bhadrapada', 'Revati'
  ];

  return (
    <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      
      {/* Banner Title */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-950 text-purple-600 dark:text-purple-300 text-xs font-bold">
          <Sparkles className="w-3.5 h-3.5" /> Vedic Kundali Milan (36 Gunas)
        </div>
        <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">
          Horoscope & Astro Compatibility Calculator
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Check Ashtakoota Guna Milan score between Bride and Groom for harmonious married life.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Form Column */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
          <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Moon className="w-4 h-4 text-purple-600" /> Enter Birth Details
          </h3>

          <form onSubmit={handleCalculate} className="space-y-5">
            {/* Groom Details */}
            <div className="space-y-3 p-4 rounded-2xl bg-rose-50/50 dark:bg-slate-800/50 border border-rose-100 dark:border-slate-700">
              <span className="text-xs font-bold text-[#C2185B] uppercase tracking-wider block">Groom Details</span>
              <div>
                <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-300 mb-1">Groom Rashi (Moon Sign)</label>
                <select
                  value={groomRashi}
                  onChange={(e) => setGroomRashi(e.target.value)}
                  className="w-full p-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-800"
                >
                  {rashis.map((r) => (
                    <option key={r} value={r}>{r}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-300 mb-1">Groom Nakshatra</label>
                <select
                  value={groomNakshatra}
                  onChange={(e) => setGroomNakshatra(e.target.value)}
                  className="w-full p-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-800"
                >
                  {nakshatras.map((n) => (
                    <option key={n} value={n}>{n}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Bride Details */}
            <div className="space-y-3 p-4 rounded-2xl bg-purple-50/50 dark:bg-slate-800/50 border border-purple-100 dark:border-slate-700">
              <span className="text-xs font-bold text-purple-600 uppercase tracking-wider block">Bride Details</span>
              <div>
                <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-300 mb-1">Bride Rashi (Moon Sign)</label>
                <select
                  value={brideRashi}
                  onChange={(e) => setBrideRashi(e.target.value)}
                  className="w-full p-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-800"
                >
                  {rashis.map((r) => (
                    <option key={r} value={r}>{r}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-300 mb-1">Bride Nakshatra</label>
                <select
                  value={brideNakshatra}
                  onChange={(e) => setBrideNakshatra(e.target.value)}
                  className="w-full p-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-800"
                >
                  {nakshatras.map((n) => (
                    <option key={n} value={n}>{n}</option>
                  ))}
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-[#C2185B] to-[#6A1B9A] text-white font-bold text-xs shadow-lg shadow-rose-500/25 flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Calculate Kundali Match</span>
            </button>
          </form>
        </div>

        {/* Results Column */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Main Guna Score Card */}
          <div className="p-8 rounded-3xl bg-gradient-to-br from-rose-50 via-purple-50 to-indigo-50 dark:from-slate-900 dark:to-purple-950/60 border border-purple-100 dark:border-slate-800 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#C2185B]">Ashtakoota Score</span>
              <h3 className="text-2xl font-black text-slate-900 dark:text-white mt-1">{result.verdict}</h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 max-w-md mt-2 leading-relaxed">
                {result.summary}
              </p>
            </div>

            <div className="text-center p-6 rounded-2xl bg-white dark:bg-slate-800 border border-purple-200 dark:border-slate-700 shadow-md shrink-0">
              <span className="text-5xl font-black text-[#C2185B]">{result.totalGunas}</span>
              <span className="text-sm font-bold text-slate-400 block mt-1">/ 36 Gunas</span>
            </div>
          </div>

          {/* 8 Kootas Breakdown Table */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-lg space-y-4">
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">Detailed 8 Koota Score Breakdown</h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {Object.entries(result.categoryScores).map(([key, koota]) => (
                <div key={key} className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/60 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-200 block">{koota.name}</span>
                    <span className="text-[10px] text-slate-400">Points obtained: {koota.score} / {koota.max}</span>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-bold text-xs">
                    {koota.score} Pts
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
