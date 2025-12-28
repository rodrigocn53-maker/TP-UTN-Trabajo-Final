import React, { useContext, useState } from 'react'
import { ContactDetailContext, ThemeContext } from '../Context/Contexts'
import './AddNewMenssage.css'
import EmojiPicker from 'emoji-picker-react'

export default function AddNewMenssage() {
    const { AddNewMenssage: addMessage } = useContext(ContactDetailContext)
    const { isDark } = useContext(ThemeContext)
    const [messageContent, setMessageContent] = useState('')
    const [showEmojiPicker, setShowEmojiPicker] = useState(false)

    function handleSubmitNewMenssage (event){
        event.preventDefault()
        if (!messageContent.trim()) return; 
        addMessage(messageContent)
        setMessageContent('') // clear input
        setShowEmojiPicker(false)
    }

    const onEmojiClick = (emojiData) => {
        setMessageContent(prev => prev + emojiData.emoji)
    }

    return (
        <div className='message-input-container'>
            {showEmojiPicker && (
                <div className='emoji-picker-wrapper'>
                    <EmojiPicker 
                        onEmojiClick={onEmojiClick}
                        theme={isDark ? 'dark' : 'light'}
                        width={300}
                        height={400}
                        previewConfig={{ showPreview: false }}
                    />
                </div>
            )}
            <button 
                className={`input-icon-btn ${showEmojiPicker ? 'active-emoji-btn' : ''}`} 
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            >
                😊
            </button>
            <button className='input-icon-btn'>➕</button>
            <form onSubmit={handleSubmitNewMenssage} className='message-form'>
                <input 
                    id='mensaje' 
                    className='message-input' 
                    placeholder='Escribe un mensaje' 
                    autoComplete='off'
                    autoFocus
                    value={messageContent}
                    onChange={(e) => setMessageContent(e.target.value)}
                />
                <button className='input-icon-btn send-btn'>➤</button>
            </form>
            {(false) && <button className='input-icon-btn'>🎤</button> /* Mic if input empty */} 
        </div>
    )
}
