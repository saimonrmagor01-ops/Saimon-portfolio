"use client";

import React, { useState, useEffect } from "react";
import {
  LayoutDashboard,
  Radio,
  TrendingUp,
  Globe,
  FolderGit2,
  Clock,
  GitFork,
  MessageSquare,
  Users,
  Award,
  DollarSign,
  ShieldAlert,
  FileSpreadsheet,
  Settings,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
} from "lucide-react";

export type AdminTab =
  | "overview"
  | "live"
  | "traffic"
  | "geography"
  | "projects"
  | "engagement"
  | "funnel"
  | "inquiries"
  | "crm"
  | "confirmed"
  | "revenue"
  | "quality"
  | "reports"
  | "settings";

interface AdminSidebarProps {
  activeTab: AdminTab;
  onTabChange: (tab: AdminTab) => void;
  activeVisitorsCount: number;
  inquiriesCount: number;
}

interface NavItem {
  id: string;
  label: string;
  icon: any;
  badge?: string;
  badgeColor?: string;
  liveDot?: boolean;
}

interface NavSection {
  group: string;
  items: NavItem[];
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({
  activeTab,
  onTabChange,
  activeVisitorsCount,
  inquiriesCount,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("saimon_admin_sidebar_collapsed");
    if (saved !== null) {
      setIsCollapsed(saved === "true");
    }
  }, []);

  const toggleCollapse = () => {
    const next = !isCollapsed;
    setIsCollapsed(next);
    localStorage.setItem("saimon_admin_sidebar_collapsed", String(next));
  };

  const navSections: NavSection[] = [
    {
      group: "Intelligence",
      items: [
        { id: "overview", label: "Overview", icon: LayoutDashboard },
        {
          id: "live",
          label: "Live Visitors",
          icon: Radio,
          badge: `${activeVisitorsCount}`,
          badgeColor: "bg-[#30B981]/20 text-[#30B981] border-[#30B981]/40",
          liveDot: true,
        },
        { id: "traffic", label: "Traffic Analytics", icon: TrendingUp },
        { id: "geography", label: "Geography", icon: Globe },
        { id: "projects", label: "Project Performance", icon: FolderGit2 },
        { id: "engagement", label: "Engagement", icon: Clock },
      ],
    },
    {
      group: "Client & Revenue",
      items: [
        { id: "funnel", label: "Conversion Funnel", icon: GitFork },
        {
          id: "inquiries",
          label: "Inquiries",
          icon: MessageSquare,
          badge: inquiriesCount > 0 ? `${inquiriesCount}` : undefined,
          badgeColor: "bg-[#E5484D]/20 text-[#E5484D] border-[#E5484D]/40",
        },
        { id: "crm", label: "Client CRM", icon: Users },
        { id: "confirmed", label: "Confirmed Clients", icon: Award },
        { id: "revenue", label: "Revenue", icon: DollarSign },
      ],
    },
    {
      group: "System & Reports",
      items: [
        { id: "quality", label: "Traffic Quality", icon: ShieldAlert },
        { id: "reports", label: "Reports & Exports", icon: FileSpreadsheet },
        { id: "settings", label: "Settings", icon: Settings },
      ],
    },
  ];

  return (
    <aside
      className={`relative flex flex-col justify-between bg-[#0D0D10] border-r border-[#27272F] transition-all duration-300 z-30 select-none ${
        isCollapsed ? "w-16" : "w-64"
      }`}
    >
      {/* Brand & Logo Header */}
      <div>
        <div className="h-16 flex items-center justify-between px-4 border-b border-[#27272F]">
          {!isCollapsed ? (
            <div className="flex items-center gap-2.5 overflow-hidden">
              <div className="w-8 h-8 rounded-lg bg-[#19191F] border border-[#27272F] text-[#E5484D] flex items-center justify-center font-mono font-bold text-sm tracking-wider shadow-inner shrink-0">
                SR
              </div>
              <div className="truncate">
                <div className="text-xs font-bold text-[#F4F4F5] tracking-tight truncate">
                  Saimon Portfolio
                </div>
                <div className="text-[10px] font-mono text-[#92929C] tracking-wide uppercase truncate">
                  Intelligence OS
                </div>
              </div>
            </div>
          ) : (
            <div className="w-8 h-8 mx-auto rounded-lg bg-[#19191F] border border-[#27272F] text-[#E5484D] flex items-center justify-center font-mono font-bold text-xs">
              SR
            </div>
          )}

          <button
            onClick={toggleCollapse}
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            className="hidden lg:flex w-7 h-7 rounded-lg items-center justify-center text-[#92929C] hover:text-[#F4F4F5] hover:bg-[#19191F] border border-transparent hover:border-[#27272F] transition-colors"
          >
            {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
          </button>
        </div>

        {/* Navigation list */}
        <div className="p-3 space-y-6 overflow-y-auto max-h-[calc(100vh-8rem)] scrollbar-thin">
          {navSections.map((sec, secIdx) => (
            <div key={secIdx} className="space-y-1">
              {!isCollapsed && (
                <div className="px-2 pb-1.5 text-[10px] font-mono uppercase tracking-widest text-[#62626C]">
                  {sec.group}
                </div>
              )}
              <div className="space-y-0.5">
                {sec.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;

                  return (
                    <button
                      key={item.id}
                      onClick={() => onTabChange(item.id as AdminTab)}
                      title={isCollapsed ? item.label : undefined}
                      className={`w-full flex items-center gap-3 px-2.5 py-2 rounded-xl text-xs font-medium transition-all group relative ${
                        isActive
                          ? "bg-[#19191F] text-[#F4F4F5] shadow-sm border border-[#27272F]"
                          : "text-[#92929C] hover:text-[#F4F4F5] hover:bg-[#131317]"
                      }`}
                    >
                      {/* Active Red Accent Pill Indicator */}
                      {isActive && (
                        <span className="absolute left-0 top-1.5 bottom-1.5 w-1 rounded-r-full bg-[#E5484D]" />
                      )}

                      <Icon
                        size={16}
                        className={`shrink-0 transition-colors ${
                          isActive
                            ? "text-[#E5484D]"
                            : "text-[#92929C] group-hover:text-[#F4F4F5]"
                        }`}
                      />

                      {!isCollapsed && (
                        <span className="truncate flex-1 text-left">{item.label}</span>
                      )}

                      {!isCollapsed && item.badge && (
                        <span
                          className={`ml-auto px-1.5 py-0.5 rounded-md text-[10px] font-mono font-bold border flex items-center gap-1 ${
                            item.badgeColor || "bg-[#19191F] text-[#92929C] border-[#27272F]"
                          }`}
                        >
                          {item.liveDot && (
                            <span className="w-1.5 h-1.5 rounded-full bg-[#30B981] animate-ping" />
                          )}
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer link to public website */}
      <div className="p-3 border-t border-[#27272F]">
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-xl text-xs font-medium text-[#92929C] hover:text-[#F4F4F5] hover:bg-[#131317] border border-transparent hover:border-[#27272F] transition-all"
        >
          <ExternalLink size={14} className="shrink-0 text-[#62626C]" />
          {!isCollapsed && <span className="truncate">View Live Portfolio</span>}
        </a>
      </div>
    </aside>
  );
};
