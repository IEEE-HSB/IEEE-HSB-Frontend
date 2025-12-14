'use client'

import React, { useState } from 'react'
import axios, { isAxiosError } from 'axios'
import { getAuthToken } from '@/lib/getAuthToken'
import toast from 'react-hot-toast'
import { EventType } from '@/types/event'

export default function CreateEventModal({ onClose, setEventList }: { onClose: () => void, setEventList?: React.Dispatch<React.SetStateAction<EventType[]>> }) {
    const [title, setTitle] = useState('')
    const [location, setLocation] = useState('')
    const [details, setDetails] = useState('')
    const [moreDetails, setMoreDetails] = useState('')
    const [link, setLink] = useState('')
    const [chapterId, setChapterId] = useState('')
    const [date, setDate] = useState('')
    const [endTime, setEndTime] = useState('')
    const [file, setFile] = useState<File | null>(null)
    const [loading, setLoading] = useState(false)

    const customInputStyles = `w-full px-4 py-3 rounded-xl
    bg-white dark:bg-slate-900
    border border-neutral-300 dark:border-neutral-700
    text-sm text-ieee-blue-20  
    placeholder:text-ieee-blue-100 dark:placeholder:text-ieee-blue-60
    focus:outline-none focus:border-ieee-blue-60
    focus:ring-2 focus:ring-ieee-blue-60/40
    transition`

    const customAreaStyles = `w-full px-4 py-3 rounded-xl
    bg-white dark:bg-slate-900
    border border-neutral-300 dark:border-neutral-700
    text-sm text-ieee-blue-20 dark:text-neutral-100
    placeholder:text-ieee-blue-100 dark:placeholder:text-ieee-blue-60
    resize-none
    focus:outline-none focus:border-ieee-blue-60
    focus:ring-2 focus:ring-ieee-blue-60/40
    transition`

    const handleSubmit = async (e: React.FormEvent) => {
        const token = getAuthToken()
        e.preventDefault()
        if (!file) return alert('Image is required')

        const formData = new FormData()
        formData.append('title', title)
        formData.append('location', location)
        formData.append('details', details)
        if (moreDetails) formData.append('moreDetails', moreDetails)
        if (link) formData.append('link', link)
        formData.append('chapterId', chapterId)
        formData.append('date', date)
        if (endTime) formData.append('endTime', endTime)
        formData.append('image', file)

        try {
            setLoading(true)
            const res = await axios.post(
                'https://ieee-hsb-backend.vercel.app/api/events',
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data',
                    },
                }
            )
            console.log('Event created:', res.data)
            setEventList?.(prev => [...prev, res.data.data])
            onClose()
            toast.success('Event created successfully!')
        } catch (err: unknown) {
            if (isAxiosError(err)) {
                console.error(err.response?.data || err)
                toast.error('Error creating event: ' + (err.response?.data?.message || err.message))

            }
            else{
                toast.error('something went wrong!')
            }
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
            <div className="sm:w-[70%] w-[90%] bg-white/85 dark:bg-ieee-blue-100/85 rounded-2xl shadow-xl border 
                      max-h-[90vh] flex flex-col">

                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 rounded-t-2xl
                        bg-linear-to-r from-ieee-blue-80 to-ieee-blue-60">
                    <h2 className="text-lg font-semibold text-white">Create New Event</h2>
                    <button
                        onClick={onClose}
                        className="cursor-pointer text-white/80 hover:text-white text-xl w-9 h-9 flex items-center justify-center rounded-full hover:bg-white/10 transition"
                    >
                        ✕
                    </button>
                </div>

                {/* Form */}
                <form
                    onSubmit={handleSubmit}
                    className="p-6 overflow-y-auto flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4"
                >

                    {/* Title */}
                    <input
                        type="text"
                        placeholder="Event Title"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        required
                        className={customInputStyles}
                    />

                    {/* Location */}
                    <input
                        type="text"
                        placeholder="Location"
                        value={location}
                        onChange={e => setLocation(e.target.value)}
                        required
                        className={customInputStyles}
                    />

                    {/* Details */}
                    <textarea
                        placeholder="Event Details"
                        value={details}
                        onChange={e => setDetails(e.target.value)}
                        required
                        rows={3}
                        className={`${customAreaStyles} sm:col-span-2`}
                    />

                    {/* More Details */}
                    <textarea
                        placeholder="More Details (optional)"
                        value={moreDetails}
                        onChange={e => setMoreDetails(e.target.value)}
                        rows={4}
                        className={`${customAreaStyles} sm:col-span-2`}

                    />

                    {/* Chapter */}
                    <div>
                        <select
                            value={chapterId}
                            onChange={e => setChapterId(e.target.value)}
                            required
                            className="w-full px-4 py-3 rounded-xl
             bg-white dark:bg-slate-900
             border border-neutral-300 dark:border-neutral-700
             text-sm dark:text-ieee-blue-20 text-neutral-900
             focus:outline-none focus:border-ieee-blue-60
             focus:ring-2 focus:ring-ieee-blue-60/40
             cursor-pointer
             transition
             hover:bg-ieee-blue-10 dark:hover:bg-ieee-blue-100"
                        >
                            <option value="">Choose a chapter</option>
                            <option value="CS">CS</option>
                            <option value="COMSOC">COMSOC</option>
                            <option value="RAS">RAS</option>
                            <option value="PES">PES</option>
                            <option value="WIE">WIE</option>
                            <option value="IEEE">IEEE (General)</option>
                        </select>
                    </div>

                    {/* Registration Link */}
                    <input
                        type="text"
                        placeholder="Registration Link (optional)"
                        value={link}
                        onChange={e => setLink(e.target.value)}
                        className={customInputStyles}
                    />

                    {/* Date + Duration */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:col-span-2">
                        <input
                            type="date"
                            value={date}
                            onChange={e => setDate(e.target.value)}
                            required
                            className="w-full px-4 py-3 rounded-xl
              bg-white dark:bg-slate-900
              border border-neutral-300 dark:border-neutral-700
              text-sm text-neutral-900 dark:text-ieee-blue-20
              focus:outline-none focus:border-ieee-blue-60
              focus:ring-2 focus:ring-ieee-blue-60/40
                  placeholder:text-ieee-blue-100 dark:placeholder:text-ieee-blue-60

              transition"
                        />
                        <input
                            type="number"
                            placeholder="Duration (hours)"
                            value={endTime}
                            onChange={e => setEndTime(e.target.value)}
                            className={customInputStyles}
                        />
                    </div>

                    {/* Image */}
                    <div className="sm:col-span-2">
                        <label htmlFor="file_input" className="block mb-2 text-sm font-medium text-ieee-blue-100 dark:text-ieee-blue-20
">
                            Event Cover Image
                        </label>
                        <input
                            id="file_input"
                            type="file"
                            accept="image/*"
                            onChange={e => setFile(e.target.files![0])}
                            required
                            className={customInputStyles}
                        />
                    </div>

                    {/* Actions */}
                    <div className="sm:col-span-2 flex justify-end gap-3 pt-4 border-t border-neutral-200 dark:border-neutral-700">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 cursor-pointer py-2 rounded-xl border border-neutral-300 dark:border-neutral-600
                         text-sm hover:bg-neutral-100 dark:hover:bg-neutral-800 transition"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={loading}
                            className="px-5 py-2 cursor-pointer rounded-xl text-white text-sm font-medium
                         bg-ieee-blue-100 dark:bg-ieee-blue-60 hover:bg-ieee-blue-80
                         disabled:opacity-60 transition"
                        >
                            {loading ? 'Creating...' : 'Create Event'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}