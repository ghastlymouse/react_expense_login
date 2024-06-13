import React, { useRef } from 'react'
import * as S from "./DetailExpense.styled";
import { useNavigate, useParams } from 'react-router-dom';
import { editExpense, fetchExpense, deleteExpense } from '../../api/expense';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';

const DetailExpense = () => {
    const { userInfo } = useSelector(state => state.auth);
    const currentUserId = userInfo?.id;

    const navigate = useNavigate();
    const currentId = useRef(useParams().postId).current;

    const thisYearFirstDay = `${new Date().getFullYear()}-01-01`;
    const thisYearLastDay = `${new Date().getFullYear()}-12-31`;

    const { data: prevExpense = [], isPending, isError } = useQuery({
        queryKey: ["expenses", currentId],
        queryFn: fetchExpense,
    });

    const isWriter = currentUserId === prevExpense.createdBy;

    const queryClient = useQueryClient();
    const editMutation = useMutation({
        mutationFn: editExpense,
        onSuccess: () => {
            navigate("/");
            queryClient.invalidateQueries(["expenses"]);
        },
    });

    const deleteMutation = useMutation({
        mutationFn: deleteExpense,
        onSuccess: () => {
            navigate("/");
        },
    });

    const handleUpdate = (event) => {
        event.preventDefault();
        const id = currentId;
        const formData = new FormData(event.target);
        const date = formData.get("date");
        const month = date.slice(5, 7);
        const item = formData.get("item");
        const amount = formData.get("amount");
        const description = formData.get("description");
        const createdBy = prevExpense.createdBy;

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

        const newExpense = {
            id,
            month: +month,
            date,
            item,
            amount: +amount,
            description,
            createdBy,
        };

        Swal.fire({
            icon: "success",
            title: "수정 중..",
            timer: 2000,
            showConfirmButton: false,
        })
        editMutation.mutate(newExpense);
    }

    const handleDelete = () => {
        deleteMutation.mutate(currentId);
    }

    const WriterButton = () => {
        return (
            <S.BtnDiv>
                <S.DetailBtn $color="green" type='submit'>수정</S.DetailBtn>
                <S.DetailBtn $color="red" type='button' onClick={() => {
                    Swal.fire({
                        icon: "warning",
                        title: "헉!",
                        text: "삭제하시겠습니까?ㅠ",
                        confirmButtonColor: "red",
                        confirmButtonText: "삭제",
                        showCancelButton: true,
                        cancelButtonText: "아니요",
                    }).then(result => {
                        if (result.isConfirmed) {
                            handleDelete();
                        }
                    })
                }}>삭제</S.DetailBtn>
                <S.DetailBtn $color="gray" type='button' onClick={() => navigate("/")}>돌아가기</S.DetailBtn>
            </S.BtnDiv>
        );
    };

    const GuestButton = () => {
        return (
            <S.BtnDiv>
                <S.DetailBtn $color="gray" type='button' onClick={() => navigate("/")}>돌아가기</S.DetailBtn>
            </S.BtnDiv>
        );
    };

    if (isPending) return <div>Loading ... </div>;
    if (isError) return <div>데이터 조회 중 오류가 발생했습니다.</div>;

    return (
        <S.DetailSection>
            <S.DetailForm onSubmit={(e) => {
                e.preventDefault();
                Swal.fire({
                    icon: "question",
                    title: "수정 하시겠습니까?",
                    confirmButtonText: "수정",
                    showCancelButton: true,
                    cancelButtonText: "아니요",
                }).then(result => {
                    if (result.isConfirmed) {
                        handleUpdate(e)
                    }
                })
            }}>
                <S.Div>
                    <label htmlFor='date'>날짜</label>
                    <S.Input defaultValue={prevExpense.date}
                        name="date"
                        type="date"
                        min={thisYearFirstDay}
                        max={thisYearLastDay}
                        disabled={!isWriter}
                    />
                </S.Div>
                <S.Div>
                    <label htmlFor='item'>항목</label>
                    <S.Input defaultValue={prevExpense.item}
                        name="item"
                        type="text"
                        disabled={!isWriter}
                    />
                </S.Div>
                <S.Div>
                    <label htmlFor='amount'>금액</label>
                    <S.Input defaultValue={prevExpense.amount}
                        name="amount"
                        type="number"
                        disabled={!isWriter}
                    />
                </S.Div>
                <S.Div>
                    <label htmlFor='description'>내용</label>
                    <S.Input defaultValue={prevExpense.description}
                        name="description"
                        type="text"
                        disabled={!isWriter}
                    />
                </S.Div>
                {isWriter ? <WriterButton /> : <GuestButton />}
            </S.DetailForm>
        </S.DetailSection>
    )
}

export default DetailExpense