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
  Crown,
  User,
  X
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
  const [searchQuery, setSearchQuery] = useState('');

  // Filters State
  const [filters, setFilters] = useState({
    gender: 'All', // 'All' | 'Female' | 'Male'
    minAge: 20,
    maxAge: 40,
    religion: '',
    caste: '',
    motherTongue: '',
    education: '',
    profession: '',
    maritalStatus: '',
    diet: '',
    manglik: '',
    isVerifiedOnly: false,
    isPremiumOnly: false,
    isOnlineOnly: false,
    sortBy: 'compatibility' // 'compatibility' | 'newest' | 'relevance' | 'lastActive'
  });

  // Filter profiles dynamically
  const filteredProfiles = allProfiles.filter((p) => {
    // 1. Text Search Query (Name, City, State, Occupation, Religion, Caste, Bio)
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchText = `${p.name} ${p.city} ${p.state} ${p.country} ${p.occupation} ${p.company} ${p.religion} ${p.caste} ${p.qualification} ${p.bio}`.toLowerCase();
      if (!matchText.includes(q)) return false;
    }

    // 2. Gender
    if (filters.gender !== 'All' && p.gender !== filters.gender) return false;

    // 3. Religion
    if (filters.religion && p.religion.toLowerCase() !== filters.religion.toLowerCase()) return false;

    // 4. Mother Tongue
    if (filters.motherTongue && p.motherTongue.toLowerCase() !== filters.motherTongue.toLowerCase()) return false;

    // 5. Education
    if (filters.education && !p.qualification.toLowerCase().includes(filters.education.toLowerCase())) return false;

    // 6. Profession
    if (filters.profession && !p.occupation.toLowerCase().includes(filters.profession.toLowerCase())) return false;

    // 7. Marital Status
    if (filters.maritalStatus && p.maritalStatus !== filters.maritalStatus) return false;

    // 8. Diet
    if (filters.diet && p.diet !== filters.diet) return false;

    // 9. Manglik
    if (filters.manglik && p.manglik !== filters.manglik) return false;

    // 10. Badges
    if (filters.isVerifiedOnly && !p.isVerified) return false;
    if (filters.isPremiumOnly && !p.isPremium) return false;
    if (filters.isOnlineOnly && !p.isOnline) return false;

    // 11. Age Range
    if (p.age < filters.minAge || p.age > filters.maxAge) return false;

    return true;
  });

  // Sort profiles
  const sortedProfiles = [...filteredProfiles].sort((a, b) => {
    if (filters.sortBy === 'compatibility') {
      const scoreA = calculateCompatibilityScore(currentUser, a).totalScore;
      const scoreB = calculateCompatibilityScore(currentUser, b).totalScore;
      return scoreB - scoreA;
    } else if (filters.sortBy === 'newest') {
      return b.id.localeCompare(a.id);
    }
    return 0;
  });

  const resetAllFilters = () => {
    setSearchQuery('');
    setFilters({
      gender: 'All',
      minAge: 18,
      maxAge: 50,
      religion: '',
      caste: '',
      motherTongue: '',
      education: '',
      profession: '',
      maritalStatus: '',
      diet: '',
      manglik: '',
      isVerifiedOnly: false,
      isPremiumOnly: false,
      isOnlineOnly: false,
      sortBy: 'compatibility'
    });
  };

  return (
    <div className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
      
      {/* Search Header Banner */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-rose-100 dark:border-slate-800 shadow-xl space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#C2185B]">Match Discovery Engine</span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-0.5">
              Explore Verified Profiles ({sortedProfiles.length} Results)
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Filtered by AI compatibility matching algorithm & authentic verification criteria.
            </p>
          </div>

          {/* Gender Filter Pills */}
          <div className="flex bg-slate-100 dark:bg-slate-800 p-1.5 rounded-full border border-slate-200 dark:border-slate-700 self-start md:self-auto">
            {(['All', 'Female', 'Male'] as const).map((g) => (
              <button
                key={g}
                onClick={() => setFilters({ ...filters, gender: g })}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                  filters.gender === g
                    ? 'bg-gradient-to-r from-[#C2185B] to-[#6A1B9A] text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-300 hover:text-[#C2185B]'
                }`}
              >
                {g === 'Female' ? 'Brides (Female)' : g === 'Male' ? 'Grooms (Male)' : 'All Profiles'}
              </button>
            ))}
          </div>
        </div>

        {/* Quick Instant Search Bar */}
        <div className="relative">
          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-3.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search profiles by Name (e.g. Rashmika, Pooja, Mahesh), City, Profession, or Religion..."
            className="w-full pl-12 pr-10 py-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-800 dark:text-white focus:ring-2 focus:ring-[#C2185B] focus:outline-none shadow-sm"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-3 text-slate-400 hover:text-slate-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Toolbar Controls Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200 dark:border-slate-800">
        
        {/* Active Filter Badges */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="font-bold text-slate-500">Active Filters:</span>
          {filters.gender !== 'All' && (
            <span className="px-2.5 py-0.5 rounded-full bg-rose-100 dark:bg-rose-950 text-[#C2185B] text-[11px] font-bold">
              {filters.gender}
            </span>
          )}
          {filters.religion && (
            <span className="px-2.5 py-0.5 rounded-full bg-purple-100 dark:bg-purple-950 text-purple-600 text-[11px] font-bold">
              {filters.religion}
            </span>
          )}
          {filters.motherTongue && (
            <span className="px-2.5 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-600 text-[11px] font-bold">
              {filters.motherTongue}
            </span>
          )}
          {filters.isVerifiedOnly && (
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 text-[11px] font-bold">
              Verified Only
            </span>
          )}
          {searchQuery && (
            <span className="px-2.5 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-600 text-[11px] font-bold">
              "{searchQuery}"
            </span>
          )}
          <button
            onClick={resetAllFilters}
            className="text-[11px] font-bold text-[#C2185B] hover:underline ml-1"
          >
            Clear Filters
          </button>
        </div>

        <div className="flex items-center gap-3">
          {/* Mobile Filter toggle */}
          <button
            onClick={() => setShowMobileFilters(!showMobileFilters)}
            className="lg:hidden px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-white text-xs font-bold flex items-center gap-1.5"
          >
            <SlidersHorizontal className="w-4 h-4 text-[#C2185B]" />
            <span>All Filters</span>
          </button>

          {/* Sort By Dropdown */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 font-medium hidden sm:inline">Sort By:</span>
            <select
              value={filters.sortBy}
              onChange={(e) => setFilters({ ...filters, sortBy: e.target.value as any })}
              className="px-3 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-800 dark:text-white focus:ring-2 focus:ring-[#C2185B]"
            >
              <option value="compatibility">AI Match Score %</option>
              <option value="relevance">Relevance</option>
              <option value="newest">Newest Profiles</option>
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
        <div className={`lg:block ${showMobileFilters ? 'block' : 'hidden'} space-y-5 bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-lg h-fit sticky top-24`}>
          <div className="flex items-center justify-between border-b pb-3">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-[#C2185B]" />
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">Advanced Search Filters</h3>
            </div>
            <button
              onClick={resetAllFilters}
              className="text-[11px] text-[#C2185B] font-bold hover:underline"
            >
              Reset
            </button>
          </div>

          {/* Filter: Age Range */}
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

          {/* Filter: Religion */}
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

          {/* Filter: Mother Tongue */}
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

          {/* Filter: Marital Status */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
              Marital Status
            </label>
            <select
              value={filters.maritalStatus}
              onChange={(e) => setFilters({ ...filters, maritalStatus: e.target.value })}
              className="w-full p-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-800 text-slate-800 dark:text-white"
            >
              <option value="">All Marital Statuses</option>
              <option value="Never Married">Never Married</option>
              <option value="Divorced">Divorced</option>
              <option value="Widowed">Widowed</option>
            </select>
          </div>

          {/* Filter: Diet Preference */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
              Diet Preference
            </label>
            <select
              value={filters.diet}
              onChange={(e) => setFilters({ ...filters, diet: e.target.value })}
              className="w-full p-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-800 text-slate-800 dark:text-white"
            >
              <option value="">All Diets</option>
              <option value="Vegetarian">Vegetarian</option>
              <option value="Non-Vegetarian">Non-Vegetarian</option>
              <option value="Eggetarian">Eggetarian</option>
              <option value="Vegan">Vegan</option>
            </select>
          </div>

          {/* Quick Checkbox Badges */}
          <div className="space-y-3 pt-3 border-t border-slate-100 dark:border-slate-800">
            <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-slate-700 dark:text-slate-300">
              <input
                type="checkbox"
                checked={filters.isVerifiedOnly}
                onChange={(e) => setFilters({ ...filters, isVerifiedOnly: e.target.checked })}
                className="w-4 h-4 rounded text-[#C2185B] focus:ring-[#C2185B]"
              />
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>Govt ID Verified Only</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-slate-700 dark:text-slate-300">
              <input
                type="checkbox"
                checked={filters.isPremiumOnly}
                onChange={(e) => setFilters({ ...filters, isPremiumOnly: e.target.checked })}
                className="w-4 h-4 rounded text-[#C2185B] focus:ring-[#C2185B]"
              />
              <Crown className="w-4 h-4 text-amber-500" />
              <span>VIP Members Only</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-slate-700 dark:text-slate-300">
              <input
                type="checkbox"
                checked={filters.isOnlineOnly}
                onChange={(e) => setFilters({ ...filters, isOnlineOnly: e.target.checked })}
                className="w-4 h-4 rounded text-[#C2185B] focus:ring-[#C2185B]"
              />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>Online Now Only</span>
            </label>
          </div>

        </div>

        {/* PROFILE RESULTS */}
        <div className="lg:col-span-3">
          {sortedProfiles.length === 0 ? (
            <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 space-y-3">
              <Search className="w-12 h-12 text-slate-300 mx-auto" />
              <h3 className="text-lg font-bold text-slate-800 dark:text-white">No Matching Profiles Found</h3>
              <p className="text-xs text-slate-500">Try relaxing your search query or reset filters to explore more profiles.</p>
              <button
                onClick={resetAllFilters}
                className="px-6 py-2.5 rounded-full bg-[#C2185B] text-white font-bold text-xs shadow-md"
              >
                Reset All Filters
              </button>
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
                      <div className="relative h-64 overflow-hidden">
                        <img
                          src={profile.photos[0]}
                          alt={profile.name}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                        
                        {profile.isOnline && (
                          <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-emerald-500/90 text-white text-[10px] font-bold flex items-center gap-1 backdrop-blur-xs">
                            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                            Online
                          </span>
                        )}

                        <span className="absolute top-3 right-3 px-3 py-1 rounded-full bg-gradient-to-r from-[#C2185B] to-[#6A1B9A] text-white text-xs font-black shadow-md flex items-center gap-1">
                          <Sparkles className="w-3 h-3 text-amber-300" />
                          {compat.totalScore}% Match
                        </span>

                        <div className="absolute bottom-3 left-3 text-white">
                          <div className="flex items-center gap-1.5">
                            <h3 className="text-lg font-bold truncate">{profile.name}</h3>
                            {profile.isVerified && (
                              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                            )}
                          </div>
                          <p className="text-xs text-rose-200 font-medium">
                            {profile.age} yrs • {profile.height} • {profile.religion}
                          </p>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-5 space-y-2 text-xs text-slate-600 dark:text-slate-300">
                        <div className="flex items-center gap-2">
                          <Briefcase className="w-3.5 h-3.5 text-[#C2185B] shrink-0" />
                          <span className="truncate font-semibold">{profile.occupation} ({profile.annualIncome})</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-3.5 h-3.5 text-purple-600 shrink-0" />
                          <span>{profile.city}, {profile.state}</span>
                        </div>
                        <p className="line-clamp-2 text-[11px] text-slate-500 dark:text-slate-400 italic pt-2 border-t border-slate-100 dark:border-slate-700">
                          "{profile.bio}"
                        </p>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="p-5 pt-0 space-y-2">
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          onClick={() => onSendInterest(profile)}
                          className="py-2 rounded-xl bg-rose-50 dark:bg-rose-950/40 text-[#C2185B] dark:text-rose-300 font-bold text-xs hover:bg-rose-100 flex items-center justify-center gap-1"
                        >
                          <Heart className="w-3.5 h-3.5" />
                          <span>Interest</span>
                        </button>
                        <button
                          onClick={() => onStartChat(profile)}
                          className="py-2 rounded-xl bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-300 font-bold text-xs hover:bg-purple-100 flex items-center justify-center gap-1"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                          <span>Chat</span>
                        </button>
                      </div>

                      <button
                        onClick={() => onSelectProfile(profile)}
                        className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#C2185B] to-[#6A1B9A] text-white font-bold text-xs shadow-sm hover:opacity-95"
                      >
                        View Full Profile
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
