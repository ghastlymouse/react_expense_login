import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Home from '../pages/Home'
import Details from '../pages/Details'
import DefalutLayout from '../layouts/DefalutLayout'
import Login from '../pages/Login'
import SignUp from '../pages/SignUp'
import MyPage from '../pages/MyPage'
import { useSelector } from 'react-redux'

const PrivateRoutes = ({ element: Element, ...rest }) => {
    const { isLogin } = useSelector(state => state.auth);

    return isLogin ? <Element {...rest} /> : <Navigate to="/login" />
}

const PublicRoutes = ({ element: Element, ...rest }) => {
    const { isLogin } = useSelector(state => state.auth);

    return !isLogin ? <Element {...rest} /> : <Navigate to="/" />
}

const Router = () => {

    return (
        <BrowserRouter>
            <Routes>
                <Route path='/login' element={<PublicRoutes element={Login} />} />
                <Route path='/signup' element={<PublicRoutes element={SignUp} />} />
                <Route path='/' element={<PrivateRoutes element={DefalutLayout} />}>
                    <Route path='/' element={<PrivateRoutes element={Home} />} />
                    <Route path='/mypage' element={<PrivateRoutes element={MyPage} />} />
                    <Route path='/detail/:postId' element={<PrivateRoutes element={Details} />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default Router