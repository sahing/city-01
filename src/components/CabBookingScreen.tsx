import React, { useState } from 'react';
import { VehicleOption, FormFieldConfig } from '../mockData';
import { MapLocationPickerModal, LocationSelection } from './MapLocationPickerModal';
import { IntercityWheelsLogo } from './IntercityWheelsLogo';

interface CabBookingProps {
  vehicles: VehicleOption[];
  workflowFields: FormFieldConfig[];
  onProceedToCheckout: (bookingData: any) => void;
  onOpenLiveTracking: () => void;
}

export const CabBookingScreen: React.FC<CabBookingProps> = ({
  vehicles,
  workflowFields,
  onProceedToCheckout,
  onOpenLiveTracking,
}) => {
  const [tripType, setTripType] = useState<'oneway' | 'round' | 'rental' | 'airport'>('oneway');
  const [pickup, setPickup] = useState('Mumbai, Bandra West');
  const [pickupLandmark, setPickupLandmark] = useState('Linking Road / Bandra Fort');
  const [drop, setDrop] = useState('Pune, Koregaon Park');
  const [dropLandmark, setDropLandmark] = useState('Lane 7, South Main Road');

  const [selectedVehicleId, setSelectedVehicleId] = useState('spacious-suv');
  const [hasPets, setHasPets] = useState(false);
  const [luggageCount, setLuggageCount] = useState(3);
  const [flightNumber, setFlightNumber] = useState('');
  const [isPartialPay, setIsPartialPay] = useState(false);
  const [showFareBreakdown, setShowFareBreakdown] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState<'INTERCITY150' | null>('INTERCITY150');
  const [scheduledTime, setScheduledTime] = useState('Today, 04:30 PM');

  // Map Picker Modal States
  const [mapPickerOpen, setMapPickerOpen] = useState(false);
  const [mapPickerType, setMapPickerType] = useState<'pickup' | 'drop'>('pickup');

  const selectedVehicle = vehicles.find((v) => v.id === selectedVehicleId) || vehicles[1];

  // Dynamic Fare Calculation
  const baseRate = selectedVehicle.discountPrice;
  const petFee = hasPets ? 200 : 0;
  const couponDiscount = appliedCoupon === 'INTERCITY150' ? 150 : 0;
  const fullTripGross = baseRate + petFee;
  const netPayable = Math.max(0, fullTripGross - couponDiscount);
  const advancePayable = isPartialPay ? 500 : netPayable;
  const balanceDue = isPartialPay ? netPayable - 500 : 0;

  const handleSwap = () => {
    const tempP = pickup;
    const tempPL = pickupLandmark;
    setPickup(drop);
    setPickupLandmark(dropLandmark);
    setDrop(tempP);
    setDropLandmark(tempPL);
  };

  const openMapFor = (type: 'pickup' | 'drop') => {
    setMapPickerType(type);
    setMapPickerOpen(true);
  };

  const handleSelectMapLocation = (loc: LocationSelection) => {
    if (mapPickerType === 'pickup') {
      setPickup(loc.address);
      setPickupLandmark(loc.landmark);
    } else {
      setDrop(loc.address);
      setDropLandmark(loc.landmark);
    }
  };

  const handleProceed = () => {
    onProceedToCheckout({
      tripType,
      pickup,
      pickupLandmark,
      drop,
      dropLandmark,
      vehicle: selectedVehicle,
      hasPets,
      luggageCount,
      flightNumber,
      isPartialPay,
      advancePayable,
      balanceDue,
      netPayable,
      scheduledTime,
      appliedCoupon,
    });
  };

  return (
    <div className="flex flex-col w-full pb-36 animate-fade-in max-w-lg mx-auto">
      {/* Brand Hero Visual Ribbon with Metallic Gold Styling */}
      <div className="px-4 pt-3 pb-1">
        <div className="bg-gradient-to-r from-[#1E180E] via-[#2A1F10] to-[#1E180E] border border-[#F59E0B]/30 rounded-2xl p-3 flex items-center justify-between shadow-[0_4px_16px_rgba(245,158,11,0.1)]">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-xs font-semibold text-amber-100">
              Zero Surge • Verified Commercial Chauffeurs
            </span>
          </div>
          <span className="font-extrabold text-[#F59E0B] uppercase text-[11px] tracking-wider px-2 py-0.5 rounded-lg bg-amber-500/10 border border-amber-500/30">
            Fast Lane
          </span>
        </div>
      </div>

      {/* Segmented Trip Type Selector */}
      <div className="px-4 py-2">
        <div className="flex p-1 bg-[#17130E] border border-white/10 rounded-2xl gap-1">
          {(['oneway', 'round', 'rental', 'airport'] as const).map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => setTripType(type)}
              className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all text-center capitalize ${
                tripType === type
                  ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-black shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {type === 'oneway' ? 'One-Way' : type === 'round' ? 'Round Trip' : type === 'rental' ? 'Rental' : 'Airport'}
            </button>
          ))}
        </div>
      </div>

      {/* ROUTE SELECTOR CARD with INTEGRATED MAP PICKER BUTTONS */}
      <div className="px-4 py-1.5">
        <div className="bg-[#17130E] rounded-3xl p-4 sm:p-5 border border-[#F59E0B]/30 shadow-xl relative">
          <div className="relative flex items-center gap-3">
            {/* Visual Waypoint Dots */}
            <div className="flex flex-col items-center py-2 shrink-0">
              <div className="w-3 h-3 rounded-full bg-amber-400 ring-4 ring-amber-500/20 shadow-sm"></div>
              <div className="w-0.5 h-14 bg-gradient-to-b from-amber-400 via-amber-600 to-orange-500 my-1"></div>
              <div className="w-3 h-3 rounded-full bg-orange-500 ring-4 ring-orange-500/20 shadow-sm"></div>
            </div>

            {/* Editable Locations with Dedicated Map Action Buttons */}
            <div className="flex-1 space-y-3">
              {/* Pickup Row */}
              <div className="group">
                <span className="text-[10px] uppercase tracking-wider font-extrabold text-amber-400 block mb-1 flex items-center gap-1">
                  <span>Pickup Location</span>
                  <span className="text-slate-500 font-normal">({pickupLandmark})</span>
                </span>
                <div className="flex items-center gap-1.5 bg-[#231C13] border border-amber-500/30 rounded-2xl px-3 py-1.5 focus-within:border-amber-400 focus-within:ring-1 focus-within:ring-amber-400 shadow-inner">
                  <input
                    type="text"
                    value={pickup}
                    onChange={(e) => setPickup(e.target.value)}
                    className="w-full text-xs sm:text-sm font-bold text-white bg-transparent border-none p-0 focus:ring-0 focus:outline-none placeholder:text-slate-500"
                    placeholder="Enter pickup city, airport, colony..."
                  />
                  {/* Pick from Map Button */}
                  <button
                    type="button"
                    onClick={() => openMapFor('pickup')}
                    title="Choose pickup on Map / Search exact pin"
                    className="shrink-0 flex items-center gap-1 px-2.5 py-1 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-400 border border-amber-500/40 text-[11px] font-bold active:scale-95 transition-all shadow-xs"
                  >
                    <span className="material-symbols-outlined text-[16px]">map</span>
                    <span className="hidden xs:inline">Map</span>
                  </button>
                </div>
              </div>

              {/* Drop-off Row */}
              <div className="border-t border-white/10 pt-3 group">
                <span className="text-[10px] uppercase tracking-wider font-extrabold text-orange-400 block mb-1 flex items-center gap-1">
                  <span>Drop-off Destination</span>
                  <span className="text-slate-500 font-normal">({dropLandmark})</span>
                </span>
                <div className="flex items-center gap-1.5 bg-[#231C13] border border-orange-500/30 rounded-2xl px-3 py-1.5 focus-within:border-orange-400 focus-within:ring-1 focus-within:ring-orange-400 shadow-inner">
                  <input
                    type="text"
                    value={drop}
                    onChange={(e) => setDrop(e.target.value)}
                    className="w-full text-xs sm:text-sm font-bold text-white bg-transparent border-none p-0 focus:ring-0 focus:outline-none placeholder:text-slate-500"
                    placeholder="Enter destination city, hotel, address..."
                  />
                  {/* Pick from Map Button */}
                  <button
                    type="button"
                    onClick={() => openMapFor('drop')}
                    title="Choose drop on Map / Search exact pin"
                    className="shrink-0 flex items-center gap-1 px-2.5 py-1 rounded-xl bg-orange-500/20 hover:bg-orange-500/30 text-orange-400 border border-orange-500/40 text-[11px] font-bold active:scale-95 transition-all shadow-xs"
                  >
                    <span className="material-symbols-outlined text-[16px]">map</span>
                    <span className="hidden xs:inline">Map</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Swap Button */}
            <button
              type="button"
              onClick={handleSwap}
              aria-label="Swap pickup and destination"
              className="w-10 h-10 rounded-2xl bg-[#231C13] hover:bg-[#302619] border border-amber-500/40 flex items-center justify-center text-amber-400 active:rotate-180 transition-all shrink-0 shadow-md"
            >
              <span className="material-symbols-outlined text-[20px]">swap_vert</span>
            </button>
          </div>

          {/* Route Meta Strip */}
          <div className="mt-4 pt-3.5 border-t border-white/10 flex items-center justify-between text-xs text-slate-400 font-medium">
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px] text-amber-400">route</span>
              <span className="text-slate-200 font-semibold">148 km • 3h 15m (Expwy)</span>
            </div>
            <div className="flex items-center gap-1.5 text-amber-400 font-semibold">
              <span className="material-symbols-outlined text-[15px]">event</span>
              <input
                type="text"
                value={scheduledTime}
                onChange={(e) => setScheduledTime(e.target.value)}
                className="bg-transparent border-none p-0 text-xs font-bold text-amber-400 focus:ring-0 w-32 text-right"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Select Vehicle Category */}
      <div className="px-4 pt-4">
        <div className="flex items-center justify-between mb-3 px-1">
          <h2 className="text-xs font-bold tracking-wider text-amber-400 uppercase">
            Select Chauffeur Fleet
          </h2>
          <span className="text-xs text-slate-400 font-medium">{vehicles.length} categories ready</span>
        </div>

        <div className="space-y-3">
          {vehicles.map((v) => {
            const isSelected = v.id === selectedVehicleId;
            return (
              <div
                key={v.id}
                onClick={() => setSelectedVehicleId(v.id)}
                className={`vehicle-card group bg-[#17130E] rounded-2xl p-4 border transition-all cursor-pointer relative ${
                  isSelected
                    ? 'border-2 border-amber-400 bg-[#241D14] shadow-[0_4px_20px_rgba(245,158,11,0.2)]'
                    : 'border-white/10 hover:border-amber-500/30'
                }`}
              >
                {v.tag && (
                  <span className="absolute -top-2.5 right-4 bg-gradient-to-r from-amber-500 to-amber-600 text-black text-[10px] font-extrabold px-2.5 py-0.5 rounded-full shadow-md">
                    {v.tag}
                  </span>
                )}
                <div className="flex items-center justify-between gap-4">
                  <div className="w-16 h-12 rounded-xl bg-black overflow-hidden shrink-0 flex items-center justify-center border border-white/10">
                    <img
                      src={v.image}
                      alt={v.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline gap-2">
                      <h3 className="font-bold text-sm text-white">{v.title}</h3>
                      <span className="text-xs text-slate-400 font-normal truncate">
                        {v.subtitle}
                      </span>
                    </div>
                    <p
                      className={`text-xs mt-0.5 ${
                        isSelected ? 'text-amber-300 font-medium' : 'text-slate-400'
                      }`}
                    >
                      {v.capacity} • {v.luggage} • {v.features.join(' • ')}
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <div
                      className={`text-base font-extrabold ${
                        isSelected ? 'text-amber-400' : 'text-white'
                      }`}
                    >
                      ₹{v.discountPrice.toLocaleString('en-IN')}
                    </div>
                    <div className="text-[11px] text-slate-500 line-through">
                      ₹{v.basePrice.toLocaleString('en-IN')}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Dynamic Preferences / Form Builder Extras */}
      <div className="px-4 pt-6">
        <div className="flex items-center justify-between mb-3 px-1">
          <h2 className="text-xs font-bold tracking-wider text-amber-400 uppercase">
            Preferences & Add-Ons
          </h2>
          <span className="text-[11px] text-amber-400 font-bold bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-full">
            Configurable
          </span>
        </div>

        <div className="bg-[#17130E] rounded-3xl p-5 border border-white/10 shadow-lg space-y-4">
          {/* Pet Travelling Switch */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#241D14] text-amber-400 flex items-center justify-center shrink-0 border border-white/5">
                <span className="material-symbols-outlined text-[19px]">pets</span>
              </div>
              <div>
                <div className="text-xs font-bold text-white flex items-center gap-1.5">
                  Travelling with Pets
                  <span className="text-[10px] font-bold text-amber-300 bg-amber-500/20 border border-amber-500/30 px-1.5 py-0.2 rounded">
                    +₹200
                  </span>
                </div>
                <div className="text-[11px] text-slate-400">Sanitized protective seat covers</div>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setHasPets(!hasPets)}
              className={`w-11 h-6 rounded-full relative transition-colors cursor-pointer shrink-0 ${
                hasPets ? 'bg-amber-500' : 'bg-slate-700'
              }`}
            >
              <span
                className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-all shadow-xs ${
                  hasPets ? 'right-1' : 'left-1'
                }`}
              ></span>
            </button>
          </div>

          <div className="border-t border-white/10"></div>

          {/* Luggage Counter */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#241D14] text-amber-400 flex items-center justify-center shrink-0 border border-white/5">
                <span className="material-symbols-outlined text-[19px]">luggage</span>
              </div>
              <div>
                <div className="text-xs font-bold text-white">Luggage Items</div>
                <div className="text-[11px] text-slate-400">Standard suitcase units</div>
              </div>
            </div>
            <div className="flex items-center gap-2.5 bg-[#241D14] border border-white/10 px-2 py-1 rounded-xl">
              <button
                type="button"
                onClick={() => setLuggageCount(Math.max(1, luggageCount - 1))}
                className="w-6 h-6 rounded-lg bg-[#17130E] hover:bg-black text-amber-400 flex items-center justify-center shadow-xs active:scale-95 transition-all text-xs font-bold"
              >
                -
              </button>
              <span className="text-xs font-bold text-white w-4 text-center">
                {luggageCount}
              </span>
              <button
                type="button"
                onClick={() => setLuggageCount(Math.min(6, luggageCount + 1))}
                className="w-6 h-6 rounded-lg bg-[#17130E] hover:bg-black text-amber-400 flex items-center justify-center shadow-xs active:scale-95 transition-all text-xs font-bold"
              >
                +
              </button>
            </div>
          </div>

          <div className="border-t border-white/10"></div>

          {/* Conditional Flight Number for Airport */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#241D14] text-amber-400 flex items-center justify-center shrink-0 border border-white/5">
              <span className="material-symbols-outlined text-[19px]">flight</span>
            </div>
            <div className="flex-1">
              <input
                type="text"
                value={flightNumber}
                onChange={(e) => setFlightNumber(e.target.value)}
                placeholder="Flight number (optional for airport pickup)"
                className="w-full text-xs text-white placeholder:text-slate-500 bg-transparent border-none p-0 focus:ring-0 focus:outline-none"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Electronic Toll Clearance Strip */}
      <div className="px-4 pt-4">
        <div className="bg-[#17130E] rounded-2xl p-4 border border-white/10 shadow-md flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex flex-col items-center justify-center shrink-0 font-bold text-xs">
            <span className="material-symbols-outlined text-[20px]">toll</span>
            <span className="text-[10px] leading-tight">FastTag</span>
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="text-xs font-bold text-white">Direct Express Toll Lane Access</h4>
            <p className="text-[11px] text-slate-400 line-clamp-1">
              Automatic FastTag clearance at Khalapur & Talegaon plazas.
            </p>
          </div>
          <button
            type="button"
            onClick={onOpenLiveTracking}
            className="px-3 py-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/30 text-xs font-bold shrink-0 transition-colors"
          >
            Live Map
          </button>
        </div>
      </div>

      {/* Fare Breakdown Card */}
      <div className="px-4 pt-4">
        <div className="bg-[#17130E] rounded-3xl p-5 border border-white/10 shadow-md">
          <button
            type="button"
            onClick={() => setShowFareBreakdown(!showFareBreakdown)}
            className="w-full flex items-center justify-between text-left group"
          >
            <div className="flex items-center gap-2.5">
              <span className="material-symbols-outlined text-amber-400 text-[18px]">receipt</span>
              <span className="text-xs font-bold text-white">Transparent Fare Summary</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-slate-400 group-hover:text-amber-400 transition-colors">
              <span>Tolls & Taxes included</span>
              <span
                className={`material-symbols-outlined text-[16px] transition-transform ${
                  showFareBreakdown ? 'rotate-180' : ''
                }`}
              >
                expand_more
              </span>
            </div>
          </button>

          {showFareBreakdown && (
            <div className="pt-4 mt-3 border-t border-white/10 flex flex-col gap-2 text-xs text-slate-300">
              <div className="flex justify-between">
                <span className="text-slate-400">Base Fare (First 150 km)</span>
                <span className="font-semibold text-white">
                  ₹{selectedVehicle.discountPrice.toLocaleString('en-IN')}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Expressway Toll & FastTag</span>
                <span className="font-semibold text-white">₹320 (Included)</span>
              </div>
              {hasPets && (
                <div className="flex justify-between text-amber-400">
                  <span>Pet Sanitation Cover</span>
                  <span className="font-bold">+₹200</span>
                </div>
              )}
              {appliedCoupon && (
                <div className="flex justify-between text-emerald-400 font-bold">
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">local_offer</span>
                    Coupon {appliedCoupon}
                  </span>
                  <span>-₹150</span>
                </div>
              )}
              <div className="pt-2.5 border-t border-white/10 flex justify-between items-baseline font-bold text-white">
                <span>Net Payable</span>
                <span className="text-base font-extrabold text-amber-400">
                  ₹{netPayable.toLocaleString('en-IN')}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Floating Bottom Booking Action Dock with Gold Theme */}
      <div className="fixed bottom-14 left-0 right-0 z-40 bg-[#120F0B]/95 backdrop-blur-md border-t border-[#F59E0B]/30 px-5 py-3 shadow-[0_-4px_24px_rgba(0,0,0,0.5)]">
        <div className="max-w-md mx-auto flex items-center justify-between gap-4">
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
                Total
              </span>
              <button
                type="button"
                onClick={() => setIsPartialPay(!isPartialPay)}
                className={`text-[10px] font-bold px-2 py-0.5 rounded-full transition-colors ${
                  isPartialPay
                    ? 'bg-amber-500 text-black'
                    : 'text-amber-400 bg-amber-500/10 border border-amber-500/30'
                }`}
              >
                {isPartialPay ? 'Pay ₹500 Adv.' : 'Pay Full'}
              </button>
            </div>
            <div className="text-xl font-extrabold tracking-tight text-white">
              ₹{advancePayable.toLocaleString('en-IN')}
            </div>
            {isPartialPay && (
              <span className="text-[10px] text-amber-400/90">
                Bal. ₹{balanceDue.toLocaleString('en-IN')} at drop
              </span>
            )}
          </div>
          <button
            type="button"
            onClick={handleProceed}
            className="flex-1 max-w-[210px] h-12 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-extrabold text-sm flex items-center justify-center gap-2 shadow-[0_4px_20px_rgba(245,158,11,0.35)] active:scale-[0.98] transition-all"
          >
            <span>Book Now</span>
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </button>
        </div>
      </div>

      {/* OpenStreetMap Location Picker Modal */}
      <MapLocationPickerModal
        isOpen={mapPickerOpen}
        type={mapPickerType}
        currentValue={mapPickerType === 'pickup' ? pickup : drop}
        onSelectLocation={handleSelectMapLocation}
        onClose={() => setMapPickerOpen(false)}
      />
    </div>
  );
};
