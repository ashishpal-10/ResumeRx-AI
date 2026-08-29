import {
  FileText,
  Target,
  Flame,
  TrendingUp,
} from "lucide-react";

const Features = () => {
  return (
    <section id="features" className="mt-10 py-10">

      {/* Section Heading */}
      <div className="mb-10 text-center">
        <h2 className="mb-4 text-3xl font-bold text-[#dde2f8]">
          Precision Intelligence
        </h2>

        <p className="text-[#c7c4d7]">
          Everything you need to bypass filters and impress recruiters.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">

        {/* ATS Score */}
        <div className="glass-panel group relative overflow-hidden rounded-xl p-6 transition duration-300 hover:-translate-y-1 md:col-span-2">

          <div className="relative z-10">

            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg border border-[#464554]/30 bg-[#242a3a] text-[#c0c1ff]">
              <FileText size={24} />
            </div>

            <h3 className="mb-2 text-2xl font-semibold">
              ATS Optimization Score
            </h3>

            <p className="max-w-md text-[#c7c4d7]">
              Our proprietary algorithm simulates how Applicant Tracking
              Systems parse your resume, identifying layout flaws and unreadable
              formatting instantly.
            </p>

          </div>

          <div className="relative mt-8 h-32 overflow-hidden rounded-lg border border-[#464554]/20 bg-[#080e1d]">

            <div className="flex flex-col gap-3 p-4 opacity-50">
              <div className="h-2 w-3/4 rounded bg-[#c0c1ff]/20" />
              <div className="h-2 w-1/2 rounded bg-[#c7c4d7]/20" />
              <div className="h-2 w-5/6 rounded bg-[#c7c4d7]/20" />
            </div>

            <div className="absolute right-4 top-4 text-5xl font-bold text-[#c0c1ff]">
              94%
            </div>

          </div>

        </div>

        {/* Skill Gap */}
        <div className="glass-panel rounded-xl p-6 transition duration-300 hover:-translate-y-1">

          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg border border-[#464554]/30 bg-[#242a3a] text-[#ffb783]">
            <Target size={24} />
          </div>

          <h3 className="mb-2 text-2xl font-semibold">
            Skill Gap Analysis
          </h3>

          <p className="text-[#c7c4d7]">
            We compare your resume against real-time job descriptions to
            highlight critical missing keywords.
          </p>

        </div>

        {/* Resume Roast */}
        <div className="glass-panel rounded-xl p-6 transition duration-300 hover:-translate-y-1">

          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg border border-[#464554]/30 bg-[#242a3a] text-[#ffb4ab]">
            <Flame size={24} />
          </div>

          <h3 className="mb-2 text-2xl font-semibold">
            Resume Roast
          </h3>

          <p className="text-[#c7c4d7]">
            Get brutal, honest, and slightly humorous feedback to shock your
            resume out of mediocrity.
          </p>

        </div>

        {/* Deep Insights */}
        <div className="glass-panel flex flex-col items-center gap-6 rounded-xl p-6 transition duration-300 hover:-translate-y-1 sm:flex-row md:col-span-2">

          <div className="flex-1">

            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg border border-[#464554]/30 bg-[#242a3a] text-[#d0bcff]">
              <TrendingUp size={24} />
            </div>

            <h3 className="mb-2 text-2xl font-semibold">
              Deep Industry Insights
            </h3>

            <p className="text-[#c7c4d7]">
              Tailor your profile based on data aggregated from thousands of
              successful hires in your specific field.
            </p>

          </div>

          <div className="h-32 w-full rounded-lg border border-[#464554]/20 bg-[#080e1d] sm:w-1/3">
            <div className="flex h-full items-center justify-center text-[#c0c1ff] opacity-70">
              <TrendingUp size={48} />
            </div>
          </div>

        </div>

      </div>

    </section>
  );
};

export default Features;
