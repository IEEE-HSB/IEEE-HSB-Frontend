'use client'

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

export default function ForgetPassword() {
  const [email, setEmail] = useState('')
  const router = useRouter()


  // Function to send the reset code request
  const sendCodeRequest = (email: string) => {
    return axios.post('YOUR_API_HERE/forgot-password', {
      email
    })
  }

  const { mutate, isPending } = useMutation({
    mutationFn: sendCodeRequest,

    onSuccess: () => {
      toast.success('Code sent successfully!')
      router.push('/resetcode')
    },

    onError: () => {
      toast.error('Something went wrong')
    },
  })

  return (
    <div className="min-h-screen flex items-center justify-center bg-ieee-blue-5 dark:bg-[#0B1220] px-4">
      <div className="w-full max-w-md rounded-2xl shadow-xl border border-ieee-blue-20 dark:border-ieee-blue-80 bg-white dark:bg-[#020817] p-8">

        <h1 className="text-2xl font-bold text-center text-ieee-blue-100 dark:text-ieee-blue-20 mb-2">
          Forgot your password?
        </h1>

        <p className="text-center text-ieee-blue-70 dark:text-ieee-blue-40 mb-8">
          Enter your email and we&apos;ll send you a reset code
        </p>

        <div className="flex flex-col gap-6">
          <Input
            type="email"
            placeholder="Enter your email"
            className="py-6 rounded-xl"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Button
            onClick={() => mutate(email)}
            disabled={isPending || !email}
            className="w-full py-6 rounded-xl bg-ieee-blue-100 hover:bg-ieee-blue-80 text-white font-semibold cursor-pointer"
          >
            {isPending ? 'Sending...' : 'Send Code'}
          </Button>
        </div>

      </div>
    </div>
  )
}
