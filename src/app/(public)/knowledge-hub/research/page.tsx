'use client';

import { motion } from 'framer-motion';
import { FileText, BookMarked, GraduationCap } from 'lucide-react';

export default function ResearchPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <div className="max-w-2xl mx-auto">
          <div className="w-20 h-20 mx-auto mb-6 flex items-center justify-center bg-ieee-purple-100/10 rounded-full">
            <FileText className="w-10 h-10 text-ieee-purple-100" />
          </div>

          <h1 className="text-4xl font-bold mb-4 text-foreground">
            Research & References
          </h1>
          <p className="text-lg text-muted-foreground mb-8">
            This section is under construction. Soon you'll be able to access research papers, academic resources, and references from our volunteers.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <div className="p-6 bg-card border border-border rounded-lg">
              <BookMarked className="w-8 h-8 text-ieee-purple-100 mb-3 mx-auto" />
              <h3 className="font-bold mb-2">Research Papers</h3>
              <p className="text-sm text-muted-foreground">
                Access curated research papers from various IEEE domains
              </p>
            </div>

            <div className="p-6 bg-card border border-border rounded-lg">
              <GraduationCap className="w-8 h-8 text-ieee-purple-100 mb-3 mx-auto" />
              <h3 className="font-bold mb-2">Academic Resources</h3>
              <p className="text-sm text-muted-foreground">
                Find textbooks, lectures, and educational materials
              </p>
            </div>

            <div className="p-6 bg-card border border-border rounded-lg">
              <FileText className="w-8 h-8 text-ieee-purple-100 mb-3 mx-auto" />
              <h3 className="font-bold mb-2">References</h3>
              <p className="text-sm text-muted-foreground">
                Quick reference guides and documentation
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
