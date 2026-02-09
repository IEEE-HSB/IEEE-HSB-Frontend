'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, CheckCircle2, ExternalLink } from 'lucide-react';
import { RoadmapLevel as RoadmapLevelType } from '@/types/knowledge-hub';

interface RoadmapLevelProps {
  level: string;
  color: 'green' | 'yellow' | 'red';
  data: RoadmapLevelType;
  defaultOpen?: boolean;
}

const colorClasses = {
  green: {
    bg: 'bg-ieee-green-100',
    border: 'border-ieee-green-100',
    text: 'text-ieee-green-100',
    bgLight: 'bg-ieee-green-100/10',
  },
  yellow: {
    bg: 'bg-ieee-yellow-100',
    border: 'border-ieee-yellow-100',
    text: 'text-ieee-yellow-100',
    bgLight: 'bg-ieee-yellow-100/10',
  },
  red: {
    bg: 'bg-ieee-red-100',
    border: 'border-ieee-red-100',
    text: 'text-ieee-red-100',
    bgLight: 'bg-ieee-red-100/10',
  },
};

export default function RoadmapLevel({ level, color, data, defaultOpen = false }: RoadmapLevelProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const [checkedTopics, setCheckedTopics] = useState<Set<string>>(new Set());
  const colors = colorClasses[color];

  const toggleTopic = (topic: string) => {
    const newChecked = new Set(checkedTopics);
    if (newChecked.has(topic)) {
      newChecked.delete(topic);
    } else {
      newChecked.add(topic);
    }
    setCheckedTopics(newChecked);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`border-2 ${colors.border} rounded-lg overflow-hidden`}
    >
      {/* Header */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center justify-between p-6 ${colors.bg} text-white hover:opacity-90 transition-opacity`}
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center font-bold text-lg">
            {level.charAt(0)}
          </div>
          <div className="text-left">
            <h3 className="text-2xl font-bold">{level}</h3>
            <p className="text-sm text-white/80">
              {data.topics.length} topics
            </p>
          </div>
        </div>
        <ChevronDown
          className={`w-6 h-6 transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {/* Content */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className={`p-6 ${colors.bgLight}`}>
              {/* Description */}
              {data.description && (
                <p className="text-muted-foreground mb-6">{data.description}</p>
              )}

              {/* Topics */}
              <div className="mb-6">
                <h4 className="text-lg font-bold mb-3 text-foreground">Topics to Learn</h4>
                <div className="space-y-4">
                  {data.topics.map((topic, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="p-4 bg-background rounded-lg hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start gap-3 mb-2">
                        <CheckCircle2
                          className={`w-5 h-5 mt-0.5 flex-shrink-0 cursor-pointer transition-colors ${
                            checkedTopics.has(topic.title)
                              ? `${colors.text}`
                              : 'text-muted-foreground'
                          }`}
                          onClick={() => toggleTopic(topic.title)}
                        />
                        <div className="flex-1">
                          <h5
                            className={`font-semibold text-sm mb-1 ${
                              checkedTopics.has(topic.title)
                                ? 'text-muted-foreground line-through'
                                : 'text-foreground'
                            }`}
                          >
                            {topic.title}
                          </h5>
                          <p className="text-xs text-muted-foreground mb-2">
                            {topic.description}
                          </p>
                          <p className="text-xs text-ieee-blue-100 font-medium">
                            ⏱️ {topic.estimatedTime}
                          </p>
                        </div>
                      </div>

                      {/* Resources for this topic */}
                      {topic.resources && topic.resources.length > 0 && (
                        <div className="ml-8 mt-3 space-y-2">
                          {topic.resources.map((resource, rIndex) => (
                            <a
                              key={rIndex}
                              href={resource.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center justify-between text-xs p-2 bg-muted/50 rounded hover:bg-muted transition-colors group"
                            >
                              <div>
                                <p className="font-medium text-foreground group-hover:text-ieee-blue-100">
                                  {resource.title}
                                </p>
                                <p className="text-muted-foreground capitalize">
                                  {resource.type}
                                </p>
                              </div>
                              <ExternalLink className="w-3 h-3 text-muted-foreground group-hover:text-ieee-blue-100" />
                            </a>
                          ))}
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
