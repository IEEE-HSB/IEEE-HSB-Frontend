'use client'

import { motion } from "framer-motion"
import { Lock, Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import toast from "react-hot-toast"
import * as Yup from "yup"
import { Formik, Form, Field, ErrorMessage } from "formik"
import { useRouter } from "next/navigation"
import { useState } from "react"
import axios from "axios"

export default function ResetPassword() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [showRePassword, setShowRePassword] = useState(false)

  const initialValues = {
    password: "",
    rePassword: "",
  }

  const validationSchema = Yup.object({
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

  // ✅ Password Strength Function
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
    try {
      // ⬇️⬇️⬇️ هنا تحطي API لما يوصل من الباك
      await axios.post("YOUR_API_HERE/reset-password", {
        password: values.password,
      })

      toast.success("Password reset successfully!")
      router.push("/login")
    } catch (error) {
      toast.error("Something went wrong")
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-ieee-blue-5 dark:bg-ieee-blue-100 px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="w-full md:w-[35%]"
      >
        <div className="dark:bg-ieee-blue-80 p-8 rounded-lg shadow-2xl border border-border">

          <h1 className="text-3xl font-semibold text-center mb-2 text-ieee-blue-100 dark:text-ieee-blue-20">
            Reset your password
          </h1>

          <p className="text-center text-muted-foreground text-sm mb-8">
            Enter a new strong password
          </p>

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {({ values, isSubmitting }) => {
              const strength = getPasswordStrength(values.password)

              return (
                <Form className="space-y-6">

                  {/* Password */}
                  <div className="relative">
                    <Lock className="absolute left-2 top-3 h-5 w-5 text-muted-foreground" />

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
                    <Lock className="absolute left-2 top-3 h-5 w-5 text-muted-foreground" />

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

                  {/* Submit */}
                  <Button
                    type="submit"
                    className="w-full bg-ieee-blue-100 hover:bg-ieee-blue-100/80 text-white"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Updating..." : "Reset Password"}
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
