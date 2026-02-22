import { UserType } from "@/types/user";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { getAuthToken } from '@/lib/getAuthToken';

export function useUsers() {
  const token = getAuthToken();

  const { data: users, isLoading, isError, } = useQuery<UserType[]>({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axios.get("https://api.ieeehsb.com/api/user", {
        headers: { Authorization: `Bearer ${token}` }
      })
      return res.data.data as UserType[];

    },

  });

  return { users, isLoading, isError };
}
