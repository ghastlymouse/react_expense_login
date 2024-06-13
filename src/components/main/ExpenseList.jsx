import React from 'react'
import * as S from "./ExpenseList.styled";
import ExpenseItem from './ExpenseItem'
import { useSelector } from 'react-redux';
import { useQuery } from '@tanstack/react-query';
import { fetchExpenses } from '../../api/expense';

const ExpenseList = () => {
    const { selectedMonth } = useSelector(state => state.listMonth);

    const { data: expenseList = [], isPending, isError } = useQuery({
        queryKey: ["expenses"],
        queryFn: fetchExpenses,
    });

    const selectedList = expenseList.filter(expense => expense.month === selectedMonth)

    if (isPending) return <div>Loading ...</div>;
    if (isError) return <div>데이터 조회 중 오류가 발생했습니다.</div>;

    return (
        <S.Section>
            {
                selectedList.map(expense => {
                    return (
                        <ExpenseItem
                            key={expense.id}
                            expense={expense}
                        />
                    );
                })
            }
        </S.Section>
    )
}

export default ExpenseList