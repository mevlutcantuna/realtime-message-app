import { MessageType, UserType } from '../../types'
import SentMessage from './SentMessage'
import ReceivedMessage from './ReceivedMessage'
import React, { useEffect, useRef } from 'react'
import { useAppSelector } from '../../app/hooks'
import { ChatStateType } from './ChatSlice'
import { UserStateType } from '../user/userSlice'

const Messages = () => {
    const messagesRef = useRef(null)
    const { messages } = useAppSelector<ChatStateType>((state) => state.chat)
    const { user } = useAppSelector<UserStateType>((state) => state.user)

    useEffect(() => {
        // 👇️ scroll to bottom every time messages change
        ;(messagesRef as any)?.current?.scrollIntoView({ behavior: 'auto' })
    }, [messages])

    return (
        <div className="overflow-scroll hide-scroll">
            {messages?.map((message: MessageType) =>
                message.user.id === (user as UserType).uid ? (
                    <SentMessage key={message._id} message={message} />
                ) : (
                    <ReceivedMessage key={message._id} message={message} />
                )
            )}
            <div ref={messagesRef} />
        </div>
    )
}

export default Messages
