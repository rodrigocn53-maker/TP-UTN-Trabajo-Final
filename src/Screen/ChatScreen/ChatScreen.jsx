import React, { useState, useContext } from 'react'
import ContactSidebar from '../../ContactSideBar/ContactSideBar'
import ContactDirectory from '../../ContactDirectory/ContactDirectory'
import CallsHistory from '../../CallsHistory/CallsHistory'
/* import MobileHeader from '../../Mobile/MobileHeader' - Eliminado ya que se integró en ContactSidebar */
import MobileBottomNav from '../../Mobile/MobileBottomNav'
import { ThemeContext } from '../../Context/Contexts'
import './ChatScreen.css'

export default function ChatScreen() {
  const [mobileTab, setMobileTab] = useState('chats')
  const [showMobileSettings, setShowMobileSettings] = useState(false)
  
  // Usar ThemeContext con valores por defecto si no existe
  const themeContext = useContext(ThemeContext)
  const isDark = themeContext?.isDark || false
  const toggleTheme = themeContext?.toggleTheme || (() => {})

  const handleTabChange = (tab) => {
    setMobileTab(tab)
  }

  const renderContent = () => {
    switch(mobileTab) {
      case 'contacts':
        return <ContactDirectory />
      case 'calls':
        return <CallsHistory />
      case 'chats':
      default:
        return <ContactSidebar />
    }
  }

  return (
    <div className='chat-screen-container'>
        {/* Header Móvil Eliminado - Integrado dentro de ContactSidebar */}
        
        {/* Menú de Configuración Móvil */}
        {showMobileSettings && (
          <div className='mobile-settings-overlay' onClick={() => setShowMobileSettings(false)}>
            <div className='mobile-settings-menu' onClick={(e) => e.stopPropagation()}>
              <div 
                className='mobile-settings-item theme-toggle-row' 
                onClick={(e) => { e.stopPropagation(); toggleTheme(); }}
                title={`Tema: ${isDark ? 'Oscuro' : 'Claro'}`}
              >
                <span>Tema</span>
                <div className='theme-toggle-container'>
                    <span className={`theme-icon ${!isDark ? 'active' : ''}`}>
                        <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1zM5.99 4.93c.39-.39.39-1.02 0-1.41-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0zm13.48 14.14c.39-.39.39-1.02 0-1.41-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0zm-14.9 0c.39-.39.39-1.02 0-1.41-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0zm14.14-14.14c.39-.39.39-1.02 0-1.41-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0z"></path></svg>
                    </span>
                    <div className={`theme-switch ${isDark ? 'active' : ''}`}>
                        <div className='theme-switch-handle'></div>
                    </div>
                    <span className={`theme-icon ${isDark ? 'active' : ''}`}>
                        <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9c0-.46-.04-.92-.1-1.36-.98 1.37-2.58 2.26-4.4 2.26-3.03 0-5.5-2.47-5.5-5.5 0-1.82.89-3.42 2.26-4.4-.44-.06-.9-.1-1.36-.1z"></path></svg>
                    </span>
                </div>
              </div>
              <div className='mobile-settings-item'>Configuración</div>
              <div className='mobile-settings-item'>Cerrar sesión</div>
            </div>
          </div>
        )}

        <div className='chat-screen-content'>
            <ContactSidebar onSettingsClick={() => setShowMobileSettings(!showMobileSettings)} />
        </div>
        <MobileBottomNav activeTab={mobileTab} onTabChange={handleTabChange} />
    </div>
  )
}
