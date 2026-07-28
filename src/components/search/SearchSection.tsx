import React, { useState } from 'react';
import { 
  Filter, 
  Search, 
  Sparkles, 
  ShieldCheck, 
  Grid, 
  List, 
  Heart, 
  MessageCircle, 
  MapPin, 
  Briefcase, 
  Check, 
  SlidersHorizontal,
  ChevronDown
} from 'lucide-react';
import { UserProfile, SearchFilters } from '../../types';
import { calculateCompatibilityScore } from '../../lib/ai-engine';

interface SearchSectionProps {
  allProfiles: UserProfile[];
  currentUser: UserProfile;
  onSelectProfile: (profile: UserProfile) => void;
  onSendInterest: (profile: UserProfile) => void;
  onStartChat: (profile: UserProfile) => void;
}

export const SearchSection: React.FC<SearchSectionProps> = ({
  allProfiles,
  currentUser,
  onSelectProfile,
  onSendInterest,
  onStartChat
}) => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Filters State
  const [filters, setFilters] = useState<SearchFilters>({
    gender: 'Female',
    minAge: 20,
    maxAge: 32,
    minHeight: 150,
    maxHeight: 190,
    religion: '',
    caste: '',
    motherTongue: '',
    education: '',
    profession: '',
    minIncome: '',
    country: '',
    state: '',
    city: '',
    maritalStatus: '',
    diet: '',
    manglik: '',
    isVerifiedOnly: false,
    isPremiumOnly: false,
    isOnlineOnly: false,
    sortBy: 'compatibility'
  });

  // Filter profiles dynamically
  const filteredProfiles = allProfiles.filter((p) => {
    if (filters.religion && p.religion.toLowerCase() !== filters.religion.toLowerCase()) return false;
    if (filters.motherTongue && p.motherTongue.toLowerCase() !== filters.motherTongue.toLowerCase()) return false;
    if (filters.isVerifiedOnly && !p.isVerified) return false;
    if (filters.isOnlineOnly && !p.isOnline) return false;
    if (p.age < filters.minAge || p.age > filters.maxAge) return false;
    return true;
  });

  // Sort profiles
  const sortedProfiles = [...filteredProfiles].sort((a, b) => {
    if (filters.sortBy === 'compatibility') {
      const scoreA = calculateCompatibilityScore(currentUser, a).totalScore;
      const scoreB = calculateCompatibilityScore(currentUser, b).totalScore;
      return scoreB - scoreA;
    }
    return 0;
  });

  return (
    <div className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
      
      {/* Top Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white">
            Find Your Match ({sortedProfiles.length} Profiles Found)
          </h2>
          <p className="text-xs text-slate-500">
            Filtered by AI compatibility matching and verification status
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Mobile Filter toggle */}
          <button
            onClick={() => setShowMobileFilters(!showMobileFilters)}
            className="lg:hidden px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-white text-xs font-bold flex items-center gap-1.5"
          >
            <SlidersHorizontal className="w-4 h-4 text-[#C2185B]" />
            <span>Filters</span>
          </button>

          {/* Sort By Dropdown */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 font-medium hidden sm:inline">Sort By:</span>
            <select
              value={filters.sortBy}
              onChange={(e) => setFilters({ ...filters, sortBy: e.target.value as any })}
              className="px-3 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-800 dark:text-white focus:ring-2 focus:ring-[#C2185B]"
            >
              <option value="compatibility">AI Compatibility Score</option>
              <option value="relevance">Relevance</option>
              <option value="newest">Newest Profiles</option>
              <option value="lastActive">Recently Active</option>
            </select>
          </div>

          {/* Grid vs List View toggle */}
          <div className="hidden sm:flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg transition-colors ${
                viewMode === 'grid' ? 'bg-white dark:bg-slate-700 text-[#C2185B]' : 'text-slate-400'
              }`}
              title="Grid View"
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-lg transition-colors ${
                viewMode === 'list' ? 'bg-white dark:bg-slate-700 text-[#C2185B]' : 'text-slate-400'
              }`}
              title="List View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Layout Grid (Filter Sidebar + Profile Results) */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* FILTER SIDEBAR */}
        <div className={`lg:block ${showMobileFilters ? 'block' : 'hidden'} space-y-6 bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-lg h-fit sticky top-24`}>
          <div className="flex items-center justify-between border-b pb-3">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-[#C2185B]" />
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">Search Filters</h3>
            </div>
            <button
              onClick={() =>
                setFilters({
                  ...filters,
                  religion: '',
                  motherTongue: '',
                  isVerifiedOnly: false,
                  isOnlineOnly: false
                })
              }
              className="text-[11px] text-[#C2185B] font-bold hover:underline"
            >
              Reset All
            </button>
          </div>

          {/* Filter 1: Age Range */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
              Age Range ({filters.minAge} - {filters.maxAge} yrs)
            </label>
            <div className="flex gap-2">
              <input
                type="number"
                value={filters.minAge}
                onChange={(e) => setFilters({ ...filters, minAge: parseInt(e.target.value) || 18 })}
                className="w-1/2 p-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-800"
              />
              <input
                type="number"
                value={filters.maxAge}
                onChange={(e) => setFilters({ ...filters, maxAge: parseInt(e.target.value) || 50 })}
                className="w-1/2 p-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-800"
              />
            </div>
          </div>

          {/* Filter 2: Religion */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
              Religion
            </label>
            <select
              value={filters.religion}
              onChange={(e) => setFilters({ ...filters, religion: e.target.value })}
              className="w-full p-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-800 text-slate-800 dark:text-white"
            >
              <option value="">All Religions</option>
              <option value="Hindu">Hindu</option>
              <option value="Muslim">Muslim</option>
              <option value="Sikh">Sikh</option>
              <option value="Christian">Christian</option>
              <option value="Jain">Jain</option>
            </select>
          </div>

          {/* Filter 3: Mother Tongue */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
              Mother Tongue
            </label>
            <select
              value={filters.motherTongue}
              onChange={(e) => setFilters({ ...filters, motherTongue: e.target.value })}
              className="w-full p-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-800 text-slate-800 dark:text-white"
            >
              <option value="">All Languages</option>
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

          {/* Quick Checkbox Toggles */}
          <div className="space-y-3 pt-3 border-t border-slate-100 dark:border-slate-800">
            <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-slate-700 dark:text-slate-300">
              <input
                type="checkbox"
                checked={filters.isVerifiedOnly}
                onChange={(e) => setFilters({ ...filters, isVerifiedOnly: e.target.checked })}
                className="w-4 h-4 rounded text-[#C2185B] focus:ring-[#C2185B]"
              />
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>Verified Profiles Only</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-slate-700 dark:text-slate-300">
              <input
                type="checkbox"
                checked={filters.isOnlineOnly}
                onChange={(e) => setFilters({ ...filters, isOnlineOnly: e.target.checked })}
                className="w-4 h-4 rounded text-[#C2185B] focus:ring-[#C2185B]"
              />
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>Online Now Only</span>
            </label>
          </div>

        </div>

        {/* PROFILE RESULTS */}
        <div className="lg:col-span-3">
          {sortedProfiles.length === 0 ? (
            <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8">
              <Search className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-slate-800 dark:text-white">No Profiles Found</h3>
              <p className="text-xs text-slate-500 mt-1">Try relaxing your search filters to view more profiles.</p>
            </div>
          ) : (
            <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
              {sortedProfiles.map((profile) => {
                const compat = calculateCompatibilityScore(currentUser, profile);

                return (
                  <div
                    key={profile.id}
                    className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200/80 dark:border-slate-700 overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                  >
                    <div>
                      {/* Photo Header */}
                      <div className="relative h-60 overflow-hidden">
                        <img
                          src={profile.photos[0]}
                          alt={profile.name}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                        
                        <span className="absolute top-3 right-3 px-3 py-1 rounded-full bg-gradient-to-r from-[#C2185B] to-[#6A1B9A] text-white text-xs font-black shadow-md">
                          {compat.totalScore}% Match
                        </span>

                        <div className="absolute bottom-3 left-3 text-white">
                          <h3 className="text-lg font-bold">{profile.name}</h3>
                          <p className="text-xs text-rose-200 font-medium">
                            {profile.age} yrs • {profile.height} • {profile.religion}
                          </p>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-5 space-y-2 text-xs text-slate-600 dark:text-slate-300">
                        <div className="flex items-center gap-2">
                          <Briefcase className="w-3.5 h-3.5 text-[#C2185B]" />
                          <span className="truncate">{profile.occupation} ({profile.annualIncome})</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-3.5 h-3.5 text-purple-600" />
                          <span>{profile.city}, {profile.state}</span>
                        </div>
                        <p className="line-clamp-2 text-[11px] text-slate-500 pt-2 border-t border-slate-100 dark:border-slate-700 italic">
                          "{profile.bio}"
                        </p>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="p-5 pt-0 grid grid-cols-2 gap-2">
                      <button
                        onClick={() => onStartChat(profile)}
                        className="py-2 rounded-xl bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-300 font-bold text-xs"
                      >
                        Chat
                      </button>
                      <button
                        onClick={() => onSelectProfile(profile)}
                        className="py-2 rounded-xl bg-[#C2185B] text-white font-bold text-xs"
                      >
                        View Full
                      </button>
                    </div>

                  </div>
                );
              })}
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
