import { useCallback, useEffect, useState, useContext } from "react";
import { Outlet, useParams } from "react-router";
import { getContactById, saveMessageToContact, deleteMessageFromContact, editMessageInContact } from "../services/contactService";
import { ContactDetailContext, ContactListContext } from "./Contexts";

const ContactDetailContextProvider = ({ children }) => {
    const parametros_url = useParams()
    const contact_id = parametros_url.contact_id
    const [contactSelected, setContactSelected] = useState(null)
    const [loadingContact, setLoadingContact] = useState(true)
    
    // Consume ContactListContext to update the list when a message is sent
    const { updateLastMessage, resetUnseenMessages, contactState } = useContext(ContactListContext);

    const loadContactById = useCallback(() => {
        setLoadingContact(true)
        setTimeout(
            function () {
                const contact = getContactById(contact_id)
                // BREAK REFERENCE: unique copy of messages to avoid double-add when mutating service data
                setContactSelected({
                    ...contact,
                    messages: [...contact.messages]
                })
                setLoadingContact(false)
                // Reset unseen messages when chat is opened
                resetUnseenMessages(contact_id)
            },
            100 // Cambia este valor para ajustar el tiempo de carga (en milisegundos)
        )
    }, [contact_id]) // Removed resetUnseenMessages to avoid potential infinite loop if the function reference changes

    function AddNewMenssage(content){
        // Check if blocked
        const currentContact = contactState.find(c => Number(c.contact_id) === Number(contact_id));
        const isBlocked = currentContact?.isBlocked;
        const msgState = isBlocked ? 'SENT' : 'RECEIVED'; // Mock: Blocked = single check, Unblocked = double check

        // Save to service (persistence)
        const new_message = saveMessageToContact(contact_id, content);
        new_message.messages_state = msgState; // Override mock default
        
        // Update local state immediately
        setContactSelected({
            ...contactSelected,
            messages: [...contactSelected.messages, new_message]
        })
        
        updateLastMessage(contact_id, content, new_message.messages_create_at, msgState)
    }

    function deleteMessage (message_id) {
        deleteMessageFromContact(contact_id, message_id);
        
        setContactSelected({
            ...contactSelected,
            messages: contactSelected.messages.filter(msg => msg.message_id !== message_id)
        })
    }

    function editMessage (message_id, new_content) {
        editMessageInContact(contact_id, message_id, new_content);

        setContactSelected({
            ...contactSelected,
            messages: contactSelected.messages.map(msg => {
                if(msg.message_id === message_id){
                    return {...msg, message_content: new_content}
                }
                return msg
            })
        })
    }

    function addReaction(message_id, emoji) {
        setContactSelected({
            ...contactSelected,
            messages: contactSelected.messages.map(msg => {
                if(msg.message_id === message_id){
                    const existing = msg.reactions || [];
                    const newReactions = existing.includes(emoji) 
                        ? [] // Toggle off (clear)
                        : [emoji]; // Replace with new
                    return {...msg, reactions: newReactions}
                }
                return msg
            })
        })
    }

    useEffect(
        () => {
            loadContactById()
        },
        [loadContactById]
    )

    const providerValues = {
        contactSelected,
        loadingContact,
        loadContactById,
        AddNewMenssage,
        deleteMessage,
        editMessage,
        addReaction
    }

    
    return (
        <ContactDetailContext.Provider value={providerValues}>
            {children}
        </ContactDetailContext.Provider>
    )
}

export default ContactDetailContextProvider