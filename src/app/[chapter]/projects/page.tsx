"use client";

import { useState, useEffect, use, useMemo } from 'react';
import { motion } from 'framer-motion';
import ProjectCard from '@/components/common/ProjectCard';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import { ProjectType } from '@/types/project';
import { chaptersData } from '@/data/chaptersData';
import { useThemeContext } from '@/context/ThemeContext';
import { useApiQuery } from '@/hooks/useFetch';

interface ChapterProjectsPageProps {
  params: Promise<{ chapter: string }>;

}

export default function ChapterProjectsPage({ params }: ChapterProjectsPageProps) {
  const resolvedParams = use(params);
  const chapter = resolvedParams.chapter;

  const chapterInfo = chaptersData.find(ch => ch.chapterId === chapter);
  const mainColor = chapterInfo!.color.split('-').slice(0, 2).join('-');
  const { isDark } = useThemeContext();


  const { data, isLoading, isError } = useApiQuery<ProjectType[]>(
    {
      queryKey: ["projects"],
      url: "https://ieee-hsb-backend.vercel.app/api/projects",
    }
  );
  const chapterProjects = useMemo(() => {
      if (!data) return [];
    // Filter projects by chapter
    return data?.filter(
      (p) => p.chapterId.toLowerCase() === chapter.toLowerCase()
    );
  }, [data, chapter]);




  return (
    <div className="min-h-screen relative">
      {!isDark && <div className="absolute -z-10 inset-0 bg-size-[3rem_3rem] mask-[radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_110%)]"

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
              {chapterInfo?.title || 'Projects'}
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto"
              style={{ color: `var(--${mainColor}-80)` }}
            >
              {chapterInfo?.brief || 'Explore projects from IEEE Helwan Student Branch'}
            </p>
          </motion.div>
        </div>

      </section>

      {/* Projects Content */}
      <section className="container mx-auto px-4 py-12">
        {/* Loading State */}
        {isLoading && (
          <div className="flex justify-center items-center py-20">
            <LoadingSpinner />
          </div>
        )}

        {/* Error State */}
        {isError && !isLoading && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
            <div className="text-6xl mb-4">⚠️</div>
            <h3 className="text-2xl font-semibold text-foreground mb-2">
              Oops! Something went wrong
            </h3>
            {/* <p className="text-muted-foreground">{error}</p> */}
          </motion.div>
        )}

        {/* Empty State */}
        {!isLoading && !isError && chapterProjects.length === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
            <div className="text-6xl mb-4">📂</div>
            <h3 className="text-2xl font-semibold text-foreground mb-2">
              No Projects Found
            </h3>
            <p className="text-muted-foreground">
              No projects available for {chapterInfo?.title || chapter} chapter.
            </p>
          </motion.div>
        )}

        {/* Projects Grid */}
        {!isLoading && !isError && chapterProjects.length > 0 && (
          <>
            <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {chapterProjects.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
              ))}
            </motion.div>

            {/* Projects Stats */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="mt-12 text-center text-muted-foreground">
              <p>
                Showing <span className="font-semibold text-ieee-aqua-100">{chapterProjects.length}</span> projects
              </p>
            </motion.div>
          </>
        )}
      </section>
    </div>
  );
}
