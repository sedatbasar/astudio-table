import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TableState {
  itemsPerPage: number;
  currentPage: number;
  searchQuery: string;
  filter: string;
}

const initialState: TableState = {
  itemsPerPage: 5,
  currentPage: 1,
  searchQuery: "",
  filter: "",
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
    setFilter: (state, action: PayloadAction<string>) => {
      state.filter = action.payload;
      state.currentPage = 1; // Reset to first page on filter change
    },
  },
});

export const { setItemsPerPage, setCurrentPage, setSearchQuery, setFilter } =
  tableSlice.actions;
export default tableSlice.reducer;
