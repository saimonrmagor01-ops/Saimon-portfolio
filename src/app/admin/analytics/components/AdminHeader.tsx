"use client";

import React, { useState } from "react";
import {
  Search,
  Bell,
  Lock,
  Calendar,
  CheckCheck,
  ChevronDown,
  Sparkles,
  RefreshCw,
  X,
  Menu,
} from "lucide-react";
import { TimeRange, NotificationItem } from "@/lib/analytics/types";
import { AdminTab } from "./AdminSidebar";

interface AdminHeaderProps {
  activeTab: AdminTab;
  timeRange: TimeRange;
  onTimeRangeChange: (range: TimeRange) => void;
  searchQuery: string;
  onSearchQueryChange: (q: string) => void;
  notifications: NotificationItem[];
  onMarkNotificationRead: (id: string) => void;
  onMarkAllNotificationsRead: () => void;
  onLockSession: () => void;
  onMobileMenuToggle?: () => void;
  isRefreshing?: boolean;
  onRefresh?: () => void;
}

const TAB_TITLES: Record<AdminTab, string> = {
  overview: "Overview",
  live: "Live Visitors",
  traffic: "Traffic Analytics",
  geography: "Geography",
  projects: "Project Performance",
  engagement: "Visitor Engagement",
  funnel: "Conversion Funnel",
  inquiries: "Contact Inquiries",
  crm: "Client CRM",
  confirmed: "Confirmed Clients",
  revenue: "Revenue Analytics",
  quality: "Traffic Quality",
  reports: "Reports & Exports",
  settings: "Settings",
};

export const AdminHeader: React.FC<AdminHeaderProps> = ({
  activeTab,
  timeRange,
  onTimeRangeChange,
  searchQuery,
  onSearchQueryChange,
  notifications,
  onMarkNotificationRead,
  onMarkAllNotificationsRead,
  onLockSession,
  onMobileMenuToggle,
  isRefreshing,
  onRefresh,
}) => {
  const [notifOpen, setNotifOpen] = useState(false);
  const unreadCount = notifications.filter((n) => !n.read).length;

  const timeRanges: { id: TimeRange; label: string }[] = [
    { id: "24h", label: "24h" },
    { id: "7d", label: "7d" },
    { id: "30d", label: "30d" },
    { id: "90d", label: "90d" },
    { id: "12m", label: "12m" },
  ];

  return (
    <header className="h-16 px-4 sm:px-6 bg-[#09090B] border-b border-[#27272F] flex items-center justify-between gap-4 sticky top-0 z-20">
      {/* Left: Mobile Toggle & Breadcrumbs */}
      <div className="flex items-center gap-3">
        {onMobileMenuToggle && (
          <button
            onClick={onMobileMenuToggle}
            className="lg:hidden p-2 rounded-lg text-[#92929C] hover:text-[#F4F4F5] hover:bg-[#131317]"
          >
            <Menu size={18} />
          </button>
        )}

        <div className="flex items-center gap-2 text-xs font-mono">
          <span className="text-[#62626C] hidden sm:inline">Portfolio</span>
          <span className="text-[#62626C] hidden sm:inline">/</span>
          <span className="text-[#F4F4F5] font-semibold">{TAB_TITLES[activeTab]}</span>
        </div>
      </div>

      {/* Center: Quick Search Bar */}
      <div className="hidden md:flex items-center flex-1 max-w-sm mx-4">
        <div className="relative w-full">
          <Search
            size={14}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-[#62626C] pointer-events-none"
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchQueryChange(e.target.value)}
            placeholder="Search metrics, projects, leads... (⌘K)"
            className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-[#131317] border border-[#27272F] text-xs text-[#F4F4F5] placeholder-[#62626C] focus:outline-none focus:border-[#E5484D] transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchQueryChange("")}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#62626C] hover:text-[#F4F4F5]"
            >
              <X size={12} />
            </button>
          )}
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Time Range Selector */}
        <div className="hidden sm:flex items-center bg-[#131317] border border-[#27272F] rounded-lg p-0.5 text-xs font-mono">
          {timeRanges.map((r) => (
            <button
              key={r.id}
              onClick={() => onTimeRangeChange(r.id)}
              className={`px-2.5 py-1 rounded-md transition-all ${
                timeRange === r.id
                  ? "bg-[#19191F] text-[#F4F4F5] font-semibold border border-[#27272F] shadow-sm"
                  : "text-[#92929C] hover:text-[#F4F4F5]"
              }`}
            >
              {r.label}
            </button>
          ))}
        </div>

        {/* Refresh button */}
        {onRefresh && (
          <button
            onClick={onRefresh}
            title="Refresh metrics"
            className={`p-2 rounded-lg text-[#92929C] hover:text-[#F4F4F5] hover:bg-[#131317] border border-transparent hover:border-[#27272F] transition-all ${
              isRefreshing ? "animate-spin text-[#E5484D]" : ""
            }`}
          >
            <RefreshCw size={15} />
          </button>
        )}

        {/* Notifications Dropdown */}
        <div className="relative">
          <button
            onClick={() => setNotifOpen(!notifOpen)}
            className="relative p-2 rounded-lg text-[#92929C] hover:text-[#F4F4F5] hover:bg-[#131317] border border-transparent hover:border-[#27272F] transition-all"
            aria-label="Notifications"
          >
            <Bell size={16} />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#E5484D] ring-2 ring-[#09090B]" />
            )}
          </button>

          {notifOpen && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl bg-[#131317] border border-[#27272F] shadow-2xl z-50 p-4 space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-[#27272F]">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-[#F4F4F5]">Activity &amp; Alerts</span>
                  {unreadCount > 0 && (
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-[#E5484D]/20 text-[#E5484D] border border-[#E5484D]/30">
                      {unreadCount} new
                    </span>
                  )}
                </div>
                {unreadCount > 0 && (
                  <button
                    onClick={onMarkAllNotificationsRead}
                    className="text-[11px] text-[#92929C] hover:text-[#F4F4F5] flex items-center gap-1"
                  >
                    <CheckCheck size={12} />
                    <span>Mark all read</span>
                  </button>
                )}
              </div>

              <div className="space-y-2 max-h-72 overflow-y-auto scrollbar-thin">
                {notifications.length === 0 ? (
                  <div className="py-6 text-center text-xs text-[#62626C] font-mono">
                    No notifications yet
                  </div>
                ) : (
                  notifications.map((n) => (
                    <div
                      key={n.id}
                      onClick={() => onMarkNotificationRead(n.id)}
                      className={`p-2.5 rounded-xl border text-xs cursor-pointer transition-all ${
                        !n.read
                          ? "bg-[#19191F] border-[#27272F] text-[#F4F4F5]"
                          : "bg-transparent border-transparent text-[#92929C] hover:bg-[#19191F]/50"
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2 font-medium">
                        <span className="truncate">{n.title}</span>
                        <span className="text-[10px] font-mono text-[#62626C] shrink-0">
                          {new Date(n.timestamp).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </div>
                      <p className="text-[11px] text-[#92929C] mt-1 line-clamp-2 leading-relaxed">
                        {n.message}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* Lock Session Button */}
        <button
          onClick={onLockSession}
          title="Lock Dashboard Session"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#131317] hover:bg-[#19191F] border border-[#27272F] text-xs font-mono text-[#92929C] hover:text-[#F4F4F5] transition-all"
        >
          <Lock size={12} className="text-[#E5484D]" />
          <span className="hidden sm:inline">Lock</span>
        </button>
      </div>
    </header>
  );
};
