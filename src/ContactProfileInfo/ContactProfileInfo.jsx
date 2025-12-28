import React, { useContext } from 'react'
import './ContactProfileInfo.css'
import { ContactListContext } from '../Context/Contexts'

export default function ContactProfileInfo({ contact, onClose, isOpen }) {
    const { toggleBlockContact, contactState } = useContext(ContactListContext)

    if (!contact) return null;

    const currentContact = contactState.find(c => Number(c.contact_id) === Number(contact.contact_id))
    const isBlocked = currentContact?.isBlocked || false

    return (
        <div className={`profile-info-container ${isOpen ? 'open' : ''}`}>
            <div className='profile-header'>
                <button className='close-btn' onClick={onClose}>✕</button>
                <h3>Info. del contacto</h3>
            </div>
            
            <div className='profile-main'>
                <img src={contact.contact_avatar} alt={contact.contact_name} className='profile-avatar-large'/>
                <h2 className='profile-name'>{contact.contact_name}</h2>
                <p className='profile-phone'>{contact.contact_phone || 'Sin número'}</p>
            </div>

            <div className='profile-section'>
                <h4>Info.</h4>
                <p>{contact.contact_bio || 'Sin info'}</p>
            </div>

            {contact.isGroup && contact.participants && (
                <div className='profile-section'>
                    <h4>Miembros del grupo ({contact.participants.length + 1})</h4>
                    <div className='group-members-list'>
                        {contact.participants.map(id => {
                            const member = contactState.find(c => c.contact_id === id)
                            if (!member) return null
                            return (
                                <div key={member.contact_id} className='group-member-item'>
                                    <img src={member.contact_avatar} alt='' className='member-avatar'/>
                                    <div className='member-info'>
                                        <span className='member-name'>{member.contact_name}</span>
                                        <span className='member-status'>Disponible</span>
                                    </div>
                                </div>
                            )
                        })}
                        <div className='group-member-item'>
                             <div className='member-avatar-placeholder'>Tú</div>
                             <div className='member-info'>
                                <span className='member-name'>Tú</span>
                             </div>
                        </div>
                    </div>
                </div>
            )}

            <div className='profile-section'>
                <h4>Archivos, enlaces y docs.</h4>
                <div className='media-grid'>
                    <div className='media-placeholder'></div>
                    <div className='media-placeholder'></div>
                    <div className='media-placeholder'></div>
                </div>
            </div>

            <div className='profile-actions'>
                <button 
                    className='action-btn text-danger'
                    onClick={() => toggleBlockContact(contact.contact_id)}
                >
                    {isBlocked ? `Desbloquear a ${contact.contact_name}` : `Bloquear a ${contact.contact_name}`}
                </button>
                <button className='action-btn text-danger'>Reportar a {contact.contact_name}</button>
                <button className='action-btn text-danger'>Eliminar chat</button>
            </div>
        </div>
    )
}
