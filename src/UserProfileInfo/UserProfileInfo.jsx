import React, { useState } from 'react'
import './UserProfileInfo.css'

export default function UserProfileInfo({ onClose, avatarUrl: initialAvatarUrl }) {
    const [userName, setUserName] = useState('Tu Nombre')
    const [isEditingName, setIsEditingName] = useState(false)
    const [tempName, setTempName] = useState('Tu Nombre')
    // Usar la URL pasada como prop, o un fallback si no existe--imagen de sin foto de perfil
    const [avatarUrl, setAvatarUrl] = useState(initialAvatarUrl || 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/2048px-Default_pfp.svg.png')
    
    // Info State
    const [userInfo, setUserInfo] = useState('Disponible')
    const [isEditingInfo, setIsEditingInfo] = useState(false)
    const [tempInfo, setTempInfo] = useState('Disponible')

    const handleSaveName = () => {
        setUserName(tempName)
        setIsEditingName(false)
    }

    const handleCancelName = () => {
        setTempName(userName)
        setIsEditingName(false)
    }

    const handleSaveInfo = () => {
        setUserInfo(tempInfo)
        setIsEditingInfo(false)
    }

    const handleCancelInfo = () => {
        setTempInfo(userInfo)
        setIsEditingInfo(false)
    }

    return (
        <div className='user-profile-container'>
            <div className='user-profile-header'>
                <button className='back-btn' onClick={onClose}>
                    ←
                </button>
                <h3>Perfil</h3>
            </div>

            <div className='user-profile-content'>
                <div className='profile-avatar-section'>
                    <div className='avatar-wrapper'>
                        <img src={avatarUrl} alt="Profile" className='user-avatar-large' />
                        <div className='avatar-overlay'>
                            <span>📷 CAMBIAR</span>
                        </div>
                    </div>
                </div>

                <div className='profile-field-section'>
                    <label>Tu nombre</label>
                    
                    {isEditingName ? (
                        <div className='edit-name-wrapper'>
                            <input 
                                type="text" 
                                value={tempName} 
                                onChange={(e) => setTempName(e.target.value)}
                                className='edit-name-input'
                                autoFocus
                            />
                            <div className='edit-actions'>
                                <button onClick={handleSaveName}>
                                    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"></path></svg>
                                </button>
                                <button onClick={handleCancelName}>
                                    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path></svg>
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className='display-name-wrapper'>
                            <span className='display-name'>{userName}</span>
                            <button className='edit-btn' onClick={() => setIsEditingName(true)}>
                                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"></path></svg>
                            </button>
                        </div>
                    )}
                    
                    <p className='field-hint'>
                        Este no es tu nombre de usuario ni un PIN. Este nombre será visible para tus contactos de WhatsApp.
                    </p>
                </div>

                <div className='profile-field-section'>
                    <label>Info.</label>
                    {isEditingInfo ? (
                        <div className='edit-name-wrapper'>
                            <input 
                                type="text" 
                                value={tempInfo} 
                                onChange={(e) => setTempInfo(e.target.value)}
                                className='edit-name-input'
                                autoFocus
                            />
                            <div className='edit-actions'>
                                <button onClick={handleSaveInfo}>
                                    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"></path></svg>
                                </button>
                                <button onClick={handleCancelInfo}>
                                    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path></svg>
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className='display-name-wrapper'>
                            <span className='display-name'>{userInfo}</span>
                            <button className='edit-btn' onClick={() => setIsEditingInfo(true)}>
                                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"></path></svg>
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
