import {
  FileSearch,
  Target,
  HeartPulse,
  Clock3,
} from "lucide-react";

const StatsCards = () => {
  const stats = [
    {
      title: "Total Analyses",
      value: "14",
      subtitle: "+2 this week",
      icon: FileSearch,
    },
    {
      title: "Avg ATS Score",
      value: "82%",
      subtitle: "Strong performance",
      icon: Target,
      progress: true,
    },
    {
      title: "Resume Health",
      value: "Strong",
      subtitle: "Top 15%",
      icon: HeartPulse,
    },
    {
      title: "Recent Upload",
      value: "Product_Manager_v3.pdf",
      subtitle: "2 hours ago",
      icon: Clock3,
      small: true,
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <div
            key={stat.title}
            className="glass-panel flex h-36 flex-col justify-between rounded-xl p-6"
          >
            <div className="flex items-start justify-between">
              <p className="text-sm text-[#c7c4d7]">
                {stat.title}
              </p>

              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#242a3a] text-[#c0c1ff]">
                <Icon size={18} />
              </div>
            </div>

            <div>
              <p
                className={`font-semibold ${
                  stat.small
                    ? "truncate text-base"
                    : "text-2xl"
                }`}
              >
                {stat.value}
              </p>

              {stat.progress ? (
                <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-[#242a3a]">
                  <div className="h-full w-[82%] rounded-full bg-gradient-to-r from-[#c0c1ff] to-[#d0bcff]" />
                </div>
              ) : (
                <p className="mt-1 text-xs text-[#c7c4d7]">
                  {stat.subtitle}
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default StatsCards;