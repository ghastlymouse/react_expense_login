import React, { useState } from 'react'
import * as S from './signUpForm.styled'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignUpForm = () => {
    const navigate = useNavigate();

    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [nickname, setNickname] = useState("");

    const handleSubmitSignUpForm = async (event) => {
        event.preventDefault();
        if (!id.trim()) return alert("아이디를 제대로 입력해주세요!");
        if (!password.trim()) return alert("비밀번호를 제대로 입력해주세요!");
        if (password !== passwordConfirm) return alert("비밀번호와 비밀번호 확인을 일치하게 입력해주세요!");
        if (!nickname.trim()) return alert("닉네임을 제대로 입력해주세요!");

        try {
            const response = await axios.post("https://moneyfulpublicpolicy.co.kr/register", {
                id,
                password,
                nickname,
            })
            const data = response.data;
            if (data.success) {
                console.log("signup success");
                navigate("/login");
            } else {
                alert("Signup failed");
            }
        } catch (error) {
            console.error("Signup error:", error);
            alert("Signup failed");
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
                        required
                        minLength={4}
                        maxLength={10}
                    />
                </S.InputDiv>
                <S.InputDiv>
                    <label htmlFor="pw">비밀번호</label>
                    <S.Input
                        id="pw"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        minLength={4}
                        maxLength={15}
                    />
                </S.InputDiv>
                <S.InputDiv>
                    <label htmlFor="pwConfirm">비밀번호 확인</label>
                    <S.Input
                        id="pwConfirm"
                        type="password"
                        value={passwordConfirm}
                        onChange={(e) => setPasswordConfirm(e.target.value)}
                        required
                        minLength={4}
                        maxLength={15}
                    />
                </S.InputDiv>
                <S.InputDiv>
                    <label htmlFor="nickName">닉네임</label>
                    <S.Input
                        id="nickName"
                        type="text"
                        value={nickname}
                        onChange={(e) => setNickname(e.target.value)}
                        required
                        minLength={1}
                        maxLength={10}
                    />
                </S.InputDiv>
                <S.ButtonDiv>
                    <S.Button $color="green">회원가입</S.Button>
                </S.ButtonDiv>
            </S.Form>
        </S.Section>
    )
}

export default SignUpForm