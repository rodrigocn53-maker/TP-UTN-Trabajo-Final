import React, { useContext } from 'react'
import './ContactList.css'
import { Link } from 'react-router'
import { ContactListContext } from '../Context/Contexts'

export default function ContactList() {
    const {
        contactState,
        loadingContactsState
    } = useContext(ContactListContext)

    if(loadingContactsState){
        return (
            <div>Cargando contactos...</div>
        )
    }

    if(contactState.length === 0){
        return (
            <div>No hay contactos</div>
        )
    }
return (
    <div className='contact-list-container'>
        {
            contactState.map(
                function (contact){
                    return (
                        <Link className='contact-item' key={contact.contact_id} to={'/chat/' + contact.contact_id}>
                            <div className='contact-avatar-wrapper'>
                                <img className='contact-avatar' src={contact.contact_avatar} alt={contact.contact_name} />
                            </div>
                            <div className='contact-info'>
                                <div className='contact-header'>
                                    <h2 className='contact-name'>{contact.contact_name}</h2>
                                    <span className='contact-time'>
                                        {/* Assuming last_message_created_at is a Date object or string. 
                                            If it's a real Date object in the mock data, we must format it. 
                                            In a real app, this might come as ISO string. 
                                            Safe check for .toLocaleTimeString if it's a date. */}
                                        { new Date(contact.last_message_created_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) }
                                    </span>
                                </div>
                                <div className='contact-details'>
                                    <p className='contact-last-message'>{contact.last_message_content}</p>
                                    {
                                        contact.contact_unseen_messages > 0 &&
                                        <span className='contact-badge'>{contact.contact_unseen_messages}</span>
                                    }
                                </div>
                            </div>
                        </Link>
                    )
                }
            )
        }
    </div>
  )
}