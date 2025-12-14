'use client'

import React, { useState } from 'react'
import axios from 'axios'
import { getAuthToken } from '@/lib/getAuthToken'
import toast from 'react-hot-toast'
import { GalleryType } from '@/types/gallery'


interface UpdateGalleryModalProps {
  onClose: () => void
  id: string
  galleryList?: GalleryType[]
  setGalleryList?: React.Dispatch<React.SetStateAction<GalleryType[]>>
}

export default function UpdateGalleryModal({ onClose, id, galleryList, setGalleryList }: UpdateGalleryModalProps) {
  const gallery = galleryList?.find(ev => ev.id === id)
  if (!gallery) return null

  const [title, setTitle] = useState(gallery.title)
  const [description, setDescription] = useState(gallery.description || '')
  const [chapterId, setChapterId] = useState(gallery.chapterId || '')
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
    formData.append('description', description)
    formData.append('chapterId', chapterId)
    if (file) formData.append('image', file)

    try {
      setLoading(true)
      const res = await axios.patch(
        `https://ieee-hsb-backend.vercel.app/api/gallary/${id}`,
        {title, description, chapterId},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      // Update local state
      setGalleryList?.(prev =>
        prev.map(gl => (gl.id === id ? res.data.data : gl))
      )
      toast.success('Picture updated successfully!')
      onClose()
    } catch (err: any) {
      console.error(err.response?.data || err)
      toast.error('Error updating picture: ' + (err.response?.data?.message || err.message))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="sm:w-[70%] w-[90%] bg-white/85 dark:bg-ieee-blue-100/85 rounded-2xl shadow-xl border max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 rounded-t-2xl bg-linear-to-r from-ieee-blue-80 to-ieee-blue-60">
          <h2 className="text-lg font-semibold text-white">Edit Picture</h2>
          <button
            onClick={onClose}
            className="cursor-pointer text-white/80 hover:text-white text-xl w-9 h-9 flex items-center justify-center rounded-full hover:bg-white/10 transition"
          >
            ✕
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input type="text" placeholder="Picture Title" value={title} onChange={e => setTitle(e.target.value)} required className={customInputStyles} />
          <textarea placeholder="Picture Description" value={description} onChange={e => setDescription(e.target.value)} required rows={3} className={`${customAreaStyles} sm:col-span-2`} />

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


          {/* Actions */}
          <div className="sm:col-span-2 flex justify-end gap-3 pt-4 border-t border-neutral-200 dark:border-neutral-700">
            <button type="button" onClick={onClose} className="px-4 cursor-pointer py-2 rounded-xl border border-neutral-300 dark:border-neutral-600 text-sm hover:bg-neutral-100 dark:hover:bg-neutral-800 transition">
              Cancel
            </button>
            <button type="submit" disabled={loading} className="px-5 py-2 cursor-pointer rounded-xl text-white text-sm font-medium bg-ieee-blue-100 dark:bg-ieee-blue-60 hover:bg-ieee-blue-80 disabled:opacity-60 transition">
              {loading ? 'Updating...' : 'Edit Picture'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
