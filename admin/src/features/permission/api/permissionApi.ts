import { apiSlice } from "@/redux";
import { PERMISSION_TAG } from "@/constants";
import type {
  IPermission,
  ICreatePermissionPayload,
  IUpdatePermissionPayload,
} from "@/features/permission/types";

const permissionApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchPermissions: builder.query<IPermission[], { search?: string }>({
      query: (params) => ({
        url: "/permissions",
        method: "GET",
        params,
      }),
      providesTags: (result) =>
        result?.length
          ? [
              ...result.map((p) => ({ type: PERMISSION_TAG, id: p.id })),
              { type: PERMISSION_TAG, id: "LIST" },
            ]
          : [{ type: PERMISSION_TAG, id: "LIST" }],
    }),

    createPermission: builder.mutation<IPermission, ICreatePermissionPayload>({
      query: (body) => ({
        url: "/permissions",
        method: "POST",
        data: body,
      }),
      invalidatesTags: [{ type: PERMISSION_TAG, id: "LIST" }],
    }),

    updatePermission: builder.mutation<
      IPermission,
      { id: string; body: IUpdatePermissionPayload }
    >({
      query: ({ id, body }) => ({
        url: `/permissions/${id}`,
        method: "PUT",
        data: body,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: PERMISSION_TAG, id },
        { type: PERMISSION_TAG, id: "LIST" },
      ],
    }),

    deletePermission: builder.mutation<void, string>({
      query: (id) => ({
        url: `/permissions/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: PERMISSION_TAG, id: "LIST" }],
    }),
  }),
});

export const {
  useFetchPermissionsQuery,
  useCreatePermissionMutation,
  useUpdatePermissionMutation,
  useDeletePermissionMutation,
} = permissionApi;
