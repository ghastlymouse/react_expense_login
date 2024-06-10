import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'

const ExpenseSummary = () => {
    const { expenses } = useSelector(state => state.expenses);
    const { selectedMonth } = useSelector(state => state.listMonth);
    const selectedExpenses = expenses.filter(expense => +expense.date.slice(5, 7) === selectedMonth);

    const [total, setTotal] = useState(0);
    // 어떻게 항목별로 모아서 처리해야할지 잘 모르겠음

    useEffect(() => {
        let newTotal = 0;

        selectedExpenses.forEach(expense => {
            newTotal += expense.amount;
        });
        setTotal(newTotal);

    }, [selectedExpenses]);

    const paintColor = () => {
        const code = "0123456789ABCDEF";
        let color = "#";
        for (let i = 0; i < 6; i++) {
            const randomNum = Math.floor(Math.random() * 16);
            color += code[randomNum];
        }
        return color;
    };

    return (
        <StDetailSection>
            {selectedMonth}월 총 지출: {total.toLocaleString()}원
            <StDiv>
                {
                    selectedExpenses.map(expense => {
                        const percent = Math.round(expense.amount * 100 / total);
                        return (
                            <StStackBar key={expense.id} $width={percent} $color={paintColor()}>{expense.item} : {percent}%</StStackBar>
                        );
                    })
                }
            </StDiv>
        </StDetailSection>
    )
}

export default ExpenseSummary

const StDetailSection = styled.section`
    background-color: white;
    width: 100%;
    padding: 20px;
    margin: 10px;
    border: 5px solid black;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const StDiv = styled.div`
    margin-top: 10px;
    width: 95%;
    border-radius: 10px;
    background-color: gray;
    display: flex;
`;

const StStackBar = styled.div`
    width: ${props => props.$width}%;
    height: 50px;
    background-color: ${props => props.$color};
    color: black;
    display: flex;
    justify-content: center;
    align-items: center;
    white-space: nowrap;
    &:first-child {
        border-top-left-radius: 10px;
        border-bottom-left-radius: 10px;
    }
    &:last-child {
        border-top-right-radius: 10px;
        border-bottom-right-radius: 10px;
    }
`;