import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  CheckCircle2,
  User,
  Mail,
  Lock,
} from "lucide-react";

import { registerUser } from "../../services/authapi";

const Image = "/screen.png";

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");
      setSuccess("");

      const data = await registerUser(formData);

      setSuccess(
        data.message || "Account created successfully!"
      );

      setFormData({
        name: "",
        email: "",
        password: "",
      });

      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (error) {
      setError(
        error.response?.data?.message ||
          error.response?.data?.error ||
          "Signup failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0d1322] text-[#dde2f8] font-sans flex flex-col md:flex-row">
      {/* Left Side - Signup Form */}
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
          {/* Top Gradient */}
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

          {/* Heading */}
          <h2 className="mb-2 text-center text-2xl font-semibold">
            Create Account
          </h2>

          <p className="mb-6 text-center text-sm text-[#c7c4d7]">
            Start optimizing your resume with AI.
          </p>

          {/* Social Signup */}
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
              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="Google"
                className="h-5 w-5"
              />

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

          {/* Error Message */}
          {error && (
            <div className="mb-4 rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-center text-sm text-red-400">
              {error}
            </div>
          )}

          {/* Success Message */}
          {success && (
            <div className="mb-4 rounded-lg border border-green-500/30 bg-green-500/10 p-3 text-center text-sm text-green-400">
              {success}
            </div>
          )}

          {/* Signup Form */}
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4"
          >
            {/* Name */}
            <div>
              <label className="mb-1 block text-xs font-semibold text-[#c7c4d7]">
                Full Name
              </label>

              <div className="relative">
                <User
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[#c7c4d7]"
                />

                <input
                  type="text"
                  name="name"
                  placeholder="Enter your name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="
                    h-12 w-full rounded-lg
                    border border-[#464554]/50
                    bg-[rgba(17,24,39,0.5)]
                    px-4 pl-10
                    text-[#dde2f8]
                    placeholder:text-[#c7c4d7]/50
                    outline-none transition-all
                    focus:border-[#6366F1]
                    focus:ring-2 focus:ring-[#6366F1]/50
                  "
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="mb-1 block text-xs font-semibold text-[#c7c4d7]">
                Email Address
              </label>

              <div className="relative">
                <Mail
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[#c7c4d7]"
                />

                <input
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="
                    h-12 w-full rounded-lg
                    border border-[#464554]/50
                    bg-[rgba(17,24,39,0.5)]
                    px-4 pl-10
                    text-[#dde2f8]
                    placeholder:text-[#c7c4d7]/50
                    outline-none transition-all
                    focus:border-[#6366F1]
                    focus:ring-2 focus:ring-[#6366F1]/50
                  "
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="mb-1 block text-xs font-semibold text-[#c7c4d7]">
                Password
              </label>

              <div className="relative">
                <Lock
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[#c7c4d7]"
                />

                <input
                  type="password"
                  name="password"
                  placeholder="Create a password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="
                    h-12 w-full rounded-lg
                    border border-[#464554]/50
                    bg-[rgba(17,24,39,0.5)]
                    px-4 pl-10
                    text-[#dde2f8]
                    placeholder:text-[#c7c4d7]/50
                    outline-none transition-all
                    focus:border-[#6366F1]
                    focus:ring-2 focus:ring-[#6366F1]/50
                  "
                />
              </div>
            </div>

            {/* Signup Button */}
            <button
              type="submit"
              disabled={loading}
              className="
                mt-2 flex h-12 w-full items-center justify-center gap-2
                rounded-lg bg-gradient-to-br from-[#6366F1] to-[#8B5CF6]
                text-sm font-medium text-white
                transition-all duration-300
                hover:-translate-y-0.5
                hover:brightness-110
                hover:shadow-[0_0_20px_rgba(139,92,246,0.5)]
                disabled:cursor-not-allowed
                disabled:opacity-60
              "
            >
              {loading ? "Creating Account..." : "Create Account"}

              {!loading && <ArrowRight size={18} />}
            </button>
          </form>

          {/* Login */}
          <div className="mt-6 text-center">
            <p className="text-sm text-[#c7c4d7]">
              Already have an account?{" "}

              <button
                type="button"
                onClick={() => navigate("/login")}
                className="font-medium text-[#c0c1ff] transition-colors hover:text-[#8083ff]"
              >
                Sign In
              </button>
            </p>
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className="relative hidden w-1/2 overflow-hidden bg-[#080e1d] md:block">
        <img
          src={Image}
          alt="Resume analysis"
          className="absolute inset-0 h-full w-full object-cover opacity-60"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-[#0d1322] to-transparent opacity-80" />

        <div className="absolute inset-0 bg-gradient-to-t from-[#0d1322] via-transparent to-transparent opacity-90" />

        <div className="absolute bottom-8 left-8 right-8 z-20">
          <div
            className="
              rounded-xl border border-[#c0c1ff]/10
              border-l-4 border-l-[#c0c1ff]
              bg-[rgba(17,24,39,0.7)]
              p-6 backdrop-blur-xl
            "
          >
            <div className="mb-2 flex items-center gap-3">
              <CheckCircle2
                size={24}
                className="text-[#c0c1ff]"
              />

              <h3 className="text-2xl font-semibold">
                AI-Powered Analysis
              </h3>
            </div>

            <p className="max-w-md text-base leading-6 text-[#c7c4d7]">
              Create your account and optimize your resume with
              AI-powered insights.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;