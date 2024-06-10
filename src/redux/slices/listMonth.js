import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedMonth: 1,
};

const listMonthSlice = createSlice({
  name: "setListMonth",
  initialState,
  reducers: {
    changeMonth: (state, action) => {
      state.selectedMonth = action.payload;
    },
  },
});

export const { changeMonth } = listMonthSlice.actions;
export default listMonthSlice.reducer;
