import { useNavigate } from "react-router-dom";
import {
  FileText,
  ArrowRight,
} from "lucide-react";

import { formatRelativeTime } from "../../utils/format";

const SKELETON_ROWS = 3;

const getScoreStyle = (score) => {
  if (score >= 80) {
    return "bg-[#c0c1ff]/10 text-[#c0c1ff]";
  }

  if (score >= 60) {
    return "bg-[#ffb783]/10 text-[#ffb783]";
  }

  return "bg-[#ffb4ab]/10 text-[#ffb4ab]";
};

const getResumeName = (report) =>
  report.resume?.originalName || report.resumeName || "Untitled resume";

const SkeletonRows = () =>
  Array.from({ length: SKELETON_ROWS }).map((_, index) => (
    <tr
      key={index}
      className="border-b border-[#464554]/10"
    >
      <td className="py-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 animate-pulse rounded-lg bg-[#242a3a]" />

          <div className="h-4 w-48 animate-pulse rounded bg-[#2f3445]" />
        </div>
      </td>

      <td>
        <div className="h-3 w-20 animate-pulse rounded bg-[#2f3445]" />
      </td>

      <td>
        <div className="h-6 w-16 animate-pulse rounded-full bg-[#2f3445]" />
      </td>

      <td className="text-right">
        <div className="ml-auto h-8 w-8 animate-pulse rounded-lg bg-[#2f3445]" />
      </td>
    </tr>
  ));

const RecentActivity = ({ reports = [], loading = false }) => {
  const navigate = useNavigate();

  return (
    <section className="glass-panel overflow-hidden rounded-xl p-5">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold">
          Recent Activity
        </h2>

        {!loading && reports.length > 0 && (
          <button
            onClick={() => navigate("/analytics")}
            className="text-sm text-[#c0c1ff] transition hover:text-[#e1e0ff]"
          >
            View All
          </button>
        )}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[600px] text-left">
          <thead>
            <tr className="border-b border-[#464554]/30 text-xs text-[#c7c4d7]">
              <th className="pb-3 font-medium">
                Document Name
              </th>

              <th className="pb-3 font-medium">
                Date
              </th>

              <th className="pb-3 font-medium">
                ATS Score
              </th>

              <th className="pb-3 text-right font-medium">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <SkeletonRows />
            ) : reports.length === 0 ? (
              <tr>
                <td
                  colSpan={4}
                  className="py-10 text-center text-sm text-[#c7c4d7]"
                >
                  Nothing analysed yet. Upload a resume to get started.
                </td>
              </tr>
            ) : (
              reports.map((report) => (
                <tr
                  key={report._id}
                  className="group border-b border-[#464554]/10 transition hover:bg-[#2f3445]/30"
                >
                  <td className="py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#191f2f] text-[#c0c1ff]">
                        <FileText size={19} />
                      </div>

                      <span
                        className="truncate font-medium"
                        title={getResumeName(report)}
                      >
                        {getResumeName(report)}
                      </span>
                    </div>
                  </td>

                  <td className="text-sm whitespace-nowrap text-[#c7c4d7]">
                    {formatRelativeTime(report.createdAt)}
                  </td>

                  <td>
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${getScoreStyle(
                        report.atsScore || 0
                      )}`}
                    >
                      {report.atsScore ?? "—"}/100
                    </span>
                  </td>

                  <td className="text-right">
                    <button
                      onClick={() =>
                        navigate(`/analytics/${report._id}`)
                      }
                      aria-label={`View report for ${getResumeName(
                        report
                      )}`}
                      className="rounded-lg p-2 text-[#c7c4d7] transition hover:bg-[#191f2f] hover:text-[#c0c1ff]"
                    >
                      <ArrowRight size={19} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default RecentActivity;
