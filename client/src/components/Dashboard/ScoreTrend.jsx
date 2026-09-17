const ScoreTrend = () => {
  return (
    <div className="glass-panel h-64 rounded-xl p-6">
      <h3 className="mb-4 text-lg font-semibold">
        Score Trend
      </h3>

      <div className="relative h-44">
        {/* Grid */}
        <div className="absolute inset-0 flex flex-col justify-between">
          <div className="border-t border-[#464554]/20" />
          <div className="border-t border-[#464554]/20" />
          <div className="border-t border-[#464554]/20" />
          <div className="border-t border-[#464554]/20" />
        </div>

        {/* Chart */}
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="absolute inset-0 h-full w-full"
        >
          <defs>
            <linearGradient
              id="scoreGradient"
              x1="0%"
              x2="100%"
            >
              <stop
                offset="0%"
                stopColor="#c0c1ff"
              />

              <stop
                offset="100%"
                stopColor="#d0bcff"
              />
            </linearGradient>
          </defs>

          <path
            d="M0 80 L25 60 L50 70 L75 30 L100 20"
            fill="none"
            stroke="url(#scoreGradient)"
            strokeWidth="2"
            vectorEffect="non-scaling-stroke"
          />
        </svg>

        {/* Dots */}
        <div className="absolute bottom-[20%] left-[0%] h-2 w-2 rounded-full bg-[#c0c1ff]" />

        <div className="absolute bottom-[40%] left-[25%] h-2 w-2 rounded-full bg-[#c0c1ff]" />

        <div className="absolute bottom-[30%] left-[50%] h-2 w-2 rounded-full bg-[#c0c1ff]" />

        <div className="absolute bottom-[70%] left-[75%] h-2 w-2 rounded-full bg-[#c0c1ff]" />

        <div className="absolute bottom-[80%] right-0 h-3 w-3 rounded-full border-2 border-[#0d1322] bg-[#d0bcff] shadow-[0_0_12px_rgba(208,188,255,0.8)]" />

        {/* Labels */}
        <div className="absolute -bottom-6 left-0 right-0 flex justify-between text-xs text-[#c7c4d7]">
          <span>Aug</span>
          <span>Sep</span>
          <span>Oct</span>
        </div>
      </div>
    </div>
  );
};

export default ScoreTrend;