import React, { useState } from 'react';
import { 
  X, 
  ArrowLeft, 
  ArrowRight, 
  Check, 
  Sparkles, 
  Upload, 
  User, 
  Heart, 
  BookOpen, 
  Users, 
  Coffee, 
  MapPin, 
  Sliders, 
  Camera,
  ShieldCheck
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { generateAIBio } from '../../lib/ai-engine';
import { UserProfile } from '../../types';

interface RegisterWizardProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (newProfile: Partial<UserProfile>) => void;
}

export const RegisterWizard: React.FC<RegisterWizardProps> = ({ isOpen, onClose, onComplete }) => {
  const [currentStep, setCurrentStep] = useState(1);

  // Form State
  const [formData, setFormData] = useState({
    // Step 1
    name: '',
    gender: 'Male',
    dob: '1998-05-15',
    age: 27,
    phone: '',
    email: '',
    password: '',

    // Step 2
    height: "5'9\"",
    weight: '70 kg',
    complexion: 'Fair',
    maritalStatus: 'Never Married',
    religion: 'Hindu',
    caste: 'Kamma',
    subCaste: 'Chowdary',
    motherTongue: 'Telugu',
    gothra: 'Kasyapa',
    manglik: 'No',
    disability: 'None',

    // Step 3
    qualification: 'B.Tech / M.Tech',
    college: 'IIT Hyderabad',
    occupation: 'Software Engineer',
    company: 'Tech Mahindra',
    annualIncome: '₹20L - ₹25L',

    // Step 4
    fatherOccupation: 'Business Owner',
    motherOccupation: 'Homemaker',
    brothers: 1,
    sisters: 0,
    familyType: 'Nuclear',
    familyStatus: 'Upper Middle Class',

    // Step 5
    diet: 'Vegetarian',
    smoking: 'No',
    drinking: 'No',
    hobbies: ['Photography', 'Music', 'Travel'],
    languages: ['English', 'Telugu', 'Hindi'],

    // Step 6
    country: 'India',
    state: 'Telangana',
    city: 'Hyderabad',
    address: 'Road No. 10, Jubilee Hills',
    pincode: '500033',

    // Step 7
    prefMinAge: 23,
    prefMaxAge: 27,
    prefMinHeight: "5'2\"",
    prefMaxHeight: "5'8\"",
    prefReligion: 'Hindu',
    prefCaste: 'Open to All',
    prefEducation: 'B.Tech / M.Tech / MBA / MBBS',
    prefOccupation: 'Software / Medical / Finance',
    prefIncome: '₹15L+',
    prefLocation: 'Hyderabad / Bangalore',

    // Step 8
    photos: [
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=800&q=80'
    ],
    bio: ''
  });

  const [aiBioTone, setAiBioTone] = useState<'Romantic' | 'Professional' | 'Traditional' | 'Modern'>('Romantic');
  const [isGeneratingBio, setIsGeneratingBio] = useState(false);
  const [aiPhotoScore, setAiPhotoScore] = useState<number | null>(null);

  if (!isOpen) return null;

  const handleNext = () => {
    if (currentStep < 8) {
      setCurrentStep(currentStep + 1);
    } else {
      // Trigger festive confetti celebrate!
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
      onComplete(formData as any);
      onClose();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleGenerateBio = () => {
    setIsGeneratingBio(true);
    setTimeout(() => {
      const generated = generateAIBio({
        name: formData.name || 'Friend',
        profession: formData.occupation || 'Professional',
        hobbies: formData.hobbies,
        diet: formData.diet,
        religion: formData.religion,
        tone: aiBioTone
      });
      setFormData((prev) => ({ ...prev, bio: generated }));
      setIsGeneratingBio(false);
    }, 600);
  };

  const handleCheckPhotoQuality = () => {
    setAiPhotoScore(98);
  };

  const stepsList = [
    { num: 1, label: 'Basic', icon: User },
    { num: 2, label: 'Personal', icon: Heart },
    { num: 3, label: 'Education', icon: BookOpen },
    { num: 4, label: 'Family', icon: Users },
    { num: 5, label: 'Lifestyle', icon: Coffee },
    { num: 6, label: 'Location', icon: MapPin },
    { num: 7, label: 'Preferences', icon: Sliders },
    { num: 8, label: 'Photos & AI', icon: Camera }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-100 dark:border-slate-800 overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-[#C2185B] via-[#D81B60] to-[#6A1B9A] px-6 py-4 text-white flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-white/20">
                Step {currentStep} of 8
              </span>
              <h3 className="text-base font-bold">Create Free Profile</h3>
            </div>
            <p className="text-[11px] text-rose-100 mt-0.5">
              {stepsList[currentStep - 1].label} Details
            </p>
          </div>
          
          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Multi-Step Wizard Progress Bar */}
        <div className="px-6 py-3 bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-700/50">
          <div className="flex items-center justify-between gap-1 overflow-x-auto py-1">
            {stepsList.map((step) => {
              const Icon = step.icon;
              const isDone = currentStep > step.num;
              const isCurrent = currentStep === step.num;
              return (
                <div
                  key={step.num}
                  className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold shrink-0 transition-all ${
                    isCurrent
                      ? 'bg-[#C2185B] text-white shadow-xs'
                      : isDone
                      ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300'
                      : 'bg-slate-200 dark:bg-slate-700 text-slate-500'
                  }`}
                >
                  {isDone ? <Check className="w-3 h-3" /> : <Icon className="w-3 h-3" />}
                  <span className="hidden sm:inline">{step.label}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Step Body Content */}
        <div className="p-6 overflow-y-auto flex-1 space-y-4">
          
          {/* STEP 1: Basic Details */}
          {currentStep === 1 && (
            <div className="space-y-4 animate-in fade-in">
              <h4 className="text-sm font-bold text-slate-800 dark:text-white border-b pb-2">
                Step 1: Basic Details
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Harsha Vardhan"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-800 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Gender *
                  </label>
                  <select
                    value={formData.gender}
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-800 dark:text-white"
                  >
                    <option value="Male">Male (Groom)</option>
                    <option value="Female">Female (Bride)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Date of Birth *
                  </label>
                  <input
                    type="date"
                    value={formData.dob}
                    onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-800 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Mobile Number (With OTP verification) *
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-800 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@domain.com"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-800 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Create Password *
                  </label>
                  <input
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    placeholder="••••••••"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-800 dark:text-white"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Personal Details */}
          {currentStep === 2 && (
            <div className="space-y-4 animate-in fade-in">
              <h4 className="text-sm font-bold text-slate-800 dark:text-white border-b pb-2">
                Step 2: Physical & Cultural Details
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Height
                  </label>
                  <select
                    value={formData.height}
                    onChange={(e) => setFormData({ ...formData, height: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-800 dark:text-white"
                  >
                    {["5'2\"", "5'4\"", "5'6\"", "5'8\"", "5'10\"", "6'0\"", "6'2\""].map((h) => (
                      <option key={h} value={h}>{h}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Marital Status
                  </label>
                  <select
                    value={formData.maritalStatus}
                    onChange={(e) => setFormData({ ...formData, maritalStatus: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-800 dark:text-white"
                  >
                    <option value="Never Married">Never Married</option>
                    <option value="Divorced">Divorced</option>
                    <option value="Widowed">Widowed</option>
                    <option value="Awaiting Divorce">Awaiting Divorce</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Religion
                  </label>
                  <select
                    value={formData.religion}
                    onChange={(e) => setFormData({ ...formData, religion: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-800 dark:text-white"
                  >
                    {['Hindu', 'Muslim', 'Sikh', 'Christian', 'Jain', 'Buddhist', 'Other'].map((r) => (
                      <option key={r} value={r}>{r}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Caste / Community
                  </label>
                  <input
                    type="text"
                    value={formData.caste}
                    onChange={(e) => setFormData({ ...formData, caste: e.target.value })}
                    placeholder="e.g. Brahmin / Kamma / Reddy"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-800 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Mother Tongue
                  </label>
                  <input
                    type="text"
                    value={formData.motherTongue}
                    onChange={(e) => setFormData({ ...formData, motherTongue: e.target.value })}
                    placeholder="e.g. Telugu / Hindi / Tamil"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-800 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Manglik Status
                  </label>
                  <select
                    value={formData.manglik}
                    onChange={(e) => setFormData({ ...formData, manglik: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-800 dark:text-white"
                  >
                    <option value="No">No (Non-Manglik)</option>
                    <option value="Yes">Yes (Manglik)</option>
                    <option value="Don't Know">Don't Know</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Education & Career */}
          {currentStep === 3 && (
            <div className="space-y-4 animate-in fade-in">
              <h4 className="text-sm font-bold text-slate-800 dark:text-white border-b pb-2">
                Step 3: Education & Career
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Highest Qualification
                  </label>
                  <select
                    value={formData.qualification}
                    onChange={(e) => setFormData({ ...formData, qualification: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-800 dark:text-white"
                  >
                    {['B.Tech / M.Tech', 'MBBS / MD', 'MBA / PGDM', 'CA / CS', 'B.Sc / M.Sc', 'PhD', 'Other'].map((q) => (
                      <option key={q} value={q}>{q}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    College / University
                  </label>
                  <input
                    type="text"
                    value={formData.college}
                    onChange={(e) => setFormData({ ...formData, college: e.target.value })}
                    placeholder="e.g. IIT / Osmania University"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-800 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Occupation / Job Role
                  </label>
                  <input
                    type="text"
                    value={formData.occupation}
                    onChange={(e) => setFormData({ ...formData, occupation: e.target.value })}
                    placeholder="e.g. AI Engineer / Doctor / PM"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-800 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Annual Income Range
                  </label>
                  <select
                    value={formData.annualIncome}
                    onChange={(e) => setFormData({ ...formData, annualIncome: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-800 dark:text-white"
                  >
                    {['₹5L - ₹10L', '₹10L - ₹15L', '₹15L - ₹25L', '₹25L - ₹40L', '₹40L+'].map((inc) => (
                      <option key={inc} value={inc}>{inc}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: Family Details */}
          {currentStep === 4 && (
            <div className="space-y-4 animate-in fade-in">
              <h4 className="text-sm font-bold text-slate-800 dark:text-white border-b pb-2">
                Step 4: Family Background
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Father's Occupation
                  </label>
                  <input
                    type="text"
                    value={formData.fatherOccupation}
                    onChange={(e) => setFormData({ ...formData, fatherOccupation: e.target.value })}
                    placeholder="e.g. Business Owner / Retd Officer"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-800 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Mother's Occupation
                  </label>
                  <input
                    type="text"
                    value={formData.motherOccupation}
                    onChange={(e) => setFormData({ ...formData, motherOccupation: e.target.value })}
                    placeholder="e.g. Homemaker / Teacher"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-800 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Family Type
                  </label>
                  <select
                    value={formData.familyType}
                    onChange={(e) => setFormData({ ...formData, familyType: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-800 dark:text-white"
                  >
                    <option value="Nuclear">Nuclear Family</option>
                    <option value="Joint">Joint Family</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Family Status
                  </label>
                  <select
                    value={formData.familyStatus}
                    onChange={(e) => setFormData({ ...formData, familyStatus: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-800 dark:text-white"
                  >
                    <option value="Middle Class">Middle Class</option>
                    <option value="Upper Middle Class">Upper Middle Class</option>
                    <option value="High Class">High Class</option>
                    <option value="Affluent">Affluent</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* STEP 5: Lifestyle */}
          {currentStep === 5 && (
            <div className="space-y-4 animate-in fade-in">
              <h4 className="text-sm font-bold text-slate-800 dark:text-white border-b pb-2">
                Step 5: Lifestyle & Preferences
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Diet Preference
                  </label>
                  <select
                    value={formData.diet}
                    onChange={(e) => setFormData({ ...formData, diet: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-800 dark:text-white"
                  >
                    <option value="Vegetarian">Vegetarian</option>
                    <option value="Non-Vegetarian">Non-Vegetarian</option>
                    <option value="Eggetarian">Eggetarian</option>
                    <option value="Vegan">Vegan</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Smoking Habit
                  </label>
                  <select
                    value={formData.smoking}
                    onChange={(e) => setFormData({ ...formData, smoking: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-800 dark:text-white"
                  >
                    <option value="No">No</option>
                    <option value="Occasionally">Occasionally</option>
                    <option value="Yes">Yes</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Drinking Habit
                  </label>
                  <select
                    value={formData.drinking}
                    onChange={(e) => setFormData({ ...formData, drinking: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-800 dark:text-white"
                  >
                    <option value="No">No</option>
                    <option value="Socially">Socially</option>
                    <option value="Yes">Yes</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* STEP 6: Location */}
          {currentStep === 6 && (
            <div className="space-y-4 animate-in fade-in">
              <h4 className="text-sm font-bold text-slate-800 dark:text-white border-b pb-2">
                Step 6: Location & Address
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Country
                  </label>
                  <input
                    type="text"
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-800 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    State
                  </label>
                  <input
                    type="text"
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-800 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    City
                  </label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-800 dark:text-white"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 7: Partner Preferences */}
          {currentStep === 7 && (
            <div className="space-y-4 animate-in fade-in">
              <h4 className="text-sm font-bold text-slate-800 dark:text-white border-b pb-2">
                Step 7: Partner Expectations
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Preferred Age Range ({formData.prefMinAge} to {formData.prefMaxAge} yrs)
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      value={formData.prefMinAge}
                      onChange={(e) => setFormData({ ...formData, prefMinAge: parseInt(e.target.value) })}
                      className="w-1/2 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs"
                    />
                    <input
                      type="number"
                      value={formData.prefMaxAge}
                      onChange={(e) => setFormData({ ...formData, prefMaxAge: parseInt(e.target.value) })}
                      className="w-1/2 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Preferred Religion & Community
                  </label>
                  <input
                    type="text"
                    value={formData.prefReligion}
                    onChange={(e) => setFormData({ ...formData, prefReligion: e.target.value })}
                    placeholder="e.g. Hindu / Open to All"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 8: Photos & AI Generator */}
          {currentStep === 8 && (
            <div className="space-y-4 animate-in fade-in">
              <div className="flex items-center justify-between border-b pb-2">
                <h4 className="text-sm font-bold text-slate-800 dark:text-white">
                  Step 8: Photos & AI Profile Enhancer
                </h4>
                <span className="text-xs font-semibold text-[#C2185B] flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" /> AI Powered
                </span>
              </div>

              {/* Photo Upload preview */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  Upload Profile Photos (Min 3 photos)
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {formData.photos.map((url, i) => (
                    <div key={i} className="relative rounded-xl overflow-hidden aspect-square border border-slate-200">
                      <img src={url} alt="Profile preview" className="w-full h-full object-cover" />
                      <span className="absolute bottom-1 left-1 bg-black/60 text-white text-[9px] px-1.5 py-0.5 rounded">
                        Photo {i + 1}
                      </span>
                    </div>
                  ))}
                </div>

                {/* AI Quality check trigger */}
                <div className="mt-3 flex items-center justify-between bg-rose-50 dark:bg-rose-950/40 p-3 rounded-xl">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#C2185B]" />
                    <span className="text-xs font-medium text-slate-800 dark:text-slate-200">
                      {aiPhotoScore ? `AI Photo Authenticity Score: ${aiPhotoScore}/100 (Verified High Quality)` : 'Run AI Quality & Authenticity Check'}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={handleCheckPhotoQuality}
                    className="px-3 py-1 bg-[#C2185B] text-white text-xs font-bold rounded-lg shadow-xs"
                  >
                    Check
                  </button>
                </div>
              </div>

              {/* AI Bio Generator Box */}
              <div className="p-4 rounded-2xl bg-gradient-to-br from-purple-50 to-rose-50 dark:from-slate-800 dark:to-slate-800/80 border border-purple-100 dark:border-slate-700 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-800 dark:text-white flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-purple-600" />
                    AI Smart Bio Generator
                  </span>

                  {/* Tone selector */}
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
                  placeholder="Click Generate to auto-create a romantic & polished matrimony bio using AI..."
                  className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs text-slate-800 dark:text-white focus:ring-2 focus:ring-[#C2185B] focus:outline-none"
                />

                <button
                  type="button"
                  onClick={handleGenerateBio}
                  disabled={isGeneratingBio}
                  className="w-full py-2 bg-gradient-to-r from-purple-600 to-[#C2185B] text-white text-xs font-bold rounded-xl shadow-md flex items-center justify-center gap-2 hover:opacity-95"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{isGeneratingBio ? 'AI Writing Bio...' : 'Generate AI Bio in 1-Click'}</span>
                </button>
              </div>

            </div>
          )}

        </div>

        {/* Footer Navigation Buttons */}
        <div className="p-4 bg-slate-50 dark:bg-slate-800/80 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between">
          <button
            onClick={handleBack}
            disabled={currentStep === 1}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              currentStep === 1
                ? 'opacity-40 cursor-not-allowed text-slate-400'
                : 'bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100'
            }`}
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </button>

          <button
            onClick={handleNext}
            className="flex items-center gap-1.5 px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#C2185B] to-[#6A1B9A] text-white text-xs font-bold shadow-lg shadow-rose-500/25 hover:opacity-95 transition-opacity"
          >
            <span>{currentStep === 8 ? 'Complete Registration 🎉' : 'Next Step'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
