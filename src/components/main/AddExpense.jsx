import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import * as S from "./AddExpense.styled";
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
            <S.Form onSubmit={handleSubmitForm}>
                <S.Div>
                    <label htmlFor='date'>날짜</label>
                    <S.Input
                        name="date"
                        type="date"
                        min={thisYearFirstDay}
                        max={thisYearLastDay}
                    />
                </S.Div>
                <S.Div>
                    <label htmlFor='item'>항목</label>
                    <S.Input
                        name="item"
                        type="text"
                        placeholder='지출 항목'
                    />
                </S.Div>
                <S.Div>
                    <label htmlFor='amount'>금액</label>
                    <S.Input
                        name="amount"
                        type="number"
                        placeholder='지출 금액'
                    />
                </S.Div>
                <S.Div>
                    <label htmlFor='description'>내용</label>
                    <S.Input
                        name="description"
                        type="text"
                        placeholder='지출 내용'
                    />
                </S.Div>
                <S.SubmitBtn type="submit">추가</S.SubmitBtn>
            </S.Form>
        </>
    )
}

export default AddExpense