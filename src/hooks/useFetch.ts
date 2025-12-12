import { useQuery, UseQueryResult } from "@tanstack/react-query";
import axios from "axios";
import type { AnnouncementsData } from "@/types/announcement";

export function useAnnouncements(): UseQueryResult<AnnouncementsData, Error> {
  return useQuery<AnnouncementsData>({
    queryKey: ["announcements"],
    queryFn: async () => {
      const response = await axios.get(
        "https://ieee-hsb-backend.vercel.app/api/announcements"
      );

      const announcements: AnnouncementsData = response.data.data;

      return announcements.sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    },
  });
}
