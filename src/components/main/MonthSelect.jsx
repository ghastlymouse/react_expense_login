import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import * as S from "./MonthSelect.styled";
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
        <S.MonthSection>
            <S.Div>
                {
                    months.map(month => {
                        return (
                            <S.MonthBtn key={month}
                                onClick={() => handleSelectMonth(month)}
                                $active={activeMonth === month}>
                                {month}월
                            </S.MonthBtn>
                        );
                    })
                }
            </S.Div>
        </S.MonthSection>
    )
}

export default MonthSelect