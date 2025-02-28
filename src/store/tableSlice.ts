import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TableState {
  itemsPerPage: number;
  currentPage: number;
  searchQuery: string;
  activeFilter: string | null;
  filterValue: string;
}

const initialState: TableState = {
  itemsPerPage: 5,
  currentPage: 1,
  searchQuery: "",
  activeFilter: null,
  filterValue: "",
};

const tableSlice = createSlice({
  name: "table",
  initialState,
  reducers: {
    setItemsPerPage: (state, action: PayloadAction<number>) => {
      state.itemsPerPage = action.payload;
      state.currentPage = 1; // Reset to first page on items per page change
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
      state.currentPage = 1; // Reset to first page on search
    },
    setActiveFilter: (state, action: PayloadAction<string | null>) => {
      state.activeFilter = action.payload;
      state.filterValue = "";
      state.currentPage = 1; // Reset to first page on search
    },
    setFilterValue: (state, action: PayloadAction<string>) => {
      state.filterValue = action.payload;
      state.currentPage = 1; // Reset to first page on search
    },
    resetTableState: () => initialState,
  },
});

export const {
  setItemsPerPage,
  setCurrentPage,
  setSearchQuery,
  setActiveFilter,
  setFilterValue,
  resetTableState,
} = tableSlice.actions;
export default tableSlice.reducer;
