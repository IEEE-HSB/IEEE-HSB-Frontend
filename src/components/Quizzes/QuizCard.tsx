"use client";

import { motion } from "framer-motion";
import { useStartQuiz } from "@/hooks/useQuizzes";
import { useRouter } from "next/navigation";
import { Quiz } from "@/types/quiz";
import { getChapterMainColor } from "@/lib/utils";
import { chaptersData } from "@/data/chaptersData";
import { toast } from "react-hot-toast";

interface QuizCardProps {
  quiz: Quiz;
  chapter: string;
  committee: string;
}

export default function QuizCard({ quiz, chapter, committee }: QuizCardProps) {
  const now = new Date();
  const start = new Date(quiz.startDate);
  const end = new Date(start);
  end.setDate(end.getDate() + quiz.durationDays);

  const isExpired = now > end;
  const daysLeft = Math.max(
    Math.ceil((end.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)),
    0,
  );

  const mainColor = getChapterMainColor(chapter, chaptersData);

  const startQuiz = useStartQuiz();
  const router = useRouter();

  const handleStartQuiz = async () => {
    try {
      await startQuiz.mutateAsync(quiz.id);
      router.push(
        `/${chapter}/quizzes/${committee.replace(/\s+/g, "-").toLowerCase()}/${quiz.id}`,
      );
    } catch (error) {
      toast.error("Failed to start quiz");
    }
  };

  return (
    <motion.li
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className="
        relative
        p-5
        rounded-xl
        border-2
        bg-transparent
        shadow-md
        flex
        flex-col
        justify-between
        w-full
        max-w-64
        h-auto
        min-h-64
        mx-auto
        max-[270px]:p-3
      "
      style={{ borderColor: `var(--${mainColor}-100)` }}
    >
      {!quiz.isGeneral && !isExpired && (
        <span className="absolute top-3 left-3 px-2 py-1 rounded bg-red-500 text-white text-xs font-bold shadow-md max-[270px]:text-[10px]">
          {daysLeft}d left
        </span>
      )}

      {(quiz.isGeneral || isExpired) && (
        <span className="absolute top-3 left-3 px-2 py-1 rounded bg-green-500 text-white text-xs font-bold shadow-md max-[270px]:text-[10px]">
          General
        </span>
      )}

      <div className="flex flex-col justify-center h-full gap-2 text-center">
        <h3
          className="text-xl font-bold mt-5 break-words max-[270px]:text-base"
          style={{ color: `var(--${mainColor}-100)` }}
        >
          {quiz.title}
        </h3>

        <p
          className="text-sm break-words max-[270px]:text-xs"
          style={{ color: `var(--${mainColor}-80)` }}
        >
          {quiz.description}
        </p>

        <div className="flex flex-wrap justify-center gap-2 mt-2">
          <span
            className="px-2 py-1 rounded text-xs font-bold max-[270px]:text-[10px]"
            style={{
              backgroundColor: `var(--${mainColor}-100)`,
              color: "white",
            }}
          >
            {quiz.difficulty.charAt(0).toUpperCase() + quiz.difficulty.slice(1)}
          </span>

          <span
            className="px-2 py-1 rounded text-xs font-bold max-[270px]:text-[10px]"
            style={{
              backgroundColor: `var(--${mainColor}-100)`,
              color: "white",
            }}
          >
            {quiz.points} pts
          </span>

          <span
            className="px-2 py-1 rounded text-xs font-bold max-[270px]:text-[10px]"
            style={{
              backgroundColor: `var(--${mainColor}-100)`,
              color: "white",
            }}
          >
            {quiz.timeLimit} min
          </span>
        </div>
      </div>

      <button
        onClick={handleStartQuiz}
        className="mt-4 px-6 py-2 rounded-lg font-semibold text-white hover:opacity-80 transition self-center cursor-pointer max-[270px]:px-3 max-[270px]:py-1 max-[270px]:text-xs"
        style={{ backgroundColor: `var(--${mainColor}-100)` }}
      >
        Start
      </button>
    </motion.li>
  );
}
