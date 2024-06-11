import React, { useState } from 'react'
import * as S from './LoginForm.styled'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/slices/auth.slice';

const LoginForm = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmiLoginForm = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post("https://moneyfulpublicpolicy.co.kr/login",
                {
                    id,
                    password,
                }
            );
            const data = response.data;
            if (data.success) {
                dispatch(login(data.accessToken));
                navigate("/mypage");
            } else {
                alert("Login failed");
            }
        } catch (error) {
            console.error("Login error:", error);
            alert("Login failed");
        }
    };

    return (
        <S.Section>
            <S.Form onSubmit={handleSubmiLoginForm}>
                <S.TitleText>Login</S.TitleText>
                <S.InputDiv>
                    <label>아이디</label>
                    <S.Input
                        type="text"
                        value={id}
                        onChange={(e) => setId(e.target.value)}
                    />
                </S.InputDiv>
                <S.InputDiv>
                    <label>비밀번호</label>
                    <S.Input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
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