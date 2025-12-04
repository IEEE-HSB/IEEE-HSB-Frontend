'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import toast from 'react-hot-toast'
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { Button } from "@/components/ui/button"
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

function ResetCode() {
  const router = useRouter()
  const [resetCode, setResetCode] = useState('')

// replace with your API call
  const verifyCodeRequest = (code: string) => {
    return axios.post('YOUR_API_HERE/verify-code', {
      resetCode: code
    })
  }

  const { mutate, isPending } = useMutation({
    mutationFn: verifyCodeRequest,

    onSuccess: () => {
      toast.success("Code verified successfully!")
      router.push('/resetpassword')
    },

    onError: () => {
      toast.error("Invalid code")
    }
  })

  return (
    <div className="min-h-screen flex items-center justify-center bg-ieee-blue-5 dark:bg-[#0B1220] px-4">
      <div className="w-full max-w-md rounded-2xl shadow-xl border border-ieee-blue-20 dark:border-ieee-blue-80 bg-white dark:bg-[#020817] p-8">

        <h3 className="text-2xl font-bold text-center text-ieee-blue-100 dark:text-ieee-blue-20 mb-2">
          Verify Code
        </h3>

        <p className="text-center text-ieee-blue-70 dark:text-ieee-blue-40 mb-8">
          Enter the 6-digit code sent to your email
        </p>

        <div className="flex flex-col items-center gap-8">

          <InputOTP
            maxLength={6}
            value={resetCode}
            onChange={(value) => setResetCode(value)}
            className="gap-2"
          >
            <InputOTPGroup className="gap-2">
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
            </InputOTPGroup>

            <InputOTPSeparator className="text-ieee-blue-100 dark:text-ieee-blue-20" />

            <InputOTPGroup className="gap-2">
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>

          <Button
            onClick={() => mutate(resetCode)}
            disabled={isPending || resetCode.length < 6}
            className="w-full rounded-xl bg-ieee-blue-100 hover:bg-ieee-blue-80 text-white font-semibold py-6 cursor-pointer"
          >
            {isPending ? 'Verifying...' : 'Verify Code'}
          </Button>

        </div>

      </div>
    </div>
  )
}

export default ResetCode
