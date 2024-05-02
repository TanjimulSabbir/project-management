import React from 'react'

export default function layout({ children }) {
    return (
        <div className='container mx-auto'>
            <h1>This is Pages main page</h1>
            {children}
        </div>
    )
}
