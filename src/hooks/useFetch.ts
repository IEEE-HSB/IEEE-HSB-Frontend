import { useQuery, UseQueryResult } from "@tanstack/react-query";
import axios from "axios";
import type { AnnouncementsData } from "@/types/announcement";

export function useAnnouncements(): UseQueryResult<AnnouncementsData, Error> {
  return useQuery({
    queryKey: ["announcements"],
    queryFn: async () => {
      const res = await axios.get<AnnouncementsData>(
        "http://localhost:4000/announcements"
      );
    
      return res.data.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    },
  });
}
