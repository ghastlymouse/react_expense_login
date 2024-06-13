import React from 'react'
import { useNavigate } from 'react-router-dom';
import * as S from "./ExpenseItem.styled";

const ExpenseItem = ({ expense }) => {
    const { id, date, item, amount, description, createdBy } = expense;
    const navigate = useNavigate();
    const handleGoToDetail = (id) => {
        navigate(`/detail/${id}`);
    }

    const longToShort = (string) => {
        const length = string.length;
        if (length > 60) {
            return string.substr(0, 60) + "...";
        } else {
            return string;
        }
    };

    return (
        <S.Div onClick={() => handleGoToDetail(id)}>
            <div>
                <S.Span>
                    {date}<br />
                </S.Span>
                <S.Span>
                    {item} - {longToShort(description)}<br />
                </S.Span>
            </div>
            <S.SpanDiv>
                <S.Span>
                    "{createdBy}"님의 지출 :
                </S.Span>
                <S.Span>
                    {amount.toLocaleString()}원
                </S.Span>
            </S.SpanDiv>
        </S.Div>
    )
}

export default ExpenseItem