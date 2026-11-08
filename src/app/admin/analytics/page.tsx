"use client";

import React, { useState, useEffect, useCallback } from "react";
import { AdminSidebar, AdminTab } from "./components/AdminSidebar";
import { AdminHeader } from "./components/AdminHeader";
import { AdminAuthModal } from "./components/AdminAuthModal";
import { OverviewView } from "./components/OverviewView";
import { LiveVisitorsView } from "./components/LiveVisitorsView";
import { TrafficAnalyticsView } from "./components/TrafficAnalyticsView";
import { GeographicView } from "./components/GeographicView";
import { ProjectPerformanceView } from "./components/ProjectPerformanceView";
import { EngagementView } from "./components/EngagementView";
import { ConversionFunnelView } from "./components/ConversionFunnelView";
import { InquiriesView } from "./components/InquiriesView";
import { CrmView } from "./components/CrmView";
import { ConfirmedClientsView } from "./components/ConfirmedClientsView";
import { RevenueView } from "./components/RevenueView";
import { TrafficQualityView } from "./components/TrafficQualityView";
import { ReportsView } from "./components/ReportsView";
import { SettingsView } from "./components/SettingsView";

import {
  isDashboardAuthenticated,
  setDashboardAuthenticated,
  getAggregatedKpiMetrics,
  getFunnelMetrics,
  getLeads,
  saveLead,
  createLead,
  deleteLead,
  getNotifications,
  markNotificationRead,
  markAllNotificationsRead,
  getSettings,
  getActiveVisitorsCount,
} from "@/lib/analytics/storage";
import { generateSeedDailyStats } from "@/lib/analytics/mockSeed";
import { TimeRange, ClientLead, NotificationItem, DashboardSettings } from "@/lib/analytics/types";

export default function AdminAnalyticsPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<AdminTab>("overview");
  const [timeRange, setTimeRange] = useState<TimeRange>("30d");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<string>("");

  // Live state
  const [metrics, setMetrics] = useState(getAggregatedKpiMetrics());
  const [funnelStages, setFunnelStages] = useState(getFunnelMetrics());
  const [leads, setLeads] = useState<ClientLead[]>([]);
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [settings, setSettings] = useState<DashboardSettings>(getSettings());
  const [dailyTrend, setDailyTrend] = useState(generateSeedDailyStats());
  const [activeCount, setActiveCount] = useState<number>(1);

  // Load and refresh state
  const refreshData = useCallback(() => {
    setIsRefreshing(true);
    setMetrics(getAggregatedKpiMetrics());
    setFunnelStages(getFunnelMetrics());
    setLeads(getLeads());
    setNotifications(getNotifications());
    setSettings(getSettings());
    setDailyTrend(generateSeedDailyStats());
    setActiveCount(getActiveVisitorsCount());
    setLastUpdated(
      new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" })
    );
    setTimeout(() => setIsRefreshing(false), 400);
  }, []);

  // Check authentication on initial load
  useEffect(() => {
    const auth = isDashboardAuthenticated();
    setIsAuthenticated(auth);
    setIsCheckingAuth(false);
    refreshData();
  }, [refreshData]);

  // Real-time broadcast and storage listener
  useEffect(() => {
    let channel: BroadcastChannel | null = null;
    try {
      if (typeof window !== "undefined" && "BroadcastChannel" in window) {
        channel = new BroadcastChannel("saimon_portfolio_analytics_channel");
        channel.onmessage = () => {
          refreshData();
        };
      }
    } catch (e) {
      // Fallback
    }

    const handleStorage = (e: StorageEvent) => {
      if (e.key && e.key.startsWith("saimon_portfolio_")) {
        refreshData();
      }
    };
    window.addEventListener("storage", handleStorage);

    // Heartbeat poller for live active count
    const interval = setInterval(() => {
      setActiveCount(getActiveVisitorsCount());
    }, 10000);

    return () => {
      if (channel) channel.close();
      window.removeEventListener("storage", handleStorage);
      clearInterval(interval);
    };
  }, [refreshData]);

  const handleLockSession = () => {
    setDashboardAuthenticated(false);
    setIsAuthenticated(false);
  };

  const handleSaveLead = (lead: ClientLead) => {
    saveLead(lead);
    refreshData();
  };

  const handleCreateLead = (newLead: any) => {
    createLead(newLead);
    refreshData();
  };

  const handleDeleteLead = (id: string) => {
    deleteLead(id);
    refreshData();
  };

  if (isCheckingAuth) {
    return (
      <div className="min-h-screen bg-[#09090B] flex items-center justify-center font-mono text-xs text-[#92929C]">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#E5484D] animate-ping" />
          <span>Verifying security credentials...</span>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <AdminAuthModal
        onAuthenticated={() => {
          setIsAuthenticated(true);
          refreshData();
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#09090B] text-[#F4F4F5] flex flex-col lg:flex-row font-sans selection:bg-[#E5484D]/30 selection:text-white">
      {/* Sidebar for Desktop */}
      <div className="hidden lg:block shrink-0">
        <AdminSidebar
          activeTab={activeTab}
          onTabChange={(tab) => {
            setActiveTab(tab);
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          activeVisitorsCount={activeCount}
          inquiriesCount={leads.filter((l) => l.status === "New Inquiry").length}
        />
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden bg-black/80 backdrop-blur-md">
          <div className="w-64 h-full bg-[#0D0D10] border-r border-[#27272F]">
            <AdminSidebar
              activeTab={activeTab}
              onTabChange={(tab) => {
                setActiveTab(tab);
                setMobileMenuOpen(false);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              activeVisitorsCount={activeCount}
              inquiriesCount={leads.filter((l) => l.status === "New Inquiry").length}
            />
          </div>
          <div className="flex-1" onClick={() => setMobileMenuOpen(false)} />
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <AdminHeader
          activeTab={activeTab}
          timeRange={timeRange}
          onTimeRangeChange={setTimeRange}
          searchQuery={searchQuery}
          onSearchQueryChange={setSearchQuery}
          notifications={notifications}
          onMarkNotificationRead={(id) => {
            markNotificationRead(id);
            refreshData();
          }}
          onMarkAllNotificationsRead={() => {
            markAllNotificationsRead();
            refreshData();
          }}
          onLockSession={handleLockSession}
          onMobileMenuToggle={() => setMobileMenuOpen(true)}
          isRefreshing={isRefreshing}
          onRefresh={refreshData}
        />

        <main className="p-4 sm:p-8 max-w-7xl w-full mx-auto pb-16">
          {activeTab === "overview" && (
            <OverviewView
              metrics={metrics}
              dailyTrend={dailyTrend}
              onNavigateTab={(tab) => setActiveTab(tab)}
              lastUpdated={lastUpdated}
            />
          )}

          {activeTab === "live" && <LiveVisitorsView activeCount={activeCount} />}

          {activeTab === "traffic" && <TrafficAnalyticsView dailyTrend={dailyTrend} />}

          {activeTab === "geography" && <GeographicView />}

          {activeTab === "projects" && <ProjectPerformanceView />}

          {activeTab === "engagement" && <EngagementView />}

          {activeTab === "funnel" && <ConversionFunnelView stages={funnelStages} />}

          {activeTab === "inquiries" && (
            <InquiriesView
              leads={leads}
              onUpdateLeadStatus={(id, status) => {
                const lead = leads.find((l) => l.id === id);
                if (lead) handleSaveLead({ ...lead, status });
              }}
              onNavigateTab={(tab) => setActiveTab(tab)}
            />
          )}

          {activeTab === "crm" && (
            <CrmView
              leads={leads}
              onSaveLead={handleSaveLead}
              onCreateLead={handleCreateLead}
              onDeleteLead={handleDeleteLead}
            />
          )}

          {activeTab === "confirmed" && <ConfirmedClientsView leads={leads} />}

          {activeTab === "revenue" && <RevenueView leads={leads} />}

          {activeTab === "quality" && <TrafficQualityView />}

          {activeTab === "reports" && (
            <ReportsView leads={leads} funnelStages={funnelStages} />
          )}

          {activeTab === "settings" && (
            <SettingsView
              settings={settings}
              onSettingsSaved={(updated) => {
                setSettings(updated);
                refreshData();
              }}
            />
          )}
        </main>
      </div>
    </div>
  );
}
