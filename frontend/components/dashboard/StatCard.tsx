
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface StatCardProps {
  title: string;
  value: string;
  sub?: React.ReactNode;
  progress?: number;
  icon?: React.ReactNode;
}

export default function StatCard({ title, value, sub, progress, icon }: StatCardProps) {
  return (
    <Card className="w-full shadow-none border bg-white rounded-xl min-w-[200px] mx-0 my-3">
      <CardContent className="flex flex-col gap-4 p-7">
        <div className="flex justify-between items-center gap-3">
          <div className="font-medium text-slate-500 text-xs flex gap-2 items-center">
            {icon}
            {title}
          </div>
        </div>
        <div className="text-3xl font-bold">{value}</div>
        {sub && <span className="text-xs text-muted-foreground leading-snug mt-2">{sub}</span>}
        {typeof progress === "number" && (
          <div className="flex items-center gap-4 mt-3">
            <Progress value={progress} className="h-2" />
            <span className="text-xs font-semibold">{progress}%</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
