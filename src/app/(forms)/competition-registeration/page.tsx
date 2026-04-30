"use client";

import { motion } from "framer-motion";
import { Mail, Phone, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "react-hot-toast";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import IeeeLogo from "@/assets/logos/ieeeLogo";
import { useThemeContext } from "@/context/ThemeContext";
import axios from "axios";

export default function RegisterCompetition() {
    const { isDark } = useThemeContext();


    const initialValues = {
        name: "",
        email: "",
        phone: "",
        competitionId: "",
        paymentMethod: "card",
        promoCode: "",
        bundle: false,
        groupData: {
            member1: { name: "", email: "", phone: "", competitionId: "" },
            member2: { name: "", email: "", phone: "", competitionId: "" },
            member3: { name: "", email: "", phone: "", competitionId: "" },
            member4: { name: "", email: "", phone: "", competitionId: "" },
        }
    };

    const validationSchema = Yup.object({
        name: Yup.string()
            .min(6, "Name must be at least 6 characters")
            .required("Name is required"),
        email: Yup.string()
            .email("Please use a valid email")
            .required("Email is required"),
        phone: Yup.string()
            .matches(/^\d{11}$/, "Please use a valid phone number")
            .required("Phone is required"),

        competitionId: Yup.string().required("Please select the competition name"),
        paymentMethod: Yup.string()
            .oneOf(["card", "wallet"], "Choose a payment method")
            .required(),
        promoCode: Yup.string().optional(),
        bundle: Yup.string().oneOf(["true", "false"], "Invalid bundle value").required(),
        groupData: Yup.object().when("bundle", {
            is: "true",
            then: (schema) => schema.shape({
                member1: Yup.object({
                    name: Yup.string().min(6, "Name must be at least 6 characters").required("Name is required"),
                    email: Yup.string().email("Please use a valid email").required("Email is required"),
                    phone: Yup.string()
                        .matches(/^\d{11}$/, "Please use a valid phone number")
                        .required("Phone is required"),
                    competitionId: Yup.string().required("Please select the competition name"),
                }),
                member2: Yup.object({
                    name: Yup.string().min(6, "Name must be at least 6 characters").required("Name is required"),
                    email: Yup.string().email("Please use a valid email").required("Email is required"),
                    phone: Yup.string()
                        .matches(/^\d{11}$/, "Please use a valid phone number")
                        .required("Phone is required"),
                    competitionId: Yup.string().required("Please select the competition name"),
                }),
                member3: Yup.object({
                    name: Yup.string().min(6, "Name must be at least 6 characters").required("Name is required"),
                    email: Yup.string().email("Please use a valid email").required("Email is required"),
                    phone: Yup.string()
                        .matches(/^\d{11}$/, "Please use a valid phone number")
                        .required("Phone is required"),
                    competitionId: Yup.string().required("Please select the competition name"),
                }),
                member4: Yup.object({
                    name: Yup.string().min(6, "Name must be at least 6 characters").required("Name is required"),
                    email: Yup.string().email("Please use a valid email").required("Email is required"),
                    phone: Yup.string()
                        .matches(/^\d{11}$/, "Please use a valid phone number")
                        .required("Phone is required"),
                    competitionId: Yup.string().required("Please select the competition name"),
                }),
            })
        })
    })
    const handleRegister = async (values: typeof initialValues) => {
        try {
            console.log(values)
            const res = await axios.post(
                "https://competitions.ieeehsb.com/api/users/register",
                values
            );
            toast.success("Registration successful! Redirecting to payment...");
            window.location.href = res.data.paymentUrl;

        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                toast.error(error?.response?.data?.message || "Registration failed. Please try again.");
            } else {
                toast.error("Registration failed. Please try again.");
            }
        }
    };

    const onSubmit = async (values: typeof initialValues) => {
        await handleRegister(values);
    };


    return (
        <div className="flex dark:bg-ieee-blue-100 items-center justify-center px-4 translate-middle-y transform min-h-screen mt-5" >
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
                        <h1 className="mb-2 text-xl font-semibold">Are You Ready For The Competition?</h1>
                        <p className="text-muted-foreground text-sm">
                            Register now to get yout ticket
                        </p>
                    </div>

                    {/* Form */}
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={onSubmit}
                    >
                        {({ values, setFieldValue, isSubmitting, isValid, dirty }) => (
                            <Form className="md:grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Name */}
                                <div className="relative">
                                    <User className="relative left-2 top-9 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                    <Field
                                        type="text"
                                        name="name"
                                        placeholder="Your name"
                                        value={values.name}
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
                                        value={values.email}
                                        as={Input}
                                        className="pl-10 bg-ieee-blue-100! text-white"
                                    />
                                    <ErrorMessage
                                        name="email"
                                        component="div"
                                        className="p-2 text-red-600 w-full bg-red-100 rounded-md text-sm mt-1 inline-block"
                                    />
                                </div>

                                {/* phone */}
                                <div className="relative">
                                    <Phone className="relative left-2 top-10 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                    <Field
                                        type="phone"
                                        name="phone"
                                        value={values.phone}
                                        placeholder="Phone (01XXXXXXXXX)"
                                        as={Input}
                                        className="pl-10 bg-ieee-blue-100! text-white
                    placeholder-white!"
                                    />
                                    <ErrorMessage
                                        name="phone"
                                        component="div"
                                        className="p-2 text-red-600 w-full bg-red-100 rounded-md text-sm mt-1 inline-block"
                                    />
                                </div>



                                <div>
                                    <label className="block mb-2 text-sm font-medium">Competition Name</label>
                                    <Field
                                        as="select"
                                        required
                                        name="competitionId"
                                        className="w-full border border-border rounded-md p-2 bg-ieee-blue-100 text-white"
                                    >
                                        <option value="">Select a competition</option>
                                        <option value="comp1">Texight 9.0 - Power</option>
                                        <option value="comp2">Auxillio 9.0 - Robotics</option>
                                        <option value="comp3">Modifier 10.0 - Communication</option>
                                        <option value="comp4">Elevera 1.0 - Graphic Design</option>

                                    </Field>
                                    <ErrorMessage
                                        name="competitionId"
                                        component="div"
                                        className="p-2 text-red-600 w-full bg-red-100 rounded-md text-sm mt-1 inline-block"
                                    />
                                </div>
                                {/* Bundle Select */}
                                <div>
                                    <label className="block mb-2 text-sm font-medium">Bundle Registration</label>
                                    <Field
                                        as="select"
                                        name="bundle"
                                        className="w-full border border-border rounded-md p-2 bg-ieee-blue-100 text-white"
                                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                                            setFieldValue("bundle", e.target.value === "true")
                                        }
                                    >
                                        <option value={"true"}>Yes, I want to register for the bundle offer</option>
                                        <option value={"false"}>No, I want to register individually</option>
                                    </Field>
                                </div>


                                {/* prome code */}
                                {values.bundle === false &&
                                    <div>
                                        <label className="block mb-2 text-sm font-medium">Promo Code (Optional)</label>
                                        <Field
                                            type="text"
                                            name="promoCode"
                                            placeholder="Enter promo code"
                                            value={values.promoCode}
                                            as={Input}
                                            className="pl-10 bg-ieee-blue-100! text-white
                    placeholder-white!"
                                        />
                                    </div>}

                                {/* Group Data */}
                                {values.bundle === true && (
                                    <>
                                        <div className="col-span-2">
                                            <h3 className="text-lg font-semibold mb-4">Group Members Information</h3>
                                            <p className="text-muted-foreground text-sm mb-4">
                                                Please provide information for each group member.
                                            </p>
                                        </div>

                                        <div className="col-span-2 grid md:grid-cols-2 gap-6">
                                            {["member1", "member2", "member3", "member4"].map((member, index) => (
                                                <div key={index} className="border border-border rounded-md p-4">
                                                    <label className="block mb-2 text-sm font-medium">
                                                        {member.charAt(0).toUpperCase() + member.slice(1)} Information
                                                    </label>
                                                    <Field
                                                        type="text"
                                                        name={`groupData.${member}.name`}
                                                        placeholder={`Enter ${member} name`}
                                                        as={Input}
                                                        className="pl-10 bg-ieee-blue-100! text-white
                    placeholder-white!"
                                                    />
                                                    <ErrorMessage
                                                        name={`groupData.${member}.name`}
                                                        component="div"
                                                        className="p-2 text-red-600 w-full bg-red-100 rounded-md text-sm mt-1 inline-block"
                                                    />
                                                    <Field
                                                        type="email"
                                                        name={`groupData.${member}.email`}
                                                        placeholder={`Enter ${member} email`}
                                                        as={Input}
                                                        className="pl-10 bg-ieee-blue-100! text-white
                    placeholder-white!"
                                                    />
                                                    <ErrorMessage
                                                        name={`groupData.${member}.email`}
                                                        component="div"
                                                        className="p-2 text-red-600 w-full bg-red-100 rounded-md text-sm mt-1 inline-block"
                                                    />
                                                    <Field
                                                        type="text"
                                                        name={`groupData.${member}.phone`}
                                                        placeholder={`Enter ${member} phone`}
                                                        as={Input}
                                                        className="pl-10 bg-ieee-blue-100! text-white
                    placeholder-white!"
                                                    />
                                                    <ErrorMessage
                                                        name={`groupData.${member}.phone`}
                                                        component="div"
                                                        className="p-2 text-red-600 w-full bg-red-100 rounded-md text-sm mt-1 inline-block"
                                                    />
                                                    <Field
                                                        as="select"
                                                        required
                                                        name={`groupData.${member}.competitionId`}
                                                        placeholder={`Select ${member} Competition`}
                                                        className="pl-10 bg-ieee-blue-100! w-full text-white placeholder-white!"


                                                    >
                                                        <option value="">Select a competition</option>
                                                        <option value="comp1">Texight 9.0 - Power</option>
                                                        <option value="comp2">Auxillio 9.0 - Robotics</option>
                                                        <option value="comp3">Modifier 10.0 - Communication</option>
                                                        <option value="comp4">Elevera 1.0 - Graphic Design</option>

                                                    </Field>
                                                    <ErrorMessage
                                                        name={`groupData.${member}.competitionId`}
                                                        component="div"
                                                        className="p-2 text-red-600 w-full bg-red-100 rounded-md text-sm mt-1 inline-block"
                                                    />

                                                </div>
                                            ))}

                                        </div>
                                    </>
                                )}
                                <div>
                                    <label>Payment Method</label>
                                    <Field as="select"
                                        className="w-full border border-border rounded-md p-2 bg-ieee-blue-100 text-white"
                                        name="paymentMethod">
                                        <option value="card">Card</option>
                                        {/* <option value="card">Card</option> */}
                                        {/* <option value="wallet">Wallet</option> */}

                                    </Field>
                                    <ErrorMessage name="paymentMethod" component="div" />
                                </div>

                                {/* Submit */}
                                <Button
                                    type="submit"
                                    className={`w-full col-span-2 bg-ieee-blue-100 hover:bg-ieee-blue-100/80 relative overflow-hidden group ${isSubmitting ? 'cursor-progress' : 'cursor-pointer'}`}
                                    disabled={isSubmitting || !isValid || !dirty}
                                >
                                    <span className="relative z-10 text-white">Pay</span>

                                </Button>
                            </Form>
                        )}
                    </Formik>


                </div>




            </motion.div>
        </div >
    );
}


