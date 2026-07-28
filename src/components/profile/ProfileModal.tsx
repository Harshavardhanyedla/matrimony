import React, { useState } from 'react';
import { 
  X, 
  ShieldCheck, 
  Heart, 
  MessageCircle, 
  Video, 
  Sparkles, 
  Share2, 
  Ban, 
  Flag, 
  User, 
  BookOpen, 
  Users, 
  Coffee, 
  MapPin, 
  Sliders, 
  CheckCircle,
  Briefcase,
  Calendar,
  Lock
} from 'lucide-react';
import { UserProfile } from '../../types';
import { calculateCompatibilityScore, calculateKundaliGunaMilan } from '../../lib/ai-engine';

interface ProfileModalProps {
  profile: UserProfile | null;
  currentUser: UserProfile;
  onClose: () => void;
  onSendInterest: (profile: UserProfile) => void;
  onStartChat: (profile: UserProfile) => void;
  onRequestVideoCall: (profile: UserProfile) => void;
  onShortlist: (profile: UserProfile) => void;
  onBlock: (profile: UserProfile) => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({
  profile,
  currentUser,
  onClose,
  onSendInterest,
  onStartChat,
  onRequestVideoCall,
  onShortlist,
  onBlock
}) => {
  const [selectedPhotoIdx, setSelectedPhotoIdx] = useState(0);
  const [activeTab, setActiveTab] = useState<'about' | 'education' | 'family' | 'lifestyle' | 'preferences' | 'horoscope'>('about');

  if (!profile) return null;

  const compat = calculateCompatibilityScore(currentUser, profile);
  const kundali = calculateKundaliGunaMilan(
    profile.horoscope?.rashi || 'Simha',
    profile.horoscope?.nakshatra || 'Magha',
    currentUser.horoscope?.rashi || 'Kanya',
    currentUser.horoscope?.nakshatra || 'Hasta'
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Header toolbar */}
        <div className="px-6 py-4 bg-slate-50 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-700/80 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-black text-slate-900 dark:text-white">{profile.name}</h3>
            {profile.isVerified && (
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 text-[10px] font-bold flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> ID Verified
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onShortlist(profile)}
              className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300"
              title="Shortlist Profile"
            >
              <Heart className="w-4 h-4" />
            </button>
            <button
              onClick={() => onBlock(profile)}
              className="p-2 rounded-full hover:bg-rose-100 dark:hover:bg-rose-950 text-rose-600"
              title="Block Profile"
            >
              <Ban className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-slate-200 dark:bg-slate-800 hover:bg-rose-600 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-8">
          
          {/* Top Gallery & Compatibility Card Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Gallery Column */}
            <div className="space-y-3">
              <div className="relative rounded-2xl overflow-hidden aspect-4/3 border border-slate-200 shadow-md">
                <img
                  src={profile.photos[selectedPhotoIdx] || profile.photos[0]}
                  alt={profile.name}
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/60 text-white text-xs font-bold backdrop-blur-xs">
                  Photo {selectedPhotoIdx + 1} of {profile.photos.length}
                </span>
              </div>

              {/* Thumbnails */}
              <div className="flex gap-2">
                {profile.photos.map((url, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedPhotoIdx(i)}
                    className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all ${
                      selectedPhotoIdx === i ? 'border-[#C2185B] scale-105 shadow-md' : 'border-transparent opacity-70'
                    }`}
                  >
                    <img src={url} alt="thumbnail" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* AI Compatibility Score Card */}
            <div className="p-6 rounded-3xl bg-gradient-to-br from-rose-50 to-purple-50 dark:from-slate-800 dark:to-purple-950/40 border border-rose-100 dark:border-slate-700 space-y-4 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-[#C2185B] flex items-center gap-1">
                    <Sparkles className="w-4 h-4" /> AI Compatibility Engine
                  </span>
                  <span className="text-2xl font-black text-[#C2185B]">
                    {compat.totalScore}% Match
                  </span>
                </div>

                <div className="space-y-2 mt-4">
                  <div className="flex justify-between text-xs font-semibold">
                    <span>Religion & Community Match</span>
                    <span className="text-emerald-600">{compat.religionScore}%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                    <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${compat.religionScore}%` }} />
                  </div>

                  <div className="flex justify-between text-xs font-semibold">
                    <span>Education & Career Match</span>
                    <span className="text-purple-600">{compat.educationScore}%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                    <div className="h-full bg-purple-600 rounded-full" style={{ width: `${compat.educationScore}%` }} />
                  </div>

                  <div className="flex justify-between text-xs font-semibold">
                    <span>Location & Lifestyle Match</span>
                    <span className="text-rose-600">{compat.lifestyleScore}%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                    <div className="h-full bg-rose-500 rounded-full" style={{ width: `${compat.lifestyleScore}%` }} />
                  </div>
                </div>
              </div>

              {/* Match reasons pills */}
              <div className="pt-3 border-t border-rose-200/50 dark:border-slate-700">
                <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-1">Key Match Highlights:</span>
                <div className="flex flex-wrap gap-1.5">
                  {compat.matchReasons.map((reason, i) => (
                    <span key={i} className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-800">
                      ✓ {reason}
                    </span>
                  ))}
                </div>
              </div>

            </div>

          </div>

          {/* Profile Navigation Tabs */}
          <div className="space-y-4">
            <div className="flex border-b border-slate-200 dark:border-slate-800 overflow-x-auto gap-2">
              {[
                { id: 'about', label: 'About Me' },
                { id: 'education', label: 'Education & Career' },
                { id: 'family', label: 'Family Details' },
                { id: 'lifestyle', label: 'Lifestyle' },
                { id: 'preferences', label: 'Partner Expectations' },
                { id: 'horoscope', label: 'Kundali Matching (Astrology)' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`pb-3 px-4 text-xs font-bold border-b-2 whitespace-nowrap transition-all ${
                    activeTab === tab.id
                      ? 'border-[#C2185B] text-[#C2185B]'
                      : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab Contents */}
            <div className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-slate-200/60 dark:border-slate-700 text-xs">
              
              {activeTab === 'about' && (
                <div className="space-y-4">
                  <p className="text-sm text-slate-700 dark:text-slate-300 italic leading-relaxed">
                    "{profile.bio}"
                  </p>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2">
                    <div><span className="font-semibold text-slate-400">Age:</span> {profile.age} yrs</div>
                    <div><span className="font-semibold text-slate-400">Height:</span> {profile.height}</div>
                    <div><span className="font-semibold text-slate-400">Marital Status:</span> {profile.maritalStatus}</div>
                    <div><span className="font-semibold text-slate-400">Religion:</span> {profile.religion}</div>
                    <div><span className="font-semibold text-slate-400">Caste:</span> {profile.caste}</div>
                    <div><span className="font-semibold text-slate-400">Mother Tongue:</span> {profile.motherTongue}</div>
                    <div><span className="font-semibold text-slate-400">Manglik:</span> {profile.manglik}</div>
                    <div><span className="font-semibold text-slate-400">Gothra:</span> {profile.gothra || 'N/A'}</div>
                  </div>
                </div>
              )}

              {activeTab === 'education' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div><span className="font-semibold text-slate-400">Highest Degree:</span> {profile.qualification}</div>
                  <div><span className="font-semibold text-slate-400">College:</span> {profile.college}</div>
                  <div><span className="font-semibold text-slate-400">Occupation:</span> {profile.occupation}</div>
                  <div><span className="font-semibold text-slate-400">Company:</span> {profile.company}</div>
                  <div><span className="font-semibold text-slate-400">Annual Income:</span> {profile.annualIncome}</div>
                </div>
              )}

              {activeTab === 'family' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div><span className="font-semibold text-slate-400">Father's Occupation:</span> {profile.fatherOccupation}</div>
                  <div><span className="font-semibold text-slate-400">Mother's Occupation:</span> {profile.motherOccupation}</div>
                  <div><span className="font-semibold text-slate-400">Brothers / Sisters:</span> {profile.brothers} Brother(s), {profile.sisters} Sister(s)</div>
                  <div><span className="font-semibold text-slate-400">Family Type:</span> {profile.familyType} Family</div>
                  <div><span className="font-semibold text-slate-400">Family Status:</span> {profile.familyStatus}</div>
                </div>
              )}

              {activeTab === 'lifestyle' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div><span className="font-semibold text-slate-400">Diet:</span> {profile.diet}</div>
                  <div><span className="font-semibold text-slate-400">Smoking:</span> {profile.smoking}</div>
                  <div><span className="font-semibold text-slate-400">Drinking:</span> {profile.drinking}</div>
                  <div><span className="font-semibold text-slate-400">Hobbies:</span> {profile.hobbies.join(', ')}</div>
                  <div><span className="font-semibold text-slate-400">Languages Spoken:</span> {profile.languages.join(', ')}</div>
                </div>
              )}

              {activeTab === 'horoscope' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 rounded-xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200">
                    <div>
                      <h4 className="font-bold text-slate-900 dark:text-white">Kundali Guna Milan Match</h4>
                      <p className="text-xs text-purple-700 dark:text-purple-300 font-semibold">{kundali.verdict}</p>
                    </div>
                    <span className="text-3xl font-black text-purple-600">{kundali.totalGunas} / 36</span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400">{kundali.summary}</p>
                </div>
              )}

            </div>
          </div>

        </div>

        {/* Fixed Footer Actions */}
        <div className="p-4 bg-slate-50 dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between gap-3">
          <button
            onClick={() => onSendInterest(profile)}
            className="flex-1 py-3 rounded-xl bg-rose-50 dark:bg-rose-950 text-[#C2185B] font-bold text-xs flex items-center justify-center gap-1.5"
          >
            <Heart className="w-4 h-4 fill-[#C2185B]" />
            <span>Send Interest</span>
          </button>

          <button
            onClick={() => onStartChat(profile)}
            className="flex-1 py-3 rounded-xl bg-gradient-to-r from-[#C2185B] to-[#6A1B9A] text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Start Chat</span>
          </button>

          <button
            onClick={() => onRequestVideoCall(profile)}
            className="flex-1 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md"
          >
            <Video className="w-4 h-4" />
            <span>Video Call</span>
          </button>
        </div>

      </div>
    </div>
  );
};
