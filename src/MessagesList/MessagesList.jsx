import React, { useContext } from 'react'
import { ContactDetailContext } from '../Context/Contexts'
import MessageItem from './MessageItem'
import './MessagesList.css'

const MessagesList =({ messages }) => {
    const { contactSelected } = useContext(ContactDetailContext);
    
    // If messages prop is passed (e.g. filtered), use it. Otherwise use all messages.
    const displayMessages = messages || contactSelected.messages

    return (
        <div className='messages-container'>
            {
                displayMessages.map((message) => {
                    return (
                        <MessageItem key={message.message_id} message={message}/>
                    );
                })
            }
        </div>
    )
}

export default MessagesList