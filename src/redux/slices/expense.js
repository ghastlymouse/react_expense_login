import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  expenses: [
    {
      id: "11111111111111111111111111111111111111",
      date: "2024-01-05",
      item: "식비",
      amount: 100000,
      description: "세광양대창",
    },
    {
      id: "22222222222222222222222222222222222222",
      date: "2024-01-10",
      item: "도서",
      amount: 40500,
      description: "모던 자바스크립트",
    },
    {
      id: "333333333333333333333333333333333333333",
      date: "2024-02-02",
      item: "식비",
      amount: 50000,
      description: "회식",
    },
    {
      id: "444444444444444444444444444444444444444",
      date: "2024-02-02",
      item: "간식",
      amount: 500,
      description: "아이스크림",
    },
    {
      id: "555555555555555555555555555555555555555",
      date: "2024-09-02",
      item: "여행",
      amount: 1055000,
      description: "일본여행",
    },
    {
      id: "6666666666666666666666666666666666666666",
      date: "2024-07-02",
      item: "미용",
      amount: 155000,
      description: "미용실",
    },
    {
      id: "77777777777777777777777777777777777",
      date: "2024-05-02",
      item: "도서",
      amount: 75000,
      description:
        "자율주행차량 운전주행모드 자동 전환용 인식률 90% 이상의 다중 센서 기반 운전자 상태 인식 및 상황 인식 원천 기술 개발",
    },
    {
      id: "7543875437557984359847584764859924",
      date: "2024-12-11",
      item: "테스트용",
      amount: 50000,
      description:
        "안녕하세요. 박찬호입니다. 고래가 새우를 삼켜버렸다. 고래하니까 생각나는데 제일 미국 LA에 있을 때 유니버셜스튜디오 할리우드에서 봤던 고래가 떠오르네요. 그 고래를 보면서 한국에 대한 그리움 어쩌구 저쩌구 엄청 길다~~~~",
    },
  ],
};

const expenseSlice = createSlice({
  name: "setExpenses",
  initialState,
  reducers: {
    addExpense: (state, action) => {
      state.expenses = [...state.expenses, action.payload];
    },
    deleteExpense: (state, action) => {
      const { currentId } = action.payload;
      state.expenses = state.expenses.filter(
        (expense) => expense.id !== currentId
      );
    },
    updateExpense: (state, action) => {
      const { id, date, item, amount, description } = action.payload;
      state.expenses = state.expenses.map((expense) => {
        if (expense.id === id) {
          return {
            id,
            date,
            item,
            amount: +amount,
            description,
          };
        } else {
          return expense;
        }
      });
    },
  },
});

export const { addExpense, deleteExpense, updateExpense } =
  expenseSlice.actions;
export default expenseSlice.reducer;
