import React, { useState } from 'react';
import { Heart, ChevronLeft, ChevronRight, Quote, MapPin, Calendar } from 'lucide-react';
import { SuccessStory } from '../../types';

interface SuccessStoriesProps {
  stories: SuccessStory[];
}

export const SuccessStories: React.FC<SuccessStoriesProps> = ({ stories }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? stories.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === stories.length - 1 ? 0 : prev + 1));
  };

  const current = stories[currentIndex] || stories[0];

  return (
    <section className="py-20 bg-gradient-to-b from-slate-50 to-rose-50/40 dark:from-slate-950 dark:to-purple-950/20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[#C2185B]">SoulMatch Real Couples</span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">
            Matched by AI, United for Life
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Discover real love stories of thousands of couples who found their soulmates on SoulMatch.
          </p>
        </div>

        {/* Story Card */}
        <div className="max-w-4xl mx-auto glass-panel rounded-3xl p-6 sm:p-10 shadow-2xl border border-white/80 dark:border-slate-800 relative">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            
            {/* Story Image */}
            <div className="relative rounded-2xl overflow-hidden aspect-4/3 shadow-xl">
              <img
                src={current.image}
                alt={current.names}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
              
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="text-xl font-black">{current.names}</h3>
                <div className="flex items-center gap-3 text-xs text-rose-200 mt-1">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {current.weddingDate}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" />
                    {current.location}
                  </span>
                </div>
              </div>
            </div>

            {/* Story Content */}
            <div className="space-y-6">
              <Quote className="w-12 h-12 text-[#C2185B]/30" />
              
              <p className="text-base sm:text-lg text-slate-800 dark:text-slate-200 font-serif italic leading-relaxed">
                "{current.story}"
              </p>

              <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#C2185B]">
                  <Heart className="w-4 h-4 fill-[#C2185B]" />
                  <span>Verified Success Story</span>
                </div>

                {/* Carousel Controls */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={handlePrev}
                    className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-[#C2185B] hover:text-white transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={handleNext}
                    className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-[#C2185B] hover:text-white transition-colors"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
