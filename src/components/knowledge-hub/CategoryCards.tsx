'use client';

import { motion } from 'framer-motion';
import { BookOpen, Map, FileText } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const categories = [
  {
    id: 'articles',
    title: 'Articles',
    description: 'Explore tutorials, tech news, and best practices',
    icon: BookOpen,
    href: '/knowledge-hub/articles',
    color: 'from-ieee-blue-100 to-ieee-blue-80',
  },
  {
    id: 'roadmaps',
    title: 'Roadmaps & Careers',
    description: 'Follow structured learning paths and career guides',
    icon: Map,
    href: '/knowledge-hub/roadmaps',
    color: 'from-ieee-aqua-100 to-ieee-cyan-100',
  },
  {
    id: 'research',
    title: 'Research & References',
    description: 'Access research papers and academic resources',
    icon: FileText,
    href: '/knowledge-hub/research',
    color: 'from-ieee-purple-100 to-ieee-purple-80',
  },
];

export default function CategoryCards() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (pathname === '/knowledge-hub' && href === '/knowledge-hub/articles') return false;
    return pathname.startsWith(href);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {categories.map((category, index) => {
        const Icon = category.icon;
        const active = isActive(category.href);
        
        return (
          <Link key={category.id} href={category.href}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className={`relative p-8 rounded-lg bg-gradient-to-br ${category.color} text-white cursor-pointer shadow-lg overflow-hidden group ${
                active ? 'ring-4 ring-white ring-offset-2' : ''
              }`}
            >
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(255,255,255,0.3),transparent)]" />
              </div>

              {/* Content */}
              <div className="relative z-10">
                <div className="w-16 h-16 mb-4 flex items-center justify-center bg-white/20 rounded-lg group-hover:bg-white/30 transition-colors">
                  <Icon className="w-8 h-8" />
                </div>

                <h3 className="text-2xl font-bold mb-2">{category.title}</h3>
                <p className="text-white/90">{category.description}</p>
              </div>

              {/* Hover Effect */}
              <div className="absolute bottom-0 right-0 w-32 h-32 bg-white/10 rounded-full translate-x-16 translate-y-16 group-hover:scale-150 transition-transform duration-500" />
            </motion.div>
          </Link>
        );
      })}
    </div>
  );
}
