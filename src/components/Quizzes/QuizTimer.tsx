"use client";

import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AlertTriangle, CheckCircle } from "lucide-react";

interface QuizTimerProps {
  timeLimitMinutes: number;
  onTimeUp: () => void;
  mainColor: string;
  isActive: boolean;
}

export default function QuizTimer({
  timeLimitMinutes,
  onTimeUp,
  mainColor,
  isActive,
}: QuizTimerProps) {
  const [timeLeft, setTimeLeft] = useState(timeLimitMinutes * 60);
  const [blink, setBlink] = useState(false);

  useEffect(() => {
    if (!isActive) return;

    const timerId = setInterval(() => {
      setTimeLeft((prev) => Math.max(prev - 1, 0));
    }, 1000);

    return () => clearInterval(timerId);
  }, [isActive]);

  useEffect(() => {

    if (timeLeft <= 10 && timeLeft > 0) {
      setBlink(true);
    } else {
      setBlink(false);
    }

    if (timeLeft === 10) {
      toast("10 seconds left!", {
        icon: <AlertTriangle className="w-5 h-5 text-yellow-500" />,
      });
    }

    if (timeLeft === 0) {
      toast("Time is up! Quiz submitted.", {
        icon: <CheckCircle className="w-5 h-5 text-green-500" />,
      });
      onTimeUp();
    }
  }, [timeLeft, onTimeUp]);

  const minutes = Math.floor(timeLeft / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (timeLeft % 60).toString().padStart(2, "0");

  return (
    <div className="w-full mb-6">
      <div
        className={`font-semibold text-lg md:text-2xl text-center transition-colors duration-300 ${
          blink ? "text-red-500 animate-pulse" : ""
        }`}
        style={{ color: blink ? undefined : `var(--${mainColor}-100)` }}
      >
        Time Left: {minutes}:{seconds}
      </div>
    </div>
  );
}
