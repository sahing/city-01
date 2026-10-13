import React, { useState } from 'react';

export const TariffMatrixScreen: React.FC = () => {
  const [serviceMode, setServiceMode] = useState<'oneway' | 'round' | 'rentals'>('oneway');
  const [baseFare, setBaseFare] = useState(1800);
  const [slab1, setSlab1] = useState(14);
  const [slab2, setSlab2] = useState(18);
  const [nightCharge, setNightCharge] = useState(true);
  const [driverAllowance, setDriverAllowance] = useState(300);
  const [surgeActive, setSurgeActive] = useState(true);
  const [showSimDrawer, setShowSimDrawer] = useState(false);
  const [publishedLive, setPublishedLive] = useState(false);

  // Simulation calculation: 160 KM trip at 11:30 PM
  const simBase = baseFare;
  const simTier1Dist = Math.max(0, 160 - 80);
  const simTier1Cost = simTier1Dist * slab1;
  const simNight = nightCharge ? 250 : 0;
  const simSubtotal = simBase + simTier1Cost + simNight;
  const simSurge = surgeActive ? Math.round(simSubtotal * 0.15) : 0;
  const simTotal = simSubtotal + simSurge;

  const handlePublish = () => {
    setPublishedLive(true);
    setTimeout(() => setPublishedLive(false), 2500);
  };

  return (
    <div className="flex flex-col w-full pb-36 animate-fade-in max-w-lg mx-auto px-4">
      {/* Top Banner */}
      <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 shadow-xs mt-3 space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-orange-600 animate-pulse shrink-0"></span>
            <span className="text-sm font-bold text-slate-900 truncate">
              Western Maharashtra Corridor
            </span>
          </div>
          <span className="px-2 py-0.5 rounded-full bg-orange-100 text-orange-800 text-[10px] font-bold uppercase">
            v3.1 Active
          </span>
        </div>
        <div className="flex items-center justify-between text-slate-500 text-xs">
          <span className="flex items-center gap-1">
            <span className="material-symbols-outlined text-[15px]">schedule</span>
            Synced 12m ago by OpsEngine
          </span>
          <span className="font-semibold text-blue-600 flex items-center cursor-pointer">
            Audit Log
            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
          </span>
        </div>
      </div>

      {/* Mode Tabs */}
      <div className="flex bg-slate-200/70 rounded-xl p-1 gap-1 my-3">
        {(['oneway', 'round', 'rentals'] as const).map((mode) => (
          <button
            key={mode}
            type="button"
            onClick={() => setServiceMode(mode)}
            className={`flex-1 py-2 px-2 rounded-lg text-xs font-semibold text-center transition-all capitalize ${
              serviceMode === mode
                ? 'bg-white text-blue-700 shadow-xs font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {mode === 'oneway' ? 'One-Way' : mode === 'round' ? 'Round Trip' : 'Rentals'}
          </button>
        ))}
      </div>

      {/* Tariff Rules Stack */}
      <div className="space-y-3">
        {/* Base Fare */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <span className="material-symbols-outlined text-[20px]">local_taxi</span>
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-bold text-slate-900">Base Fare Setup</span>
                  <span className="px-1.5 py-0.2 rounded bg-slate-100 text-[10px] text-slate-600 font-semibold">
                    Mandatory
                  </span>
                </div>
                <p className="text-[11px] text-slate-400">
                  Covers vehicle deployment & initial buffer
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => {
                const val = prompt('Enter new Base Fare (includes first 80 km):', String(baseFare));
                if (val && !isNaN(Number(val))) setBaseFare(Number(val));
              }}
              className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-blue-600 hover:bg-slate-200"
            >
              <span className="material-symbols-outlined text-[16px]">edit</span>
            </button>
          </div>

          <div className="mt-3 bg-slate-50 rounded-xl p-3 flex items-center justify-between">
            <div>
              <span className="text-xl font-bold text-slate-900">
                ₹{baseFare.toLocaleString('en-IN')}
              </span>
              <span className="text-xs text-slate-400 ml-1">flat fee</span>
            </div>
            <div className="flex items-center gap-1 text-xs font-semibold text-slate-700 bg-white border border-slate-200 px-2.5 py-1 rounded-full shadow-2xs">
              <span className="material-symbols-outlined text-orange-600 text-[15px]">speed</span>
              Includes first 80 km
            </div>
          </div>
        </div>

        {/* Incremental Slabs */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs space-y-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <span className="material-symbols-outlined text-[20px]">add_road</span>
              </div>
              <div>
                <span className="text-xs font-bold text-slate-900">Incremental Distance Slabs</span>
                <p className="text-[11px] text-slate-400">Step-tiered mileage post 80 km</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-1">
            <div className="bg-slate-50 rounded-xl p-3 flex flex-col justify-between">
              <span className="text-[10px] text-slate-400 font-semibold uppercase">
                Slab Tier 1 (81-200 km)
              </span>
              <div className="my-1 text-lg font-bold text-slate-900">
                ₹{slab1}
                <span className="text-xs text-slate-400 font-normal">/km</span>
              </div>
              <span className="text-[11px] text-blue-600 font-semibold">Standard Corridor</span>
            </div>

            <div className="bg-slate-50 rounded-xl p-3 flex flex-col justify-between">
              <span className="text-[10px] text-slate-400 font-semibold uppercase">
                Slab Tier 2 (&gt; 200 km)
              </span>
              <div className="my-1 text-lg font-bold text-slate-900">
                ₹{slab2}
                <span className="text-xs text-slate-400 font-normal">/km</span>
              </div>
              <span className="text-[11px] text-orange-600 font-semibold">Long Haul Multiplier</span>
            </div>
          </div>
        </div>

        {/* Night Charges */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <span className="material-symbols-outlined text-[20px]">bedtime</span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold text-slate-900">Night Charge</span>
                <span className="text-[10px] font-bold px-2 py-0.2 rounded-full bg-orange-100 text-orange-800">
                  +₹250
                </span>
              </div>
              <p className="text-[11px] text-slate-400">Window: 11:00 PM – 05:00 AM</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setNightCharge(!nightCharge)}
            className={`w-11 h-6 rounded-full relative transition-colors ${
              nightCharge ? 'bg-blue-600' : 'bg-slate-200'
            }`}
          >
            <span
              className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-all shadow-xs ${
                nightCharge ? 'right-1' : 'left-1'
              }`}
            ></span>
          </button>
        </div>

        {/* Driver Night Allowance */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <span className="material-symbols-outlined text-[20px]">
                airline_seat_recline_extra
              </span>
            </div>
            <div>
              <span className="text-xs font-bold text-slate-900">Driver Night Allowance</span>
              <p className="text-[11px] text-slate-400">Triggered for multi-day itineraries</p>
            </div>
          </div>
          <div className="text-right">
            <span className="text-sm font-bold text-slate-900">₹{driverAllowance}</span>
            <span className="text-xs text-slate-400">/night</span>
          </div>
        </div>

        {/* Dynamic Surge Toggle */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-slate-900">Weekend & Holiday Surge</span>
              <p className="text-[11px] text-slate-400">+15% on aggregate slab rates</p>
            </div>
            <button
              type="button"
              onClick={() => setSurgeActive(!surgeActive)}
              className={`w-11 h-6 rounded-full relative transition-colors ${
                surgeActive ? 'bg-orange-600' : 'bg-slate-200'
              }`}
            >
              <span
                className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-all shadow-xs ${
                  surgeActive ? 'right-1' : 'left-1'
                }`}
              ></span>
            </button>
          </div>
        </div>
      </div>

      {/* Simulator Drawer */}
      {showSimDrawer && (
        <div className="bg-slate-100 rounded-2xl p-4 mt-3 border border-slate-200 animate-fade-in space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-blue-700 flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px]">calculate</span>
              Quick Model: 160 KM Trip @ 11:30 PM
            </span>
            <button
              type="button"
              onClick={() => setShowSimDrawer(false)}
              className="text-slate-400 hover:text-slate-600 text-xs font-bold"
            >
              ✕
            </button>
          </div>
          <div className="bg-white rounded-xl p-3 text-xs space-y-1.5 text-slate-600 border border-slate-200/60">
            <div className="flex justify-between">
              <span>Base Fare (80 km):</span>
              <span className="font-semibold text-slate-900">₹{simBase}</span>
            </div>
            <div className="flex justify-between">
              <span>Tier 1 Distance (80 km × ₹{slab1}):</span>
              <span className="font-semibold text-slate-900">₹{simTier1Cost}</span>
            </div>
            <div className="flex justify-between">
              <span>Night Operational Buffer:</span>
              <span className="font-semibold text-slate-900">₹{simNight}</span>
            </div>
            {surgeActive && (
              <div className="flex justify-between text-orange-600 font-semibold">
                <span>Weekend Surge (+15%):</span>
                <span>+₹{simSurge}</span>
              </div>
            )}
            <div className="pt-2 border-t border-slate-100 flex justify-between font-bold text-slate-900 text-sm">
              <span>Estimated Total:</span>
              <span className="text-blue-600 font-bold">₹{simTotal.toLocaleString('en-IN')}</span>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Action Bar */}
      <div className="fixed bottom-14 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 px-4 py-2.5">
        <div className="max-w-md mx-auto flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => setShowSimDrawer(!showSimDrawer)}
            className="flex-1 h-11 rounded-xl bg-slate-100 text-slate-900 font-semibold text-xs flex items-center justify-center gap-1.5 hover:bg-slate-200"
          >
            <span className="material-symbols-outlined text-[18px] text-blue-600">calculate</span>
            <span>{showSimDrawer ? 'Hide Simulation' : 'Simulate Rate'}</span>
          </button>
          <button
            type="button"
            onClick={handlePublish}
            className={`flex-1 h-11 rounded-xl text-white font-semibold text-xs flex items-center justify-center gap-1.5 shadow-sm transition-all ${
              publishedLive ? 'bg-emerald-600' : 'bg-orange-600 hover:bg-orange-700'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">
              {publishedLive ? 'check_circle' : 'publish'}
            </span>
            <span>{publishedLive ? 'Tariff Published Live!' : 'Publish Update'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
