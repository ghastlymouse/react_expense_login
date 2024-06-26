import React, { useState } from 'react'
import * as S from './MyProfile.styled'
import { useDispatch, useSelector } from 'react-redux';
import { setUserInfo } from '../../redux/slices/auth.slice';
import { authApi } from '../../api/axios';
import Swal from 'sweetalert2';

const MyProfile = () => {
    const dispatch = useDispatch();

    const { userInfo } = useSelector(state => state.auth);
    const nickname = userInfo?.nickname;
    const avatar = userInfo?.avatar;
    const [newName, setNewName] = useState("");
    const [isNewNameValid, setIsNewNameValid] = useState(true);
    const [previewImage, setPreviewImage] = useState(avatar); // 미리보기 용
    const [newAvatar, setNewAvatar] = useState(null); // 업로드 용 객체

    const handleChangNickname = async (event) => {
        event.preventDefault();
        setIsNewNameValid(true);
        if (!newName.trim()) return setIsNewNameValid(false);
        try {
            const response = await authApi.patch("/profile",
                {
                    nickname: newName,
                },
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            if (response.data.success) {
                dispatch(setUserInfo({ ...userInfo, nickname: newName }));
                Swal.fire({
                    icon: "success",
                    title: "와우!",
                    text: "닉네임 변경에 성공했습니다! 멋진 닉네임!",
                    confirmButtonText: "확인",
                });
                setNewName("");
            } else {
                Swal.fire({
                    icon: "error",
                    title: "이런!",
                    text: "닉네임 변경에 실패했습니다.. 괜찮습니다! 지금 닉네임도 멋집니다!",
                    confirmButtonText: "확인",
                    confirmButtonColor: "orange",
                });
            }
        } catch (error) {
            console.error("Failed to update profile:", error);
            Swal.fire({
                icon: "error",
                title: "이런!",
                text: "닉네임 변경에 실패했습니다.. 괜찮습니다! 지금 닉네임도 멋집니다!",
                confirmButtonText: "확인",
                confirmButtonColor: "orange",
            });
        }
    }

    const handleChangAvatar = async (event) => {
        event.preventDefault();
        try {
            const response = await authApi.patch("/profile",
                {
                    avatar: newAvatar,
                },
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            if (response.data.success) {
                dispatch(setUserInfo({ ...userInfo, avatar: response.data.avatar }));
                Swal.fire({
                    icon: "success",
                    title: "와우!",
                    text: "프로필 사진 변경에 성공했습니다! 멋진 사진!",
                    confirmButtonText: "확인",
                });
                setNewName("");
                setNewAvatar(null);
            } else {
                Swal.fire({
                    icon: "error",
                    title: "이런!",
                    text: "프로필 사진 변경에 실패했습니다.. 괜찮습니다! 지금 사진도 멋집니다!",
                    confirmButtonText: "확인",
                    confirmButtonColor: "orange",
                });
            }
        } catch (error) {
            console.error("Failed to update profile:", error);
            Swal.fire({
                icon: "error",
                title: "이런!",
                text: "프로필 사진 변경에 실패했습니다.. 괜찮습니다! 지금 사진도 멋집니다!",
                confirmButtonText: "확인",
                confirmButtonColor: "orange",
            });
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
                <S.Span $display={isNewNameValid ? "none" : "block"}>유효한 닉네임으로 입력해주세요!</S.Span>
                <S.Button type="submit">닉네임 변경</S.Button>
            </S.Form>
            <S.Form onSubmit={handleChangAvatar}>
                <S.Image src={previewImage} />
                <S.Input
                    type="file"
                    accept="image/*"
                    onChange={handleSelectImage}
                    required
                />
                <S.Button type="submit">프로필 사진 변경</S.Button>
            </S.Form>
        </S.Section>
    )
}

export default MyProfile