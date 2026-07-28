import React, { useState } from 'react';
import { Store, Star, MapPin, Phone, Search, Filter, CheckCircle2 } from 'lucide-react';
import { Vendor } from '../../types';

interface VendorDirectoryProps {
  vendors: Vendor[];
}

export const VendorDirectory: React.FC<VendorDirectoryProps> = ({ vendors }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [inquiryModalVendor, setInquiryModalVendor] = useState<Vendor | null>(null);
  const [inquirySent, setInquirySent] = useState(false);

  const categories = ['All', 'Venues', 'Photographers', 'Decorators', 'Bridal Wear', 'Catering'];

  const filtered = vendors.filter((v) => {
    if (selectedCategory !== 'All' && v.category !== selectedCategory) return false;
    if (searchQuery && !v.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-[#C2185B]">One-Stop Wedding Hub</span>
        <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">
          Trusted Wedding Vendors Directory
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Book top-rated wedding venues, photographers, decorators, and caterers at verified prices.
        </p>
      </div>

      {/* Category Tabs & Search Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        
        {/* Category Pills */}
        <div className="flex gap-2 overflow-x-auto w-full md:w-auto py-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-bold shrink-0 transition-all ${
                selectedCategory === cat
                  ? 'bg-gradient-to-r from-[#C2185B] to-[#6A1B9A] text-white shadow-xs'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search vendors..."
            className="w-full pl-9 pr-3 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-800 dark:text-white focus:outline-none"
          />
        </div>

      </div>

      {/* Vendors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filtered.map((vendor) => (
          <div
            key={vendor.id}
            className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200/80 dark:border-slate-700 overflow-hidden shadow-lg hover:shadow-xl transition-transform duration-300 flex flex-col justify-between"
          >
            <div>
              <div className="relative h-48 overflow-hidden">
                <img src={vendor.image} alt={vendor.name} className="w-full h-full object-cover" />
                <span className="absolute top-3 right-3 px-3 py-1 rounded-full bg-black/70 text-amber-300 text-xs font-bold flex items-center gap-1 backdrop-blur-xs">
                  <Star className="w-3.5 h-3.5 fill-amber-300 text-amber-300" />
                  {vendor.rating} ({vendor.reviewsCount})
                </span>
                <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#C2185B] text-white text-[10px] font-extrabold uppercase tracking-wider">
                  {vendor.category}
                </span>
              </div>

              <div className="p-5 space-y-3">
                <h3 className="text-base font-bold text-slate-900 dark:text-white">{vendor.name}</h3>
                
                <div className="flex items-center gap-1.5 text-xs text-slate-500">
                  <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                  <span>{vendor.location}</span>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2">
                  {vendor.description}
                </p>

                <div className="pt-2 border-t border-slate-100 dark:border-slate-700 flex justify-between items-baseline">
                  <span className="text-[10px] text-slate-400 font-semibold uppercase">Starting Price</span>
                  <span className="text-sm font-black text-[#C2185B]">{vendor.startingPrice}</span>
                </div>
              </div>
            </div>

            <div className="p-5 pt-0">
              <button
                onClick={() => {
                  setInquiryModalVendor(vendor);
                  setInquirySent(false);
                }}
                className="w-full py-2.5 rounded-xl bg-slate-900 dark:bg-slate-700 hover:bg-[#C2185B] text-white font-bold text-xs transition-colors"
              >
                Request Free Quote
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Inquiry Quote Modal */}
      {inquiryModalVendor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 max-w-md w-full border border-slate-200 dark:border-slate-800 space-y-4">
            {!inquirySent ? (
              <>
                <h3 className="text-base font-bold text-slate-800 dark:text-white">
                  Request Quote for {inquiryModalVendor.name}
                </h3>
                <p className="text-xs text-slate-500">
                  Fill your wedding date to receive availability and custom pricing directly.
                </p>

                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-semibold mb-1">Expected Wedding Date</label>
                    <input type="date" className="w-full p-2 text-xs rounded-xl border dark:bg-slate-800" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold mb-1">Estimated Guests Count</label>
                    <input type="text" placeholder="e.g. 500 Guests" className="w-full p-2 text-xs rounded-xl border dark:bg-slate-800" />
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <button onClick={() => setInquiryModalVendor(null)} className="flex-1 py-2 text-xs font-bold rounded-xl bg-slate-100 text-slate-700">Cancel</button>
                  <button onClick={() => setInquirySent(true)} className="flex-1 py-2 text-xs font-bold rounded-xl bg-[#C2185B] text-white">Send Inquiry</button>
                </div>
              </>
            ) : (
              <div className="text-center py-6 space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto" />
                <h4 className="font-bold text-base text-slate-800 dark:text-white">Inquiry Sent Successfully!</h4>
                <p className="text-xs text-slate-500">{inquiryModalVendor.name} team will call you within 2 hours.</p>
                <button onClick={() => setInquiryModalVendor(null)} className="px-6 py-2 rounded-xl bg-[#C2185B] text-white text-xs font-bold">Close</button>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
};
