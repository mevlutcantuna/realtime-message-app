import React from 'react'
import { Navigate } from 'react-router-dom'

type Props = {
    children: JSX.Element,
}

const PrivateRoute: React.FC<Props> = ({ children }) => {
    const token = localStorage.getItem('token')

    if(!token) return <Navigate to="/login" replace={true}/>
    return children;
}

export default PrivateRoute