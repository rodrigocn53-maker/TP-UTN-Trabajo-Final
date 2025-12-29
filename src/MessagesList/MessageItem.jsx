import React, { useState, useContext, useRef, useEffect } from 'react'
import { ContactDetailContext, ContactListContext } from '../Context/Contexts'

export default function MessageItem({ message, avatar }) {
    const { deleteMessage, editMessage, addReaction } = useContext(ContactDetailContext)
    const [isHovered, setIsHovered] = useState(false)
    const [showMenu, setShowMenu] = useState(false)
    const [showReactionPicker, setShowReactionPicker] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    const [editContent, setEditContent] = useState(message.message_content)
    
    // Determine if sent by user
    const isSentByMe = message.send_by_me
    const menuRef = useRef(null)
    const reactionRef = useRef(null)
    const triggerRef = useRef(null)
    const [openUp, setOpenUp] = useState(false)

    // Check position opening
    const handleToggleMenu = () => {
        if (!showMenu && triggerRef.current) {
            const rect = triggerRef.current.getBoundingClientRect();
            const spaceBelow = window.innerHeight - rect.bottom;
            setOpenUp(spaceBelow < 220);
        }
        setShowMenu(!showMenu)
    }

    const commonReactions = ['👍', '❤️', '😂', '😮', '😢', '🙏']

    // Close menu clicking
    useEffect(() => {
        function handleClickOutside(event) {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setShowMenu(false);
            }
            if (reactionRef.current && !reactionRef.current.contains(event.target)) {
                setShowReactionPicker(false);
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

    const getStatusIcon = (state) => {
        if (state === 'SEEN') return <span className='status-icon seen'>✓✓</span>
        if (state === 'RECEIVED') return <span className='status-icon received'>✓✓</span>
        return <span className='status-icon sent'>✓</span>
    }

    const hasReactions = message.reactions && message.reactions.length > 0

    return (
        <div 
            className={`message-bubble-container ${isSentByMe ? 'message-sent-container' : 'message-received-container'} ${hasReactions ? 'has-reactions' : ''}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => {
                setIsHovered(false)
            }}
        >
            {avatar && !isSentByMe && (
                <img 
                    src={avatar} 
                    alt="" 
                    style={{
                        width: '37px', 
                        height: '37px', 
                        borderRadius: '50%', 
                        marginRight: '10px',
                        border: '1px solid var(--border-color)',
                        objectFit: 'cover',
                        flexShrink: 0
                    }} 
                />
            )}
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
                    <div className='message-content-wrapper'>
                        <p>
                            {message.message_content}
                            <span className='message-time'>
                                {new Date(message.messages_create_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                                {getStatusIcon(message.messages_state)}
                            </span>
                        </p>
                        
                        {/* Reactions Display */}
                        {message.reactions && message.reactions.length > 0 && (
                            <div className='message-reactions'>
                                {message.reactions.map((r, i) => <span key={i}>{r}</span>)}
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Hover Actions: Reaction & Menu (Outside Bubble) */}
            {(isHovered || showReactionPicker || showMenu) && !isEditing && (
                <div className='message-actions' style={{ order: isSentByMe ? -1 : 1 }}>
                    <button 
                        className='message-action-btn' 
                        onClick={() => setShowReactionPicker(!showReactionPicker)}
                        title="Reaccionar"
                    >
                        ☺
                    </button>
                    <button 
                        className='message-action-btn' 
                        ref={triggerRef}
                        onClick={handleToggleMenu}
                        title="Más opciones"
                    >
                        <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"></path></svg>
                    </button>

                    {/* Reaction Picker */}
                    {showReactionPicker && (
                        <div className='reaction-picker-popover' ref={reactionRef}>
                            {commonReactions.map(emoji => (
                                <span 
                                    key={emoji} 
                                    className='reaction-emoji-btn'
                                    onClick={() => {
                                        addReaction(message.message_id, emoji)
                                        setShowReactionPicker(false)
                                    }}
                                >
                                    {emoji}
                                </span>
                            ))}
                        </div>
                    )}

                    {/* Dropdown Menu */}
                    {showMenu && (
                        <div className={`message-options-menu ${openUp ? 'open-up' : ''}`} ref={menuRef}>
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
            )}
        </div>
    )
}
