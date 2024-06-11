import React from 'react'
import * as S from './MyProfile.styled'

const MyProfile = () => {
    return (
        <S.Section>
            <S.Form>
                <label>현재 닉네임 : </label>
                <S.Input type="text" />
                <S.Button>변경하기</S.Button>
            </S.Form>
        </S.Section>
    )
}

export default MyProfile