import { useCallback, useEffect, useState, useContext } from "react";
import { Outlet, useParams } from "react-router";
import { getContactById, saveMessageToContact, deleteMessageFromContact, editMessageInContact, emptyMessagesFromContact } from "../services/contactService";
import { ContactDetailContext, ContactListContext } from "./Contexts";

const ContactDetailContextProvider = ({ children }) => {
    const parametros_url = useParams()
    const contact_id = parametros_url.contact_id
    const [contactSelected, setContactSelected] = useState(null)
    const [loadingContact, setLoadingContact] = useState(true)
    
    const { updateLastMessage, addMessage, resetUnseenMessages, contactState, updateMessageStatus, clearMessages } = useContext(ContactListContext);

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
        
        const new_message = {
            message_id: Date.now(),
            message_content: content,
            message_author: 'YO',
            messages_create_at: new Date().toISOString(),
            messages_state: 'SENT',
            send_by_me: true
        };

        saveMessageToContact(contact_id, content);

        setContactSelected(prev => ({
            ...prev,
            messages: [...prev.messages, new_message]
        }));
        
        addMessage(contact_id, new_message);

        if (!isBlocked) {
            setTimeout(() => {
                updateMessageStatus(contact_id, new_message.message_id, 'RECEIVED');
                updateLastMessage(contact_id, content, new_message.messages_create_at, 'RECEIVED');
                setContactSelected(prev => ({
                    ...prev,
                    messages: prev.messages.map(m => m.message_id === new_message.message_id ? {...m, messages_state: 'RECEIVED'} : m)
                }));
            }, 1000);

            setTimeout(() => {
                updateMessageStatus(contact_id, new_message.message_id, 'SEEN');
                updateLastMessage(contact_id, content, new_message.messages_create_at, 'SEEN');
                setContactSelected(prev => ({
                    ...prev,
                    messages: prev.messages.map(m => m.message_id === new_message.message_id ? {...m, messages_state: 'SEEN'} : m)
                }));
            }, 3000);
        }
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





    function clearChat() {
        emptyMessagesFromContact(contact_id);
        clearMessages(contact_id); // Update global state
        
        setContactSelected({
            ...contactSelected,
            messages: []
        });
    }

    const providerValues = {
        contactSelected,
        loadingContact,
        AddNewMenssage,
        deleteMessage,
        editMessage,
        addReaction,
        clearChat
    }

    
    return (
        <ContactDetailContext.Provider value={providerValues}>
            {children}
        </ContactDetailContext.Provider>
    )
}

export default ContactDetailContextProvider