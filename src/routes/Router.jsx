import React from 'react'
import { createBrowserRouter } from "react-router-dom"
import Home from '../pages/Home'
import Details from '../pages/Details'
import DefalutLayout from '../layouts/DefalutLayout'
import Login from '../pages/Login'
import SignUp from '../pages/SignUp'

const Router = createBrowserRouter([
    {
        element: <DefalutLayout />,
        children: [
            { path: '/', element: <Home /> },
            { path: '/detail/:id', element: <Details /> },
            { path: '/login', element: <Login /> },
            { path: '/signup', element: <SignUp /> }
        ]
    }
])

export default Router