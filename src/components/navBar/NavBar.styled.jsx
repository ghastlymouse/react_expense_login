import styled from "styled-components";

export const Container = styled.div`
    width: 100%;
    background-color: white;
    height: 40px;
    padding: 20px;
    border: 5px solid black;
    border-radius: 8px;
    margin: 0 10px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
`;

export const LeftDiv = styled.div`
    width: 50%;
    height: 40px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
`;

export const RightDiv = styled.div`
    width: 50%;
    height: 40px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
`;

export const NavButton = styled.button`
    display: ${props => props.$display};
    border: none;
    background-color: transparent;
    font-family: inherit;
    font-size: 25px;
    cursor: pointer;
`;

export const Span = styled.span`
    display: ${props => props.$display};
`;

export const Button = styled.button`
    display: ${props => props.$display};
    border: none;
    border-radius: 4px;
    background-color: ${props => props.$color || "blue"};
    padding: 10px 20px;
    width: 20%;
    color: white;
    font-family: inherit;
    font-size: 16px;
    cursor: pointer;
    &:hover{
        filter:brightness(0.8);
    }
`;