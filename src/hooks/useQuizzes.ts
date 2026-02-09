import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Quiz, Difficulty } from "@/types/quiz";
import { normalizeString } from "@/lib/utils";

interface UseQuizzesOptions {
  chapter?: string;
  committee?: string;
  difficulty?: Difficulty;
}

export function useQuizzes({
  chapter,
  committee,
  difficulty,
}: UseQuizzesOptions = {}) {
  return useQuery<Quiz[]>({
    queryKey: ["quizzes", chapter, committee, difficulty],
    queryFn: async () => {
      let data = await axios
        .get("http://localhost:4000/quizzes")
        .then((res) => res.data as Quiz[]);

      if (chapter)
        data = data.filter(
          (q) => q.chapter.toLowerCase() === chapter.toLowerCase(),
        );
      if (committee)
        data = data.filter(
          (q) => normalizeString(q.committee) === normalizeString(committee),
        );
      if (difficulty) data = data.filter((q) => q.difficulty === difficulty);

      return data;
    },
  });
}

export function useStartQuiz() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (quizId: string) => {
      const res = await axios.patch(`http://localhost:4000/quizzes/${quizId}`, {
        started: true,
      });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["quizzes"] });
    },
  });
}
