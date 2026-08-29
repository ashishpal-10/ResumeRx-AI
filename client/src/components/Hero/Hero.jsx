const Hero = () => {
  return (
    <section className="relative flex flex-col items-center py-10 text-center md:py-16">

      <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#464554]/30 bg-[#151b2b] px-4 py-2">
        <span className="text-sm text-[#c0c1ff]">
          ✨
        </span>

        <span className="text-xs uppercase tracking-widest text-[#c7c4d7]">
          ResumeRx AI v2.0 Live
        </span>
      </div>

      <h1 className="mb-6 max-w-4xl text-4xl font-bold leading-tight text-[#dde2f8] md:text-6xl">
        Get Your Resume Reviewed by{" "}
        <span className="bg-gradient-to-r from-[#c0c1ff] to-[#d0bcff] bg-clip-text text-transparent">
          AI in Seconds
        </span>
      </h1>

      <p className="mb-10 max-w-2xl text-base leading-relaxed text-[#c7c4d7] md:text-lg">
        Upload your resume and receive an ATS score, personalized feedback,
        missing skills, grammar suggestions, and a fun AI roast. Precision
        engineered for your career growth.
      </p>

      <div className="flex w-full flex-col items-center gap-4 sm:w-auto sm:flex-row">

        <button className="flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-[#8083ff] to-[#571bc1] px-8 font-medium text-[#0d0096] transition hover:brightness-110 sm:w-auto">
          Analyze Resume
          <span>→</span>
        </button>

        <button className="flex h-12 w-full items-center justify-center rounded-lg border border-[#464554] px-8 font-medium text-[#dde2f8] transition hover:border-[#c0c1ff]/50 hover:bg-[#191f2f] sm:w-auto">
          View Demo
        </button>

      </div>

    </section>
  );
};

export default Hero;