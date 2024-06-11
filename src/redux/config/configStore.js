import { configureStore } from "@reduxjs/toolkit";
import expenseSlice from "../slices/expense";
import listMonthSlice from "../slices/listMonth";
import auth from "../slices/auth.slice";

const store = configureStore({
  reducer: {
    expenses: expenseSlice,
    listMonth: listMonthSlice,
    auth,
  },
});

export default store;
