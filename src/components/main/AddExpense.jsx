import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';
import { addExpense } from '../../api/expense'
import { changeMonth } from '../../redux/slices/listMonth';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Swal from 'sweetalert2';

const AddExpense = () => {
    const dispatch = useDispatch();
    const { userInfo } = useSelector(state => state.auth);

    const queryClient = useQueryClient();
    const addMutation = useMutation({
        mutationFn: addExpense,
        onSuccess: () => {
            queryClient.invalidateQueries(["expenses"]);
        },
    });

    const handleSubmitForm = (event) => {
        event.preventDefault();

        const formData = new FormData(event.target);
        const date = formData.get("date");
        const month = +date.slice(5, 7);
        const item = formData.get("item");
        const amount = formData.get("amount");
        const description = formData.get("description");
        const createdBy = userInfo.id;

        if (!date.trim()) {
            return Swal.fire({
                icon: "question",
                title: "흠..",
                text: "유효한 날짜인가요?",
                confirmButtonText: "다시",
            });
        }
        if (!item.trim()) {
            return Swal.fire({
                icon: "question",
                title: "흠..",
                text: "유효한 항목인가요?",
                confirmButtonText: "다시",
            });
        }
        if (!amount.trim() || +amount < 0) {
            return Swal.fire({
                icon: "question",
                title: "흠..",
                text: "유효한 금액인가요?",
                confirmButtonText: "다시",
            });
        }
        if (!description.trim()) {
            return Swal.fire({
                icon: "question",
                title: "흠..",
                text: "유효한 내용인가요?",
                confirmButtonText: "다시",
            });
        }
        event.target.reset();
        const newExpense = {
            id: uuidv4(),
            month,
            date,
            item,
            amount: +amount,
            description,
            createdBy,
        };

        addMutation.mutate(newExpense);

        const selectedMonth = month;
        dispatch(changeMonth(selectedMonth));
        return Swal.fire({
            icon: "success",
            title: "야호!",
            text: `${selectedMonth}월의 지출내역에 추가되었습니다!`,
            confirmButtonText: "확인",
        });
    }

    const thisYearFirstDay = `${new Date().getFullYear()}-01-01`;
    const thisYearLastDay = `${new Date().getFullYear()}-12-31`;

    return (
        <>
            <StForm onSubmit={handleSubmitForm}>
                <StDiv>
                    <label htmlFor='date'>날짜</label>
                    <StInput
                        name="date"
                        type="date"
                        min={thisYearFirstDay}
                        max={thisYearLastDay}
                    />
                </StDiv>
                <StDiv>
                    <label htmlFor='item'>항목</label>
                    <StInput
                        name="item"
                        type="text"
                        placeholder='지출 항목'
                    />
                </StDiv>
                <StDiv>
                    <label htmlFor='amount'>금액</label>
                    <StInput
                        name="amount"
                        type="number"
                        placeholder='지출 금액'
                    />
                </StDiv>
                <StDiv>
                    <label htmlFor='description'>내용</label>
                    <StInput
                        name="description"
                        type="text"
                        placeholder='지출 내용'
                    />
                </StDiv>
                <StSubmitBtn type="submit">추가</StSubmitBtn>
            </StForm>
        </>
    )
}

export default AddExpense

const StForm = styled.form`
    width: 100%;
    background-color: white;
    border: 5px solid black;
    border-radius: 8px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 10px;
    padding: 20px;
    margin: 10px;
`;

const StSubmitBtn = styled.button`
    border: none;
    border-radius: 4px;
    background-color: blue;
    padding: 10px 20px;
    width: 7%;
    height: 40px;
    color: white;
    font-family: inherit;
    font-size: 16px;
    cursor: pointer;
    &:hover{
        filter:brightness(0.8);
    }
`;

const StDiv = styled.div`
    width: 25%;
    display: flex;
    flex-direction: column;
`;

const StInput = styled.input`
    width: 90%;
    height: 30px;
    background-color: #e2dbdb;
    border: 1px solid black;
    border-radius: 10px;
    font-family: inherit;
    font-size: inherit;
`;