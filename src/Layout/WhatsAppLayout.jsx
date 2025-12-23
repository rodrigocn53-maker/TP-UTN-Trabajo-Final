import React from 'react'
import { Outlet } from 'react-router'
import ContactSidebar from '../ContactSideBar/ContactSideBar'
import './WhatsAppLayout.css'

export default function WhatsAppLayout() {
  return (
    <div className='whatsapp-layout-container'>
        <div className='community-sidebar'>
            <div className='icon-placeholder'>👥</div>
            <div className='icon-placeholder'>💬</div>
            <div className='icon-placeholder'>📞</div>
            <div className='icon-placeholder'>⚙️</div>
        </div>
        
        <div className='contacts-sidebar'>
            <ContactSidebar />
        </div>

        <div className='chat-area'>
            <Outlet />
        </div>
    </div>
  )
}
