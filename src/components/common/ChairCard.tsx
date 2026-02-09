import { EqualApproximatelyIcon, Facebook, Github, Instagram, Linkedin, Mail, MessageSquare, MessageSquareX, Phone } from 'lucide-react';
import React from 'react'
import toast from 'react-hot-toast';


interface Chairperson {
    id: number;
    name: string;
    title: string;
    image: string;
    contactInfo: {
        linkedIn?: string;
        github?: string;
        email?: string;
        phone?: string;
        instagram?: string;
        facebook?: string;
    }
}
const ChairCard = (props: { chairperson: Chairperson }) => {
    const { chairperson } = props;
    const { image, name, title } = chairperson;
    const { linkedIn, github, email, phone, instagram, facebook } = chairperson.contactInfo;
    const copyPhone = async () => {
  if (!phone) return

  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(phone)
    } else {
      // Fallback for mobile / older browsers
      const textArea = document.createElement('textarea')
      textArea.value = phone
      textArea.style.position = 'fixed'
      textArea.style.left = '-9999px'
      document.body.appendChild(textArea)
      textArea.focus()
      textArea.select()
      document.execCommand('copy')
      document.body.removeChild(textArea)
    }

    toast.success('Phone number copied to clipboard!')
  } catch (err) {
    toast.error('Failed to copy phone number')
  }
}



    return (

        <div className="relative bg-ieee-blue-100/10 dark:bg-card max-w-xs w-full border border-ieee-blue-100 rounded-2xl shadow-xs px-4">

            <div className="flex flex-col items-center relative mt-10 ">
                <img className="w-24 h-24 border-ieee-blue-100 border-2 mb-6 rounded-full bg-ieee-blue-100" src={image} alt={name} />
                <h5 className="mb-0.5 text-xl font-semibold tracking-tight text-ieee-blue-100 dark:text-white">{name}</h5>
                <span className="text-sm text-ieee-black-80 dark:text-ieee-black-20">{title}</span>

            </div>
            <div className="w-full bg-white dark:bg-ieee-black-40 p-2 my-4 rounded shadow-lg">
                <div className="flex py-3 justify-center gap-3">
                    {linkedIn && (
                        <a href={linkedIn} target="_blank" rel="noopener noreferrer" title='linkedin' className="text-ieee-blue-100">
                            <Linkedin />
                        </a>)}
                    {email && (
                        <a href={`mailto:${email}`} target="_blank" rel="noopener noreferrer" title='email' className="text-ieee-blue-100">
                            <Mail />
                        </a>)}
                    {phone && (
                        <button
                            onClick={copyPhone}
                            title='copy phone number' className="text-ieee-blue-100 cursor-pointer">
                            <Phone />
                        </button>)}
                    {instagram && (
                        <a href={instagram} target="_blank" rel="noopener noreferrer" title='instagram' className="text-ieee-blue-100">
                            <Instagram />
                        </a>)}
                    {facebook && (
                        <a href={facebook} target="_blank" rel="noopener noreferrer" title='facebook' className="text-ieee-blue-100">
                            <Facebook />
                        </a>)}
                    {github && (
                        <a href={github} target="_blank" rel="noopener noreferrer" title='github' className="text-ieee-blue-100">
                            <Github />
                        </a>)}
                </div>
            </div>
        </div>

    )
}

export default ChairCard