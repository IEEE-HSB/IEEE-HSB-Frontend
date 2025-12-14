'use client'

import React, { useState } from 'react'
import axios from 'axios'
import { getAuthToken } from '@/lib/getAuthToken'
import toast from 'react-hot-toast'
import { GalleryType } from '@/types/gallery'
import { AnnouncementType } from '@/types/announcement'


interface CreateAnnouncementsModalProps {
  onClose: () => void
  setAnnouncementsList?: React.Dispatch<React.SetStateAction<AnnouncementType[]>>
}
export default function CreateAnnouncementsModal({ onClose, setAnnouncementsList }: CreateAnnouncementsModalProps) {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [link, setLink] = useState('')

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

        try {
            setLoading(true)
            const res = await axios.post(
                'https://ieee-hsb-backend.vercel.app/api/announcements',
                  { title, description, link },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
            console.log('Announcement created:', res.data)
            setAnnouncementsList?.(prev => [...prev, res.data.data])
            onClose()

            toast.success('Announcement added successfully!')
        } catch (err: any) {
            console.error(err.response?.data || err)
            toast.error('Error creating announcement: ' + (err.response?.data?.message || err.message))
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
                    <h2 className="text-lg font-semibold text-white">Add New Announcement</h2>
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
                        placeholder="Picture Title"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        required
                        className={customInputStyles}
                    />


                    {/* description */}
                    <textarea
                        placeholder="Description"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        required
                        rows={3}
                        className={`${customAreaStyles} sm:col-span-2`}
                    />


                    {/* link */}
                      <input
                        type="text"
                        placeholder="Announcement Link (optional)"
                        value={link}
                        onChange={e => setLink(e.target.value)}
                        className={customInputStyles}
                    />

             
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
                            {loading ? 'Creating...' : 'Add Announcement'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}