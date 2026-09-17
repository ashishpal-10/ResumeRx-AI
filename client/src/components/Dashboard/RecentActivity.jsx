import {
  FileText,
  ArrowRight,
} from "lucide-react";

const RecentActivity = () => {
  const activities = [
    {
      name: "Product_Manager_v3.pdf",
      date: "Today",
      score: 88,
    },
    {
      name: "Software_Engineer.pdf",
      date: "Yesterday",
      score: 74,
    },
    {
      name: "Base_Resume_2026.pdf",
      date: "Aug 20, 2026",
      score: 45,
    },
  ];

  const getScoreStyle = (score) => {
    if (score >= 80) {
      return "bg-[#c0c1ff]/10 text-[#c0c1ff]";
    }

    if (score >= 60) {
      return "bg-[#ffb783]/10 text-[#ffb783]";
    }

    return "bg-[#ffb4ab]/10 text-[#ffb4ab]";
  };

  return (
    <section className="glass-panel overflow-hidden rounded-xl p-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold">
          Recent Activity
        </h2>

        <button className="text-sm text-[#c0c1ff] transition hover:text-[#e1e0ff]">
          View All
        </button>
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
            {activities.map((activity) => (
              <tr
                key={activity.name}
                className="group border-b border-[#464554]/10 transition hover:bg-[#2f3445]/30"
              >
                <td className="flex items-center gap-3 py-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#191f2f] text-[#c0c1ff]">
                    <FileText size={19} />
                  </div>

                  <span className="font-medium">
                    {activity.name}
                  </span>
                </td>

                <td className="text-sm text-[#c7c4d7]">
                  {activity.date}
                </td>

                <td>
                  <span
                    className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${getScoreStyle(
                      activity.score
                    )}`}
                  >
                    {activity.score}/100
                  </span>
                </td>

                <td className="text-right">
                  <button className="rounded-lg p-2 text-[#c7c4d7] transition hover:bg-[#191f2f] hover:text-[#c0c1ff]">
                    <ArrowRight size={19} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default RecentActivity;