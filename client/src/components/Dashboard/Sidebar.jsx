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
} from "lucide-react";

const Sidebar = () => {
  const navigate = useNavigate();

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

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <aside className="fixed left-0 top-0 z-50 flex h-screen w-64 flex-col border-r border-white/10 bg-[#1b2230] p-3 text-white">
      
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
          onClick={() => navigate("/upgrade")}
          className="mb-3 flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-[#8185ef] to-[#5b20c5] py-3 text-sm font-medium"
        >
          <Zap size={17} />
          Upgrade to Pro
        </button>

        <div className="border-t border-white/10 pt-3">
          <NavLink
            to="/help"
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
    </aside>
  );
};

export default Sidebar;