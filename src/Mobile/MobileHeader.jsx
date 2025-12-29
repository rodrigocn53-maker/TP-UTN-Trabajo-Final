import React, { useState } from 'react'
import './MobileHeader.css'

export default function MobileHeader({ onMenuClick, onSearchClick, onSettingsClick }) {
    const [showSearch, setShowSearch] = useState(false)

    return (
        <header className='mobile-header'>
            {!showSearch ? (
                <div className='mobile-header-main'>
                    <h1 className='mobile-header-title'>WhatsApp</h1>
                    <div className='mobile-header-actions'>
                        <button className='mobile-header-btn' title='Cámara'>
                            <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                                <path d="M21 6h-3.17L16 4h-6v2h5.12l1.83 2H21v12H5v-9H3v9c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zM8 14c0 2.76 2.24 5 5 5s5-2.24 5-5-2.24-5-5-5-5 2.24-5 5zm5-3c1.65 0 3 1.35 3 3s-1.35 3-3 3-3-1.35-3-3 1.35-3 3-3zM5 6h3V4H5V1H3v3H0v2h3v3h2z"></path>
                            </svg>
                        </button>
                        <button 
                            className='mobile-header-btn' 
                            onClick={onSettingsClick}
                            title='Más opciones'
                        >
                            ⋮
                        </button>
                    </div>
                </div>
            ) : (
                <div className='mobile-header-search'>
                    <button 
                        className='mobile-header-btn'
                        onClick={() => setShowSearch(false)}
                    >
                        ←
                    </button>
                    <input 
                        type='text'
                        placeholder='Buscar...'
                        className='mobile-search-input'
                        autoFocus
                    />
                </div>
            )}
        </header>
    )
}
