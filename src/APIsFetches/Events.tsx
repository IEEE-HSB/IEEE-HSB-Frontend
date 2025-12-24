import { EventType } from "@/types/event";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function useEvents() {
  const {data: events, isLoading, isError,} = useQuery<EventType[]>({
    queryKey: ["events"],
    queryFn: async () => {
      const res = await axios.get(
        "https://ieee-hsb-backend.vercel.app/api/events"
      );

      const data: Record<string, EventType[]> = res.data.data;

      return Object.values(data)
        .flat()
        .sort(
          (a, b) =>
            new Date(b.date).getTime() -
            new Date(a.date).getTime()
        );
    },
  });

  return { events, isLoading, isError };
}
