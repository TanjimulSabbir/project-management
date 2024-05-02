import React from 'react'
import { Toaster } from 'react-hot-toast'

export default function layout({ children }) {
    return (
        <div className='container mx-auto'>
            {children}
            <Toaster position='top-center'/>
        </div>
    )
}
