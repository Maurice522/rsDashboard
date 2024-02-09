import { createSlice } from "@reduxjs/toolkit";

export const sidebarSlice = createSlice({
  name: "sidebar",
  initialState: {
    sidebar: null,
  },
  reducers: {
    visible: (state) => {
      state.sidebar = true;
    },
    notvisible: (state) => {
      state.sidebar = false;
    },
  },
});

export const { visible, notvisible } = sidebarSlice.actions;

export const selectsidebar = (state) => state.sidebar.sidebar;

export default sidebarSlice.reducer;
