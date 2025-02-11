import { useQuery } from "@tanstack/react-query";

export default function useGetApi() {
  const fetchData = async () => {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");

    return response.json();
  };

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["data"],
    queryFn: fetchData,
    staleTime: 1000 * 60 * 0.5,
    gcTime: 1000 * 60 * 5,
  });

  return { data, isLoading, error, refetch };
}
