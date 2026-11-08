"use client";

import React from "react";
import { FileSpreadsheet, Download, Printer, CheckCircle, Sparkles } from "lucide-react";
import { exportToCsv, getStoredSessions } from "@/lib/analytics/storage";
import { ClientLead, FunnelStage } from "@/lib/analytics/types";
import { SEED_PROJECTS, generateSeedDailyStats } from "@/lib/analytics/mockSeed";

interface ReportsViewProps {
  leads: ClientLead[];
  funnelStages: FunnelStage[];
}

export const ReportsView: React.FC<ReportsViewProps> = ({ leads, funnelStages }) => {
  const handleExportVisitors = () => {
    const daily = generateSeedDailyStats();
    exportToCsv("portfolio_daily_traffic", daily);
  };

  const handleExportLeads = () => {
    const flatLeads = leads.map((l) => ({
      ClientName: l.clientName,
      ContactMethod: l.contactMethod,
      HandleOrPhone: l.handleOrPhone || "",
      Service: l.service,
      EstimatedBudget: l.estimatedBudget,
      Status: l.status,
      ConfirmedClient: l.isConfirmedClient ? "Yes" : "No",
      PaymentStatus: l.paymentStatus,
      VerifiedRevenue: l.finalProjectValue,
      CreatedAt: new Date(l.createdAt).toISOString(),
    }));
    exportToCsv("client_crm_leads", flatLeads);
  };

  const handleExportProjects = () => {
    exportToCsv("projects_performance", SEED_PROJECTS);
  };

  const handleExportFunnel = () => {
    exportToCsv("conversion_funnel", funnelStages);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#27272F]">
        <div>
          <h2 className="text-xl font-bold text-[#F4F4F5] font-sans">Reports &amp; Data Exports</h2>
          <p className="text-xs text-[#92929C]">
            Export raw and aggregated analytics in CSV format or generate clean printable dossiers
          </p>
        </div>

        <button
          onClick={() => window.print()}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#19191F] hover:bg-[#202028] border border-[#27272F] text-xs font-mono text-[#F4F4F5] transition-colors"
        >
          <Printer size={13} />
          <span>Print Executive Summary</span>
        </button>
      </div>

      {/* Export Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl bg-[#131317] border border-[#27272F] space-y-4 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-xl bg-[#19191F] border border-[#27272F] flex items-center justify-center text-[#E5484D]">
              <FileSpreadsheet size={18} />
            </div>
            <h3 className="text-base font-bold text-[#F4F4F5]">Visitor &amp; Traffic Dataset</h3>
            <p className="text-xs text-[#92929C] leading-relaxed">
              Export daily sessions, unique visitor totals, pageviews, and bounce metrics over the last 30 days.
            </p>
          </div>

          <button
            onClick={handleExportVisitors}
            className="w-full py-2.5 px-4 rounded-xl bg-[#19191F] hover:bg-[#202028] border border-[#27272F] text-xs font-mono text-[#F4F4F5] transition-all flex items-center justify-center gap-2"
          >
            <Download size={13} />
            <span>Export Traffic CSV</span>
          </button>
        </div>

        <div className="p-6 rounded-2xl bg-[#131317] border border-[#27272F] space-y-4 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-xl bg-[#19191F] border border-[#27272F] flex items-center justify-center text-[#30B981]">
              <FileSpreadsheet size={18} />
            </div>
            <h3 className="text-base font-bold text-[#F4F4F5]">Client CRM &amp; Revenue Dossier</h3>
            <p className="text-xs text-[#92929C] leading-relaxed">
              Export all inbound leads, requested services, budgets, verified contract values, and payment statuses.
            </p>
          </div>

          <button
            onClick={handleExportLeads}
            className="w-full py-2.5 px-4 rounded-xl bg-[#19191F] hover:bg-[#202028] border border-[#27272F] text-xs font-mono text-[#F4F4F5] transition-all flex items-center justify-center gap-2"
          >
            <Download size={13} />
            <span>Export CRM Leads CSV</span>
          </button>
        </div>

        <div className="p-6 rounded-2xl bg-[#131317] border border-[#27272F] space-y-4 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-xl bg-[#19191F] border border-[#27272F] flex items-center justify-center text-[#38BDF8]">
              <FileSpreadsheet size={18} />
            </div>
            <h3 className="text-base font-bold text-[#F4F4F5]">Project Performance Metrics</h3>
            <p className="text-xs text-[#92929C] leading-relaxed">
              Export project views, dwell times, repository visits, external click rates, and inquiry conversion rates.
            </p>
          </div>

          <button
            onClick={handleExportProjects}
            className="w-full py-2.5 px-4 rounded-xl bg-[#19191F] hover:bg-[#202028] border border-[#27272F] text-xs font-mono text-[#F4F4F5] transition-all flex items-center justify-center gap-2"
          >
            <Download size={13} />
            <span>Export Projects CSV</span>
          </button>
        </div>

        <div className="p-6 rounded-2xl bg-[#131317] border border-[#27272F] space-y-4 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-xl bg-[#19191F] border border-[#27272F] flex items-center justify-center text-[#E5A13A]">
              <FileSpreadsheet size={18} />
            </div>
            <h3 className="text-base font-bold text-[#F4F4F5]">Funnel Conversion Telemetry</h3>
            <p className="text-xs text-[#92929C] leading-relaxed">
              Export multi-step conversion stages, step retention percentages, and drop-off calculations.
            </p>
          </div>

          <button
            onClick={handleExportFunnel}
            className="w-full py-2.5 px-4 rounded-xl bg-[#19191F] hover:bg-[#202028] border border-[#27272F] text-xs font-mono text-[#F4F4F5] transition-all flex items-center justify-center gap-2"
          >
            <Download size={13} />
            <span>Export Funnel CSV</span>
          </button>
        </div>
      </div>
    </div>
  );
};
