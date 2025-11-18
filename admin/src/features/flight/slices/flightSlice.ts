import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { IFlightFilter } from "@/features/flight/types";

const initialFilters: IFlightFilter = {
  page: 1,
  limit: 10,
  search: "",
  operationDate: "",
  direction: "",
  type: "",
  terminal: "",
  gate: "",
  status: "",
  airlineId: "",
  counterId: "",
  sortBy: "operationDate",
  order: "ASC",
};

interface FlightState {
  filters: IFlightFilter;
}

const initialState: FlightState = {
  filters: initialFilters,
};

const flightSlice = createSlice({
  name: "flight",
  initialState,
  reducers: {
    setFilters: (state, action: PayloadAction<Partial<IFlightFilter>>) => {
      state.filters = {
        ...state.filters,
        ...action.payload,
        // Reset to page 1 when filters change (except when changing page itself)
        page: "page" in action.payload ? action.payload.page! : 1,
      };
    },
    resetFilters: (state) => {
      state.filters = initialFilters;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.filters.page = action.payload;
    },
    setPageSize: (state, action: PayloadAction<number>) => {
      state.filters.limit = action.payload;
      state.filters.page = 1;
    },
    setSort: (
      state,
      action: PayloadAction<{ sortBy: string; order: "ASC" | "DESC" }>,
    ) => {
      state.filters.sortBy = action.payload.sortBy;
      state.filters.order = action.payload.order;
    },
  },
});

export const { setFilters, resetFilters, setPage, setPageSize, setSort } =
  flightSlice.actions;

export const flightReducer = flightSlice.reducer;
