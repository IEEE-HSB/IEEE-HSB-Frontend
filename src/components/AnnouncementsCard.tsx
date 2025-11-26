
"use client";

import React from "react";
import { motion } from "framer-motion";
import type { Announcement } from "@/types/announcement";

interface Props {
  a: Announcement;
}

const AnnouncementsCard: React.FC<Props> = ({ a }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.04 }}
      transition={{
        duration: 0.3,
        type: "spring",
        stiffness: 150,
        damping: 20,
      }}
      className="bg-white dark:bg-gray-800 border rounded-lg shadow-sm hover:shadow-lg flex flex-col p-5 min-h-[180px] transition-transform"
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-3">
          <div>
            <h3 className="text-gray-800 dark:text-gray-100 font-semibold text-lg">
              {a.title}
            </h3>

            <p className="text-xs text-gray-400 mt-1">
              {new Date(a.createdAt).toLocaleDateString("en-US", {
                month: "short",
                day: "2-digit",
                year: "numeric",
              })}
            </p>
          </div>
        </div>

        <div className="text-xs text-[var(--ieee-blue-100)] font-medium px-2 py-1 rounded"></div>
      </div>

      <p className="text-gray-700 dark:text-gray-200 flex-1 mb-2">
        {a.description}
      </p>

      <div className="mt-1 flex items-center justify-between">
        {a.link ? (
          <a
            href={a.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[var(--ieee-blue-100)]  dark:text-blue-400  hover:underline"
          >
            Visit Link
          </a>
        ) : (
          <span />
        )}
      </div>
    </motion.div>
  );
};

export default AnnouncementsCard;
