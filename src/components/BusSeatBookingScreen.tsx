import React, { useState } from 'react';
import { BerthSeat } from '../mockData';

interface BusSeatBookingProps {
  berths: BerthSeat[];
  onProceedToPay: (selectedBerths: BerthSeat[], passengers: any[]) => void;
  onBack: () => void;
}

export const BusSeatBookingScreen: React.FC<BusSeatBookingProps> = ({
  berths,
  onProceedToPay,
  onBack,
}) => {
  const [activeDeck, setActiveDeck] = useState<'lower' | 'upper'>('lower');
  const [selectedSeatIds, setSelectedSeatIds] = useState<string[]>(['L4', 'L5']);
  const [boardingPoint, setBoardingPoint] = useState(
    'Swargate Bus Terminal, Bay 4 (09:30 PM)'
  );
  const [droppingPoint, setDroppingPoint] = useState(
    'Panjim KTC Bus Stand, Platform 1 (06:45 AM)'
  );

  const [passengers, setPassengers] = useState([
    { name: 'Rahul Sharma', age: 29, gender: 'Male', seatId: 'L4' },
    { name: 'Sneha Verma', age: 27, gender: 'Female', seatId: 'L5' },
  ]);

  const toggleSeat = (berth: BerthSeat) => {
    if (berth.type === 'locked' || berth.type === 'booked') return;

    if (selectedSeatIds.includes(berth.id)) {
      setSelectedSeatIds(selectedSeatIds.filter((id) => id !== berth.id));
      setPassengers(passengers.filter((p) => p.seatId !== berth.id));
    } else {
      const nextSeatIds = [...selectedSeatIds, berth.id];
      setSelectedSeatIds(nextSeatIds);
      setPassengers([
        ...passengers,
        {
          name: '',
          age: 28,
          gender: berth.type === 'ladies' ? 'Female' : 'Male',
          seatId: berth.id,
        },
      ]);
    }
  };

  const selectedBerthObjects = berths.filter((b) => selectedSeatIds.includes(b.id));
  const totalFare = selectedBerthObjects.reduce(
    (acc, cur) => acc + (cur.fare || 850),
    0
  );

  const currentDeckBerths = berths.filter((b) => b.deck === activeDeck);

  return (
    <div className="flex flex-col w-full pb-44 animate-fade-in max-w-md mx-auto px-4">
      {/* Route & Header Card */}
      <section className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs mt-3">
        <div className="flex items-center justify-between text-xs font-medium text-slate-500 mb-4 pb-3 border-b border-slate-100">
          <span className="font-semibold text-blue-600 tracking-wide">
            INTERCITY EXPRESS #8092
          </span>
          <span>Volvo Multi-Axle AC Sleeper</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-2xl font-bold text-slate-900 tracking-tight">Pune</span>
            <span className="text-sm font-semibold text-slate-900 mt-0.5">09:30 PM</span>
            <span className="text-xs text-slate-500">Swargate Bay 4</span>
          </div>
          <div className="flex flex-col items-center flex-1 px-4">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
              9h 15m
            </span>
            <div className="relative w-full flex items-center">
              <div className="w-2 h-2 rounded-full border-2 border-blue-600 bg-white z-10 shrink-0"></div>
              <div className="flex-1 border-t border-dashed border-slate-300 mx-1"></div>
              <span className="material-symbols-outlined text-[14px] text-blue-600 rotate-90 shrink-0 mx-0.5">
                navigation
              </span>
              <div className="flex-1 border-t border-dashed border-slate-300 mx-1"></div>
              <div className="w-2 h-2 rounded-full bg-orange-600 z-10 shrink-0"></div>
            </div>
            <span className="text-[11px] text-emerald-600 font-medium mt-1.5 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Live GPS
            </span>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-2xl font-bold text-slate-900 tracking-tight">Goa</span>
            <span className="text-sm font-semibold text-slate-900 mt-0.5">06:45 AM</span>
            <span className="text-xs text-slate-500">Panjim KTC</span>
          </div>
        </div>
      </section>

      {/* Deck Selector & Coach Layout */}
      <section className="flex flex-col gap-3.5 mt-4">
        <div className="flex items-center justify-between px-1">
          <div>
            <h2 className="text-base font-bold text-slate-900">Choose Berths</h2>
            <p className="text-xs text-slate-500">Spacious 2+1 layout</p>
          </div>
          <div className="inline-flex p-1 bg-slate-200/70 rounded-xl">
            <button
              type="button"
              onClick={() => setActiveDeck('lower')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeDeck === 'lower'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Lower Deck
            </button>
            <button
              type="button"
              onClick={() => setActiveDeck('upper')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeDeck === 'upper'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Upper Deck
            </button>
          </div>
        </div>

        {/* Bus Coach Canvas */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs">
          {/* Cabin Front Line */}
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100 text-xs text-slate-500">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px] text-slate-400">
                airline_seat_recline_extra
              </span>
              <span className="font-medium text-slate-600">Front Driver Cabin</span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-400">
              <span className="text-[11px] uppercase tracking-wider font-semibold">Entry</span>
              <span className="material-symbols-outlined text-[16px]">logout</span>
            </div>
          </div>

          {/* Render 2+1 Grid */}
          <div className="flex flex-col gap-3">
            {[1, 2, 3].map((rowNum) => {
              const rowBerths = currentDeckBerths.filter((b) => b.row === rowNum);
              const leftBerth = rowBerths.find((b) => b.col === 0);
              const rightAisleBerth = rowBerths.find((b) => b.col === 2);
              const rightWindowBerth = rowBerths.find((b) => b.col === 3);

              const renderBerthButton = (berth?: BerthSeat) => {
                if (!berth) return <div className="h-16 rounded-xl bg-transparent"></div>;
                const isSelected = selectedSeatIds.includes(berth.id);

                if (berth.type === 'locked') {
                  return (
                    <div className="h-16 rounded-xl bg-slate-100 border border-slate-200 text-slate-400 flex flex-col justify-between p-2 text-left opacity-70 cursor-not-allowed">
                      <div className="flex items-center justify-between w-full">
                        <span className="text-xs font-bold">{berth.id}</span>
                        <span className="material-symbols-outlined text-[14px]">lock</span>
                      </div>
                      <span className="text-[10px] font-medium">Crew</span>
                    </div>
                  );
                }

                if (berth.type === 'booked') {
                  return (
                    <div className="h-16 rounded-xl bg-slate-100 border border-slate-200 text-slate-400 flex flex-col justify-between p-2 text-left opacity-60 cursor-not-allowed">
                      <div className="flex items-center justify-between w-full">
                        <span className="text-xs font-bold">{berth.id}</span>
                        <span className="material-symbols-outlined text-[14px]">lock</span>
                      </div>
                      <span className="text-[10px] font-medium">Booked</span>
                    </div>
                  );
                }

                if (isSelected) {
                  return (
                    <button
                      type="button"
                      onClick={() => toggleSeat(berth)}
                      className="h-16 rounded-xl bg-blue-600 text-white border border-blue-600 flex flex-col justify-between p-2 text-left shadow-sm active:scale-95 transition-all"
                    >
                      <div className="flex items-center justify-between w-full">
                        <span className="text-xs font-bold">{berth.id}</span>
                        <span
                          className="material-symbols-outlined text-[16px]"
                          style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                          check_circle
                        </span>
                      </div>
                      <span className="text-[11px] font-semibold opacity-90">
                        ₹{berth.fare || 850}
                      </span>
                    </button>
                  );
                }

                if (berth.type === 'ladies') {
                  return (
                    <button
                      type="button"
                      onClick={() => toggleSeat(berth)}
                      className="h-16 rounded-xl bg-pink-50 border border-pink-200 hover:border-pink-300 flex flex-col justify-between p-2 text-left active:scale-95 transition-all"
                    >
                      <div className="flex items-center justify-between w-full">
                        <span className="text-xs font-bold text-pink-700">{berth.id}</span>
                        <span className="material-symbols-outlined text-[15px] text-pink-500">
                          female
                        </span>
                      </div>
                      <span className="text-[11px] font-semibold text-pink-600">
                        ₹{berth.fare || 850}
                      </span>
                    </button>
                  );
                }

                return (
                  <button
                    type="button"
                    onClick={() => toggleSeat(berth)}
                    className="h-16 rounded-xl bg-slate-50 border border-slate-200 hover:border-blue-500/60 flex flex-col justify-between p-2 text-left active:scale-95 transition-all"
                  >
                    <div className="flex items-center justify-between w-full">
                      <span className="text-xs font-bold text-slate-700">{berth.id}</span>
                      <span className="material-symbols-outlined text-[15px] text-slate-400">
                        bed
                      </span>
                    </div>
                    <span className="text-[11px] font-semibold text-slate-500">
                      ₹{berth.fare || 850}
                    </span>
                  </button>
                );
              };

              return (
                <div key={rowNum} className="grid grid-cols-4 items-center gap-3">
                  {/* Left Column Single Berth */}
                  {renderBerthButton(leftBerth)}

                  {/* Aisle Spacer */}
                  <div className="flex items-center justify-center text-slate-300">
                    <span className="material-symbols-outlined text-[16px]">straight</span>
                  </div>

                  {/* Double Berths */}
                  {renderBerthButton(rightAisleBerth)}
                  {renderBerthButton(rightWindowBerth)}
                </div>
              );
            })}
          </div>

          {/* Seat Deck Legend */}
          <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-medium">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-md bg-slate-100 border border-slate-300"></span>
              <span>Available</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-md bg-blue-600"></span>
              <span>Selected</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-md bg-pink-100 border border-pink-300"></span>
              <span>Ladies</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-md bg-slate-200"></span>
              <span>Booked</span>
            </div>
          </div>
        </div>
      </section>

      {/* Boarding & Dropping Selectors */}
      <section className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex flex-col gap-4 mt-4">
        <h3 className="text-base font-bold text-slate-900">Boarding & Dropping</h3>
        <div className="flex flex-col gap-3">
          {/* Boarding */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider flex items-center justify-between">
              <span className="flex items-center gap-1 text-blue-600">
                <span className="w-2 h-2 rounded-full bg-blue-600 inline-block"></span> Boarding
                Point
              </span>
              <span className="font-normal text-slate-400 text-[11px]">09:30 PM Departure</span>
            </label>
            <div className="relative">
              <select
                value={boardingPoint}
                onChange={(e) => setBoardingPoint(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-medium text-slate-800 appearance-none focus:outline-none focus:border-blue-600 pr-9"
              >
                <option>Swargate Bus Terminal, Bay 4 (09:30 PM)</option>
                <option>Katraj Bypass, Wonder City (09:55 PM)</option>
                <option>Khed Shivapur Toll Plaza (10:30 PM)</option>
              </select>
              <span className="material-symbols-outlined absolute right-3 top-2.5 text-[18px] text-slate-400 pointer-events-none">
                expand_more
              </span>
            </div>
          </div>

          {/* Dropping */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider flex items-center justify-between">
              <span className="flex items-center gap-1 text-orange-600">
                <span className="w-2 h-2 rounded-full bg-orange-600 inline-block"></span> Dropping
                Point
              </span>
              <span className="font-normal text-slate-400 text-[11px]">06:45 AM Arrival</span>
            </label>
            <div className="relative">
              <select
                value={droppingPoint}
                onChange={(e) => setDroppingPoint(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-medium text-slate-800 appearance-none focus:outline-none focus:border-blue-600 pr-9"
              >
                <option>Panjim KTC Bus Stand, Platform 1 (06:45 AM)</option>
                <option>Mapusa Court Circle (06:15 AM)</option>
                <option>Margao KTC Station (07:45 AM)</option>
              </select>
              <span className="material-symbols-outlined absolute right-3 top-2.5 text-[18px] text-slate-400 pointer-events-none">
                expand_more
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Passenger Details */}
      <section className="flex flex-col gap-3 mt-4">
        <div className="flex items-center justify-between px-1">
          <div>
            <h3 className="text-base font-bold text-slate-900">Passenger Details</h3>
            <p className="text-xs text-slate-500">{selectedSeatIds.length} berths selected</p>
          </div>
          <span className="text-xs font-semibold bg-blue-50 text-blue-700 px-2.5 py-1 rounded-full">
            {selectedSeatIds.length} Travellers
          </span>
        </div>

        {passengers.map((p, idx) => (
          <div
            key={p.seatId}
            className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs flex flex-col gap-3"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-slate-900 text-white text-[11px] font-bold flex items-center justify-center">
                  {idx + 1}
                </span>
                <span className="text-sm font-bold text-slate-900">Passenger {idx + 1}</span>
              </div>
              <span className="text-xs font-medium text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md">
                Berth {p.seatId}
              </span>
            </div>
            <input
              type="text"
              value={p.name}
              onChange={(e) => {
                const updated = [...passengers];
                updated[idx].name = e.target.value;
                setPassengers(updated);
              }}
              placeholder="Full Name as on Govt ID"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-600"
            />
            <div className="flex items-center gap-3">
              <div className="w-24">
                <input
                  type="number"
                  value={p.age}
                  onChange={(e) => {
                    const updated = [...passengers];
                    updated[idx].age = Number(e.target.value);
                    setPassengers(updated);
                  }}
                  placeholder="Age"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-900 focus:outline-none focus:border-blue-600 text-center"
                />
              </div>
              <div className="flex-1 flex gap-2">
                <button
                  type="button"
                  onClick={() => {
                    const updated = [...passengers];
                    updated[idx].gender = 'Male';
                    setPassengers(updated);
                  }}
                  className={`flex-1 py-2 rounded-xl text-xs font-semibold text-center transition-colors ${
                    p.gender === 'Male'
                      ? 'bg-slate-900 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  Male
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const updated = [...passengers];
                    updated[idx].gender = 'Female';
                    setPassengers(updated);
                  }}
                  className={`flex-1 py-2 rounded-xl text-xs font-semibold text-center transition-colors ${
                    p.gender === 'Female'
                      ? 'bg-slate-900 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  Female
                </button>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Sticky Bottom Action Dock */}
      <aside className="fixed bottom-14 left-0 right-0 z-40 bg-white/95 backdrop-blur-xl border-t border-slate-200 px-5 py-3.5">
        <div className="max-w-md mx-auto flex items-center justify-between gap-4">
          <div className="flex flex-col">
            <span className="text-xs text-slate-500 font-medium">
              {selectedSeatIds.length} Berths: {selectedSeatIds.join(', ')}
            </span>
            <div className="flex items-baseline gap-1">
              <span className="font-bold text-xl text-slate-900 tracking-tight">
                ₹{totalFare.toLocaleString('en-IN')}
              </span>
              <span className="text-[11px] text-slate-400 font-medium">all incl.</span>
            </div>
          </div>
          <button
            type="button"
            onClick={() => onProceedToPay(selectedBerthObjects, passengers)}
            disabled={selectedSeatIds.length === 0}
            className="flex-1 max-w-[210px] bg-orange-600 hover:bg-orange-700 active:scale-[0.98] text-white py-3 px-5 rounded-xl font-semibold text-sm shadow-sm flex items-center justify-center gap-2 transition-all disabled:opacity-50"
          >
            <span>Proceed to Pay</span>
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </button>
        </div>
      </aside>
    </div>
  );
};
