"use client";

import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import emailjs from "@emailjs/browser";
import { toast } from "react-hot-toast";
import Image from "next/image";

const validationSchema = Yup.object({
  name: Yup.string().required("Full Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  message: Yup.string().required("Message is required"),
});

export default function ContactPage() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (
    values: { name: string; email: string; message: string },
    { resetForm }: { resetForm: () => void }
  ) => {
    setLoading(true);

    const currentTime = new Date().toLocaleString();

    try {
      await emailjs.send(
        "service_p4aw6in",
        "template_l5jxpk8",
        {
          from_name: values.name,
          from_email: values.email,
          message: values.message,
          time: currentTime,
          to_email: "e.saad19083@gmail.com",
        },
        "aJlFBuJQ73WSLeALv"
      );

      toast.success("Message sent successfully!");
      resetForm();
    } catch (error) {
      toast.error("Error sending message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-12 px-5">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-ieee-blue-100 dark:text-ieee-blue-20">
          Contact IEEE Helwan SB
        </h1>
        <p className="mt-4 text-center text-gray-700 dark:text-gray-300 text-md max-w-5xl mx-auto">
          Whether you’re an IEEE member or just interested in learning more,
          here’s how to reach us.
        </p>
      </div>

      {/* main Section */}
      <div className="flex flex-col md:flex-row justify-center items-center gap-6">
        {/* image Section */}
        <div className="w-3xl  ">
          <Image
            src="/assets/images/124558-01.png"
            alt="Image Description"
            width={400}
            height={400}
            className="object-cover w-full h-full rounded-md"
          />
        </div>
        {/* form Section */}
        <div className="w-full  p-6 rounded-lg shadow-lg backdrop-blur-sm mt-6 md:mt-0">
          <Formik
            initialValues={{ name: "", email: "", message: "" }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            <Form className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-lg font-medium text-gray-800 dark:text-gray-100"
                >
                  Full Name
                </label>
                <Field
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Enter your full name"
                  className="w-full p-4 mt-2 border border-gray-300 rounded-md bg-gray-50 dark:bg-[#202125] dark:text-gray-200 text-gray-800 focus:outline-none focus:ring-2 focus:ring-ieee-blue-80"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-lg font-medium text-gray-800 dark:text-gray-100"
                >
                  Email Address
                </label>
                <Field
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter your email"
                  className="w-full p-4 mt-2 border border-gray-300 rounded-md bg-gray-50 dark:bg-[#202125] dark:text-gray-200 text-gray-800 focus:outline-none focus:ring-2 focus:ring-ieee-blue-80"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-lg font-medium text-gray-800 dark:text-gray-100"
                >
                  Message Body
                </label>
                <Field
                  as="textarea"
                  id="message"
                  name="message"
                  placeholder="Enter your message"
                  className="w-full p-4 mt-2 border border-gray-300 rounded-md bg-gray-50 dark:bg-[#202125] dark:text-gray-200 text-gray-800 focus:outline-none focus:ring-2 focus:ring-ieee-blue-80"
                />
                <ErrorMessage
                  name="message"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 mt-4 bg-ieee-blue-80 text-white rounded-md hover:bg-ieee-blue-100 disabled:bg-gray-400 transition-all duration-300 cursor-pointer"
              >
                {loading ? "Sending..." : "Submit"}
              </button>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
}
