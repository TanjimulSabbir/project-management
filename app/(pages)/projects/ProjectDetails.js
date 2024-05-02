'use client'
import { useEffect, useState } from 'react'
import DetailsOptions from '../DetailsOption'
import Modal from '@/app/utils/Modal'
import moment from 'moment';
import AddMemberModal from '@/app/utils/addMemberModal';
import { IoMdAdd } from 'react-icons/io';
import TaskDetails from '../tasks/[id]/TaskDetails';
import ComponentDescription from './HeadingDescription';
import toast from 'react-hot-toast';

export default function ProjectDetails({ project }) {
    const [openModal, setOpenModal] = useState(false);
    const [openAddMember, setOpenAddMember] = useState(false);
   
    const { id, name, description, status, dueDate, members, tasks } = project;
    const addMemberBtnStye = "rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-green-600 ml-3 cursor-pointer flex items-center space-x-2"

    const handleModal = () => {
        setOpenModal(!openModal);
    }

    const handleAddMember = () => {
        setOpenAddMember(!openAddMember)
    }

    const handleAddTask = () => {
        toast.error("Project Time over. That's why I can't adding this feature right now.")
    }

    return (
        <div className='mt-5'>
            <ComponentDescription
                componentName="Project Details"
                description="This component displays detailed information about a project, including its name, description, status, due date,and a list of tasks associated with the project. Users can also manage project options and add members to the project."
            />
            <div className='w-full'>
                <div className="p-6 bg-white shadow rounded-lg">
                    <div className="mb-4">
                        <h1 className="text-lg font-bold mb-1">Project Name: {name}</h1>
                        <p className="text-gray-600 mt-5">{description}</p>
                    </div>
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <p className="text-sm text-black">Status:</p>
                            <span className={`text-sm font-semibold ${status.toLowerCase() === 'completed' ? 'text-green-600' : 'text-red-600'}`}>{status}</span>
                        </div>
                        <div>
                            <p className="text-sm text-black">Due Date:</p>
                            <p className="text-sm font-semibold">{moment(dueDate).format('DD MMMM YYYY')}</p>
                        </div>
                    </div>
                    <p className="text-sm text-black mt-7">Team Members for this project</p>
                    <div className='flex items-center flex-wrap gap-3 mt-3'>
                        {members.flatMap(member => member.team).map((memberName, index) => (
                            <p key={index} className="text-sm font-semibold bg-green-600 p-2 rounded-md">{memberName}</p>
                        ))}
                    </div>
                    <div className="flex items-center mt-5">
                        <DetailsOptions handleModal={handleModal} data={project} type="project" />
                        <p className={addMemberBtnStye} onClick={handleAddMember}>
                            <IoMdAdd />  <span>Add Member</span>
                        </p>
                        <p className={addMemberBtnStye} onClick={handleAddTask}>
                            <IoMdAdd />   <span>Add Task</span>
                        </p>
                    </div>
                    <Modal openModal={openModal} handleModal={handleModal} type="project" />
                </div>
                {openAddMember && <AddMemberModal projectId={id} setOpenAddMember={setOpenAddMember} />}
            </div>
            {/* All Tasks for this project */}
            <div className='my-14'>
                <ComponentDescription
                    componentName="All Tasks for this project"
                    description="This component displays detailed information about a task within a project, including its name, description, status,and due date. It provides options for managing the task, such as editing or deleting it."
                />
                <div className='grid grid-cols-1 md:grid-cols-2 gap-5 mt-5'>
                    {tasks.map(task => <TaskDetails key={task.id} task={task} />)}
                </div>
            </div>
        </div>
    )
}
