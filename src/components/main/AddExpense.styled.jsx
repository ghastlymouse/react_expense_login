import styled from 'styled-components';

export const Form = styled.form`
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

export const SubmitBtn = styled.button`
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

export const Div = styled.div`
    width: 25%;
    display: flex;
    flex-direction: column;
`;

export const Input = styled.input`
    width: 90%;
    height: 30px;
    background-color: #e2dbdb;
    border: 1px solid black;
    border-radius: 10px;
    font-family: inherit;
    font-size: inherit;
`;