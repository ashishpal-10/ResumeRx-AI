import { useNavigate } from "react-router-dom";
import { UploadCloud } from "lucide-react";

const QuickScan = () => {
  const navigate = useNavigate();

  const goToUpload = () => navigate("/upload");

  return (
    <div
      onClick={goToUpload}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          goToUpload();
        }
      }}
      onDragOver={(event) => event.preventDefault()}
      onDrop={(event) => {
        event.preventDefault();
        goToUpload();
      }}
      role="button"
      tabIndex={0}
      aria-label="Quick scan: upload a resume for analysis"
      className="glass-panel group flex h-82 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-[#c0c1ff]/40 bg-[#151b2b]/50 p-6 text-center"
    >
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#c0c1ff]/10 text-[#c0c1ff]">
        <UploadCloud size={32} />
      </div>

      <h3 className="text-xl font-semibold">
        Quick Scan
      </h3>

      <p className="mb-4 mt-2 text-sm text-[#c7c4d7]">
        Drag and drop your resume or click to browse files.
      </p>

      <span className="rounded-lg border border-[#464554]/50 bg-[#242a3a] px-6 py-2 text-sm transition group-hover:border-[#c0c1ff]">
        Browse Files
      </span>
    </div>
  );
};

export default QuickScan;
