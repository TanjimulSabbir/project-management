import moment from 'moment'
import React from 'react'

export default function TaskDetails({ task }) {
    const { id, name, description, status, dueDate, member } = task;
    return (
        <div className='grid grid-cols-3 items-center gap-5'>
            <div key={id}>
                <h2>{name}</h2>
                <p>{description}</p>
                <p>{status}</p>
                <p>{moment(dueDate).format('DD MMMM YYYY')}</p>
            </div>
        </div>
    )
}
