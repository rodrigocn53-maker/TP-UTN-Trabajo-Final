/* 
Snippet para crear un componente de react
RFC = React Functional Component
*/

import React, { useContext } from 'react'
import ContactSidebar from '../../ContactSideBar/ContactSideBar'
import { ContactDetailContext } from '../../Context/Contexts' 
import AddNewMenssage from '../../AddNewMenssage/AddNewMenssage'
import MessagesList from '../../MessagesList/MessagesList'
import './MessagesScreen.css'


export default function MessagesScreen() {

    const { contactSelected, loadingContact } = useContext(ContactDetailContext)

    console.log(contactSelected, loadingContact)

    return (
        <div className='chat-screen-container'>
            {
                loadingContact 
                ? <div className='loading-chat'>Cargando...</div>
                : <>
                    <div className='chat-header'>
                        <div className='chat-header-info'>
                            <img src={contactSelected.contact_avatar} alt={contactSelected.contact_name} className='chat-header-avatar'/>
                            <div className='chat-header-text'>
                                <h3>{contactSelected.contact_name}</h3>
                                <span>en línea hoy a las 10:23</span>
                            </div>
                        </div>
                        <div className='chat-header-actions'>
                            <button className='icon-btn'>🔍</button>
                            <button className='icon-btn'>⋮</button>
                        </div>
                    </div>
                    
                    <div className='messages-area'>
                        <MessagesList/>
                    </div>
                    
                    <AddNewMenssage/>
                </>
            }
        </div>
    )
}