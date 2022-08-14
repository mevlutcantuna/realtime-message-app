import React from 'react'
import LogoutIcon from '../assets/icons/LogoutIcon'

interface Props {
    user: any
}

const Header: React.FC<Props> = ({ user }) => {
    return (
        <div className='w-full h-4rem bg-indigo-400 text-white flex justify-content-center align-items-center'>
            <div className='flex justify-content-between align-items-center w-full' style={{ maxWidth: "80rem" }}>
                <h3>MessageApp</h3>
                <div className='flex align-items-center'>
                    <span className='bg-white p-2 border-circle text-indigo-400 mr-2'>CT</span>
                    <span className='mr-4'>{user?.displayName}</span>
                    <button className="flex justify-content-center align-items-center bg-indigo-400 cursor-pointer p-1">
                        <LogoutIcon />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Header