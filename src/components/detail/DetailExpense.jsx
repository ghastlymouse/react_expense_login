import React, { useRef, useState } from 'react'
import styled from 'styled-components'
import { useNavigate, useParams } from 'react-router-dom';
import { editExpense, fetchExpense, deleteExpense } from '../../api/expense';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';

const DetailExpense = () => {
    const { userInfo } = useSelector(state => state.auth);
    const currentUserId = userInfo.id;

    const [openModal, setOpenModal] = useState(false);
    const [isBtnOpen, setIsBtnOpen] = useState(true);
    const [modalMsg, setModalMsg] = useState("");
    const modalBg = useRef();

    const navigate = useNavigate();
    const currentId = useRef(useParams().postId).current;

    const { data: prevExpense = [], isPending, isError } = useQuery({
        queryKey: ["expenses", currentId],
        queryFn: fetchExpense,
    });

    const isWriter = currentUserId === prevExpense.createdBy;

    const editMutation = useMutation({
        mutationFn: editExpense,
        onSuccess: () => {
            navigate("/");
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
            setIsBtnOpen(false);
            setModalMsg("유효한 날짜를 입력해주세요!");
            return setOpenModal(true);
        }
        if (!item.trim()) {
            setIsBtnOpen(false);
            setModalMsg("유효한 항목을 입력해주세요!");
            return setOpenModal(true);
        }
        if (!amount.trim() || +amount < 0) {
            setIsBtnOpen(false);
            setModalMsg("유효한 금액을 입력해주세요!");
            return setOpenModal(true);
        }
        if (!description.trim()) {
            setIsBtnOpen(false);
            setModalMsg("유효한 내용을 입력해주세요!");
            return setOpenModal(true);
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

        editMutation.mutate(newExpense);
    }

    const handleDelete = () => {
        deleteMutation.mutate(currentId);
    }

    if (isPending) return <div>Loading ... </div>;
    if (isError) return <div>데이터 조회 중 오류가 발생했습니다.</div>;

    return (
        <StDetailSection>
            <ModalBackground $openModal={openModal} ref={modalBg} onClick={(e) => {
                if (e.target === modalBg.current) {
                    setOpenModal(false);
                }
            }}>
                <Modal>
                    <span>{modalMsg}</span>
                    <ModalBtnDiv>
                        <ModalBtn onClick={() => {
                            setOpenModal(false);
                        }} $isBtnOpen={!isBtnOpen}>확인</ModalBtn>
                        <ModalBtn onClick={() => {
                            setOpenModal(false);
                            handleDelete();
                        }}
                            $color="red"
                            $isBtnOpen={isBtnOpen}>삭제</ModalBtn>
                        <ModalBtn onClick={() => setOpenModal(false)} $color="gray" $isBtnOpen={isBtnOpen}>취소</ModalBtn>
                    </ModalBtnDiv>
                </Modal>
            </ModalBackground>
            <StDetailForm onSubmit={handleUpdate}>
                <StDiv>
                    <label htmlFor='date'>날짜</label>
                    <StInput defaultValue={prevExpense.date}
                        name="date"
                        type="date"
                        required
                        disabled={!isWriter}
                    />
                </StDiv>

                <StDiv>
                    <label htmlFor='item'>항목</label>
                    <StInput defaultValue={prevExpense.item}
                        name="item"
                        type="text"
                        required
                        disabled={!isWriter}
                    />
                </StDiv>

                <StDiv>
                    <label htmlFor='amount'>금액</label>
                    <StInput defaultValue={prevExpense.amount}
                        name="amount"
                        type="number"
                        required
                        disabled={!isWriter}
                    />
                </StDiv>

                <StDiv>
                    <label htmlFor='description'>내용</label>
                    <StInput defaultValue={prevExpense.description}
                        name="description"
                        type="text"
                        required
                        disabled={!isWriter}
                    />
                </StDiv>
                <StBtnDiv>
                    <StDetailBtn $color="green" $display={isWriter ? "block" : "none"} type='submit'>수정</StDetailBtn>
                    <StDetailBtn $color="red" $display={isWriter ? "block" : "none"} type='button' onClick={() => {
                        setModalMsg("정말로 삭제하시겠습니까?")
                        setOpenModal(true)
                        setIsBtnOpen(true)
                    }}>삭제</StDetailBtn>
                    <StDetailBtn $color="gray" $display="block" type='button' onClick={() => navigate("/")}>돌아가기</StDetailBtn>
                </StBtnDiv>

            </StDetailForm>
        </StDetailSection>
    )
}

export default DetailExpense

const StDetailBtn = styled.button`
    display: ${props => props.$display};
    width: 10%;
    height: 35px;
    border: none;
    border-radius: 10px;
    padding: 10px 20px;
    font-family: inherit;
    font-size: inherit;
    background-color: ${props => props.$color || "black"};
    color: white;
    cursor: pointer;
    &:hover{
        filter:brightness(0.8);
    }
`;

const StDetailSection = styled.section`
    background-color: white;
    width: 100%;
    margin: 10px;
    padding: 20px;
    border: 5px solid black;
    border-radius: 10px;
`;

const StDiv = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
`;

const StDetailForm = styled.form`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

const StBtnDiv = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 10px;
`;

const StInput = styled.input`
    width: 100%;
    height: 50px;
    background-color: #e2dbdb;
    border: 1px solid black;
    border-radius: 10px;
    font-family: inherit;
    font-size: inherit;
`;

const ModalBackground = styled.div`
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    display: ${props => props.$openModal ? "flex" : "none"};
    justify-content: center;
    background: rgba(0, 0, 0, 0.4);
`;

const Modal = styled.div`
    width: 500px;
    height: 150px;
    background-color: white;
    border: 3px solid black;
    border-radius: 10px;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;

const ModalBtnDiv = styled.div`
    position: absolute;
    display: flex;
    flex-direction: row;
    right: 10px;
    bottom: 10px;
`;

const ModalBtn = styled.button`
    border: none;
    border-radius: 4px;
    background-color: ${props => props.$color || "blue"};
    display: ${props => (props.$isBtnOpen ? "block" : "none")};
    padding: 10px 20px;
    width: 80px;
    height: 35px;
    color: white;
    font-family: inherit;
    font-size: 15px;
    cursor: pointer;
    &:hover{
        filter:brightness(0.8);
    }
`;