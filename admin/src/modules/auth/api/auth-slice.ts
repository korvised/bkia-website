import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { IUser } from '@/types';
import type {
  ChangePasswordPayload,
  ForgotPasswordFormData,
  IAuthResponse,
  SignInPayload
} from '@/modules/auth/types';
import { authApiService } from './auth-service.ts';
import { storage } from '@/lib/storage.ts';

interface AuthState {
  isInitialized: boolean;
  isAuthenticated: boolean;
  user: IUser | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  isInitialized: false,
  isAuthenticated: false,
  user: null,
  isLoading: true,
  error: null,
};

export const signIn = createAsyncThunk<IAuthResponse, SignInPayload>(
  "hooks/signIn",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await authApiService.signIn(payload);
      return data;
    } catch (err: unknown) {
      return rejectWithValue(err);
    }
  },
);

export const fetchCurrentUser = createAsyncThunk<IUser>(
  "hooks/fetchCurrentUser",
  async (_, { rejectWithValue }) => {
    try {
      const { data: currentUser } = await authApiService.fetchCurrentUser();
      return currentUser;
    } catch (err: unknown) {
      return rejectWithValue(err);
    }
  },
);

export const forgotPassword = createAsyncThunk<
  void,
  {  payload: ForgotPasswordFormData }
>(
  "hooks/forgotPassword",
  async ({  payload }, { rejectWithValue, dispatch }) => {
    try {
      await authApiService.forgotPassword(payload);
      // After verify success backend set cookie, fetch the current user to update user status
      dispatch(fetchCurrentUser());
    } catch (err: unknown) {
      return rejectWithValue(err);
    }
  },
);

export const changePassword = createAsyncThunk<void, ChangePasswordPayload>(
  "hooks/changePassword",
  async (payload, { rejectWithValue }) => {
    try {
      await authApiService.changePassword(payload);
    } catch (err: unknown) {
      return rejectWithValue(err);
    }
  },
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signOut: (state) => {
      state.isInitialized = true;
      state.isAuthenticated = false;
      state.user = null;
      state.isLoading = false;
      state.error = null;
      storage.removeTokens();
    },
  },
  extraReducers: (builder) => {
    builder
      // Sign In
      .addCase(signIn.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        storage.storeTokens(action.payload.accessToken);
        state.user = action.payload.user;
        state.isInitialized = true;
        state.isAuthenticated = true;
        state.isLoading = false;
      })
      .addCase(signIn.rejected, (state, action) => {
        state.error = action.payload as string;
        state.isInitialized = true;
        state.isAuthenticated = false;
        state.isLoading = false;
      })

      // Get Current User
      .addCase(fetchCurrentUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isInitialized = true;
        state.isAuthenticated = true;
        state.isLoading = false;
      })
      .addCase(fetchCurrentUser.rejected, (state, action) => {
        state.error = action.payload as string;
        state.user = null;
        state.isInitialized = true;
        state.isAuthenticated = false;
        state.isLoading = false;
      })
  },
});

export const { signOut } = authSlice.actions;
export default authSlice.reducer;
