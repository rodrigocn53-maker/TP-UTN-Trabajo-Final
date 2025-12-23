import { useCallback, useEffect, useState, useContext } from "react";
import { Outlet, useParams } from "react-router";
import { getContactById } from "../services/contactService";
import { ContactDetailContext, ContactListContext } from "./Contexts";

const ContactDetailContextProvider = ({ children }) => {
    const parametros_url = useParams()
    const contact_id = parametros_url.contact_id
    const [contactSelected, setContactSelected] = useState(null)
    const [loadingContact, setLoadingContact] = useState(true)
    
    // Consume ContactListContext to update the list when a message is sent
    const { updateLastMessage, resetUnseenMessages } = useContext(ContactListContext);

    const loadContactById = useCallback(() => {
        setLoadingContact(true)
        setTimeout(
            function () {
                const contact = getContactById(contact_id)
                setContactSelected(contact)
                setLoadingContact(false)
                // Reset unseen messages when chat is opened
                resetUnseenMessages(contact_id)
            },
            100 // Cambia este valor para ajustar el tiempo de carga (en milisegundos)
        )
    }, [contact_id]) // Removed resetUnseenMessages to avoid potential infinite loop if the function reference changes

    function AddNewMenssage(content){
        const new_timestamp = new Date();
        const new_message = {
            message_id: contactSelected.messages.length +1,
            message_content: content,
            message_state: 'NOT_SEND',
            message_created_at: new_timestamp,
            send_by_me: true
        }
        setContactSelected({
            ...contactSelected,
            messages: [...contactSelected.messages, new_message]
        })
        
        // Update the global list state
        updateLastMessage(contact_id, content, new_timestamp)
    }

    useEffect(
        () => {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            loadContactById()
        },
        [loadContactById]
    )

    const providerValues = {
        contactSelected,
        loadingContact,
        loadContactById,
        AddNewMenssage
    }

    
    return (
        <ContactDetailContext.Provider value={providerValues}>
            {children}
        </ContactDetailContext.Provider>
    )
}

export default ContactDetailContextProvider