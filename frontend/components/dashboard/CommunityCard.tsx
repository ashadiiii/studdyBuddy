import React from "react";
import { Button } from "@/components/ui/button";
import { Users } from "lucide-react";

const CommunityCard = () => (
  <div className="rounded-3xl bg-gradient-to-tr from-slate-100 via-white to-blue-100 px-7 py-6 border border-gray-200/70 shadow-lg">
    <div className="flex items-center gap-2 mb-3">
      <span className="font-bold text-lg">Community</span>
      <Users className="text-blue-400" size={21} strokeWidth={2.1} />
    </div>
    <div className="flex flex-col gap-3 text-xs mb-3">
      <div className="p-3 rounded bg-white/80 hover:bg-slate-100/60 transition-colors font-semibold cursor-pointer">🏆 Study Tips: Active Recall</div>
      <div className="p-3 rounded bg-white/80 hover:bg-slate-100/60 transition-colors font-semibold cursor-pointer">🧪 My Chemistry Journey</div>
    </div>
    <Button variant="secondary" size="sm" className="w-full rounded-lg text-xs hover:scale-105 transition-transform">Join the Group</Button>
  </div>
);

export default CommunityCard;
