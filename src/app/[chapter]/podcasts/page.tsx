"use client";

import { useState, useEffect, use } from 'react';
import { motion } from 'framer-motion';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import { Podcast } from '@/types/podcast';
import { podcastsData } from '@/utils/podcastsData';
import { chaptersData } from '@/data/chaptersData';
import { useThemeContext } from '@/context/ThemeContext';
import PodcastCard from '@/components/common/PodcastCard';

interface ChapterPodcastsPageProps {
    params: Promise<{ chapter: string }>;
}

export default function ChapterProjectsPage({ params }: ChapterPodcastsPageProps) {
    const resolvedParams = use(params);
    const chapter = resolvedParams.chapter;

    const chapterInfo = chaptersData.find(ch => ch.chapterId === chapter);
    const mainColor = chapterInfo!.color.split('-').slice(0, 2).join('-');
    const filteredPodcasts = podcastsData.filter(
        (podcast) => podcast.chapterId === chapter
    );

    const { isDark } = useThemeContext();
    const [podcasts, setPodcasts] = useState<Podcast[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
console.log("CHAPTER FROM PARAM:", chapter);
console.log("TYPE:", typeof chapter);
console.log("PODCAST IDS:", podcastsData.map(p => p.chapterId));
console.log("TYPES:", podcastsData.map(p => typeof p.chapterId));

    useEffect(() => {
        const fetchPodcasts = async () => {
            try {
                setLoading(true);
                setError(null);

                // Simulate API delay
                await new Promise((resolve) => setTimeout(resolve, 500));


            } catch (err) {
                setError('Failed to load podcasts. Please try again later.');
                console.error('Error fetching podcasts:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchPodcasts();
    }, [chapter]);

    return (
        <div className="min-h-screen relative">
            {!isDark && <div className="absolute -z-10 inset-0 bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_110%)]"

                style={{
                    backgroundImage: `
      linear-gradient(to right, var(--${mainColor}-20) 1px, transparent 1px),
      linear-gradient(to bottom, var(--${mainColor}-20), 1px, transparent 1px)
    `,
                }}
            ></div>}

            {/* Hero Section */}
            <section
                className={`relative overflow-hidden`}
                style={{ color: `var(--${mainColor}-100)` }}
            >
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center"
                    >
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold my-4">
                            {chapterInfo?.title || 'Podcasts'}
                        </h1>
                        <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto"
                            style={{ color: `var(--${mainColor}-80)` }}
                        >
                            {chapterInfo?.brief || 'Explore Podcasts from IEEE Helwan Student Branch'}
                        </p>
                    </motion.div>
                </div>

            </section>

            {/* Podcasts Content */}
            <section className="container mx-auto px-4 py-12">
                {/* Loading State */}
                {loading && (
                    <div className="flex justify-center items-center py-20">
                        <LoadingSpinner />
                    </div>
                )}

                {/* Error State */}
                {error && !loading && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
                        <div className="text-6xl mb-4">⚠️</div>
                        <h3 className="text-2xl font-semibold text-foreground mb-2">
                            Oops! Something went wrong
                        </h3>
                        <p className="text-muted-foreground">{error}</p>
                    </motion.div>
                )}

                {/* Empty State */}
                {!loading && !error && filteredPodcasts.length === 0 && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
                        <div className="text-6xl mb-4">🎙</div>
                        <h3 className="text-2xl font-semibold text-foreground mb-2">
                            No Podcasts Found
                        </h3>
                        <p className="text-muted-foreground">
                            No podcasts available for {chapterInfo?.title || chapter} chapter.
                        </p>
                    </motion.div>
                )}

                {/* Projects Grid */}
                {!loading && !error && (
                    <>
                        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredPodcasts.map((podcast, index) => (
                                <PodcastCard key={podcast.id} podcast={podcast} index={index} />
                            ))}
                        </motion.div>

                        {/* Projects Stats */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="mt-12 text-center text-muted-foreground"
                        >
                            <p>
                                Showing{" "}
                                <span className="font-semibold text-ieee-aqua-100">
                                    {filteredPodcasts.length}
                                </span>{" "}
                                podcasts
                            </p>
                        </motion.div>
                    </>
                )}

            </section>
        </div>
    );
}
