import React, { useEffect, useState } from "react";

import {
  RefreshCw,
  Download,
  SpellCheck,
  Eye,
  Bot,
  Radar,
  ThumbsUp,
  CheckCircle2,
  ClipboardCheck,
  Loader2,
} from "lucide-react";

import { useNavigate, useParams } from "react-router-dom";

import Sidebar from "../../components/Dashboard/Sidebar";

import { getReportById } from "../../services/reportapi";

const Analytics = () => {
  const navigate = useNavigate();

  const { reportId } = useParams();

  const [report, setReport] = useState(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [checklist, setChecklist] = useState({});

  // Fetch real report from backend
  useEffect(() => {
    const fetchReport = async () => {
      try {
        setLoading(true);

        const response = await getReportById(reportId);

        console.log("Real Report Data:", response.data);

        setReport(response.data.report);
      } catch (error) {
        console.error("Fetch Report Error:", error);

        setError(
          error.response?.data?.message ||
            "Failed to fetch analysis report"
        );
      } finally {
        setLoading(false);
      }
    };

    if (reportId) {
      fetchReport();
    }
  }, [reportId]);

  const toggleChecklist = (item) => {
    setChecklist((prev) => ({
      ...prev,
      [item]: !prev[item],
    }));
  };

  // Loading Screen
  if (loading) {
    return (
      <div className="min-h-screen bg-[#0d1322] text-[#dde2f8]">
        <Sidebar activePage="Analytics" />

        <main className="flex min-h-screen items-center justify-center md:ml-64">
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

  // Error Screen
  if (error) {
    return (
      <div className="min-h-screen bg-[#0d1322] text-[#dde2f8]">
        <Sidebar activePage="Analytics" />

        <main className="flex min-h-screen items-center justify-center md:ml-64">
          <div className="max-w-md rounded-2xl border border-red-500/30 bg-red-500/10 p-8 text-center">
            <h2 className="text-xl font-semibold text-red-300">
              Failed to Load Report
            </h2>

            <p className="mt-3 text-sm text-red-200">
              {error}
            </p>

            <button
              onClick={() => navigate("/upload")}
              className="mt-6 rounded-lg bg-[#8083ff] px-6 py-3 font-medium text-white"
            >
              Upload Again
            </button>
          </div>
        </main>
      </div>
    );
  }

  // No Report
  if (!report) {
    return null;
  }

  // Real Backend Data
  const atsScore = report.atsScore || 0;

  const circumference = 251.2;

  const strokeDashoffset =
    circumference - (atsScore / 100) * circumference;

  const strengths = report.strengths || [];

  const missingSkills = report.missingSkills || [];

  const suggestions = report.suggestions || [];

  const weaknesses = report.weaknesses || [];

  return (
    <div className="min-h-screen bg-[#0d1322]">
      {/* Sidebar */}
      <Sidebar activePage="Analytics" />

      {/* Main Content */}
      <main className="min-h-screen md:ml-64">
        <div className="p-4 text-[#dde2f8] md:p-8 lg:p-12">

          {/* Header */}
          <div className="mb-10 flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
            <div>
              <h1 className="text-3xl font-semibold text-[#dde2f8] md:text-[32px]">
                Analysis Results
              </h1>

              <p className="mt-2 text-sm text-[#c7c4d7] md:text-base">
                Resume ID: {report.resume}
              </p>
            </div>

            {/* Header Buttons */}
            <div className="flex flex-col gap-3 sm:flex-row">

              <button
                onClick={() => navigate("/upload")}
                className="flex h-12 items-center justify-center gap-2 rounded-xl bg-white/10 px-6 text-sm font-medium text-white backdrop-blur-md transition hover:bg-white/15"
              >
                <RefreshCw size={18} />

                Analyze Another
              </button>

              <button
                className="flex h-12 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-500 px-6 text-sm font-semibold text-white"
              >
                <Download size={18} />

                Download PDF Report
              </button>

            </div>
          </div>

          {/* Top Bento Grid */}
          <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-12">

            {/* ATS Score */}
            <div className="relative flex flex-col items-center justify-center overflow-hidden rounded-2xl border border-[#464554]/30 bg-[#111827]/70 p-6 backdrop-blur-xl md:col-span-4 lg:p-10">

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
                    className="stroke-[#c0c1ff]"
                  />

                </svg>

                <div className="absolute inset-0 flex flex-col items-center justify-center">

                  <span className="text-5xl font-bold text-[#c0c1ff]">
                    {atsScore}%
                  </span>

                </div>

              </div>

              <p className="relative z-10 text-center text-sm leading-6 text-[#c7c4d7]">
                {report.summary ||
                  "AI analysis completed successfully."}
              </p>

            </div>

            {/* Summary Metrics */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:col-span-8">

              {/* Strength Count */}
              <div className="flex min-h-[220px] flex-col justify-between rounded-2xl border border-[#464554]/30 bg-[#111827]/70 p-6">

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
              <div className="flex min-h-[220px] flex-col justify-between rounded-2xl border border-[#464554]/30 bg-[#111827]/70 p-6">

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
            <div className="relative overflow-hidden rounded-2xl border border-indigo-500/40 bg-[#111827]/70 p-6 backdrop-blur-xl md:col-span-5">

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
            <div className="rounded-2xl border border-[#464554]/30 bg-[#111827]/70 p-6 md:col-span-7">

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

            <div className="rounded-2xl border border-[#464554]/30 bg-[#111827]/70 p-6">

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
            <div className="rounded-2xl border border-[#464554]/30 bg-[#111827]/70 p-6">

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
                        className="mt-1 h-5 w-5"
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
          <div className="rounded-2xl border border-red-400/20 bg-[#111827]/70 p-6">

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

        </div>
      </main>
    </div>
  );
};

export default Analytics;