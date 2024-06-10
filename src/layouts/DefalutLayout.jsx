import React from 'react'
import NavBar from '../components/NavBar'
import { Outlet } from 'react-router-dom'

const DefalutLayout = () => {
    return (
        <div id="defalut-layout">
            <NavBar />
            <Outlet />
        </div>
    )
}

export default DefalutLayout