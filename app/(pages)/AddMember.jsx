'use client'
import { useState } from 'react';
import useProjectsStore from '../store';
import { IoMdAdd } from "react-icons/io";
import toast from 'react-hot-toast';

const AddMemberForm = ({ projectId, setOpenAddMember }) => {
    const [openModal, setOpenModal] = useState(false);
    const [idNumber, setIdNumber] = useState('');
    const [team, setTeam] = useState('');
    const [teamMembers, setTeamMembers] = useState([]);

    const { addMember } = useProjectsStore();

    const handleAddMember = () => {
        if (team.trim() !== '') {
            const member = { name: team.trim() }
            addMember({ projectId, member });
            setTeam('');
            toast.success("Team Member added!")
            console.log(member, "AddTeamMember");
        }
    };

    const handleCloseModal = () => {
        setOpenAddMember(false)
    }

    return (
        <div className="max-w-md mx-auto mt-8 p-6 bg-white shadow-md rounded-md text-black">
            <h2 className="text-xl font-semibold mb-4">Add Member</h2>
            <div className="mb-4">
                <label htmlFor="idNumber" className="block text-sm font-medium text-gray-700">ID Number</label>
                <input
                    id="idNumber"
                    type="text"
                    className="mt-1 focus:ring-green-500 focus:border-green-500 block w-full shadow-sm sm:text-sm border border-gray-500 rounded-md p-2"
                    value={idNumber}
                    onChange={(e) => setIdNumber(e.target.value)}
                />
            </div>
            <div className="mb-4">
                <label htmlFor="team" className="block text-sm font-medium text-gray-700">Team Members</label>
                <input
                    id="team"
                    type="text"
                    className="mt-1 focus:ring-green-500 focus:border-green-500 block w-full shadow-sm sm:text-sm border border-gray-500 rounded-md p-2 placeholder:p-2 placeholder:text-[10px]"
                    value={team}
                    onChange={(e) => setTeam(e.target.value)}
                    placeholder="Enter team members, like this (Tanjimul Sabbir, Amrita Hoq)"
                />
            </div>
            <div className='flex items-center space-x-3'>
                <button
                    type="button"
                    className="inline-flex justify-center items-center space-x-1 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                    onClick={handleAddMember}
                >
                    <span> Add Member</span>
                </button>
                <button
                    type="button"
                    className="inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    onClick={handleCloseModal}
                >
                    Cancel
                </button>
            </div>
            <div className="mt-4">
                {teamMembers.map((member, index) => (
                    <div key={index} className="bg-gray-100 px-3 py-1 mb-2 rounded-md">
                        {member}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AddMemberForm;
