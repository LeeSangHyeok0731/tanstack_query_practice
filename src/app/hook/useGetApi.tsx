import { useQuery } from "@tanstack/react-query";

export default function useGetApi() {
  const fetchData = async () => {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");

    return response.json();
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["data"],
    queryFn: fetchData,
  });

  return { data, isLoading, error };
}
