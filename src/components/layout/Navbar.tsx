import React, { useState } from 'react';
import { 
  Heart, 
  Search, 
  UserCheck, 
  Bell, 
  MessageSquare, 
  Moon, 
  Sun, 
  Menu, 
  X, 
  Sparkles, 
  Compass, 
  ShieldCheck, 
  Store,
  User,
  Crown
} from 'lucide-react';
import { LanguageSelector } from './LanguageSelector';
import { LanguageCode, NotificationItem, UserProfile } from '../../types';
import { TRANSLATIONS } from '../../lib/i18n';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  currentLang: LanguageCode;
  setCurrentLang: (lang: LanguageCode) => void;
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
  notifications: NotificationItem[];
  unreadMessagesCount: number;
  currentUser: UserProfile | null;
  onOpenAuth: (mode: 'login' | 'register') => void;
  onOpenNotifications: () => void;
  onOpenCheckout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  currentLang,
  setCurrentLang,
  darkMode,
  setDarkMode,
  notifications,
  unreadMessagesCount,
  currentUser,
  onOpenAuth,
  onOpenNotifications,
  onOpenCheckout
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = TRANSLATIONS[currentLang];
  const unreadNotifs = notifications.filter((n) => !n.isRead).length;

  const navItems = [
    { id: 'home', label: 'Home', icon: Compass },
    { id: 'search', label: t.searchProfiles || 'Search Matches', icon: Search },
    { id: 'dashboard', label: t.dashboard || 'Dashboard', icon: UserCheck },
    { id: 'astrology', label: t.astrology || 'Kundali Matching', icon: Sparkles },
    { id: 'vendors', label: t.vendors || 'Wedding Vendors', icon: Store },
    { id: 'admin', label: t.admin || 'Admin Panel', icon: ShieldCheck }
  ];

  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-rose-100/50 dark:border-slate-800 transition-colors shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        
        {/* Brand Logo */}
        <div 
          onClick={() => setActiveTab('home')}
          className="flex items-center gap-2 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#C2185B] via-[#D81B60] to-[#6A1B9A] flex items-center justify-center shadow-md shadow-rose-500/20 group-hover:scale-105 transition-transform">
            <Heart className="w-5 h-5 text-white fill-white animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-1">
              <span className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">
                Soul<span className="gradient-text">Match</span>
              </span>
              <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-md bg-gradient-to-r from-amber-400 to-rose-500 text-white uppercase tracking-wider">
                AI
              </span>
            </div>
            <span className="block text-[10px] text-slate-500 dark:text-slate-400 font-medium tracking-wide -mt-1">
              Trusted Matrimony
            </span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 bg-slate-100/70 dark:bg-slate-800/60 p-1.5 rounded-full border border-slate-200/50 dark:border-slate-700/50">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-[#C2185B] to-[#6A1B9A] text-white shadow-md shadow-rose-500/20'
                    : 'text-slate-600 dark:text-slate-300 hover:text-[#C2185B] hover:bg-white/60 dark:hover:bg-slate-700/50'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right Actions Toolbar */}
        <div className="flex items-center gap-2">
          
          {/* Language Switcher */}
          <LanguageSelector currentLang={currentLang} onSelectLang={setCurrentLang} />

          {/* Theme Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-full text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title="Toggle Dark Mode"
          >
            {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Notifications Button */}
          {currentUser && (
            <button
              onClick={onOpenNotifications}
              className="relative p-2 rounded-full text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title="Notifications"
            >
              <Bell className="w-4.5 h-4.5" />
              {unreadNotifs > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#C2185B] text-white text-[9px] font-bold flex items-center justify-center animate-bounce">
                  {unreadNotifs}
                </span>
              )}
            </button>
          )}

          {/* Messages Button */}
          {currentUser && (
            <button
              onClick={() => setActiveTab('chat')}
              className={`relative p-2 rounded-full transition-colors ${
                activeTab === 'chat'
                  ? 'bg-rose-100 dark:bg-rose-950 text-[#C2185B]'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
              title="Messages"
            >
              <MessageSquare className="w-4.5 h-4.5" />
              {unreadMessagesCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#6A1B9A] text-white text-[9px] font-bold flex items-center justify-center">
                  {unreadMessagesCount}
                </span>
              )}
            </button>
          )}

          {/* Upgrade Premium Button */}
          <button
            onClick={onOpenCheckout}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-gradient-to-r from-amber-400 via-rose-500 to-purple-600 text-white shadow-sm hover:opacity-95 transition-opacity"
          >
            <Crown className="w-3.5 h-3.5 fill-amber-200 text-amber-200 animate-spin" style={{ animationDuration: '8s' }} />
            <span>VIP Upgrade</span>
          </button>

          {/* Auth buttons / User Profile Avatar */}
          {currentUser ? (
            <div className="flex items-center gap-2 pl-2 border-l border-slate-200 dark:border-slate-800">
              <button
                onClick={() => setActiveTab('dashboard')}
                className="flex items-center gap-2 p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <img
                  src={currentUser.photos[0]}
                  alt={currentUser.name}
                  className="w-8 h-8 rounded-full object-cover ring-2 ring-[#C2185B]/40"
                />
                <span className="hidden md:inline text-xs font-semibold text-slate-800 dark:text-slate-200">
                  {currentUser.name.split(' ')[0]}
                </span>
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={() => onOpenAuth('login')}
                className="px-3.5 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:text-[#C2185B] transition-colors"
              >
                {t.login}
              </button>
              <button
                onClick={() => onOpenAuth('register')}
                className="px-4 py-1.5 text-xs font-bold rounded-full bg-gradient-to-r from-[#C2185B] to-[#6A1B9A] text-white shadow-md shadow-rose-500/20 hover:opacity-95 transition-all"
              >
                {t.registerFree}
              </button>
            </div>
          )}

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md px-4 pt-3 pb-6 space-y-2 animate-in slide-in-from-top duration-200">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-[#C2185B] to-[#6A1B9A] text-white shadow-md'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </button>
            );
          })}
          
          <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <button
              onClick={() => {
                onOpenCheckout();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 via-rose-500 to-purple-600 text-white font-bold text-xs"
            >
              <Crown className="w-4 h-4 fill-white" />
              <span>Upgrade VIP Plan</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
