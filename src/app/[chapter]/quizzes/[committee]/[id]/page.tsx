"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getChapterMainColor } from "@/lib/utils";
import { chaptersData } from "@/data/chaptersData";
import { useQuizzesContext } from "@/context/QuizzesContext";
import { UserAnswer } from "@/types/quiz";
import QuizQuestionCard from "@/components/Quizzes/QuizQuestionCard";
import QuizResults from "@/components/Quizzes/QuizResults";
import { useThemeContext } from "@/context/ThemeContext";
import Swal from "sweetalert2";
import QuizTimer from "@/components/Quizzes/QuizTimer";
import toast from "react-hot-toast";
import { CheckCircle } from "lucide-react";
export default function QuizPage() {
  const params = useParams();
  const router = useRouter();
  const quizId = typeof params?.id === "string" ? params.id : "";
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [finished, setFinished] = useState(false);
  const [score, setScore] = useState(0);
  const { isDark } = useThemeContext();
  const { submitQuizMutation, useGetQuizzes } = useQuizzesContext();
  const {
    data: quizzes,
    isLoading,
    error,
  } = useGetQuizzes({
    chapter: typeof params?.chapter === "string" ? params.chapter : "",
    committee: typeof params?.committee === "string" ? params.committee : "",
  });

  const quiz = quizzes?.find((q) => q.id === quizId);
  const mainColor = getChapterMainColor(quiz?.chapter, chaptersData); 

  const handleSelectAnswer = (index: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = index;
    setAnswers(newAnswers);
  };

  const handleNext = async () => {
    if (!quiz || finished) return;

    const isLastQuestion =
      currentQuestion === (quiz?.quizQuestions.length ?? 0) - 1;

    if (!isLastQuestion) {
      setCurrentQuestion(currentQuestion + 1);
      return;
    }

    const result = await Swal.fire({
      title: "Submit Quiz?",
      text: "Are you sure you want to submit your answers?",
      icon: "question",
      iconColor: `var(--${mainColor}-100)`,
      showCancelButton: true,
      confirmButtonText: "Yes, Submit",
      cancelButtonText: "Cancel",
      cancelButtonColor: "#d33",
      confirmButtonColor: "#22c55e",
      reverseButtons: true,
    });

    if (result.isConfirmed) {
      handleFinish();
      toast.success("Quiz submitted successfully!", {
        icon: <CheckCircle className="w-5 h-5 text-green-500" />,
      });
    }
  };

  const handlePrev = () => {
    if (currentQuestion > 0) setCurrentQuestion(currentQuestion - 1);
  };

  const handleFinish = async () => {
    if (!quiz || finished) return;

    const totalScore = quiz.quizQuestions.reduce((acc, q, idx) => {
      if (answers[idx] === q.correctAnswer) return acc + 1;
      return acc;
    }, 0);

    setScore(totalScore);
    setFinished(true);

    const payload: UserAnswer[] = (quiz.quizQuestions ?? []).map((q, i) => ({
      questionId: q.id,
      selectedOptionIndex: answers[i] ?? -1,
    }));


    await submitQuizMutation.mutateAsync({ quizId, answers: payload });
  };

  const handleShowAnswers = () => {
    router.push(
      `/${params?.chapter}/quizzes/${params?.committee}/${quizId}/answers/`,
    );
  };

  if (isLoading) return <p className="text-center mt-10">Loading quiz...</p>;
  if (error)
    return <p className="text-red-500 text-center mt-10">{error.message}</p>;
  if (!quiz) return <p className="text-center mt-10">Quiz not found</p>;
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

      <div className="min-h-screen flex flex-col items-center p-4 relative w-full max-w-4xl mx-auto">
        <h1
          className="text-3xl md:text-4xl xl:text-6xl font-extrabold mb-10 text-center "
          style={{ color: `var(--${mainColor}-100)` }}
        >
          {quiz.title}
        </h1>

        {!finished && (
          <QuizTimer
            timeLimitMinutes={quiz.timeLimit}
            mainColor={mainColor}
            isActive={!finished}
            onTimeUp={handleFinish}
          />
        )}

        {!finished ? (
          <QuizQuestionCard
            mainColor={mainColor}
            currentQuestion={currentQuestion}
            quiz={quiz}
            question={quiz.quizQuestions[currentQuestion]}
            answers={answers}
            handleSelectAnswer={handleSelectAnswer}
            handlePrev={handlePrev}
            handleNext={handleNext}
          />
        ) : (
          <QuizResults
            score={score}
            maxScore={quiz.quizQuestions.length}
            handleShowAnswers={handleShowAnswers}
            mainColor={mainColor}
          />
        )}
      </div>
    </div>
  );}