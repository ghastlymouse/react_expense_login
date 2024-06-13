import React from 'react'
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

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
        <StDiv onClick={() => handleGoToDetail(id)}>
            <div>
                <StSpan>
                    {date}<br />
                </StSpan>
                <StSpan>
                    {item} - {longToShort(description)}<br />
                </StSpan>
            </div>
            <StSpanDiv>
                <StSpan>
                    "{createdBy}"님의 지출 :
                </StSpan>
                <StSpan>
                    {amount.toLocaleString()}원
                </StSpan>
            </StSpanDiv>
        </StDiv>
    )
}

export default ExpenseItem

const StDiv = styled.div`
    width: 95%;
    height: 50px;
    background-color: #d3cccc;
    border: 1px solid black;
    border-radius: 5px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    &:hover{
        transform: scale(1.025);
    }
`;

const StSpan = styled.span`
    padding: 5px;
    background-color: transparent;
    color: #000000;
`;

const StSpanDiv = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`;