"use client";

import { useParams } from "next/navigation";
import { useQuizzesContext } from "@/context/QuizzesContext";
import { getChapterMainColor } from "@/lib/utils";
import { chaptersData } from "@/data/chaptersData";
import { Check, X } from "lucide-react";
import { useThemeContext } from "@/context/ThemeContext";
export default function AnswersPage() {
  const params = useParams();
  const quizId = typeof params?.id === "string" ? params.id : "";
const { isDark } = useThemeContext();
  const { useGetQuizzes, useGetQuizAnswers } = useQuizzesContext();
  const {
    data: quizzes,
    isLoading,
    error,
  } = useGetQuizzes({
    chapter: typeof params?.chapter === "string" ? params.chapter : "",
    committee: typeof params?.committee === "string" ? params.committee : "",
  });

  const {
    data: userAnswers,
    isLoading: answersLoading,
    error: answersError,
  } = useGetQuizAnswers(quizId);

  if (isLoading || answersLoading) return <p className="text-center mt-10">Loading quizzes and answers...</p>;
  if (error || answersError) return <p className="text-center mt-10 text-red-500">Error loading quizzes or answers.</p>;
  if (!quizzes || quizzes.length === 0) return <p className="text-center mt-10">Quiz not found.</p>;

  const quiz = quizzes.find((q) => q.id === quizId);
  if (!quiz) return <p className="text-center mt-10">Quiz not found</p>;

  const mainColor =
    getChapterMainColor(
      typeof params?.chapter === "string" ? params.chapter : "",
      chaptersData,
    ) ;
  const userAnswersMap: Record<string, number> = {};
  userAnswers?.forEach((a) => {
    userAnswersMap[a.questionId] = a.selectedOptionIndex;
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
    <div className="min-h-screen flex flex-col items-center p-6 relative">
      <h1
        className="text-3xl md:text-4xl xl:text-6xl font-bold mb-6"
        style={{ color: `var(--${mainColor}-100)` }}
      >
        Quiz Answers
      </h1>

      <div className="w-full max-w-2xl flex flex-col gap-6">
        {quiz.quizQuestions.map((q, i) => {
          const userAnswerIndex = userAnswersMap[q.id];

          return (
            <div key={q.id} className="bg-white p-5 rounded-2xl shadow-md">
              <h2
                className="font-bold mb-3"
                style={{ color: `var(--${mainColor}-100)` }}
              >
                Q{i + 1}: {q.question}
              </h2>

              {q.options.map((opt, idx) => {
                const isCorrect = idx === q.correctAnswer;
                const isUserWrong = idx === userAnswerIndex && !isCorrect;

                return (
                  <div
                    key={idx}
                    className="px-4 py-2 rounded-lg mb-2 flex items-center gap-2"
                    style={{
                      backgroundColor: isCorrect
                        ? "#22c55e20"
                        : isUserWrong
                          ? "#ef444420"
                          : "#f3f4f6",
                      color: isCorrect
                        ? "#22c55e"
                        : isUserWrong
                          ? "#ef4444"
                          : "#374151",
                      fontWeight: isCorrect || isUserWrong ? "bold" : "normal",
                    }}
                  >
                    <span>{opt}</span>
                    {isCorrect && <Check className="w-5 h-5 text-green-500" />}
                    {isUserWrong && <X className="w-5 h-5 text-red-500" />}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
    </div>
  );
}
