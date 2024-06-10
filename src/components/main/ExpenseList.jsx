import React from 'react'
import styled from 'styled-components';
import ExpenseItem from './ExpenseItem'
import { useSelector } from 'react-redux';

const ExpenseList = () => {
    const { expenses } = useSelector(state => state.expenses);
    const { selectedMonth } = useSelector(state => state.listMonth);
    const selectedList = expenses.filter(expense => +expense.date.slice(5, 7) === selectedMonth);

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