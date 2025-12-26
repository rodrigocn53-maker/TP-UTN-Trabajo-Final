import React, { useContext, useState, useEffect } from 'react'
import ContactSidebar from '../../ContactSideBar/ContactSideBar'
import { ContactDetailContext } from '../../Context/Contexts' 
import AddNewMenssage from '../../AddNewMenssage/AddNewMenssage'
import MessagesList from '../../MessagesList/MessagesList'
import ContactProfileInfo from '../../ContactProfileInfo/ContactProfileInfo'
import './MessagesScreen.css'


export default function MessagesScreen() {

    const { contactSelected, loadingContact } = useContext(ContactDetailContext)
    // Removed resetUnseenMessages from here as it caused a loop and is already handled in ContactDetailContext
    const [showProfile, setShowProfile] = useState(false)
    const [startSearch, setStartSearch] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')

    console.log(contactSelected, loadingContact)

    const toggleProfile = () => {
        setShowProfile(!showProfile);
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
                            <div className='chat-header-info' onClick={toggleProfile}>
                                <img src={contactSelected.contact_avatar} alt={contactSelected.contact_name} className='chat-header-avatar'/>
                                <div className='chat-header-text'>
                                    <h3>{contactSelected.contact_name}</h3>
                                    <span>en línea hoy a las 10:23</span>
                                </div>
                            </div>
                            <div className='chat-header-actions'>
                                <button className={`icon-btn ${startSearch ? 'active-btn' : ''}`} onClick={() => setStartSearch(!startSearch)}>🔍</button>
                                <button className='icon-btn'>⋮</button>
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
                                }}>✕</button>
                            </div>
                        )}
                        
                        <div className='messages-area'>
                            <MessagesList messages={searchQuery ? filteredMessages : null}/>
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