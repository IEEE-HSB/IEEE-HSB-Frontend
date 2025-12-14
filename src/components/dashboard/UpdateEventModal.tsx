'use client'

import React, { useState } from 'react'
import axios from 'axios'
import { getAuthToken } from '@/lib/getAuthToken'
import toast from 'react-hot-toast'
import { EventType } from '@/types/event'

interface UpdateEventModalProps {
  onClose: () => void
  id: string
  eventsList?: EventType[]
  setEventsList?: React.Dispatch<React.SetStateAction<EventType[]>>
}

export default function UpdateEventModal({ onClose, id, eventsList, setEventsList }: UpdateEventModalProps) {
  const event = eventsList?.find(ev => ev.id === id)
  if (!event) return null

  const [title, setTitle] = useState(event.name)
  const [location, setLocation] = useState(event.location || '')
  const [details, setDetails] = useState(event.details || '')
  const [moreDetails, setMoreDetails] = useState(event.moreDetails || '')
  const [link, setLink] = useState(event.link || '')
  const [chapterId, setChapterId] = useState(event.chapterId || '')
  const [date, setDate] = useState(event.date || '')
  const [endTime, setEndTime] = useState(event.endTime || '')
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
    e.preventDefault()
    const token = getAuthToken()

    const formData = new FormData()
    formData.append('title', title)
    formData.append('location', location)
    formData.append('details', details)
    if (moreDetails) formData.append('moreDetails', moreDetails)
    if (link) formData.append('link', link)
    formData.append('chapterId', chapterId)
    formData.append('date', date)
    if (endTime) formData.append('endTime', endTime)
    if (file) formData.append('image', file)

    try {
      setLoading(true)
      const res = await axios.put(
        `https://ieee-hsb-backend.vercel.app/api/events/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      )
      // Update local state
      setEventsList?.(prev =>
        prev.map(ev => (ev.id === id ? res.data.data : ev))
      )
      toast.success('Event updated successfully!')
      onClose()
    } catch (err: any) {
      console.error(err.response?.data || err)
      toast.error('Error updating event: ' + (err.response?.data?.message || err.message))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="sm:w-[70%] w-[90%] bg-white/85 dark:bg-ieee-blue-100/85 rounded-2xl shadow-xl border max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 rounded-t-2xl bg-linear-to-r from-ieee-blue-80 to-ieee-blue-60">
          <h2 className="text-lg font-semibold text-white">Edit Event</h2>
          <button
            onClick={onClose}
            className="cursor-pointer text-white/80 hover:text-white text-xl w-9 h-9 flex items-center justify-center rounded-full hover:bg-white/10 transition"
          >
            ✕
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input type="text" placeholder="Event Title" value={title} onChange={e => setTitle(e.target.value)} required className={customInputStyles} />
          <input type="text" placeholder="Location" value={location} onChange={e => setLocation(e.target.value)} required className={customInputStyles} />
          <textarea placeholder="Event Details" value={details} onChange={e => setDetails(e.target.value)} required rows={3} className={`${customAreaStyles} sm:col-span-2`} />
          <textarea placeholder="More Details (optional)" value={moreDetails} onChange={e => setMoreDetails(e.target.value)} rows={4} className={`${customAreaStyles} sm:col-span-2`} />

          {/* Chapter */}
          <div>
            <select value={chapterId} onChange={e => setChapterId(e.target.value)} required className="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-900 border border-neutral-300 dark:border-neutral-700 text-sm dark:text-ieee-blue-20 text-neutral-900 focus:outline-none focus:border-ieee-blue-60 focus:ring-2 focus:ring-ieee-blue-60/40 cursor-pointer transition hover:bg-ieee-blue-10 dark:hover:bg-ieee-blue-100">
              <option value="">Choose a chapter</option>
              <option value="CS">CS</option>
              <option value="COMSOC">COMSOC</option>
              <option value="RAS">RAS</option>
              <option value="PES">PES</option>
              <option value="WIE">WIE</option>
              <option value="IEEE">IEEE (General)</option>
            </select>
          </div>

          <input type="text" placeholder="Registration Link (optional)" value={link} onChange={e => setLink(e.target.value)} className={customInputStyles} />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:col-span-2">
            <input type="date" value={date} onChange={e => setDate(e.target.value)} required className={customInputStyles} />
            <input type="number" placeholder="Duration (hours)" value={endTime} onChange={e => setEndTime(e.target.value)} className={customInputStyles} />
          </div>

          {/* Image */}
          <div className="sm:col-span-2">
           
            <input
              id="file_input"
              type="file"
              accept="image/*"
              onChange={e => setFile(e.target.files![0])}
              className={customInputStyles}
            />
          </div>

          {/* Actions */}
          <div className="sm:col-span-2 flex justify-end gap-3 pt-4 border-t border-neutral-200 dark:border-neutral-700">
            <button type="button" onClick={onClose} className="px-4 cursor-pointer py-2 rounded-xl border border-neutral-300 dark:border-neutral-600 text-sm hover:bg-neutral-100 dark:hover:bg-neutral-800 transition">
              Cancel
            </button>
            <button type="submit" disabled={loading} className="px-5 py-2 cursor-pointer rounded-xl text-white text-sm font-medium bg-ieee-blue-100 dark:bg-ieee-blue-60 hover:bg-ieee-blue-80 disabled:opacity-60 transition">
              {loading ? 'Updating...' : 'Update Event'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
