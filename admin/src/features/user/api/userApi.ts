import { apiSlice } from "@/redux";
import { USER_TAG } from "@/constants";
import type {
  IUser,
  ICreateUserPayload,
  IUpdateUserPayload,
  IUserPermissionsPayload,
  IUserRolesPayload,
} from "@/features/user/types";

const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchUsers: builder.query<IUser[], { email?: string; status?: string }>({
      query: (params) => ({
        url: "/users",
        method: "GET",
        params,
      }),
      providesTags: (result) =>
        result?.length
          ? [
              ...result.map((user) => ({ type: USER_TAG, id: user.id })),
              { type: USER_TAG, id: "LIST" },
            ]
          : [{ type: USER_TAG, id: "LIST" }],
    }),

    fetchUserById: builder.query<IUser, string>({
      query: (id) => ({
        url: `/users/${id}`,
        method: "GET",
      }),
      providesTags: (_result, _error, id) => [{ type: USER_TAG, id }],
    }),

    createUser: builder.mutation<IUser, ICreateUserPayload>({
      query: (body) => ({
        url: "/users",
        method: "POST",
        data: body,
      }),
      invalidatesTags: [{ type: USER_TAG, id: "LIST" }],
    }),

    updateUser: builder.mutation<IUser, { id: string; body: IUpdateUserPayload }>({
      query: ({ id, body }) => ({
        url: `/users/${id}`,
        method: "PUT",
        data: body,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: USER_TAG, id },
        { type: USER_TAG, id: "LIST" },
      ],
    }),

    addUserRoles: builder.mutation<IUser, { id: string; roles: IUserRolesPayload[] }>({
      query: ({ id, roles }) => ({
        url: `/users/add-roles/${id}`,
        method: "PATCH",
        data: roles,
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: USER_TAG, id }],
    }),

    removeUserRoles: builder.mutation<IUser, { id: string; roles: IUserRolesPayload[] }>({
      query: ({ id, roles }) => ({
        url: `/users/remove-roles/${id}`,
        method: "PATCH",
        data: roles,
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: USER_TAG, id }],
    }),

    addUserPermissions: builder.mutation<IUser, { id: string; permissions: IUserPermissionsPayload[] }>({
      query: ({ id, permissions }) => ({
        url: `/users/add-permissions/${id}`,
        method: "PATCH",
        data: permissions,
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: USER_TAG, id }],
    }),

    removeUserPermissions: builder.mutation<IUser, { id: string; permissions: IUserPermissionsPayload[] }>({
      query: ({ id, permissions }) => ({
        url: `/users/remove-permissions/${id}`,
        method: "PATCH",
        data: permissions,
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: USER_TAG, id }],
    }),

    resetUserPassword: builder.mutation<IUser, { id: string; newPassword: string }>({
      query: ({ id, newPassword }) => ({
        url: `/users/reset-password/${id}`,
        method: "PATCH",
        data: { newPassword },
      }),
    }),
  }),
});

export const {
  useFetchUsersQuery,
  useFetchUserByIdQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useAddUserRolesMutation,
  useRemoveUserRolesMutation,
  useAddUserPermissionsMutation,
  useRemoveUserPermissionsMutation,
  useResetUserPasswordMutation,
} = userApi;
