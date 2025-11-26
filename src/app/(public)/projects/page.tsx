"use client";

import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import ProjectCard from '@/components/common/ProjectCard';
import FilterBar from '@/components/common/FilterBar';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import { Project, ProjectChapterFilter } from '@/types/project';
import { projectsData } from '@/utils/projectsData';

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [activeFilter, setActiveFilter] = useState<ProjectChapterFilter>('All');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch projects on mount
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // TODO: Replace with actual API call when backend is ready
        // const response = await fetch('/api/projects');
        // if (!response.ok) throw new Error('Failed to fetch projects');
        // const data = await response.json();
        
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 500));
        
        // Use static data for now
        const data = projectsData;
        
        // Sort by createdAt descending (latest first)
        const sortedData = [...data].sort(
          (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        
        setProjects(sortedData);
      } catch (err) {
        setError('Failed to load projects. Please try again later.');
        console.error('Error fetching projects:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // Filter projects based on selected chapter
  const filteredProjects = useMemo(() => {
    if (activeFilter === 'All') {
      return projects;
    }
    return projects.filter((project) => project.chapterId === activeFilter);
  }, [projects, activeFilter]);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-ieee-aqua-100 to-ieee-cyan-100 text-white py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              Projects
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
              Explore innovative projects from IEEE Helwan Student Branch across all chapters
            </p>
          </motion.div>
        </div>

        {/* Decorative Wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            viewBox="0 0 1440 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-auto"
          >
            <path
              d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V120Z"
              className="fill-background"
            />
          </svg>
        </div>
      </section>

      {/* Projects Content */}
      <section className="container mx-auto px-4 py-12">
        {/* Filter Bar */}
        <FilterBar activeFilter={activeFilter} onFilterChange={setActiveFilter} />

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <LoadingSpinner />
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="text-6xl mb-4">⚠️</div>
            <h3 className="text-2xl font-semibold text-foreground mb-2">
              Oops! Something went wrong
            </h3>
            <p className="text-muted-foreground">{error}</p>
          </motion.div>
        )}

        {/* Empty State */}
        {!loading && !error && filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="text-6xl mb-4">📂</div>
            <h3 className="text-2xl font-semibold text-foreground mb-2">
              No Projects Found
            </h3>
            <p className="text-muted-foreground">
              {activeFilter === 'All'
                ? 'No projects available at the moment.'
                : `No projects available for ${activeFilter} chapter.`}
            </p>
          </motion.div>
        )}

        {/* Projects Grid */}
        {!loading && !error && filteredProjects.length > 0 && (
          <>
            <motion.div
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredProjects.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
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
                Showing <span className="font-semibold text-ieee-aqua-100">{filteredProjects.length}</span> of{' '}
                <span className="font-semibold text-ieee-aqua-100">{projects.length}</span> projects
              </p>
            </motion.div>
          </>
        )}
      </section>
    </div>
  );
}
