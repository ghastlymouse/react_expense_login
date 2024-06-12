import React from 'react'
import styled from 'styled-components';
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
        <StSection>
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
        </StSection>
    )
}

export default ExpenseList

const StSection = styled.section`
    width: 100%;
    background-color: white;
    color: black;
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    justify-content: center;
    padding: 20px;
    border: 5px solid black;
    border-radius: 8px;
    margin: 10px;
`;