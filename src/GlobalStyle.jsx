import { createGlobalStyle } from "styled-components"

const GlobalStyle = createGlobalStyle`
    body{
        font-family: "Jua", sans-serif;
        font-weight: 400;
        font-style: normal;
        font-size: 20px;
        width: 1280px;
        margin: 10px auto;
        background-color: skyblue;
        display: flex;
        flex-direction: column;
    }
`

export default GlobalStyle;