import React from 'react'
import { useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom'

const PrivateRoutes = () => {
    const navigate = useNavigate();
    const { isLogin } = useSelector(state => state.auth);

    return isLogin ? <Outlet /> : navigate("/login");
}

export default PrivateRoutes