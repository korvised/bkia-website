import { apiSlice } from "@/redux/api-slice";
import { BACKUP_TAG } from "@/constants";
import type { IBackupInfo } from "@/features/backup/types";

export const backupApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchBackups: builder.query<IBackupInfo[], void>({
      query: () => ({
        url: "backup",
        method: "GET",
      }),
      providesTags: [BACKUP_TAG],
    }),

    createBackup: builder.mutation<IBackupInfo, void>({
      query: () => ({
        url: "backup",
        method: "POST",
      }),
      invalidatesTags: [BACKUP_TAG],
    }),

    deleteBackup: builder.mutation<{ message: string }, string>({
      query: (fileName) => ({
        url: `backup/${encodeURIComponent(fileName)}`,
        method: "DELETE",
      }),
      invalidatesTags: [BACKUP_TAG],
    }),

    restoreFromExisting: builder.mutation<{ message: string }, string>({
      query: (fileName) => ({
        url: `backup/restore/${encodeURIComponent(fileName)}`,
        method: "POST",
      }),
    }),

    restoreFromUpload: builder.mutation<{ message: string }, FormData>({
      query: (formData) => ({
        url: "backup/restore/upload",
        method: "POST",
        data: formData,
      }),
    }),
  }),
});

export const {
  useFetchBackupsQuery,
  useCreateBackupMutation,
  useDeleteBackupMutation,
  useRestoreFromExistingMutation,
  useRestoreFromUploadMutation,
} = backupApi;
