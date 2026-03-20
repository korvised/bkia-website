"use client";

import { useState } from "react";
import { FileText, Download, Loader2 } from "lucide-react";

interface AuctionDownloadButtonProps {
  href: string;
  fileName: string;
}

export function AuctionDownloadButton({ href, fileName }: AuctionDownloadButtonProps) {
  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const res = await fetch(href);
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch {
      window.open(href, "_blank");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleDownload}
      disabled={loading}
      className="group flex w-full items-center gap-3 rounded-lg border border-gray-200 bg-gray-50 p-3.5 text-left transition-all hover:border-[#00AAAC] hover:bg-[#f0fbfc] disabled:cursor-wait disabled:opacity-70"
    >
      <div className="rounded-lg bg-white p-2">
        <FileText className="h-5 w-5 text-[#00AAAC]" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-gray-900 group-hover:text-[#00AAAC]">
          {fileName}
        </p>
      </div>
      {loading ? (
        <Loader2 className="h-4 w-4 shrink-0 animate-spin text-[#00AAAC]" />
      ) : (
        <Download className="h-4 w-4 shrink-0 text-gray-400 group-hover:text-[#00AAAC]" />
      )}
    </button>
  );
}
