import { apiSlice } from "@/redux";
import { ROLE_TAG } from "@/constants";
import type {
  IRole,
  ICreateRolePayload,
  IUpdateRolePayload,
  IQueryRoleParams,
} from "@/features/role/types";

const roleApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchRoles: builder.query<IRole[], IQueryRoleParams>({
      query: (params) => ({
        url: "/roles",
        method: "GET",
        params,
      }),
      providesTags: (result) =>
        result?.length
          ? [
              ...result.map((role) => ({ type: ROLE_TAG, id: role.id })),
              { type: ROLE_TAG, id: "LIST" },
            ]
          : [{ type: ROLE_TAG, id: "LIST" }],
    }),

    createRole: builder.mutation<IRole, ICreateRolePayload>({
      query: (body) => ({
        url: "/roles",
        method: "POST",
        data: body,
      }),
      invalidatesTags: [{ type: ROLE_TAG, id: "LIST" }],
    }),

    updateRole: builder.mutation<IRole, { roleName: string; body: IUpdateRolePayload }>({
      query: ({ roleName, body }) => ({
        url: `/roles/${roleName}`,
        method: "PUT",
        data: body,
      }),
      invalidatesTags: (_result, _error, { roleName }) => [
        { type: ROLE_TAG, id: roleName },
        { type: ROLE_TAG, id: "LIST" },
      ],
    }),

    deleteRole: builder.mutation<void, string>({
      query: (roleName) => ({
        url: `/roles/${roleName}`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, roleName) => [
        { type: ROLE_TAG, id: roleName },
        { type: ROLE_TAG, id: "LIST" },
      ],
    }),
  }),
});

export const {
  useFetchRolesQuery,
  useCreateRoleMutation,
  useUpdateRoleMutation,
  useDeleteRoleMutation,
} = roleApi;
