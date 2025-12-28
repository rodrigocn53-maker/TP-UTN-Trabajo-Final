import React, { useContext, useEffect, useRef } from 'react'
import { ContactDetailContext, ContactListContext } from '../Context/Contexts'
import MessageItem from './MessageItem'
import './MessagesList.css'

const MessagesList =({ messages }) => {
    const { contactSelected } = useContext(ContactDetailContext);
    const { contactState } = useContext(ContactListContext);
    
    // If messages prop is passed (e.g. filtered), use it. Otherwise use all messages.
    const displayMessages = messages || contactSelected.messages

    const bottomRef = useRef(null)
    const prevLength = useRef(0)
    const prevContactId = useRef(null)

    useEffect(() => {
        const currentLength = displayMessages.length
        const currentContactId = contactSelected?.contact_id
        
        // Scroll if chat changed OR if new message added
        if (currentContactId !== prevContactId.current || currentLength > prevLength.current) {
            bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
        }

        prevLength.current = currentLength
        prevContactId.current = currentContactId
    }, [displayMessages, contactSelected]);

    const getDayLabel = (dateStr) => {
        const date = new Date(dateStr);
        const today = new Date();
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);

        if (date.toDateString() === today.toDateString()) return 'HOY';
        if (date.toDateString() === yesterday.toDateString()) return 'AYER';
        return date.toLocaleDateString(); 
    }

    let lastDate = null;

    return (
        <div className='messages-container'>
            {
                displayMessages.map((message) => {
                    const messageDate = new Date(message.messages_create_at);
                    const dateKey = messageDate.toDateString();
                    const showDate = lastDate !== dateKey;
                    if (showDate) lastDate = dateKey;

                    // Avatar Logic
                    let authorAvatar = null;
                    if (contactSelected?.isGroup && message.messages_state !== 'SENT' && message.message_author !== 'YO') {
                        const author = contactState.find(c => c.contact_name === message.message_author);
                        if (author) authorAvatar = author.contact_avatar;
                        else authorAvatar = `https://ui-avatars.com/api/?name=${message.message_author}&background=random&bold=true`;
                    }

                    return (
                        <React.Fragment key={message.message_id}>
                            {showDate && (
                                <div className='date-separator'>
                                    <span className='date-pill'>{getDayLabel(message.messages_create_at)}</span>
                                </div>
                            )}
                            <MessageItem message={message} avatar={authorAvatar}/>
                        </React.Fragment>
                    );
                })
            }
            <div ref={bottomRef} />
        </div>
    )
}

export default MessagesList