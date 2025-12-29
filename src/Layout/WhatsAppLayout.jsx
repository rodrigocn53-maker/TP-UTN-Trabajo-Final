import React, { useContext, useState } from 'react'
import { Outlet, useLocation } from 'react-router'
import ContactSidebar from '../ContactSideBar/ContactSideBar'
import UserProfileInfo from '../UserProfileInfo/UserProfileInfo'
import ContactDirectory from '../ContactDirectory/ContactDirectory'
import CallsHistory from '../CallsHistory/CallsHistory'
import MobileBottomNav from '../Mobile/MobileBottomNav'
import './WhatsAppLayout.css'
import { ThemeContext, ContactListContext } from '../Context/Contexts'

export default function WhatsAppLayout() {
  const { isDark, toggleTheme } = useContext(ThemeContext)
  const { totalUnread } = useContext(ContactListContext) || { totalUnread: 0 } // Valor por defecto si falta el contexto
  const [showSettings, setShowSettings] = useState(false)
  const [showUserProfile, setShowUserProfile] = useState(false)
  const [activeTab, setActiveTab] = useState('chats') // 'contacts', 'chats', 'calls'
  const [showMobileSettings, setShowMobileSettings] = useState(false)
  const location = useLocation()
  
  // URL de la imagen de perfil del usuario
  const PROFILE_IMAGE_URL = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkdyavFYsxm4XSzR0CqzTFyaEJaOUAS6_LcA&s"
  
  // Verificar si estamos en una ruta de chat para cambiar la vista móvil
  const isInChat = location.pathname.startsWith('/chat/')
  
  const handleTabChange = (tab) => {
      setActiveTab(tab)
      setShowUserProfile(false) // Cerrar perfil al cambiar de pestaña
      setShowSettings(false)
  }

  const renderSidebarContent = () => {
      if (showUserProfile) return <UserProfileInfo avatarUrl={PROFILE_IMAGE_URL} onClose={() => setShowUserProfile(false)} />
      
      switch (activeTab) {
          case 'contacts':
              return <ContactDirectory />
          case 'calls':
              return <CallsHistory />
          case 'chats':
          default:
              return <ContactSidebar onSettingsClick={() => setShowMobileSettings(!showMobileSettings)} />
      }
  }

  return (
    <div className={`whatsapp-layout-container ${isDark ? 'dark-theme' : ''} ${isInChat ? 'mobile-chat-view' : ''}`}>
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

        <div className='community-sidebar'>
            <div 
                className={`icon-placeholder ${activeTab === 'contacts' ? 'active-tab' : ''}`}
                onClick={() => handleTabChange('contacts')}
                title="Contactos"
            >
                <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"></path></svg>
            </div>
            
            <div 
                className={`icon-placeholder ${activeTab === 'chats' ? 'active-tab' : ''}`}
                onClick={() => handleTabChange('chats')}
                title="Chats"
            >
                <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"></path></svg>
                {totalUnread > 0 && <span className='icon-badge'>{totalUnread}</span>}
            </div>
            
            <div 
                className={`icon-placeholder ${activeTab === 'calls' ? 'active-tab' : ''}`}
                onClick={() => handleTabChange('calls')}
                title="Llamadas"
            >
                <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56-.35-.12-.74-.03-1.01.24l-1.57 1.97c-2.83-1.44-5.15-3.75-6.59-6.59l1.97-1.57c.26-.26.35-.65.24-1C9.13 6.42 8.93 5.23 8.93 4c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1 0 9.39 7.61 17 17 17 .55 0 1-.45 1-1v-3.95c0-.55-.45-1-1-1z"></path></svg>
            </div>
            
            <div className='nav-bottom'>
                <div 
                    className={`icon-placeholder ${showSettings ? 'active-icon' : ''}`} 
                    onClick={() => setShowSettings(!showSettings)}
                    title="Configuración"
                >
                    <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L3.13 8.87c-.11.2-.06.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.11-.22.06-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"></path></svg>
                    {/* Popup del Menú de Configuración */}
                    {showSettings && (
                        <div className='settings-menu'>
                            <div 
                                className='settings-menu-item theme-toggle-row' 
                                onClick={(e) => { e.stopPropagation(); toggleTheme(); }}
                                title={`Tema: ${isDark ? 'Oscuro' : 'Claro'}`}
                                style={{ userSelect: 'none', WebkitUserSelect: 'none' }}
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
                            <button className='settings-menu-item' onClick={(e) => e.stopPropagation()}>
                                Configuración
                            </button>
                            {/* El perfil se movió al avatar de la barra lateral */}
                            <button className='settings-menu-item' onClick={(e) => e.stopPropagation()}>
                                Cerrar sesión
                            </button>
                        </div>
                    )}
                </div>

                <div 
                    className={`icon-placeholder user-avatar-trigger ${showUserProfile ? 'active-tab' : ''}`}
                    onClick={() => {
                        if (showUserProfile) {
                            setShowUserProfile(false)
                            setActiveTab('chats') // Volver a chats
                        } else {
                            setShowUserProfile(true)
                            setActiveTab('') // Deseleccionar visualmente otras pestañas
                            setShowSettings(false)
                        }
                    }}
                    title="Mi Perfil"
                >
                    <img 
                        src={PROFILE_IMAGE_URL} 
                        alt="Perfil" 
                        className="sidebar-avatar"
                    />
                </div>
            </div>
        </div>
        
        <div className='contacts-sidebar'>
            {renderSidebarContent()}
        </div>

        <div className='chat-area'>
            <Outlet />
        </div>

        {/* Navegación inferior móvil - solo en móvil */}
        <MobileBottomNav activeTab={activeTab} onTabChange={handleTabChange} />
    </div>
  )
}
