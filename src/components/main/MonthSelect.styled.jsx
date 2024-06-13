import styled from 'styled-components'

export const MonthSection = styled.section`
    width: 100%;
    background-color: white;
    color: black;
    display: flex;
    justify-content: center;
    padding: 20px;
    border: 5px solid black;
    border-radius: 8px;
    margin: 10px;
`;

export const Div = styled.div`
    width: 80%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 20px;
`;

export const MonthBtn = styled.button`
    background-color: ${props => (props.$active ? "blue" : "#c2b8b8;")};
    color: ${props => (props.$active ? "white" : "black")};
    border: none;
    border-radius: 10px;
    padding: 10px 20px;
    width: 15%;
    height: 60px;
    font-family: inherit;
    font-size: inherit;
    cursor: pointer;
    &:hover{
        background-color: blue;
        color: white;
    }
`;