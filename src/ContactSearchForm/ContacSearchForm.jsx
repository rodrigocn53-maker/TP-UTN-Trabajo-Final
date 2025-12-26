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
                <span className='search-icon'>🔍</span>
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
