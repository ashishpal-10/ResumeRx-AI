import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogin = () => {
    navigate("/login");
  };

  const handleSignup = () => {
    navigate("/signup");
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className="fixed left-0 top-0 z-50 flex h-16 w-full items-center justify-between border-b border-[#464554]/30 bg-[#0d1322]/70 px-4 backdrop-blur-xl md:px-12">
      
      <div className="text-xl font-bold text-[#c0c1ff]">
        ResumeRx AI
      </div>

      {/* Desktop Nav */}
      <div className="hidden items-center gap-8 md:flex">
        <a href="#features" className="text-sm text-[#c7c4d7] transition hover:text-[#c0c1ff]">
          Home
        </a>

        <a href="#features" className="text-sm text-[#c7c4d7] transition hover:text-[#c0c1ff]">
          Features
        </a>

        <a href="#features" className="text-sm text-[#c7c4d7] transition hover:text-[#c0c1ff]">
          Prices
        </a>

        <a href="#features" className="text-sm text-[#c7c4d7] transition hover:text-[#c0c1ff]">
          Blogs
        </a>
      </div>

      <div className="hidden items-center gap-4 md:flex">
        <button className="text-sm text-[#c7c4d7] transition hover:text-[#c0c1ff]"
          onClick={handleLogin}
        >
          Login
        </button>

        <button className="rounded-lg bg-gradient-to-r from-[#8083ff] to-[#571bc1] px-4 py-2 text-sm font-semibold text-white transition hover:brightness-110"
          onClick={handleSignup}
        >
          Get Started
        </button>
      </div>

      {/* Mobile Hamburger */}
      <button
        onClick={() => setMenuOpen((prev) => !prev)}
        className="flex h-20 w-10 items-center justify-center rounded-lg text-[#c7c4d7] transition hover:bg-white/5 hover:text-[#c0c1ff] md:hidden"
        aria-label="Toggle menu"
      >
        {menuOpen ? <X size={22} /> : <Menu size={22} />}
      </button>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="absolute left-0 right-0 top-16 z-40 border-b border-[#464554]/30 bg-[#0d1322]/95 px-4 py-5 backdrop-blur-xl md:hidden">
          <div className="flex flex-col gap-2">
            <a
              href="#features"
              onClick={closeMenu}
              className="rounded-lg px-3 py-3 text-sm text-[#c7c4d7] transition hover:bg-white/5 hover:text-[#c0c1ff]"
            >
              Home
            </a>

             <a
              href="#features"
              onClick={closeMenu}
              className="rounded-lg px-3 py-3 text-sm text-[#c7c4d7] transition hover:bg-white/5 hover:text-[#c0c1ff]"
            >
              Features
            </a>

             <a
              href="#features"
              onClick={closeMenu}
              className="rounded-lg px-3 py-3 text-sm text-[#c7c4d7] transition hover:bg-white/5 hover:text-[#c0c1ff]"
            >
              Prices
            </a>

             <a
              href="#features"
              onClick={closeMenu}
              className="rounded-lg px-3 py-3 text-sm text-[#c7c4d7] transition hover:bg-white/5 hover:text-[#c0c1ff]"
            >
              Blogs
            </a>

            <button
              onClick={() => {
                closeMenu();
                handleLogin();
              }}
              className="rounded-lg px-3 py-3 text-left text-sm text-[#c7c4d7] transition hover:bg-white/5 hover:text-[#c0c1ff]"
            >
              Login
            </button>

            <button
              onClick={() => {
                closeMenu();
                handleSignup();
              }}
              className="mt-1 rounded-lg bg-gradient-to-r from-[#8083ff] to-[#571bc1] px-4 py-3 text-sm font-semibold text-white transition hover:brightness-110"
            >
              Get Started
            </button>
          </div>
        </div>
      )}

    </nav>
  );
};

export default Navbar;
