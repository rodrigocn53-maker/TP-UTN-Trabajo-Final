import { Route, Routes } from "react-router"
import MessagesScreen from './Screen/MessagesScreen/MessagesScreen'
import WhatsAppLayout from './Layout/WhatsAppLayout'
import './global.css'
import ContactListContextProvider from "./Context/ContactListContext"
import ContactDetailContextProvider from "./Context/ContactDetailContext"
import ThemeContextProvider from "./Context/ThemeContext"

function App (){

  return (
    <Routes>
      <Route path="/login" element={<h1>Soy el login</h1>} />
      
      <Route element={<ContactListContextProvider/>}>
        <Route path="/" element={
            <ThemeContextProvider>
                <WhatsAppLayout />
            </ThemeContextProvider>
        }>
          <Route index element={
            <div className="empty-chat">
                <h1>WhatsApp Web</h1>
                <p>Envia y recibe mensajes sin necesidad de mantener tu telefono conectado.</p>
            </div>
          } />
          
          <Route 
             path="chat/:contact_id" 
             element={
                <ContactDetailContextProvider>
                    <MessagesScreen />
                </ContactDetailContextProvider>
             } 
          />
        </Route>
      </Route>
    </Routes>
  )
}

export default App
