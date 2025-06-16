
import { ThemeToggle } from "../../../components/ThemeToggle";
import React from "react";
const Reminders = () => (
  <div className="p-8">
    <div className="flex justify-between items-center mb-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">🔔 Smart Reminders & Focus Nudges</h2>
        <p className="text-muted-foreground">Get reminders and motivation.<br />Feature coming soon.</p>
      </div>
      <ThemeToggle />
    </div>
  </div>
);

export default Reminders;