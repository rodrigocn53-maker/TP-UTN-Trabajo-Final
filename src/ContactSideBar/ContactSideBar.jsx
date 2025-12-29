/* 
Snippet para crear un componente de react
RFC = React Functional Component
*/

import './ContactSideBar.css'
import React, {useContext } from 'react'
import ContactSearchForm from '../ContactSearchForm/ContacSearchForm'
import ContactList from '../ContactList/ContactList'
import { ThemeContext } from '../Context/Contexts'



export default function ContactSidebar({ onSettingsClick }) {

    const {isDark, toggleTheme} = useContext(ThemeContext)
    /* console.log('El valor de isDark es:' + isDark) */

    return (
        <aside className={`aside ${isDark ? 'aside-dark' : ''}`}>
            <div className='sidebar-header'>
                <h1 className='main-sidebar-title'>Chats</h1>
                <div className='mobile-sidebar-actions'>
                    <button className='mobile-header-btn' title='Cámara'>
                        <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                            <path d="M21 6h-3.17L16 4h-6v2h5.12l1.83 2H21v12H5v-9H3v9c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zM8 14c0 2.76 2.24 5 5 5s5-2.24 5-5-2.24-5-5-5-5 2.24-5 5zm5-3c1.65 0 3 1.35 3 3s-1.35 3-3 3-3-1.35-3-3 1.35-3 3-3zM5 6h3V4H5V1H3v3H0v2h3v3h2z"></path>
                        </svg>
                    </button>
                    <button 
                        className='mobile-header-btn' 
                        onClick={onSettingsClick}
                        title='Más opciones'
                    >
                        ⋮
                    </button>
                </div>
            </div>
            <div>
                <ContactSearchForm/>
            </div>
            <ContactList/>
            {/* <ContactList contactState={contactState} loadingContactsState={loadingContactsState}/> */}
        </aside>
    )
}

/* const [nombre, edad] = [ 'pepe', 32 ] */
/* 
const persona_nombre = persona[0]
const persona_edad = persona[1] 
*/

/* const [nombre, edad] = persona */