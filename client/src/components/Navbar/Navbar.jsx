const Navbar = () => {
  return (
    <nav className="fixed left-0 top-0 z-50 flex h-16 w-full items-center justify-between border-b border-[#464554]/30 bg-[#0d1322]/70 px-4 backdrop-blur-xl md:px-12">
      
      <div className="text-xl font-bold text-[#c0c1ff]">
        ResumeRx AI
      </div>

      <div className="hidden items-center gap-8 md:flex">
        <a href="#features" className="text-sm text-[#c7c4d7] transition hover:text-[#c0c1ff]">
          Features
        </a>

        <a href="#pricing" className="text-sm text-[#c7c4d7] transition hover:text-[#c0c1ff]">
          Pricing
        </a>

        <a href="#faq" className="text-sm text-[#c7c4d7] transition hover:text-[#c0c1ff]">
          FAQ
        </a>

        <a href="#about" className="text-sm text-[#c7c4d7] transition hover:text-[#c0c1ff]">
          About
        </a>
      </div>

      <div className="flex items-center gap-4">
        <button className="hidden text-sm text-[#c7c4d7] transition hover:text-[#c0c1ff] sm:block">
          Login
        </button>

        <button className="rounded-lg bg-gradient-to-r from-[#8083ff] to-[#571bc1] px-4 py-2 text-sm font-medium text-[#0d0096] transition hover:brightness-110">
          Get Started
        </button>
      </div>

    </nav>
  );
};

export default Navbar;