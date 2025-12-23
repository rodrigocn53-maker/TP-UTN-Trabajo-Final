import React, { useContext } from 'react'
import { ContactDetailContext } from '../Context/Contexts'
import './AddNewMenssage.css'

export default function AddNewMenssage() {
    const { AddNewMenssage: addMessage } = useContext(ContactDetailContext)

    function handleSubmitNewMenssage (event){
        event.preventDefault()
        const message = event.target.mensaje.value
        if (!message.trim()) return; 
        addMessage(message)
        event.target.mensaje.value = '' // clear input
    }

    return (
        <div className='message-input-container'>
            <button className='input-icon-btn'>😊</button>
            <button className='input-icon-btn'>➕</button>
            <form onSubmit={handleSubmitNewMenssage} className='message-form'>
                {/* Using simple input for now, could be textarea later */}
                <input 
                    id='mensaje' 
                    className='message-input' 
                    placeholder='Escribe un mensaje' 
                    autoComplete='off'
                    autoFocus
                />
                <button className='input-icon-btn send-btn'>➤</button>
            </form>
            {(false) && <button className='input-icon-btn'>🎤</button> /* Mic if input empty */} 
        </div>
    )
}
