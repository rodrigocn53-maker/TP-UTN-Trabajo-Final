import React, { useContext, useState } from 'react'
import { ContactListContext } from '../Context/Contexts'
import './GroupCreationModal.css'

export default function GroupCreationModal({ isOpen, onClose }) {
    const { contactState, createGroup } = useContext(ContactListContext)
    const [selectedContactIds, setSelectedContactIds] = useState([])
    const [groupName, setGroupName] = useState('')
    const [step, setStep] = useState(1) // 1: Select, 2: Name (Optional)

    if (!isOpen) return null

    const toggleSelection = (id) => {
        if (selectedContactIds.includes(id)) {
            setSelectedContactIds(selectedContactIds.filter(pid => pid !== id))
        } else {
            setSelectedContactIds([...selectedContactIds, id])
        }
    }

    const handleCreate = () => {
        if (!groupName.trim()) return alert('Ingresa un nombre para el grupo')
        if (selectedContactIds.length === 0) return alert('Selecciona al menos un contacto')
        
        createGroup(groupName, selectedContactIds)
        onClose()
    }

    return (
        <div className='modal-overlay'>
            <div className='group-modal-content'>
                <div className='group-modal-header'>
                    <h3>Nuevo Grupo</h3>
                    <button onClick={onClose} className='close-btn'>&times;</button>
                </div>
                
                <div className='group-name-section'>
                    <input 
                        className='group-name-input'
                        placeholder='Nombre del grupo'
                        value={groupName}
                        onChange={(e) => setGroupName(e.target.value)}
                        autoFocus
                    />
                </div>

                <div className='participants-label'>Seleccionar participantes:</div>
                <div className='participants-list'>
                    {contactState.filter(c => !c.isGroup).map(contact => (
                        <div 
                            key={contact.contact_id} 
                            className={`participant-item ${selectedContactIds.includes(contact.contact_id) ? 'selected' : ''}`}
                            onClick={() => toggleSelection(contact.contact_id)}
                        >
                            <div className='participant-checkbox'>
                                {selectedContactIds.includes(contact.contact_id) && <span>✓</span>}
                            </div>
                            <img src={contact.contact_avatar} alt='' className='participant-avatar'/>
                            <span>{contact.contact_name}</span>
                        </div>
                    ))}
                </div>

                <div className='group-modal-actions'>
                    <button onClick={onClose} className='modal-btn cancel'>Cancelar</button>
                    <button onClick={handleCreate} className='modal-btn confirm'>Crear</button>
                </div>
            </div>
        </div>
    )
}
