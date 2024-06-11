import React, { useEffect, useState } from 'react'
import * as S from './NavBar.styled'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { logout, setUserInfo } from '../../redux/slices/auth.slice';
import axios from 'axios';

const NavBar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isLogin } = useSelector(state => state.auth);
    const { userInfo } = useSelector(state => state.auth);
    const nickname = userInfo?.nickname;
    console.log(userInfo);

    const handleLogout = () => {
        dispatch(logout());
    };

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const token = localStorage.getItem("accessToken");
                const response = await axios.get("https://moneyfulpublicpolicy.co.kr/user",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                console.log(response.data.nickname);
                dispatch(setUserInfo(response.data));
            } catch (error) {
                console.log("Failed to fetch user info:", error);
            }
        };
        fetchUserInfo();
    }, [isLogin, navigate])

    return (
        <S.Container>
            <S.LeftDiv>
                <S.NavButton onClick={() => navigate("/")}>Home</S.NavButton>{" "}
                <S.NavButton $display={isLogin ? "block" : "none"} onClick={() => navigate("/mypage")}>내 프로필</S.NavButton>

            </S.LeftDiv>
            <S.RightDiv>
                <S.Span $display={isLogin ? "block" : "none"}>{nickname}님 환영합니다!</S.Span>
                <S.Button $display={isLogin ? "none" : "block"} onClick={() => navigate("/login")}>로그인</S.Button>
                <S.Button $display={isLogin ? "none" : "block"} onClick={() => navigate("/signup")}>회원가입</S.Button>
                <S.Button $display={isLogin ? "block" : "none"} onClick={() => handleLogout()}>로그아웃</S.Button>
            </S.RightDiv>

        </S.Container>
    )
}

export default NavBar