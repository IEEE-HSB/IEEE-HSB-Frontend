"use client";

import { use } from "react";
import { chaptersData } from "@/data/chaptersData";
import { useState } from "react";
import { useQuizzes } from "@/hooks/useQuizzes";
import QuizCard from "@/components/Quizzes/QuizCard";
import DifficultyFilter from "@/components/Quizzes/DifficultyFilter";
import { useThemeContext } from "@/context/ThemeContext";
import { formatCommitteeName, getChapterMainColor } from "@/lib/utils";
import { Quiz } from "@/types/quiz";
import { motion } from "framer-motion";

interface CommitteePageProps {
  params: Promise<{ chapter: string; committee: string }>;
}

export default function CommitteePage({ params }: CommitteePageProps) {
  const resolvedParams = use(params);
  const { chapter, committee } = resolvedParams;
  const { isDark } = useThemeContext();

  const mainColor = getChapterMainColor(chapter, chaptersData);
  const [toggle, setToggle] = useState(true);
  const [difficultyFilter, setDifficultyFilter] = useState<
    "all" | "easy" | "medium" | "hard"
  >("all");

  const decodedCommittee = decodeURIComponent(committee);
  const committeeName = formatCommitteeName(decodedCommittee);

  const {
    data: quizzes,
    isLoading,
    error,
  } = useQuizzes({
    chapter,
    committee: decodedCommittee,
  });

  const filteredQuizzes = quizzes?.filter((q) => {
    const start = new Date(q.startDate);
    const end = new Date(start);
    end.setDate(end.getDate() + q.durationDays);
    const isExpired = new Date() > end;
    const isGeneralEffective = q.isGeneral || isExpired;
    const isContestActive = !q.isGeneral && !isExpired;
    const typeMatch = toggle ? isContestActive : isGeneralEffective;
    const difficultyMatch =
      difficultyFilter === "all" || q.difficulty === difficultyFilter;
    return typeMatch && difficultyMatch;
  });

  return (
    <div className="min-h-screen relative">
      {!isDark && (
        <div
          className="absolute -z-10 inset-0 bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_110%)]"
          style={{
            backgroundImage: `
              linear-gradient(to right, var(--${mainColor}-20) 1px, transparent 1px),
              linear-gradient(to bottom, var(--${mainColor}-20) 1px, transparent 1px)
            `,
          }}
        />
      )}

      <section className="relative">
        <div className="w-full max-w-7xl mx-auto px-2 sm:px-4">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12 sm:mb-12"
          >
            <h1
              className="text-3xl md:text-5xl lg:text-6xl font-bold my-4 max-[270px]:text-2xl"
              style={{ color: `var(--${mainColor}-100)` }}
            >
              Ready To Take The Next Step?
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full "
          >
            <h2
              className="text-3xl md:text-5xl lg:text-6xl font-bold max-[270px]:text-2xl"
              style={{ color: `var(--${mainColor}-100)` }}
            >
              {committeeName} Quiz
            </h2>

            <p
              className="text-lg md:text-xl mb-4 max-[270px]:text-sm "
              style={{ color: `var(--${mainColor}-100)` }}
            >
              Test your knowledge about the {committeeName} committee and see
              how much you know!
            </p>

            <div className="flex flex-wrap gap-4 mb-6 ">
              <button
                onClick={() => setToggle(!toggle)}
                className={`px-2 py-1 md:px-4 md:py-2 text-sm md:text-md max-[270px]:text-xs rounded font-semibold transition ${
                  toggle
                    ? "text-[var(--text-main)] bg-[var(--btn-bg-main)] hover:bg-[var(--btn-bg-main-hover)]"
                    : "text-[var(--text-fade)] bg-[var(--btn-bg-fade)] hover:bg-[var(--btn-bg-fade-hover)] border-2 border-[var(--text-fade)] hover:text-[var(--btn-text-fade-hover)]"
                }`}
                style={
                  {
                    "--btn-bg-main": `var(--${mainColor}-100)`,
                    "--btn-bg-main-hover": `var(--${mainColor}-80)`,
                    "--btn-bg-fade": "transparent",
                    "--btn-bg-fade-hover": `var(--${mainColor}-80)`,
                    "--btn-text-fade-hover": "#ffffff",
                    "--text-main": "#ffffff",
                    "--text-fade": `var(--${mainColor}-100)`,
                  } as React.CSSProperties
                }
              >
                {toggle ? "Contests" : "General"}
              </button>

              <DifficultyFilter
                mainColor={mainColor}
                difficultyFilter={difficultyFilter}
                setDifficultyFilter={setDifficultyFilter}
              />
            </div>

            {/* Quizzes */}
            {isLoading && <p>Loading quizzes...</p>}
            {!isLoading && filteredQuizzes?.length === 0 && (
              <p className="text-center">No quizzes available</p>
            )}
            {error && (
              <p className="text-red-500 text-center">
                Error loading quizzes: {error.message}
              </p>
            )}

            <ul
              className="
                grid
                grid-cols-1
                sm:grid-cols-2
                md:grid-cols-2
                lg:grid-cols-3
                xl:grid-cols-4
                gap-6
                w-full
                max-w-7xl
                justify-items-center
              "
            >
              {filteredQuizzes?.map((quiz: Quiz) => (
                <QuizCard
                  key={quiz.id}
                  quiz={quiz}
                  chapter={chapter}
                  committee={committee}
                />
              ))}
            </ul>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
