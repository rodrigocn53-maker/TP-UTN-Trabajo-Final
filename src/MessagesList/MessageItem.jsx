import React, { useState, useContext, useRef, useEffect } from 'react'
import { ContactDetailContext } from '../Context/Contexts'

export default function MessageItem({ message }) {
    const { deleteMessage, editMessage } = useContext(ContactDetailContext)
    const [isHovered, setIsHovered] = useState(false)
    const [showMenu, setShowMenu] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    const [editContent, setEditContent] = useState(message.message_content)
    
    // Determine if sent by user
    const isSentByMe = message.send_by_me
    const menuRef = useRef(null)

    // Close menu when clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setShowMenu(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleSaveEdit = (e) => {
        e.preventDefault()
        editMessage(message.message_id, editContent)
        setIsEditing(false)
    }

    return (
        <div 
            className={`message-bubble-container ${isSentByMe ? 'message-sent-container' : 'message-received-container'}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className={`message-bubble ${isSentByMe ? 'message-sent' : 'message-received'}`}>
                
                {/* Message Content or Edit Form */}
                {isEditing ? (
                    <form onSubmit={handleSaveEdit} className='edit-message-form'>
                        <input 
                            value={editContent} 
                            onChange={(e) => setEditContent(e.target.value)}
                            autoFocus
                            className='edit-message-input'
                        />
                        <button type='submit' className='edit-save-btn'>✓</button>
                        <button type='button' onClick={() => setIsEditing(false)} className='edit-cancel-btn'>✕</button>
                    </form>
                ) : (
                    <p>
                        {message.message_content}
                        <span className='message-time'>
                            {new Date(message.messages_create_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                        </span>
                    </p>
                )}

                {/* Dropdown Menu Trigger (Down Arrow) */}
                {isHovered && !isEditing && (
                    <button 
                        className='message-options-btn' 
                        onClick={() => setShowMenu(!showMenu)}
                    >
                        ⌄
                    </button>
                )}

                {/* Dropdown Menu */}
                {showMenu && (
                    <div className='message-options-menu' ref={menuRef}>
                        <div className='menu-item' onClick={() => deleteMessage(message.message_id)}>Eliminar</div>
                        {isSentByMe && (
                            <div className='menu-item' onClick={() => {
                                setIsEditing(true)
                                setShowMenu(false)
                            }}>Editar</div>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}
