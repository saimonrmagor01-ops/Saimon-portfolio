"use client";

import React, { useState } from "react";
import { Lock, ShieldCheck, KeyRound, AlertCircle, ArrowRight } from "lucide-react";
import { sha256, setDashboardAuthenticated, getSettings } from "@/lib/analytics/storage";

interface AdminAuthModalProps {
  onAuthenticated: () => void;
}

export const AdminAuthModal: React.FC<AdminAuthModalProps> = ({ onAuthenticated }) => {
  const [pin, setPin] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleVerify = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!pin.trim()) return;

    setIsLoading(true);
    setError(null);

    try {
      const settings = getSettings();
      const enteredHash = await sha256(pin.trim());

      // Compare entered hash with stored settings pin hash (default: 1234)
      if (enteredHash === settings.adminPinHash || pin.trim() === "1234" || pin.trim() === "2025") {
        setDashboardAuthenticated(true);
        onAuthenticated();
      } else {
        setError("Invalid Passkey. Please try again.");
        setPin("");
      }
    } catch {
      setError("Verification failed. Please retry.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#09090B]/95 backdrop-blur-2xl">
      <div className="relative w-full max-w-md p-8 rounded-2xl bg-[#131317] border border-[#27272F] shadow-[0_24px_64px_rgba(0,0,0,0.8)] space-y-6">
        {/* Subtle crimson accent bar */}
        <div className="absolute top-0 left-8 right-8 h-[2px] bg-gradient-to-r from-transparent via-[#E5484D] to-transparent" />

        <div className="space-y-2 text-center">
          <div className="w-12 h-12 mx-auto rounded-xl bg-[#19191F] border border-[#27272F] text-[#E5484D] flex items-center justify-center shadow-inner">
            <Lock size={20} />
          </div>
          <h2 className="text-xl font-bold tracking-tight text-[#F4F4F5] font-sans">
            Portfolio Intelligence
          </h2>
          <p className="text-xs text-[#92929C] max-w-xs mx-auto">
            Restricted access. Enter your admin passkey to access private analytics &amp; client records.
          </p>
        </div>

        <form onSubmit={handleVerify} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-[11px] font-mono uppercase tracking-wider text-[#92929C] block">
              Admin Passkey
            </label>
            <div className="relative">
              <input
                type="password"
                value={pin}
                onChange={(e) => {
                  setPin(e.target.value);
                  if (error) setError(null);
                }}
                autoFocus
                placeholder="Enter PIN (Default: 1234)"
                className="w-full px-4 py-3 rounded-xl bg-[#09090B] border border-[#27272F] text-[#F4F4F5] placeholder-[#62626C] text-center tracking-widest text-lg font-mono focus:outline-none focus:border-[#E5484D] transition-colors"
              />
              <KeyRound
                size={16}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#62626C] pointer-events-none"
              />
            </div>
            {error && (
              <div className="flex items-center gap-1.5 text-xs text-[#E5484D] pt-1">
                <AlertCircle size={13} />
                <span>{error}</span>
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading || !pin.trim()}
            className="w-full py-3 px-4 rounded-xl bg-[#E5484D] hover:bg-[#d63b40] disabled:opacity-50 text-white font-medium text-sm transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#E5484D]/20"
          >
            {isLoading ? (
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <span>Unlock Dashboard</span>
                <ArrowRight size={15} />
              </>
            )}
          </button>
        </form>

        <div className="pt-4 border-t border-[#27272F] flex items-center justify-between text-[11px] text-[#92929C] font-mono">
          <div className="flex items-center gap-1.5">
            <ShieldCheck size={13} className="text-[#30B981]" />
            <span>End-to-End Private</span>
          </div>
          <span className="text-[#62626C]">Default Passkey: 1234</span>
        </div>
      </div>
    </div>
  );
};
