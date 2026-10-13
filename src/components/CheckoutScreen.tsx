import React, { useState, useEffect } from 'react';

interface CheckoutScreenProps {
  bookingData: any;
  onConfirmBooking: () => void;
  onBack: () => void;
}

export const CheckoutScreen: React.FC<CheckoutScreenProps> = ({
  bookingData,
  onConfirmBooking,
  onBack,
}) => {
  const [paymentMode, setPaymentMode] = useState<'deposit' | 'full'>('deposit');
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>('INTERCITY150');
  const [openAccordion, setOpenAccordion] = useState<'upi' | 'card' | 'netbanking'>('upi');
  const [selectedUpiApp, setSelectedUpiApp] = useState<'gpay' | 'phonepe' | 'paytm'>('gpay');
  const [vpa, setVpa] = useState('');
  const [timeLeft, setTimeLeft] = useState(585); // 09:45

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const timerFormatted = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  const grossFare = 3280;
  const couponDiscount = appliedCoupon ? 150 : 0;
  const fullPrepaidDiscount = paymentMode === 'full' ? 156 : 0;
  const totalNet = grossFare - couponDiscount - fullPrepaidDiscount;
  const payableToday = paymentMode === 'deposit' ? 500 : totalNet;
  const balanceDue = paymentMode === 'deposit' ? totalNet - 500 : 0;

  return (
    <div className="flex flex-col w-full pb-36 animate-fade-in max-w-lg mx-auto px-4">
      {/* Step Bar & Urgency Timer */}
      <div className="flex items-center justify-between px-1 py-3">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onBack}
            aria-label="Go back"
            className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-800 hover:bg-slate-200 transition-colors active:scale-95"
          >
            <span className="material-symbols-outlined text-[18px]">arrow_back</span>
          </button>
          <div>
            <h1 className="text-base font-bold text-slate-900 leading-tight">Checkout</h1>
            <p className="text-xs text-slate-500 font-medium">Step 3 of 3 · Confirm Ride</p>
          </div>
        </div>
        {/* Countdown Pill */}
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100 text-orange-800 shadow-xs">
          <span
            className="material-symbols-outlined text-[14px] text-orange-600 animate-pulse"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            timer
          </span>
          <span className="text-xs font-bold tracking-tight">{timerFormatted}</span>
        </div>
      </div>

      {/* 1. Trip Summary Card */}
      <div className="rounded-2xl bg-white p-4 border border-slate-200 shadow-sm flex flex-col space-y-3 relative overflow-hidden">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold">
              Outstation One-Way
            </span>
            <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 text-xs font-medium">
              AC SUV
            </span>
          </div>
          <div className="flex items-center gap-1 text-slate-500 text-xs">
            <span className="material-symbols-outlined text-[14px]">today</span>
            <span>{bookingData?.scheduledTime || 'Today, 04:30 PM'}</span>
          </div>
        </div>

        {/* Route Line */}
        <div className="flex items-start gap-3 pt-1">
          <div className="flex flex-col items-center justify-center pt-1 self-stretch">
            <div className="w-2.5 h-2.5 rounded-full bg-blue-600 ring-4 ring-blue-100"></div>
            <div className="w-0.5 flex-1 bg-slate-200 my-1"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-slate-900 ring-4 ring-slate-100"></div>
          </div>
          <div className="flex-1 flex flex-col justify-between space-y-2">
            <div>
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-bold text-slate-900 leading-snug">Mumbai</h2>
                <span className="text-xs text-slate-500 font-medium">
                  {bookingData?.pickup || 'Bandra West'}
                </span>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-bold text-slate-900 leading-snug">Pune</h2>
                <span className="text-xs text-slate-500 font-medium">
                  {bookingData?.drop || 'Koregaon Park'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Vehicle Snippet */}
        <div className="pt-2 flex items-center justify-between bg-slate-50 px-3 py-2 rounded-xl">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center shrink-0 text-blue-600">
              <span
                className="material-symbols-outlined text-[18px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                directions_car
              </span>
            </div>
            <div className="truncate">
              <p className="text-xs font-bold text-slate-900 truncate">
                {bookingData?.vehicle?.title || 'Toyota Ertiga'} or equivalent
              </p>
              <p className="text-[11px] text-slate-500">6 Seats · Tolls & Driver Fee Included</p>
            </div>
          </div>
          <span className="px-2 py-0.5 rounded-full bg-white border border-slate-200 text-xs text-blue-600 font-bold shrink-0">
            ₹{totalNet.toLocaleString('en-IN')}
          </span>
        </div>
      </div>

      {/* 2. Split Payment Mode Selector */}
      <div className="flex flex-col space-y-2.5 mt-4">
        <div className="flex items-center justify-between px-1">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-900">
            Payment Preference
          </label>
          <span className="text-xs text-blue-600 font-medium">Flexible Outstation Policy</span>
        </div>

        {/* Option A: Deposit */}
        <div
          onClick={() => setPaymentMode('deposit')}
          className={`rounded-2xl p-3.5 border cursor-pointer transition-all ${
            paymentMode === 'deposit'
              ? 'bg-white border-2 border-blue-600 shadow-sm'
              : 'bg-white border-slate-200 hover:border-slate-300'
          }`}
        >
          <div className="flex items-start gap-3">
            <div
              className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                paymentMode === 'deposit' ? 'bg-blue-600' : 'bg-slate-200'
              }`}
            >
              <div className="w-2 h-2 rounded-full bg-white"></div>
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-slate-900">
                  Pay ₹500 Advance Deposit
                </span>
                <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 text-[10px] font-semibold">
                  Most Popular
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Confirm your cab ride immediately. Pay the remaining{' '}
                <strong className="text-slate-900 font-semibold">
                  ₹{balanceDue.toLocaleString('en-IN')}
                </strong>{' '}
                directly to the driver via cash or UPI upon drop-off.
              </p>
              <div className="flex items-center gap-1.5 mt-2 text-blue-600 text-xs font-medium">
                <span
                  className="material-symbols-outlined text-[15px]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  check_circle
                </span>
                <span>Zero extra booking surcharge</span>
              </div>
            </div>
          </div>
        </div>

        {/* Option B: Full Amount */}
        <div
          onClick={() => setPaymentMode('full')}
          className={`rounded-2xl p-3.5 border cursor-pointer transition-all ${
            paymentMode === 'full'
              ? 'bg-white border-2 border-blue-600 shadow-sm'
              : 'bg-white border-slate-200 hover:border-slate-300'
          }`}
        >
          <div className="flex items-start gap-3">
            <div
              className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                paymentMode === 'full' ? 'bg-blue-600' : 'bg-slate-200'
              }`}
            >
              <div className="w-2 h-2 rounded-full bg-white"></div>
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-slate-900">
                  Pay Full Amount Now
                </span>
                <span className="px-2 py-0.5 rounded-full bg-orange-100 text-orange-800 text-[10px] font-bold">
                  Save ₹156 (5% Off)
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Pay{' '}
                <strong className="text-slate-900 font-semibold">
                  ₹{totalNet.toLocaleString('en-IN')}
                </strong>{' '}
                right now for a completely touch-free, cashless journey from Mumbai to Pune.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Applied Promo Code Box */}
      <div className="rounded-2xl bg-white p-3.5 border border-slate-200 shadow-xs flex items-center justify-between mt-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
            <span className="material-symbols-outlined text-[18px]">local_offer</span>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-900">
                {appliedCoupon || 'NO COUPON'}
              </span>
              {appliedCoupon && (
                <span className="px-1.5 py-0.2 rounded bg-emerald-100 text-[10px] font-semibold text-emerald-700">
                  Applied
                </span>
              )}
            </div>
            <p className="text-[11px] text-slate-500">
              {appliedCoupon ? '₹150 deducted from total base fare' : 'Enter code for discount'}
            </p>
          </div>
        </div>
        {appliedCoupon ? (
          <button
            type="button"
            onClick={() => setAppliedCoupon(null)}
            className="text-xs text-orange-600 hover:text-orange-700 font-semibold py-1 px-2.5 rounded-lg bg-orange-50"
          >
            Remove
          </button>
        ) : (
          <button
            type="button"
            onClick={() => setAppliedCoupon('INTERCITY150')}
            className="text-xs text-blue-600 font-semibold py-1 px-2.5 rounded-lg bg-blue-50"
          >
            Apply INTERCITY150
          </button>
        )}
      </div>

      {/* 4. Payment Gateway Accordion */}
      <div className="rounded-2xl bg-white p-4 border border-slate-200 shadow-sm flex flex-col space-y-3 mt-4">
        <div className="flex items-center justify-between pb-1">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-900">
            Select Payment Gateway
          </span>
          <span className="flex items-center gap-1 text-[11px] text-slate-500 font-medium">
            <span
              className="material-symbols-outlined text-[13px] text-blue-600"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              lock
            </span>
            256-bit Encrypted
          </span>
        </div>

        {/* UPI Gateway */}
        <div className="rounded-xl bg-slate-50 border border-slate-200 overflow-hidden">
          <button
            type="button"
            onClick={() => setOpenAccordion(openAccordion === 'upi' ? ('' as any) : 'upi')}
            className="w-full p-3 flex items-center justify-between text-left active:bg-slate-100 transition-colors"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                <span className="material-symbols-outlined text-[16px]">qr_code_2</span>
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-bold text-slate-900">
                    UPI / QR (Instant Auto-Approve)
                  </span>
                  <span className="px-1.5 py-0.2 rounded-full bg-blue-600 text-white text-[10px] font-semibold">
                    Fast
                  </span>
                </div>
                <p className="text-[11px] text-slate-500">GPay, PhonePe, Paytm & any UPI app</p>
              </div>
            </div>
            <span
              className={`material-symbols-outlined text-[18px] text-slate-400 transition-transform ${
                openAccordion === 'upi' ? 'rotate-180' : ''
              }`}
            >
              expand_more
            </span>
          </button>

          {openAccordion === 'upi' && (
            <div className="px-3 pb-3 pt-1 flex flex-col space-y-2.5">
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedUpiApp('gpay')}
                  className={`rounded-xl p-2 flex flex-col items-center justify-center text-center transition-all ${
                    selectedUpiApp === 'gpay'
                      ? 'bg-blue-50 border border-blue-600 text-blue-900'
                      : 'bg-white border border-slate-200 text-slate-700'
                  }`}
                >
                  <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center mb-1 font-bold text-blue-600 text-xs">
                    G
                  </div>
                  <span className="text-[11px] font-semibold">Google Pay</span>
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedUpiApp('phonepe')}
                  className={`rounded-xl p-2 flex flex-col items-center justify-center text-center transition-all ${
                    selectedUpiApp === 'phonepe'
                      ? 'bg-blue-50 border border-blue-600 text-blue-900'
                      : 'bg-white border border-slate-200 text-slate-700'
                  }`}
                >
                  <div className="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center mb-1 font-bold text-purple-600 text-xs">
                    P
                  </div>
                  <span className="text-[11px] font-semibold">PhonePe</span>
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedUpiApp('paytm')}
                  className={`rounded-xl p-2 flex flex-col items-center justify-center text-center transition-all ${
                    selectedUpiApp === 'paytm'
                      ? 'bg-blue-50 border border-blue-600 text-blue-900'
                      : 'bg-white border border-slate-200 text-slate-700'
                  }`}
                >
                  <div className="w-6 h-6 rounded-full bg-sky-100 flex items-center justify-center mb-1 font-bold text-sky-600 text-xs">
                    Py
                  </div>
                  <span className="text-[11px] font-semibold">Paytm UPI</span>
                </button>
              </div>

              <div className="pt-1">
                <div className="flex items-center rounded-xl bg-white border border-slate-200 px-3 py-1.5 shadow-xs">
                  <input
                    type="text"
                    value={vpa}
                    onChange={(e) => setVpa(e.target.value)}
                    placeholder="Enter VPA (e.g. mobile@okhdfcbank)"
                    className="w-full bg-transparent border-0 p-0 text-xs text-slate-900 placeholder:text-slate-400 focus:ring-0"
                  />
                  <button
                    type="button"
                    className="ml-2 px-2.5 py-1 rounded-lg bg-slate-900 text-white text-xs font-semibold shrink-0"
                  >
                    Verify
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Card Gateway */}
        <div className="rounded-xl bg-slate-50 border border-slate-200 overflow-hidden">
          <button
            type="button"
            onClick={() => setOpenAccordion(openAccordion === 'card' ? ('' as any) : 'card')}
            className="w-full p-3 flex items-center justify-between text-left active:bg-slate-100 transition-colors"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-full bg-slate-200 flex items-center justify-center text-slate-700">
                <span className="material-symbols-outlined text-[16px]">credit_card</span>
              </div>
              <div>
                <span className="text-xs font-bold text-slate-900">Credit / Debit Cards</span>
                <p className="text-[11px] text-slate-500">Visa, MasterCard, RuPay, Diners</p>
              </div>
            </div>
            <span
              className={`material-symbols-outlined text-[18px] text-slate-400 transition-transform ${
                openAccordion === 'card' ? 'rotate-180' : ''
              }`}
            >
              expand_more
            </span>
          </button>
          {openAccordion === 'card' && (
            <div className="px-3 pb-3 pt-1 flex flex-col space-y-2">
              <div className="rounded-xl bg-white border border-slate-200 p-2.5">
                <span className="text-[10px] text-slate-400 font-semibold block">Card Number</span>
                <input
                  type="text"
                  placeholder="4532 •••• •••• 8892"
                  className="w-full border-none p-0 text-xs text-slate-900 focus:ring-0 mt-0.5"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="rounded-xl bg-white border border-slate-200 p-2.5">
                  <span className="text-[10px] text-slate-400 font-semibold block">Expiry</span>
                  <input
                    type="text"
                    placeholder="MM / YY"
                    className="w-full border-none p-0 text-xs text-slate-900 focus:ring-0 mt-0.5"
                  />
                </div>
                <div className="rounded-xl bg-white border border-slate-200 p-2.5">
                  <span className="text-[10px] text-slate-400 font-semibold block">CVV</span>
                  <input
                    type="password"
                    maxLength={4}
                    placeholder="•••"
                    className="w-full border-none p-0 text-xs text-slate-900 focus:ring-0 mt-0.5"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* NetBanking Gateway */}
        <div className="rounded-xl bg-slate-50 border border-slate-200 overflow-hidden">
          <button
            type="button"
            onClick={() => setOpenAccordion(openAccordion === 'netbanking' ? ('' as any) : 'netbanking')}
            className="w-full p-3 flex items-center justify-between text-left active:bg-slate-100 transition-colors"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-full bg-slate-200 flex items-center justify-center text-slate-700">
                <span className="material-symbols-outlined text-[16px]">account_balance</span>
              </div>
              <div>
                <span className="text-xs font-bold text-slate-900">NetBanking</span>
                <p className="text-[11px] text-slate-500">HDFC, ICICI, SBI, Axis, Kotak</p>
              </div>
            </div>
            <span
              className={`material-symbols-outlined text-[18px] text-slate-400 transition-transform ${
                openAccordion === 'netbanking' ? 'rotate-180' : ''
              }`}
            >
              expand_more
            </span>
          </button>
          {openAccordion === 'netbanking' && (
            <div className="px-3 pb-3 pt-1 grid grid-cols-4 gap-2">
              {['HDFC', 'ICICI', 'SBI', 'Axis'].map((bank) => (
                <button
                  key={bank}
                  type="button"
                  className="rounded-xl bg-white border border-slate-200 p-2 text-center text-xs font-bold text-slate-800 hover:border-blue-600"
                >
                  {bank}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* 5. Price Breakdown Summary */}
      <div className="rounded-2xl bg-white p-4 border border-slate-200 shadow-sm flex flex-col space-y-2 mt-4">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-900 pb-1">
          Price Breakdown
        </span>
        <div className="flex items-center justify-between text-xs text-slate-600">
          <span>Total Gross Intercity Fare</span>
          <span className="font-semibold text-slate-900">₹{grossFare.toLocaleString('en-IN')}</span>
        </div>
        {appliedCoupon && (
          <div className="flex items-center justify-between text-xs text-emerald-600 font-medium">
            <span>Coupon Discount (INTERCITY150)</span>
            <span>-₹150</span>
          </div>
        )}
        {paymentMode === 'full' && (
          <div className="flex items-center justify-between text-xs text-orange-600 font-medium">
            <span>Prepaid Full-Payment Discount (5%)</span>
            <span>-₹156</span>
          </div>
        )}
        <div className="flex items-center justify-between text-xs text-slate-500">
          <span>Included GST & Highway Toll Passes</span>
          <span className="text-slate-800">₹0 (Included)</span>
        </div>
        <div className="pt-2 my-1 border-t border-slate-100 flex items-center justify-between">
          <div>
            <p className="text-base font-bold text-blue-600">
              ₹{payableToday.toLocaleString('en-IN')}
            </p>
            <p className="text-[11px] text-slate-500">Amount Payable Right Now</p>
          </div>
          {paymentMode === 'deposit' && (
            <div className="text-right">
              <p className="text-base font-bold text-slate-900">
                ₹{balanceDue.toLocaleString('en-IN')}
              </p>
              <p className="text-[11px] text-slate-500">Balance Due on Arrival</p>
            </div>
          )}
        </div>
      </div>

      {/* 6. Intercity Safety Guarantee Card */}
      <div className="rounded-2xl bg-slate-50 border border-slate-200 p-4 flex flex-col space-y-2 mt-4">
        <div className="flex items-center gap-2 text-slate-900">
          <span
            className="material-symbols-outlined text-[18px] text-blue-600"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            verified_user
          </span>
          <span className="text-xs font-bold">Intercity Safety & Refund Promise</span>
        </div>
        <div className="grid grid-cols-1 gap-1.5 pt-0.5 text-xs text-slate-600">
          <p>
            • <strong className="text-slate-900">100% Refundable</strong> up to 2 hours prior to scheduled departure.
          </p>
          <p>
            • <strong className="text-slate-900">Instant Driver Match</strong> with GPS live track snippet sent via WhatsApp.
          </p>
          <p>
            • <strong className="text-slate-900">Zero Surge Surcharge</strong> guaranteed on pre-booked one-way corridors.
          </p>
        </div>
        <div className="flex items-center justify-between pt-2 border-t border-slate-200/60 text-[11px] text-slate-500">
          <span>PCI-DSS Level 1 Compliant</span>
          <span className="font-bold text-blue-600">Razorpay Verified</span>
        </div>
      </div>

      {/* Bottom Floating Bar */}
      <div className="fixed bottom-14 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/80 px-5 py-3 shadow-[0_-4px_20px_rgba(0,0,0,0.03)]">
        <div className="max-w-md mx-auto flex items-center justify-between gap-4">
          <div className="flex flex-col">
            <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
              {paymentMode === 'deposit' ? 'Advance Due' : 'Total Due'}
            </span>
            <div className="text-xl font-bold tracking-tight text-slate-900">
              ₹{payableToday.toLocaleString('en-IN')}
            </div>
          </div>
          <button
            type="button"
            onClick={onConfirmBooking}
            className="flex-1 max-w-[210px] h-12 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-sm active:scale-[0.98] transition-all"
          >
            <span>Book Now</span>
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </button>
        </div>
      </div>
    </div>
  );
};
