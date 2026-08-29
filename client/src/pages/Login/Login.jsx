import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

import { loginUser } from "../../services/authapi";

const Image = "/screen.png";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      const data = await loginUser({
        email,
        password,
      });

      // Save JWT token
      localStorage.setItem("token", data.token);

      // Save user information
      if (data.user) {
        localStorage.setItem(
          "user",
          JSON.stringify(data.user)
        );
      }

      // Redirect to dashboard
      navigate("/dashboard");
    } catch (error) {
      setError(
        error.response?.data?.message ||
          error.response?.data?.error ||
          "Invalid email or password"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0d1322] text-[#dde2f8] font-sans flex flex-col md:flex-row">
      {/* Left Side - Login */}
      <div className="relative z-10 flex min-h-screen w-full items-center justify-center p-4 md:w-1/2 md:p-12">
        <div
          className="
            group relative w-full max-w-[440px] overflow-hidden rounded-2xl
            border border-[#c0c1ff]/10
            bg-[rgba(17,24,39,0.7)]
            p-6 shadow-2xl
            backdrop-blur-xl
            md:p-10
          "
        >
          {/* Top gradient line */}
          <div
            className="
              absolute left-0 top-0 h-px w-full
              bg-gradient-to-r from-transparent via-[#8083ff] to-transparent
              opacity-50 transition-opacity duration-500
              group-hover:opacity-100
            "
          />

          {/* Logo */}
          <div className="mb-6 text-center">
            <h1 className="mb-1 text-4xl font-bold tracking-tight text-[#c0c1ff] md:text-5xl">
              ResumeRx AI
            </h1>

            <p className="text-sm text-[#c7c4d7] md:text-base">
              Precision Engineered Career Growth
            </p>
          </div>

          {/* Welcome */}
          <h2 className="mb-4 text-center text-2xl font-semibold text-[#dde2f8]">
            Welcome Back
          </h2>

          {/* Social Login */}
          <div className="mb-6 flex flex-col gap-3">
            <button
              type="button"
              className="
                flex h-12 w-full items-center justify-center gap-3 rounded-lg
                border border-[#c0c1ff]/20
                text-sm font-medium text-[#dde2f8]
                transition-all duration-300
                hover:border-[#c0c1ff]/50
                hover:bg-[#c0c1ff]/10
              "
            >
              Continue with Google
            </button>

            <button
              type="button"
              className="
                flex h-12 w-full items-center justify-center gap-3 rounded-lg
                border border-[#c0c1ff]/20
                text-sm font-medium text-[#dde2f8]
                transition-all duration-300
                hover:border-[#c0c1ff]/50
                hover:bg-[#c0c1ff]/10
              "
            >
              Continue with GitHub
            </button>
          </div>

          {/* Divider */}
          <div className="mb-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-[#464554]/30" />

            <span className="text-xs font-semibold uppercase tracking-wider text-[#c7c4d7]">
              Or
            </span>

            <div className="h-px flex-1 bg-[#464554]/30" />
          </div>

          {/* Error */}
          {error && (
            <div className="mb-4 rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-center text-sm text-red-400">
              {error}
            </div>
          )}

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4"
          >
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="mb-1 block text-xs font-semibold text-[#c7c4d7]"
              >
                Email Address
              </label>

              <input
                type="email"
                id="email"
                placeholder="you@example.com"
                required
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                className="
                  h-12 w-full rounded-lg
                  border border-[#464554]/50
                  bg-[rgba(17,24,39,0.5)]
                  px-4
                  text-[#dde2f8]
                  placeholder:text-[#c7c4d7]/50
                  transition-all duration-300
                  outline-none
                  focus:border-[#6366F1]
                  focus:ring-2
                  focus:ring-[#6366F1]/50
                "
              />
            </div>

            {/* Password */}
            <div>
              <div className="mb-1 flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="text-xs font-semibold text-[#c7c4d7]"
                >
                  Password
                </label>

                <button
                  type="button"
                  className="text-xs font-semibold text-[#c0c1ff] transition-colors hover:text-[#8083ff]"
                >
                  Forgot?
                </button>
              </div>

              <input
                type="password"
                id="password"
                placeholder="••••••••"
                required
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                className="
                  h-12 w-full rounded-lg
                  border border-[#464554]/50
                  bg-[rgba(17,24,39,0.5)]
                  px-4
                  text-[#dde2f8]
                  placeholder:text-[#c7c4d7]/50
                  transition-all duration-300
                  outline-none
                  focus:border-[#6366F1]
                  focus:ring-2
                  focus:ring-[#6366F1]/50
                "
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="
                mt-1 flex h-12 w-full items-center justify-center gap-2 rounded-lg
                bg-gradient-to-br from-[#6366F1] to-[#8B5CF6]
                text-sm font-medium text-white
                transition-all duration-300
                hover:-translate-y-0.5
                hover:brightness-110
                hover:shadow-[0_0_20px_rgba(139,92,246,0.5)]
                disabled:cursor-not-allowed
                disabled:opacity-60
              "
            >
              {loading ? "Signing In..." : "Sign In"}

              {!loading && <ArrowRight size={18} />}
            </button>
          </form>

          {/* Signup */}
          <div className="mt-6 text-center">
            <p className="text-sm text-[#c7c4d7] md:text-base">
              Don't have an account?{" "}

              <button
                type="button"
                onClick={() => navigate("/signup")}
                className="font-medium text-[#c0c1ff] transition-colors hover:text-[#8083ff]"
              >
                Sign up for a free account
              </button>
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Hero */}
      <div className="relative hidden w-1/2 overflow-hidden bg-[#080e1d] md:block">
        <img
          src={Image}
          alt="Resume Analysis"
          className="h-full w-full object-cover"
        />

        {/* Overlays */}
        <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-r from-[#0d1322] to-transparent opacity-80" />

        <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-[#0d1322] via-transparent to-transparent opacity-90" />

        {/* AI Card */}
        <div className="absolute bottom-12 left-12 right-12 z-20">
          <div
            className="
              inline-block rounded-xl border
              border-[#c0c1ff]/10
              border-l-4 border-l-[#c0c1ff]
              bg-[rgba(17,24,39,0.7)]
              p-6
              backdrop-blur-xl
            "
          >
            <div className="mb-2 flex items-center gap-3">
              <CheckCircle2
                size={24}
                className="text-[#c0c1ff]"
              />

              <h3 className="text-2xl font-semibold text-[#dde2f8]">
                AI-Powered Analysis
              </h3>
            </div>

            <p className="max-w-md text-base leading-6 text-[#c7c4d7]">
              Optimize your resume against ATS algorithms in
              real-time. Land more interviews with data-driven
              insights.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;