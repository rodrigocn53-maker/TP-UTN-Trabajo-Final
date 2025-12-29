import React, { useContext, useState, useEffect, useRef } from 'react'
import './ContactList.css'
import { Link } from 'react-router'
import { ContactListContext } from '../Context/Contexts'
import FilterPills from './FilterPills'

export default function ContactList() {
    const {
        contactState,
        loadingContactsState,
        searchString,
        toggleBlockContact, 
        deleteContact,
        toggleFavorite,
        togglePinChat,
        filterType
    } = useContext(ContactListContext)

    const [openMenuId, setOpenMenuId] = useState(null)
    const menuRef = useRef(null)

    useEffect(() => {
        function handleClickOutside(event) {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setOpenMenuId(null);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    if(loadingContactsState){
        return (
            <>
                <FilterPills />
                <div>Cargando contactos...</div>
            </>
        )
    }

    const activeContacts = contactState.filter(contact => contact.last_message_content && contact.last_message_content.trim() !== '');

    const getEmptyMessage = () => {
        if (searchString) {
            return 'No se encontró ningún contacto.';
        }
        
        switch(filterType) {
            case 'unread':
                return 'No tienes chats sin leer.';
            case 'favorites':
                return 'No tienes chats favoritos.';
            case 'groups':
                return 'No tienes grupos creados.';
            default:
                return 'No tienes chats activos.';
        }
    }

    if(activeContacts.length === 0){
        return (
            <>
                <FilterPills />
                <div className='no-contacts-placeholder'>
                    <p>{getEmptyMessage()}</p>
                    {filterType === 'all' && !searchString && (
                        <p>Busca un contacto en el directorio 👥 para empezar.</p>
                    )}
                </div>
            </>
        )
    }

    return (
    <>
        <FilterPills />
        <div className='contact-list-container' ref={menuRef}>
        {
            activeContacts.map(
                function (contact){
                    return (
                        <Link className='contact-item relative-container' key={contact.contact_id} to={'/chat/' + contact.contact_id}>
                            <div className='contact-avatar-wrapper'>
                                <img className='contact-avatar' src={contact.contact_avatar} alt={contact.contact_name} />
                            </div>
                            <div className='contact-info'>
                                <div className='contact-header'>
                                    <h2 className='contact-name'>
                                        {contact.contact_name}
                                        {contact.isFavorite && <span className='favorite-star'>❤️</span>}
                                    </h2>
                                    <span className='contact-time'>
                                        {/* Assuming last_message_created_at is a Date object or string. 
                                            If it's a real Date object in the mock data, we must format it. 
                                            In a real app, this might come as ISO string. 
                                            Safe check for .toLocaleTimeString if it's a date. */}
                                        { new Date(contact.last_message_created_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) }
                                    </span>
                                </div>
                                <div className='contact-details'>
                                    <p className='contact-last-message'>
                                        {/* Status Icon only for messages sent by me */}
                                        {contact.last_message_author === 'YO' && (
                                            <>
                                                {contact.last_message_state === 'SEEN' && <span className='status-icon-list seen'>✓✓ </span>}
                                                {contact.last_message_state === 'RECEIVED' && <span className='status-icon-list received'>✓✓ </span>}
                                                {(contact.last_message_state === 'SENT' || !contact.last_message_state) && <span className='status-icon-list sent'>✓ </span>}
                                            </>
                                        )}
                                        
                                        {contact.last_message_content}
                                    </p>
                                    {
                                        contact.contact_unseen_messages > 0 &&
                                        <span className='contact-badge'>{contact.contact_unseen_messages}</span>
                                    }
                                </div>
                            </div>
                            
                            {/* Hover Menu Trigger */}
                            <button 
                                className={`contact-options-trigger ${openMenuId === contact.contact_id ? 'active' : ''}`}
                                onClick={(e) => {
                                    e.preventDefault()
                                    e.stopPropagation()
                                    setOpenMenuId(openMenuId === contact.contact_id ? null : contact.contact_id)
                                }}
                            >
                                <svg viewBox="0 0 19 20" width="19" height="20" style={{display: 'block'}}>
                                    <path fill="currentColor" d="M3.8 6.7l5.7 5.7 5.7-5.7 1.6 1.6-7.3 7.2-7.3-7.2 1.6-1.6z"></path>
                                </svg>
                            </button>

                            {/* Dropdown Menu */}
                            {openMenuId === contact.contact_id && (
                                <div className='sidebar-dropdown-menu'>
                                    <div 
                                        className='sidebar-menu-item'
                                        onClick={(e) => {
                                            e.preventDefault()
                                            e.stopPropagation()
                                            togglePinChat(contact.contact_id)
                                            setOpenMenuId(null)
                                        }}
                                    >
                                        {contact.isPinned ? 'Desfijar chat' : 'Fijar chat'}
                                    </div>
                                    <div 
                                        className='sidebar-menu-item'
                                        onClick={(e) => {
                                            e.preventDefault()
                                            e.stopPropagation()
                                            toggleBlockContact(contact.contact_id)
                                            setOpenMenuId(null)
                                        }}
                                    >
                                        {contact.isBlocked ? 'Desbloquear' : 'Bloquear'}
                                    </div>
                                    <div 
                                        className='sidebar-menu-item'
                                        onClick={(e) => {
                                            e.preventDefault()
                                            e.stopPropagation()
                                            toggleFavorite(contact.contact_id)
                                            setOpenMenuId(null)
                                        }}
                                    >
                                        {contact.isFavorite ? '💔 Quitar de favoritos' : '❤️ Añadir a favoritos'}
                                    </div>
                                    <div 
                                        className='sidebar-menu-item'
                                        onClick={(e) => {
                                            e.preventDefault()
                                            e.stopPropagation()
                                            deleteContact(contact.contact_id)
                                            setOpenMenuId(null)
                                        }}
                                    >
                                        Eliminar chat
                                    </div>
                                </div>
                            )}
                        </Link>
                    )
                }
            )
        }
    </div>
    </>
  )
}