import React, { useState } from 'react';
import { Check, Crown, Zap, Shield, Sparkles } from 'lucide-react';

interface MembershipPlansProps {
  onOpenCheckout: (planName: string, price: string) => void;
}

export const MembershipPlans: React.FC<MembershipPlansProps> = ({ onOpenCheckout }) => {
  const [billingCycle, setBillingCycle] = useState<'Quarterly' | 'Yearly'>('Quarterly');

  const plans = [
    {
      name: 'Free Starter',
      badge: 'Basic',
      price: '₹0',
      period: 'Forever Free',
      description: 'Ideal for creating profile and browsing verified matches.',
      color: 'border-slate-200 dark:border-slate-800',
      buttonBg: 'bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-white',
      features: [
        'Create & Manage Profile',
        'Send up to 5 Interests / month',
        'Basic Search Filters',
        'Receive Match Suggestions',
        'Govt ID Verification Badge'
      ]
    },
    {
      name: 'Premium VIP',
      badge: 'Most Popular',
      price: billingCycle === 'Quarterly' ? '₹2,499' : '₹6,999',
      period: billingCycle === 'Quarterly' ? '/ 3 Months' : '/ 1 Year',
      description: 'Full access to chat, contact numbers, and AI match insights.',
      color: 'border-[#C2185B] ring-2 ring-[#C2185B]/20',
      isPopular: true,
      buttonBg: 'bg-gradient-to-r from-[#C2185B] to-[#6A1B9A] text-white shadow-lg shadow-rose-500/25',
      features: [
        'Unlimited Express Interests',
        'Direct Chat & Real-Time Messaging',
        'View Verified Phone Numbers & Emails',
        'See "Who Viewed My Profile"',
        'Detailed AI Compatibility & Kundali Reports',
        'Priority Listing in Search Results'
      ]
    },
    {
      name: 'Elite Royal Concierge',
      badge: 'VIP Platinum',
      price: billingCycle === 'Quarterly' ? '₹5,999' : '₹14,999',
      period: billingCycle === 'Quarterly' ? '/ 3 Months' : '/ 1 Year',
      description: 'Dedicated personal relationship manager & video call access.',
      color: 'border-amber-400 dark:border-amber-600',
      buttonBg: 'bg-gradient-to-r from-amber-500 via-rose-500 to-purple-600 text-white shadow-xl',
      features: [
        'Everything in Premium VIP',
        'Dedicated Personal Relationship Advisor',
        'Unlimited HD Video Calling',
        '3x Profile Boost to top of search',
        'Handpicked Matrimony Match Proposals',
        '100% Stealth & Privacy Lock Mode'
      ]
    }
  ];

  return (
    <section className="py-20 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-[#C2185B]">Transparent Pricing</span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">
            Choose Your Premium Match Plan
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Connect faster with direct messaging, phone numbers, and priority AI recommendations.
          </p>

          {/* Billing Cycle Switcher */}
          <div className="pt-4 flex justify-center">
            <div className="flex p-1 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              <button
                onClick={() => setBillingCycle('Quarterly')}
                className={`px-5 py-1.5 rounded-full text-xs font-bold transition-all ${
                  billingCycle === 'Quarterly'
                    ? 'bg-gradient-to-r from-[#C2185B] to-[#6A1B9A] text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-300'
                }`}
              >
                Quarterly (3 Months)
              </button>
              <button
                onClick={() => setBillingCycle('Yearly')}
                className={`px-5 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1 ${
                  billingCycle === 'Yearly'
                    ? 'bg-gradient-to-r from-[#C2185B] to-[#6A1B9A] text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-300'
                }`}
              >
                <span>Yearly Plan</span>
                <span className="text-[9px] bg-emerald-500 text-white px-1.5 py-0.2 rounded-full">Save 30%</span>
              </button>
            </div>
          </div>
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, i) => (
            <div
              key={i}
              className={`bg-white dark:bg-slate-800 rounded-3xl p-8 border ${plan.color} shadow-xl relative flex flex-col justify-between hover:-translate-y-2 transition-transform duration-300`}
            >
              {plan.isPopular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-[#C2185B] to-[#6A1B9A] text-white text-[11px] font-bold shadow-md flex items-center gap-1">
                  <Crown className="w-3.5 h-3.5 fill-amber-300 text-amber-300" />
                  <span>{plan.badge}</span>
                </div>
              )}

              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-black text-slate-900 dark:text-white">{plan.name}</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{plan.description}</p>
                </div>

                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-black text-slate-900 dark:text-white">{plan.price}</span>
                  <span className="text-xs font-bold text-slate-400">{plan.period}</span>
                </div>

                {/* Features List */}
                <div className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-700">
                  {plan.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300">
                      <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-8">
                <button
                  onClick={() => onOpenCheckout(plan.name, plan.price)}
                  className={`w-full py-3 rounded-2xl font-bold text-xs transition-opacity hover:opacity-95 ${plan.buttonBg}`}
                >
                  Get Started with {plan.name}
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
