import { createSlice } from "@reduxjs/toolkit";

export const studentSlice = createSlice({
  name: "student",
  initialState: {
    student: null,
  },
  reducers: {
    addStudent: (state, action) => {
      state.student = action.payload;
    },
    removeStudent: (state) => {
      state.student = null;
    },
  },
});

export const { addStudent, removeStudent } = studentSlice.actions;

export const selectstudent = (state) => state.student.student;

export default studentSlice.reducer;
