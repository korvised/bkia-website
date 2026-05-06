import { useRef, useState } from "react";
import {
  LuTriangle,
  LuArchive,
  LuCheck,
  LuDatabase,
  LuHardDriveUpload,
  LuRefreshCw,
  LuUpload,
  LuX,
} from "react-icons/lu";
import { Breadcrumb } from "@/components/ui";
import { cn } from "@/lib";
import { alertService } from "@/services";
import {
  useFetchBackupsQuery,
  useRestoreFromExistingMutation,
  useRestoreFromUploadMutation,
} from "@/features/backup/api";

export function RestorePage() {
  const { data: backups = [], isLoading: loadingBackups } = useFetchBackupsQuery();
  const [restoreFromExisting, { isLoading: restoringExisting }] = useRestoreFromExistingMutation();
  const [restoreFromUpload, { isLoading: restoringUpload }] = useRestoreFromUploadMutation();

  const [selectedFileName, setSelectedFileName] = useState("");
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const isRestoring = restoringExisting || restoringUpload;

  const handleRestoreExisting = async () => {
    if (!selectedFileName) return;

    const result = await alertService.confirmModal(
      "⚠️ Restore Database",
      `This will OVERWRITE the current database with "${selectedFileName}". All unsaved changes will be lost. Are you absolutely sure?`,
    );
    if (!result.isConfirmed) return;

    try {
      await restoreFromExisting(selectedFileName).unwrap();
      await alertService.success(
        "Restore Complete",
        "The database has been restored successfully.",
      );
      setSelectedFileName("");
    } catch (err: any) {
      await alertService.error(
        err?.data?.message ?? "Restore failed. Check server logs for details.",
        "Restore Failed",
      );
    }
  };

  const handleFileSelect = async (file: File) => {
    if (!file.name.endsWith(".sql") && !file.name.endsWith(".sql.gz")) {
      await alertService.error("Only .sql or .sql.gz files are accepted.", "Invalid File");
      return;
    }
    setUploadFile(file);
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) await handleFileSelect(file);
  };

  const handleRestoreUpload = async () => {
    if (!uploadFile) return;

    const result = await alertService.confirmModal(
      "⚠️ Restore Database",
      `This will OVERWRITE the current database with the uploaded file "${uploadFile.name}". Are you absolutely sure?`,
    );
    if (!result.isConfirmed) return;

    const fd = new FormData();
    fd.append("file", uploadFile);

    try {
      await restoreFromUpload(fd).unwrap();
      await alertService.success(
        "Restore Complete",
        "The database has been restored from the uploaded file.",
      );
      setUploadFile(null);
    } catch (err: any) {
      await alertService.error(
        err?.data?.message ?? "Restore failed. Check server logs for details.",
        "Restore Failed",
      );
    }
  };

  return (
    <div className="space-y-6">
      <Breadcrumb
        items={[
          { label: "Database" },
          { label: "Restore", icon: LuHardDriveUpload },
        ]}
      />

      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="rounded-lg bg-red-100 p-2">
          <LuDatabase className="h-6 w-6 text-red-600" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Database Restore</h1>
          <p className="text-sm text-gray-500">
            Restore the database from a backup file
          </p>
        </div>
      </div>

      {/* Danger banner */}
      <div className="flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 px-4 py-4">
        <LuTriangle className="mt-0.5 h-5 w-5 shrink-0 text-red-600" />
        <div>
          <p className="font-semibold text-red-800">Destructive Operation</p>
          <p className="mt-1 text-sm text-red-700">
            Restoring a backup will <strong>overwrite all current data</strong> in the
            database. This action cannot be undone. Make sure you have a recent backup
            before proceeding.
          </p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Section 1: Restore from existing backup */}
        <div className="rounded-lg border border-gray-200 bg-white p-6">
          <div className="mb-4 flex items-center gap-2">
            <LuArchive className="h-5 w-5 text-gray-600" />
            <h2 className="text-base font-semibold text-gray-900">
              Restore from Existing Backup
            </h2>
          </div>
          <p className="mb-4 text-sm text-gray-500">
            Select one of the backup files already stored on the server.
          </p>

          {loadingBackups ? (
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <LuRefreshCw className="h-4 w-4 animate-spin" />
              Loading backups…
            </div>
          ) : backups.length === 0 ? (
            <div className="rounded-md border border-dashed border-gray-200 px-4 py-6 text-center text-sm text-gray-400">
              No backups available. Create one on the Backup page first.
            </div>
          ) : (
            <div className="space-y-2">
              <select
                value={selectedFileName}
                onChange={(e) => setSelectedFileName(e.target.value)}
                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              >
                <option value="">— Select a backup —</option>
                {backups.map((b) => (
                  <option key={b.fileName} value={b.fileName}>
                    {b.fileName}
                  </option>
                ))}
              </select>

              <button
                onClick={handleRestoreExisting}
                disabled={!selectedFileName || isRestoring}
                className={cn(
                  "flex w-full items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium text-white transition-colors",
                  selectedFileName && !isRestoring
                    ? "bg-red-600 hover:bg-red-700"
                    : "cursor-not-allowed bg-red-300",
                )}
              >
                {restoringExisting ? (
                  <>
                    <LuRefreshCw className="h-4 w-4 animate-spin" />
                    Restoring…
                  </>
                ) : (
                  <>
                    <LuHardDriveUpload className="h-4 w-4" />
                    Restore This Backup
                  </>
                )}
              </button>
            </div>
          )}
        </div>

        {/* Section 2: Upload & Restore */}
        <div className="rounded-lg border border-gray-200 bg-white p-6">
          <div className="mb-4 flex items-center gap-2">
            <LuUpload className="h-5 w-5 text-gray-600" />
            <h2 className="text-base font-semibold text-gray-900">
              Upload & Restore
            </h2>
          </div>
          <p className="mb-4 text-sm text-gray-500">
            Upload a <code className="rounded bg-gray-100 px-1 text-xs">.sql</code> or{" "}
            <code className="rounded bg-gray-100 px-1 text-xs">.sql.gz</code> file from
            your computer.
          </p>

          {/* Drop zone */}
          <div
            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={cn(
              "mb-3 flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed px-4 py-8 text-center transition-colors",
              dragOver
                ? "border-primary bg-primary/5"
                : uploadFile
                  ? "border-green-300 bg-green-50"
                  : "border-gray-200 hover:border-gray-300 hover:bg-gray-50",
            )}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".sql,.sql.gz"
              className="hidden"
              onChange={async (e) => {
                const file = e.target.files?.[0];
                if (file) await handleFileSelect(file);
                e.target.value = "";
              }}
            />

            {uploadFile ? (
              <>
                <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
                  <LuCheck className="h-5 w-5 text-green-600" />
                </div>
                <p className="font-medium text-green-700 text-sm">{uploadFile.name}</p>
                <p className="text-xs text-green-600 mt-1">
                  {(uploadFile.size / 1024).toFixed(1)} KB
                </p>
              </>
            ) : (
              <>
                <LuUpload className="mb-2 h-8 w-8 text-gray-300" />
                <p className="text-sm font-medium text-gray-600">
                  Drop file here or click to browse
                </p>
                <p className="mt-1 text-xs text-gray-400">.sql or .sql.gz only</p>
              </>
            )}
          </div>

          <div className="flex items-center gap-2">
            {uploadFile && (
              <button
                onClick={() => setUploadFile(null)}
                className="flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-2.5 text-sm text-gray-600 transition-colors hover:bg-gray-50"
              >
                <LuX className="h-4 w-4" />
                Clear
              </button>
            )}

            <button
              onClick={handleRestoreUpload}
              disabled={!uploadFile || isRestoring}
              className={cn(
                "flex flex-1 items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium text-white transition-colors",
                uploadFile && !isRestoring
                  ? "bg-red-600 hover:bg-red-700"
                  : "cursor-not-allowed bg-red-300",
              )}
            >
              {restoringUpload ? (
                <>
                  <LuRefreshCw className="h-4 w-4 animate-spin" />
                  Restoring…
                </>
              ) : (
                <>
                  <LuHardDriveUpload className="h-4 w-4" />
                  Upload & Restore
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
