import React from 'react'
import './ContactProfileInfo.css'

export default function ContactProfileInfo({ contact, onClose, isOpen }) {
    if (!contact) return null;

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

            <div className='profile-section'>
                <h4>Archivos, enlaces y docs.</h4>
                <div className='media-grid'>
                    <div className='media-placeholder'></div>
                    <div className='media-placeholder'></div>
                    <div className='media-placeholder'></div>
                </div>
            </div>

            <div className='profile-actions'>
                <button className='action-btn text-danger'>Bloquear a {contact.contact_name}</button>
                <button className='action-btn text-danger'>Reportar a {contact.contact_name}</button>
                <button className='action-btn text-danger'>Eliminar chat</button>
            </div>
        </div>
    )
}
