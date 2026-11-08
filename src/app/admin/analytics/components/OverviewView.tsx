"use client";

import React from "react";
import {
  Users,
  UserCheck,
  Radio,
  MessageSquare,
  Award,
  DollarSign,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  ChevronRight,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { Sparkline, AreaLineChart, HorizontalBarChart, DonutChart } from "./Charts";
import { SEED_COUNTRIES, SEED_SOURCES } from "@/lib/analytics/mockSeed";
import { AdminTab } from "./AdminSidebar";

interface OverviewViewProps {
  metrics: {
    totalVisits: number;
    uniqueVisitors: number;
    activeVisitors: number;
    totalInquiries: number;
    confirmedClientsCount: number;
    totalRevenue: number;
    pendingPayments: number;
    avgProjectValue: number;
    conversionRate: number;
  };
  dailyTrend: {
    date: string;
    totalVisits: number;
    uniqueVisits: number;
    inquiries: number;
  }[];
  onNavigateTab: (tab: AdminTab) => void;
  lastUpdated: string;
}

export const OverviewView: React.FC<OverviewViewProps> = ({
  metrics,
  dailyTrend,
  onNavigateTab,
  lastUpdated,
}) => {
  // Sparkline arrays from daily trend
  const visitsSpark = dailyTrend.map((d) => d.totalVisits);
  const uniqueSpark = dailyTrend.map((d) => d.uniqueVisits);
  const liveSpark = [1, 2, 1, 3, 2, 4, metrics.activeVisitors, metrics.activeVisitors];
  const inquiriesSpark = [0, 1, 0, 1, 1, 2, 1, metrics.totalInquiries];
  const clientsSpark = [0, 1, 1, 2, 2, 3, metrics.confirmedClientsCount];
  const revenueSpark = [0, 800, 800, 1600, 2050, metrics.totalRevenue];

  const statCards = [
    {
      title: "Total Visitors",
      value: metrics.totalVisits.toLocaleString(),
      description: "Overall portfolio sessions recorded",
      change: "+18.4%",
      isPositive: true,
      sparkline: visitsSpark,
      sparkColor: "#E5484D",
      icon: Users,
      onClick: () => onNavigateTab("traffic"),
    },
    {
      title: "Unique Visitors",
      value: metrics.uniqueVisitors.toLocaleString(),
      description: "Distinct anonymous individuals",
      change: "+14.2%",
      isPositive: true,
      sparkline: uniqueSpark,
      sparkColor: "#30B981",
      icon: UserCheck,
      onClick: () => onNavigateTab("traffic"),
    },
    {
      title: "Active Visitors",
      value: `${metrics.activeVisitors}`,
      description: "Browsing your portfolio right now",
      change: "Live",
      isPositive: true,
      isLive: true,
      sparkline: liveSpark,
      sparkColor: "#30B981",
      icon: Radio,
      onClick: () => onNavigateTab("live"),
    },
    {
      title: "Contact Inquiries",
      value: `${metrics.totalInquiries}`,
      description: "Form submissions & direct chats",
      change: "+28.0%",
      isPositive: true,
      sparkline: inquiriesSpark,
      sparkColor: "#E5484D",
      icon: MessageSquare,
      onClick: () => onNavigateTab("inquiries"),
    },
    {
      title: "Confirmed Clients",
      value: `${metrics.confirmedClientsCount}`,
      description: "Officially hired & contract signed",
      change: "+50.0%",
      isPositive: true,
      sparkline: clientsSpark,
      sparkColor: "#30B981",
      icon: Award,
      onClick: () => onNavigateTab("confirmed"),
    },
    {
      title: "Total Revenue",
      value: `$${metrics.totalRevenue.toLocaleString()}`,
      description: `Verified payments ($${metrics.pendingPayments.toLocaleString()} pending)`,
      change: "+34.5%",
      isPositive: true,
      sparkline: revenueSpark,
      sparkColor: "#30B981",
      icon: DollarSign,
      onClick: () => onNavigateTab("revenue"),
    },
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Top Heading */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#27272F]">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#F4F4F5] font-sans">
              Portfolio Intelligence
            </h1>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono bg-[#30B981]/15 text-[#30B981] border border-[#30B981]/30">
              <span className="w-1.5 h-1.5 rounded-full bg-[#30B981] animate-ping" />
              Live Active
            </span>
          </div>
          <p className="text-xs sm:text-sm text-[#92929C]">
            Understand your audience. Measure your impact. Track your growth.
          </p>
        </div>

        <div className="flex items-center gap-3 text-xs font-mono text-[#92929C]">
          <div className="flex items-center gap-1.5 bg-[#131317] border border-[#27272F] px-3 py-1.5 rounded-lg">
            <span className="text-[#62626C]">Last synced:</span>
            <span className="text-[#F4F4F5]">{lastUpdated}</span>
          </div>
        </div>
      </div>

      {/* 6 Statistic Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {statCards.map((card, idx) => {
          const Icon = card.icon;

          return (
            <div
              key={idx}
              onClick={card.onClick}
              className="p-5 rounded-2xl bg-[#131317] border border-[#27272F] hover:border-[#E5484D]/50 hover:bg-[#16161B] transition-all duration-300 shadow-sm hover:shadow-lg cursor-pointer group relative overflow-hidden flex flex-col justify-between"
            >
              {/* Subtle crimson accent line on hover */}
              <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#E5484D] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-[#92929C] group-hover:text-[#F4F4F5] transition-colors">
                    {card.title}
                  </span>
                  <div className="w-7 h-7 rounded-lg bg-[#19191F] border border-[#27272F] flex items-center justify-center text-[#92929C] group-hover:text-[#E5484D] group-hover:border-[#E5484D]/30 transition-colors">
                    <Icon size={14} />
                  </div>
                </div>

                <div className="flex items-baseline justify-between gap-2">
                  <div className="text-2xl sm:text-3xl font-extrabold text-[#F4F4F5] font-mono tracking-tight">
                    {card.value}
                  </div>

                  <div className="shrink-0">
                    <Sparkline
                      data={card.sparkline}
                      color={card.sparkColor}
                      height={32}
                      width={80}
                    />
                  </div>
                </div>
              </div>

              <div className="pt-3 mt-3 border-t border-[#27272F]/60 flex items-center justify-between text-xs">
                <span className="text-[11px] text-[#62626C] truncate max-w-[150px]">
                  {card.description}
                </span>

                <span
                  className={`inline-flex items-center gap-1 font-mono text-[11px] font-semibold ${
                    card.isLive
                      ? "text-[#30B981]"
                      : card.isPositive
                      ? "text-[#30B981]"
                      : "text-[#E5484D]"
                  }`}
                >
                  {card.isLive ? (
                    <>
                      <span className="w-1.5 h-1.5 rounded-full bg-[#30B981] animate-pulse" />
                      Live
                    </>
                  ) : card.isPositive ? (
                    <>
                      <ArrowUpRight size={12} />
                      {card.change}
                    </>
                  ) : (
                    <>
                      <ArrowDownRight size={12} />
                      {card.change}
                    </>
                  )}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Visitor Growth Chart Container */}
      <div className="p-6 rounded-2xl bg-[#131317] border border-[#27272F] space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h3 className="text-base font-bold text-[#F4F4F5]">
              Visitor Growth &amp; Engagement
            </h3>
            <p className="text-xs text-[#92929C]">
              Continuous daily sessions vs unique individual visitors
            </p>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#E5484D]" />
              <span className="text-[#F4F4F5]">Total Visits</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#30B981]" />
              <span className="text-[#92929C]">Unique Visitors</span>
            </div>
          </div>
        </div>

        <AreaLineChart data={dailyTrend} height={260} />
      </div>

      {/* Two Column Section: Traffic Sources & Geographic Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Traffic Sources */}
        <div className="p-6 rounded-2xl bg-[#131317] border border-[#27272F] space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <h3 className="text-sm font-bold text-[#F4F4F5]">Traffic Sources</h3>
              <p className="text-xs text-[#92929C]">How audiences discover your work</p>
            </div>
            <button
              onClick={() => onNavigateTab("traffic")}
              className="text-xs font-mono text-[#E5484D] hover:underline flex items-center gap-1"
            >
              <span>Explore</span>
              <ChevronRight size={12} />
            </button>
          </div>

          <HorizontalBarChart
            items={SEED_SOURCES.map((s) => ({
              label: s.name,
              value: s.count,
              percentage: s.percentage,
              color: "#E5484D",
            }))}
          />
        </div>

        {/* Top Geographic Audiences */}
        <div className="p-6 rounded-2xl bg-[#131317] border border-[#27272F] space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <h3 className="text-sm font-bold text-[#F4F4F5]">Top Countries</h3>
              <p className="text-xs text-[#92929C]">Geographic reach &amp; global views</p>
            </div>
            <button
              onClick={() => onNavigateTab("geography")}
              className="text-xs font-mono text-[#E5484D] hover:underline flex items-center gap-1"
            >
              <span>Map View</span>
              <ChevronRight size={12} />
            </button>
          </div>

          <HorizontalBarChart
            items={SEED_COUNTRIES.slice(0, 5).map((c) => ({
              label: `${c.flag} ${c.name}`,
              value: c.visitors,
              percentage: c.percentage,
              color: "#30B981",
            }))}
          />
        </div>
      </div>
    </div>
  );
};
