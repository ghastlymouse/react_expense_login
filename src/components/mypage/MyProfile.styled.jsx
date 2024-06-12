import styled from "styled-components";

export const Section = styled.section`
    width: 100%;
    margin-top: 50px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10px;
`;

export const Form = styled.form`
    background-color: white;
    width: 40%;
    border: 5px solid black;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    gap: 30px;
`;

export const InputDiv = styled.div`
    display: flex;
    flex-direction: column;
`;

export const Input = styled.input`
    width: 100%;
    border: 3px solid black;
    border-radius: 10px;
    background-color: #e2dbdb;
    height: 35px;
    font-family: inherit;
    font-size: inherit;
`;

export const Button = styled.button`
    border: none;
    border-radius: 4px;
    background-color: ${props => props.$color || "blue"};
    padding: 10px 20px;
    width: 30%;
    height: 40px;
    color: white;
    font-family: inherit;
    font-size: 16px;
    cursor: pointer;
    &:hover{
        filter:brightness(0.8);
    }
`;

export const Image = styled.img`
    width: 200px;
    height: 200px;
    border-radius: 100px;
`;