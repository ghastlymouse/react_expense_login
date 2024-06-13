import styled from 'styled-components'

export const DetailBtn = styled.button`
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

export const DetailSection = styled.section`
    background-color: white;
    width: 100%;
    margin: 10px;
    padding: 20px;
    border: 5px solid black;
    border-radius: 10px;
`;

export const Div = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
`;

export const DetailForm = styled.form`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

export const BtnDiv = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 10px;
`;

export const Input = styled.input`
    width: 100%;
    height: 50px;
    background-color: #e2dbdb;
    border: 1px solid black;
    border-radius: 10px;
    font-family: inherit;
    font-size: inherit;
`;