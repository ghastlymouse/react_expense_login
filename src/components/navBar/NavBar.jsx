import React, { useEffect } from 'react'
import * as S from './NavBar.styled'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { logout, setUserInfo } from '../../redux/slices/auth.slice';
import { authApi } from '../../api/axios';
import Swal from 'sweetalert2';

const NavBar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isLogin } = useSelector(state => state.auth);
    const { userInfo } = useSelector(state => state.auth);
    const nickname = userInfo?.nickname;
    const avatar = userInfo?.avatar;

    const handleLogout = () => {
        Swal.fire({
            icon: "warning",
            title: "로그아웃 하시겠습니까?",
            confirmButtonText: "로그아웃",
            showCancelButton: true,
            cancelButtonText: "아니요",
            confirmButtonColor: "red",
        }).then(result => {
            if (result.isConfirmed) {
                Swal.fire({
                    icon: "success",
                    title: "안녕~",
                    text: "로그아웃중..",
                    showConfirmButton: false,
                    timer: 2000,
                });
                dispatch(logout());
                navigate("/login")
            }
        })
    };

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const response = await authApi.get("/user");
                dispatch(setUserInfo(response.data));
            } catch (error) {
                console.error("Failed to fetch user info:", error);
            }
        };
        fetchUserInfo();
    }, [isLogin])

    return (
        <S.Container>
            <S.LeftDiv>
                <S.NavButton onClick={() => navigate("/")}>Home</S.NavButton>{" "}
                <S.NavButton onClick={() => navigate("/mypage")}>내 프로필</S.NavButton>
            </S.LeftDiv>
            <S.RightDiv>
                <S.ProfileDiv>
                    <S.ProfileImage src={avatar} />
                    <S.Span>"{nickname}"님 환영합니다!</S.Span>
                </S.ProfileDiv>
                <S.Button onClick={() => handleLogout()} $color="red">로그아웃</S.Button>
            </S.RightDiv>

        </S.Container>
    )
}

export default NavBar