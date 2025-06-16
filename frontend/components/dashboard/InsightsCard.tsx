import React from "react";
import { Button } from "@/components/ui/button";
import AiAssistantModal from "./AiAssistantModal";
import { HelpCircle } from "lucide-react"; // Icon for "advice"/insights

const aiInsights = [
  "Take a 15-minute break – you've been studying for 2 hours",
  "Review Chemistry basics before tomorrow's lab",
  "Your Physics performance improved 20% this week!"
];

const InsightsCard = ({ onAsk }: { onAsk: () => void }) => (
  <div className="relative rounded-3xl bg-gradient-to-br from-yellow-100/90 to-pink-100/90 border border-yellow-200/50 px-7 py-6 shadow-lg animate-fade-in">
    <div className="flex items-center gap-2 mb-3">
      <span className="font-bold text-lg">AI Insights</span>
      <HelpCircle className="text-yellow-500" size={21} strokeWidth={2.1} />
    </div>
    <div className="space-y-3 mb-4">
      {aiInsights.map((msg, i) => (
        <div key={i} className="bg-yellow-50/70 px-4 py-2.5 rounded text-xs text-yellow-900 border border-yellow-200 animate-fade-in">{msg}</div>
      ))}
    </div>
    <Button
      variant="ghost"
      className="rounded-lg w-full text-xs font-bold hover:bg-yellow-200/60 mt-1 transition"
      onClick={onAsk}
    >
      <span className="material-symbols-outlined mr-2 text-yellow-700">smart_toy</span>
      Ask for Advice
    </Button>
  </div>
);

export default InsightsCard;
