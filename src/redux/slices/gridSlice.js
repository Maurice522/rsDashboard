import { createSlice } from "@reduxjs/toolkit";

export const gridSlice = createSlice({
  name: "grid",
  initialState: {
    grid: true,
  },
  reducers: {
    showGrid: (state) => {
      state.grid = true;
    },
    showList: (state) => {
      state.grid = false;
    },
  },
});

export const { showGrid, showList } = gridSlice.actions;

export const selectgrid = (state) => state.grid.grid;

export default gridSlice.reducer;
