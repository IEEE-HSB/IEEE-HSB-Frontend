'use client'
import LoadingSpinner from '@/components/common/LoadingSpinner';
import CreateEventModal from '@/components/dashboard/CreateEventModal';
import UpdateEventModal from '@/components/dashboard/UpdateEventModal';
import { withRole } from '@/components/protected/withRole';
import { useApiQuery } from '@/hooks/useFetch'
import { getAuthToken } from '@/lib/getAuthToken';
import { EventType } from '@/types/event';
import axios from 'axios';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
 function Page() {
    const [isCreateEventModalOpen, setIsCreateEventModalOpen] = useState(false);
    const token = getAuthToken()
    function openCreateEventModal() {
        setIsCreateEventModalOpen(true);
    }
    function closeCreateEventModal() {
        setIsCreateEventModalOpen(false);
    }

    const [isUpdateEventModalOpen, setIsUpdateEventModalOpen] = useState(false);
    const [editingEventId, setEditingEventId] = useState<string | null>(null);

    const openUpdateEventModal = (id: string) => {
        setEditingEventId(id);
        setIsUpdateEventModalOpen(true);
    }

    const closeUpdateEventModal = () => {
        setEditingEventId(null);
        setIsUpdateEventModalOpen(false);
    }



    const { data: events, isLoading, isError } = useApiQuery<EventType[]>({
        queryKey: ["events"],
        url: "https://ieee-hsb-backend.vercel.app/api/events",
        method: "GET",
        select: (data) => Object.values(data).flat().sort(
            (a, b) => new Date(b.date || '').getTime() - new Date(a.date || '').getTime()
        ),
    });


    // to save the state of events
    const [eventsList, setEventsList] = useState<EventType[]>([]);
    useEffect(() => {
        if (events) {
            setEventsList(events);
        }
    }, [events]);


    //delete event
    const handleDeleteEvent = async (eventId: string) => {
        try {
            await axios.delete(`https://ieee-hsb-backend.vercel.app/api/events/${eventId}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            })
            setEventsList(prev => prev.filter(event => event.id !== eventId));

            toast.success('Event deleted successfully');
        } catch (error) {
            console.error('Error deleting event:', error);
            toast.error('Failed to delete event');
        }
    }


    if (isLoading) return <LoadingSpinner />;
    if (isError) return <div>Error loading events.</div>;


    return (<>
        <div className="relative overflow-x-auto shadow-sm rounded-2xl bg-linear-to-b from-ieee-blue-80 to-ieee-blue-60 p-4">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 mb-4">
                <button onClick={openCreateEventModal} className="cursor-pointer px-4 py-2 text-ieee-blue-100 bg-white hover:dark:bg-ieee-blue-20 rounded-base font-medium shadow-sm transition-colors">
                    Add New Event
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
                        <th className="px-6 py-3 font-medium">Event Name</th>
                        <th className="px-6 py-3 font-medium">Description</th>
                        <th className="px-6 py-3 font-medium">Event Date</th>
                        <th className="px-6 py-3 font-medium">Chapter Name</th>
                        <th className="px-6 py-3 font-medium">Action</th>
                    </tr>
                </thead>
                <tbody className="dark:text-black">
                    {eventsList?.map(event => (
                        <tr key={event.id} className="hover:bg-ieee-blue-20 transition-colors">
                            <th className="flex items-center px-6 py-4 font-medium whitespace-nowrap">
                                <Image width={20} height={10} className="w-20 h-10 rounded object-cover" src={event.image} alt={event.name} />
                                <div className="ps-3">
                                    <div className="text-base font-semibold">{event.name}</div>
                                </div>
                            </th>
                            <td className="px-6 py-4">{event.details}</td>
                            <td className="px-6 py-4">{event.date}</td>
                            <td className="px-6 py-4">{event.chapterId}</td>
                            <td className="px-6 py-4 flex items-center text-white gap-2">
                                <button onClick={() => { openUpdateEventModal(event.id) }} className=" text-sm bg-ieee-green-100 p-2 rounded cursor-pointer">Edit</button>
                                <button onClick={() => { handleDeleteEvent(event.id) }} className=" text-sm bg-ieee-red-100 p-2 rounded cursor-pointer">Delete</button>
                            </td>

                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        {isCreateEventModalOpen && <CreateEventModal onClose={closeCreateEventModal} setEventList={setEventsList} />}
        {isUpdateEventModalOpen && editingEventId && (
            <UpdateEventModal onClose={closeUpdateEventModal} id={editingEventId} eventsList={eventsList} setEventsList={setEventsList}  />
        )}

    </>
    )
}

export default withRole(Page, ['chairperson'])
