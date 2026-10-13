import React, { useState } from 'react';
import {
  INITIAL_VEHICLES,
  INITIAL_BERTHS,
  INITIAL_LEADS,
  INITIAL_WORKFLOW_FIELDS,
  INITIAL_WORKFLOW_RULES,
  BerthSeat,
} from './mockData';
import { CabBookingScreen } from './components/CabBookingScreen';
import { CheckoutScreen } from './components/CheckoutScreen';
import { BusSeatBookingScreen } from './components/BusSeatBookingScreen';
import { DriverBiddingScreen } from './components/DriverBiddingScreen';
import { ActiveTripScreen } from './components/ActiveTripScreen';
import { LiveRideTrackingScreen } from './components/LiveRideTrackingScreen';
import { WorkflowBuilderScreen } from './components/WorkflowBuilderScreen';
import { TariffMatrixScreen } from './components/TariffMatrixScreen';
import { KycVerificationScreen } from './components/KycVerificationScreen';
import { WalletEarningsScreen } from './components/WalletEarningsScreen';
import { DeploymentAndDocsModal } from './components/DeploymentAndDocsModal';
import { IntercityWheelsLogo } from './components/IntercityWheelsLogo';

type ActiveTab = 'cabs' | 'schedules' | 'bidding' | 'workflows' | 'tariff' | 'tracking' | 'wallet' | 'kyc' | 'checkout';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('cabs');
  const [currentCity, setCurrentCity] = useState('New Delhi');
  const [showCityPicker, setShowCityPicker] = useState(false);
  const [showDeployDocs, setShowDeployDocs] = useState(false);

  // Shared state
  const [vehicles] = useState(INITIAL_VEHICLES);
  const [berths] = useState<BerthSeat[]>(INITIAL_BERTHS);
  const [leads] = useState(INITIAL_LEADS);
  const [workflowFields, setWorkflowFields] = useState(INITIAL_WORKFLOW_FIELDS);
  const [workflowRules, setWorkflowRules] = useState(INITIAL_WORKFLOW_RULES);

  // Active Booking
  const [activeBooking, setActiveBooking] = useState<any>({
    pickup: 'Mumbai, Bandra West',
    pickupLandmark: 'Linking Road / Bandra Fort',
    drop: 'Pune, Koregaon Park',
    dropLandmark: 'Lane 7, South Main Road',
    vehicle: INITIAL_VEHICLES[1],
    scheduledTime: 'Today, 04:30 PM',
  });

  const cities = ['New Delhi', 'Mumbai', 'Pune', 'Bengaluru', 'Goa', 'Chandigarh'];

  return (
    <div className="min-h-screen bg-[#0C0A08] text-slate-100 font-sans flex flex-col selection:bg-amber-500/30">
      {/* Universal Fixed App Header with Luxury Black & Metallic Gold Theme */}
      <header className="fixed top-0 w-full z-50 pt-safe bg-[#120F0B]/95 backdrop-blur-md border-b border-[#F59E0B]/30 shadow-[0_4px_20px_rgba(0,0,0,0.6)]">
        <div className="h-16 px-4 flex items-center justify-between max-w-lg mx-auto">
          {/* Logo & City Selector */}
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={() => setActiveTab('cabs')}
              className="hover:opacity-95 transition-opacity"
            >
              <IntercityWheelsLogo size="sm" showSubtitle={false} />
            </button>

            <div className="relative ml-1">
              <button
                type="button"
                onClick={() => setShowCityPicker(!showCityPicker)}
                className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#1F1911] hover:bg-[#2A2114] border border-amber-500/30 text-xs font-bold text-amber-300 transition-colors"
              >
                <span className="material-symbols-outlined text-[15px] text-amber-400">
                  location_on
                </span>
                <span>{currentCity}</span>
                <span className="material-symbols-outlined text-[14px] text-slate-400">
                  keyboard_arrow_down
                </span>
              </button>

              {showCityPicker && (
                <div className="absolute top-9 left-0 bg-[#17130E] border border-amber-500/40 rounded-2xl shadow-2xl p-1.5 w-36 z-50 animate-fade-in">
                  {cities.map((city) => (
                    <button
                      key={city}
                      type="button"
                      onClick={() => {
                        setCurrentCity(city);
                        setShowCityPicker(false);
                      }}
                      className={`w-full text-left px-2.5 py-1.5 text-xs rounded-xl font-bold ${
                        city === currentCity
                          ? 'bg-amber-500 text-black'
                          : 'text-slate-300 hover:bg-[#241D14] hover:text-white'
                      }`}
                    >
                      {city}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Header Controls */}
          <div className="flex items-center gap-1.5">
            {/* Deploy & Laravel Guide Button */}
            <button
              type="button"
              onClick={() => setShowDeployDocs(true)}
              className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/40 text-amber-400 text-[11px] font-bold transition-all shadow-xs"
            >
              <span className="material-symbols-outlined text-[14px]">terminal</span>
              <span className="hidden sm:inline">cPanel Guide</span>
            </button>

            <button
              type="button"
              aria-label="Notifications"
              className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/5 relative transition-colors"
            >
              <span className="material-symbols-outlined text-[19px]">notifications</span>
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-amber-500"></span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('wallet')}
              aria-label="Profile"
              className="w-8 h-8 rounded-full p-0.5 hover:ring-2 hover:ring-amber-400 transition-all shrink-0 border border-amber-500/30"
            >
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBpH-U3EadULPC2lNzJLWqHUi_u4QcUQ_-JKGs2Yu9ulNick3Doni-ZeMzkDZ-EVdDR2rwmZEnx0E60kJTSJ8sDTMVxpc39JtpOQ2ILYnq8fz4Vs_g5m8xE64OMGu4oPjxhsX8GYstxy_8cyy_0OGvhvrkvUzs5lt8-fctBXLk-I60T0HeTE1c3QnG3BSA09faIZUGS9b3LDKU41Nv9QRBUz2nFDskPlmKdDEGHRlmhV5DfvOtp6tG03g"
                alt="Profile"
                className="w-full h-full rounded-full object-cover"
              />
            </button>
          </div>
        </div>
      </header>

      {/* Main View Router */}
      <main className="flex-1 pt-16 flex flex-col w-full">
        {activeTab === 'cabs' && (
          <CabBookingScreen
            vehicles={vehicles}
            workflowFields={workflowFields}
            onProceedToCheckout={(data) => {
              setActiveBooking(data);
              setActiveTab('checkout');
            }}
            onOpenLiveTracking={() => setActiveTab('tracking')}
          />
        )}

        {activeTab === 'checkout' && (
          <CheckoutScreen
            bookingData={activeBooking}
            onConfirmBooking={() => setActiveTab('tracking')}
            onBack={() => setActiveTab('cabs')}
          />
        )}

        {activeTab === 'schedules' && (
          <BusSeatBookingScreen
            berths={berths}
            onProceedToPay={(selectedBerths, passengers) => {
              setActiveBooking({
                ...activeBooking,
                berths: selectedBerths,
                passengers,
                scheduledTime: 'Tomorrow, 09:30 PM',
              });
              setActiveTab('checkout');
            }}
            onBack={() => setActiveTab('cabs')}
          />
        )}

        {activeTab === 'bidding' && (
          <DriverBiddingScreen
            leads={leads}
            onOpenActiveTrip={() => setActiveTab('tracking')}
            onOpenKyc={() => setActiveTab('kyc')}
            onOpenWallet={() => setActiveTab('wallet')}
          />
        )}

        {activeTab === 'tracking' && (
          <LiveRideTrackingScreen
            onBack={() => setActiveTab('cabs')}
            onOpenSupport={() => alert('Safety command desk connected. Chauffeur verified.')}
          />
        )}

        {activeTab === 'workflows' && (
          <WorkflowBuilderScreen
            fields={workflowFields}
            rules={workflowRules}
            onUpdateFields={setWorkflowFields}
            onUpdateRules={setWorkflowRules}
            onPreviewFlow={() => setActiveTab('cabs')}
          />
        )}

        {activeTab === 'tariff' && <TariffMatrixScreen />}

        {activeTab === 'kyc' && (
          <KycVerificationScreen
            onBack={() => setActiveTab('bidding')}
            onSubmitReview={() => {
              alert('Commercial Permit approved and encrypted in vault.');
              setActiveTab('bidding');
            }}
          />
        )}

        {activeTab === 'wallet' && (
          <WalletEarningsScreen
            onBack={() => setActiveTab('bidding')}
            onOpenKyc={() => setActiveTab('kyc')}
          />
        )}
      </main>

      {/* Modern Bottom Navigation Bar with Brand Gold Accents */}
      <nav className="fixed bottom-0 w-full z-50 pb-safe bg-[#120F0B]/95 backdrop-blur-xl border-t border-[#F59E0B]/30 shadow-[0_-4px_20px_rgba(0,0,0,0.5)]">
        <div className="flex justify-around items-center h-14 max-w-md mx-auto px-2">
          {/* Cabs Tab */}
          <button
            type="button"
            onClick={() => setActiveTab('cabs')}
            className={`flex flex-col items-center justify-center flex-1 h-full transition-colors ${
              activeTab === 'cabs' || activeTab === 'checkout'
                ? 'text-amber-400 font-extrabold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <span
              className="material-symbols-outlined text-[20px]"
              style={{
                fontVariationSettings:
                  activeTab === 'cabs' || activeTab === 'checkout'
                    ? "'FILL' 1"
                    : "'FILL' 0",
              }}
            >
              directions_car
            </span>
            <span className="text-[10px] mt-0.5">Cabs</span>
          </button>

          {/* Sleeper Bus Schedules Tab */}
          <button
            type="button"
            onClick={() => setActiveTab('schedules')}
            className={`flex flex-col items-center justify-center flex-1 h-full transition-colors ${
              activeTab === 'schedules'
                ? 'text-amber-400 font-extrabold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <span
              className="material-symbols-outlined text-[20px]"
              style={{
                fontVariationSettings: activeTab === 'schedules' ? "'FILL' 1" : "'FILL' 0",
              }}
            >
              directions_bus
            </span>
            <span className="text-[10px] mt-0.5">Schedules</span>
          </button>

          {/* Reverse Bidding Tab */}
          <button
            type="button"
            onClick={() => setActiveTab('bidding')}
            className={`flex flex-col items-center justify-center flex-1 h-full transition-colors ${
              activeTab === 'bidding'
                ? 'text-amber-400 font-extrabold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <span
              className="material-symbols-outlined text-[20px]"
              style={{
                fontVariationSettings: activeTab === 'bidding' ? "'FILL' 1" : "'FILL' 0",
              }}
            >
              gavel
            </span>
            <span className="text-[10px] mt-0.5">Bidding</span>
          </button>

          {/* Dynamic Workflow Orchestrator Tab */}
          <button
            type="button"
            onClick={() => setActiveTab('workflows')}
            className={`flex flex-col items-center justify-center flex-1 h-full transition-colors ${
              activeTab === 'workflows'
                ? 'text-amber-400 font-extrabold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <span
              className="material-symbols-outlined text-[20px]"
              style={{
                fontVariationSettings: activeTab === 'workflows' ? "'FILL' 1" : "'FILL' 0",
              }}
            >
              schema
            </span>
            <span className="text-[10px] mt-0.5">Workflows</span>
          </button>

          {/* Tariff Engine Tab */}
          <button
            type="button"
            onClick={() => setActiveTab('tariff')}
            className={`flex flex-col items-center justify-center flex-1 h-full transition-colors ${
              activeTab === 'tariff'
                ? 'text-amber-400 font-extrabold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <span
              className="material-symbols-outlined text-[20px]"
              style={{
                fontVariationSettings: activeTab === 'tariff' ? "'FILL' 1" : "'FILL' 0",
              }}
            >
              payments
            </span>
            <span className="text-[10px] mt-0.5">Tariff</span>
          </button>
        </div>
      </nav>

      {/* Deployment & Laravel cPanel Documentation Modal */}
      <DeploymentAndDocsModal
        isOpen={showDeployDocs}
        onClose={() => setShowDeployDocs(false)}
      />
    </div>
  );
}
