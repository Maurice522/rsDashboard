import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import studentReducer from "./slices/studentSlice";
import sidebarReducer from "./slices/sidebarSlice";
import gridReducer from "./slices/gridSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    student: studentReducer,
    sidebar: sidebarReducer,
    grid: gridReducer,
  },
});
