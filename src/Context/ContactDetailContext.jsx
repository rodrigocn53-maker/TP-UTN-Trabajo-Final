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

    // Effect 1: Handle Chat Entry (Loading + Reset Unseen)
    useEffect(() => {
        if(contact_id){
             setLoadingContact(true)
             resetUnseenMessages(contact_id)
             setTimeout(() => setLoadingContact(false), 500)
        }
    }, [contact_id, resetUnseenMessages])

    // Effect 2: Sync State (Read-Only)
    useEffect(() => {
        if(contact_id && contactState.length > 0){
             const contact = contactState.find(c => Number(c.contact_id) === Number(contact_id))
             if(contact){
                 setContactSelected({ ...contact, messages: contact.messages ? [...contact.messages] : [] })
             }
        }
    }, [contact_id, contactState])

    function AddNewMenssage(content){
        const currentContact = contactState.find(c => Number(c.contact_id) === Number(contact_id));
        const isBlocked = currentContact?.isBlocked;
        const msgState = isBlocked ? 'SENT' : 'RECEIVED';

        const new_message = {
            message_id: Date.now(),
            message_content: content,
            message_author: 'YO',
            messages_create_at: new Date().toISOString(),
            messages_state: msgState
        };

        // Try to save to persistence service (only works for static contacts)
        saveMessageToContact(contact_id, content);

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




    const providerValues = {
        contactSelected,
        loadingContact,
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