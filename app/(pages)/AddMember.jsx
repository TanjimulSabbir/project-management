'use client'
import { useState } from 'react';
import useProjectsStore from '../store';
import { IoMdAdd } from "react-icons/io";
import toast from 'react-hot-toast';

const AddMemberForm = ({ projectId, setOpenAddMember }) => {
    const [openModal, setOpenModal] = useState(false);
    const [taskId, setTaskId] = useState(1);
    const [team, setTeam] = useState('');

    const { addMember, projects } = useProjectsStore();

    const handleAddMember = () => {
        if (team.trim() !== '') {
            const membersArray = team.split(',').map(member => member.trim());
            addMember({ projectId, taskId: taskId - 1, data: membersArray });
            setTeam('');
            setOpenAddMember(false)
        }
    };

    const handleCloseModal = () => {
        setOpenAddMember(false)
    }
    const prev = [...projects.find(item => item.members).members[0].team]
    const teamsLength = projects.find(project => project.id === projectId).members
    console.log(prev)
    return (
        <div className="max-w-md mx-auto mt-8 p-6 bg-white shadow-md rounded-md text-black">
            <h2 className="text-xl font-semibold mb-4">Add Member</h2>
            <div className="mb-4">
                <label htmlFor="taskId" className="block text-sm font-medium text-gray-700">Task ID Number</label>
                <select
                    id="taskId"
                    className="mt-1 focus:ring-green-500 focus:border-green-500 block w-full shadow-sm sm:text-sm border border-gray-500 rounded-md p-2"
                    value={taskId}
                    onChange={(e) => setTaskId(Number(e.target.value))}
                    defaultValue="1" // Set default value here
                >
                    {teamsLength.map((data, index) => (
                        <option key={index} value={index + 1}>{index + 1}</option>
                    ))}
                </select>

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
            {/* <div className="mt-4">
                {teamMembers.map((member, index) => (
                    <div key={index} className="bg-gray-100 px-3 py-1 mb-2 rounded-md">
                        {member}
                    </div>
                ))}
            </div> */}
        </div>
    );
};

export default AddMemberForm;
