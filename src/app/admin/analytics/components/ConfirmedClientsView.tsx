"use client";

import React from "react";
import { Award, ShieldCheck, CheckCircle2, Clock, DollarSign, Briefcase } from "lucide-react";
import { ClientLead } from "@/lib/analytics/types";

interface ConfirmedClientsViewProps {
  leads: ClientLead[];
}

export const ConfirmedClientsView: React.FC<ConfirmedClientsViewProps> = ({ leads }) => {
  const confirmed = leads.filter((l) => l.isConfirmedClient);
  const activeProjects = confirmed.filter((l) => l.status === "Accepted");
  const completedProjects = confirmed.filter((l) => l.status === "Completed");

  const totalVerifiedRevenue = confirmed.reduce((acc, curr) => acc + (curr.finalProjectValue || 0), 0);
  const totalPending = confirmed
    .filter((l) => l.paymentStatus === "Partial" || l.paymentStatus === "Unpaid")
    .reduce((acc, curr) => acc + (curr.estimatedBudget - (curr.finalProjectValue || 0)), 0);

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#27272F]">
        <div>
          <h2 className="text-xl font-bold text-[#F4F4F5] font-sans">Verified Client Contracts</h2>
          <p className="text-xs text-[#92929C]">
            Verified client engagements, contracts, and revenue fulfillment
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-[#30B981] bg-[#30B981]/10 px-3 py-1.5 rounded-lg border border-[#30B981]/30">
          <ShieldCheck size={14} />
          <span>Strict Client Verification Active</span>
        </div>
      </div>

      {/* Statistics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-[#131317] border border-[#27272F] space-y-1">
          <span className="text-xs text-[#92929C]">Confirmed Clients</span>
          <div className="text-2xl font-bold text-[#F4F4F5] font-mono">{confirmed.length}</div>
          <span className="text-[10px] text-[#62626C] font-mono">100% verified contracts</span>
        </div>

        <div className="p-5 rounded-2xl bg-[#131317] border border-[#27272F] space-y-1">
          <span className="text-xs text-[#92929C]">Active Works</span>
          <div className="text-2xl font-bold text-[#38BDF8] font-mono">{activeProjects.length}</div>
          <span className="text-[10px] text-[#62626C] font-mono">Currently in production</span>
        </div>

        <div className="p-5 rounded-2xl bg-[#131317] border border-[#27272F] space-y-1">
          <span className="text-xs text-[#92929C]">Completed Works</span>
          <div className="text-2xl font-bold text-[#30B981] font-mono">{completedProjects.length}</div>
          <span className="text-[10px] text-[#62626C] font-mono">Delivered &amp; approved</span>
        </div>

        <div className="p-5 rounded-2xl bg-[#131317] border border-[#27272F] space-y-1">
          <span className="text-xs text-[#92929C]">Verified Revenue</span>
          <div className="text-2xl font-bold text-[#30B981] font-mono">
            ${totalVerifiedRevenue.toLocaleString()}
          </div>
          <span className="text-[10px] text-[#E5A13A] font-mono">
            +${totalPending.toLocaleString()} pending
          </span>
        </div>
      </div>

      {/* Confirmed Clients List */}
      <div className="p-6 rounded-2xl bg-[#131317] border border-[#27272F] space-y-4">
        <div className="space-y-0.5">
          <h3 className="text-sm font-bold text-[#F4F4F5]">Active &amp; Historical Contracts</h3>
          <p className="text-xs text-[#92929C]">Verified engagements with recorded contract values</p>
        </div>

        <div className="space-y-3">
          {confirmed.length === 0 ? (
            <div className="py-8 text-center text-xs text-[#62626C] font-mono">
              No confirmed clients marked yet. You can mark leads as confirmed in the Client CRM.
            </div>
          ) : (
            confirmed.map((c) => (
              <div
                key={c.id}
                className="p-4 rounded-xl bg-[#19191F] border border-[#27272F] flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#09090B] border border-[#27272F] flex items-center justify-center text-[#30B981]">
                    <CheckCircle2 size={16} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#F4F4F5]">{c.clientName}</h4>
                    <div className="text-[11px] font-mono text-[#92929C]">{c.service}</div>
                  </div>
                </div>

                <div className="flex items-center gap-6 font-mono text-xs">
                  <div>
                    <span className="text-[10px] text-[#62626C] block uppercase">Contract Value</span>
                    <span className="text-sm font-bold text-[#30B981]">${c.finalProjectValue}</span>
                  </div>

                  <div>
                    <span className="text-[10px] text-[#62626C] block uppercase">Payment</span>
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] border ${
                        c.paymentStatus === "Paid in Full"
                          ? "bg-[#30B981]/20 text-[#30B981] border-[#30B981]/30"
                          : "bg-[#E5A13A]/20 text-[#E5A13A] border-[#E5A13A]/30"
                      }`}
                    >
                      {c.paymentStatus}
                    </span>
                  </div>

                  <div>
                    <span className="text-[10px] text-[#62626C] block uppercase">Delivery</span>
                    <span className="text-[#F4F4F5]">{c.status}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
