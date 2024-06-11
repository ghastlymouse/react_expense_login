import React, { useState } from 'react'
import * as S from './MyProfile.styled'
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setUserInfo } from '../../redux/slices/auth.slice';

const MyProfile = () => {
    const dispatch = useDispatch();

    const [newName, setNewName] = useState("");
    const { userInfo } = useSelector(state => state.auth);
    const nickname = userInfo?.nickname;

    const handleChangNickname = async (event) => {
        event.preventDefault();
        try {
            const token = localStorage.getItem("accessToken");
            const response = await axios.patch("https://moneyfulpublicpolicy.co.kr/profile",
                {
                    nickname: newName,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            console.log(response);
            if (response.data.success) {
                dispatch(setUserInfo({ ...userInfo, nickname: newName }));
                alert("닉네임이 변경되었습니다.");
                setNewName("");
            } else {
                alert("닉네임 변경에 실패했습니다.");
            }
        } catch (error) {
            console.error("Failed to update nickname:", error);
            alert("닉네임 변경에 실패했습니다.");
        }
    };

    return (
        <S.Section>
            <S.Form onSubmit={handleChangNickname}>
                <label>현재 닉네임 : {nickname}</label>
                <S.Input
                    type="text"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    required
                    minLength={1}
                    maxLength={10}
                />
                <S.Button type="submit">변경하기</S.Button>
            </S.Form>
        </S.Section>
    )
}

export default MyProfile