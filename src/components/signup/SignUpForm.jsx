import React, { useState } from 'react'
import * as S from './signUpForm.styled'

const SignUpForm = () => {
    const [userId, setUserId] = useState("");
    const [pw, setPw] = useState("");
    const [pwConfirm, setPwConfirm] = useState("");
    const [nickName, setNickName] = useState("");

    const handleSubmitSignUpForm = (event) => {
        event.preventDefault();
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
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                    />
                </S.InputDiv>
                <S.InputDiv>
                    <label htmlFor="pw">비밀번호</label>
                    <S.Input
                        id="pw"
                        type="password"
                        value={pw}
                        onChange={(e) => setPw(e.target.value)}
                    />
                </S.InputDiv>
                <S.InputDiv>
                    <label htmlFor="pwConfirm">비밀번호 확인</label>
                    <S.Input
                        id="pwConfirm"
                        type="password"
                        value={pwConfirm}
                        onChange={(e) => setPwConfirm(e.target.value)}
                    />
                </S.InputDiv>
                <S.InputDiv>
                    <label htmlFor="nickName">닉네임</label>
                    <S.Input
                        id="nickName"
                        type="text"
                        value={nickName}
                        onChange={(e) => setNickName(e.target.value)}
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