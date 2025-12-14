'use client'
import LoadingSpinner from '@/components/common/LoadingSpinner';
import CreateProjectModal from '@/components/dashboard/CreateProjectModal';
import UpdateProjectModal from '@/components/dashboard/UpdateProjectModal';
import { withRole } from '@/components/protected/withRole';
import { useApiQuery } from '@/hooks/useFetch'
import { getAuthToken } from '@/lib/getAuthToken';
import { ProjectType } from '@/types/project';
import axios from 'axios';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';

 function Page() {
    const [isCreateProjectModalOpen, setIsCreateProjectModalOpen] = useState(false);
    const token = getAuthToken()
    function openCreateProjectModal() {
        setIsCreateProjectModalOpen(true);
    }
    function closeCreateProjectModal() {
        setIsCreateProjectModalOpen(false);
    }

    const [isUpdateProjectModalOpen, setIsUpdateProjectModalOpen] = useState(false);
    const [editingProjectId, setEditingProjectId] = useState<string | null>(null);

    const openUpdateProjectModal = (id: string) => {
        setEditingProjectId(id);
        setIsUpdateProjectModalOpen(true);
    }

    const closeUpdateProjectModal = () => {
        setEditingProjectId(null);
        setIsUpdateProjectModalOpen(false);
    }



    const { data: projects, isLoading, isError } = useApiQuery<ProjectType[]>({
        queryKey: ["Projects"],
        url: "https://ieee-hsb-backend.vercel.app/api/projects",
        method: "GET",
    });


    // to save the state of Projects
    const [projectsList, setProjectsList] = useState<ProjectType[]>([]);
    useEffect(() => {
        if (projects) {
            setProjectsList(projects);
        }
    }, [projects]);


    //delete Project
    const handleDeleteProject = async (projectId: string) => {
        try {
            await axios.delete(`https://ieee-hsb-backend.vercel.app/api/projects/${projectId}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            })
            setProjectsList(prev => prev.filter(project => project.id !== projectId));

            toast.success('Project deleted successfully');
        } catch (error) {
            console.error('Error deleting Project:', error);
            toast.error('Failed to delete Project');
        }
    }


    if (isLoading) return <LoadingSpinner />;
    if (isError) return <div>Error loading projects.</div>;


    return (<>
        <div className="relative overflow-x-auto shadow-sm rounded-2xl bg-linear-to-b from-ieee-blue-80 to-ieee-blue-60 p-4">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 mb-4">
                <button onClick={openCreateProjectModal} className="cursor-pointer px-4 py-2 text-ieee-blue-100 bg-white hover:dark:bg-ieee-blue-20 rounded-base font-medium shadow-sm transition-colors">
                    Add New Project
                    <span className='text-xl px-2'>+</span>
                </button>
                {/* <div className="relative w-full md:w-1/3">
                    <input
                        type="text"
                        placeholder="Search Projects..."
                        className="w-full px-3 py-2 rounded-base border border-ieee-aqua-20 focus:ring-2 focus:ring-ieee-aqua-40 focus:border-ieee-aqua-40 bg-white text-heading placeholder:text-gray-400 shadow-sm"
                    />
                </div> */}
            </div>

            <table className="w-full text-sm text-left text-heading bg-white rounded-lg shadow-md overflow-hidden">
                <thead className="bg-ieee-blue-100 text-white uppercase text-xs tracking-wide">
                    <tr>
                        <th className="px-6 py-3 font-medium">Project Name</th>
                        <th className="px-6 py-3 font-medium">Description</th>
                        <th className="px-6 py-3 font-medium">Picture</th>
                        <th className="px-6 py-3 font-medium">Chapter Name</th>
                        <th className="px-6 py-3 font-medium">Action</th>
                    </tr>
                </thead>
                <tbody className="dark:text-black">
                    {projectsList?.map(project => (
                        <tr key={project.id} className="hover:bg-ieee-blue-20 transition-colors">
                            <th className="flex items-center px-6 py-4 font-medium whitespace-nowrap">
                                <div className="ps-3">
                                    <div className="text-base font-semibold">{project.title}</div>
                                </div>
                            </th>
                            <td className="px-6 py-4">{project.description}</td>
                            <td className="px-6 py-4">
                                <Image width={20} height={10} className="w-20 h-10 rounded object-cover" src={project.image|| '/assets/ieeeLogo.png'} alt={project.title} />

                            </td>
                            <td className="px-6 py-4">{project.chapterId}</td>
                            <td className="px-6 py-4 flex items-center text-white gap-2">
                                <button onClick={() => { openUpdateProjectModal(project.id) }} className=" text-sm bg-ieee-green-100 p-2 rounded cursor-pointer">Edit</button>
                                <button onClick={() => { handleDeleteProject(project.id) }} className=" text-sm bg-ieee-red-100 p-2 rounded cursor-pointer">Delete</button>
                            </td>

                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        {isCreateProjectModalOpen && <CreateProjectModal onClose={closeCreateProjectModal} setProjectList={setProjectsList} />}
        {isUpdateProjectModalOpen && editingProjectId && (
            <UpdateProjectModal onClose={closeUpdateProjectModal} id={editingProjectId} projectsList={projectsList} setProjectsList={setProjectsList} />
        
        )}
    </>
    )
}

export default withRole(Page, ['chairperson'])
