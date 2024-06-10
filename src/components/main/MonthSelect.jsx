import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components'
import { changeMonth } from "../../redux/slices/listMonth";

const MonthSelect = () => {
    const { selectedMonth } = useSelector(state => state.listMonth);
    const dispatch = useDispatch();

    const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

    const loadedLastSelectMonth = +localStorage.getItem("lastSelect");

    useEffect(() => {
        if (loadedLastSelectMonth) {
            dispatch(changeMonth(loadedLastSelectMonth));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("lastSelect", selectedMonth);
        setActiveMonth(selectedMonth);
    }, [selectedMonth])

    const [activeMonth, setActiveMonth] = useState(loadedLastSelectMonth || 1);

    const handleSelectMonth = (month) => {
        dispatch(changeMonth(month));
    };

    return (
        <StMonthSection>
            <StDiv>
                {
                    months.map(month => {
                        return (
                            <StMonthBtn key={month}
                                onClick={() => handleSelectMonth(month)}
                                $active={activeMonth === month}>
                                {month}월
                            </StMonthBtn>
                        );
                    })
                }
            </StDiv>
        </StMonthSection>
    )
}

export default MonthSelect

const StMonthSection = styled.section`
    width: 100%;
    background-color: white;
    color: black;
    display: flex;
    justify-content: center;
    padding: 20px;
    border: 5px solid black;
    border-radius: 8px;
    margin: 10px;
`;

const StDiv = styled.div`
    width: 80%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 20px;
`;

const StMonthBtn = styled.button`
    background-color: ${props => (props.$active ? "blue" : "#c2b8b8;")};
    color: ${props => (props.$active ? "white" : "black")};
    border: none;
    border-radius: 10px;
    padding: 10px 20px;
    width: 15%;
    height: 60px;
    font-family: inherit;
    font-size: inherit;
    cursor: pointer;
    &:hover{
        background-color: blue;
        color: white;
    }
`;