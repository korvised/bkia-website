import { type Action, combineReducers, configureStore } from '@reduxjs/toolkit';
import { authReducer } from '@/features/auth/slices';
import { apiSlice } from './api-slice.ts';
import { errorHandler } from './error-handler.ts';

const rootReducer = combineReducers({
  auth: authReducer,
  [apiSlice.reducerPath]: apiSlice.reducer
});

type RootState = ReturnType<typeof rootReducer>;

const resettableRootReducer = (
  state: RootState | undefined,
  action: Action
): RootState => {
  if (action.type === 'auth/signOut') {
    // Then reset other state but keep API slice cleared
    return rootReducer(undefined, action);
  }
  return rootReducer(state, action);
};

export const store = configureStore({
  reducer: resettableRootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(apiSlice.middleware).concat(errorHandler)
});

export type { RootState };
export type AppDispatch = typeof store.dispatch;
