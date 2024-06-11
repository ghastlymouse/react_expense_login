import styled from "styled-components";

export const Section = styled.section`
    width: 100%;
    height: 300px;
    margin-top: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const TitleText = styled.span`
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 25px;
`;

export const Form = styled.form`
    background-color: white;
    width: 50%;
    border: 5px solid black;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    padding: 20px;
    gap: 30px;
`;

export const InputDiv = styled.div`
    display: flex;
    flex-direction: column;
`;

export const Input = styled.input`
    border: 3px solid black;
    border-radius: 10px;
    background-color: #e2dbdb;
    height: 35px;
    font-family: inherit;
    font-size: inherit;
`;

export const ButtonDiv = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
`;

export const Button = styled.button`
    border: none;
    border-radius: 4px;
    background-color: ${props => props.$color || "blue"};
    padding: 10px 20px;
    width: 20%;
    height: 40px;
    color: white;
    font-family: inherit;
    font-size: 16px;
    cursor: pointer;
    &:hover{
        filter:brightness(0.8);
    }
`;