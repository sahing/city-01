import React, { useState } from 'react';

interface WalletEarningsProps {
  onBack: () => void;
  onOpenKyc: () => void;
}

export const WalletEarningsScreen: React.FC<WalletEarningsProps> = ({
  onBack,
  onOpenKyc,
}) => {
  const [selectedPeriod, setSelectedPeriod] = useState<'today' | 'week' | 'month'>('week');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const earningsData = {
    today: { amount: '₹2,904', trips: 3, acceptance: '100%', rating: '4.95' },
    week: { amount: '₹14,250', trips: 18, acceptance: '98%', rating: '4.92' },
    month: { amount: '₹52,400', trips: 64, acceptance: '99%', rating: '4.94' },
  };

  const currentStats = earningsData[selectedPeriod];

  return (
    <div className="flex flex-col w-full pb-28 animate-fade-in max-w-md mx-auto px-4">
      {/* Top Header */}
      <div className="pt-3 pb-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onBack}
            className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center text-slate-800 hover:bg-slate-200"
          >
            <span className="material-symbols-outlined text-[18px]">arrow_back</span>
          </button>
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
              Driver Wallet
            </span>
            <h1 className="text-sm font-bold text-slate-900 leading-tight">Earnings & Ledger</h1>
          </div>
        </div>
        <button
          type="button"
          onClick={onOpenKyc}
          className="px-3 py-1.5 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold flex items-center gap-1"
        >
          <span className="material-symbols-outlined text-[14px]">badge</span>
          <span>KYC</span>
        </button>
      </div>

      {/* Balance Card */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm flex flex-col gap-3 mt-2">
        <div className="flex items-start justify-between">
          <div>
            <span className="text-xs text-slate-500 font-medium flex items-center gap-1">
              Available Balance
              <span className="material-symbols-outlined text-[14px] text-slate-400">info</span>
            </span>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className="text-3xl font-bold text-slate-900 tracking-tight">₹4,850</span>
              <span className="text-xs text-slate-400 font-semibold">.00</span>
            </div>
          </div>
          <div className="bg-emerald-50 text-emerald-700 border border-emerald-200 px-2.5 py-1 rounded-full flex items-center gap-1 text-[11px] font-bold">
            <span className="material-symbols-outlined text-[13px]">check_circle</span>
            Eligible for Bidding
          </div>
        </div>

        {/* Escrow Banner */}
        <div className="bg-slate-50 rounded-xl p-3 flex items-center justify-between border border-slate-100">
          <div className="flex items-center gap-2 text-slate-600 text-xs">
            <span className="material-symbols-outlined text-[18px] text-slate-500">lock</span>
            <div>
              <span className="font-semibold text-slate-800 block">Security Escrow Reserve</span>
              <span className="text-[10px] text-slate-400">Active trip guarantee</span>
            </div>
          </div>
          <span className="text-xs font-bold text-slate-900">
            ₹1,200 <span className="text-[10px] text-slate-400 font-normal">(Locked)</span>
          </span>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2.5 pt-1">
          <button
            type="button"
            onClick={() => {
              setToastMessage('Payout request of ₹4,850 initiated via instant IMPS.');
              setTimeout(() => setToastMessage(null), 3000);
            }}
            className="h-11 bg-orange-600 hover:bg-orange-700 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 shadow-xs"
          >
            <span className="material-symbols-outlined text-[17px]">payments</span>
            <span>Request Payout</span>
          </button>
          <button
            type="button"
            onClick={() => {
              setToastMessage('Escrow gateway opened. UPI/Netbanking reload available.');
              setTimeout(() => setToastMessage(null), 3000);
            }}
            className="h-11 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 shadow-xs"
          >
            <span className="material-symbols-outlined text-[17px]">add_card</span>
            <span>Add Funds</span>
          </button>
        </div>
      </div>

      {/* Earnings Overview */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm flex flex-col gap-3 mt-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">
            Earnings Summary
          </span>
          <span className="text-xs text-blue-600 font-semibold">Auto-payout: Fri</span>
        </div>

        {/* Period Selector */}
        <div className="grid grid-cols-3 bg-slate-100 p-1 rounded-xl gap-1">
          {(['today', 'week', 'month'] as const).map((period) => (
            <button
              key={period}
              type="button"
              onClick={() => setSelectedPeriod(period)}
              className={`py-1.5 rounded-lg text-center transition-all ${
                selectedPeriod === period
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <span className="block text-[10px] text-slate-400 font-semibold uppercase">
                {period === 'today' ? 'Today' : period === 'week' ? 'This Week' : 'This Month'}
              </span>
              <span className="text-xs font-bold text-slate-900">
                {earningsData[period].amount}
              </span>
            </button>
          ))}
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-3 gap-2 pt-1 text-center">
          <div className="bg-slate-50 rounded-xl p-2.5">
            <span className="material-symbols-outlined text-blue-600 text-[18px]">route</span>
            <div className="text-base font-bold text-slate-900 mt-0.5">{currentStats.trips}</div>
            <span className="text-[10px] text-slate-400 font-medium">Trips Done</span>
          </div>
          <div className="bg-slate-50 rounded-xl p-2.5">
            <span className="material-symbols-outlined text-emerald-600 text-[18px]">thumb_up</span>
            <div className="text-base font-bold text-slate-900 mt-0.5">
              {currentStats.acceptance}
            </div>
            <span className="text-[10px] text-slate-400 font-medium">Acceptance</span>
          </div>
          <div className="bg-slate-50 rounded-xl p-2.5">
            <span
              className="material-symbols-outlined text-orange-500 text-[18px]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              star
            </span>
            <div className="text-base font-bold text-slate-900 mt-0.5">
              {currentStats.rating}
            </div>
            <span className="text-[10px] text-slate-400 font-medium">Rating</span>
          </div>
        </div>
      </div>

      {/* Ledger Activity */}
      <div className="mt-4 flex flex-col gap-2">
        <div className="flex items-center justify-between px-1">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-900">
            Ledger Activity
          </span>
          <button
            type="button"
            className="text-xs text-blue-600 font-semibold flex items-center gap-0.5"
          >
            <span>Statement</span>
            <span className="material-symbols-outlined text-[14px]">download</span>
          </button>
        </div>

        {/* Transaction 1 */}
        <div className="bg-white rounded-2xl p-3.5 border border-slate-200 shadow-xs flex flex-col gap-1.5">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-9 h-9 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[18px]">local_taxi</span>
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-bold text-slate-900">Trip Payout</span>
                  <span className="bg-slate-100 text-[10px] px-1.5 rounded font-mono text-slate-600">
                    #AU-8831
                  </span>
                </div>
                <span className="text-[11px] text-slate-500 truncate block">
                  Mumbai ➔ Pune (Outstation)
                </span>
              </div>
            </div>
            <div className="text-right">
              <span className="text-xs font-bold text-emerald-600">+₹2,904</span>
              <span className="text-[10px] text-slate-400 block">Completed 2h ago</span>
            </div>
          </div>
          <div className="bg-slate-50 rounded-lg px-2.5 py-1 flex items-center justify-between text-[11px] text-slate-500">
            <span>
              Gross fare: <strong className="text-slate-800">₹3,300</strong>
            </span>
            <span className="text-orange-600 font-medium">Comm (12%): -₹396</span>
          </div>
        </div>

        {/* Transaction 2 */}
        <div className="bg-white rounded-2xl p-3.5 border border-slate-200 shadow-xs flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[18px]">lock_open</span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold text-slate-900">Escrow Hold Release</span>
                <span className="bg-slate-100 text-[10px] px-1.5 rounded font-mono text-slate-600">
                  #AU-8710
                </span>
              </div>
              <span className="text-[11px] text-slate-400">Security deposit refunded</span>
            </div>
          </div>
          <div className="text-right">
            <span className="text-xs font-bold text-emerald-600">+₹500</span>
            <span className="text-[10px] text-slate-400 block">Yesterday</span>
          </div>
        </div>

        {/* Transaction 3 */}
        <div className="bg-white rounded-2xl p-3.5 border border-slate-200 shadow-xs flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[18px]">account_balance</span>
            </div>
            <div>
              <span className="text-xs font-bold text-slate-900 block">
                Weekly Bank Withdrawal
              </span>
              <span className="text-[11px] text-slate-400">HDFC Bank •• 4012</span>
            </div>
          </div>
          <div className="text-right">
            <span className="text-xs font-bold text-slate-900">-₹8,000</span>
            <span className="text-[10px] text-slate-400 block">3 days ago</span>
          </div>
        </div>
      </div>

      {/* Verified Payout Account */}
      <div className="bg-slate-50 rounded-2xl p-3.5 border border-slate-200 flex items-center justify-between mt-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-blue-600 shadow-2xs">
            <span className="material-symbols-outlined text-[18px]">verified_user</span>
          </div>
          <div>
            <span className="text-xs font-bold text-slate-900 block">
              HDFC Bank Direct Deposit
            </span>
            <span className="text-[10px] text-slate-400">IMPS Active · Verified Driver</span>
          </div>
        </div>
        <button
          type="button"
          className="text-xs text-blue-600 font-semibold px-2.5 py-1 bg-white border border-slate-200 rounded-lg shadow-2xs"
        >
          Edit
        </button>
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
