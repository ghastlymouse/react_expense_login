import React, { useState } from 'react'
import * as S from './LoginForm.styled'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { login } from '../../redux/slices/auth.slice';
import { authApi } from '../../api/axios';
import Swal from 'sweetalert2';

const LoginForm = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    const [isIdValid, setIsIdValid] = useState(true);
    const [isPasswordValid, setIsPasswordValid] = useState(true);

    const handleSubmiLoginForm = async (event) => {
        event.preventDefault();
        setIsIdValid(true);
        setIsPasswordValid(true);
        if (!id.trim()) return setIsIdValid(false);
        if (!password.trim()) return setIsPasswordValid(false);

        try {
            const response = await authApi.post("/login",
                {
                    id,
                    password,
                }
            );
            const data = response.data;
            if (data.success) {
                dispatch(login(data.accessToken));
                Swal.fire({
                    icon: "success",
                    title: "로그인 성공!",
                    text: "접속 중 ..",
                    timer: 2000,
                    showConfirmButton: false,
                });
                navigate("/");
            } else {
                Swal.fire({
                    icon: "error",
                    text: "당신의 모종의 이유로 로그인 할 수 없습니다.",
                    confirmButtonText: "헉!",
                });
            }
        } catch (error) {
            console.error("Login error:", error);
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
                        required
                    />
                </S.InputDiv>
                <S.Span $display={isIdValid ? "none" : "block"}>아이디를 제대로 입력해주세요!</S.Span>
                <S.InputDiv>
                    <label>비밀번호</label>
                    <S.Input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </S.InputDiv>
                <S.Span $display={isPasswordValid ? "none" : "block"}>비밀번호를 제대로 입력해주세요!</S.Span>
                <S.ButtonDiv>
                    <S.Button type="submit">로그인</S.Button>
                    <S.Button type="button" $color="green" onClick={() => navigate('/signup')}>회원가입</S.Button>
                </S.ButtonDiv>
            </S.Form>
        </S.Section>
    )
}

export default LoginForm