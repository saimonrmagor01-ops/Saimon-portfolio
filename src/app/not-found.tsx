import React from "react";
import Link from "next/link";
import { ArrowLeft, Compass } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#050505] text-[#f4f4f1] px-6 relative overflow-hidden editorial-grid">
      <div className="relative z-10 max-w-md w-full text-center space-y-6 p-8 rounded-3xl border border-white/10 bg-[#0b0b0f] shadow-2xl">
        <div className="inline-flex p-3 rounded-2xl bg-white/[0.04] border border-white/10 text-[#9fbdff]">
          <Compass size={28} />
        </div>

        <div className="space-y-2">
          <div className="text-xs font-mono text-[#777777] uppercase tracking-widest">
            ERROR 404
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-white">
            Scene Not Found
          </h1>
          <p className="text-xs sm:text-sm text-[#8e8e93] leading-relaxed">
            The page or asset you are attempting to access does not exist or has been relocated in the portfolio archive.
          </p>
        </div>

        <div className="pt-2">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black text-xs font-semibold uppercase tracking-wider hover:bg-[#9fbdff] transition-colors"
          >
            <ArrowLeft size={14} />
            <span>Return to Portfolio</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
