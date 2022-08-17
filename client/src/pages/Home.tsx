import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { auth } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { ProgressSpinner } from 'primereact/progressspinner';
import { UserType } from '../types';
import SideBar from '../components/SideBar';
import ChatRoom from '../components/ChatRoom';


const Home: React.FC = () => {
    const [user, setUser] = useState<UserType | null>(null);
    const [loading, setLoading] = useState<boolean>(false)

    useEffect(() => {
        setLoading(true)
        onAuthStateChanged(auth, (authedUser: any) => {
            setUser(authedUser)
            setLoading(false)
        })
    }, [])

    if (loading) return <div className='w-full mt-30 flex align-items-center justify-content-center spinner'>
        <ProgressSpinner style={{ width: '50px', height: '50px', margin: "15rem" }} strokeWidth="8" fill="#fff" animationDuration="1s" />
    </div>

    return (
        <div className='w-full min-h-screen surface-200 px-2'>
            <Header user={user} />
            <div className='flex justify-content-center mx-auto mt-4' style={{ maxWidth: "80rem" }}>
                <SideBar />
                <ChatRoom />
            </div>
        </div>
    )
}

export default Home