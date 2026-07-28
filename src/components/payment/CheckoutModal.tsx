import React, { useState } from 'react';
import { X, CreditCard, ShieldCheck, CheckCircle2, Lock, Sparkles, Tag } from 'lucide-react';
import confetti from 'canvas-confetti';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  planName: string;
  price: string;
  onPaymentSuccess: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  planName,
  price,
  onPaymentSuccess
}) => {
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'netbanking'>('upi');
  const [upiId, setUpiId] = useState('');
  const [coupon, setCoupon] = useState('');
  const [discountApplied, setDiscountApplied] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentDone, setPaymentDone] = useState(false);

  if (!isOpen) return null;

  const applyCoupon = () => {
    if (coupon.toUpperCase() === 'SOUL50' || coupon.toUpperCase() === 'WEDDING') {
      setDiscountApplied(true);
    }
  };

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setPaymentDone(true);
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 }
      });
      setTimeout(() => {
        onPaymentSuccess();
        onClose();
      }, 2000);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
        
        {/* Banner */}
        <div className="bg-gradient-to-r from-[#C2185B] via-[#D81B60] to-[#6A1B9A] p-6 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-full bg-white/20 hover:bg-white/30 text-white"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-300" />
            <h3 className="text-lg font-black">256-bit Encrypted Checkout</h3>
          </div>
          <p className="text-xs text-rose-100 mt-1">SoulMatch VIP Membership Upgrade</p>
        </div>

        {/* Form */}
        <div className="p-6 space-y-6">
          {!paymentDone ? (
            <>
              {/* Summary box */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white">{planName}</h4>
                  <span className="text-xs text-slate-500">Instant VIP Benefits Activation</span>
                </div>
                <div className="text-right">
                  <span className={`text-xl font-black ${discountApplied ? 'line-through text-slate-400 text-sm' : 'text-[#C2185B]'}`}>
                    {price}
                  </span>
                  {discountApplied && (
                    <span className="block text-xl font-black text-emerald-600">₹1,249</span>
                  )}
                </div>
              </div>

              {/* Coupon Code input */}
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value)}
                    placeholder="Coupon (Try SOUL50)"
                    className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border dark:bg-slate-800 uppercase"
                  />
                </div>
                <button
                  type="button"
                  onClick={applyCoupon}
                  className="px-4 py-2 bg-slate-800 text-white text-xs font-bold rounded-xl"
                >
                  Apply
                </button>
              </div>

              {/* Payment Methods */}
              <div className="space-y-3">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                  Select Payment Gateway
                </label>
                <div className="grid grid-cols-3 gap-3">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('upi')}
                    className={`p-3 rounded-2xl border text-xs font-bold transition-all ${
                      paymentMethod === 'upi' ? 'border-[#C2185B] bg-rose-50 text-[#C2185B]' : 'border-slate-200'
                    }`}
                  >
                    GPay / PhonePe UPI
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`p-3 rounded-2xl border text-xs font-bold transition-all ${
                      paymentMethod === 'card' ? 'border-[#C2185B] bg-rose-50 text-[#C2185B]' : 'border-slate-200'
                    }`}
                  >
                    Credit / Debit Card
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('netbanking')}
                    className={`p-3 rounded-2xl border text-xs font-bold transition-all ${
                      paymentMethod === 'netbanking' ? 'border-[#C2185B] bg-rose-50 text-[#C2185B]' : 'border-slate-200'
                    }`}
                  >
                    Net Banking
                  </button>
                </div>
              </div>

              {/* Payment Form */}
              <form onSubmit={handlePay} className="space-y-4">
                {paymentMethod === 'upi' && (
                  <div>
                    <label className="block text-xs font-semibold mb-1">Enter UPI ID</label>
                    <input
                      type="text"
                      required
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                      placeholder="e.g. mobile@upi / username@okaxis"
                      className="w-full p-2.5 text-xs rounded-xl border dark:bg-slate-800"
                    />
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#C2185B] via-[#D81B60] to-[#6A1B9A] text-white font-bold text-xs shadow-xl flex items-center justify-center gap-2 hover:opacity-95"
                >
                  <Lock className="w-4 h-4" />
                  <span>{isProcessing ? 'Processing Secure Payment...' : 'Pay & Activate VIP Plan'}</span>
                </button>
              </form>
            </>
          ) : (
            <div className="text-center py-8 space-y-4">
              <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto animate-bounce" />
              <h3 className="text-xl font-black text-slate-900 dark:text-white">Payment Successful! 🎉</h3>
              <p className="text-xs text-slate-500">
                Your SoulMatch VIP Subscription is now active. Enjoy unlimited messaging & photo views!
              </p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
