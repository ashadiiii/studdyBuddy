import React from "react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Book } from "lucide-react";

const ResourcesCard = () => (
  <div className="rounded-3xl bg-gradient-to-r from-green-50 via-white to-blue-50 px-7 py-6 border border-green-100/60 shadow-lg">
    <div className="flex items-center gap-2 mb-3">
      <span className="font-bold text-lg">Resources</span>
      <Book className="text-green-400" size={21} strokeWidth={2.1} />
    </div>
    <div className="flex flex-col gap-2 mb-4 text-xs">
      <div className="flex items-center justify-between gap-4 bg-white/90 p-3 rounded-lg">
        <div>
          <div className="font-bold">Khan Academy: Calculus</div>
          <div className="text-xs text-muted-foreground">65% complete</div>
        </div>
        <div className="flex items-center gap-2">
          <Progress value={65} className="h-2 w-14" />
          <span className="ml-2 text-xs text-primary">{`65%`}</span>
        </div>
      </div>
      <div className="flex items-center justify-between gap-4 bg-white/90 p-3 rounded-lg">
        <div>
          <div className="font-bold">Coursera: Organic Chemistry</div>
          <div className="text-xs text-muted-foreground">30% complete</div>
        </div>
        <div className="flex items-center gap-2">
          <Progress value={30} className="h-2 w-14" />
          <span className="ml-2 text-xs text-primary">{`30%`}</span>
        </div>
      </div>
    </div>
    <Button variant="secondary" size="sm" className="w-full rounded-lg text-xs hover:scale-105 transition-transform">Browse All Courses</Button>
  </div>
);

export default ResourcesCard;
