import { useNavigate } from "react-router-dom";

import Sidebar from "../../components/Dashboard/Sidebar";
import StatsCards from "../../components/Dashboard/StatsCards";
import RecentActivity from "../../components/Dashboard/RecentActivity";
import QuickScan from "../../components/Dashboard/QuickScan";
import ScoreTrend from "../../components/Dashboard/ScoreTrend";

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0d1322] text-[#dde2f8]">
      <Sidebar />

      <main className="relative min-h-screen overflow-hidden p-4 md:ml-64 md:p-12">
        {/* Background Glows */}
        <div className="pointer-events-none absolute right-0 top-0 h-96 w-96 rounded-full bg-[#c0c1ff]/5 blur-[100px]" />

        <div className="pointer-events-none absolute bottom-0 left-1/4 h-64 w-64 rounded-full bg-[#d0bcff]/5 blur-[80px]" />

        {/* Header */}
        <header className="relative z-10 mb-10 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h1 className="bg-gradient-to-r from-[#c0c1ff] to-[#d0bcff] bg-clip-text text-3xl font-bold text-transparent">
              Overview
            </h1>

            <p className="mt-1 text-[#c7c4d7]">
              Welcome back. Your resume performance metrics are ready.
            </p>
          </div>

          <button
            onClick={() => navigate("/upload")}
            className="flex h-12 items-center gap-2 rounded-lg bg-gradient-to-r from-[#8083ff] to-[#571bc1] px-6 font-medium text-[#0d0096] transition hover:brightness-110 hover:shadow-[0_0_15px_rgba(128,131,255,0.3)]"
          >
            <span>+</span>
            New Analysis
          </button>
        </header>

        <div className="relative z-10">
          <StatsCards />

          <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-12">
            <div className="md:col-span-8">
              <RecentActivity />
            </div>

            <div className="flex flex-col gap-6 md:col-span-4">
              <QuickScan />
              <ScoreTrend />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;