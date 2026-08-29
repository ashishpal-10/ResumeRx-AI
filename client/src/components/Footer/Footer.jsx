const Footer = () => {
  return (
    <footer className="flex flex-col items-center justify-between gap-6 border-t border-[#464554]/10 bg-[#0d1322] px-4 py-10 md:flex-row md:px-12">

      <div className="text-sm font-semibold text-[#dde2f8]">
        © 2026 ResumeRx AI. Precision Engineered.
      </div>

      <div className="flex flex-wrap justify-center gap-5">
        <a href="#" className="text-[#c7c4d7] transition hover:text-[#c0c1ff]">
          Privacy Policy
        </a>

        <a href="#" className="text-[#c7c4d7] transition hover:text-[#c0c1ff]">
          Terms of Service
        </a>

        <a href="#" className="text-[#c7c4d7] transition hover:text-[#c0c1ff]">
          Contact Support
        </a>

        <a href="#" className="text-[#c7c4d7] transition hover:text-[#c0c1ff]">
          Security
        </a>
      </div>

    </footer>
  );
};

export default Footer;