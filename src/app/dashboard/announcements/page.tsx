'use client'
import LoadingSpinner from '@/components/common/LoadingSpinner';
import CreateAnnouncementsModal from '@/components/dashboard/CreateAnnouncementsModal';
import UpdateAnnouncementModal from '@/components/dashboard/UpdateAnnouncememtModal';
import { withRole } from '@/components/protected/withRole';
import { useApiQuery } from '@/hooks/useFetch'
import { getAuthToken } from '@/lib/getAuthToken';
import { AnnouncementsData } from '@/types/announcement';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
function Page() {
    const [isCreateAnnouncementModalOpen, setIsCreateAnnouncementModalOpen] = useState(false);
    const token = getAuthToken()
    function openCreateAnnouncementModal() {
        setIsCreateAnnouncementModalOpen(true);
    }
    function closeCreateAnnouncementModal() {
        setIsCreateAnnouncementModalOpen(false);
    }

    const [isUpdateAnnouncementModalOpen, setIsUpdateAnnouncementModalOpen] = useState(false);
    const [editingAnnouncementId, setEditingAnnouncementId] = useState<string | null>(null);

    const openUpdateAnnouncementModal = (id: string) => {
        setEditingAnnouncementId(id);
        setIsUpdateAnnouncementModalOpen(true);
    }

    const closeUpdateAnnouncementModal = () => {
        setEditingAnnouncementId(null);
        setIsUpdateAnnouncementModalOpen(false);
    }



    const { data: announcements, isLoading, isError } = useApiQuery<AnnouncementsData>(
        {
        queryKey: ["announcements"],
        url: "https://ieee-hsb-backend.vercel.app/api/announcements",
   
      })


    // to save the state of announcements
    const [announcementsList, setAnnouncementsList] = useState<AnnouncementsData>([]);
    useEffect(() => {
        announcements && setAnnouncementsList(announcements);
    }, [announcements]);


    //delete event
    const handleDeleteAnnouncement = async (announcementId: string) => {
        try {
            await axios.delete(`https://ieee-hsb-backend.vercel.app/api/announcements/${announcementId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            })
            setAnnouncementsList(prev => prev.filter(announcement => announcement.id !== announcementId));

            toast.success('Announcement deleted successfully');
        } catch (error) {
            console.error('Error deleting announcement:', error);
            toast.error('Failed to delete announcement');
        }
    }


    if (isLoading) return <LoadingSpinner />;
    if (isError) return <div>Error loading announcement.</div>;


    return (<>
        <div className="relative overflow-x-auto shadow-sm rounded-2xl bg-linear-to-b from-ieee-blue-80 to-ieee-blue-60 p-4">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 mb-4">
                <button onClick={openCreateAnnouncementModal} className="cursor-pointer px-4 py-2 text-ieee-blue-100 bg-white hover:dark:bg-ieee-blue-20 rounded-base font-medium shadow-sm transition-colors">
                    Add New Announcement
                    <span className='text-xl px-2'>+</span>
                </button>
                {/* <div className="relative w-full md:w-1/3">
                    <input
                        type="text"
                        placeholder="Search events..."
                        className="w-full px-3 py-2 rounded-base border border-ieee-aqua-20 focus:ring-2 focus:ring-ieee-aqua-40 focus:border-ieee-aqua-40 bg-white text-heading placeholder:text-gray-400 shadow-sm"
                    />
                </div> */}
            </div>

            <table className="w-full text-sm text-left text-heading bg-white rounded-lg shadow-md overflow-hidden">
                <thead className="bg-ieee-blue-100 text-white uppercase text-xs tracking-wide">
                    <tr>
                        <th className="px-6 py-3 font-medium">Title</th>
                        <th className="px-6 py-3 font-medium">Description</th>
                        <th className="px-6 py-3 font-medium">Action</th>
                    </tr>
                </thead>
                <tbody className="dark:text-black">
                    {announcementsList?.map(announcement => (
                        <tr key={announcement.id} className="hover:bg-ieee-blue-20 transition-colors">
                            <th className="flex items-center px-6 py-4 font-medium whitespace-nowrap">
                                <div className="ps-3">
                                    <div className="text-base font-semibold">{announcement.title}</div>
                                </div>
                            </th>
                            <td className="px-6 py-4">{announcement.description}</td>
                            <td className="px-6 py-4 flex items-center text-white gap-2">
                                <button onClick={() => { openUpdateAnnouncementModal(announcement.id) }} className=" text-sm bg-ieee-green-100 p-2 rounded cursor-pointer">Edit</button>
                                <button onClick={() => { handleDeleteAnnouncement(announcement.id) }} className=" text-sm bg-ieee-red-100 p-2 rounded cursor-pointer">Delete</button>
                            </td>

                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        {isCreateAnnouncementModalOpen && <CreateAnnouncementsModal onClose={closeCreateAnnouncementModal} setAnnouncementsList={setAnnouncementsList} />}
        {isUpdateAnnouncementModalOpen && editingAnnouncementId && (
            <UpdateAnnouncementModal onClose={closeUpdateAnnouncementModal} id={editingAnnouncementId} announcementsList={announcementsList} setAnnouncementsList={setAnnouncementsList} />
        )}

    </>
    )
}

export default withRole(Page, ['chairperson'])
