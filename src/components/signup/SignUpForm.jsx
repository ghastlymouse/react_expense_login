import React, { useState } from 'react'
import * as S from './signUpForm.styled'
import { useNavigate } from 'react-router-dom';
import { authApi } from '../../api/axios';
import Swal from 'sweetalert2';

const SignUpForm = () => {
    const navigate = useNavigate();

    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [nickname, setNickname] = useState("");

    const [isIdValid, setIsIdValid] = useState(true);
    const [isPasswordValid, setIsPasswordValid] = useState(true);
    const [isPasswordComfirmValid, setIsPasswordComfirmValid] = useState(true);
    const [isNicknameValid, setIsNicknameValid] = useState(true);

    const handleSubmitSignUpForm = async (event) => {
        event.preventDefault();
        setIsIdValid(true);
        setIsPasswordValid(true);
        setIsPasswordComfirmValid(true);
        setIsNicknameValid(true);

        if (!id.trim()) return setIsIdValid(false);
        if (!password.trim()) return setIsPasswordValid(false);
        if (password !== passwordConfirm) return setIsPasswordComfirmValid(false);
        if (!nickname.trim()) return setIsNicknameValid(false);

        try {
            const response = await authApi.post("/register", {
                id,
                password,
                nickname,
            })
            const data = response.data;
            if (data.success) {
                Swal.fire({
                    icon: "success",
                    title: "야호!",
                    text: "회원가입 성공!",
                    confirmButtonText: "로그인하러가기!",
                });
                navigate("/login");
            } else {
                Swal.fire({
                    icon: "error",
                    text: "당신은 모종의 이유로 회원가입 할 수 없습니다.",
                    confirmButtonText: "헉!",
                });
            }
        } catch (error) {
            console.error("Signup error:", error);
        }

    };

    return (
        <S.Section>
            <S.Form onSubmit={handleSubmitSignUpForm}>
                <S.TitleText>Sign Up</S.TitleText>
                <S.InputDiv>
                    <label htmlFor="userId">아이디</label>
                    <S.Input
                        id="userId"
                        type="text"
                        value={id}
                        onChange={(e) => setId(e.target.value)}
                        minLength={4}
                        maxLength={10}
                    />
                </S.InputDiv>
                <S.Span $display={isIdValid ? "none" : "block"}>유효한 아이디를 입력해주세요!</S.Span>
                <S.InputDiv>
                    <label htmlFor="pw">비밀번호</label>
                    <S.Input
                        id="pw"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        minLength={4}
                        maxLength={15}
                    />
                </S.InputDiv>
                <S.Span $display={isPasswordValid ? "none" : "block"}>유효한 비밀번호를 입력해주세요!</S.Span>
                <S.InputDiv>
                    <label htmlFor="pwConfirm">비밀번호 확인</label>
                    <S.Input
                        id="pwConfirm"
                        type="password"
                        value={passwordConfirm}
                        onChange={(e) => setPasswordConfirm(e.target.value)}
                        minLength={4}
                        maxLength={15}
                    />
                </S.InputDiv>
                <S.Span $display={isPasswordComfirmValid ? "none" : "block"}>비밀번호와 동일하게 입력해주세요!</S.Span>
                <S.InputDiv>
                    <label htmlFor="nickName">닉네임</label>
                    <S.Input
                        id="nickName"
                        type="text"
                        value={nickname}
                        onChange={(e) => setNickname(e.target.value)}
                        minLength={1}
                        maxLength={10}
                    />
                </S.InputDiv>
                <S.Span $display={isNicknameValid ? "none" : "block"}>유효한 닉네임을 입력해주세요!</S.Span>
                <S.ButtonDiv>
                    <S.Button type="submit" $color="green">회원가입</S.Button>
                    <S.Button type="button" onClick={() => navigate("/login")}>로그인</S.Button>
                </S.ButtonDiv>
            </S.Form>
        </S.Section>
    )
}

export default SignUpForm