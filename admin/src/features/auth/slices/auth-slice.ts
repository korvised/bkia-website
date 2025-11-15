import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { tokenStorageService } from "@/services";
import type { ICurrentUser } from "@/types";
import type {
  ChangePasswordPayload,
  ForgotPasswordFormData,
  IAuthResponse,
  SignInPayload,
} from "@/features/auth/types";
import { authApiService } from "@/features/auth/api";

interface AuthState {
  isInitialized: boolean;
  isAuthenticated: boolean;
  currentUser: ICurrentUser | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  isInitialized: false,
  isAuthenticated: false,
  currentUser: null,
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

export const fetchCurrentUser = createAsyncThunk<ICurrentUser>(
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
  { payload: ForgotPasswordFormData }
>(
  "hooks/forgotPassword",
  async ({ payload }, { rejectWithValue, dispatch }) => {
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
      state.currentUser = null;
      state.isLoading = false;
      state.error = null;
      tokenStorageService.removeTokens();
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
        tokenStorageService.storeTokens(action.payload.accessToken);
        state.currentUser = {
          user: action.payload.user,
          employee: action.payload.employee,
        };
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
        state.currentUser = action.payload;
        state.isInitialized = true;
        state.isAuthenticated = true;
        state.isLoading = false;
      })
      .addCase(fetchCurrentUser.rejected, (state, action) => {
        state.error = action.payload as string;
        state.currentUser = null;
        state.isInitialized = true;
        state.isAuthenticated = false;
        state.isLoading = false;
      });
  },
});

export const { signOut } = authSlice.actions;
export default authSlice.reducer;
