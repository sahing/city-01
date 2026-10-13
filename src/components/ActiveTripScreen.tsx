import React, { useState } from 'react';

interface ActiveTripProps {
  onBack: () => void;
  onTripCompleted: () => void;
}

export const ActiveTripScreen: React.FC<ActiveTripProps> = ({
  onBack,
  onTripCompleted,
}) => {
  const [otpDigits, setOtpDigits] = useState(['', '', '', '']);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [fastTagLogged, setFastTagLogged] = useState(320);

  const handleOtpChange = (index: number, val: string) => {
    if (val.length > 1) val = val.slice(-1);
    const updated = [...otpDigits];
    updated[index] = val;
    setOtpDigits(updated);

    if (val && index < 3) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleVerifyTrip = () => {
    const code = otpDigits.join('');
    if (code.length === 4) {
      setToastMessage('Trip Validation Initiated • Generating receipt & releasing escrow hold...');
      setTimeout(() => {
        onTripCompleted();
      }, 1500);
    } else {
      setToastMessage('Please enter 4-digit drop OTP given by passenger.');
      setTimeout(() => setToastMessage(null), 3000);
    }
  };

  return (
    <div className="flex flex-col w-full pb-24 animate-fade-in max-w-md mx-auto px-4">
      {/* Header Strip */}
      <div className="flex items-center justify-between pt-3 pb-2">
        <div className="flex items-center gap-1.5">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100 text-orange-900 text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-orange-600 animate-pulse"></span>
            Trip In Progress
          </span>
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-medium">
            <span className="material-symbols-outlined text-[14px] text-blue-600">speed</span>
            65 km/h
          </span>
        </div>
        <button
          type="button"
          onClick={() => {
            alert('SOS Helpline Triggered: 24x7 Safety desk notified with live GPS coordinates.');
          }}
          className="flex items-center gap-1 px-3 py-1 rounded-full bg-red-100 text-red-700 text-xs font-bold active:scale-95 transition-transform"
        >
          <span className="material-symbols-outlined text-[15px]">sos</span>
          <span>SOS</span>
        </button>
      </div>

      {/* Map Surface & Telemetry HUD */}
      <div className="relative w-full rounded-2xl overflow-hidden shadow-md bg-slate-100 mt-1">
        <div
          className="w-full h-56 bg-cover bg-center relative"
          style={{
            backgroundImage:
              "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAv9LWl4U-Up-JVn3P-PQRh8rCW9LNiVQ3erbe0j6MOJclOXiDXDNmRj2fAKW5ly0u9GOmZWRwsydTVK-672WIm0vvDYe7PJ9rlPZjy4VvpKn-9M-_j6QeEftvXDwCYzvyL6Q4NAKThC34763v-PsVQA5o9B2eTlwR56SVuanTmDrIdKGuKfXLXK8l4zOKQ4KgmT39528f-SdCoeIvJiyRPTJQr3O6sXaQtS9zDIFiaU_o-WHcGXm_WJQ')",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 via-transparent to-slate-900/90 pointer-events-none"></div>
        </div>

        {/* Live Turn Direction Overlay */}
        <div className="absolute top-2.5 inset-x-2.5 bg-slate-900/95 text-white p-2.5 rounded-xl backdrop-blur-md flex items-start gap-2.5 shadow-lg">
          <div className="w-9 h-9 rounded-lg bg-blue-600 text-white flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-[24px]">turn_sharp_right</span>
          </div>
          <div className="flex flex-col min-w-0 flex-1">
            <div className="flex items-baseline justify-between gap-1">
              <span className="font-bold text-sm leading-none">In 400m</span>
              <span className="text-[10px] font-semibold text-blue-300 bg-blue-900/60 px-1.5 py-0.5 rounded">
                Lane 2 or 3
              </span>
            </div>
            <p className="text-xs text-slate-300 truncate mt-1">
              Take Mumbai-Pune Expwy Exit towards Lonavala
            </p>
          </div>
        </div>

        {/* Quick Stats Telemetry Ribbon */}
        <div className="absolute bottom-2.5 inset-x-2.5 grid grid-cols-3 gap-1 bg-white/95 backdrop-blur-md rounded-xl p-1.5 shadow-md">
          <div className="flex flex-col items-center justify-center p-1 text-center">
            <span className="text-[10px] text-slate-400 font-medium">Est. Arrival</span>
            <span className="text-sm font-bold text-blue-600">02:45 AM</span>
          </div>
          <div className="flex flex-col items-center justify-center p-1 text-center bg-slate-50 rounded-lg">
            <span className="text-[10px] text-slate-400 font-medium">Distance</span>
            <span className="text-sm font-bold text-slate-800">48 km</span>
          </div>
          <div className="flex flex-col items-center justify-center p-1 text-center">
            <span className="text-[10px] text-slate-400 font-medium">Live Speed</span>
            <div className="flex items-baseline gap-0.5">
              <span className="text-sm font-bold text-orange-600">65</span>
              <span className="text-[10px] text-slate-400">km/h</span>
            </div>
          </div>
        </div>
      </div>

      {/* Passenger Profile Card */}
      <div className="flex flex-col w-full bg-white p-4 rounded-2xl border border-slate-200 shadow-sm mt-3 gap-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="relative shrink-0">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDvJbu0mPtcHEBZu0TWpNWCpluibV2a9_hbDlfmsCr794CL_Mm7DG1G9Lp6451-9s4BB6ikXuerIYuy84LTOChnzrNA11YfNJEQNVhLXgA1JoyNpT2dmzT3RGDCJRMsQMHBvxns9hzls69suDH7QfnP6XIDEmSfCQPIprQ2xFHw0D4Tk9-0qx8lVt9RgSBMTmGADp3fXgbJ8HAlywouEaq1wAnUZKMtGE0tBkLyZ4Byi03VxzBbLX5ddA"
                alt="Rahul S."
                className="w-12 h-12 rounded-full object-cover"
              />
              <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-blue-600 rounded-full flex items-center justify-center text-white text-[9px]">
                ✓
              </span>
            </div>
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="text-sm font-bold text-slate-900 truncate">Rahul S.</span>
                <span className="inline-flex items-center px-1.5 py-0.2 rounded bg-slate-100 text-slate-700 text-[10px] font-semibold">
                  ★ 4.9
                </span>
              </div>
              <span className="text-xs text-slate-500">+91 ••••• 84210 (Masked)</span>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              className="w-10 h-10 rounded-full bg-blue-50 text-blue-700 flex items-center justify-center shadow-xs active:scale-90 transition-transform"
            >
              <span className="material-symbols-outlined text-[18px]">phone_in_talk</span>
            </button>
            <button
              type="button"
              className="w-10 h-10 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center shadow-xs active:scale-90 transition-transform"
            >
              <span className="material-symbols-outlined text-[18px]">chat</span>
            </button>
          </div>
        </div>

        {/* Detailed Route */}
        <div className="flex flex-col gap-2 bg-slate-50 p-3 rounded-xl text-xs">
          <div className="flex items-start gap-2.5">
            <div className="flex flex-col items-center pt-0.5">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-600 ring-2 ring-blue-100"></span>
              <span className="w-0.5 h-6 bg-slate-300 my-0.5"></span>
              <span className="w-2.5 h-2.5 rounded bg-orange-600"></span>
            </div>
            <div className="flex flex-col justify-between flex-1 gap-2">
              <div>
                <span className="text-[10px] text-slate-400 font-semibold block uppercase">
                  Pickup Location
                </span>
                <span className="font-semibold text-slate-900">Bandra West, Mumbai</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 font-semibold block uppercase">
                  Drop Location
                </span>
                <span className="font-semibold text-slate-900">Koregaon Park, Pune</span>
              </div>
            </div>
          </div>
        </div>

        {/* Start Milestone */}
        <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-slate-100/70 text-xs">
          <div className="flex items-center gap-1.5">
            <span className="w-4 h-4 rounded-full bg-blue-600 flex items-center justify-center text-white text-[10px]">
              ✓
            </span>
            <span className="font-semibold text-slate-800">Start OTP Verified</span>
          </div>
          <span className="text-slate-500 font-medium">Code: 5892 • 10:35 PM</span>
        </div>
      </div>

      {/* Drop-off Verification Container */}
      <div className="flex flex-col w-full bg-white p-4 rounded-2xl border border-slate-200 shadow-sm mt-3 gap-3">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-sm font-bold text-slate-900 block">Drop-off Verification</span>
            <span className="text-xs text-slate-500">
              Request 4-digit drop OTP from customer
            </span>
          </div>
          <span className="material-symbols-outlined text-blue-600 text-[24px]">pin</span>
        </div>

        {/* 4-Digit Boxes */}
        <div className="flex items-center justify-center gap-3 py-1">
          {[0, 1, 2, 3].map((idx) => (
            <input
              key={idx}
              id={`otp-input-${idx}`}
              type="text"
              maxLength={1}
              value={otpDigits[idx]}
              onChange={(e) => handleOtpChange(idx, e.target.value)}
              placeholder="•"
              className="w-14 h-14 text-center font-bold text-xl rounded-xl bg-slate-100 text-slate-900 border border-slate-200 focus:bg-white focus:border-blue-600 outline-none transition-all shadow-inner"
            />
          ))}
        </div>

        <button
          type="button"
          onClick={handleVerifyTrip}
          className="w-full h-12 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-sm active:scale-95 transition-all"
        >
          <span className="material-symbols-outlined text-[20px]">verified_user</span>
          <span>Verify & Complete Trip</span>
        </button>
      </div>

      {/* Auxiliary FastTag & Support Grid */}
      <div className="grid grid-cols-2 gap-3 w-full mt-3">
        <div className="p-3 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between w-full">
            <span className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center">
              <span className="material-symbols-outlined text-[18px]">receipt_long</span>
            </span>
            <span className="text-xs font-bold text-orange-600">+₹{fastTagLogged} Added</span>
          </div>
          <div className="mt-2">
            <span className="text-xs font-bold text-slate-900 block">FastTag / Tolls</span>
            <span className="text-[11px] text-slate-500 truncate block">Auto-logged: Khalapur</span>
          </div>
        </div>

        <div className="p-3 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between w-full">
            <span className="w-8 h-8 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center">
              <span className="material-symbols-outlined text-[18px]">report_problem</span>
            </span>
            <span className="text-[10px] font-semibold text-slate-500">Support</span>
          </div>
          <div className="mt-2">
            <span className="text-xs font-bold text-slate-900 block">Report Issue</span>
            <span className="text-[11px] text-slate-500 truncate block">Route or breakdown</span>
          </div>
        </div>
      </div>

      {/* Toast */}
      {toastMessage && (
        <div className="fixed bottom-20 left-4 right-4 bg-slate-900 text-white p-3 rounded-xl shadow-xl flex items-center gap-2.5 z-50 animate-bounce">
          <span className="material-symbols-outlined text-emerald-400 text-[20px]">
            check_circle
          </span>
          <span className="text-xs font-medium">{toastMessage}</span>
        </div>
      )}
    </div>
  );
};
