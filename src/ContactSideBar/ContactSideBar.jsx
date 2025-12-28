/* 
Snippet para crear un componente de react
RFC = React Functional Component
*/

import './ContactSideBar.css'
import React, {useContext } from 'react'
import ContactSearchForm from '../ContactSearchForm/ContacSearchForm'
import ContactList from '../ContactList/ContactList'
import { ThemeContext } from '../Context/Contexts'



export default function ContactSidebar() {

    const {isDark, toggleTheme} = useContext(ThemeContext)
    /* console.log('El valor de isDark es:' + isDark) */

    return (
        <aside className={`aside ${isDark ? 'aside-dark' : ''}`}>
            <h1 className='main-sidebar-title'>Chats</h1>
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