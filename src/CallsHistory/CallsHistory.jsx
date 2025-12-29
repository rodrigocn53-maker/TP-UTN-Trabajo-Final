import React from 'react'
import './CallsHistory.css'

export default function CallsHistory() {
    
    // Data for Calls
    const calls = [
        { id: 1, name: 'Mamá', type: 'missed', date: 'Hoy, 10:30', avatar: 'https://ui-avatars.com/api/?name=Mama&background=random' },
        { id: 2, name: 'Jefe', type: 'incoming', date: 'Ayer, 18:45', avatar: 'https://ui-avatars.com/api/?name=Boss&background=random' },
        { id: 3, name: 'Juan Mecánico', type: 'outgoing', date: 'Ayer, 14:20', avatar: 'https://ui-avatars.com/api/?name=Juan&background=random' },
        { id: 4, name: 'Número desconocido', type: 'missed', date: 'Lunes, 09:15', avatar: 'https://ui-avatars.com/api/?background=ccc&color=fff' },
    ]

    const getIcon = (type) => {
        if (type === 'missed') return <span className='call-icon missed'>↙</span>
        if (type === 'incoming') return <span className='call-icon incoming'>↙</span>
        if (type === 'outgoing') return <span className='call-icon outgoing'>↗</span>
    }

    return (
        <div className='calls-history-container'>
            <h1 className='main-sidebar-title'>Llamadas</h1>
            <div className='calls-list'>
                {calls.map(call => (
                    <div className='call-item' key={call.id}>
                        <div className='call-avatar-wrapper'>
                            <img src={call.avatar} alt={call.name} className='call-avatar' />
                        </div>
                        <div className='call-info'>
                            <span className={`call-name ${call.type === 'missed' ? 'missed-name' : ''}`}>{call.name}</span>
                            <div className='call-meta'>
                                {getIcon(call.type)}
                                <span className='call-date'>{call.date}</span>
                            </div>
                        </div>
                        <div className='call-action'>
                            📞
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
