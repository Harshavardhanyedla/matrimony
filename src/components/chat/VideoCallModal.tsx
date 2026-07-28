import React, { useState, useEffect } from 'react';
import { Mic, MicOff, Video, VideoOff, PhoneOff, ShieldCheck, Sparkles, Volume2 } from 'lucide-react';
import { UserProfile } from '../../types';

interface VideoCallModalProps {
  partner: UserProfile | null;
  currentUser: UserProfile;
  onClose: () => void;
}

export const VideoCallModal: React.FC<VideoCallModalProps> = ({ partner, currentUser, onClose }) => {
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [callSeconds, setCallSeconds] = useState(0);

  useEffect(() => {
    if (!partner) return;
    const interval = setInterval(() => {
      setCallSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [partner]);

  if (!partner) return null;

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const s = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-lg animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-slate-900 rounded-3xl shadow-2xl border border-slate-800 overflow-hidden aspect-16/9 flex flex-col justify-between">
        
        {/* Remote Video Stream Simulation */}
        <div className="absolute inset-0 z-0">
          <img
            src={partner.photos[0]}
            alt={partner.name}
            className="w-full h-full object-cover filter brightness-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-slate-950/40" />
        </div>

        {/* Top Header Overlay */}
        <div className="relative z-10 p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full ring-2 ring-[#C2185B] overflow-hidden">
              <img src={partner.photos[0]} alt={partner.name} className="w-full h-full object-cover" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="text-sm font-black text-white">{partner.name}</h3>
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
              </div>
              <span className="text-[11px] font-semibold text-rose-300 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                HD Video Connected • {formatTime(callSeconds)}
              </span>
            </div>
          </div>

          <div className="px-3 py-1 rounded-full bg-black/50 text-white text-xs font-bold backdrop-blur-xs flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Encrypted 1-on-1 Call</span>
          </div>
        </div>

        {/* Local Self View Inset Camera */}
        <div className="absolute bottom-24 right-6 z-20 w-36 h-48 rounded-2xl overflow-hidden border-2 border-white/40 shadow-2xl bg-slate-800">
          {isVideoOn ? (
            <img src={currentUser.photos[0]} alt={currentUser.name} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-slate-400 text-xs font-semibold">
              Video Off
            </div>
          )}
          <span className="absolute bottom-1 left-2 text-[9px] font-bold text-white bg-black/60 px-1.5 py-0.5 rounded">
            You
          </span>
        </div>

        {/* Bottom Control Bar */}
        <div className="relative z-10 p-6 flex items-center justify-center gap-4">
          
          <button
            onClick={() => setIsMuted(!isMuted)}
            className={`p-4 rounded-full transition-colors ${
              isMuted ? 'bg-rose-600 text-white' : 'bg-slate-800/80 hover:bg-slate-700 text-white'
            }`}
            title={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
          </button>

          <button
            onClick={() => setIsVideoOn(!isVideoOn)}
            className={`p-4 rounded-full transition-colors ${
              !isVideoOn ? 'bg-rose-600 text-white' : 'bg-slate-800/80 hover:bg-slate-700 text-white'
            }`}
            title={isVideoOn ? 'Turn Video Off' : 'Turn Video On'}
          >
            {!isVideoOn ? <VideoOff className="w-5 h-5" /> : <Video className="w-5 h-5" />}
          </button>

          <button
            onClick={onClose}
            className="p-4 rounded-full bg-red-600 hover:bg-red-700 text-white font-bold shadow-xl scale-110 transition-transform"
            title="End Video Call"
          >
            <PhoneOff className="w-6 h-6" />
          </button>

        </div>

      </div>
    </div>
  );
};
