"use client";

import { Podcast } from '@/types/podcast';
import { motion } from 'framer-motion';
import { User } from 'lucide-react';
import { useState } from 'react';
import ProjectDescriptionModal from './ProjectDescriptionModal';

interface PodcastCardProps {
    podcast: Podcast;
    index: number;
}

const chapterColors: Record<string, { bg: string; text: string }> = {
    WIE: { bg: 'bg-ieee-purple-100', text: 'text-white' },
    CS: { bg: 'bg-ieee-yellow-100', text: 'text-white' },
    PES: { bg: 'bg-ieee-green-100', text: 'text-white' },
    RAS: { bg: 'bg-ieee-red-100', text: 'text-white' },
    COMSOC: { bg: 'bg-ieee-orange-100', text: 'text-white' },
};

export default function PodcastCard({ podcast, index }: PodcastCardProps) {
    const colors = chapterColors[podcast.chapterId] || { bg: 'bg-ieee-blue-100', text: 'text-white' };
    const [isDescriptionModalOpen, setIsDescriptionModalOpen] = useState(false);


    function openDescriptionModal() {
        setIsDescriptionModalOpen(true);
    }

    function closeDescriptionModal() {
        setIsDescriptionModalOpen(false);
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group bg-card border border-border rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
        >
            {/* podcast */}
            <div className="relative w-full h-48 overflow-hidden bg-muted cursor-pointer"
            >
                <video
                    src={podcast.episode ? podcast.episode : "/assets/podcasts/stress.mp4"}
                    controls
                    className="object-cover"
                />
                {/* Chapter Badge on Image */}
                <div
                    className="absolute top-3 right-3">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${colors.bg} ${colors.text} shadow-lg`}>
                        {podcast.chapterId}
                    </span>
                </div>
            </div>


            {/* Content */}
            <div className="p-6 bg-white dark:bg-gray-900">
                {/* Title */}
                <h3 className="text-xl font-bold text-foreground mb-2 line-clamp-2 group-hover:text-ieee-aqua-100 transition-colors">
                    {podcast.title}
                </h3>

                {/* Description */}
                <div className="mb-4">
                    <p className="text-muted-foreground text-sm  line-clamp-3">
                        {podcast.description}
                    </p>
                    <p onClick={openDescriptionModal}
                        className="text-blue-600 cursor-pointer">Read More</p>
                    {isDescriptionModalOpen && (
                        <ProjectDescriptionModal description={podcast.description!} onClose={closeDescriptionModal} />
                    )}
                </div>

                {/* Meta Information */}
                <div className="flex flex-col gap-2 mb-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                        <User className="w-4 h-4" />
                        <span>{podcast.by}</span>
                    </div>

                </div>


            </div>
        </motion.div>
    );
}
