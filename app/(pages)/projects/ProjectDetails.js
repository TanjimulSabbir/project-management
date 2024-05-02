import React from 'react'
import { FiEdit, FiTrash2 } from 'react-icons/fi'

export default function ProjectDetails() {
    return (
        <div className='flex items-center justify-center w-full h-screen'>
            <div className="p-6 bg-white rounded-lg shadow-md bg-gradient-to-r from-green-200 to-blue-200">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-semibold">{data.name}</h2>
                    <div className="flex items-center space-x-2">
                        <button className="text-green-600 hover:text-green-800 focus:outline-none">
                            <FiEdit />
                        </button>
                        <button className="text-red-600 hover:text-red-800 focus:outline-none">
                            <FiTrash2 />
                        </button>
                    </div>
                </div>
                <p className="text-gray-600">{data.description}</p>
                <div className="mt-4">
                    <h3 className="text-lg font-semibold mb-2">Details:</h3>
                    <ul className="list-disc list-inside text-gray-600">
                        <li>Status: {data.status}</li>
                        <li>Due Date: {data.dueDate}</li>
                        <li>Estimated Budget: {data.estimated_total_budget}</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
