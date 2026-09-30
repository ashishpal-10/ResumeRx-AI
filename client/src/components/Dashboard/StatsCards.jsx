import {
  FileSearch,
  Target,
  HeartPulse,
  Clock3,
} from "lucide-react";

const SkeletonCard = () => (
  <div className="glass-panel flex h-36 flex-col justify-between rounded-xl p-6">
    <div className="flex items-start justify-between">
      <div className="h-4 w-24 animate-pulse rounded bg-[#2f3445]" />

      <div className="h-9 w-9 animate-pulse rounded-full bg-[#2f3445]" />
    </div>

    <div>
      <div className="h-6 w-16 animate-pulse rounded bg-[#2f3445]" />

      <div className="mt-2 h-3 w-28 animate-pulse rounded bg-[#2f3445]" />
    </div>
  </div>
);

const StatsCards = ({ stats, loading = false }) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <SkeletonCard key={index} />
        ))}
      </div>
    );
  }

  const cards = [
    {
      title: "Total Analyses",
      value: stats.totalAnalyses,
      subtitle: `+${stats.thisWeek} in the last 7 days`,
      icon: FileSearch,
    },
    {
      title: "Avg ATS Score",
      value: `${stats.avgScore}%`,
      subtitle: `Across ${stats.totalAnalyses} ${
        stats.totalAnalyses === 1 ? "report" : "reports"
      }`,
      icon: Target,
      progress: stats.avgScore,
    },
    {
      title: "Resume Health",
      value: stats.health,
      subtitle:
        stats.avgScore >= 80
          ? "Beating most applicants"
          : stats.avgScore >= 60
            ? "Room to polish"
            : "Needs attention",
      icon: HeartPulse,
    },
    {
      title: "Recent Upload",
      value: stats.latestName,
      subtitle: stats.latestAgo,
      icon: Clock3,
      small: true,
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className="glass-panel flex h-36 flex-col justify-between rounded-xl p-6"
          >
            <div className="flex items-start justify-between">
              <p className="text-sm text-[#c7c4d7]">
                {card.title}
              </p>

              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#242a3a] text-[#c0c1ff]">
                <Icon size={18} />
              </div>
            </div>

            <div>
              <p
                className={`font-semibold ${
                  card.small ? "truncate text-base" : "text-2xl"
                }`}
                title={card.small ? card.value : undefined}
              >
                {card.value}
              </p>

              {card.progress !== undefined ? (
                <>
                  <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-[#242a3a]">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-[#c0c1ff] to-[#d0bcff] transition-[width] duration-700"
                      style={{ width: `${card.progress}%` }}
                    />
                  </div>

                  <p className="mt-1 text-xs text-[#c7c4d7]">
                    {card.subtitle}
                  </p>
                </>
              ) : (
                <p className="mt-1 truncate text-xs text-[#c7c4d7]">
                  {card.subtitle}
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
