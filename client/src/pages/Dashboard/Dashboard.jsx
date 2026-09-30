import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AlertTriangle, CloudUpload, RefreshCw } from "lucide-react";

import Sidebar from "../../components/Dashboard/Sidebar";
import StatsCards from "../../components/Dashboard/StatsCards";
import RecentActivity from "../../components/Dashboard/RecentActivity";
import QuickScan from "../../components/Dashboard/QuickScan";

import { getReports } from "../../services/reportapi";
import {
  formatRelativeTime,
  getHealthLabel,
} from "../../utils/format";

const DAY = 24 * 60 * 60 * 1000;
const RECENT_LIMIT = 5;

const buildStats = (reports) => {
  const totalScore = reports.reduce(
    (sum, report) => sum + (report.atsScore || 0),
    0
  );

  const avgScore = reports.length
    ? Math.round(totalScore / reports.length)
    : 0;

  const weekAgo = Date.now() - DAY;

  const thisWeek = reports.filter(
    (report) => new Date(report.createdAt).getTime() >= weekAgo
  ).length;

  const latest = reports[0];

  return {
    totalAnalyses: reports.length,
    avgScore,
    health: getHealthLabel(avgScore),
    thisWeek,
    latestName: latest?.resume?.originalName || "No uploads yet",
    latestAgo: latest?.createdAt
      ? formatRelativeTime(latest.createdAt)
      : "Upload a resume to begin",
  };
};

const EmptyState = ({ onUpload }) => (
  <div className="glass-panel rounded-xl px-6 py-12 text-center">
    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#c0c1ff]/10 text-[#c0c1ff]">
      <CloudUpload size={30} />
    </div>

    <h2 className="text-xl font-semibold">No analyses yet</h2>

    <p className="mx-auto mt-2 max-w-md text-sm text-[#c7c4d7]">
      Upload your first resume to get an ATS score, strengths, weaknesses
      and a tailored improvement plan.
    </p>

    <button
      onClick={onUpload}
      className="mt-6 inline-flex h-12 items-center gap-2 rounded-lg bg-gradient-to-r from-[#8083ff] to-[#571bc1] px-6 text-sm font-semibold text-white transition hover:brightness-110"
    >
      <CloudUpload size={17} />
      Upload your first resume
    </button>
  </div>
);

const ErrorState = ({ message, onRetry }) => (
  <div className="glass-panel rounded-xl px-6 py-12 text-center">
    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#ffb4ab]/10 text-[#ffb4ab]">
      <AlertTriangle size={30} />
    </div>

    <h2 className="text-xl font-semibold">
      Could not load your data
    </h2>

    <p className="mx-auto mt-2 max-w-md text-sm text-[#c7c4d7]">
      {message}
    </p>

    <button
      onClick={onRetry}
      className="mt-6 inline-flex h-12 items-center gap-2 rounded-lg bg-gradient-to-r from-[#8083ff] to-[#571bc1] px-6 text-sm font-semibold text-white transition hover:brightness-110"
    >
      <RefreshCw size={17} />
      Try again
    </button>
  </div>
);

const LoadingState = () => (
  <div>
    <StatsCards loading />

    <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-12">
      <div className="md:col-span-7">
        <RecentActivity loading />
      </div>

      <div className="flex flex-col gap-6 md:col-span-5">
        <QuickScan />
      </div>
    </div>
  </div>
);

const Dashboard = () => {
  const navigate = useNavigate();

  const [data, setData] = useState({ reports: [], stats: null });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    let active = true;

    const loadReports = async () => {
      try {
        const response = await getReports();

        if (!active) return;

        if (!response?.success) {
          throw new Error("The server rejected the request.");
        }

        const reports = response.reports || [];

        setData({ reports, stats: buildStats(reports) });
      } catch (err) {
        if (!active) return;

        // Session is no longer valid, send them back to login
        if (err.response?.status === 401) {
          localStorage.removeItem("token");
          navigate("/login", { replace: true });

          return;
        }

        setData({ reports: [], stats: null });

        setError(
          err.response?.data?.message ||
            err.response?.data?.error ||
            err.message ||
            "Something went wrong while loading your analyses."
        );
      } finally {
        if (active) setLoading(false);
      }
    };

    loadReports();

    return () => {
      active = false;
    };
  }, [reloadKey, navigate]);

  const handleRetry = () => {
    setError("");
    setLoading(true);
    setReloadKey((key) => key + 1);
  };

  const { reports, stats } = data;

  return (
    <div className="min-h-screen bg-[#0d1322] text-[#dde2f8]">
      <Sidebar />

      <main className="relative min-h-screen overflow-hidden p-4 pt-16 md:ml-64 md:p-12">
        {/* Background Glows */}
        <div className="pointer-events-none absolute right-0 top-0 h-96 w-96 rounded-full bg-[#c0c1ff]/5 blur-[100px]" />

        <div className="pointer-events-none absolute bottom-0 left-1/4 h-64 w-64 rounded-full bg-[#d0bcff]/5 blur-[80px]" />

        {/* Header */}
        <header className="relative z-10 mb-10 mt-10 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
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
            className="flex h-12 items-center gap-2 rounded-lg bg-gradient-to-r from-[#8083ff] to-[#571bc1] px-6 font-semibold text-white transition hover:brightness-110 hover:shadow-[0_0_15px_rgba(128,131,255,0.3)]"
          >
            <span>+</span>
            New Analysis
          </button>
        </header>

        <div className="relative z-10">
          {error ? (
            <ErrorState
              message={error}
              onRetry={handleRetry}
            />
          ) : loading ? (
            <LoadingState />
          ) : reports.length === 0 ? (
            <EmptyState onUpload={() => navigate("/upload")} />
          ) : (
            <>
              <StatsCards stats={stats} />

              <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-12">
                <div className="md:col-span-7">
                  <RecentActivity
                    reports={reports.slice(0, RECENT_LIMIT)}
                  />
                </div>

                <div className="flex flex-col gap-6 md:col-span-5">
                  <QuickScan />
                </div>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
