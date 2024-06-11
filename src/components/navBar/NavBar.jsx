import React from 'react'
import * as S from './NavBar.styled'
import { Link, useNavigate } from 'react-router-dom'

const NavBar = () => {
    const navigate = useNavigate();

    return (
        <S.Container>
            <S.LeftDiv>
                <S.NavButton onClick={() => navigate("/")}>Home</S.NavButton>{" "}
                <S.NavButton onClick={() => navigate("/mypage")}>내 프로필</S.NavButton>

            </S.LeftDiv>
            <S.RightDiv>
                내 닉네임
                <S.Button onClick={() => navigate("/login")}>로그인</S.Button>
                <S.Button onClick={() => navigate("/signup")}>회원가입</S.Button>
                <S.Button>로그아웃</S.Button>
            </S.RightDiv>

        </S.Container>
    )
}

export default NavBar