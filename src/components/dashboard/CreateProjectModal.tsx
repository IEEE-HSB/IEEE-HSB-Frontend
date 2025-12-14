'use client'

import React, { useState } from 'react'
import axios, { isAxiosError } from 'axios'
import { getAuthToken } from '@/lib/getAuthToken'
import toast from 'react-hot-toast'
import { ProjectType } from '@/types/project'

interface CreateProjectModalProps {
  onClose: () => void
  setProjectList?: React.Dispatch<React.SetStateAction<ProjectType[]>>
}

export default function CreateProjectModal({
  onClose,
  setProjectList,
}: CreateProjectModalProps) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [chapterId, setChapterId] = useState('')
  const [link, setLink] = useState('')
  const [mainImage, setMainImage] = useState<File | null>(null)
  const [subImages, setSubImages] = useState<File[]>([])
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

    if (!title || !description || !chapterId) {
      toast.error('Please fill all required fields')
      return
    }


    const formData = new FormData()
    formData.append('title', title)
    formData.append('description', description)
    formData.append('chapterId', chapterId)
    if (link) formData.append('link', link)

    // Main image
    mainImage&&formData.append('image', mainImage)

    // Sub images (optional)
    subImages.forEach(img => {
      formData.append('subImages', img)
    })

    try {
      setLoading(true)
      const res = await axios.post(
        'https://ieee-hsb-backend.vercel.app/api/projects',
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      setProjectList?.(prev => [...prev, res.data.data])
      toast.success('Project added successfully!')
      onClose()
    } catch (err: unknown) {
      if (isAxiosError(err)) {
                console.error(err.response?.data || err)
                toast.error('Error creating project: ' + (err.response?.data?.message || err.message))

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
      <div className="sm:w-[70%] w-[90%] bg-white/85 dark:bg-ieee-blue-100/85 rounded-2xl shadow-xl border max-h-[90vh] flex flex-col">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 rounded-t-2xl bg-linear-to-r from-ieee-blue-80 to-ieee-blue-60">
          <h2 className="text-lg font-semibold text-white">Add New Project</h2>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white text-xl w-9 h-9 flex items-center justify-center rounded-full hover:bg-white/10 transition"
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
            placeholder="Project Title"
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
            className={customInputStyles}
          />

          {/* Chapter */}
          <select
            value={chapterId}
            onChange={e => setChapterId(e.target.value)}
            required
            className={customInputStyles}
          >
            <option value="">Choose a chapter</option>
            <option value="CS">CS</option>
            <option value="COMSOC">COMSOC</option>
            <option value="RAS">RAS</option>
            <option value="PES">PES</option>
            <option value="WIE">WIE</option>
            <option value="IEEE">IEEE (General)</option>
          </select>

          {/* Description */}
          <textarea
            placeholder="Project Description"
            value={description}
            onChange={e => setDescription(e.target.value)}
            required
            rows={3}
            className={`${customAreaStyles} sm:col-span-2`}
          />

          {/* Link */}
          <input
            type="text"
            placeholder="Registration Link (optional)"
            value={link}
            onChange={e => setLink(e.target.value)}
            className={customInputStyles}
          />

          {/* Main Image */}
          <div className="sm:col-span-2">
            <label htmlFor="main_image_input" className="block mb-2 text-sm">
              Main Image (optional)
            </label>
            <input
              id="main_image_input"
              type="file"
              accept="image/*"
              onChange={e => setMainImage(e.target.files?.[0] || null)}
              className={customInputStyles}
            />
          </div>

          {/* Sub Images */}
          <div className="sm:col-span-2">
            <label htmlFor="sub_images_input" className="block mb-2 text-sm">
              Sub Images (optional)
            </label>
            <input
              id="sub_images_input"
              type="file"
              multiple
              accept="image/*"
              onChange={e =>
                setSubImages(
                  e.target.files ? Array.from(e.target.files) : []
                )
              }
              className={customInputStyles}
            />
          </div>

          {/* Actions */}
          <div className="sm:col-span-2 flex justify-end gap-3 pt-4 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl border text-sm"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2 rounded-xl text-white text-sm bg-ieee-blue-100 hover:bg-ieee-blue-80 disabled:opacity-60"
            >
              {loading ? 'Creating...' : 'Add Project'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
