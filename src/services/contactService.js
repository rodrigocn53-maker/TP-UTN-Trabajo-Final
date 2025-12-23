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