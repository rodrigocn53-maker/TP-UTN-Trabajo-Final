import React, { useContext } from 'react'
import { ContactDetailContext } from '../Context/Contexts'
import './MessagesList.css'

const MessagesList =() => {
    const { contactSelected } = useContext(ContactDetailContext);
    return (
        <div className='messages-container'>
            {
                contactSelected.messages.map((message) => {
                    const isSentByMe = message.send_by_me;
                    return (
                        <div key={message.message_id} className={`message-bubble-container ${isSentByMe ? 'message-sent-container' : 'message-received-container'}`}>
                            <div className={`message-bubble ${isSentByMe ? 'message-sent' : 'message-received'}`}>
                                <p>
                                    {message.message_content}
                                    <span className='message-time'>
                                        {new Date(message.messages_create_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                                        {/* Could add checks here if needed */}
                                    </span>
                                </p>
                            </div>
                        </div>
                    );
                })
            }
        </div>
    )
}

export default MessagesList