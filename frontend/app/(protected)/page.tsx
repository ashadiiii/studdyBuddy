import * as React from "react";
import Dashboard from "../../components/dashboard/Dashboard";
import Sidebar from "../../components/Sidebar"; // Import the Sidebar component

const Index = () => {
  return (
<div style={{ display: "flex" }}>
  <Sidebar />
  <main className="flex-1 ml-[220px]"> {/* Added ml-[220px] here */}
    <Dashboard /> {/* Dashboard content will then be centered within this main area */}
  </main>
</div>
  );
};

export default Index;