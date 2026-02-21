import React from 'react'
import { MoveLeft, MoveRight } from "lucide-react";
import { Quiz } from "@/types/quiz";
interface QuizQuestionCardProps {
  mainColor: string;
  currentQuestion: number;
  quiz: Quiz;
  question: Quiz["quizQuestions"][number];
  answers: number[];
  handleSelectAnswer: (index: number) => void;
  handlePrev: () => void;
  handleNext: () => void;
}

const QuizQuestionCard = ({ mainColor, currentQuestion, quiz, question, answers, handleSelectAnswer, handlePrev, handleNext }: QuizQuestionCardProps) => {
  return (
    <div className="p-6 rounded-2xl shadow-lg w-full max-w-xl bg-white">
      <h2
        className="text-2xl font-bold mb-4 text-center"
        style={{ color: `var(--${mainColor}-100)` }}
      >
        Question {currentQuestion + 1} of {quiz.quizQuestions.length}
      </h2>

      <p
        className="mb-6 text-xl font-semibold"
        style={{ color: `var(--${mainColor}-100)` }}
      >
        {question.question}
      </p>

      <div className="flex flex-col gap-4 mb-6">
        {question.options.map((opt, idx) => {
          const isSelected = answers[currentQuestion] === idx;
          return (
            <button
              key={idx}
              onClick={() => handleSelectAnswer(idx)}
              className="px-5 py-3 rounded-xl border font-medium transition-all duration-200 hover:scale-105 text-left"
              style={{
                backgroundColor: isSelected
                  ? `var(--${mainColor}-100)`
                  : "#ffffff",
                color: isSelected ? "#ffffff" : `var(--${mainColor}-100)`,
                borderColor: isSelected ? `var(--${mainColor}-700)` : "#d1d5db",
              }}
            >
              {opt}
            </button>
          );
        })}
      </div>

      <div className="flex justify-between">
        <button
          onClick={handlePrev}
          disabled={currentQuestion === 0}
          className="flex items-center px-5 py-3 rounded-xl bg-gray-200 hover:bg-gray-300 cursor-pointer disabled:opacity-50 font-semibold transition-all duration-200  hover:scale-105 disabled:hover:scale-100 disabled:cursor-not-allowed"
        >
          <MoveLeft className="w-6 h-6" />
        </button>

        <button
          onClick={handleNext}
          disabled={answers[currentQuestion] === undefined}
          className={`flex items-center px-5 py-3 rounded-xl text-white font-semibold transition-all duration-200  ${
            answers[currentQuestion] === undefined
              ? "opacity-50 cursor-not-allowed"
              : "cursor-pointer hover:scale-105"
          }`}
          style={{
            backgroundColor:
              currentQuestion === quiz.quizQuestions.length - 1
                ? "#22c55e"
                : `var(--${mainColor}-100)`,
          }}
        >
          {currentQuestion === quiz.quizQuestions.length - 1 ? (
            "Submit"
          ) : (
            <MoveRight className="w-6 h-6" />
          )}
        </button>
      </div>
    </div>
  );
}

export default QuizQuestionCard
