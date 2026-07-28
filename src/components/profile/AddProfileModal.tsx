import React, { useState } from 'react';
import { X, Sparkles, Upload, ShieldCheck, Check, Camera, User, BookOpen, MapPin, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';
import { UserProfile } from '../../types';
import { generateAIBio } from '../../lib/ai-engine';

interface AddProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddProfile: (newProfile: UserProfile) => void;
}

export const AddProfileModal: React.FC<AddProfileModalProps> = ({ isOpen, onClose, onAddProfile }) => {
  const [formData, setFormData] = useState({
    name: '',
    gender: 'Female' as 'Female' | 'Male',
    age: 25,
    dob: '2000-01-01',
    height: "5'6\"",
    heightCm: 168,
    weight: '58 kg',
    complexion: 'Fair',
    maritalStatus: 'Never Married',
    religion: 'Hindu',
    caste: 'Brahmin',
    subCaste: '',
    motherTongue: 'Telugu',
    gothra: '',
    manglik: 'No' as 'No' | 'Yes' | 'Don\'t Know',
    disability: 'None' as 'None' | 'Physical' | 'Other',
    qualification: 'B.Tech / M.Tech',
    college: 'IIT Hyderabad',
    occupation: 'Software Engineer',
    company: 'Tech Corp',
    annualIncome: '₹20L - ₹25L',
    fatherOccupation: 'Business Owner',
    motherOccupation: 'Homemaker',
    brothers: 1,
    sisters: 0,
    familyType: 'Nuclear' as 'Nuclear' | 'Joint',
    familyStatus: 'Upper Middle Class' as 'Upper Middle Class' | 'Middle Class' | 'High Class' | 'Affluent',
    diet: 'Vegetarian' as 'Vegetarian' | 'Non-Vegetarian' | 'Eggetarian' | 'Vegan',
    smoking: 'No' as 'No' | 'Occasionally' | 'Yes',
    drinking: 'No' as 'No' | 'Socially' | 'Yes',
    hobbies: ['Music', 'Reading', 'Travel'],
    languages: ['English', 'Telugu', 'Hindi'],
    country: 'India',
    state: 'Telangana',
    city: 'Hyderabad',
    photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
    bio: ''
  });

  const [aiBioTone, setAiBioTone] = useState<'Romantic' | 'Professional' | 'Traditional' | 'Modern'>('Romantic');
  const [isGeneratingBio, setIsGeneratingBio] = useState(false);

  if (!isOpen) return null;

  const handleGenerateBio = () => {
    setIsGeneratingBio(true);
    setTimeout(() => {
      const bioText = generateAIBio({
        name: formData.name || 'Friend',
        profession: formData.occupation || 'Professional',
        hobbies: formData.hobbies,
        diet: formData.diet,
        religion: formData.religion,
        tone: aiBioTone
      });
      setFormData((prev) => ({ ...prev, bio: bioText }));
      setIsGeneratingBio(false);
    }, 600);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    const newProfile: UserProfile = {
      id: `usr-${Date.now()}`,
      name: formData.name.trim(),
      gender: formData.gender,
      age: Number(formData.age),
      dob: formData.dob,
      height: formData.height,
      heightCm: formData.heightCm,
      weight: formData.weight,
      complexion: formData.complexion,
      maritalStatus: formData.maritalStatus,
      religion: formData.religion,
      caste: formData.caste,
      subCaste: formData.subCaste,
      motherTongue: formData.motherTongue,
      gothra: formData.gothra,
      manglik: formData.manglik,
      disability: formData.disability,
      qualification: formData.qualification,
      college: formData.college,
      occupation: formData.occupation,
      company: formData.company,
      annualIncome: formData.annualIncome,
      fatherOccupation: formData.fatherOccupation,
      motherOccupation: formData.motherOccupation,
      brothers: formData.brothers,
      sisters: formData.sisters,
      familyType: formData.familyType,
      familyStatus: formData.familyStatus,
      diet: formData.diet,
      smoking: formData.smoking,
      drinking: formData.drinking,
      hobbies: formData.hobbies,
      languages: formData.languages,
      country: formData.country,
      state: formData.state,
      city: formData.city,
      partnerPreferences: {
        minAge: 22,
        maxAge: 32,
        minHeight: "5'2\"",
        maxHeight: "6'2\"",
        religions: [formData.religion],
        castes: ['Open to All'],
        education: ['B.Tech / M.Tech', 'MBA', 'MBBS'],
        occupations: ['Engineer', 'Doctor', 'Manager'],
        minIncome: '₹15L+',
        locations: [formData.city, 'Hyderabad', 'Bangalore'],
        maritalStatus: ['Never Married'],
        diet: [formData.diet]
      },
      photos: [formData.photoUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80'],
      bio: formData.bio || `Warm, family-oriented ${formData.occupation} based in ${formData.city}. Looking for an educated, compatible partner.`,
      isVerified: true,
      isPremium: true,
      isOnline: true,
      lastActive: 'Just now',
      phone: '+91 98765 43210',
      email: `${formData.name.toLowerCase().replace(/\s+/g, '')}@soulmatch.com`
    };

    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.6 }
    });

    onAddProfile(newProfile);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Banner Header */}
        <div className="bg-gradient-to-r from-[#C2185B] via-[#D81B60] to-[#6A1B9A] p-6 text-white flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-xs font-bold">
                + Add Profile
              </span>
              <h3 className="text-xl font-black">Publish New Profile</h3>
            </div>
            <p className="text-xs text-rose-100 mt-1">Create and list a bride or groom profile on SoulMatch</p>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto flex-1 space-y-6">
          
          {/* Section 1: Basic & Photo */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-[#C2185B] uppercase tracking-wider border-b pb-1">
              1. Basic Profile Details
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Samantha Ruth / Vijay"
                  className="w-full p-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Profile Gender *
                </label>
                <select
                  value={formData.gender}
                  onChange={(e) => setFormData({ ...formData, gender: e.target.value as any })}
                  className="w-full p-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-white"
                >
                  <option value="Female">Female (Bride)</option>
                  <option value="Male">Male (Groom)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Age (Years) *
                </label>
                <input
                  type="number"
                  required
                  value={formData.age}
                  onChange={(e) => setFormData({ ...formData, age: parseInt(e.target.value) || 25 })}
                  className="w-full p-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Profile Photo URL *
              </label>
              <input
                type="url"
                required
                value={formData.photoUrl}
                onChange={(e) => setFormData({ ...formData, photoUrl: e.target.value })}
                placeholder="https://images.unsplash.com/photo-..."
                className="w-full p-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-white"
              />
              {formData.photoUrl && (
                <div className="mt-2 flex items-center gap-3">
                  <img src={formData.photoUrl} alt="Preview" className="w-12 h-12 rounded-xl object-cover ring-2 ring-[#C2185B]" />
                  <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" /> Photo Preview Loaded
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Section 2: Religion, Caste & Location */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-[#C2185B] uppercase tracking-wider border-b pb-1">
              2. Cultural & Location Details
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Religion</label>
                <select
                  value={formData.religion}
                  onChange={(e) => setFormData({ ...formData, religion: e.target.value })}
                  className="w-full p-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-white"
                >
                  <option value="Hindu">Hindu</option>
                  <option value="Muslim">Muslim</option>
                  <option value="Sikh">Sikh</option>
                  <option value="Christian">Christian</option>
                  <option value="Jain">Jain</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Caste / Community</label>
                <input
                  type="text"
                  value={formData.caste}
                  onChange={(e) => setFormData({ ...formData, caste: e.target.value })}
                  placeholder="e.g. Brahmin / Kamma / Reddy"
                  className="w-full p-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Mother Tongue</label>
                <input
                  type="text"
                  value={formData.motherTongue}
                  onChange={(e) => setFormData({ ...formData, motherTongue: e.target.value })}
                  placeholder="e.g. Telugu / Hindi / Tamil"
                  className="w-full p-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">City</label>
                <input
                  type="text"
                  required
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  placeholder="e.g. Hyderabad / Mumbai / Bangalore"
                  className="w-full p-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">State</label>
                <input
                  type="text"
                  value={formData.state}
                  onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                  placeholder="e.g. Telangana / Maharashtra"
                  className="w-full p-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Country</label>
                <input
                  type="text"
                  value={formData.country}
                  onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                  placeholder="e.g. India / USA"
                  className="w-full p-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-white"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Education & Occupation */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-[#C2185B] uppercase tracking-wider border-b pb-1">
              3. Education & Profession
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Qualification</label>
                <input
                  type="text"
                  value={formData.qualification}
                  onChange={(e) => setFormData({ ...formData, qualification: e.target.value })}
                  placeholder="e.g. B.Tech / M.Tech / MBA"
                  className="w-full p-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Occupation / Role</label>
                <input
                  type="text"
                  value={formData.occupation}
                  onChange={(e) => setFormData({ ...formData, occupation: e.target.value })}
                  placeholder="e.g. Software Engineer / Doctor"
                  className="w-full p-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Annual Income</label>
                <select
                  value={formData.annualIncome}
                  onChange={(e) => setFormData({ ...formData, annualIncome: e.target.value })}
                  className="w-full p-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-white"
                >
                  <option value="₹10L - ₹15L">₹10L - ₹15L</option>
                  <option value="₹15L - ₹25L">₹15L - ₹25L</option>
                  <option value="₹25L - ₹40L">₹25L - ₹40L</option>
                  <option value="₹40L+">₹40L+</option>
                </select>
              </div>
            </div>
          </div>

          {/* Section 4: AI Bio Generator */}
          <div className="p-4 rounded-2xl bg-gradient-to-br from-purple-50 to-rose-50 dark:from-slate-800 dark:to-purple-950/40 border border-purple-100 dark:border-slate-700 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-800 dark:text-white flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-purple-600" />
                AI Smart Bio Generator
              </span>

              <div className="flex gap-1 bg-white dark:bg-slate-900 p-1 rounded-lg border">
                {(['Romantic', 'Professional', 'Traditional', 'Modern'] as const).map((tone) => (
                  <button
                    key={tone}
                    type="button"
                    onClick={() => setAiBioTone(tone)}
                    className={`px-2 py-0.5 text-[10px] font-bold rounded-md transition-colors ${
                      aiBioTone === tone ? 'bg-[#C2185B] text-white' : 'text-slate-600'
                    }`}
                  >
                    {tone}
                  </button>
                ))}
              </div>
            </div>

            <textarea
              rows={3}
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              placeholder="Click Generate to auto-write a beautiful matrimony bio..."
              className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs text-slate-800 dark:text-white focus:outline-none"
            />

            <button
              type="button"
              onClick={handleGenerateBio}
              disabled={isGeneratingBio}
              className="w-full py-2 bg-gradient-to-r from-purple-600 to-[#C2185B] text-white text-xs font-bold rounded-xl shadow-md flex items-center justify-center gap-2"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{isGeneratingBio ? 'AI Writing Bio...' : 'Generate AI Bio in 1-Click'}</span>
            </button>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#C2185B] via-[#D81B60] to-[#6A1B9A] text-white font-bold text-xs shadow-xl hover:opacity-95"
          >
            Publish Profile Live 🎉
          </button>

        </form>

      </div>
    </div>
  );
};
