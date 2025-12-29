import React, { useContext, useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router'
import ContactSidebar from '../../ContactSideBar/ContactSideBar'
import { ContactDetailContext, ContactListContext } from '../../Context/Contexts' 
import AddNewMenssage from '../../AddNewMenssage/AddNewMenssage'
import MessagesList from '../../MessagesList/MessagesList'
import ContactProfileInfo from '../../ContactProfileInfo/ContactProfileInfo'
import './MessagesScreen.css'


export default function MessagesScreen() {

    const { contactSelected, loadingContact, clearChat } = useContext(ContactDetailContext)
    const { toggleBlockContact, deleteContact, contactState } = useContext(ContactListContext)
    const navigate = useNavigate()
    const [showProfile, setShowProfile] = useState(false)
    const [startSearch, setStartSearch] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')
    const [showChatMenu, setShowChatMenu] = useState(false)

    // block status
    const currentContact = contactState.find(c => Number(c.contact_id) === Number(contactSelected?.contact_id))
    const isBlocked = currentContact?.isBlocked || false

    const menuRef = useRef(null)

    // Close menu when clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setShowChatMenu(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    console.log(contactSelected, loadingContact)

    const toggleProfile = () => {
        setShowProfile(!showProfile);
    }

    const getSubtitle = () => {
        if (contactSelected.isGroup && contactSelected.participants) {
             const names = contactSelected.participants.map(id => {
                const c = contactState.find(contact => Number(contact.contact_id) === Number(id))
                return c ? c.contact_name : null
             }).filter(Boolean)
             return names.length > 0 ? names.join(', ') : 'Tú'
        }
        return 'en línea hoy a las 10:23'
    }
    
    // Filter messages based on search query
    const filteredMessages = contactSelected 
        ? contactSelected.messages.filter(msg => 
            msg.message_content.toLowerCase().includes(searchQuery.toLowerCase())
          )
        : []

    return (
        <div className='chat-screen-container'>
            {
                loadingContact 
                ? <div className='loading-chat'>Cargando...</div>
                : <>
                    <div className='chat-main-area'>
                        <div className='chat-header'>
                            <button className='mobile-back-btn' onClick={() => navigate('/')}>
                                ←
                            </button>
                            <div className='chat-header-info' onClick={toggleProfile}>
                                <img src={contactSelected.contact_avatar} alt={contactSelected.contact_name} className='chat-header-avatar'/>
                                <div className='chat-header-text'>
                                    <h3>{contactSelected.contact_name}</h3>
                                    <span style={{ fontSize: '12px', color: 'var(--text-secondary)', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis', maxWidth: '300px', display: 'block' }}>
                                        {getSubtitle()}
                                    </span>
                                </div>
                            </div>
                            <div className='chat-header-actions'>
                                <button className={`icon-btn ${startSearch ? 'active-btn' : ''}`} onClick={() => setStartSearch(!startSearch)}>
                                    <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path></svg>
                                </button>
                                <div className='relative-menu-container' ref={menuRef}>
                                    <button className='icon-btn' onClick={() => setShowChatMenu(!showChatMenu)}>
                                        <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"></path></svg>
                                    </button>
                                    {showChatMenu && (
                                        <div className='chat-options-menu'>
                                            <div className='menu-item' onClick={toggleProfile}>Info. del contacto</div>
                                            <div className='menu-item'>Llamar</div>
                                            <div className='menu-item' onClick={() => {
                                                toggleBlockContact(contactSelected.contact_id)
                                                setShowChatMenu(false)
                                            }}>
                                                {isBlocked ? 'Desbloquear' : 'Bloquear'}
                                            </div>
                                            <div className='menu-item'>Reportar</div>
                                            <div className='menu-item' onClick={() => {
                                                clearChat()
                                                setShowChatMenu(false)
                                            }}>Vaciar chat</div>
                                            <div className='menu-item' onClick={() => {
                                                deleteContact(contactSelected.contact_id)
                                                navigate('/')
                                            }}>Eliminar chat</div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Search Bar */}
                        {startSearch && (
                            <div className='chat-search-bar'>
                                <input 
                                    type='text' 
                                    placeholder='Buscar mensaje...' 
                                    className='chat-search-input'
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    autoFocus
                                />
                                <button className='close-search-btn' onClick={() => {
                                    setStartSearch(false)
                                    setSearchQuery('')
                                }}>
                                    <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path></svg>
                                </button>
                            </div>
                        )}
                        
                        <div className='messages-area'>
                            {searchQuery && filteredMessages.length === 0 ? (
                                <div className='no-results-message'>
                                    No se encontró ningún mensaje.
                                </div>
                            ) : (
                                <MessagesList messages={searchQuery ? filteredMessages : null}/>
                            )}
                        </div>
                        
                        <AddNewMenssage/>
                    </div>

                    <ContactProfileInfo 
                        contact={contactSelected} 
                        isOpen={showProfile}
                        onClose={() => setShowProfile(false)} 
                    />
                </>
            }
        </div>
    )
}