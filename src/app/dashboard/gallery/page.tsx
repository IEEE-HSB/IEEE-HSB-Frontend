'use client'
import LoadingSpinner from '@/components/common/LoadingSpinner';
import CreateGalleryModal from '@/components/dashboard/CreateGalleryModal';
import { withRole } from '@/components/protected/withRole';
import { useApiQuery } from '@/hooks/useFetch'
import { getAuthToken } from '@/lib/getAuthToken';
import { GalleryType } from '@/types/gallery';
import axios from 'axios';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
function Page() {
    const [isCreateGalleryModalOpen, setIsCreateGalleryModalOpen] = useState(false);
    const token = getAuthToken()
    function openCreateGalleryModal() {
        setIsCreateGalleryModalOpen(true);
    }
    function closeCreateGalleryModal() {
        setIsCreateGalleryModalOpen(false);
    }

    const [isUpdateGalleryModalOpen, setIsUpdateGalleryModalOpen] = useState(false);
    const [editingGalleryId, setEditingGalleryId] = useState<string | null>(null);

    const openUpdateGalleryModal = (id: string) => {
        setEditingGalleryId(id);
        setIsUpdateGalleryModalOpen(true);
    }

    const closeUpdateGalleryModal = () => {
        setEditingGalleryId(null);
        setIsUpdateGalleryModalOpen(false);
    }



    const { data: gallery, isLoading, isError } = useApiQuery<GalleryType[]>({
        queryKey: ["gallery"],
        url: "https://ieee-hsb-backend.vercel.app/api/gallary",
        method: "GET"
    });


    // to save the state of gallery
    const [galleryList, setGalleryList] = useState<GalleryType[]>([]);
    useEffect(() => {
        gallery && setGalleryList(gallery);
    }, [gallery]);


    //delete event
    const handleDeleteGallery = async (galleryId: string) => {
        try {
            await axios.delete(`https://ieee-hsb-backend.vercel.app/api/gallary/${galleryId}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            })
            setGalleryList(prev => prev.filter(gallery => gallery.id !== galleryId));

            toast.success('Gallery deleted successfully');
        } catch (error) {
            console.error('Error deleting gallery:', error);
            toast.error('Failed to delete gallery');
        }
    }


    if (isLoading) return <LoadingSpinner />;
    if (isError) return <div>Error loading gallery.</div>;


    return (<>
        <div className="relative overflow-x-auto shadow-sm rounded-2xl bg-linear-to-b from-ieee-blue-80 to-ieee-blue-60 p-4">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 mb-4">
                <button onClick={openCreateGalleryModal} className="cursor-pointer px-4 py-2 text-ieee-blue-100 bg-white hover:dark:bg-ieee-blue-20 rounded-base font-medium shadow-sm transition-colors">
                    Add New Gallery
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
                        <th className="px-6 py-3 font-medium">Image</th>
                        <th className="px-6 py-3 font-medium">Chapter Name</th>
                        <th className="px-6 py-3 font-medium">Action</th>
                    </tr>
                </thead>
                <tbody className="dark:text-black">
                    {galleryList?.map(gallery => (
                        <tr key={gallery.id} className="hover:bg-ieee-blue-20 transition-colors">
                            <th className="flex items-center px-6 py-4 font-medium whitespace-nowrap">
                                <div className="ps-3">
                                    <div className="text-base font-semibold">{gallery.title}</div>
                                </div>
                            </th>
                            <td className="px-6 py-4">{gallery.description}</td>
                            <td className="px-6 py-4">
                                <Image width={20} height={10} className="w-20 h-10 rounded object-cover" src={gallery.image} alt={gallery.title} /></td>
                            <td className="px-6 py-4">{gallery.chapterId}</td>
                            <td className="px-6 py-4 flex items-center text-white gap-2">
                                {/* <button onClick={() => { openUpdateGalleryModal(gallery.id) }} className=" text-sm bg-ieee-green-100 p-2 rounded cursor-pointer">Edit</button> */}
                                <button onClick={() => { handleDeleteGallery(gallery.id) }} className=" text-sm bg-ieee-red-100 p-2 rounded cursor-pointer">Delete</button>
                            </td>

                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        {isCreateGalleryModalOpen && <CreateGalleryModal onClose={closeCreateGalleryModal} setGalleryList={setGalleryList} />}
       

    </>
    )
}

export default withRole(Page, ['chairperson'])
