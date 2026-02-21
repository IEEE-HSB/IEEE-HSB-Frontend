"use client";

import React, { createContext, useContext, ReactNode } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Quiz, Difficulty, UserAnswer } from "@/types/quiz";
import { normalizeString } from "@/lib/utils";
import { useApiQuery } from "@/hooks/useFetch";
import { getAuthToken } from "@/lib/getAuthToken";

interface Submission {
  quizId: string;
  answers: UserAnswer[];
  timestamp: string;
}

interface QuizzesContextType {
  useGetQuizzes: (options?: {
    code?: string;
    chapter?: string;
    committee?: string;
    difficulty?: Difficulty;
  }) => {
    data?: Quiz[];
    isLoading: boolean;
    error?: Error | null;
  };

  startQuizMutation: ReturnType<typeof useMutation<Quiz, unknown, string>>;

  submitQuizMutation: ReturnType<
    typeof useMutation<{ score: number }, unknown, { quizId: string; answers: UserAnswer[] }>
  >;

  useGetQuizAnswers: (quizId: string) => {
    data?: UserAnswer[];
    isLoading: boolean;
    error?: Error | null;
  };
}

const QuizzesContext = createContext<QuizzesContextType | undefined>(undefined);

const API_BASE = "http://api.ieeehsb.com/api";
//const API_BASE = "{url}/api";

export const QuizzesProvider = ({ children }: { children: ReactNode }) => {
  const queryClient = useQueryClient();

  const getAuthHeader = () => {
    const token = getAuthToken();
      console.log("Auth token:", token); 
  return token ? { Authorization: `Bearer ${token}` } : undefined;
  };


  const useGetQuizzes = (options?: {
    code?: string;
    chapter?: string;
    committee?: string;
    difficulty?: Difficulty;
  }) => {
    const { data, isLoading, error } = useApiQuery<Quiz[]>({
      queryKey: ["quizzes", options?.code, options?.chapter, options?.committee, options?.difficulty],
      url: `${API_BASE}/quizzes`,
      params: options?.code ? { code: options.code } : undefined,
      headers: getAuthHeader(), 
    });

    let filtered = data ?? [];

    if (options?.chapter)
      filtered = filtered.filter((q) => q.chapter?.toLowerCase() === options.chapter!.toLowerCase());

    if (options?.committee)
      filtered = filtered.filter(
        (q) => normalizeString(q.committee) === normalizeString(options.committee!)
      );

    if (options?.difficulty)
      filtered = filtered.filter((q) => q.difficulty === options.difficulty);

    return { data: filtered, isLoading, error };
  };


  const startQuizMutation = useMutation<Quiz, unknown, string>({
    mutationFn: async (quizId: string) => {
      const res = await axios.get(`${API_BASE}/quizzes/${quizId}`, {
        headers: getAuthHeader(),
      });
      return res.data;
    },
  });

 
  const useGetQuizAnswers = (quizId: string) => {
    const { data: submissions, isLoading, error } = useApiQuery<Submission[]>({
      queryKey: ["quiz-answers", quizId],
     // url: `${API_BASE}/quizzes/${quizId}/submit`,
      url: `${API_BASE}/submit`,
      enabled: !!quizId,
      headers: getAuthHeader(), 
    });

    const data =
      submissions && submissions.length > 0
        ? submissions[submissions.length - 1].answers
        : [];

    return { data, isLoading, error };
  };


  const submitQuizMutation = useMutation<
    { score: number },
    unknown,
    { quizId: string; answers: UserAnswer[] }
  >({
    mutationFn: async ({ quizId, answers }) => {
      const res = await axios.post(
        `${API_BASE}/submit`,
        //`${API_BASE}/${quizId}/submit`,
        { answers },
        {
          headers: getAuthHeader(),
        },
      );

      return res.data;
    },

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["quiz-answers", variables.quizId],
      });
    },
  });

  return (
    <QuizzesContext.Provider
      value={{
        useGetQuizzes,
        useGetQuizAnswers,
        startQuizMutation,
        submitQuizMutation,
      }}
    >
      {children}
    </QuizzesContext.Provider>
  );
};

export const useQuizzesContext = () => {
  const context = useContext(QuizzesContext);
  if (!context) throw new Error("useQuizzesContext must be used within a QuizzesProvider");
  return context;
};
