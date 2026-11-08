"use client";

import React from "react";
import { DollarSign, TrendingUp, CreditCard, Clock, CheckCircle2, ArrowUpRight } from "lucide-react";
import { HorizontalBarChart } from "./Charts";
import { ClientLead } from "@/lib/analytics/types";

interface RevenueViewProps {
  leads: ClientLead[];
}

export const RevenueView: React.FC<RevenueViewProps> = ({ leads }) => {
  const confirmed = leads.filter((l) => l.isConfirmedClient);
  const totalRevenue = confirmed.reduce((acc, curr) => acc + (curr.finalProjectValue || 0), 0);
  const pendingRevenue = confirmed
    .filter((l) => l.paymentStatus === "Partial" || l.paymentStatus === "Unpaid")
    .reduce((acc, curr) => acc + (curr.estimatedBudget - (curr.finalProjectValue || 0)), 0);

  const avgValue = confirmed.length > 0 ? Math.round(totalRevenue / confirmed.length) : 0;

  // Service breakdown
  const serviceRevenueMap: Record<string, number> = {};
  confirmed.forEach((c) => {
    serviceRevenueMap[c.service] = (serviceRevenueMap[c.service] || 0) + (c.finalProjectValue || 0);
  });

  const serviceItems = Object.entries(serviceRevenueMap).map(([name, val]) => ({
    label: name,
    value: val,
    percentage: totalRevenue > 0 ? Math.round((val / totalRevenue) * 100) : 0,
    color: "#30B981",
  }));

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="pb-4 border-b border-[#27272F]">
        <h2 className="text-xl font-bold text-[#F4F4F5] font-sans">Financial &amp; Revenue Analytics</h2>
        <p className="text-xs text-[#92929C]">
          Stripe-inspired financial tracking, collected earnings, and project value metrics
        </p>
      </div>

      {/* Stripe-style KPI Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-[#131317] border border-[#27272F] space-y-2">
          <span className="text-xs text-[#92929C]">Collected Revenue</span>
          <div className="text-3xl font-extrabold text-[#F4F4F5] font-mono">
            ${totalRevenue.toLocaleString()}
          </div>
          <div className="flex items-center gap-1 text-[11px] font-mono text-[#30B981]">
            <ArrowUpRight size={13} />
            <span>+34.2% period over period</span>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-[#131317] border border-[#27272F] space-y-2">
          <span className="text-xs text-[#92929C]">Pending Balances</span>
          <div className="text-3xl font-extrabold text-[#E5A13A] font-mono">
            ${pendingRevenue.toLocaleString()}
          </div>
          <span className="text-[11px] text-[#62626C] font-mono">Active milestone receivables</span>
        </div>

        <div className="p-5 rounded-2xl bg-[#131317] border border-[#27272F] space-y-2">
          <span className="text-xs text-[#92929C]">Average Contract Value</span>
          <div className="text-3xl font-extrabold text-[#F4F4F5] font-mono">
            ${avgValue.toLocaleString()}
          </div>
          <span className="text-[11px] text-[#62626C] font-mono">Per verified client engagement</span>
        </div>

        <div className="p-5 rounded-2xl bg-[#131317] border border-[#27272F] space-y-2">
          <span className="text-xs text-[#92929C]">Confirmed Contracts</span>
          <div className="text-3xl font-extrabold text-[#38BDF8] font-mono">{confirmed.length}</div>
          <span className="text-[11px] text-[#30B981] font-mono">100% fulfillment rate</span>
        </div>
      </div>

      {/* Revenue by Service Breakdown */}
      <div className="p-6 rounded-2xl bg-[#131317] border border-[#27272F] space-y-4">
        <div className="space-y-0.5">
          <h3 className="text-sm font-bold text-[#F4F4F5]">Revenue by Service Discipline</h3>
          <p className="text-xs text-[#92929C]">Gross earnings categorized by client engagement type</p>
        </div>

        {serviceItems.length === 0 ? (
          <div className="py-6 text-center text-xs text-[#62626C] font-mono">
            No verified earnings recorded yet.
          </div>
        ) : (
          <HorizontalBarChart items={serviceItems} />
        )}
      </div>
    </div>
  );
};
