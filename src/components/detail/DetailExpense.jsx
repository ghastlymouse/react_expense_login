import React, { useRef, useState } from 'react'
import styled from 'styled-components'
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deleteExpense, updateExpense } from '../redux/slices/expense';

const DetailExpense = () => {
    const { expenses } = useSelector(state => state.expenses);
    const [openModal, setOpenModal] = useState(false);
    const [isBtnOpen, setIsBtnOpen] = useState(true);
    const [modalMsg, setModalMsg] = useState("");
    const modalBg = useRef();

    const dispatch = useDispatch();
    const currentId = useRef(useParams().id).current;
    const [prevExpense] = expenses.filter(expense => expense.id === currentId);

    const navigate = useNavigate();
    const handleComeBackHome = () => {
        navigate("/");
    }

    const handleUpdate = (event) => {
        event.preventDefault();
        const id = currentId;
        const formData = new FormData(event.target);
        const date = formData.get("date");
        const item = formData.get("item");
        const amount = formData.get("amount");
        const description = formData.get("description");

        if (!date.trim()) {
            setIsBtnOpen(false);
            setModalMsg("날짜를 제대로 입력해주세요!");
            return setOpenModal(true);
        }
        if (!item.trim()) {
            setIsBtnOpen(false);
            setModalMsg("항목을 제대로 입력해주세요!");
            return setOpenModal(true);
        }
        if (!amount.trim() || +amount < 0) {
            setIsBtnOpen(false);
            setModalMsg("유효한 금액을 입력해주세요!");
            return setOpenModal(true);
        }
        if (!description.trim()) {
            setIsBtnOpen(false);
            setModalMsg("내용을 제대로 입력해주세요!");
            return setOpenModal(true);
        }

        dispatch(updateExpense({ id, date, item, amount, description }));
        handleComeBackHome();
    }

    const handleDelete = (currentId) => {
        handleComeBackHome();
        dispatch(deleteExpense({ currentId }));
    }

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
                            handleDelete(currentId);
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
                    />
                </StDiv>

                <StDiv>
                    <label htmlFor='item'>항목</label>
                    <StInput defaultValue={prevExpense.item}
                        name="item"
                        type="text"
                        required
                    />
                </StDiv>

                <StDiv>
                    <label htmlFor='amount'>금액</label>
                    <StInput defaultValue={prevExpense.amount}
                        name="amount"
                        type="number"
                        required
                    />
                </StDiv>

                <StDiv>
                    <label htmlFor='description'>내용</label>
                    <StInput defaultValue={prevExpense.description}
                        name="description"
                        type="text"
                        required
                    />
                </StDiv>
                <StBtnDiv>
                    <StDetailBtn $color="green" type='submit'>수정</StDetailBtn>
                    <StDetailBtn $color="red" type='button' onClick={() => {
                        setModalMsg("정말로 삭제하시겠습니까?")
                        setOpenModal(true)
                        setIsBtnOpen(true)
                    }}>삭제</StDetailBtn>
                    <StDetailBtn $color="gray" type='button' onClick={handleComeBackHome}>돌아가기</StDetailBtn>
                </StBtnDiv>

            </StDetailForm>
        </StDetailSection>
    )
}

export default DetailExpense

const StDetailBtn = styled.button`
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