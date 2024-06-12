import React, { useState } from 'react'
import * as S from './MyProfile.styled'
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setUserInfo } from '../../redux/slices/auth.slice';

const MyProfile = () => {
    const dispatch = useDispatch();

    const { userInfo } = useSelector(state => state.auth);
    const nickname = userInfo?.nickname;
    const avatar = userInfo?.avatar;
    const [newName, setNewName] = useState("");
    const [previewImage, setPreviewImage] = useState(avatar); // 미리보기 용
    const [newAvatar, setNewAvatar] = useState(null); // 업로드 용 객체

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
            console.error("Failed to update profile:", error);
            alert("닉네임 변경에 실패했습니다.");
        }
    }

    const handleChangAvatar = async (event) => {
        event.preventDefault();
        try {
            const token = localStorage.getItem("accessToken");
            const response = await axios.patch("https://moneyfulpublicpolicy.co.kr/profile",
                {
                    avatar: newAvatar,
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
                console.log(response.data.avatar);
                dispatch(setUserInfo({ ...userInfo, avatar: response.data.avatar }));
                alert("프로필 사진이 변경되었습니다.");
                setNewName("");
                setNewAvatar(null);
            } else {
                alert("프로필 사진 변경에 실패했습니다.");
            }
        } catch (error) {
            console.error("Failed to update profile:", error);
            alert("프로필 사진 변경에 실패했습니다.");
        }
    };

    const handleSelectImage = (event) => {
        const { files } = event.target;
        const selectImage = files[0];
        setNewAvatar(selectImage);
        const reader = new FileReader();
        reader.readAsDataURL(selectImage);
        reader.onloadend = () => {
            setPreviewImage(reader.result);
        };
    };

    return (
        <S.Section>
            <S.Form onSubmit={handleChangNickname}>
                <S.Input
                    type="text"
                    placeholder={`현재 닉네임 : ${nickname}`}
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    minLength={1}
                    maxLength={10}
                />
                <S.Button type="submit">닉네임 변경</S.Button>
            </S.Form>
            <S.Form onSubmit={handleChangAvatar}>
                <S.Image src={previewImage} />
                <S.Input
                    type="file"
                    accept="image/*"
                    onChange={handleSelectImage}
                />
                <S.Button type="submit">프로필 사진 변경</S.Button>
            </S.Form>
        </S.Section>
    )
}

export default MyProfile