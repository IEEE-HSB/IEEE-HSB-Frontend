'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import axios from 'axios'
import { motion } from 'framer-motion'
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "@/components/ui/input-otp"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Lock, Eye, EyeOff } from "lucide-react"
import * as Yup from 'yup'
import { Formik, Form, Field, ErrorMessage } from 'formik'

export default function ResetPassword() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [showRePassword, setShowRePassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [otp, setOtp] = useState('')

  const initialValues = {
    email: '',
    password: '',
    rePassword: '',
  }

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters")
      .matches(/[A-Z]/, "Must contain at least one uppercase letter")
      .matches(/[a-z]/, "Must contain at least one lowercase letter")
      .matches(/[0-9]/, "Must contain at least one number")
      .matches(/[!@#$%^&*(),.?\":{}|<>]/, "Must contain special character")
      .matches(/^\S*$/, "Password should not contain spaces"),
    rePassword: Yup.string()
      .oneOf([Yup.ref("password"), undefined], "Passwords must match")
      .required("Please confirm your password"),
  })

  const getPasswordStrength = (password: string) => {
    let strength = 0
    if (password.length >= 8) strength++
    if (/[A-Z]/.test(password)) strength++
    if (/[a-z]/.test(password)) strength++
    if (/[0-9]/.test(password)) strength++
    if (/[!@#$%^&*(),.?\":{}|<>]/.test(password)) strength++
    return strength
  }

  const getStrengthColor = (strength: number) => {
    if (strength <= 2) return "bg-red-500"
    if (strength === 3) return "bg-yellow-500"
    if (strength === 4) return "bg-blue-500"
    return "bg-green-500"
  }

  const getStrengthText = (strength: number) => {
    if (strength <= 2) return "Weak"
    if (strength === 3) return "Medium"
    if (strength === 4) return "Strong"
    return "Very Strong"
  }

  const onSubmit = async (values: typeof initialValues) => {
    if (otp.length < 6) return toast.error("OTP must be 6 digits")
    setLoading(true)
    try {
      await axios.post('https://ieee-hsb-backend.vercel.app/api/auth/reset-password', {
        email: values.email,
        otp,
        password: values.password,
        confirmPassword: values.rePassword,
      })
      toast.success("Password reset successfully!")
      router.push("/login")
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-ieee-blue-5 dark:bg-[#0B1220] px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md"
      >
        <div className="dark:bg-ieee-blue-80 p-8 rounded-2xl shadow-2xl border border-ieee-blue-20 dark:border-ieee-blue-80">

          <h1 className="text-2xl font-bold text-center text-ieee-blue-100 dark:text-ieee-blue-20 mb-2">
            Reset your password
          </h1>
          <p className="text-center text-muted-foreground text-sm mb-8">
            Enter your email, OTP, and new password
          </p>

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {({ values, isSubmitting }) => {
              const strength = getPasswordStrength(values.password)
              const isButtonDisabled = isSubmitting || loading || otp.length < 6 || !values.email || !values.password || !values.rePassword
              return (
                <Form className="space-y-6">

                  {/* Email */}
                  <div>
                    <Field
                      type="email"
                      name="email"
                      placeholder="Email"
                      as={Input}
                      className="w-full bg-ieee-blue-100! text-white placeholder-white! py-4 px-3"
                    />
                    <ErrorMessage name="email" component="div" className="p-2 text-red-600 bg-red-100 rounded-md text-sm mt-2"/>
                  </div>

                  {/* OTP */}
                  <div className="flex flex-col items-center mb-4">
                    <p className='text-ieee-blue-100 dark:text-ieee-blue-20 mb-2 font-medium'>Enter Code Sent to your email</p>
                    <InputOTP
                      maxLength={6}
                      value={otp}
                      onChange={(value) => setOtp(value)}
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
                  </div>
                  {/* Password */}
                  <div className="relative">
                    <Lock className="absolute left-2 top-2 h-5 w-5 text-muted-foreground" />

                    <Field
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="New password"
                      as={Input}
                      className="pl-10 pr-10 bg-ieee-blue-100! text-white placeholder-white!"
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3 text-muted-foreground"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>

                    <ErrorMessage
                      name="password"
                      component="div"
                      className="p-2 text-red-600 bg-red-100 rounded-md text-sm mt-2"
                    />
                  </div>

                  {/* Strength bar */}
                  {values.password && (
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm">Password strength</span>
                        <span className="text-sm font-semibold">
                          {getStrengthText(strength)}
                        </span>
                      </div>

                      <div className="w-full bg-gray-300 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full transition-all duration-300 ${getStrengthColor(strength)}`}
                          style={{ width: `${(strength / 5) * 100}%` }}
                        />
                      </div>
                    </div>
                  )}

                  {/* Confirm Password */}
                  <div className="relative">
                    <Lock className="absolute left-2 top-2 h-5 w-5 text-muted-foreground" />

                    <Field
                      type={showRePassword ? "text" : "password"}
                      name="rePassword"
                      placeholder="Confirm password"
                      as={Input}
                      className="pl-10 pr-10 bg-ieee-blue-100! text-white placeholder-white!"
                    />

                    <button
                      type="button"
                      onClick={() => setShowRePassword(!showRePassword)}
                      className="absolute right-3 top-3 text-muted-foreground"
                    >
                      {showRePassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>

                    <ErrorMessage
                      name="rePassword"
                      component="div"
                      className="p-2 text-red-600 bg-red-100 rounded-md text-sm mt-2"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-ieee-blue-100 hover:bg-ieee-blue-80 text-white py-4 rounded-xl"
                    disabled={isButtonDisabled}
                  >
                    {loading || isSubmitting ? "Updating..." : "Reset Password"}
                  </Button>

                </Form>
              )
            }}
          </Formik>

        </div>
      </motion.div>
    </div>
  )
}