"use client";

import { motion } from "framer-motion";
import { Lock, Mail, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "react-hot-toast";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useRouter } from "next/navigation";
import IeeeLogo from "@/assets/logos/ieeeLogo";
import { useThemeContext } from "@/context/ThemeContext";

export default function Register() {
  const router = useRouter();
  const { isDark } = useThemeContext();

  // Chapters & Committees
  const chapters = {
    cs: ["web", "cyber security", "mobile"],
    ras: ["ai", "digital", "analog"],
    pes: ["electronics", "mechanic"],
    comsoc: ["pr", "fr", "hr"],
    wie: ["softskills"],
  };

  // Roles
  const roles = ["Participant", "Volunteer", "Director", "Guest"];

  const initialValues = {
    name: "",
    email: "",
    password: "",
    rePassword: "",
    role: "",
    chapterId: "",
    committeeId: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(3, "Name must be at least 3 characters")
      .required("Name is required"),
    email: Yup.string()
      .email("Please use a valid email")
      .required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter (A–Z)")
      .matches(/[a-z]/, "Password must contain at least one lowercase letter (a–z)")
      .matches(/[0-9]/, "Password must contain at least one number (0–9)")
      .matches(/[!@#$%^&*(),.?\":{}|<>]/, "Password must contain at least one special character (e.g., !@#$%^&*)")
      .matches(/^\S*$/, "Password should not contain spaces")
      .test(
        "not-same-as-email-or-username",
        "Password should not be the same as your email or username",
        function (value) {
          const { email, name } = this.parent;
          if (!value) return false;
          return value !== email && value !== name;
        }
      ),
    rePassword: Yup.string()
      .oneOf([Yup.ref("password"), undefined], "Passwords must match")
      .required("Please confirm your password"),
    role: Yup.string().required("Please select your role"),
    chapterId: Yup.string().required("Please select your chapter"),
    committeeId: Yup.string().required("Please select your committee"),
  });

  const onSubmit = async (values: typeof initialValues) => {
    toast.success("Account created successfully!");
    console.log("Form Data:", values);
    router.push("/");
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
              <IeeeLogo size={50} fillColor={isDark ? 'white' : '#207DA9'} strokeColor='' className="" />

            </div>
            <h1 className="mb-2 text-xl font-semibold">Join IEEE HSB</h1>
            <p className="text-muted-foreground text-sm">
              Create your account and start your journey
            </p>
          </div>

          {/* Form */}
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {({ values, setFieldValue, isSubmitting }) => (
              <Form className="md:grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name */}
                <div className="relative">
                  <User className="relative left-2 top-9 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Field
                    type="text"
                    name="name"
                    placeholder="Your name"
                    as={Input}
                    className="pl-10 bg-ieee-blue-100! text-white
                    placeholder-white!"
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="p-2 text-red-600 w-full bg-red-100 rounded-md text-sm mt-1 inline-block"
                  />
                </div>

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
                    type="password"
                    name="password"
                    placeholder="••••••••"
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

                {/* Confirm Password */}
                <div className="relative">
                  <Lock className="relative left-2 top-10 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Field
                    type="password"
                    name="rePassword"
                    placeholder="Confirm password"
                    as={Input}
                    className="pl-10                    bg-ieee-blue-100! text-white
                    placeholder-white!"
                  />
                  <ErrorMessage
                    name="rePassword"
                    component="div"
                    className="p-2 text-red-600 w-full bg-red-100 rounded-md text-sm mt-1 inline-block"
                  />
                </div>

                {/* Role Select */}
                <div>
                  <label className="block mb-2 text-sm font-medium">Role</label>
                  <Field
                    as="select"
                    name="role"
                    className="w-full border border-border rounded-md p-2 bg-ieee-blue-100 text-white"
                  >
                    <option value="">Select a role</option>
                    {roles.map((role) => (
                      <option key={role} value={role}>
                        {role}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage
                    name="role"
                    component="div"
                    className="p-2 text-red-600 w-full bg-red-100 rounded-md text-sm mt-1 inline-block"
                  />
                </div>

                {/* Chapter Select */}
                <div>
                  <label className="block mb-2 text-sm font-medium">Chapter</label>
                  <Field
                    as="select"
                    name="chapterId"
                    className="w-full border border-border rounded-md p-2 bg-ieee-blue-100 text-white"
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                      const selectedChapter = e.target.value;
                      setFieldValue("chapterId", selectedChapter);
                      setFieldValue("committeeId", "");
                    }}
                  >
                    <option value="">Select a chapter</option>
                    {Object.keys(chapters).map((chapter) => (
                      <option key={chapter} value={chapter}>
                        {chapter.toUpperCase()}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage
                    name="chapterId"
                    component="div"
                    className="p-2 text-red-600 w-full bg-red-100 rounded-md text-sm mt-1 inline-block"
                  />
                </div>

                {/* Committee Select */}
                <div className="col-span-2">
                  <label className="block mb-2 text-sm font-medium">Committee</label>
                  <Field
                    as="select"
                    name="committeeId"
                    className="w-full border border-border rounded-md p-2 bg-ieee-blue-100 text-white"
                    disabled={!values.chapterId}
                  >
                    <option value="">
                      {values.chapterId
                        ? "Select a committee"
                        : "Select a chapter first"}
                    </option>
                    {values.chapterId &&
                      chapters[values.chapterId as keyof typeof chapters].map(
                        (committee) => (
                          <option key={committee} value={committee}>
                            {committee}
                          </option>
                        )
                      )}
                  </Field>
                  <ErrorMessage
                    name="committeeId"
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
                  <span className="relative z-10 text-white">Create Account</span>
                 
                </Button>
              </Form>
            )}
          </Formik>

          {/* Login Link */}
          <p className="text-center mt-6 text-muted-foreground text-sm
          ">
            Already have an account?{" "}
            <button
              onClick={() => router.push("/login")}
              className="text-ieee-blue-100 text-lg font-bold hover:underline
              "
              
            >
              Sign in
            </button>
          </p>
        </div>
      </motion.div>
    </div>
  );
}


