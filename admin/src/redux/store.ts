import { type Action, combineReducers, configureStore } from "@reduxjs/toolkit";
import { authReducer } from "@/features/auth/slices";
import { apiSlice } from "./api-slice";
import { errorHandler } from "./error-handler";

const rootReducer = combineReducers({
  auth: authReducer,
  [apiSlice.reducerPath]: apiSlice.reducer,
});

type RootReducerState = ReturnType<typeof rootReducer>;

const resettableRootReducer = (
  state: RootReducerState | undefined,
  action: Action,
): RootReducerState => {
  if (action.type === "auth/signOut") {
    return rootReducer(undefined, action);
  }
  return rootReducer(state, action);
};

export const store = configureStore({
  reducer: resettableRootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware, errorHandler),
});

// Export these here normally
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
