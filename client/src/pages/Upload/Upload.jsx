import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Upload,
  FileText,
  X,
  Sparkles,
  Loader2,
  AlertCircle,
} from "lucide-react";

import Sidebar from "../../components/Dashboard/Sidebar";

import {
  uploadResume,
  analyzeResume,
} from "../../services/resumeApi";

const UploadPage = () => {
  const navigate = useNavigate();

  const [file, setFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");

  const fileInputRef = useRef(null);

  // File validation
  const handleFile = (selectedFile) => {
    if (!selectedFile) return;

    const allowedTypes = [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    if (!allowedTypes.includes(selectedFile.type)) {
      setError("Please upload a PDF or DOCX file.");
      return;
    }

    // Optional: 5MB limit
    const maxSize = 5 * 1024 * 1024;

    if (selectedFile.size > maxSize) {
      setError("File size must be less than 5MB.");
      return;
    }

    setError("");
    setFile(selectedFile);
  };

  // Input change
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    handleFile(selectedFile);
  };

  // Drag over
  const handleDragOver = (e) => {
    e.preventDefault();

    setIsDragging(true);
  };

  // Drag leave
  const handleDragLeave = (e) => {
    e.preventDefault();

    setIsDragging(false);
  };

  // Drop file
  const handleDrop = (e) => {
    e.preventDefault();

    setIsDragging(false);

    const droppedFile = e.dataTransfer.files[0];

    handleFile(droppedFile);
  };

  // Remove file
  const handleRemoveFile = () => {
    setFile(null);
    setError("");
    setStatus("");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Format file size
  const formatFileSize = (bytes) => {
    if (!bytes) return "";

    const mb = bytes / (1024 * 1024);

    if (mb < 1) {
      return `${(bytes / 1024).toFixed(1)} KB`;
    }

    return `${mb.toFixed(1)} MB`;
  };

  // Upload + Analyze
  const handleAnalyze = async () => {
    if (!file) {
      setError("Please select a resume first.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      // Step 1: Upload Resume
      setStatus("Uploading your resume...");

      const uploadData = await uploadResume(file);

      console.log("Upload Response:", uploadData);

      const resumeId =
        uploadData?.resume?._id ||
        uploadData?.resume?.id;

      if (!resumeId) {
        throw new Error("Resume ID was not received.");
      }

      // Step 2: Analyze Resume
      setStatus("AI is analyzing your resume...");

      const analysisData = await analyzeResume(resumeId);

      console.log(
        "Analysis Response:",
        analysisData
      );

      if (!analysisData?.success) {
        throw new Error(
          analysisData?.message ||
            "Resume analysis failed."
        );
      }

      setStatus("Analysis completed!");

      // Save latest report temporarily
      localStorage.setItem(
        "currentReport",
        JSON.stringify(analysisData.report)
      );

      const reportId = analysisData.report?._id;

      if (!reportId) {
        throw new Error("Report ID was not received.");
      }

      // Navigate to Report Page
      setTimeout(() => {
        navigate(`/analytics/${reportId}`);
      }, 500);
    } catch (error) {
      console.error("Analysis Error:", error);

      setError(
        error.response?.data?.message ||
          error.response?.data?.error ||
          error.message ||
          "Something went wrong while analyzing your resume."
      );

      setStatus("");
    } finally {
      setLoading(false);
    }
  };

  // Demo Resume
  const handleDemoResume = () => {
    alert(
      "Demo resume functionality will be added later."
    );
  };

  return (
    <div className="min-h-screen bg-[#0d1322] text-[#dde2f8]">
      {/* Sidebar */}
      <Sidebar activePage="Upload" />

      {/* Background Glow */}
      <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(circle_at_50%_-20%,rgba(99,102,241,0.15),transparent_70%)]" />

      {/* Main Content */}
      <main className="relative z-10 ml-0 flex min-h-screen flex-col items-center justify-center px-4 py-10 md:ml-64 md:px-12">
        <div className="flex w-full max-w-3xl flex-col items-center">

          {/* Heading */}
          <header className="mb-10 text-center">
            <h1 className="bg-gradient-to-r from-[#c0c1ff] to-[#d0bcff] bg-clip-text text-4xl font-bold text-transparent md:text-5xl">
              Upload Resume
            </h1>

            <p className="mt-3 text-base text-[#c7c4d7] md:text-lg">
              Our AI will parse, analyze, and optimize
              your document.
            </p>
          </header>

          {/* Error Message */}
          {error && (
            <div className="mb-6 flex w-full items-center gap-3 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-red-300">
              <AlertCircle size={20} />

              <p className="text-sm">
                {error}
              </p>
            </div>
          )}

          {/* Upload Zone */}
          {!file && (
            <div
              onClick={() =>
                !loading &&
                fileInputRef.current?.click()
              }
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`group flex min-h-[300px] w-full flex-col items-center justify-center rounded-xl border border-dashed p-10 text-center backdrop-blur-xl transition-all duration-300 ${
                isDragging
                  ? "border-[#c0c1ff] bg-[#c0c1ff]/10 shadow-[0_0_25px_rgba(99,102,241,0.2)]"
                  : "cursor-pointer border-[#c0c1ff]/30 bg-[#151b2b]/60 hover:-translate-y-1 hover:border-[#c0c1ff]/80 hover:shadow-[0_0_20px_rgba(99,102,241,0.15)]"
              }`}
            >
              <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-[#c0c1ff]/10 text-[#c0c1ff] transition group-hover:scale-110">
                <Upload size={42} />
              </div>

              <h2 className="text-2xl font-semibold text-[#dde2f8]">
                Drop your resume here
              </h2>

              <p className="mt-2 text-[#c7c4d7]">
                PDF or DOCX files
              </p>

              <p className="mt-5 text-sm text-[#908fa0]">
                or click to browse files
              </p>

              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.docx"
                onChange={handleFileChange}
                className="hidden"
              />
            </div>
          )}

          {/* Selected File */}
          {file && (
            <div className="glass-panel flex w-full items-center justify-between rounded-xl border border-[#c0c1ff]/10 bg-[#151b2b]/70 p-5">
              <div className="flex min-w-0 items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[#c0c1ff]/10 text-[#c0c1ff]">
                  <FileText size={24} />
                </div>

                <div className="min-w-0">
                  <p className="truncate font-medium text-[#dde2f8]">
                    {file.name}
                  </p>

                  <p className="mt-1 text-sm text-[#c7c4d7]">
                    {formatFileSize(file.size)}
                    {" • "}
                    {loading
                      ? status
                      : "Ready for analysis"}
                  </p>
                </div>
              </div>

              {!loading && (
                <button
                  onClick={handleRemoveFile}
                  className="ml-4 flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-[#c7c4d7] transition hover:bg-[#2f3445] hover:text-[#ffb4ab]"
                  title="Remove file"
                >
                  <X size={20} />
                </button>
              )}
            </div>
          )}

          {/* Analysis Status */}
          {loading && (
            <div className="mt-6 flex items-center gap-3 text-[#c0c1ff]">
              <Loader2
                size={20}
                className="animate-spin"
              />

              <p className="text-sm">
                {status}
              </p>
            </div>
          )}

          {/* Buttons */}
          <div className="mt-8 flex w-full max-w-md flex-col gap-4 sm:flex-row">

            {/* Analyze Button */}
            <button
              disabled={!file || loading}
              onClick={handleAnalyze}
              className={`flex h-12 flex-1 items-center justify-center gap-2 rounded-lg px-6 text-sm font-semibold transition-all ${
                file && !loading
                  ? "bg-gradient-to-r from-[#8083ff] to-[#571bc1] text-white hover:-translate-y-0.5 hover:brightness-110 hover:shadow-[0_0_15px_rgba(128,131,255,0.3)]"
                  : "cursor-not-allowed border border-white/10 bg-[#151b2b]/80 text-white/30"
              }`}
            >
              {loading ? (
                <>
                  <Loader2
                    size={18}
                    className="animate-spin"
                  />

                  Analyzing...
                </>
              ) : (
                <>
                  <Sparkles size={18} />

                  Analyze Resume
                </>
              )}
            </button>

            {/* Demo Button */}
            <button
              onClick={handleDemoResume}
              disabled={loading}
              className="h-12 flex-1 rounded-lg border border-[#464554]/40 px-6 text-sm font-medium text-[#c7c4d7] transition hover:border-[#c0c1ff]/40 hover:bg-[#2f3445]/50 hover:text-[#dde2f8] disabled:cursor-not-allowed disabled:opacity-50"
            >
              Use Demo Resume
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UploadPage;