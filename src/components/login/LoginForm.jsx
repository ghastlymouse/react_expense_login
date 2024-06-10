import React from 'react'
import * as S from './LoginForm.styled'
import { useNavigate } from 'react-router-dom'

const LoginForm = () => {
    const navigate = useNavigate();

    return (
        <S.Section>
            <S.Form>
                <S.TitleText>Login</S.TitleText>
                <S.InputDiv>
                    <label>아이디</label>
                    <S.Input type="text" />
                </S.InputDiv>
                <S.InputDiv>
                    <label>비밀번호</label>
                    <S.Input type="password" />
                </S.InputDiv>
                <S.ButtonDiv>
                    <S.Button>로그인</S.Button>
                    <S.Button $color="green" onClick={() => navigate('/signup')}>회원가입</S.Button>
                </S.ButtonDiv>
            </S.Form>
        </S.Section>
    )
}

export default LoginForm