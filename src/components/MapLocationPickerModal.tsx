import React, { useState } from 'react';

export interface LocationSelection {
  address: string;
  landmark: string;
  lat: number;
  lng: number;
}

interface MapPickerModalProps {
  isOpen: boolean;
  type: 'pickup' | 'drop';
  currentValue: string;
  onSelectLocation: (location: LocationSelection) => void;
  onClose: () => void;
}

const POPULAR_LOCATIONS: { [key: string]: LocationSelection[] } = {
  Mumbai: [
    { address: 'Bandra West, Mumbai', landmark: 'Linking Road / Bandra Fort', lat: 19.0596, lng: 72.8295 },
    { address: 'Chhatrapati Shivaji Maharaj International Airport (T2), Mumbai', landmark: 'Terminal 2 Departures Gate 4', lat: 19.0896, lng: 72.8656 },
    { address: 'Bandra Terminus Concourse Gate 3, Mumbai', landmark: 'Railway Station Pickup', lat: 19.0617, lng: 72.8409 },
    { address: 'Andheri East Hub, Western Express Highway', landmark: 'Chakala Metro Station', lat: 19.1136, lng: 72.8697 },
    { address: 'Navi Mumbai Vashi Plaza', landmark: 'Near Vashi Toll Naka / Sector 17', lat: 19.0771, lng: 72.9986 },
    { address: 'Thane Majiwada Junction', landmark: 'Viviana Mall Highway Exit', lat: 19.2056, lng: 72.9774 },
  ],
  Pune: [
    { address: 'Koregaon Park, Pune', landmark: 'Lane 7, South Main Road', lat: 18.5362, lng: 73.8940 },
    { address: 'Swargate Central Bus Terminal, Pune', landmark: 'Bay 4, Intercity Express Bay', lat: 18.5018, lng: 73.8586 },
    { address: 'Pune International Airport (PNQ), Lohegaon', landmark: 'Arrivals Gate 2', lat: 18.5822, lng: 73.9197 },
    { address: 'Hinjawadi IT Park Phase 1, Pune', landmark: 'Near Shivaji Chowk', lat: 18.5913, lng: 73.7389 },
    { address: 'Kothrud Paud Road, Pune', landmark: 'Near Karve Statue', lat: 18.5074, lng: 73.8077 },
    { address: 'Wakad Highway Bridge, Pune', landmark: 'Mumbai-Pune Expressway Entry', lat: 18.5987, lng: 73.7667 },
  ],
  'Delhi NCR': [
    { address: 'Indira Gandhi International Airport (T3), New Delhi', landmark: 'Pillar 14 Arrivals', lat: 28.5562, lng: 77.1000 },
    { address: 'Connaught Place, Central Delhi', landmark: 'Inner Circle Block B', lat: 28.6328, lng: 77.2197 },
    { address: 'Noida Sector 62 Electronic City', landmark: 'Near Metro Station Gate 2', lat: 28.6280, lng: 77.3649 },
    { address: 'Cyber City, DLF Phase 2, Gurugram', landmark: 'Building 10 Highway Exit', lat: 28.4950, lng: 77.0895 },
  ],
};

export const MapLocationPickerModal: React.FC<MapPickerModalProps> = ({
  isOpen,
  type,
  currentValue,
  onSelectLocation,
  onClose,
}) => {
  const [searchQuery, setSearchQuery] = useState(currentValue || '');
  const [selectedCoord, setSelectedCoord] = useState<{ lat: number; lng: number }>({
    lat: type === 'pickup' ? 19.0596 : 18.5362,
    lng: type === 'pickup' ? 72.8295 : 73.894,
  });
  const [pinAddress, setPinAddress] = useState(
    currentValue || (type === 'pickup' ? 'Bandra West, Mumbai' : 'Koregaon Park, Pune')
  );
  const [pinLandmark, setPinLandmark] = useState('Near Highway Express Junction');
  const [activeCityTab, setActiveCityTab] = useState<'Mumbai' | 'Pune' | 'Delhi NCR'>('Mumbai');
  const [isLocating, setIsLocating] = useState(false);

  if (!isOpen) return null;

  // Filter search matches
  const filteredSuggestions = Object.values(POPULAR_LOCATIONS)
    .flat()
    .filter(
      (item) =>
        item.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.landmark.toLowerCase().includes(searchQuery.toLowerCase())
    );

  const handleUseCurrentLocation = () => {
    setIsLocating(true);
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setIsLocating(false);
          const newCoord = { lat: pos.coords.latitude, lng: pos.coords.longitude };
          setSelectedCoord(newCoord);
          const detectedAddr = 'Current Live GPS Location (Detected)';
          setPinAddress(detectedAddr);
          setPinLandmark(`Coordinates: ${newCoord.lat.toFixed(4)}, ${newCoord.lng.toFixed(4)}`);
        },
        () => {
          setIsLocating(false);
          // Fallback to high accuracy demo pin
          const fallback = POPULAR_LOCATIONS['Mumbai'][0];
          setSelectedCoord({ lat: fallback.lat, lng: fallback.lng });
          setPinAddress(fallback.address);
          setPinLandmark(fallback.landmark);
        },
        { timeout: 5000 }
      );
    } else {
      setIsLocating(false);
    }
  };

  const handleSelectFromList = (item: LocationSelection) => {
    setSelectedCoord({ lat: item.lat, lng: item.lng });
    setPinAddress(item.address);
    setPinLandmark(item.landmark);
    setSearchQuery(item.address);
  };

  const handleConfirm = () => {
    onSelectLocation({
      address: pinAddress,
      landmark: pinLandmark,
      lat: selectedCoord.lat,
      lng: selectedCoord.lng,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 animate-fade-in">
      <div className="bg-[#120F0B] text-slate-100 rounded-3xl w-full max-w-lg max-h-[92vh] flex flex-col shadow-2xl border border-[#F59E0B]/30 overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b border-white/10 flex items-center justify-between bg-gradient-to-r from-[#1C160C] to-[#120F0B]">
          <div className="flex items-center gap-2.5">
            <div
              className={`w-9 h-9 rounded-2xl flex items-center justify-center shadow-md ${
                type === 'pickup'
                  ? 'bg-gradient-to-br from-amber-400 to-amber-600 text-black font-bold'
                  : 'bg-gradient-to-br from-orange-500 to-amber-700 text-white font-bold'
              }`}
            >
              <span className="material-symbols-outlined text-[20px]">
                {type === 'pickup' ? 'trip_origin' : 'pin_drop'}
              </span>
            </div>
            <div>
              <h2 className="text-sm font-bold tracking-tight text-white flex items-center gap-2">
                Pick {type === 'pickup' ? 'Pickup' : 'Drop-off'} on Map
                <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30">
                  OpenStreetMap
                </span>
              </h2>
              <p className="text-[11px] text-slate-400">
                Move pin or search address for exact door-to-door cab routing
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 flex items-center justify-center transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Search Bar Input */}
        <div className="p-3 bg-[#17130E] border-b border-white/10">
          <div className="relative flex items-center">
            <span className="material-symbols-outlined absolute left-3 text-amber-500 text-[18px]">
              search
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search airport, highway plaza, hotel, colony..."
              className="w-full bg-[#241D14] border border-amber-500/30 rounded-2xl pl-9 pr-10 py-2.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 shadow-inner"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 text-slate-400 hover:text-white"
              >
                <span className="material-symbols-outlined text-[16px]">cancel</span>
              </button>
            )}
          </div>
        </div>

        {/* Interactive Visual Map Canvas */}
        <div className="relative w-full h-52 sm:h-60 bg-[#1C160C] overflow-hidden select-none border-b border-white/10">
          {/* Simulated Satellite & Transit OpenStreetMap Surface */}
          <div
            className="w-full h-full bg-cover bg-center transition-all duration-300 transform scale-105"
            style={{
              backgroundImage:
                "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAv9LWl4U-Up-JVn3P-PQRh8rCW9LNiVQ3erbe0j6MOJclOXiDXDNmRj2fAKW5ly0u9GOmZWRwsydTVK-672WIm0vvDYe7PJ9rlPZjy4VvpKn-9M-_j6QeEftvXDwCYzvyL6Q4NAKThC34763v-PsVQA5o9B2eTlwR56SVuanTmDrIdKGuKfXLXK8l4zOKQ4KgmT39528f-SdCoeIvJiyRPTJQr3O6sXaQtS9zDIFiaU_o-WHcGXm_WJQ')",
            }}
          >
            <div className="absolute inset-0 bg-[#0F0D0A]/40 backdrop-contrast-125"></div>
          </div>

          {/* Center Precision Pin Indicator */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-20 -translate-y-4">
            {/* Tooltip speech bubble */}
            <div className="bg-[#120F0B]/95 text-amber-300 px-3 py-1 rounded-full text-[10px] font-bold border border-amber-500/50 shadow-xl mb-1 flex items-center gap-1.5 animate-bounce">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
              <span>{type === 'pickup' ? 'PICKUP HERE' : 'DROP HERE'}</span>
            </div>

            {/* Glowing Golden Pin Icon */}
            <div className="relative flex items-center justify-center">
              <div className="w-10 h-10 rounded-full bg-amber-500/30 animate-ping absolute"></div>
              <div
                className={`w-9 h-9 rounded-2xl flex items-center justify-center shadow-[0_4px_20px_rgba(245,158,11,0.6)] border-2 border-white ${
                  type === 'pickup'
                    ? 'bg-gradient-to-tr from-amber-500 to-amber-300 text-black'
                    : 'bg-gradient-to-tr from-orange-600 to-amber-500 text-white'
                }`}
              >
                <span className="material-symbols-outlined text-[20px]">
                  {type === 'pickup' ? 'my_location' : 'location_on'}
                </span>
              </div>
            </div>

            {/* Pin Target Base Shadow */}
            <div className="w-4 h-1.5 rounded-full bg-black/60 blur-[1px] mt-0.5"></div>
          </div>

          {/* Map Overlay Controls */}
          <div className="absolute top-2.5 right-2.5 flex flex-col gap-1.5 z-20">
            <button
              type="button"
              onClick={handleUseCurrentLocation}
              disabled={isLocating}
              className="px-3 py-1.5 rounded-xl bg-[#17130E]/90 hover:bg-[#241D14] border border-amber-500/30 text-amber-400 text-[11px] font-bold flex items-center gap-1.5 shadow-lg backdrop-blur-md active:scale-95 transition-all"
            >
              <span
                className={`material-symbols-outlined text-[16px] ${
                  isLocating ? 'animate-spin' : ''
                }`}
              >
                {isLocating ? 'sync' : 'near_me'}
              </span>
              <span>{isLocating ? 'Locating...' : 'Use My GPS'}</span>
            </button>
          </div>

          <div className="absolute bottom-2.5 left-2.5 bg-[#0F0D0A]/90 backdrop-blur-md border border-white/10 px-2.5 py-1 rounded-xl text-[10px] text-slate-300 z-20 flex items-center gap-1">
            <span className="material-symbols-outlined text-[13px] text-amber-500">route</span>
            <span>OSM Route Geometry Sync</span>
          </div>
        </div>

        {/* Selected Location Pill */}
        <div className="p-3 bg-[#17130E] border-b border-white/10 flex items-start gap-2.5">
          <div className="w-7 h-7 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
            <span className="material-symbols-outlined text-[16px]">location_on</span>
          </div>
          <div className="flex-1 min-w-0">
            <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider block">
              Selected Point
            </span>
            <p className="text-xs font-bold text-white truncate">{pinAddress}</p>
            <p className="text-[11px] text-slate-400 truncate">{pinLandmark}</p>
          </div>
        </div>

        {/* Quick Suggestion List by Corridor */}
        <div className="flex-1 overflow-y-auto p-3 space-y-2">
          <div className="flex items-center justify-between px-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Popular Pickup / Drop Hubs
            </span>
            <div className="flex gap-1">
              {(['Mumbai', 'Pune', 'Delhi NCR'] as const).map((city) => (
                <button
                  key={city}
                  type="button"
                  onClick={() => setActiveCityTab(city)}
                  className={`px-2 py-0.5 rounded-lg text-[10px] font-bold transition-all ${
                    activeCityTab === city
                      ? 'bg-amber-500 text-black'
                      : 'bg-[#241D14] text-slate-400 hover:text-white'
                  }`}
                >
                  {city}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
            {(searchQuery.trim() ? filteredSuggestions : POPULAR_LOCATIONS[activeCityTab]).map(
              (item, idx) => (
                <div
                  key={idx}
                  onClick={() => handleSelectFromList(item)}
                  className={`p-2.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-2 ${
                    pinAddress === item.address
                      ? 'bg-[#241D14] border-amber-400 text-white'
                      : 'bg-[#17130E] border-white/5 hover:border-amber-500/30 text-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className="material-symbols-outlined text-[16px] text-amber-400 shrink-0">
                      directions_car
                    </span>
                    <div className="min-w-0">
                      <p className="text-xs font-bold truncate text-white">{item.address}</p>
                      <p className="text-[10px] text-slate-400 truncate">{item.landmark}</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-amber-400 shrink-0 bg-amber-500/10 px-2 py-0.5 rounded-lg border border-amber-500/20">
                    Select
                  </span>
                </div>
              )
            )}
          </div>
        </div>

        {/* Modal Action Bar */}
        <div className="p-3 bg-[#17130E] border-t border-white/10 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-slate-300 text-xs font-semibold"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-extrabold text-xs shadow-[0_2px_15px_rgba(245,158,11,0.35)] flex items-center justify-center gap-1.5 transition-all active:scale-[0.98]"
          >
            <span className="material-symbols-outlined text-[17px]">check_circle</span>
            <span>Confirm {type === 'pickup' ? 'Pickup' : 'Drop-off'} Location</span>
          </button>
        </div>
      </div>
    </div>
  );
};
