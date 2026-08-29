import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import {
  LayoutDashboard,
  CloudUpload,
  BarChart3,
  Settings,
  CircleHelp,
  LogOut,
  Zap,
  Sparkles,
  Menu,
  X,
} from "lucide-react";

const Sidebar = () => {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  const closeDrawer = () => setOpen(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    closeDrawer();
    navigate("/");
  };

  const navItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Upload",
      path: "/upload",
      icon: CloudUpload,
    },
    {
      name: "Analytics",
      path: "/analytics",
      icon: BarChart3,
    },
    {
      name: "Settings",
      path: "/settings",
      icon: Settings,
    },
  ];

  const content = (
    <>
      {/* Logo */}
      <div className="mb-8 flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#2b3447]">
          <Sparkles size={18} className="text-[#b9b8ff]" />
        </div>

        <div>
          <h1 className="font-semibold">ResumeRx AI</h1>
          <p className="text-xs text-gray-400">Premium Tier</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-2">
        {navItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.name}
              to={item.path}
              onClick={closeDrawer}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-4 py-3 text-sm transition ${
                  isActive
                    ? "bg-gradient-to-r from-[#7c80e8] to-[#6b6fd6] text-white"
                    : "text-gray-400 hover:bg-white/5 hover:text-white"
                }`
              }
            >
              <Icon size={18} />
              {item.name}
            </NavLink>
          );
        })}
      </nav>

      {/* Bottom Section */}
      <div className="mt-auto">
        
        {/* Upgrade */}
        <button
          onClick={() => {
            closeDrawer();
            navigate("/upgrade");
          }}
          className="mb-3 flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-[#8185ef] to-[#5b20c5] py-3 text-sm font-medium"
        >
          <Zap size={17} />
          Upgrade to Pro
        </button>

        <div className="border-t border-white/10 pt-3">
          <NavLink
            to="/help"
            onClick={closeDrawer}
            className="mb-2 flex items-center gap-3 rounded-lg px-3 py-3 text-sm text-gray-400 hover:bg-white/5"
          >
            <CircleHelp size={18} />
            Help Center
          </NavLink>

          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-sm text-red-300 hover:bg-red-500/10"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile Top Bar */}
      <div className="fixed left-0 right-0 top-0 z-40 flex h-18 items-center justify-between border-b border-[#2f3445]/60 bg-[#0d1322]/90 px-4 backdrop-blur-xl md:hidden">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#2b3447]">
            <Sparkles size={16} className="text-[#b9b8ff]" />
          </div>

          <span className="text-base font-bold text-[#c0c1ff]">
            ResumeRx AI
          </span>
        </div>

        <button
          onClick={() => setOpen(true)}
          className="flex h-10 w-10 items-center justify-center rounded-lg text-[#c7c4d7] transition hover:bg-white/5 hover:text-[#c0c1ff]"
          aria-label="Open menu"
        >
          <Menu size={22} />
        </button>
      </div>

      {/* Backdrop */}
      {open && (
        <div
          onClick={closeDrawer}
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
          aria-hidden="true"
        />
      )}

      {/* Mobile Drawer */}
      <aside
        className={`fixed inset-y-0  right-0 z-50 flex w-64 flex-col border-r border-white/10 bg-[#1b2230] p-3 text-white transition-transform duration-300 md:hidden ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <button
          onClick={closeDrawer}
          className="mb-2 flex h-10 w-10 items-center justify-center self-end rounded-lg text-[#c7c4d7] transition hover:bg-white/5 hover:text-[#c0c1ff]"
          aria-label="Close menu"
        >
          <X size={20} />
        </button>

        {content}
      </aside>

      {/* Desktop Sidebar */}
      <aside className="fixed left-0 top-0 z-50 hidden h-screen w-64 flex-col border-r border-white/10 bg-[#1b2230] p-3 text-white md:flex">
        {content}
      </aside>
    </>
  );
};

export default Sidebar;
