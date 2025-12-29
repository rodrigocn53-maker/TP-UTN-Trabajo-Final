import contact_data from "../data/contactData.js";

export function getContactList (){
    /* En un futuro esta funcion haria la llamada al servidor */
    
    // Calculate unseen messages dynamically
    const contactsWithDynamicUnseen = contact_data.map(contact => {
        const unseenCount = contact.messages.filter(msg => !msg.send_by_me && msg.messages_state === 'RECEIVED').length;
        return {
            ...contact,
            contact_unseen_messages: unseenCount
        };
    });

    return contactsWithDynamicUnseen
}


export function getContactById (contact_id) {
    // Also use the dynamic calculation logic or just reuse the modified list logic if efficient, 
    // but for finding one, we can just find and calc or find in the modified list.
    // Let's modify the raw data find to also be consistent if called directly.
    const contact = contact_data.find(c => Number(c.contact_id) === Number(contact_id));
    
    if(contact){
        const unseenCount = contact.messages.filter(msg => !msg.send_by_me && msg.messages_state === 'RECEIVED').length;
        return {
            ...contact,
            contact_unseen_messages: unseenCount
        }
    }
}

// PERSISTENCE METHODS (Simulated)

export function saveMessageToContact(contact_id, message_content) {
    const contact = contact_data.find(c => Number(c.contact_id) === Number(contact_id));
    if(contact) {
        const new_message = {
            message_id: Date.now() + Math.random(), // Unique ID
            message_content: message_content,
            message_state: 'NOT_SEND', // Or 'SENT' if simulating instant
            messages_create_at: new Date(),
            send_by_me: true
        }
        // COMMENTED: This was causing duplicate messages since we use addMessage in ContactDetailContext
        // contact.messages.push(new_message);
        
        // Update key fields if needed for list view
        contact.last_message_content = message_content;
        contact.last_message_created_at = new_message.messages_create_at;
        
        return new_message;
    }
}

export function deleteMessageFromContact(contact_id, message_id) {
    const contact = contact_data.find(c => Number(c.contact_id) === Number(contact_id));
    if(contact) {
        contact.messages = contact.messages.filter(msg => msg.message_id !== message_id);
    }
}

export function editMessageInContact(contact_id, message_id, new_content) {
    const contact = contact_data.find(c => Number(c.contact_id) === Number(contact_id));
    if(contact) {
        const message = contact.messages.find(msg => msg.message_id === message_id);
        if(message) {
            message.message_content = new_content;
        }
    }
}

export function createNewContact(phoneNumber, contactName) {
    const newContact = {
        contact_id: Date.now(), // Unique ID
        contact_name: contactName,
        contact_avatar: 'https://cdn-icons-png.flaticon.com/512/149/149071.png', // Default avatar
        contact_unseen_messages: 0,
        last_message_content: '',
        last_message_state: 'NOT_SEND',
        last_message_created_at: new Date(),
        messages: [], // Empty conversation
        contact_phone: phoneNumber,
        contact_bio: 'Hey there! I am using WhatsApp.'
    }
    contact_data.push(newContact);
    return newContact;
}