import React from 'react'
import './MobileBottomNav.css'

export default function MobileBottomNav({ activeTab, onTabChange }) {
    const tabs = [
        { 
            id: 'chats', 
            label: 'Chats', 
            icon: <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"></path></svg>
        },
        { 
            id: 'calls', 
            label: 'Llamadas', 
            icon: <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56-.35-.12-.74-.03-1.01.24l-1.57 1.97c-2.83-1.44-5.15-3.75-6.59-6.59l1.97-1.57c.26-.26.35-.65.24-1C9.13 6.42 8.93 5.23 8.93 4c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1 0 9.39 7.61 17 17 17 .55 0 1-.45 1-1v-3.95c0-.55-.45-1-1-1z"></path></svg>
        },
        { 
            id: 'contacts', 
            label: 'Contactos', 
            icon: <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"></path></svg>
        }
    ]

    return (
        <nav className='mobile-bottom-nav'>
            {tabs.map(tab => (
                <button
                    key={tab.id}
                    className={`mobile-nav-tab ${activeTab === tab.id ? 'active' : ''}`}
                    onClick={() => onTabChange(tab.id)}
                >
                    <span className='mobile-nav-icon'>{tab.icon}</span>
                    <span className='mobile-nav-label'>{tab.label}</span>
                </button>
            ))}
        </nav>
    )
}
