"use client";

import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, ShieldCheck, Sparkles, X } from "lucide-react";

export function TopDevBanner() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <aside
      aria-label="Interactive Prototype Status"
      className="w-full bg-[#151c18] border-b border-[#25382c] text-[11px] text-stone-300 py-1.5 px-3 md:px-6 transition-all"
    >
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="font-mono text-emerald-400 font-semibold tracking-wider uppercase text-[10px]">
            Interactive UI Prototype
          </span>
          <span className="text-stone-500 hidden sm:inline">|</span>
          <span className="text-stone-400 hidden sm:inline font-mono">
            Title Tag: <span className="text-stone-200">BookNook | Home</span>
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Badge
            variant="outline"
            className="h-5 px-2 bg-emerald-950/60 border-emerald-700/50 text-emerald-300 text-[10px] gap-1 font-mono hover:bg-emerald-900/60"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            State: Logged in (Ariana)
          </Badge>

          <span className="hidden md:inline-flex items-center gap-1.5 text-stone-400 font-mono text-[10px]">
            <ShieldCheck className="w-3 h-3 text-emerald-400" />
            JWT Verified
          </span>

          <span className="hidden lg:inline-flex items-center gap-1 text-amber-300 bg-amber-950/60 border border-amber-800/40 px-2 py-0.5 rounded text-[10px] font-mono">
            <Sparkles className="w-2.5 h-2.5" />
            UI Spec & Architecture
          </span>

          <button
            onClick={() => setIsVisible(false)}
            aria-label="Dismiss prototype banner"
            className="text-stone-400 hover:text-stone-200 p-0.5 rounded hover:bg-stone-800 transition"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </aside>
  );
}
