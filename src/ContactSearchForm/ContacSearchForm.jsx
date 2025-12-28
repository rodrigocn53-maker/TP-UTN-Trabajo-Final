import React, { useContext, useState } from 'react'
import { ContactListContext } from '../Context/Contexts'
import './ContactSearchForm.css'

export default function ContacSearchForm() {
    const { searchString, setSearchString, createContact } = useContext(ContactListContext)
    const [showModal, setShowModal] = useState(false)
    const [newContactName, setNewContactName] = useState('')
    const [newContactPhone, setNewContactPhone] = useState('')

    const handleChangePhone = (e) => {
        const value = e.target.value;
        // Allow only numbers
        const regex = /^[0-9]*$/;
        if (regex.test(value)) {
            setNewContactPhone(value);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (newContactName.trim() && newContactPhone.trim()) {
            createContact(newContactPhone, newContactName)
            setShowModal(false)
            setNewContactName('')
            setNewContactPhone('')
        }
    }

    return (
        <div className='search-form-container'>
            <div className='search-input-wrapper'>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', paddingLeft: '10px', color: 'var(--text-secondary)' }}>
                    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path></svg>
                </div>
                <input 
                    className='search-input' 
                    placeholder='Buscar o iniciar nuevo chat'
                    value={searchString}
                    onChange={(e) => setSearchString(e.target.value)}
                />
            </div>
            <button className='add-contact-btn' onClick={() => setShowModal(true)} title="Nuevo chat">
                +
            </button>

            {/* Modal for adding contact */}
            {showModal && (
                <div className='modal-overlay'>
                    <div className='modal-content'>
                        <h3>Nuevo Contacto</h3>
                        <form onSubmit={handleSubmit}>
                            <input 
                                className='modal-input' 
                                placeholder='Nombre del contacto'
                                value={newContactName}
                                onChange={(e) => setNewContactName(e.target.value)}
                                autoFocus
                            />
                            <input 
                                className='modal-input' 
                                placeholder='Número de teléfono'
                                value={newContactPhone}
                                onChange={handleChangePhone}
                                type="tel" 
                            />
                            <div className='modal-actions'>
                                <button type='button' onClick={() => setShowModal(false)} className='modal-btn cancel'>Cancelar</button>
                                <button type='submit' className='modal-btn confirm'>Crear</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}
