import { useQuery, UseQueryResult } from "@tanstack/react-query";
import axios, { AxiosRequestConfig, Method } from "axios";

type ApiQueryOptions<T> = {
  queryKey: readonly unknown[];
  url: string; 
  method?: Method;
  params?: AxiosRequestConfig["params"];
  data?: AxiosRequestConfig["data"];
  headers?: AxiosRequestConfig["headers"];
  enabled?: boolean;
  select?: (data: T) => T;
};

export function useApiQuery<T>(
  options: ApiQueryOptions<T>
): UseQueryResult<T, Error> {
  const {
    queryKey,
    url,
    method = "GET",
    params,
    data,
    headers,
    enabled = true,
    select,
  } = options;

  return useQuery<T>({
    queryKey,
    enabled,
    queryFn: async () => {
      const res = await axios({
        url,
        method,
        params,
        data,
        headers,
      });

      const result: T = res.data.data;

      return select ? select(result) : result;
    },
  });
}
