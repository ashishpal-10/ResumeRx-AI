import { UploadCloud } from "lucide-react";

const QuickScan = () => {
  return (
    <div className="glass-panel flex h-64 flex-col items-center justify-center rounded-xl border-2 border-dashed border-[#c0c1ff]/40 bg-[#151b2b]/50 p-6 text-center">
      
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#c0c1ff]/10 text-[#c0c1ff]">
        <UploadCloud size={32} />
      </div>

      <h3 className="text-xl font-semibold">
        Quick Scan
      </h3>

      <p className="mb-4 mt-2 text-sm text-[#c7c4d7]">
        Drag and drop your resume or click to browse files.
      </p>

      <button className="rounded-lg border border-[#464554]/50 bg-[#242a3a] px-6 py-2 text-sm transition hover:border-[#c0c1ff]">
        Browse Files
      </button>
    </div>
  );
};

export default QuickScan;