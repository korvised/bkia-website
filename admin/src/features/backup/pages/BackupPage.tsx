import { useState } from "react";
import {
  LuArchive,
  LuDatabase,
  LuDownload,
  LuHardDriveDownload,
  LuPlus,
  LuRefreshCw,
  LuTrash2,
} from "react-icons/lu";
import { Breadcrumb } from "@/components/ui";
import { api } from "@/lib";
import { alertService, tokenStorageService } from "@/services";
import {
  useFetchBackupsQuery,
  useCreateBackupMutation,
  useDeleteBackupMutation,
} from "@/features/backup/api";
import type { IBackupInfo } from "@/features/backup/types";

function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 B";
  const units = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${(bytes / Math.pow(1024, i)).toFixed(1)} ${units[i]}`;
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

export function BackupPage() {
  const { data: backups = [], isLoading, isFetching, refetch } = useFetchBackupsQuery();
  const [createBackup, { isLoading: isCreating }] = useCreateBackupMutation();
  const [deleteBackup] = useDeleteBackupMutation();
  const [downloadingFile, setDownloadingFile] = useState<string | null>(null);

  const handleCreate = async () => {
    const result = await alertService.confirmModal(
      "Create Backup",
      "This will create a new pg_dump backup of the current database. Continue?",
    );
    if (!result.isConfirmed) return;

    try {
      const info = await createBackup().unwrap();
      await alertService.success(
        "Backup Created",
        `${info.fileName} (${formatBytes(info.sizeBytes)})`,
      );
    } catch (err: any) {
      await alertService.error(
        err?.data?.message ?? "Failed to create backup",
        "Backup Failed",
      );
    }
  };

  const handleDelete = async (backup: IBackupInfo) => {
    const result = await alertService.confirmModal(
      "Delete Backup",
      `Are you sure you want to delete "${backup.fileName}"? This cannot be undone.`,
    );
    if (!result.isConfirmed) return;

    try {
      await deleteBackup(backup.fileName).unwrap();
      await alertService.success("Deleted", `${backup.fileName} has been removed.`);
    } catch (err: any) {
      await alertService.error(
        err?.data?.message ?? "Failed to delete backup",
        "Delete Failed",
      );
    }
  };

  const handleDownload = async (backup: IBackupInfo) => {
    setDownloadingFile(backup.fileName);
    try {
      const { accessToken } = tokenStorageService.getTokens();
      const response = await api.get(
        `backup/${encodeURIComponent(backup.fileName)}/download`,
        {
          responseType: "blob",
          headers: accessToken ? { Authorization: `Bearer ${accessToken}` } : {},
        },
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", backup.fileName);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch {
      await alertService.error("Failed to download the backup file.", "Download Failed");
    } finally {
      setDownloadingFile(null);
    }
  };

  return (
    <div className="space-y-6">
      <Breadcrumb
        items={[
          { label: "Database" },
          { label: "Backup", icon: LuHardDriveDownload },
        ]}
      />

      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-primary-100 rounded-lg p-2">
            <LuDatabase className="text-primary h-6 w-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Database Backup</h1>
            <p className="text-sm text-gray-500">
              Create and manage PostgreSQL database backups
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => refetch()}
            disabled={isFetching}
            className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50 disabled:opacity-60"
            title="Refresh"
          >
            <LuRefreshCw className={`h-4 w-4 ${isFetching ? "animate-spin" : ""}`} />
          </button>

          <button
            onClick={handleCreate}
            disabled={isCreating}
            className="bg-primary hover:bg-primary-600 flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isCreating ? (
              <LuRefreshCw className="h-4 w-4 animate-spin" />
            ) : (
              <LuPlus className="h-4 w-4" />
            )}
            {isCreating ? "Creating…" : "Create Backup"}
          </button>
        </div>
      </div>

      {/* Warning banner */}
      <div className="flex items-start gap-3 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3">
        <LuDatabase className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />
        <p className="text-sm text-amber-800">
          Backups are stored locally on the server. Download and store them securely
          off-server for production use.
        </p>
      </div>

      {/* Backup list */}
      <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
        {isLoading ? (
          <div className="flex items-center justify-center py-20 text-gray-400">
            <LuRefreshCw className="mr-2 h-5 w-5 animate-spin" />
            Loading backups…
          </div>
        ) : backups.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <LuArchive className="mb-3 h-12 w-12 text-gray-300" />
            <p className="font-medium text-gray-500">No backups yet</p>
            <p className="mt-1 text-sm text-gray-400">
              Click "Create Backup" to generate your first database dump.
            </p>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                <th className="px-4 py-3">File Name</th>
                <th className="px-4 py-3">Size</th>
                <th className="px-4 py-3">Created At</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {backups.map((backup) => (
                <tr
                  key={backup.fileName}
                  className="transition-colors hover:bg-gray-50"
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <LuArchive className="h-4 w-4 shrink-0 text-gray-400" />
                      <span className="font-medium text-gray-800 font-mono text-xs">
                        {backup.fileName}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gray-600">
                    {formatBytes(backup.sizeBytes)}
                  </td>
                  <td className="px-4 py-3 text-gray-600">
                    {formatDate(backup.createdAt)}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleDownload(backup)}
                        disabled={downloadingFile === backup.fileName}
                        className="flex items-center gap-1.5 rounded-md border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 transition-colors hover:bg-gray-50 disabled:opacity-60"
                        title="Download"
                      >
                        {downloadingFile === backup.fileName ? (
                          <LuRefreshCw className="h-3.5 w-3.5 animate-spin" />
                        ) : (
                          <LuDownload className="h-3.5 w-3.5" />
                        )}
                        Download
                      </button>

                      <button
                        onClick={() => handleDelete(backup)}
                        className="flex items-center gap-1.5 rounded-md border border-red-200 bg-white px-3 py-1.5 text-xs font-medium text-red-600 transition-colors hover:bg-red-50"
                        title="Delete"
                      >
                        <LuTrash2 className="h-3.5 w-3.5" />
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {backups.length > 0 && (
          <div className="border-t border-gray-100 px-4 py-2 text-xs text-gray-400">
            {backups.length} backup{backups.length !== 1 ? "s" : ""} stored on server
          </div>
        )}
      </div>
    </div>
  );
}
