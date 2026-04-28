import { Facebook, Github, Instagram, Linkedin, Mail, Phone, User2, Copy } from 'lucide-react';
import React from 'react';
import toast from 'react-hot-toast';

interface Chairperson {
    id: number;
    name: string;
    title: string;
    contactInfo: {
        linkedIn?: string;
        github?: string;
        email?: string;
        phone?: string;
        instagram?: string;
        facebook?: string;
    }
}

const ChairCard = ({ chairperson }: { chairperson: Chairperson }) => {
    const { name, title, contactInfo } = chairperson;
    const { linkedIn, github, email, phone, instagram, facebook } = contactInfo;

    const copyPhone = async () => {
        if (!phone) return;
        try {
            await navigator.clipboard.writeText(phone);
            toast.success('Phone copied!');
        } catch (err) {
            toast.error('Failed to copy');
        }
    };

    return (
        <div className="group relative w-full max-w-[280px] h-[320px] flex flex-col justify-between p-8 rounded-[2.5rem] bg-card border border-border/60 hover:border-ieee-blue-100 transition-all duration-500 hover:-translate-y-2 shadow-sm hover:shadow-2xl hover:shadow-ieee-blue-100/10 overflow-hidden">
            
            {/* الديكور الخلفي - يعوض غياب الصورة */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-ieee-blue-100/5 rounded-full group-hover:bg-ieee-blue-100/10 transition-colors duration-500" />
            <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-ieee-gold-100/5 rounded-full group-hover:bg-ieee-gold-100/10 transition-colors duration-500" />

            <div className="relative z-10 text-center">
                {/* Icon Placeholder instead of Image */}
                <div className="mx-auto w-20 h-20 mb-6 rounded-3xl bg-secondary flex items-center justify-center text-ieee-blue-100 group-hover:bg-ieee-blue-100 group-hover:text-white transition-all duration-500 shadow-inner">
                    <User2 size={40} strokeWidth={1.5} />
                </div>

                <h5 className="text-xl font-bold text-foreground mb-1 group-hover:text-ieee-blue-100 transition-colors line-clamp-1">
                    {name}
                </h5>
                <p className="text-[10px] font-black uppercase tracking-[0.25em] text-ieee-gold-100 mb-4">
                    {title}
                </p>
                <div className="h-0.5 w-8 bg-border group-hover:w-16 group-hover:bg-ieee-gold-100 mx-auto transition-all duration-500" />
            </div>

            {/* Social Icons Container */}
            <div className="relative z-10 grid grid-cols-3 gap-2 mt-auto pt-6">
                {linkedIn && (
                    <a href={linkedIn} target="_blank" rel="noopener noreferrer" 
                       className="flex items-center justify-center p-2.5 rounded-xl bg-secondary/50 text-muted-foreground hover:text-ieee-blue-100 hover:bg-white dark:hover:bg-ieee-black-100 transition-all shadow-sm">
                        <Linkedin size={18} />
                    </a>
                )}
                {email && (
                    <a href={`mailto:${email}`} 
                       className="flex items-center justify-center p-2.5 rounded-xl bg-secondary/50 text-muted-foreground hover:text-ieee-red-100 hover:bg-white dark:hover:bg-ieee-black-100 transition-all shadow-sm">
                        <Mail size={18} />
                    </a>
                )}
                {phone && (
                    <button onClick={copyPhone} 
                       className="flex items-center justify-center p-2.5 rounded-xl bg-secondary/50 text-muted-foreground hover:text-ieee-green-100 hover:bg-white dark:hover:bg-ieee-black-100 transition-all shadow-sm cursor-pointer">
                        <Phone size={18} />
                    </button>
                )}
                {github && (
                    <a href={github} target="_blank" rel="noopener noreferrer" 
                       className="flex items-center justify-center p-2.5 rounded-xl bg-secondary/50 text-muted-foreground hover:text-foreground hover:bg-white dark:hover:bg-ieee-black-100 transition-all shadow-sm">
                        <Github size={18} />
                    </a>
                )}
                {facebook && (
                    <a href={facebook} target="_blank" rel="noopener noreferrer" 
                       className="flex items-center justify-center p-2.5 rounded-xl bg-secondary/50 text-muted-foreground hover:text-ieee-blue-80 hover:bg-white dark:hover:bg-ieee-black-100 transition-all shadow-sm">
                        <Facebook size={18} />
                    </a>
                )}
                {instagram && (
                    <a href={instagram} target="_blank" rel="noopener noreferrer" 
                       className="flex items-center justify-center p-2.5 rounded-xl bg-secondary/50 text-muted-foreground hover:text-pink-600 hover:bg-white dark:hover:bg-ieee-black-100 transition-all shadow-sm">
                        <Instagram size={18} />
                    </a>
                )}
            </div>
        </div>
    );
};

export default ChairCard;