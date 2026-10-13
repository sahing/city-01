import React, { useState } from 'react';
import { INITIAL_KYC_DOCS, KycDocument } from '../mockData';

interface KycVerificationProps {
  onBack: () => void;
  onSubmitReview: () => void;
}

export const KycVerificationScreen: React.FC<KycVerificationProps> = ({
  onBack,
  onSubmitReview,
}) => {
  const [docs, setDocs] = useState<KycDocument[]>(INITIAL_KYC_DOCS);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleReupload = (docId: string) => {
    setDocs(
      docs.map((d) =>
        d.id === docId
          ? {
              ...d,
              status: 'approved',
              errorNotice: undefined,
              badge: 'Approved (Uploaded)',
            }
          : d
      )
    );
    setToastMessage('Commercial Permit successfully re-uploaded & passed OCR validation!');
    setTimeout(() => setToastMessage(null), 3000);
  };

  const approvedCount = docs.filter(
    (d) => d.status === 'verified' || d.status === 'approved'
  ).length;
  const progressPercent = Math.round((approvedCount / docs.length) * 100);

  return (
    <div className="flex flex-col w-full pb-28 animate-fade-in max-w-md mx-auto px-4">
      {/* Top Navigation */}
      <div className="pt-3 pb-2 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={onBack}
            className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center text-slate-800 hover:bg-slate-200"
          >
            <span className="material-symbols-outlined text-[18px]">arrow_back</span>
          </button>
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
              KYC Verification
            </span>
            <h1 className="text-sm font-bold text-slate-900 leading-tight">Step 3 of 4: Permits</h1>
          </div>
        </div>
        <button
          type="button"
          className="px-3 py-1.5 rounded-full bg-slate-100 text-slate-700 hover:text-slate-900 text-xs font-semibold flex items-center gap-1"
        >
          <span className="material-symbols-outlined text-[14px]">bookmark</span>
          <span>Save Draft</span>
        </button>
      </div>

      {/* Progress & Fast-Track Badge */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm relative overflow-hidden mt-2">
        <div className="flex items-start justify-between gap-3 relative z-10">
          <div className="flex flex-col gap-1 min-w-0">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-orange-100 text-orange-900 w-fit text-[11px] font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-600 animate-ping"></span>
              Fast-Track 24h Approval
            </div>
            <h2 className="text-base font-bold text-slate-900 mt-1">Verification In-Progress</h2>
            <p className="text-xs text-slate-500">
              Reviewing commercial credentials. One document requires a clearer scan.
            </p>
          </div>
          <div className="relative flex-shrink-0 w-14 h-14 flex items-center justify-center">
            <svg className="w-14 h-14 transform -rotate-90" viewBox="0 0 64 64">
              <circle
                cx="32"
                cy="32"
                r="26"
                stroke="currentColor"
                strokeWidth="5"
                fill="transparent"
                className="text-slate-100"
              />
              <circle
                cx="32"
                cy="32"
                r="26"
                stroke="currentColor"
                strokeWidth="5"
                fill="transparent"
                strokeDasharray="163.36"
                strokeDashoffset={163.36 * (1 - progressPercent / 100)}
                strokeLinecap="round"
                className="text-blue-600 transition-all duration-500"
              />
            </svg>
            <span className="absolute text-xs font-bold text-slate-900">{progressPercent}%</span>
          </div>
        </div>

        <div className="mt-3 pt-2.5 flex items-center justify-between text-xs bg-slate-50 px-3 py-2 rounded-xl">
          <span className="flex items-center gap-1.5 text-slate-800 font-semibold">
            <span className="material-symbols-outlined text-blue-600 text-[16px]">verified</span>
            {approvedCount} of {docs.length} Documents Approved
          </span>
          {approvedCount < docs.length && (
            <span className="text-orange-600 font-bold text-[11px]">
              {docs.length - approvedCount} Action Needed
            </span>
          )}
        </div>
      </div>

      {/* Required Credentials List */}
      <div className="mt-4 flex flex-col gap-2.5">
        <div className="flex items-center justify-between px-1">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-900">
            Required Credentials
          </span>
          <span className="text-[11px] text-slate-400">Central Transit Registry</span>
        </div>

        {docs.map((doc) => (
          <div
            key={doc.id}
            className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs flex flex-col gap-2.5"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3 min-w-0">
                <div
                  className={`w-12 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                    doc.status === 'action_needed'
                      ? 'bg-orange-100 text-orange-700'
                      : 'bg-blue-50 text-blue-700'
                  }`}
                >
                  <span className="material-symbols-outlined text-[20px]">{doc.icon}</span>
                </div>
                <div className="flex flex-col min-w-0">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-xs font-bold text-slate-900">{doc.name}</span>
                    <span className="px-1.5 py-0.2 rounded bg-slate-100 text-[10px] font-semibold text-slate-600">
                      {doc.badge}
                    </span>
                  </div>
                  {doc.docNumber && (
                    <span className="text-xs font-mono font-semibold text-slate-700 mt-0.5">
                      {doc.docNumber}
                    </span>
                  )}
                  {doc.validity && (
                    <span className="text-[11px] text-slate-400">{doc.validity}</span>
                  )}
                  {doc.errorNotice && (
                    <p className="text-[11px] text-orange-700 font-medium mt-1 leading-tight">
                      {doc.errorNotice}
                    </p>
                  )}
                </div>
              </div>

              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 flex items-center gap-1 ${
                  doc.status === 'verified' || doc.status === 'approved'
                    ? 'bg-emerald-100 text-emerald-700'
                    : doc.status === 'action_needed'
                    ? 'bg-orange-100 text-orange-800'
                    : 'bg-slate-100 text-slate-600'
                }`}
              >
                {doc.status === 'verified' && 'Verified ✓'}
                {doc.status === 'approved' && 'Approved ✓'}
                {doc.status === 'action_needed' && 'Action'}
                {doc.status === 'pending' && 'Pending'}
              </span>
            </div>

            {doc.status === 'action_needed' && (
              <button
                type="button"
                onClick={() => handleReupload(doc.id)}
                className="w-full h-10 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-semibold text-xs flex items-center justify-center gap-1.5 shadow-xs transition-colors mt-1"
              >
                <span className="material-symbols-outlined text-[16px]">upload_file</span>
                <span>Re-upload Document (PDF/JPG)</span>
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Payout Settlement Account */}
      <div className="mt-4 flex flex-col gap-2">
        <div className="flex items-center justify-between px-1">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-900">
            Payout Settlement Account
          </span>
          <span className="text-[11px] text-blue-600 font-semibold">T+0 Instant</span>
        </div>
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-700 flex items-center justify-center font-bold">
              <span className="material-symbols-outlined text-[20px]">account_balance</span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold text-slate-900">HDFC Bank</span>
                <span className="text-xs font-mono text-slate-600">•••• 4012</span>
              </div>
              <span className="text-[11px] text-slate-400">IFSC: HDFC0000240</span>
            </div>
          </div>
          <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-bold">
            IMPS Ready
          </span>
        </div>
      </div>

      {/* Bank Compliance Guarantee */}
      <div className="mt-4 bg-slate-50 border border-slate-200 rounded-2xl p-3.5 flex items-start gap-2.5">
        <span className="material-symbols-outlined text-blue-600 text-[20px] shrink-0 mt-0.5">
          lock
        </span>
        <div>
          <span className="text-xs font-bold text-slate-900 block">
            Bank-Grade Compliance Guarantee
          </span>
          <p className="text-[11px] text-slate-500 leading-relaxed mt-0.5">
            Stored in 256-bit encrypted secure vault. Complies strictly with MoRTH Aggregator
            Guidelines 2020 & state transport authority standards.
          </p>
        </div>
      </div>

      {/* Submit CTA */}
      <div className="pt-4 flex flex-col gap-2">
        <button
          type="button"
          onClick={onSubmitReview}
          className="w-full h-12 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs flex items-center justify-center gap-1.5 shadow-sm active:scale-95 transition-all"
        >
          <span>Submit for Final Review</span>
          <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
        </button>
      </div>

      {/* Toast Notification */}
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
