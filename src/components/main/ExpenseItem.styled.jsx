import styled from 'styled-components';

export const Div = styled.div`
    width: 95%;
    height: 50px;
    background-color: #d3cccc;
    border: 1px solid black;
    border-radius: 5px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    &:hover{
        transform: scale(1.025);
    }
`;

export const Span = styled.span`
    padding: 5px;
    background-color: transparent;
    color: #000000;
`;

export const SpanDiv = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`;