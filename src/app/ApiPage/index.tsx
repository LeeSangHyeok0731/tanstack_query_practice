"use client";

import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";

type ApiData = {
  id: number;
  title: string;
  body: string;
  userId: string;
};

const DataResponse = styled.div`
  width: 300px;
  height: 50px;
  background-color: gray;
  padding: 5px 0 5px 0;
`;

export default function API() {
  const fetchData = async () => {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");

    return response.json();
  };
  const { data, isLoading, error } = useQuery({
    queryKey: ["data"],
    queryFn: fetchData,
  });

  if (isLoading) return <>데이터 불러오는중....</>;
  if (error) return <>데이터 불러오기 실패 ㅠㅠ</>;

  return (
    <div>
      api 불러오기 성공! <br />
      {data.map((x: ApiData, index: number) => {
        return (
          <DataResponse key={index}>
            <h1>{x.title}</h1>
            <p>{x.body}</p>
            <p>{x.userId}</p>
          </DataResponse>
        );
      })}
    </div>
  );
}
