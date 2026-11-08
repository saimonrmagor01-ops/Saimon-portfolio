"use client";

import React, { useState } from "react";
import { Settings, Lock, Bell, Shield, Database, Check, RefreshCw, KeyRound } from "lucide-react";
import { DashboardSettings } from "@/lib/analytics/types";
import { saveSettings, sha256 } from "@/lib/analytics/storage";

interface SettingsViewProps {
  settings: DashboardSettings;
  onSettingsSaved: (updated: DashboardSettings) => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({ settings, onSettingsSaved }) => {
  const [newPin, setNewPin] = useState("");
  const [pinMessage, setPinMessage] = useState<string | null>(null);

  const [webhook, setWebhook] = useState(settings.discordWebhookUrl || "");
  const [enableDiscord, setEnableDiscord] = useState(settings.enableDiscordNotifications);
  const [filterBots, setFilterBots] = useState(settings.filterKnownBots);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);

  const handleUpdatePin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPin.trim() || newPin.trim().length < 4) {
      setPinMessage("Passkey must be at least 4 digits.");
      return;
    }

    const hashed = await sha256(newPin.trim());
    const updated = saveSettings({ adminPinHash: hashed });
    onSettingsSaved(updated);
    setPinMessage("Passkey updated successfully!");
    setNewPin("");
    setTimeout(() => setPinMessage(null), 3000);
  };

  const handleSaveIntegrations = (e: React.FormEvent) => {
    e.preventDefault();
    const updated = saveSettings({
      discordWebhookUrl: webhook.trim(),
      enableDiscordNotifications: enableDiscord,
      filterKnownBots: filterBots,
    });
    onSettingsSaved(updated);
    setSaveMessage("Configuration saved successfully.");
    setTimeout(() => setSaveMessage(null), 3000);
  };

  const handleResetData = () => {
    if (confirm("Reset local analytics database to initial seed baseline?")) {
      localStorage.removeItem("saimon_portfolio_sessions_v1");
      localStorage.removeItem("saimon_portfolio_events_v1");
      localStorage.removeItem("saimon_portfolio_leads_v1");
      window.location.reload();
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn max-w-4xl">
      {/* Header */}
      <div className="pb-4 border-b border-[#27272F]">
        <h2 className="text-xl font-bold text-[#F4F4F5] font-sans">System &amp; Privacy Settings</h2>
        <p className="text-xs text-[#92929C]">
          Configure admin credentials, Discord event notifications, bot filtering, and telemetry retention
        </p>
      </div>

      {/* Security & Admin Passkey */}
      <div className="p-6 rounded-2xl bg-[#131317] border border-[#27272F] space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#19191F] border border-[#27272F] flex items-center justify-center text-[#E5484D]">
            <KeyRound size={15} />
          </div>
          <div>
            <h3 className="text-sm font-bold text-[#F4F4F5]">Admin Passkey Protection</h3>
            <p className="text-xs text-[#92929C]">Update the PIN required to access this dashboard</p>
          </div>
        </div>

        <form onSubmit={handleUpdatePin} className="space-y-3 pt-2">
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="password"
              value={newPin}
              onChange={(e) => setNewPin(e.target.value)}
              placeholder="Enter new PIN / Passkey (e.g. 2025)"
              className="flex-1 px-4 py-2 rounded-xl bg-[#09090B] border border-[#27272F] text-xs text-[#F4F4F5] font-mono focus:outline-none focus:border-[#E5484D]"
            />
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-[#19191F] hover:bg-[#202028] border border-[#27272F] text-xs font-mono text-[#F4F4F5] transition-colors"
            >
              Update Passkey
            </button>
          </div>

          {pinMessage && (
            <div className="text-xs font-mono text-[#30B981] flex items-center gap-1.5">
              <Check size={12} />
              <span>{pinMessage}</span>
            </div>
          )}
        </form>
      </div>

      {/* Discord Notification Webhook */}
      <div className="p-6 rounded-2xl bg-[#131317] border border-[#27272F] space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#19191F] border border-[#27272F] flex items-center justify-center text-[#5865F2]">
            <Bell size={15} />
          </div>
          <div>
            <h3 className="text-sm font-bold text-[#F4F4F5]">Discord Webhook Alerts</h3>
            <p className="text-xs text-[#92929C]">
              Receive instant alerts in your private Discord server when inquiries or payments arrive
            </p>
          </div>
        </div>

        <form onSubmit={handleSaveIntegrations} className="space-y-4 pt-2">
          <div className="space-y-1.5">
            <label className="text-[11px] font-mono uppercase text-[#92929C]">
              Discord Channel Webhook URL
            </label>
            <input
              type="url"
              value={webhook}
              onChange={(e) => setWebhook(e.target.value)}
              placeholder="https://discord.com/api/webhooks/..."
              className="w-full px-4 py-2.5 rounded-xl bg-[#09090B] border border-[#27272F] text-xs text-[#F4F4F5] font-mono focus:outline-none focus:border-[#5865F2]"
            />
          </div>

          <div className="space-y-3 pt-2 border-t border-[#27272F]">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={enableDiscord}
                onChange={(e) => setEnableDiscord(e.target.checked)}
                className="w-4 h-4 accent-[#5865F2] rounded cursor-pointer"
              />
              <span className="text-xs text-[#F4F4F5]">
                Forward contact form submissions and lead updates to Discord
              </span>
            </label>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={filterBots}
                onChange={(e) => setFilterBots(e.target.checked)}
                className="w-4 h-4 accent-[#E5484D] rounded cursor-pointer"
              />
              <span className="text-xs text-[#F4F4F5]">
                Enable automatic crawler &amp; bot traffic filtering
              </span>
            </label>
          </div>

          <div className="flex items-center justify-between pt-2">
            {saveMessage && (
              <span className="text-xs font-mono text-[#30B981] flex items-center gap-1">
                <Check size={12} />
                <span>{saveMessage}</span>
              </span>
            )}
            <button
              type="submit"
              className="ml-auto px-4 py-2 rounded-xl bg-[#E5484D] hover:bg-[#d63b40] text-xs text-white font-medium transition-colors"
            >
              Save Configuration
            </button>
          </div>
        </form>
      </div>

      {/* Database Maintenance */}
      <div className="p-6 rounded-2xl bg-[#131317] border border-[#27272F] space-y-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#19191F] border border-[#27272F] flex items-center justify-center text-[#E5A13A]">
            <Database size={15} />
          </div>
          <div>
            <h3 className="text-sm font-bold text-[#F4F4F5]">Database Storage</h3>
            <p className="text-xs text-[#92929C]">
              Client-side persistent cache with automatic cross-tab synchronization
            </p>
          </div>
        </div>

        <div className="pt-2 flex items-center justify-between">
          <span className="text-xs text-[#92929C] font-mono">
            Active retention: 90 days rolling window
          </span>
          <button
            onClick={handleResetData}
            className="px-3 py-1.5 rounded-lg bg-[#19191F] hover:bg-rose-950/40 border border-[#27272F] hover:border-rose-800/50 text-xs font-mono text-[#E5484D] transition-colors"
          >
            Reset Database
          </button>
        </div>
      </div>
    </div>
  );
};
