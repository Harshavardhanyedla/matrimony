import React, { useState, useEffect } from 'react';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { Hero } from './components/home/Hero';
import { Stats } from './components/home/Stats';
import { HowItWorks } from './components/home/HowItWorks';
import { FeaturedProfiles } from './components/home/FeaturedProfiles';
import { SuccessStories } from './components/home/SuccessStories';
import { MembershipPlans } from './components/home/MembershipPlans';
import { AuthModal } from './components/auth/AuthModal';
import { RegisterWizard } from './components/auth/RegisterWizard';
import { DashboardView } from './components/dashboard/DashboardView';
import { SearchSection } from './components/search/SearchSection';
import { ProfileModal } from './components/profile/ProfileModal';
import { ChatModal } from './components/chat/ChatModal';
import { VideoCallModal } from './components/chat/VideoCallModal';
import { KundaliMatching } from './components/astrology/KundaliMatching';
import { VendorDirectory } from './components/vendors/VendorDirectory';
import { AdminPanel } from './components/admin/AdminPanel';
import { CheckoutModal } from './components/payment/CheckoutModal';
import { AddProfileModal } from './components/profile/AddProfileModal';

import { 
  CURRENT_USER, 
  MOCK_PROFILES, 
  MOCK_SUCCESS_STORIES, 
  MOCK_VENDORS, 
  INITIAL_NOTIFICATIONS, 
  INITIAL_CHAT_MESSAGES 
} from './data/mockData';
import { LanguageCode, UserProfile, NotificationItem, ChatMessage } from './types';

export function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [currentLang, setCurrentLang] = useState<LanguageCode>('en');
  const [activeTab, setActiveTab] = useState<string>('home');

  // Application Data State
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(CURRENT_USER);
  const [profiles, setProfiles] = useState<UserProfile[]>(MOCK_PROFILES);
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);
  const [messages, setMessages] = useState<Record<string, ChatMessage[]>>(INITIAL_CHAT_MESSAGES);
  
  // Modals state
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [isRegisterWizardOpen, setIsRegisterWizardOpen] = useState(false);
  const [isAddProfileOpen, setIsAddProfileOpen] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState<UserProfile | null>(null);
  const [activeChatContact, setActiveChatContact] = useState<UserProfile | null>(null);
  const [videoCallPartner, setVideoCallPartner] = useState<UserProfile | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [checkoutPlan, setCheckoutPlan] = useState<{ name: string; price: string }>({
    name: 'Premium VIP',
    price: '₹10,000'
  });
  const [showNotificationsDrawer, setShowNotificationsDrawer] = useState(false);

  // Apply dark mode class on html
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const handleOpenAuth = (mode: 'login' | 'register') => {
    setAuthMode(mode);
    setIsAuthOpen(true);
  };

  const handleRegisterComplete = (newProfilePartial: Partial<UserProfile>) => {
    const newProfile: UserProfile = {
      ...CURRENT_USER,
      ...newProfilePartial,
      id: `usr-${Date.now()}`
    } as UserProfile;

    setCurrentUser(newProfile);
    setActiveTab('dashboard');
  };

  const handleSendInterest = (targetProfile: UserProfile) => {
    setNotifications((prev) => [
      {
        id: `notif-${Date.now()}`,
        type: 'interest',
        title: 'Interest Sent!',
        message: `You expressed interest in ${targetProfile.name}'s profile.`,
        timestamp: 'Just now',
        isRead: false,
        senderPhoto: targetProfile.photos[0],
        senderName: targetProfile.name
      },
      ...prev
    ]);
  };

  const handleStartChat = (targetProfile: UserProfile) => {
    setActiveChatContact(targetProfile);
    setActiveTab('chat');
  };

  const handleSendMessage = (contactId: string, text: string) => {
    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      senderId: currentUser?.id || 'usr-00',
      receiverId: contactId,
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isRead: true
    };

    setMessages((prev) => ({
      ...prev,
      [contactId]: [...(prev[contactId] || []), newMsg]
    }));
  };

  const handleVerifyUser = (userId: string) => {
    setProfiles((prev) =>
      prev.map((p) => (p.id === userId ? { ...p, isVerified: true } : p))
    );
  };

  const handleSuspendUser = (userId: string) => {
    setProfiles((prev) => prev.filter((p) => p.id !== userId));
  };

  const handleAddNewProfile = (newProf: UserProfile) => {
    setProfiles((prev) => [newProf, ...prev]);
    setSelectedProfile(newProf);
    setNotifications((prev) => [
      {
        id: `notif-${Date.now()}`,
        type: 'system',
        title: 'New Profile Listed!',
        message: `${newProf.name}'s profile is now live on SoulMatch!`,
        timestamp: 'Just now',
        isRead: false,
        senderPhoto: newProf.photos[0],
        senderName: newProf.name
      },
      ...prev
    ]);
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] dark:bg-[#0B0F17] text-slate-800 dark:text-slate-200 transition-colors flex flex-col font-sans">
      
      {/* Navigation Header */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        currentLang={currentLang}
        setCurrentLang={setCurrentLang}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        notifications={notifications}
        unreadMessagesCount={3}
        currentUser={currentUser}
        onOpenAuth={handleOpenAuth}
        onOpenNotifications={() => setShowNotificationsDrawer(true)}
        onOpenCheckout={() => {
          setCheckoutPlan({ name: 'Premium VIP', price: '₹10,000' });
          setIsCheckoutOpen(true);
        }}
        onOpenAddProfile={() => setIsAddProfileOpen(true)}
      />

      {/* Main Content Router */}
      <main className="flex-1">
        
        {/* TAB 1: HOME PAGE */}
        {activeTab === 'home' && (
          <div className="space-y-4">
            <Hero
              currentLang={currentLang}
              onSearch={() => setActiveTab('search')}
              onRegisterClick={() => setIsRegisterWizardOpen(true)}
              onLoginClick={() => handleOpenAuth('login')}
            />
            <Stats currentLang={currentLang} />
            <HowItWorks
              currentLang={currentLang}
              onRegisterClick={() => setIsRegisterWizardOpen(true)}
            />
            <FeaturedProfiles
              profiles={profiles}
              currentUser={currentUser || CURRENT_USER}
              currentLang={currentLang}
              onSelectProfile={setSelectedProfile}
              onSendInterest={handleSendInterest}
              onStartChat={handleStartChat}
              onViewAllClick={() => setActiveTab('search')}
            />
            <SuccessStories stories={MOCK_SUCCESS_STORIES} />
            <MembershipPlans
              onOpenCheckout={(name, price) => {
                setCheckoutPlan({ name, price });
                setIsCheckoutOpen(true);
              }}
            />
          </div>
        )}

        {/* TAB 2: SEARCH MATCHES */}
        {activeTab === 'search' && (
          <SearchSection
            allProfiles={profiles}
            currentUser={currentUser || CURRENT_USER}
            onSelectProfile={setSelectedProfile}
            onSendInterest={handleSendInterest}
            onStartChat={handleStartChat}
          />
        )}

        {/* TAB 3: USER DASHBOARD */}
        {activeTab === 'dashboard' && currentUser && (
          <DashboardView
            currentUser={currentUser}
            allProfiles={profiles}
            onSelectProfile={setSelectedProfile}
            onStartChat={handleStartChat}
            onSendInterest={handleSendInterest}
            onOpenCheckout={() => {
              setCheckoutPlan({ name: 'Premium VIP', price: '₹10,000' });
              setIsCheckoutOpen(true);
            }}
          />
        )}

        {/* TAB 4: REAL-TIME CHAT */}
        {activeTab === 'chat' && currentUser && (
          <ChatModal
            currentUser={currentUser}
            contacts={profiles}
            messages={messages}
            activeContact={activeChatContact}
            onSelectContact={setActiveChatContact}
            onSendMessage={handleSendMessage}
            onStartVideoCall={(partner) => setVideoCallPartner(partner)}
          />
        )}

        {/* TAB 5: ASTROLOGY KUNDALI MATCHING */}
        {activeTab === 'astrology' && <KundaliMatching />}

        {/* TAB 6: WEDDING VENDORS DIRECTORY */}
        {activeTab === 'vendors' && <VendorDirectory vendors={MOCK_VENDORS} />}

        {/* TAB 7: ADMIN PANEL */}
        {activeTab === 'admin' && (
          <AdminPanel
            profiles={profiles}
            onVerifyUser={handleVerifyUser}
            onSuspendUser={handleSuspendUser}
          />
        )}

      </main>

      {/* Footer */}
      <Footer setActiveTab={setActiveTab} />

      {/* MODALS */}
      {/* 1. Auth Modal */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        initialMode={authMode}
        onLoginSuccess={(usr) => setCurrentUser(usr)}
        onOpenRegisterWizard={() => setIsRegisterWizardOpen(true)}
      />

      {/* 2. 8-Step Multi-Step Registration Wizard */}
      <RegisterWizard
        isOpen={isRegisterWizardOpen}
        onClose={() => setIsRegisterWizardOpen(false)}
        onComplete={handleRegisterComplete}
      />

      {/* 2b. Add Profile Modal for Users */}
      <AddProfileModal
        isOpen={isAddProfileOpen}
        onClose={() => setIsAddProfileOpen(false)}
        onAddProfile={handleAddNewProfile}
      />

      {/* 3. Detailed Profile View Modal */}
      <ProfileModal
        profile={selectedProfile}
        currentUser={currentUser || CURRENT_USER}
        onClose={() => setSelectedProfile(null)}
        onSendInterest={handleSendInterest}
        onStartChat={handleStartChat}
        onRequestVideoCall={(p) => setVideoCallPartner(p)}
        onShortlist={(p) => handleSendInterest(p)}
        onBlock={() => setSelectedProfile(null)}
      />

      {/* 4. Live Video Call Simulation Modal */}
      <VideoCallModal
        partner={videoCallPartner}
        currentUser={currentUser || CURRENT_USER}
        onClose={() => setVideoCallPartner(null)}
      />

      {/* 5. Razorpay/Stripe Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        planName={checkoutPlan.name}
        price={checkoutPlan.price}
        onPaymentSuccess={() => {
          if (currentUser) {
            setCurrentUser({ ...currentUser, isPremium: true });
          }
        }}
      />

      {/* 6. Notifications Drawer Popup */}
      {showNotificationsDrawer && (
        <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/40 backdrop-blur-xs">
          <div className="w-full max-w-sm bg-white dark:bg-slate-900 h-full p-6 shadow-2xl border-l border-slate-200 dark:border-slate-800 space-y-4 animate-in slide-in-from-right duration-200">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="text-base font-bold text-slate-800 dark:text-white">Notifications</h3>
              <button onClick={() => setShowNotificationsDrawer(false)} className="p-1 rounded-full text-slate-400 hover:text-slate-600">
                ✕
              </button>
            </div>

            <div className="space-y-3 overflow-y-auto max-h-[80vh]">
              {notifications.map((n) => (
                <div key={n.id} className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border text-xs space-y-1">
                  <div className="flex items-center justify-between font-bold">
                    <span className="text-[#C2185B]">{n.title}</span>
                    <span className="text-[10px] text-slate-400">{n.timestamp}</span>
                  </div>
                  <p className="text-slate-600 dark:text-slate-300">{n.message}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default App;
