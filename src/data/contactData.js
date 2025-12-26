/* Esto en una app real NO EXISTE, solo estamos guardando datos de mook (boceto) para hacer pruebas */
const contact_data = [
    {
        contact_id: 1,
        contact_name: 'Kirby',
        contact_avatar: 'https://w7.pngwing.com/pngs/39/550/png-transparent-kirby-s-return-to-dream-land-kirby-s-dream-land-kirby-s-epic-yarn-kirby-super-star-kirby-triple-deluxe-kirby-heart-nintendo-boss-thumbnail.png',
        contact_bio: 'Héroe de Dream Land. ¡Poyo!',
        contact_phone: '+1 123 456 7890',
        contact_media: ['https://via.placeholder.com/150', 'https://via.placeholder.com/150'],
        contact_unseen_messages: 1,
        last_message_content: '¡Poioh!',
        last_message_state: 'RECEIVED',/*'NOT_SEND' | 'NOT_RECEIVED' | 'RECEIVED' | 'SEEN'*/
        last_message_created_at: new Date(),
        messages:[
        {
            message_id: 1,
            message_content: 'Que tal?',
            messages_state: 'SEEN',
            messages_create_at: new Date(), 
            send_by_me: true
        },
        {
            message_id: 2,
            message_content: '¡Poioh!',
            messages_state: 'RECEIVED',
            messages_create_at: new Date(),
            send_by_me: false 
        },
        {
            message_id: 3,
            message_content: '¡Poioh!',
            messages_state: 'RECEIVED',
            messages_create_at: new Date(),
            send_by_me: false 
        },
        {
            message_id: 4,
            message_content: '¡Poioh!',
            messages_state: 'RECEIVED',
            messages_create_at: new Date(),
            send_by_me: false 
        }
    ]
    },
    {
    contact_id: 2,
    contact_name: 'Yoshi',
    contact_avatar: 'https://thumbs.dreamstime.com/b/dise%C3%B1o-de-arte-vectorial-yoshi-lindo-ilustraciones-del-yyoshi-282956880.jpg',
    contact_unseen_messages: 1,
    last_message_content: 'smash time!',
    last_message_state: 'SEEN',
    last_message_created_at: new Date(),
    messages:[
        {
        message_id: 1,
        message_content: 'smash time!',
        messages_state: 'RECEIVED',
        messages_create_at: new Date(), 
        send_by_me: false
        }
    ]
    },
    {
    contact_id: 3,
    contact_name: 'Mario',
    contact_avatar: 'https://i.pinimg.com/originals/96/f1/76/96f17624e3557c4848fa9ac94b34f245.jpg',
    contact_unseen_messages: 1,
    last_message_content: 'Champineon',
    last_message_state: 'SEEN',
    last_message_created_at: new Date(),
    messages:[
        {
        message_id: 1,
        message_content: 'Champineon',
        messages_state: 'RECEIVED',
        messages_create_at: new Date(), 
        send_by_me: false
        }
    ]
    },
    {
    contact_id: 4,
    contact_name: 'Megaman',
    contact_avatar: 'https://images.wikidexcdn.net/mwuploads/esssbwiki/thumb/4/46/latest/20230328150646/Mega_Man_SSBU.png/1200px-Mega_Man_SSBU.png',
    contact_unseen_messages: 1,
    last_message_content: 'Blaster',
    last_message_state: 'SEEN',
    last_message_created_at: new Date(),
    messages:[
        {
        message_id: 1,
        message_content: 'Blaster',
        messages_state: 'RECEIVED',
        messages_create_at: new Date(), 
        send_by_me: false
        }
    ]
    },
]

export default contact_data