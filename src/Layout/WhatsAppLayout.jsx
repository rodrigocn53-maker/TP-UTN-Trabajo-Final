import React, { useContext, useState } from 'react'
import { Outlet } from 'react-router'
import ContactSidebar from '../ContactSideBar/ContactSideBar'
import UserProfileInfo from '../UserProfileInfo/UserProfileInfo'
import './WhatsAppLayout.css'
import { ThemeContext, ContactListContext } from '../Context/Contexts'

export default function WhatsAppLayout() {
  const { isDark, toggleTheme } = useContext(ThemeContext)
  const { totalUnread } = useContext(ContactListContext) || { totalUnread: 0 } // Fallback if context missing
  const [showSettings, setShowSettings] = useState(false)
  const [showUserProfile, setShowUserProfile] = useState(false)
  
  return (
    <div className={`whatsapp-layout-container ${isDark ? 'dark-theme' : ''}`}>
        <div className='community-sidebar'>
            <div className='icon-placeholder'>👥</div>
            <div className='icon-placeholder'>
                💬
                {totalUnread > 0 && <span className='icon-badge'>{totalUnread}</span>}
            </div>
            <div className='icon-placeholder'>📞</div>
            <div 
                className={`icon-placeholder ${showSettings ? 'active-icon' : ''}`} 
                onClick={() => setShowSettings(!showSettings)}
                title="Configuración"
            >
                ⚙️
                {/* Settings Menu Popup */}
                {showSettings && (
                    <div className='settings-menu'>
                        <button className='settings-menu-item' onClick={(e) => { e.stopPropagation(); toggleTheme(); }}>
                            Cambiar tema
                        </button>
                        <button className='settings-menu-item' onClick={(e) => e.stopPropagation()}>
                            Configuración
                        </button>
                        <button className='settings-menu-item' onClick={(e) => { 
                            e.stopPropagation(); 
                            setShowSettings(false); 
                            setShowUserProfile(true); 
                        }}>
                            Perfil
                        </button>
                        <button className='settings-menu-item' onClick={(e) => e.stopPropagation()}>
                            Cerrar sesión
                        </button>
                    </div>
                )}
            </div>
        </div>
        
        <div className='contacts-sidebar'>
            {showUserProfile 
                ? <UserProfileInfo onClose={() => setShowUserProfile(false)} /> 
                : <ContactSidebar />
            }
        </div>

        <div className='chat-area'>
            <Outlet />
        </div>
    </div>
  )
}
