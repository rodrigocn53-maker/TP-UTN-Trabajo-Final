import React, { useContext } from 'react'
import { ContactListContext } from '../Context/Contexts'
import './FilterPills.css'

export default function FilterPills() {
    const { filterType, setFilterType } = useContext(ContactListContext)

    const filters = [
        { id: 'all', label: 'Todos' },
        { id: 'unread', label: 'No leídos' },
        { id: 'favorites', label: 'Favoritos' },
        { id: 'groups', label: 'Grupos' }
    ]

    return (
        <div className='filter-pills-container'>
            {filters.map(filter => (
                <button
                    key={filter.id}
                    className={`filter-pill ${filterType === filter.id ? 'active' : ''}`}
                    onClick={() => setFilterType(filter.id)}
                >
                    {filter.label}
                </button>
            ))}
        </div>
    )
}
