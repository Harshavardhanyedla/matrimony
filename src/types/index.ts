export type Gender = 'Male' | 'Female' | 'Other';

export interface PartnerPreference {
  minAge: number;
  maxAge: number;
  minHeight: string;
  maxHeight: string;
  religions: string[];
  castes: string[];
  education: string[];
  occupations: string[];
  minIncome: string;
  locations: string[];
  maritalStatus: string[];
  diet: string[];
}

export interface UserProfile {
  id: string;
  name: string;
  gender: Gender;
  age: number;
  dob: string;
  height: string; // e.g. "5'9""
  heightCm: number;
  weight: string; // e.g. "68 kg"
  complexion: string;
  maritalStatus: string; // 'Never Married' | 'Divorced' | 'Widowed'
  religion: string;
  caste: string;
  subCaste?: string;
  motherTongue: string;
  gothra?: string;
  manglik: 'No' | 'Yes' | 'Don\'t Know';
  disability: 'None' | 'Physical' | 'Other';
  
  // Education & Career
  qualification: string; // e.g. 'M.Tech / B.Tech'
  college: string;
  occupation: string;
  company: string;
  annualIncome: string; // e.g. '₹25L - ₹30L'
  
  // Family
  fatherOccupation: string;
  motherOccupation: string;
  brothers: number;
  sisters: number;
  familyType: 'Nuclear' | 'Joint';
  familyStatus: 'Middle Class' | 'Upper Middle Class' | 'High Class' | 'Affluent';
  
  // Lifestyle
  diet: 'Vegetarian' | 'Non-Vegetarian' | 'Eggetarian' | 'Vegan';
  smoking: 'No' | 'Occasionally' | 'Yes';
  drinking: 'No' | 'Socially' | 'Yes';
  hobbies: string[];
  languages: string[];
  
  // Location
  country: string;
  state: string;
  city: string;
  address?: string;
  pincode?: string;
  
  // Preferences & Photos
  partnerPreferences: PartnerPreference;
  photos: string[];
  videoUrl?: string;
  bio: string;
  
  // Status & Badges
  isVerified: boolean;
  isPremium: boolean;
  isOnline: boolean;
  lastActive: string;
  phone: string;
  email: string;
  matchScore?: number;
  
  // Horoscope / Kundali
  horoscope?: {
    rashi: string;
    nakshatra: string;
    manglik: string;
    sunSign: string;
    birthTime: string;
    birthPlace: string;
  };
}

export interface SearchFilters {
  gender: Gender;
  minAge: number;
  maxAge: number;
  minHeight: number;
  maxHeight: number;
  religion: string;
  caste: string;
  motherTongue: string;
  education: string;
  profession: string;
  minIncome: string;
  country: string;
  state: string;
  city: string;
  maritalStatus: string;
  diet: string;
  manglik: string;
  isVerifiedOnly: boolean;
  isPremiumOnly: boolean;
  isOnlineOnly: boolean;
  sortBy: 'relevance' | 'newest' | 'compatibility' | 'lastActive';
}

export interface ChatMessage {
  id: string;
  senderId: string;
  receiverId: string;
  text: string;
  timestamp: string;
  isRead: boolean;
  mediaUrl?: string;
  mediaType?: 'image' | 'audio';
  voiceDuration?: string;
}

export interface NotificationItem {
  id: string;
  type: 'interest' | 'view' | 'message' | 'match' | 'system';
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  senderPhoto?: string;
  senderName?: string;
  profileId?: string;
}

export interface SuccessStory {
  id: string;
  names: string;
  weddingDate: string;
  image: string;
  story: string;
  location: string;
}

export interface Vendor {
  id: string;
  name: string;
  category: 'Photographers' | 'Venues' | 'Decorators' | 'Bridal Wear' | 'Catering';
  rating: number;
  reviewsCount: number;
  location: string;
  startingPrice: string;
  image: string;
  description: string;
  phone: string;
}

export type LanguageCode = 'en' | 'hi' | 'te' | 'ta' | 'mr' | 'bn' | 'gu' | 'kn' | 'ml';
