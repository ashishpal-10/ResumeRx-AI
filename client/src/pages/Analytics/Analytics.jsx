import { useEffect, useState } from "react";

import {
  Search,
  FileText,
  Eye,
  Download,
  Trash2,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Loader2,
  SpellCheck,
  Bot,
  Radar,
  ThumbsUp,
  ClipboardCheck,
  CloudUpload,
} from "lucide-react";

import { useNavigate, useParams } from "react-router-dom";

import Sidebar from "../../components/Dashboard/Sidebar";

import {
  getReportById,
  getReports,
  deleteReport,
} from "../../services/reportapi";

const Analytics = () => {
  const navigate = useNavigate();

  const { reportId } = useParams();

  if (reportId) {
    return <ReportDetail reportId={reportId} />;
  }

  return <ReportList navigate={navigate} />;
};

// ==============================
// REPORT DETAIL VIEW
// (/analytics/:id)
// ==============================

const ReportDetail = ({ reportId }) => {
  const navigate = useNavigate();

  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [checklist, setChecklist] = useState({});

  useEffect(() => {
    const fetchReport = async () => {
      setLoading(true);
      setError("");

      try {
        const response = await getReportById(reportId);

        setReport(response.report);
      } catch (error) {
        setError(
          error.response?.data?.message ||
            "Failed to fetch analysis report"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchReport();
  }, [reportId]);

  const toggleChecklist = (item) => {
    setChecklist((prev) => ({
      ...prev,
      [item]: !prev[item],
    }));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0d1322] text-[#dde2f8]">
        <Sidebar activePage="Analytics" />

        <main className="flex min-h-screen items-center justify-center pb-16 pt-16 md:ml-64">
          <div className="flex flex-col items-center">
            <Loader2
              size={45}
              className="animate-spin text-[#c0c1ff]"
            />

            <p className="mt-4 text-lg text-[#c7c4d7]">
              Loading your AI analysis...
            </p>
          </div>
        </main>
      </div>
    );
  }

  if (error || !report) {
    return (
      <div className="min-h-screen bg-[#0d1322] text-[#dde2f8]">
        <Sidebar activePage="Analytics" />

        <main className="flex min-h-screen items-center justify-center pb-16 pt-16 md:ml-64">
          <div className="max-w-md rounded-2xl border border-red-500/30 bg-red-500/10 p-8 text-center">
            <h2 className="text-xl font-semibold text-red-300">
              Failed to Load Report
            </h2>

            <p className="mt-3 text-sm text-red-200">
              {error || "Report not found."}
            </p>

            <button
              onClick={() => navigate("/analytics")}
              className="mt-6 rounded-lg bg-[#8083ff] px-6 py-3 font-medium text-white"
            >
              Back to History
            </button>
          </div>
        </main>
      </div>
    );
  }

  const atsScore = report.atsScore || 0;

  const circumference = 251.2;

  const strokeDashoffset =
    circumference - (atsScore / 100) * circumference;

  const strengths = report.strengths || [];

  const missingSkills = report.missingSkills || [];

  const suggestions = report.suggestions || [];

  const weaknesses = report.weaknesses || [];

  const resumeName = report.resume?.originalName || "Resume";

  const scoreBand = (score) => {
    if (score >= 80) return { ring: "#34d399", text: "text-emerald-300", label: "Excellent" };
    if (score >= 50) return { ring: "#fbbf24", text: "text-amber-300", label: "Good" };
    return { ring: "#f87171", text: "text-red-300", label: "Needs Work" };
  };

  const band = scoreBand(atsScore);

  const handleDownload = () => {
    const content = `
AI RESUME ANALYSIS REPORT

ATS SCORE: ${atsScore}%

RESUME: ${resumeName}

SUMMARY:
${report.summary || "No summary available"}

STRENGTHS:
${strengths.join("\n") || "No strengths available"}

WEAKNESSES:
${weaknesses.join("\n") || "No weaknesses available"}

MISSING SKILLS:
${missingSkills.join("\n") || "No missing skills available"}

SUGGESTIONS:
${suggestions.join("\n") || "No suggestions available"}

RESUME ROAST:
${report.resumeRoast || "No roast available"}
`;

    const blob = new Blob([content], { type: "text/plain" });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;

    link.download = "resume-analysis-report.txt";

    link.click();

    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-[#0d1322]">
      {/* Sidebar */}
      <Sidebar activePage="Analytics" />

      {/* Main Content */}
      <main className="min-h-screen pt-14 md:ml-64">
        <div className="p-4 text-[#dde2f8] md:p-8 lg:p-12">

          {/* Header */}
          <div className="mb-10 flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
            <div>
              <h1 className="text-3xl font-semibold text-[#dde2f8] md:text-[32px]">
                Analysis Results
              </h1>

              <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-[#c0c1ff]/20 bg-[#c0c1ff]/10 px-4 py-1.5">
                <FileText size={16} className="text-[#c0c1ff]" />

                <span className="max-w-xs truncate text-sm font-medium text-[#dde2f8] md:max-w-md">
                  {resumeName}
                </span>
              </div>
            </div>

            {/* Header Buttons */}
            <div className="flex flex-col gap-3 sm:flex-row">

              <button
                onClick={() => navigate("/upload")}
                className="flex h-12 items-center justify-center gap-2 rounded-xl bg-white/10 px-6 text-sm font-medium text-white backdrop-blur-md transition hover:bg-white/15"
              >
                <CloudUpload size={18} />

                Upload Resume
              </button>

              <button
                onClick={handleDownload}
                className="flex h-12 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-500 px-6 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:brightness-110 hover:shadow-[0_0_15px_rgba(128,131,255,0.3)]"
              >
                <Download size={18} />

                Download Report
              </button>

            </div>
          </div>

          {/* Top Bento Grid */}
          <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-12">

            {/* ATS Score */}
            <div className="glass-panel relative flex flex-col items-center justify-center overflow-hidden rounded-2xl p-6 md:col-span-4 lg:p-10">

              <div className="pointer-events-none absolute inset-0 bg-indigo-400/5 blur-[100px]" />

              <h3 className="relative z-10 mb-6 text-center text-2xl font-semibold">
                ATS Match Score
              </h3>

              {/* Progress Ring */}
              <div className="relative z-10 mb-4 h-48 w-48">

                <svg
                  className="h-full w-full -rotate-90"
                  viewBox="0 0 100 100"
                >

                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="transparent"
                    strokeWidth="8"
                    className="stroke-[#2f3445]"
                  />

                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="transparent"
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    style={{ stroke: band.ring, transition: "stroke-dashoffset 1s ease" }}
                  />

                </svg>

                <div className="absolute inset-0 flex flex-col items-center justify-center">

                  <span className="text-5xl font-bold text-[#c0c1ff]">
                    {atsScore}%
                  </span>

                  <span className={`mt-1 text-sm font-medium ${band.text}`}>
                    {band.label}
                  </span>

                </div>

              </div>

              <p className="relative z-10 text-center text-sm leading-6 text-[#c7c4d7]">
                {report.summary || "AI analysis completed successfully."}
              </p>

            </div>

            {/* Summary Metrics */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:col-span-8">

              {/* Strength Count */}
              <div className="glass-panel flex min-h-[220px] flex-col justify-between rounded-2xl p-6">

                <div className="mb-4 flex items-center justify-between">

                  <SpellCheck
                    size={32}
                    className="text-[#ffb783]"
                  />

                  <span className="text-2xl font-semibold">
                    {strengths.length}
                  </span>

                </div>

                <div>
                  <h4 className="mb-3 text-sm font-medium">
                    Strengths Found
                  </h4>

                  <div className="h-2 w-full overflow-hidden rounded-full bg-[#2f3445]">

                    <div
                      style={{
                        width: `${
                          Math.min(
                            strengths.length * 20,
                            100
                          )
                        }%`,
                      }}
                      className="h-full rounded-full bg-[#ffb783]"
                    />

                  </div>

                </div>

              </div>

              {/* Weaknesses */}
              <div className="glass-panel flex min-h-[220px] flex-col justify-between rounded-2xl p-6">

                <div className="mb-4 flex items-center justify-between">

                  <Eye
                    size={32}
                    className="text-[#d0bcff]"
                  />

                  <span className="text-2xl font-semibold">
                    {weaknesses.length}
                  </span>

                </div>

                <div>

                  <h4 className="mb-3 text-sm font-medium">
                    Areas to Improve
                  </h4>

                  <div className="h-2 w-full overflow-hidden rounded-full bg-[#2f3445]">

                    <div
                      style={{
                        width: `${
                          Math.min(
                            weaknesses.length * 20,
                            100
                          )
                        }%`,
                      }}
                      className="h-full rounded-full bg-[#d0bcff]"
                    />

                  </div>

                </div>

              </div>

            </div>

          </div>

          {/* AI Roast and Missing Skills */}
          <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-12">

            {/* AI Resume Roast */}
            <div className="glass-panel relative overflow-hidden rounded-2xl border border-indigo-500/40 p-6 md:col-span-5">

              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-transparent" />

              <div className="relative z-10">

                <div className="mb-4 flex items-center gap-2">

                  <Bot
                    size={24}
                    className="text-[#c0c1ff]"
                  />

                  <h3 className="text-xl font-semibold">
                    AI Resume Roast
                  </h3>

                </div>

                <p className="text-base leading-7 text-[#c7c4d7]">
                  🔥 {report.resumeRoast}
                </p>

              </div>

            </div>

            {/* Missing Skills */}
            <div className="glass-panel rounded-2xl p-6 md:col-span-7">

              <div className="mb-4 flex items-center gap-2">

                <Radar
                  size={24}
                  className="text-[#ffb4ab]"
                />

                <h3 className="text-xl font-semibold">
                  Missing Industry Skills
                </h3>

              </div>

              <div className="flex flex-wrap gap-3">

                {missingSkills.length > 0 ? (
                  missingSkills.map((skill, index) => (

                    <span
                      key={index}
                      className="rounded-full border border-violet-400/50 bg-violet-500/15 px-4 py-2 text-sm font-medium text-violet-300"
                    >
                      {skill}
                    </span>

                  ))
                ) : (

                  <p className="text-sm text-[#c7c4d7]">
                    No missing skills found.
                  </p>

                )}

              </div>

            </div>

          </div>

          {/* Strengths */}
          <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2">

            <div className="glass-panel rounded-2xl p-6">

              <h3 className="mb-5 flex items-center gap-2 text-xl font-semibold">

                <ThumbsUp
                  size={23}
                  className="text-[#ffb783]"
                />

                Strengths

              </h3>

              <div className="space-y-5">

                {strengths.length > 0 ? (
                  strengths.map((item, index) => (

                    <div
                      key={index}
                      className="flex gap-3"
                    >

                      <CheckCircle2
                        size={22}
                        className="mt-0.5 shrink-0 text-[#ffb783]"
                      />

                      <p className="text-sm leading-6 text-[#c7c4d7]">
                        {item}
                      </p>

                    </div>

                  ))
                ) : (

                  <p className="text-[#c7c4d7]">
                    No strengths available.
                  </p>

                )}

              </div>

            </div>

            {/* Action Checklist */}
            <div className="glass-panel rounded-2xl p-6">

              <h3 className="mb-5 flex items-center gap-2 text-xl font-semibold">

                <ClipboardCheck
                  size={23}
                  className="text-[#c0c1ff]"
                />

                Improvement Checklist

              </h3>

              <div className="space-y-3">

                {suggestions.length > 0 ? (
                  suggestions.map((item, index) => (

                    <label
                      key={index}
                      className="flex cursor-pointer items-start gap-3 rounded-lg p-3 transition hover:bg-[#2f3445]/30"
                    >

                      <input
                        type="checkbox"
                        checked={checklist[index] || false}
                        onChange={() =>
                          toggleChecklist(index)
                        }
                        className="mt-1 h-5 w-5 shrink-0 cursor-pointer accent-[#8083ff]"
                      />

                      <span
                        className={`text-sm leading-6 ${
                          checklist[index]
                            ? "text-indigo-300 line-through"
                            : "text-[#dde2f8]"
                        }`}
                      >
                        {item}
                      </span>

                    </label>

                  ))
                ) : (

                  <p className="text-[#c7c4d7]">
                    No suggestions available.
                  </p>

                )}

              </div>

            </div>

          </div>

          {/* Weaknesses */}
          <div className="glass-panel rounded-2xl border border-red-400/20 p-6">

            <h3 className="mb-5 text-xl font-semibold text-[#ffb4ab]">
              Areas to Improve
            </h3>

            <div className="space-y-3">

              {weaknesses.length > 0 ? (
                weaknesses.map((item, index) => (

                  <div
                    key={index}
                    className="rounded-lg bg-red-500/5 p-4 text-sm text-[#c7c4d7]"
                  >
                    {item}
                  </div>

                ))
              ) : (

                <p className="text-[#c7c4d7]">
                  No weaknesses available.
                </p>

              )}

            </div>

          </div>

          <button
            onClick={() => navigate("/analytics")}
            className="mb-6 flex items-center gap-2 rounded-lg border border-[#c0c1ff]/30 bg-[#c0c1ff]/5 px-4 py-2.5 text-sm font-medium text-[#c0c1ff] transition hover:bg-[#c0c1ff]/15"
          >
            ← Back to History
          </button>

        </div>
      </main>
    </div>
  );
};

// ==============================
// REPORT LIST VIEW
// (/analytics)
// ==============================

const ReportList = ({ navigate }) => {
  const [search, setSearch] = useState("");
  const [scoreFilter, setScoreFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState("recent");

  const [historyData, setHistoryData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadReports = async () => {
      try {
        const response = await getReports();

        if (response.success) {
          setHistoryData(response.reports || []);
        }
      } catch (error) {
        console.error("History Fetch Error:", error);
      } finally {
        setLoading(false);
      }
    };

    loadReports();
  }, []);

  const getScoreType = (score) => {
    if (score >= 80) return "high";
    if (score >= 50) return "medium";
    return "low";
  };

  const getScoreIcon = (score) => {
    if (score >= 80) {
      return <CheckCircle2 size={15} />;
    }

    if (score >= 50) {
      return <AlertTriangle size={15} />;
    }

    return <XCircle size={15} />;
  };

  const filteredData = historyData
    .filter((item) => {
      const resumeName =
        item.resume?.originalName ||
        item.resumeName ||
        "Unknown Resume";

      const score = item.atsScore || 0;

      const matchesSearch = resumeName
        .toLowerCase()
        .includes(search.toLowerCase());

      if (scoreFilter === "high") {
        return matchesSearch && score >= 80;
      }

      if (scoreFilter === "medium") {
        return matchesSearch && score >= 50 && score < 80;
      }

      if (scoreFilter === "low") {
        return matchesSearch && score < 50;
      }

      return matchesSearch;
    })
    .sort((a, b) => {
      if (sortOrder === "recent") {
        return new Date(b.createdAt) - new Date(a.createdAt);
      }

      return new Date(a.createdAt) - new Date(b.createdAt);
    });

  const handleDelete = async (reportId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this report?"
    );

    if (!confirmDelete) return;

    try {
      await deleteReport(reportId);

      setHistoryData((prev) =>
        prev.filter((item) => item._id !== reportId)
      );

      alert("Report deleted successfully");
    } catch (error) {
      console.error("Delete Error:", error);

      alert("Failed to delete report");
    }
  };

  const handleDownload = (report) => {
    const content = `
AI RESUME ROAST REPORT

ATS SCORE: ${report.atsScore}%

SUMMARY:
${report.summary || "No summary available"}

STRENGTHS:
${report.strengths?.join("\n") || "No strengths available"}

WEAKNESSES:
${report.weaknesses?.join("\n") || "No weaknesses available"}

MISSING SKILLS:
${report.missingSkills?.join("\n") || "No missing skills available"}

SUGGESTIONS:
${report.suggestions?.join("\n") || "No suggestions available"}

RESUME ROAST:
${report.resumeRoast || "No roast available"}
`;

    const blob = new Blob([content], { type: "text/plain" });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;

    link.download = "resume-analysis-report.txt";

    link.click();

    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-[#0d1322]">
      {/* Sidebar */}
      <Sidebar activePage="Analytics" />

      {/* Main Content */}
      <main className="min-h-screen pt-14 md:ml-64">
        <div className="p-4 text-[#dde2f8] md:p-8 lg:p-12">

          {/* Header */}
          <div className="mb-10 flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">

            <div>
              <h1 className="mb-2 text-3xl font-semibold text-[#dde2f8] md:text-[32px]">
                Your History
              </h1>

              <p className="text-sm text-[#c7c4d7] md:text-base">
                Review and manage your previous resume analyses.
              </p>
            </div>

            {/* Filters */}
            <div className="flex w-full flex-col gap-3 md:flex-row xl:w-auto">

              {/* Search */}
              <div className="relative w-full md:w-64">

                <Search
                  size={20}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#908fa0]"
                />

                <input
                  type="text"
                  placeholder="Search resumes..."
                  value={search}
                  onChange={(e) =>
                    setSearch(e.target.value)
                  }
                  className="h-12 w-full rounded-lg border border-[#464554]/50 bg-[#111827]/60 py-3 pl-11 pr-4 text-sm text-[#dde2f8] outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                />
              </div>

              {/* Score Filter */}
              <select
                value={scoreFilter}
                onChange={(e) =>
                  setScoreFilter(e.target.value)
                }
                className="h-12 rounded-lg border border-[#464554]/50 bg-[#111827]/60 px-4 text-sm text-[#dde2f8] outline-none"
              >
                <option value="all">All Scores</option>
                <option value="high">High (80+)</option>
                <option value="medium">Medium (50-79)</option>
                <option value="low">Low (&lt;50)</option>
              </select>

              {/* Sort */}
              <select
                value={sortOrder}
                onChange={(e) =>
                  setSortOrder(e.target.value)
                }
                className="h-12 rounded-lg border border-[#464554]/50 bg-[#111827]/60 px-4 text-sm text-[#dde2f8] outline-none"
              >
                <option value="recent">Most Recent</option>
                <option value="oldest">Oldest First</option>
              </select>

              {/* Upload */}
              <button
                onClick={() => navigate("/upload")}
                className="flex h-12 items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-indigo-500 to-violet-500 px-5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:brightness-110 hover:shadow-[0_0_15px_rgba(128,131,255,0.3)]"
              >
                <CloudUpload size={18} />

                Upload Resume
              </button>
            </div>
          </div>

          {/* History Table */}
          <div className="overflow-hidden rounded-xl border border-[#464554]/30 bg-[#151b2b]/70 backdrop-blur-xl">

            {/* Table Header */}
            <div className="hidden grid-cols-12 gap-4 border-b border-[#464554]/30 px-6 py-4 text-xs font-semibold uppercase tracking-wider text-[#c7c4d7] md:grid">

              <div className="col-span-5">Resume Name</div>

              <div className="col-span-2 text-center">ATS Score</div>

              <div className="col-span-3">Date Analyzed</div>

              <div className="col-span-2 text-right">Actions</div>
            </div>

            {/* Loading */}
            {loading && (
              <div className="flex min-h-[300px] flex-col items-center justify-center">

                <Loader2
                  size={40}
                  className="animate-spin text-indigo-400"
                />

                <p className="mt-4 text-sm text-[#c7c4d7]">
                  Loading your resume history...
                </p>
              </div>
            )}

            {/* Table Body */}
            {!loading &&
              filteredData.length > 0 &&
              filteredData.map((item) => {
                const score = Number(item.atsScore) || 0;

                const scoreType = getScoreType(score);

                const resumeName =
                  item.resume?.originalName ||
                  item.resumeName ||
                  "Unknown Resume";

                const date = new Date(item.createdAt);

                return (
                  <div
                    key={item._id}
                    className="grid grid-cols-1 items-center gap-4 border-b border-[#464554]/20 px-5 py-5 transition duration-200 last:border-none hover:bg-[#111827]/60 md:grid-cols-12 md:px-6"
                  >

                    {/* Resume Name */}
                    <div className="flex items-center gap-3 md:col-span-5">

                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#c0c1ff]/10 text-[#c0c1ff]">

                        <FileText size={20} />

                      </div>

                      <div>
                        <h3 className="text-sm font-medium text-[#dde2f8]">
                          {resumeName}
                        </h3>

                        <p className="mt-1 text-xs text-[#c7c4d7] md:hidden">
                          Analyzed: {date.toLocaleDateString()}
                        </p>
                      </div>
                    </div>

                    {/* Score */}
                    <div className="flex md:col-span-2 md:justify-center">

                      <span
                        className={`flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold

                          ${
                            scoreType === "high"
                              ? "border-indigo-500/30 bg-indigo-500/15 text-[#c0c1ff]"
                              : ""
                          }

                          ${
                            scoreType === "medium"
                              ? "border-orange-500/30 bg-orange-500/15 text-[#ffb783]"
                              : ""
                          }

                          ${
                            scoreType === "low"
                              ? "border-red-400/25 bg-red-400/10 text-[#ffb4ab]"
                              : ""
                          }
                        `}
                      >

                        {getScoreIcon(score)}

                        {score}%

                      </span>
                    </div>

                    {/* Date */}
                    <div className="hidden text-sm text-[#c7c4d7] md:col-span-3 md:block">

                      {date.toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}

                      {" • "}

                      {date.toLocaleTimeString("en-IN", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}

                    </div>

                    {/* Actions */}
                    <div className="flex gap-2 md:col-span-2 md:justify-end">

                      {/* View */}
                      <button
                        onClick={() => navigate(`/analytics/${item._id}`)}
                        title="View Analysis"
                        className="flex h-9 w-9 items-center justify-center rounded-lg text-[#c7c4d7] transition hover:bg-[#2f3445]/70 hover:text-[#c0c1ff]"
                      >

                        <Eye size={19} />

                      </button>

                      {/* Download */}
                      <button
                        onClick={() => handleDownload(item)}
                        title="Download Report"
                        className="flex h-9 w-9 items-center justify-center rounded-lg text-[#c7c4d7] transition hover:bg-[#2f3445]/70 hover:text-[#c0c1ff]"
                      >

                        <Download size={19} />

                      </button>

                      {/* Delete */}
                      <button
                        onClick={() => handleDelete(item._id)}
                        title="Delete"
                        className="flex h-9 w-9 items-center justify-center rounded-lg text-[#c7c4d7] transition hover:bg-red-900/30 hover:text-[#ffb4ab]"
                      >

                        <Trash2 size={19} />

                      </button>

                    </div>
                  </div>
                );
              })}

            {/* Empty State */}
            {!loading &&
              filteredData.length === 0 && (
                <div className="flex min-h-[300px] flex-col items-center justify-center text-center">

                  <FileText
                    size={48}
                    className="mb-4 text-indigo-400"
                  />

                  <h2 className="mb-2 text-xl font-semibold text-[#dde2f8]">
                    No resumes found
                  </h2>

                  <p className="text-sm text-[#c7c4d7]">
                    Upload a resume to start your analysis.
                  </p>

                  <button
                    onClick={() => navigate("/upload")}
                    className="mt-6 flex items-center gap-2 rounded-lg bg-gradient-to-r from-indigo-500 to-violet-500 px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:brightness-110"
                  >
                    <CloudUpload size={18} />

                    Upload Resume
                  </button>
                </div>
              )}

          </div>
        </div>
      </main>
    </div>
  );
};

export default Analytics;
