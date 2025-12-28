import { useCallback, useEffect, useState } from "react";
import { Outlet } from "react-router";
import { getContactList, createNewContact } from "../services/contactService";
import { ContactListContext } from "./Contexts";

const ContactListContextProvider = () => {
    const [contactState, setContactState] = useState([])
    const [loadingContactsState, setLoadingContactState] = useState(true)
    const [searchString, setSearchString] = useState('')


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

    const createContact = useCallback((phone, name) => {
        const newContact = createNewContact(phone, name);
        setContactState(prev => [...prev, newContact]);
    }, []);

    useEffect (
        () => {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            loadContactList()
        },
        [loadContactList]
    )

    const updateLastMessage = useCallback((contactId, newContent, newTime, newState = 'SENT') => {
        setContactState(prevContacts => prevContacts.map(contact => {
            if (Number(contact.contact_id) === Number(contactId)) {
                return {
                    ...contact,
                    last_message_content: newContent,
                    last_message_created_at: newTime,
                    last_message_state: newState 
                };
            }
            return contact;
        }));
    }, []);

    const resetUnseenMessages = useCallback((contactId) => {
        setContactState(prevContacts => prevContacts.map(contact => {
            if (Number(contact.contact_id) === Number(contactId)) {
                return {
                    ...contact,
                    contact_unseen_messages: 0
                };
            }
            return contact;
        }));
    }, []);

    // Filter contacts based on searchString
    const filteredContacts = contactState.filter(contact => 
        contact.contact_name.toLowerCase().includes(searchString.toLowerCase())
    );

    // Calculate Global Unread Count
    const totalUnread = contactState.reduce((acc, contact) => acc + (contact.contact_unseen_messages || 0), 0);

    const toggleBlockContact = useCallback((contactId) => {
        setContactState(prevContacts => prevContacts.map(contact => {
            if (Number(contact.contact_id) === Number(contactId)) {
                return {
                    ...contact,
                    isBlocked: !contact.isBlocked
                };
            }
            return contact;
        }));
    }, []);

    const deleteContact = useCallback((contactId) => {
        setContactState(prevContacts => prevContacts.filter(c => Number(c.contact_id) !== Number(contactId)));
    }, []);

    const providerValues = {
        contactState: filteredContacts, // Use filtered list
        loadingContactsState,
        loadContactList,
        updateLastMessage,
        resetUnseenMessages,
        createContact,
        toggleBlockContact,
        deleteContact, // Exported
        searchString, 
        setSearchString,
        totalUnread
    }

    return (
        <ContactListContext.Provider value={providerValues}>
            <Outlet />
        </ContactListContext.Provider>
    )
}


export default ContactListContextProvider