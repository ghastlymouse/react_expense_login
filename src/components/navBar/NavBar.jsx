import React from 'react'
import * as S from './NavBar.styled'
import { Link, useNavigate } from 'react-router-dom'

const NavBar = () => {
    const navigate = useNavigate();

    return (
        <S.Container>
            <S.LeftDiv>
                <Link to={"/"}>Home</Link>{" "}
                내 프로필
            </S.LeftDiv>
            <S.RightDiv>
                내 닉네임{" "}
                <S.Button>로그아웃</S.Button>
            </S.RightDiv>

        </S.Container>
    )
}

export default NavBar