"use client";

import { motion } from "framer-motion";
import { Lock, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "react-hot-toast";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useRouter } from "next/navigation";
import IeeeLogo from "@/assets/logos/ieeeLogo";
import { useThemeContext } from "@/context/ThemeContext";
import axios from "axios";
import { encrypt } from "@/lib/session";
import { useContext } from "react";
import { authContextObj } from "@/context/AuthContext";


export default function Login() {
  const router = useRouter();
  const { isDark } = useThemeContext();
const { login } = useContext(authContextObj);


  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({

    email: Yup.string()
      .email("Please use a valid email")
      .required("Email is required"),
    password: Yup.string()
      .required("Password is required")
  });

  const onSubmit = async (values: typeof initialValues) => {
    await handleLogin(values);
  };
  const handleLogin = async (values: typeof initialValues) => {
    try {
      const res = await axios.post(
        "https://api.ieeehsb.com/api/auth/login",
        values
      );

      {/* encrypt token and add it in cookies */ }
      const encryptedToken = encrypt(res.data.data.accessToken);
      document.cookie = `authToken=${encryptedToken}; path=/; max-age=${60 * 60 * 24}`; console.log(document.cookie);
      login()
      toast.success(`Welcome back!`);
      router.push("/");

    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message ?? "Login failed. Please try again.");
      } else {
        toast.error("Login failed. Please try again.");
      }
    }
  };


  return (
    <div className="flex dark:bg-ieee-blue-100 items-center justify-center px-4 translate-middle-y transform min-h-screen mt-5">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="md:w-[70%] w-[90%]"
      >

        <div className="dark:bg-ieee-blue-80 p-8 rounded-lg shadow-2xl border border-border mt-15">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 mb-4">
              <IeeeLogo size={50} fillColor={isDark ? "white" : "#207DA9"} strokeColor="" className="" />

            </div>
            <h1 className="mb-2 text-xl font-semibold">Welcome Back!</h1>
            <p className="text-muted-foreground text-sm">
              Come Back To Your Family
            </p>
          </div>

          {/* Form */}
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="md:grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* Email */}
                <div className="relative">
                  <Mail className="relative left-2 top-10 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Field
                    type="email"
                    name="email"
                    placeholder="your.email@example.com"
                    as={Input}
                    className="pl-10 bg-ieee-blue-100! text-white"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="p-2 text-red-600 w-full bg-red-100 rounded-md text-sm mt-1 inline-block"
                  />
                </div>

                {/* Password */}
                <div className="relative">
                  <Lock className="relative left-2 top-10 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Field
                    type="text"
                    name="password"
                    placeholder="Enter your password"
                    as={Input}
                    className="pl-10 bg-ieee-blue-100! text-white
                    placeholder-white!"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="p-2 text-red-600 w-full bg-red-100 rounded-md text-sm mt-1 inline-block"
                  />
                </div>


                {/* Submit */}
                <Button
                  type="submit"
                  className="w-full col-span-2 bg-ieee-blue-100 hover:bg-ieee-blue-100/80 relative overflow-hidden group"
                  disabled={isSubmitting}
                >
                  <span className="relative z-10 text-white">Sign In</span>

                </Button>
              </Form>
            )}
          </Formik>

          {/* Login Link */}
          <p className="text-center mt-6 text-muted-foreground text-sm
          ">
            Don&apos;t have an account?{" "}
            <button
              onClick={() => router.push("/register")}
              className="text-ieee-blue-100 text-lg font-bold hover:underline
              "

            >
              Register
            </button>
          </p>
          <p className="text-center text-muted-foreground text-sm
          ">
            Forgot your password?{" "}
            <button
              onClick={() => router.push("/forgetpassword")}
              className="text-ieee-blue-100 text-lg font-bold hover:underline"
            >
              Reset Password
            </button>
          </p>
        </div>
      </motion.div>
    </div>
  );
}


