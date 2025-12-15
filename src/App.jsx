import { useState } from "react"
import ContactSidebar from "./ContactSideBar/ContactSideBar"
import { Route, Routes } from "react-router"
import ChatScreen from "./Screen/ChatScreen/ChatScreen"
import MessagesScreen from './Screen/MessagesScreen/MessagesScreen'
import './global.css'
import ContactListContextProvider from "./Context/ContactListContext"

function App (){

  return (
    <div>
        {/* <ContactSidebar/> */}
        <Routes>
          {/* Cuando estemos en la ruta contact mostrar el h1 */}
          <Route 
            element={<ContactListContextProvider/>}
          >
            <Route 
              path="/" 
              element={
                <ChatScreen/>
              } 
            />
            <Route 
              path="/chat/:contact_id" 
              element={
                <MessagesScreen />
              } 
            />
          </Route>

          <Route 
            path="/login" 
            element={
              <h1>Soy el login</h1>
            } 
          />
        </Routes>
        {/* <ContactSidebar/> */}
    </div>
  )
}

export default App