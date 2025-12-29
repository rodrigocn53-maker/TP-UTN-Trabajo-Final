import React, { useState } from 'react'
import './UserProfileInfo.css'

export default function UserProfileInfo({ onClose, avatarUrl: initialAvatarUrl }) {
    const [userName, setUserName] = useState('Tu Nombre')
    const [isEditingName, setIsEditingName] = useState(false)
    const [tempName, setTempName] = useState('Tu Nombre')
    // Usar la URL pasada como prop, o un fallback si no existe--imagen de sin foto de perfil
    const [avatarUrl, setAvatarUrl] = useState(initialAvatarUrl || 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/2048px-Default_pfp.svg.png')

    const handleSaveName = () => {
        setUserName(tempName)
        setIsEditingName(false)
    }

    const handleCancelName = () => {
        setTempName(userName)
        setIsEditingName(false)
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
                                <button onClick={handleSaveName}>✔️</button>
                                <button onClick={handleCancelName}>❌</button>
                            </div>
                        </div>
                    ) : (
                        <div className='display-name-wrapper'>
                            <span className='display-name'>{userName}</span>
                            <button className='edit-btn' onClick={() => setIsEditingName(true)}>
                                ✎
                            </button>
                        </div>
                    )}
                    
                    <p className='field-hint'>
                        Este no es tu nombre de usuario ni un PIN. Este nombre será visible para tus contactos de WhatsApp.
                    </p>
                </div>

                <div className='profile-field-section'>
                    <label>Info.</label>
                    <div className='display-name-wrapper'>
                        <span className='display-name'>Disponible</span>
                        <button className='edit-btn'>✎</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
