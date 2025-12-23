import { useCallback, useEffect, useState } from "react";
import { Outlet } from "react-router";
import { getContactList } from "../services/contactService";
import { ContactListContext } from "./Contexts";

const ContactListContextProvider = () => {
    const [contactState, setContactState] = useState([])
    const [loadingContactsState, setLoadingContactState] = useState(true)


    const loadContactList = useCallback(() => {
        setLoadingContactState(true)
        setTimeout(
            function () {
                console.log('Cargando la lista de contactos')
                const contact_list = getContactList()
                setContactState(contact_list)
                setLoadingContactState(false)
            },
            2000
        )
        
    }, [])

    useEffect (
        () => {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            loadContactList()
        },
        [loadContactList]
    )

    const updateLastMessage = (contactId, newContent, newTime) => {
        setContactState(prevContacts => prevContacts.map(contact => {
            if (Number(contact.contact_id) === Number(contactId)) {
                return {
                    ...contact,
                    last_message_content: newContent,
                    last_message_created_at: newTime,
                    last_message_state: 'NOT_SEND' // Or 'SENT' if you prefer
                };
            }
            return contact;
        }));
    };

    const resetUnseenMessages = (contactId) => {
        setContactState(prevContacts => prevContacts.map(contact => {
            if (Number(contact.contact_id) === Number(contactId)) {
                return {
                    ...contact,
                    contact_unseen_messages: 0
                };
            }
            return contact;
        }));
    };

    const providerValues = {
        contactState,
        loadingContactsState,
        loadContactList,
        updateLastMessage,
        resetUnseenMessages
    }

    return (
        <ContactListContext.Provider value={providerValues}>
            <Outlet />
        </ContactListContext.Provider>
    )
}


export default ContactListContextProvider