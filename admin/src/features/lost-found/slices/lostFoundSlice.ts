import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { ClaimStatus, LostFoundStatus } from "@/types";
import type { ILostFoundFilter, IClaimFilters } from "@/features/lost-found/types";

const initialItemFilters: ILostFoundFilter = {
  category: "",
  status: LostFoundStatus.OPEN,
  search: "",
  page: 1,
  limit: 10,
};

const initialClaimFilters: IClaimFilters = {
  status: ClaimStatus.PENDING,
  category: "",
  linked: "",
  search: "",
  page: 1,
  limit: 10,
};

interface LostFoundState {
  itemFilters: ILostFoundFilter;
  claimFilters: IClaimFilters;
}

const initialState: LostFoundState = {
  itemFilters: initialItemFilters,
  claimFilters: initialClaimFilters,
};

const lostFoundSlice = createSlice({
  name: "lostFound",
  initialState,
  reducers: {
    // ── Item filters ──
    setItemFilters: (state, action: PayloadAction<Partial<ILostFoundFilter>>) => {
      state.itemFilters = {
        ...state.itemFilters,
        ...action.payload,
        page: "page" in action.payload ? action.payload.page! : 1,
      };
    },
    resetItemFilters: (state) => {
      state.itemFilters = initialItemFilters;
    },
    setItemPage: (state, action: PayloadAction<number>) => {
      state.itemFilters.page = action.payload;
    },
    setItemPageSize: (state, action: PayloadAction<number>) => {
      state.itemFilters.limit = action.payload;
      state.itemFilters.page = 1;
    },

    // ── Claim filters ──
    setClaimFilters: (state, action: PayloadAction<Partial<IClaimFilters>>) => {
      state.claimFilters = {
        ...state.claimFilters,
        ...action.payload,
        page: "page" in action.payload ? action.payload.page! : 1,
      };
    },
    resetClaimFilters: (state) => {
      state.claimFilters = initialClaimFilters;
    },
    setClaimPage: (state, action: PayloadAction<number>) => {
      state.claimFilters.page = action.payload;
    },
    setClaimPageSize: (state, action: PayloadAction<number>) => {
      state.claimFilters.limit = action.payload;
      state.claimFilters.page = 1;
    },
  },
});

export const {
  setItemFilters,
  resetItemFilters,
  setItemPage,
  setItemPageSize,
  setClaimFilters,
  resetClaimFilters,
  setClaimPage,
  setClaimPageSize,
} = lostFoundSlice.actions;

export const lostFoundReducer = lostFoundSlice.reducer;
