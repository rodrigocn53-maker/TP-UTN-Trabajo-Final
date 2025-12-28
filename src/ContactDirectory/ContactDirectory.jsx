import React, { useContext } from 'react'
import { Link } from 'react-router'
import { ContactListContext } from '../Context/Contexts'
import './ContactDirectory.css'

export default function ContactDirectory() {
    const { contactState } = useContext(ContactListContext)

    // Sort contacts A-Z By Name
    const sortedContacts = [...contactState].sort((a, b) => 
        a.contact_name.localeCompare(b.contact_name)
    )

    // Group by first letter (Optional polish, but requested "A-Z list" usually implies structure)
    // For now, flat sorted list is safer based on "lista de A-Z el orden".

    return (
        <div className='contact-directory-container'>
            <h1 className='main-sidebar-title'>Contactos</h1>
            <div className='directory-list'>
                {sortedContacts.map(contact => (
                    <Link className='directory-item' key={contact.contact_id} to={'/chat/' + contact.contact_id}>
                        <div className='directory-avatar-wrapper'>
                            <img className='directory-avatar' src={contact.contact_avatar} alt={contact.contact_name} />
                        </div>
                        <div className='directory-info'>
                            <span className='directory-name'>{contact.contact_name}</span>
                            <span className='directory-status'>{contact.contact_bio || "¡Hola! Estoy usando WhatsApp."}</span>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}
