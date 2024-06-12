import { configureStore } from "@reduxjs/toolkit";
import listMonthSlice from "../slices/listMonth";
import auth from "../slices/auth.slice";

const store = configureStore({
  reducer: {
    listMonth: listMonthSlice,
    auth,
  },
});

export default store;
