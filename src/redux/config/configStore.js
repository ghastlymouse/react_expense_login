import { configureStore } from "@reduxjs/toolkit";
import expenseSlice from "../slices/expense";
import listMonthSlice from "../slices/listMonth";

const store = configureStore({
  reducer: {
    expenses: expenseSlice,
    listMonth: listMonthSlice,
  },
});

export default store;
