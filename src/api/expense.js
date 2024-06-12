import { jsonApi } from "./axios";

export const fetchExpenses = async () => {
  try {
    const response = await jsonApi.get("/expenses");
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const fetchExpense = async ({ queryKey }) => {
  try {
    const response = await jsonApi.get(`/expenses/${queryKey[1]}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const addExpense = async (newExpense) => {
  try {
    await jsonApi.post("/expenses", newExpense);
  } catch (error) {
    console.error(error);
  }
};
