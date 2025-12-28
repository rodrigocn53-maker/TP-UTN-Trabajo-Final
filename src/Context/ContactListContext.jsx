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

    const createGroup = useCallback((groupName, participantIds) => {
        const initialMessages = participantIds.map((id, index) => {
            const participant = contactState.find(c => c.contact_id === id);
            return {
                message_id: Date.now() + index,
                message_content: 'Hola',
                message_author: participant ? participant.contact_name : 'Miembro',
                messages_create_at: new Date().toISOString(),
                messages_state: 'RECEIVED',
                send_by_me: false
            }
        });

        const newGroup = {
            contact_id: Number(Date.now()),
            contact_name: groupName,
            contact_avatar: 'https://ui-avatars.com/api/?name=' + groupName.replace(' ', '+') + '&background=random&bold=true',
            contact_bio: 'Grupo',
            isGroup: true,
            participants: participantIds,
            messages: initialMessages,
            last_message_content: initialMessages.length > 0 ? `~${initialMessages[initialMessages.length-1].message_author}: Hola` : 'Grupo creado',
            last_message_created_at: new Date().toISOString()
        }
        setContactState(prev => [newGroup, ...prev]);
        setSearchString('');
        return newGroup.contact_id;
    }, [contactState]);

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

    const addMessage = useCallback((contactId, fullMessage) => {
        setContactState(prevContacts => prevContacts.map(contact => {
            if (Number(contact.contact_id) === Number(contactId)) {
                return {
                    ...contact,
                    messages: [...contact.messages, fullMessage],
                    last_message_content: fullMessage.message_content,
                    last_message_created_at: fullMessage.messages_create_at,
                    last_message_state: fullMessage.messages_state
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
        addMessage,
        resetUnseenMessages,
        createContact,
        createGroup,
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