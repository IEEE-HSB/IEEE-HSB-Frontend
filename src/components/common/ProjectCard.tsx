"use client";

import Image from 'next/image';
import { Project } from '@/types/project';
import { motion } from 'framer-motion';
import { ExternalLink, Calendar, User } from 'lucide-react';
import { useState } from 'react';
import ProjectsModal from '../ProjectsModal';

interface ProjectCardProps {
  project: Project;
  index: number;
}

const chapterColors: Record<string, { bg: string; text: string }> = {
  WIE: { bg: 'bg-ieee-purple-100', text: 'text-white' },
  CS: { bg: 'bg-ieee-blue-100', text: 'text-white' },
  PES: { bg: 'bg-ieee-green-100', text: 'text-white' },
  RAS: { bg: 'bg-ieee-red-100', text: 'text-white' },
  COMSOC: { bg: 'bg-ieee-orange-100', text: 'text-white' },
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const colors = chapterColors[project.chapterId] || { bg: 'bg-ieee-blue-100', text: 'text-white' };
  const [isOpen, setIsOpen] = useState(false);
  const [images, setImages] = useState<string[]>([]);

  function viewModal(subImages: string[]) {
    setImages(subImages);
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
    setImages([]);
  }
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group bg-card border border-border rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
    >
      {/* Image */}
      {project.image && (
        <div className="relative w-full h-48 overflow-hidden bg-muted">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

          {/* Chapter Badge on Image */}
          <div className="absolute top-3 right-3">
            <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${colors.bg} ${colors.text} shadow-lg`}>
              {project.chapterId}
            </span>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="p-6 bg-white dark:bg-gray-900">
        {/* Title */}
        <h3 className="text-xl font-bold text-foreground mb-2 line-clamp-2 group-hover:text-ieee-aqua-100 transition-colors">
          {project.title}
        </h3>

        {/* Description */}
        <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
          {project.description}
        </p>

        {/* Meta Information */}
        <div className="flex flex-col gap-2 mb-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4" />
            <span>{project.author}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span>{formatDate(project.createdAt)}</span>
          </div>
        </div>
        <div className="flex gap-4">
          {/* Link */}
          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-ieee-aqua-100 hover:text-ieee-aqua-80 font-medium transition-colors group/link"
            >
              View Project
              <ExternalLink className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
            </a>
          )}

          {project.subImages && project.subImages.length > 0 && (
            <button
              onClick={() => viewModal(project.subImages!)}
              className={`${colors.bg} rounded-2 text-white cursor-pointer focus:ring-4 focus:ring-brand-medium shadow-2xl rounded-md font-medium text-sm px-4 py-2.5`}
              type="button"
            >
              See More Pictures
            </button>
          )}

        </div>
          {isOpen && (
            <ProjectsModal bgColor={colors.bg} images={images} onClose={closeModal} projectName={project.title} />
          )}


        {/* No Image - Show Chapter Badge */}
        {!project.image && (
          <div className="mt-4">
            <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${colors.bg} ${colors.text}`}>
              {project.chapterId}
            </span>
          </div>
        )}
      </div>
    </motion.div>
  );
}
