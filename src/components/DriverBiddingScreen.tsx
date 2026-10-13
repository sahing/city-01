import React, { useState, useEffect } from 'react';
import { AuctionLead } from '../mockData';

interface DriverBiddingProps {
  leads: AuctionLead[];
  onOpenActiveTrip: () => void;
  onOpenKyc: () => void;
  onOpenWallet: () => void;
}

export const DriverBiddingScreen: React.FC<DriverBiddingProps> = ({
  leads,
  onOpenActiveTrip,
  onOpenKyc,
  onOpenWallet,
}) => {
  const [activeTab, setActiveTab] = useState<'marketplace' | 'trips'>('marketplace');
  const [isOnline, setIsOnline] = useState(true);
  const [activeLead, setActiveLead] = useState<AuctionLead>(leads[0]);
  const [bidAmount, setBidAmount] = useState(3300);
  const [timerSeconds, setTimerSeconds] = useState(98);
  const [submittedStatus, setSubmittedStatus] = useState<string | null>(null);

  // Active Trip OTP
  const [endOtp, setEndOtp] = useState('');
  const [isDropVerified, setIsDropVerified] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimerSeconds((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const mins = Math.floor(timerSeconds / 60);
  const secs = timerSeconds % 60;
  const timeFormatted = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}s`;

  // Financial calculations
  const platformCommission = Math.round(bidAmount * 0.12);
  const netTakeHome = bidAmount - platformCommission;

  const handleSubmitBid = () => {
    setSubmittedStatus('transmitting');
    setTimeout(() => {
      setSubmittedStatus('confirmed');
      setTimeout(() => setSubmittedStatus(null), 3500);
    }, 800);
  };

  return (
    <div className="flex flex-col w-full pb-28 animate-fade-in max-w-md mx-auto px-4">
      {/* Driver Header Card */}
      <div className="pt-4 flex flex-col gap-3">
        <div className="bg-white rounded-2xl p-4 border border-slate-200 flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-3 min-w-0">
            <div className="relative shrink-0">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAXo95vq_zeXJR1jfAaIZukZu9xw5_wR3dt_L13bSnpSAZMIYeePp2bvOFx_p5lzxQduvgbMVkECPqOiNIr2ldrdOhCzeBZNcyXeALqIhrcJ3vBbjMF4rQNzTQFwyst5eKxqnj0eIA8MISGBty-c7j1gfTO1W_8KeYAaIRkY8vrMLUD-raSxMP_WAf4EtJ9XhTN1Rqhg9PoR6MNp494DtW8gwds1Nr3wcZb9sJoN73RVdhs4t03l0VIUQ"
                alt="Vikram Singh Chauffeur"
                className="w-12 h-12 rounded-full object-cover ring-2 ring-slate-100"
              />
              <span className="absolute -bottom-0.5 -right-0.5 bg-blue-600 text-white p-0.5 rounded-full shadow-xs flex items-center justify-center">
                <span className="material-symbols-outlined text-[11px] block">check</span>
              </span>
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <h1 className="text-base text-slate-900 font-bold tracking-tight truncate">
                  Vikram Singh
                </h1>
                <span className="inline-flex items-center gap-0.5 text-xs font-semibold text-slate-700 bg-slate-100 px-1.5 py-0.5 rounded-full">
                  <span
                    className="material-symbols-outlined text-[13px] text-orange-500"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    star
                  </span>
                  4.92
                </span>
              </div>
              <p className="text-xs text-slate-500 truncate">Innova Crysta • MH 12 QX 4492</p>
            </div>
          </div>

          {/* Online Toggle */}
          <button
            type="button"
            onClick={() => setIsOnline(!isOnline)}
            className={`shrink-0 flex items-center gap-2 pl-3 pr-3.5 py-1.5 rounded-full border transition-all ${
              isOnline ? 'border-emerald-200 bg-emerald-50/50' : 'border-slate-200 bg-slate-100'
            }`}
          >
            <span className="relative flex h-2.5 w-2.5">
              {isOnline && (
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
              )}
              <span
                className={`relative inline-flex rounded-full h-2.5 w-2.5 ${
                  isOnline ? 'bg-emerald-500' : 'bg-slate-400'
                }`}
              ></span>
            </span>
            <span className="text-xs font-semibold text-slate-800">
              {isOnline ? 'Online' : 'Offline'}
            </span>
          </button>
        </div>

        {/* Escrow Balance Banner */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs text-slate-500 font-medium">Escrow Balance</span>
              <span className="inline-flex items-center text-blue-700 text-[11px] font-semibold bg-blue-50 px-1.5 py-0.5 rounded">
                Eligible
              </span>
            </div>
            <div className="flex items-baseline gap-2 mt-0.5">
              <span className="text-2xl font-bold text-slate-900 tracking-tight">₹4,850</span>
              <span className="text-xs text-slate-400">₹1,200 reserve</span>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={onOpenWallet}
              className="bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold px-3 py-2 rounded-xl flex items-center gap-1 transition-colors"
            >
              <span className="material-symbols-outlined text-[16px]">account_balance_wallet</span>
              <span>Ledger</span>
            </button>
            <button
              type="button"
              onClick={onOpenKyc}
              className="bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-2 rounded-xl flex items-center gap-1 transition-colors"
            >
              <span className="material-symbols-outlined text-[16px]">verified</span>
              <span>KYC (3/4)</span>
            </button>
          </div>
        </div>

        {/* Main Segment Tabs */}
        <div className="flex bg-slate-200/70 p-1 rounded-xl">
          <button
            type="button"
            onClick={() => setActiveTab('marketplace')}
            className={`flex-1 py-2 text-center rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'marketplace'
                ? 'bg-white text-blue-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Live Auctions ({leads.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('trips')}
            className={`flex-1 py-2 text-center rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'trips'
                ? 'bg-white text-blue-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Active Trip (1)
          </button>
        </div>
      </div>

      {/* Tab 1: Marketplace Bidding */}
      {activeTab === 'marketplace' && (
        <div className="pt-3 flex flex-col gap-4">
          {/* Main Hot Auction Lead */}
          <div className="bg-white rounded-2xl border border-slate-200 p-4 flex flex-col gap-4 shadow-sm">
            {/* Header / Countdown */}
            <div className="flex items-center justify-between pb-1 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-orange-500 animate-ping"></span>
                <span className="text-xs font-bold text-slate-900">Priority Outstation</span>
                <span className="text-slate-400 text-xs">• {activeLead.bidsCount} Bids</span>
              </div>
              <div className="flex items-center gap-1 text-orange-600 text-xs font-bold">
                <span className="material-symbols-outlined text-[15px]">timer</span>
                <span>{timeFormatted}</span>
              </div>
            </div>

            {/* Route Details */}
            <div className="flex flex-col gap-2.5">
              <div className="flex items-start gap-3">
                <div className="flex flex-col items-center mt-1">
                  <div className="w-2.5 h-2.5 rounded-full bg-blue-600"></div>
                  <div className="w-0.5 h-7 bg-slate-200"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-orange-600"></div>
                </div>
                <div className="flex-1 flex flex-col gap-2 min-w-0">
                  <div>
                    <div className="flex items-baseline justify-between">
                      <span className="text-sm font-bold text-slate-900 truncate">
                        {activeLead.from}
                      </span>
                      <span className="text-xs text-blue-600 font-medium shrink-0">
                        {activeLead.scheduledTime}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500">{activeLead.pickupDetail}</p>
                  </div>
                  <div>
                    <div className="flex items-baseline justify-between">
                      <span className="text-sm font-bold text-slate-900 truncate">
                        {activeLead.to}
                      </span>
                      <span className="text-[11px] text-slate-400 shrink-0">
                        {activeLead.distanceKm} km • ~{activeLead.duration}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500">{activeLead.dropDetail}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Price Target Info */}
            <div className="bg-slate-50 rounded-xl p-3 flex items-center justify-between text-center">
              <div>
                <span className="text-[10px] text-slate-500 uppercase font-semibold">
                  Customer Budget
                </span>
                <div className="text-xs text-slate-400 line-through">
                  ₹{activeLead.customerBudget.toLocaleString('en-IN')}
                </div>
              </div>
              <div className="h-6 w-px bg-slate-200"></div>
              <div>
                <span className="text-[10px] text-slate-500 uppercase font-semibold">
                  Current Lowest
                </span>
                <div className="text-xs text-blue-600 font-bold">
                  ₹{activeLead.currentLowestBid.toLocaleString('en-IN')}{' '}
                  <span className="text-[10px] text-slate-400">(RJ-08)</span>
                </div>
              </div>
              <div className="h-6 w-px bg-slate-200"></div>
              <div>
                <span className="text-[10px] text-slate-500 uppercase font-semibold">
                  Target Range
                </span>
                <div className="text-xs text-orange-600 font-bold">
                  ₹{activeLead.targetRangeMin.toLocaleString('en-IN')} - ₹
                  {activeLead.targetRangeMax.toLocaleString('en-IN')}
                </div>
              </div>
            </div>

            {/* Bidding Control */}
            <div className="flex flex-col gap-3 pt-1">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-800 font-semibold">Your Counter-Bid</span>
                <span className="text-2xl font-bold text-blue-600 tracking-tight">
                  ₹{bidAmount.toLocaleString('en-IN')}
                </span>
              </div>

              {/* Chips */}
              <div className="grid grid-cols-3 gap-2">
                {[3350, 3300, 3250].map((val) => (
                  <button
                    key={val}
                    type="button"
                    onClick={() => setBidAmount(val)}
                    className={`py-2 rounded-xl text-xs font-semibold transition-all ${
                      bidAmount === val
                        ? 'bg-blue-600 text-white shadow-xs'
                        : 'bg-slate-100 text-slate-800 hover:bg-slate-200'
                    }`}
                  >
                    ₹{val.toLocaleString('en-IN')}
                  </button>
                ))}
              </div>

              {/* Slider */}
              <div className="px-1 py-1">
                <input
                  type="range"
                  min={3000}
                  max={3500}
                  step={50}
                  value={bidAmount}
                  onChange={(e) => setBidAmount(Number(e.target.value))}
                  className="w-full accent-blue-600 h-1.5 bg-slate-200 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-medium mt-1">
                  <span>₹3,000</span>
                  <span>₹3,500</span>
                </div>
              </div>

              {/* Instant Net Payout Strip */}
              <div className="flex items-center justify-between py-2 px-3 bg-slate-50 rounded-xl text-xs">
                <div className="flex items-center gap-1.5 text-slate-500">
                  <span>Commission 12%:</span>
                  <span className="text-orange-600 font-medium">
                    -₹{platformCommission.toLocaleString('en-IN')}
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-slate-800 font-medium">Net Take-Home:</span>
                  <span className="text-xs font-bold text-emerald-600">
                    ₹{netTakeHome.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="button"
                onClick={handleSubmitBid}
                disabled={submittedStatus !== null}
                className={`w-full h-12 text-white font-semibold text-sm rounded-xl shadow-xs flex items-center justify-center gap-2 transition-all active:scale-[0.99] ${
                  submittedStatus === 'confirmed'
                    ? 'bg-emerald-600'
                    : 'bg-blue-600 hover:bg-blue-700'
                }`}
              >
                <span className="material-symbols-outlined text-[19px]">
                  {submittedStatus === 'confirmed' ? 'check_circle' : 'gavel'}
                </span>
                <span>
                  {submittedStatus === 'transmitting'
                    ? 'Transmitting Bid...'
                    : submittedStatus === 'confirmed'
                    ? `Bid Submitted! Rank #1 (${timeFormatted})`
                    : `Submit Counter Bid • ₹${bidAmount.toLocaleString('en-IN')}`}
                </span>
              </button>
            </div>
          </div>

          {/* Secondary Leads */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between px-1">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Upcoming Available Leads
              </span>
              <span className="text-xs text-blue-600 font-medium">{leads.length - 1} More</span>
            </div>

            {leads.slice(1).map((lead) => (
              <div
                key={lead.id}
                className="bg-white rounded-xl border border-slate-200 p-3 flex items-center justify-between hover:bg-slate-50 transition-colors"
              >
                <div className="min-w-0 pr-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-900 truncate">
                      {lead.from} ➔ {lead.to}
                    </span>
                    <span className="text-[10px] bg-slate-100 px-1.5 py-0.2 rounded text-slate-600">
                      {lead.vehicleCategory}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5">
                    {lead.scheduledTime} • {lead.distanceKm} km
                  </div>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-sm font-bold text-slate-900">
                    ₹{lead.currentLowestBid.toLocaleString('en-IN')}
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      setActiveLead(lead);
                      setBidAmount(lead.targetRangeMin);
                    }}
                    className="text-blue-600 text-xs font-semibold px-2.5 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100"
                  >
                    Bid
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 2: Active Trip Mode */}
      {activeTab === 'trips' && (
        <div className="pt-3 flex flex-col gap-4">
          <div className="bg-white rounded-2xl border border-slate-200 p-4 flex flex-col gap-4 shadow-sm">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="text-xs font-bold text-slate-900">In Transit (Leg 1/2)</span>
              </div>
              <span className="text-xs font-bold text-blue-600">₹1,450 Collectable</span>
            </div>

            <div>
              <h2 className="text-sm font-bold text-slate-900">
                Mumbai Bandra ➔ Pune Koregaon Park
              </h2>
              <p className="text-[11px] text-slate-500 mt-0.5">
                148 km • Expressway Tolls Auto-Logged
              </p>
            </div>

            {/* Passenger Mini Card */}
            <div className="bg-slate-50 rounded-xl p-3 flex items-center justify-between">
              <div className="flex items-center gap-3 min-w-0">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDvJbu0mPtcHEBZu0TWpNWCpluibV2a9_hbDlfmsCr794CL_Mm7DG1G9Lp6451-9s4BB6ikXuerIYuy84LTOChnzrNA11YfNJEQNVhLXgA1JoyNpT2dmzT3RGDCJRMsQMHBvxns9hzls69suDH7QfnP6XIDEmSfCQPIprQ2xFHw0D4Tk9-0qx8lVt9RgSBMTmGADp3fXgbJ8HAlywouEaq1wAnUZKMtGE0tBkLyZ4Byi03VxzBbLX5ddA"
                  alt="Rahul S."
                  className="w-10 h-10 rounded-full object-cover shrink-0"
                />
                <div className="min-w-0">
                  <div className="flex items-center gap-1">
                    <span className="text-xs font-bold text-slate-900 truncate">Rahul S.</span>
                    <span className="text-[11px] text-slate-500">★ 4.9</span>
                  </div>
                  <span className="text-[10px] text-slate-400">Masked: +91 98-4210-XXXX</span>
                </div>
              </div>
              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  type="button"
                  className="w-9 h-9 rounded-full bg-white hover:bg-slate-100 text-blue-600 border border-slate-200 flex items-center justify-center transition-colors"
                >
                  <span className="material-symbols-outlined text-[18px]">call</span>
                </button>
                <button
                  type="button"
                  className="w-9 h-9 rounded-full bg-white hover:bg-slate-100 text-blue-600 border border-slate-200 flex items-center justify-center transition-colors"
                >
                  <span className="material-symbols-outlined text-[18px]">chat</span>
                </button>
              </div>
            </div>

            {/* Dual OTP Panel */}
            <div className="bg-slate-50 rounded-xl p-3.5 flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900 flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px] text-blue-600">
                    verified_user
                  </span>
                  Dual-OTP Verification
                </span>
                <span className="text-[10px] text-slate-400">MoRTH Compliant</span>
              </div>

              {/* Start OTP */}
              <div className="flex items-center justify-between text-xs py-1.5 px-3 bg-white rounded-lg border border-slate-200">
                <span className="text-slate-600 font-medium">1. Start OTP</span>
                <span className="text-emerald-600 font-semibold flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">check_circle</span>{' '}
                  Verified (5892)
                </span>
              </div>

              {/* Drop OTP */}
              <div className="flex flex-col gap-2 bg-white p-3 rounded-lg border border-slate-200">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-800 font-medium">2. Drop-off OTP</span>
                  <span
                    className={`font-semibold ${
                      isDropVerified ? 'text-emerald-600' : 'text-orange-600'
                    }`}
                  >
                    {isDropVerified ? 'Completed' : 'Request from Passenger'}
                  </span>
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    maxLength={4}
                    value={endOtp}
                    onChange={(e) => setEndOtp(e.target.value)}
                    placeholder="••••"
                    className="w-28 bg-slate-50 px-3 py-2 rounded-lg text-slate-900 font-bold text-center tracking-widest text-sm focus:outline-none focus:ring-1 focus:ring-blue-600 border border-slate-200"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (endOtp.length === 4) setIsDropVerified(true);
                    }}
                    className="flex-1 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg flex items-center justify-center gap-1"
                  >
                    Verify & Complete
                  </button>
                </div>
                {isDropVerified && (
                  <div className="text-xs text-emerald-600 font-medium flex items-center gap-1 pt-1">
                    <span className="material-symbols-outlined text-[14px]">check_circle</span>
                    Trip completed! Collect ₹2,630 due on arrival.
                  </div>
                )}
              </div>
            </div>

            <button
              type="button"
              onClick={onOpenActiveTrip}
              className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-xl flex items-center justify-center gap-1.5 shadow-xs"
            >
              <span className="material-symbols-outlined text-[18px]">navigation</span>
              <span>Open Turn-by-Turn Telemetry Screen</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
