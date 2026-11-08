"use client";

import React, { useState } from "react";
import { MessageSquare, ExternalLink, ArrowRight, Check, Search, Filter } from "lucide-react";
import { ClientLead } from "@/lib/analytics/types";
import { AdminTab } from "./AdminSidebar";

interface InquiriesViewProps {
  leads: ClientLead[];
  onUpdateLeadStatus: (leadId: string, status: any) => void;
  onNavigateTab: (tab: AdminTab) => void;
}

export const InquiriesView: React.FC<InquiriesViewProps> = ({
  leads,
  onUpdateLeadStatus,
  onNavigateTab,
}) => {
  const [filterChannel, setFilterChannel] = useState<string>("All");
  const [search, setSearch] = useState("");

  const filtered = leads.filter((l) => {
    const matchChannel = filterChannel === "All" || l.contactMethod === filterChannel;
    const matchSearch =
      l.clientName.toLowerCase().includes(search.toLowerCase()) ||
      l.service.toLowerCase().includes(search.toLowerCase()) ||
      l.projectDescription.toLowerCase().includes(search.toLowerCase());
    return matchChannel && matchSearch;
  });

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#27272F]">
        <div>
          <h2 className="text-xl font-bold text-[#F4F4F5] font-sans">Contact Inquiries Inbox</h2>
          <p className="text-xs text-[#92929C]">
            Direct client inquiries initiated via WhatsApp, Discord, Instagram, and web buttons
          </p>
        </div>

        {/* Filter channel */}
        <div className="flex items-center gap-2">
          {["All", "WhatsApp", "Discord", "Instagram"].map((ch) => (
            <button
              key={ch}
              onClick={() => setFilterChannel(ch)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                filterChannel === ch
                  ? "bg-[#19191F] text-[#F4F4F5] font-semibold border border-[#27272F]"
                  : "text-[#92929C] hover:text-[#F4F4F5]"
              }`}
            >
              {ch}
            </button>
          ))}
        </div>
      </div>

      {/* Inquiries List */}
      <div className="space-y-4">
        {filtered.length === 0 ? (
          <div className="p-12 text-center text-xs text-[#62626C] font-mono rounded-2xl bg-[#131317] border border-[#27272F]">
            No inquiries matching the selected criteria
          </div>
        ) : (
          filtered.map((lead) => (
            <div
              key={lead.id}
              className="p-6 rounded-2xl bg-[#131317] border border-[#27272F] hover:border-[#E5484D]/40 transition-all space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#19191F] border border-[#27272F] flex items-center justify-center text-[#E5484D] font-mono font-bold text-xs">
                    {lead.clientName.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-[#F4F4F5]">{lead.clientName}</h3>
                    <div className="text-[11px] font-mono text-[#92929C] flex items-center gap-2">
                      <span>{lead.contactMethod}</span>
                      {lead.handleOrPhone && <span>• {lead.handleOrPhone}</span>}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-md text-[10px] font-mono bg-[#19191F] border border-[#27272F] text-[#F4F4F5]">
                    {lead.service}
                  </span>
                  <span className="px-2.5 py-1 rounded-md text-[10px] font-mono bg-[#30B981]/15 text-[#30B981] border border-[#30B981]/30 font-semibold">
                    ${lead.estimatedBudget}
                  </span>
                </div>
              </div>

              <p className="text-xs text-[#CBD5E1] bg-[#09090B] p-3.5 rounded-xl border border-[#27272F] leading-relaxed">
                {lead.projectDescription}
              </p>

              <div className="flex flex-wrap items-center justify-between gap-3 pt-2 text-xs font-mono">
                <span className="text-[#62626C]">
                  Received: {new Date(lead.createdAt).toLocaleDateString()} at{" "}
                  {new Date(lead.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onNavigateTab("crm")}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#19191F] hover:bg-[#202028] border border-[#27272F] text-xs text-[#F4F4F5] transition-colors"
                  >
                    <span>Manage in CRM</span>
                    <ArrowRight size={12} />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
