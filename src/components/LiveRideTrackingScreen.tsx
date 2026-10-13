import React, { useState } from 'react';

interface LiveRideTrackingProps {
  onBack: () => void;
  onOpenSupport: () => void;
}

export const LiveRideTrackingScreen: React.FC<LiveRideTrackingProps> = ({
  onBack,
  onOpenSupport,
}) => {
  const [copiedOtp, setCopiedOtp] = useState(false);
  const [sharedToast, setSharedToast] = useState(false);

  const handleCopyOtp = () => {
    navigator.clipboard?.writeText('4829').catch(() => {});
    setCopiedOtp(true);
    setTimeout(() => setCopiedOtp(false), 2500);
  };

  const handleShare = () => {
    setSharedToast(true);
    setTimeout(() => setSharedToast(false), 3000);
  };

  return (
    <div className="flex flex-col w-full pb-24 animate-fade-in max-w-md mx-auto px-4">
      {/* Top Section: Dynamic Live Tracking Viewport */}
      <div className="relative w-full h-72 rounded-3xl overflow-hidden bg-slate-100 shadow-sm mt-3">
        <div
          className="w-full h-full bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBIl22eOfEyA9xnlf9ycsgootoX4guirNiCvczA1hOVufaUOfMPIo9F41MGA_lxzeeQ9tH7jGBBSdHxTKo7MMoiqMpMwSG_UhWOvV6OTlXvFW2q-asHydcF7z6fJRVCIHAjIOCzWQ0qVmRTHTSI4zQYPCP71NcOvandB41HAJIDST_8oX99LHuse-z1Z6DAp1TSefj-DBMZk7W6tjMLD626eEcUIvfz0IWGyPAR1xco4YrdOVROkUjBIw')",
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-slate-900/20 pointer-events-none"></div>

        {/* Live Status HUD */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
          <div className="flex items-center gap-2 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-full shadow-md">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-orange-500"></span>
            </span>
            <span className="text-[11px] font-bold text-slate-900 uppercase tracking-wider">
              Live Tracking
            </span>
          </div>
          <button
            type="button"
            className="w-9 h-9 rounded-full bg-white/95 backdrop-blur-md shadow-md flex items-center justify-center text-blue-600 active:scale-95 transition-transform"
          >
            <span className="material-symbols-outlined text-[18px]">my_location</span>
          </button>
        </div>

        {/* Waypoint Progress Pill Card */}
        <div className="absolute bottom-3 inset-x-3">
          <div className="bg-white/95 backdrop-blur-md rounded-2xl p-3 shadow-md flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center text-blue-700">
                <span className="material-symbols-outlined text-[20px]">directions_car</span>
              </div>
              <div className="flex flex-col">
                <div className="flex items-baseline gap-1.5">
                  <span className="text-sm font-bold text-slate-900 tracking-tight">
                    2 hrs 14 min
                  </span>
                  <span className="text-[10px] text-slate-400">remaining</span>
                </div>
                <p className="text-[11px] text-slate-500 flex items-center gap-1">
                  <span>98 km left</span>
                  <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                  <span className="text-orange-600 font-semibold">Expressway smooth</span>
                </p>
              </div>
            </div>
            <div className="flex flex-col items-end">
              <span className="text-[10px] text-slate-400 uppercase font-semibold">ETA</span>
              <span className="text-xs font-bold text-blue-600">04:45 PM</span>
            </div>
          </div>
        </div>
      </div>

      {/* Start OTP & Driver Card */}
      <div className="flex flex-col gap-3 mt-3">
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm flex flex-col gap-3">
          {/* Start Ride OTP */}
          <div className="flex items-center justify-between bg-blue-50/60 rounded-xl p-3 border border-blue-100">
            <div>
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[15px] text-blue-600">key</span>
                <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                  Start Ride OTP
                </span>
              </div>
              <p className="text-[11px] text-slate-500">Share with driver before departure</p>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-lg font-bold tracking-widest text-blue-700 bg-white border border-blue-200 px-3 py-1 rounded-lg shadow-2xs font-mono">
                4829
              </span>
              <button
                type="button"
                onClick={handleCopyOtp}
                className="w-8 h-8 rounded-full flex items-center justify-center text-slate-500 hover:text-blue-600 active:bg-blue-100 transition-colors"
              >
                <span className="material-symbols-outlined text-[18px]">
                  {copiedOtp ? 'check' : 'content_copy'}
                </span>
              </button>
            </div>
          </div>

          {/* Driver Credentials */}
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAGFu1X36tdDWBa5SXstQj2P-4cJPrhAh1fKBCKaRz3xI0Q0iOjU_fjAGClvL_-iYymNkIinfHXzMxLVNYJ0RVZQSIuJpbjdZA_xbSeZpUT0Vw8FgRd8j6U8dMuoMIn9PJuWwzKLlEML7gmbvVzNWm9VruPFdc1WFgQiIqFw6Y3iZSw-DBq5F3P9WE3EsCkij9LXZAly5KyIuSuQtQj1Huf0kkmB_FSWKudvbXvqgByaEEhsAbMOrOKYA"
                  alt="Vikram Singh Chauffeur"
                  className="w-12 h-12 rounded-full object-cover shadow-xs"
                />
                <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5 shadow-xs">
                  <div className="bg-orange-600 text-white w-4 h-4 rounded-full flex items-center justify-center text-[10px]">
                    ✓
                  </div>
                </div>
              </div>
              <div className="flex flex-col min-w-0">
                <div className="flex items-center gap-1.5">
                  <h2 className="text-sm font-bold text-slate-900 truncate">Vikram Singh</h2>
                  <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-orange-100 text-orange-900 text-[10px] font-bold">
                    ★ 4.92
                  </span>
                </div>
                <p className="text-xs text-slate-500">Toyota Innova Crysta (AC)</p>
                <p className="text-[11px] text-slate-400 font-semibold font-mono">
                  MH 12 QX 4492
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1.5 shrink-0">
              <a
                href="tel:+919800000000"
                className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-xs active:scale-95 transition-transform"
              >
                <span className="material-symbols-outlined text-[18px]">call</span>
              </a>
              <button
                type="button"
                onClick={() => alert('Emergency SOS triggered for Passenger.')}
                className="w-9 h-9 rounded-full bg-red-100 text-red-700 flex items-center justify-center shadow-xs active:scale-95 transition-transform"
              >
                <span className="material-symbols-outlined text-[18px]">sos</span>
              </button>
            </div>
          </div>
        </div>

        {/* Digital M-Ticket Card */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm flex flex-col gap-3">
          <div className="flex items-center justify-between pb-1 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px] text-blue-600">
                confirmation_number
              </span>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-900">
                Digital M-Ticket
              </span>
            </div>
            <span className="text-xs font-mono font-bold bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
              #IW-9842
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 bg-slate-50 p-2.5 rounded-xl text-xs">
            <div>
              <span className="text-[10px] text-slate-400 uppercase font-semibold block">
                Scheduled Departure
              </span>
              <span className="font-bold text-slate-900">Today, 02:30 PM</span>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-slate-400 uppercase font-semibold block">
                Vehicle Type
              </span>
              <span className="font-bold text-blue-600">Spacious SUV</span>
            </div>
          </div>

          {/* Stops */}
          <div className="flex flex-col gap-2.5 relative px-1 py-1">
            <div className="flex items-start gap-2.5">
              <div className="w-5 h-5 rounded-full bg-blue-600 flex items-center justify-center text-white text-[10px] shrink-0 mt-0.5">
                •
              </div>
              <div>
                <span className="text-[10px] text-blue-600 font-semibold block uppercase">
                  Pickup Station
                </span>
                <p className="text-xs font-bold text-slate-900">Bandra Terminus, Mumbai</p>
                <p className="text-[11px] text-slate-400">Near Main Concourse Gate 3</p>
              </div>
            </div>
            <div className="flex items-start gap-2.5">
              <div className="w-5 h-5 rounded-full bg-orange-600 flex items-center justify-center text-white text-[10px] shrink-0 mt-0.5">
                •
              </div>
              <div>
                <span className="text-[10px] text-orange-600 font-semibold block uppercase">
                  Final Drop
                </span>
                <p className="text-xs font-bold text-slate-900">Koregaon Park, Pune</p>
                <p className="text-[11px] text-slate-400">Lane 7, Near South Main Road</p>
              </div>
            </div>
          </div>

          {/* Fare Summary */}
          <div className="bg-slate-50 rounded-xl p-3 flex flex-col gap-1.5 text-xs">
            <div className="flex justify-between text-slate-500">
              <span>Advance Paid Online</span>
              <span className="font-semibold text-slate-800">₹500</span>
            </div>
            <div className="flex justify-between text-orange-700 font-bold">
              <span>Due on Arrival (Cash / UPI)</span>
              <span>₹2,630</span>
            </div>
            <div className="flex justify-between text-slate-400 text-[11px] pt-1 border-t border-slate-200">
              <span>Total All-Inclusive Fare</span>
              <span className="font-semibold text-slate-800">₹3,130</span>
            </div>
          </div>
        </div>

        {/* 24x7 Support Desk */}
        <div className="flex items-center justify-between bg-blue-50 border border-blue-100 rounded-2xl p-3 px-4">
          <div className="flex items-center gap-2.5">
            <span className="material-symbols-outlined text-[20px] text-blue-600">
              support_agent
            </span>
            <div>
              <span className="text-xs font-bold text-slate-900 block">
                24x7 Intercity Safety Desk
              </span>
              <span className="text-[11px] text-slate-500">Instant route support available</span>
            </div>
          </div>
          <button
            type="button"
            onClick={onOpenSupport}
            className="px-3 py-1.5 rounded-lg bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700"
          >
            Chat
          </button>
        </div>

        {/* Primary Share CTA */}
        <button
          type="button"
          onClick={handleShare}
          className="w-full h-12 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-sm active:scale-95 transition-all mt-1"
        >
          <span className="material-symbols-outlined text-[18px]">share_location</span>
          <span>Share Live Tracking with Family</span>
        </button>
      </div>

      {/* Toast Notification */}
      {sharedToast && (
        <div className="fixed bottom-20 left-4 right-4 bg-slate-900 text-white p-3 rounded-xl shadow-xl flex items-center gap-2.5 z-50 animate-fade-in">
          <span className="material-symbols-outlined text-emerald-400 text-[20px]">
            check_circle
          </span>
          <span className="text-xs font-medium">Live GPS Tracking link copied to clipboard!</span>
        </div>
      )}
    </div>
  );
};
