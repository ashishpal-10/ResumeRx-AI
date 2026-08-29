import React, { useEffect, useState } from "react";
import axios from "axios";

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
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Dashboard/Sidebar";

const History = () => {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [scoreFilter, setScoreFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState("recent");

  const [historyData, setHistoryData] = useState([]);
  const [loading, setLoading] = useState(true);

  // ==============================
  // GET ALL HISTORY
  // ==============================

  const fetchHistory = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const response = await axios.get(
        "http://localhost:8080/api/reports",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("History API Response:", response.data);

      if (response.data.success) {
        setHistoryData(response.data.reports || []);
      }
    } catch (error) {
      console.error(
        "History Fetch Error:",
        error.response?.data || error.message
      );
    } finally {
      setLoading(false);
    }
  };

  // ==============================
  // LOAD HISTORY
  // ==============================

  useEffect(() => {
    fetchHistory();
  }, []);

  // ==============================
  // GET SCORE TYPE
  // ==============================

  const getScoreType = (score) => {
    if (score >= 80) return "high";

    if (score >= 50) return "medium";

    return "low";
  };

  // ==============================
  // GET SCORE ICON
  // ==============================

  const getScoreIcon = (score) => {
    if (score >= 80) {
      return <CheckCircle2 size={15} />;
    }

    if (score >= 50) {
      return <AlertTriangle size={15} />;
    }

    return <XCircle size={15} />;
  };

  // ==============================
  // FILTER DATA
  // ==============================

  const filteredData = historyData
    .filter((item) => {
      // Resume name from populated resume object
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
        return (
          new Date(b.createdAt) -
          new Date(a.createdAt)
        );
      }

      return (
        new Date(a.createdAt) -
        new Date(b.createdAt)
      );
    });

  // ==============================
  // DELETE REPORT
  // ==============================

  const handleDelete = async (reportId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this report?"
    );

    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");

      await axios.delete(
        `http://localhost:8080/api/reports/${reportId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Remove deleted report from UI
      setHistoryData((prev) =>
        prev.filter((item) => item._id !== reportId)
      );

      alert("Report deleted successfully");
    } catch (error) {
      console.error(
        "Delete Error:",
        error.response?.data || error.message
      );

      alert("Failed to delete report");
    }
  };

  // ==============================
  // VIEW REPORT
  // ==============================

  const handleView = (reportId) => {
    navigate(`/report/${reportId}`);
  };

  // ==============================
  // DOWNLOAD
  // ==============================

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

    const blob = new Blob([content], {
      type: "text/plain",
    });

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

      <Sidebar activePage="History" />

      {/* Main Content */}

      <main className="min-h-screen md:ml-64">
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
                <option value="all">
                  All Scores
                </option>

                <option value="high">
                  High (80+)
                </option>

                <option value="medium">
                  Medium (50-79)
                </option>

                <option value="low">
                  Low (&lt;50)
                </option>
              </select>

              {/* Sort */}

              <select
                value={sortOrder}
                onChange={(e) =>
                  setSortOrder(e.target.value)
                }
                className="h-12 rounded-lg border border-[#464554]/50 bg-[#111827]/60 px-4 text-sm text-[#dde2f8] outline-none"
              >
                <option value="recent">
                  Most Recent
                </option>

                <option value="oldest">
                  Oldest First
                </option>
              </select>
            </div>
          </div>

          {/* History Table */}

          <div className="overflow-hidden rounded-xl border border-[#464554]/30 bg-[#151b2b]/70 backdrop-blur-xl">

            {/* Table Header */}

            <div className="hidden grid-cols-12 gap-4 border-b border-[#464554]/30 px-6 py-4 text-xs font-semibold uppercase tracking-wider text-[#c7c4d7] md:grid">

              <div className="col-span-5">
                Resume Name
              </div>

              <div className="col-span-2 text-center">
                ATS Score
              </div>

              <div className="col-span-3">
                Date Analyzed
              </div>

              <div className="col-span-2 text-right">
                Actions
              </div>
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
                const score =
                  Number(item.atsScore) || 0;

                const scoreType =
                  getScoreType(score);

                const resumeName =
                  item.resume?.originalName ||
                  item.resumeName ||
                  "Unknown Resume";

                const date = new Date(
                  item.createdAt
                );

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
                          Analyzed:{" "}
                          {date.toLocaleDateString()}
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
                        onClick={() =>
                          handleDownload(item)
                        }
                        title="Download Report"
                        className="flex h-9 w-9 items-center justify-center rounded-lg text-[#c7c4d7] transition hover:bg-[#2f3445]/70 hover:text-[#c0c1ff]"
                      >

                        <Download size={19} />

                      </button>

                      {/* Delete */}

                      <button
                        onClick={() =>
                          handleDelete(item._id)
                        }
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

                </div>
              )}

          </div>
        </div>
      </main>
    </div>
  );
};

export default History;