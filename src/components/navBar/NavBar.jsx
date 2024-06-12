import React, { useEffect } from 'react'
import * as S from './NavBar.styled'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { logout, setUserInfo } from '../../redux/slices/auth.slice';
import { authApi } from '../../api/axios';

const NavBar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isLogin } = useSelector(state => state.auth);
    const { userInfo } = useSelector(state => state.auth);
    const nickname = userInfo?.nickname;
    const avatar = userInfo?.avatar;
    console.log(userInfo);

    const handleLogout = () => {
        const isLogout = confirm("정말 로그아웃 하시겠습니까?");
        if (isLogout) {
            dispatch(logout());
            navigate("/login");
        }
    };

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const response = await authApi.get("/user");
                console.log(response.data.nickname);
                dispatch(setUserInfo(response.data));
            } catch (error) {
                console.log("Failed to fetch user info:", error);
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