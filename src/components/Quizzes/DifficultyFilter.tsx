"use client";

import { useState } from "react";
import { Filter } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface DifficultyFilterProps {
  mainColor: string;
  difficultyFilter: "all" | "easy" | "medium" | "hard";
  setDifficultyFilter: (value: "all" | "easy" | "medium" | "hard") => void;
}

export default function DifficultyFilter({
  mainColor,
  difficultyFilter,
  setDifficultyFilter,
}: DifficultyFilterProps) {
  const [show, setShow] = useState(false);

  const difficulties = ["all", "easy", "medium", "hard"] as const;

  return (
    <div className="relative">
      <button
        onClick={() => setShow((prev) => !prev)}
        className="flex items-center text-sm md:text-md gap-2 px-2 py-1 md:px-4 md:py-2 rounded shadow-md hover:opacity-90 transition font-semibold"
        style={{
          backgroundColor: `var(--${mainColor}-100)`,
          color: "#ffffff",
        }}
      >
        <Filter size={18} />
        {difficultyFilter === "all"
          ? "All Difficulties"
          : difficultyFilter.charAt(0).toUpperCase() +
            difficultyFilter.slice(1)}
      </button>

      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className="absolute top-full left-0 mt-2 w-36 bg-white border border-gray-200 rounded shadow-lg z-20 overflow-hidden"
          >
            {difficulties.map((diff) => (
              <button
                key={diff}
                className="w-full text-left px-4 py-2 hover:bg-gray-100 transition"
                style={{
                  fontWeight: difficultyFilter === diff ? "bold" : "normal",
                  color:
                    difficultyFilter === diff
                      ? `var(--${mainColor}-100)`
                      : "#333",
                }}
                onClick={() => {
                  setDifficultyFilter(diff);
                  setShow(false);
                }}
              >
                {diff.charAt(0).toUpperCase() + diff.slice(1)}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
