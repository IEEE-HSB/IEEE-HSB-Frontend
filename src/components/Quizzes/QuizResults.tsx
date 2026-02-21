import React from "react";

interface QuizResultsProps {
  score: number;
  maxScore: number;
  handleShowAnswers: () => void;
  mainColor: string;
}

const getMotivationMessage = (score: number, maxScore: number) => {
  const percentage = (score / maxScore) * 100;

  if (percentage === 100) return " Perfect Score! You’re unstoppable!";
  if (percentage >= 80) return "Amazing job! Keep going!";
  if (percentage >= 60) return " Good work! You can do even better!";
  if (percentage >= 40) return "Nice try! Practice makes perfect!";
  return " Don’t worry! Review and come back stronger!";
};



const QuizResults = ({
  score,
  maxScore,
  handleShowAnswers,
  mainColor,
}: QuizResultsProps) => {


  return (
    <div className=" bg-transparent border-2 shadow-xl p-8 rounded-3xl  w-full max-w-xl text-center transition-all duration-300 animate-fadeIn"
      style={{
        borderColor: `var(--${mainColor}-100)`,
        backgroundColor: `var(--${mainColor}-20)`, }}>
      <h2
        className="text-3xl md:text-4xl font-extrabold mb-6"
        style={{ color: `var(--${mainColor}-100)` }}
      >
      Quiz Finished!
      </h2>


      <p
        className="text-2xl font-bold mb-2"
        style={{ color: `var(--${mainColor}-100)` }}
      >
        Your Score: {score} / {maxScore}
      </p>

      <p
        className="text-xl font-semibold mt-3 mb-6 transition-all duration-300 "
        style={{
          color: `var(--${mainColor}-100)`,
        }}
      >
        {getMotivationMessage(score, maxScore)}
      </p>

      <button
        onClick={handleShowAnswers}
        className="px-8 py-3 rounded-xl font-semibold text-white shadow-md hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
        style={{
          backgroundColor: `var(--${mainColor}-100)`,
        }}
      >
        Show Answers
      </button>
    </div>
  );
};

export default QuizResults;
