"use client";

import React, { useState } from "react";
import {
  Users,
  Plus,
  Search,
  Filter,
  Kanban,
  Table as TableIcon,
  X,
  Check,
  Calendar,
  DollarSign,
  Clock,
  Sparkles,
  ArrowRight,
  Trash2,
} from "lucide-react";
import { ClientLead, LeadStatus } from "@/lib/analytics/types";

interface CrmViewProps {
  leads: ClientLead[];
  onSaveLead: (lead: ClientLead) => void;
  onCreateLead: (lead: any) => void;
  onDeleteLead: (id: string) => void;
}

const ALL_STATUSES: LeadStatus[] = [
  "New Inquiry",
  "Contacted",
  "Negotiating",
  "Proposal Sent",
  "Awaiting Response",
  "Accepted",
  "Completed",
  "Rejected",
];

export const CrmView: React.FC<CrmViewProps> = ({
  leads,
  onSaveLead,
  onCreateLead,
  onDeleteLead,
}) => {
  const [viewMode, setViewMode] = useState<"table" | "kanban">("table");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [selectedLead, setSelectedLead] = useState<ClientLead | null>(null);
  const [isNewLeadModalOpen, setIsNewLeadModalOpen] = useState(false);

  // New Lead Form state
  const [newForm, setNewForm] = useState({
    clientName: "",
    email: "",
    contactMethod: "WhatsApp" as any,
    handleOrPhone: "",
    service: "AI Filmmaking & Direction",
    projectDescription: "",
    estimatedBudget: 800,
    currency: "USD",
    source: "Direct Inbound",
    status: "New Inquiry" as LeadStatus,
    notes: "",
    followUpDate: "",
    isConfirmedClient: false,
    paymentStatus: "Unpaid" as any,
    finalProjectValue: 0,
    timeline: [],
  });

  const filtered = leads.filter((l) => {
    const matchStatus = statusFilter === "All" || l.status === statusFilter;
    const matchSearch =
      l.clientName.toLowerCase().includes(search.toLowerCase()) ||
      l.service.toLowerCase().includes(search.toLowerCase()) ||
      l.projectDescription.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchSearch;
  });

  const getStatusBadge = (status: LeadStatus) => {
    switch (status) {
      case "Completed":
        return "bg-[#30B981]/20 text-[#30B981] border-[#30B981]/40";
      case "Accepted":
        return "bg-[#38BDF8]/20 text-[#38BDF8] border-[#38BDF8]/40";
      case "Negotiating":
      case "Proposal Sent":
        return "bg-[#E5A13A]/20 text-[#E5A13A] border-[#E5A13A]/40";
      case "Rejected":
        return "bg-[#62626C]/20 text-[#92929C] border-[#62626C]/40";
      default:
        return "bg-[#E5484D]/20 text-[#E5484D] border-[#E5484D]/40";
    }
  };

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newForm.clientName) return;

    onCreateLead({
      ...newForm,
      timeline: [
        {
          timestamp: Date.now(),
          title: "Lead Created",
          description: "Manually registered in CRM",
        },
      ],
    });

    setIsNewLeadModalOpen(false);
    setNewForm({
      clientName: "",
      email: "",
      contactMethod: "WhatsApp",
      handleOrPhone: "",
      service: "AI Filmmaking & Direction",
      projectDescription: "",
      estimatedBudget: 800,
      currency: "USD",
      source: "Direct Inbound",
      status: "New Inquiry",
      notes: "",
      followUpDate: "",
      isConfirmedClient: false,
      paymentStatus: "Unpaid",
      finalProjectValue: 0,
      timeline: [],
    });
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#27272F]">
        <div>
          <h2 className="text-xl font-bold text-[#F4F4F5] font-sans">Client CRM Workspace</h2>
          <p className="text-xs text-[#92929C]">
            Manage client pipelines, proposals, confirmations, and contract milestones
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* View toggle */}
          <div className="flex items-center bg-[#131317] border border-[#27272F] rounded-lg p-0.5 text-xs font-mono">
            <button
              onClick={() => setViewMode("table")}
              className={`p-1.5 rounded-md ${
                viewMode === "table" ? "bg-[#19191F] text-[#F4F4F5]" : "text-[#92929C]"
              }`}
            >
              <TableIcon size={14} />
            </button>
            <button
              onClick={() => setViewMode("kanban")}
              className={`p-1.5 rounded-md ${
                viewMode === "kanban" ? "bg-[#19191F] text-[#F4F4F5]" : "text-[#92929C]"
              }`}
            >
              <Kanban size={14} />
            </button>
          </div>

          {/* Add lead button */}
          <button
            onClick={() => setIsNewLeadModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#E5484D] hover:bg-[#d63b40] text-white text-xs font-medium transition-colors shadow-sm"
          >
            <Plus size={14} />
            <span>Add Lead</span>
          </button>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-72">
          <Search
            size={13}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-[#62626C] pointer-events-none"
          />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search leads..."
            className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-[#131317] border border-[#27272F] text-xs text-[#F4F4F5] placeholder-[#62626C] focus:outline-none focus:border-[#E5484D]"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          <button
            onClick={() => setStatusFilter("All")}
            className={`px-2.5 py-1 rounded-lg text-xs font-mono transition-all shrink-0 ${
              statusFilter === "All"
                ? "bg-[#19191F] text-[#F4F4F5] border border-[#27272F]"
                : "text-[#92929C] hover:text-[#F4F4F5]"
            }`}
          >
            All
          </button>
          {ALL_STATUSES.slice(0, 5).map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-2.5 py-1 rounded-lg text-xs font-mono transition-all shrink-0 ${
                statusFilter === s
                  ? "bg-[#19191F] text-[#F4F4F5] border border-[#27272F]"
                  : "text-[#92929C] hover:text-[#F4F4F5]"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* TABLE VIEW */}
      {viewMode === "table" && (
        <div className="p-6 rounded-2xl bg-[#131317] border border-[#27272F] overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-[#27272F] text-[10px] font-mono uppercase tracking-wider text-[#62626C]">
                <th className="py-2.5 px-3">Client</th>
                <th className="py-2.5 px-3">Service</th>
                <th className="py-2.5 px-3">Budget</th>
                <th className="py-2.5 px-3">Channel</th>
                <th className="py-2.5 px-3">Status</th>
                <th className="py-2.5 px-3">Verified</th>
                <th className="py-2.5 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#27272F]/50">
              {filtered.map((lead) => (
                <tr
                  key={lead.id}
                  onClick={() => setSelectedLead(lead)}
                  className="hover:bg-[#19191F]/60 transition-colors cursor-pointer"
                >
                  <td className="py-3 px-3">
                    <div className="font-bold text-[#F4F4F5]">{lead.clientName}</div>
                    <div className="text-[11px] text-[#92929C] font-mono truncate max-w-[200px]">
                      {lead.projectDescription}
                    </div>
                  </td>
                  <td className="py-3 px-3 text-[#CBD5E1]">{lead.service}</td>
                  <td className="py-3 px-3 font-mono font-semibold text-[#F4F4F5]">
                    ${lead.estimatedBudget}
                  </td>
                  <td className="py-3 px-3 font-mono text-[#92929C]">{lead.contactMethod}</td>
                  <td className="py-3 px-3">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-mono border font-semibold ${getStatusBadge(
                        lead.status
                      )}`}
                    >
                      {lead.status}
                    </span>
                  </td>
                  <td className="py-3 px-3">
                    {lead.isConfirmedClient ? (
                      <span className="inline-flex items-center gap-1 text-[11px] font-mono text-[#30B981]">
                        <Check size={12} />
                        Confirmed
                      </span>
                    ) : (
                      <span className="text-[11px] font-mono text-[#62626C]">Prospect</span>
                    )}
                  </td>
                  <td className="py-3 px-3 text-right font-mono">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedLead(lead);
                      }}
                      className="px-2.5 py-1 rounded bg-[#19191F] hover:bg-[#202028] text-xs text-[#CBD5E1]"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* KANBAN VIEW */}
      {viewMode === "kanban" && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 overflow-x-auto pb-4">
          {["New Inquiry", "Negotiating", "Accepted", "Completed"].map((col) => {
            const colLeads = filtered.filter((l) => l.status === col);

            return (
              <div
                key={col}
                className="p-4 rounded-2xl bg-[#131317] border border-[#27272F] space-y-3 min-w-[250px]"
              >
                <div className="flex items-center justify-between pb-2 border-b border-[#27272F]">
                  <span className="text-xs font-bold text-[#F4F4F5]">{col}</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#19191F] text-[#92929C]">
                    {colLeads.length}
                  </span>
                </div>

                <div className="space-y-3">
                  {colLeads.map((lead) => (
                    <div
                      key={lead.id}
                      onClick={() => setSelectedLead(lead)}
                      className="p-3.5 rounded-xl bg-[#19191F] border border-[#27272F] hover:border-[#E5484D]/40 cursor-pointer space-y-2 transition-all shadow-sm"
                    >
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-[#F4F4F5]">{lead.clientName}</span>
                        <span className="text-xs font-mono font-semibold text-[#30B981]">
                          ${lead.estimatedBudget}
                        </span>
                      </div>
                      <p className="text-[11px] text-[#92929C] line-clamp-2">
                        {lead.projectDescription}
                      </p>
                      <div className="text-[10px] font-mono text-[#62626C] pt-1 border-t border-[#27272F]">
                        {lead.service}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* CLIENT DETAIL DRAWER / MODAL */}
      {selectedLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-end bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-lg h-full bg-[#131317] border-l border-[#27272F] p-6 overflow-y-auto space-y-6 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-[#27272F]">
              <div>
                <h3 className="text-lg font-bold text-[#F4F4F5]">{selectedLead.clientName}</h3>
                <span className="text-xs font-mono text-[#92929C]">{selectedLead.service}</span>
              </div>
              <button
                onClick={() => setSelectedLead(null)}
                className="p-2 rounded-lg text-[#92929C] hover:text-[#F4F4F5] hover:bg-[#19191F]"
              >
                <X size={16} />
              </button>
            </div>

            {/* Status & Confirmation Controls */}
            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-mono text-[#92929C] uppercase">Pipeline Status</label>
                <select
                  value={selectedLead.status}
                  onChange={(e) => {
                    const next = { ...selectedLead, status: e.target.value as LeadStatus };
                    setSelectedLead(next);
                    onSaveLead(next);
                  }}
                  className="w-full p-2.5 rounded-xl bg-[#09090B] border border-[#27272F] text-xs text-[#F4F4F5] focus:outline-none"
                >
                  {ALL_STATUSES.map((s) => (
                    <option key={s} value={s} className="bg-[#131317]">
                      {s}
                    </option>
                  ))}
                </select>
              </div>

              {/* Verified Client Toggle */}
              <div className="p-4 rounded-xl bg-[#09090B] border border-[#27272F] flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-[#F4F4F5]">Official Confirmed Client</div>
                  <div className="text-[11px] text-[#92929C]">
                    Count toward verified revenue &amp; client conversion statistics
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={selectedLead.isConfirmedClient}
                  onChange={(e) => {
                    const next = {
                      ...selectedLead,
                      isConfirmedClient: e.target.checked,
                      finalProjectValue: e.target.checked ? selectedLead.estimatedBudget : 0,
                    };
                    setSelectedLead(next);
                    onSaveLead(next);
                  }}
                  className="w-4 h-4 accent-[#E5484D] rounded cursor-pointer"
                />
              </div>

              {/* Final Revenue Value */}
              {selectedLead.isConfirmedClient && (
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-[#92929C] uppercase">
                    Verified Project Value ($ USD)
                  </label>
                  <input
                    type="number"
                    value={selectedLead.finalProjectValue}
                    onChange={(e) => {
                      const next = {
                        ...selectedLead,
                        finalProjectValue: Number(e.target.value),
                      };
                      setSelectedLead(next);
                      onSaveLead(next);
                    }}
                    className="w-full p-2.5 rounded-xl bg-[#09090B] border border-[#27272F] text-xs text-[#F4F4F5] font-mono"
                  />
                </div>
              )}

              {/* Notes */}
              <div className="space-y-1.5">
                <label className="text-xs font-mono text-[#92929C] uppercase">Internal Notes</label>
                <textarea
                  rows={4}
                  value={selectedLead.notes}
                  onChange={(e) => {
                    const next = { ...selectedLead, notes: e.target.value };
                    setSelectedLead(next);
                    onSaveLead(next);
                  }}
                  className="w-full p-3 rounded-xl bg-[#09090B] border border-[#27272F] text-xs text-[#CBD5E1] focus:outline-none"
                  placeholder="Client requirements, delivery notes, feedback..."
                />
              </div>

              {/* Timeline */}
              <div className="space-y-2 pt-2 border-t border-[#27272F]">
                <span className="text-xs font-mono text-[#92929C] uppercase">Lead Milestones</span>
                <div className="space-y-2">
                  {selectedLead.timeline?.map((t, idx) => (
                    <div key={idx} className="p-2.5 rounded-lg bg-[#09090B] text-xs font-mono">
                      <div className="text-[#F4F4F5] font-semibold">{t.title}</div>
                      <div className="text-[11px] text-[#92929C]">{t.description}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 flex items-center justify-between">
                <button
                  onClick={() => {
                    if (confirm("Are you sure you want to delete this lead?")) {
                      onDeleteLead(selectedLead.id);
                      setSelectedLead(null);
                    }
                  }}
                  className="flex items-center gap-1.5 text-xs text-[#E5484D] hover:underline"
                >
                  <Trash2 size={13} />
                  <span>Delete Lead</span>
                </button>

                <button
                  onClick={() => setSelectedLead(null)}
                  className="px-4 py-2 rounded-xl bg-[#19191F] hover:bg-[#202028] text-xs text-[#F4F4F5]"
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CREATE NEW LEAD MODAL */}
      {isNewLeadModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="w-full max-w-md p-6 rounded-2xl bg-[#131317] border border-[#27272F] space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-[#27272F]">
              <h3 className="text-base font-bold text-[#F4F4F5]">Add New Client Lead</h3>
              <button
                onClick={() => setIsNewLeadModalOpen(false)}
                className="p-1.5 rounded-lg text-[#92929C] hover:text-[#F4F4F5]"
              >
                <X size={15} />
              </button>
            </div>

            <form onSubmit={handleCreateSubmit} className="space-y-3">
              <div>
                <label className="text-[11px] font-mono text-[#92929C] uppercase">Client Name</label>
                <input
                  type="text"
                  required
                  value={newForm.clientName}
                  onChange={(e) => setNewForm({ ...newForm, clientName: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-[#09090B] border border-[#27272F] text-xs text-[#F4F4F5] mt-1"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-mono text-[#92929C] uppercase">Contact Channel</label>
                  <select
                    value={newForm.contactMethod}
                    onChange={(e) => setNewForm({ ...newForm, contactMethod: e.target.value as any })}
                    className="w-full p-2.5 rounded-xl bg-[#09090B] border border-[#27272F] text-xs text-[#F4F4F5] mt-1"
                  >
                    <option value="WhatsApp">WhatsApp</option>
                    <option value="Discord">Discord</option>
                    <option value="Instagram">Instagram</option>
                    <option value="Email">Email</option>
                  </select>
                </div>

                <div>
                  <label className="text-[11px] font-mono text-[#92929C] uppercase">Estimated Budget ($)</label>
                  <input
                    type="number"
                    value={newForm.estimatedBudget}
                    onChange={(e) => setNewForm({ ...newForm, estimatedBudget: Number(e.target.value) })}
                    className="w-full p-2.5 rounded-xl bg-[#09090B] border border-[#27272F] text-xs text-[#F4F4F5] mt-1 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-mono text-[#92929C] uppercase">Service Requested</label>
                <select
                  value={newForm.service}
                  onChange={(e) => setNewForm({ ...newForm, service: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-[#09090B] border border-[#27272F] text-xs text-[#F4F4F5] mt-1"
                >
                  <option value="AI Filmmaking & Direction">AI Filmmaking &amp; Direction</option>
                  <option value="Video Editing & Post-Production">Video Editing &amp; Post-Production</option>
                  <option value="Web Engineering & Automation">Web Engineering &amp; Automation</option>
                </select>
              </div>

              <div>
                <label className="text-[11px] font-mono text-[#92929C] uppercase">Project Scope / Details</label>
                <textarea
                  rows={3}
                  value={newForm.projectDescription}
                  onChange={(e) => setNewForm({ ...newForm, projectDescription: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-[#09090B] border border-[#27272F] text-xs text-[#F4F4F5] mt-1"
                  placeholder="Brief description of the inquiry..."
                />
              </div>

              <div className="pt-3 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsNewLeadModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-[#19191F] text-xs text-[#92929C]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-[#E5484D] hover:bg-[#d63b40] text-xs text-white font-medium shadow-md"
                >
                  Save Lead
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
