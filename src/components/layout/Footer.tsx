import React from 'react';
import { Heart, ShieldCheck, Lock, Award, Mail, Phone, MapPin, CheckCircle2 } from 'lucide-react';

interface FooterProps {
  setActiveTab: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab }) => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800 relative overflow-hidden">
      
      {/* Decorative gradient blur background */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-rose-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#C2185B] via-[#D81B60] to-[#6A1B9A] flex items-center justify-center shadow-lg shadow-rose-500/20">
                <Heart className="w-5 h-5 text-white fill-white" />
              </div>
              <span className="text-2xl font-black tracking-tight text-white">
                Soul<span className="gradient-text">Match</span>
              </span>
            </div>
            
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              SoulMatch is India’s most trusted, AI-powered matrimony platform connecting millions of verified brides and grooms worldwide. Built with strict privacy controls, photo verification, and astrology Kundali matching.
            </p>

            {/* Trust Badges */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800/80 border border-slate-700 text-[11px] font-medium text-emerald-400">
                <ShieldCheck className="w-4 h-4" />
                <span>100% Govt ID Verified</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800/80 border border-slate-700 text-[11px] font-medium text-purple-400">
                <Lock className="w-4 h-4" />
                <span>256-bit Encrypted</span>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Quick Navigation</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => setActiveTab('home')} className="hover:text-rose-400 transition-colors">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('search')} className="hover:text-rose-400 transition-colors">
                  Search Profiles
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('astrology')} className="hover:text-rose-400 transition-colors">
                  Kundali Matching
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('vendors')} className="hover:text-rose-400 transition-colors">
                  Wedding Vendors Directory
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('admin')} className="hover:text-rose-400 transition-colors">
                  Admin Panel
                </button>
              </li>
            </ul>
          </div>

          {/* Regional Matrimonies */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Regional Communities</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#search" className="hover:text-rose-400 transition-colors">Telugu Matrimony</a></li>
              <li><a href="#search" className="hover:text-rose-400 transition-colors">Hindi Matrimony</a></li>
              <li><a href="#search" className="hover:text-rose-400 transition-colors">Tamil Matrimony</a></li>
              <li><a href="#search" className="hover:text-rose-400 transition-colors">Marathi Matrimony</a></li>
              <li><a href="#search" className="hover:text-rose-400 transition-colors">Bengali Matrimony</a></li>
              <li><a href="#search" className="hover:text-rose-400 transition-colors">Gujarati Matrimony</a></li>
            </ul>
          </div>

          {/* Support & Contact */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Contact & Support</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-rose-400" />
                <span>+91 1800-200-SOUL (Toll Free)</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-rose-400" />
                <span>support@soulmatch.com</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-rose-400 shrink-0 mt-0.5" />
                <span>Jubilee Hills, Road No. 36, Hyderabad, India</span>
              </li>
            </ul>

            {/* Newsletter Signup */}
            <div className="pt-2">
              <span className="text-[11px] font-semibold text-slate-300 block mb-1">Weekly Relationship Advice</span>
              <div className="flex items-center">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-3 py-1.5 text-xs rounded-l-lg bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-rose-500"
                />
                <button className="px-3 py-1.5 bg-[#C2185B] hover:bg-rose-700 text-white rounded-r-lg text-xs font-bold transition-colors">
                  Join
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            © {new Date().getFullYear()} SoulMatch Matrimony Services Pvt Ltd. All rights reserved.
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            <a href="#facebook" className="p-2 rounded-full bg-slate-800 hover:bg-rose-600 hover:text-white transition-colors" title="Facebook">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            </a>
            <a href="#instagram" className="p-2 rounded-full bg-slate-800 hover:bg-rose-600 hover:text-white transition-colors" title="Instagram">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
            </a>
            <a href="#twitter" className="p-2 rounded-full bg-slate-800 hover:bg-rose-600 hover:text-white transition-colors" title="Twitter">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.936 9.936 0 0024 4.59z"/></svg>
            </a>
          </div>

          {/* Legal Links */}
          <div className="flex items-center gap-4">
            <a href="#privacy" className="hover:text-white transition-colors">Privacy Policy</a>
            <span>•</span>
            <a href="#terms" className="hover:text-white transition-colors">Terms of Use</a>
            <span>•</span>
            <a href="#security" className="hover:text-white transition-colors">Fraud Alert</a>
          </div>
        </div>

      </div>
    </footer>
  );
};
