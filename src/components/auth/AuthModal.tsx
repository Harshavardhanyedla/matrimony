import React, { useState } from 'react';
import { X, Mail, Lock, Phone, KeyRound, ArrowRight, ShieldCheck, CheckCircle, Sparkles } from 'lucide-react';
import { UserProfile } from '../../types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'login' | 'register';
  onLoginSuccess: (user: UserProfile) => void;
  onOpenRegisterWizard: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  initialMode = 'login',
  onLoginSuccess,
  onOpenRegisterWizard
}) => {
  const [authMethod, setAuthMethod] = useState<'email' | 'otp'>('email');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(45);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [requires2FA, setRequires2FA] = useState(false);

  if (!isOpen) return null;

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate 2FA check or direct success
    setRequires2FA(true);
  };

  const handleSendOTP = () => {
    if (!phone) return;
    setOtpSent(true);
    setTimer(45);
  };

  const handleVerify2FAorOTP = () => {
    // Mock user login
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-100 dark:border-slate-800 overflow-hidden">
        
        {/* Header gradient banner */}
        <div className="bg-gradient-to-r from-[#C2185B] via-[#D81B60] to-[#6A1B9A] p-6 text-white text-center relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          
          <h3 className="text-xl font-black">Welcome Back to SoulMatch</h3>
          <p className="text-xs text-rose-100 mt-1">Connect with verified life partners today</p>
        </div>

        {/* Form Container */}
        <div className="p-6">
          
          {requires2FA ? (
            /* 2FA Verification Step */
            <div className="space-y-4 text-center">
              <div className="w-12 h-12 rounded-full bg-rose-100 dark:bg-rose-950 text-[#C2185B] flex items-center justify-center mx-auto">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h4 className="text-base font-bold text-slate-800 dark:text-white">Two-Factor Authentication</h4>
              <p className="text-xs text-slate-500">
                Enter the 6-digit security code sent to your registered mobile number ending in ****3210.
              </p>
              
              <div className="flex justify-center gap-2 my-4">
                {[0, 1, 2, 3, 4, 5].map((idx) => (
                  <input
                    key={idx}
                    type="text"
                    maxLength={1}
                    value={otpCode[idx]}
                    onChange={(e) => {
                      const newOtp = [...otpCode];
                      newOtp[idx] = e.target.value;
                      setOtpCode(newOtp);
                    }}
                    className="w-10 h-11 text-center text-lg font-bold rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-white focus:ring-2 focus:ring-[#C2185B] focus:outline-none"
                  />
                ))}
              </div>

              <button
                onClick={handleVerify2FAorOTP}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-[#C2185B] to-[#6A1B9A] text-white font-bold text-sm shadow-lg shadow-rose-500/25 hover:opacity-95 transition-opacity"
              >
                Verify & Login
              </button>
            </div>
          ) : isForgotPassword ? (
            /* Forgot Password Step */
            <div className="space-y-4">
              <h4 className="text-base font-bold text-slate-800 dark:text-white">Reset Password</h4>
              <p className="text-xs text-slate-500">
                Enter your email address and we will send you a password reset link.
              </p>
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Registered Email</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@domain.com"
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-800 dark:text-white focus:ring-2 focus:ring-[#C2185B] focus:outline-none"
                  />
                </div>
              </div>
              <button
                onClick={() => setIsForgotPassword(false)}
                className="w-full py-2.5 rounded-xl bg-[#C2185B] text-white font-bold text-xs"
              >
                Send Reset Link
              </button>
              <button
                onClick={() => setIsForgotPassword(false)}
                className="w-full text-center text-xs text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
              >
                Back to Login
              </button>
            </div>
          ) : (
            /* Standard Login Tabs */
            <div className="space-y-5">
              
              {/* Method Switcher */}
              <div className="flex p-1 bg-slate-100 dark:bg-slate-800 rounded-xl">
                <button
                  onClick={() => setAuthMethod('email')}
                  className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-colors ${
                    authMethod === 'email'
                      ? 'bg-white dark:bg-slate-700 text-[#C2185B] shadow-xs'
                      : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                  }`}
                >
                  Email Login
                </button>
                <button
                  onClick={() => setAuthMethod('otp')}
                  className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-colors ${
                    authMethod === 'otp'
                      ? 'bg-white dark:bg-slate-700 text-[#C2185B] shadow-xs'
                      : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                  }`}
                >
                  Phone OTP Login
                </button>
              </div>

              {authMethod === 'email' ? (
                <form onSubmit={handleEmailSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="harsha@soulmatch.com"
                        className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-800 dark:text-white focus:ring-2 focus:ring-[#C2185B] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                        Password
                      </label>
                      <button
                        type="button"
                        onClick={() => setIsForgotPassword(true)}
                        className="text-[11px] font-semibold text-[#C2185B] hover:underline"
                      >
                        Forgot?
                      </button>
                    </div>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                      <input
                        type="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-800 dark:text-white focus:ring-2 focus:ring-[#C2185B] focus:outline-none"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-[#C2185B] to-[#6A1B9A] text-white font-bold text-xs shadow-lg shadow-rose-500/25 hover:opacity-95 transition-opacity"
                  >
                    Log In Securely
                  </button>
                </form>
              ) : (
                /* Phone OTP Form */
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Mobile Number
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+91 98765 43210"
                        className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-800 dark:text-white focus:ring-2 focus:ring-[#C2185B] focus:outline-none"
                      />
                    </div>
                  </div>

                  {!otpSent ? (
                    <button
                      onClick={handleSendOTP}
                      className="w-full py-3 rounded-xl bg-[#C2185B] text-white font-bold text-xs shadow-md"
                    >
                      Get 6-Digit OTP
                    </button>
                  ) : (
                    <div className="space-y-3 animate-in fade-in">
                      <p className="text-xs text-slate-500 text-center">
                        Enter 6-digit OTP sent to {phone}
                      </p>
                      <div className="flex justify-center gap-2">
                        {[0, 1, 2, 3, 4, 5].map((idx) => (
                          <input
                            key={idx}
                            type="text"
                            maxLength={1}
                            className="w-9 h-10 text-center text-sm font-bold rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                          />
                        ))}
                      </div>
                      <button
                        onClick={handleVerify2FAorOTP}
                        className="w-full py-3 rounded-xl bg-gradient-to-r from-[#C2185B] to-[#6A1B9A] text-white font-bold text-xs shadow-md"
                      >
                        Verify OTP & Login
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Social Logins */}
              <div className="pt-3 border-t border-slate-100 dark:border-slate-800">
                <div className="text-center text-[10px] uppercase font-bold text-slate-400 mb-3">
                  Or Connect With
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={handleVerify2FAorOTP}
                    className="flex items-center justify-center gap-2 py-2 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 transition-colors"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                    </svg>
                    <span>Google</span>
                  </button>

                  <button
                    onClick={handleVerify2FAorOTP}
                    className="flex items-center justify-center gap-2 py-2 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 transition-colors"
                  >
                    <svg className="w-4 h-4 fill-[#1877F2]" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                    <span>Facebook</span>
                  </button>
                </div>
              </div>

              {/* Registration CTA */}
              <div className="pt-2 text-center">
                <p className="text-xs text-slate-500">
                  New to SoulMatch?{' '}
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      onOpenRegisterWizard();
                    }}
                    className="font-bold text-[#C2185B] hover:underline"
                  >
                    Register Free Now
                  </button>
                </p>
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
};
