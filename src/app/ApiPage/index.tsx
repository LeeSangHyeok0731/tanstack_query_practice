"use client";

import styled from "styled-components";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import useGetApi from "../hook/useGetApi";

export type ApiData = {
  id?: number;
  title: string;
  body: string;
  userId: number;
};

export const DataResponse = styled.div`
  width: 100%;
  height: 200px;
  background-color: rgba(211, 211, 211, 1);
  margin: 5px 0 5px 0;
  display: flex;
  flex-direction: column;
`;

export default function API() {
  const { data = [], isLoading, error, refetch } = useGetApi();

  const [Title, setTitle] = useState<string>("");
  const [Body, setBody] = useState<string>("");
  const [UserId, setUserId] = useState<number>(0);

  const [ResponseData, setResponseData] = useState<ApiData[]>([]);

  const [total, setTotal] = useState<ApiData[]>([]);

  const fetchData = async ({
    title,
    body,
    userId,
  }: {
    title: string;
    body: string;
    userId: number;
  }) => {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      body: JSON.stringify({ title, body, userId }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });

    return response.json();
  };

  const mutation = useMutation({
    mutationFn: fetchData,
    onSuccess: (data: { title: string; body: string; userId: number }) => {
      console.log("성공:", data);
      setResponseData((prev) => [...prev, data]);
    },
    onError: (error) => {
      console.error("오류:", error);
    },
  });

  const handleClick = () => {
    refetch();
    setTotal([...ResponseData.reverse(), ...data]);
  };

  if (isLoading) return <>데이터 불러오는중....</>;
  if (error) return <>데이터 불러오기 실패 ㅠㅠ</>;

  return (
    <div>
      api 불러오기 성공! <br />
      <div>
        <button
          onClick={() =>
            mutation.mutate({
              title: Title,
              body: Body,
              userId: UserId,
            })
          }
        >
          새로은 글 만들기
        </button>
        <form>
          <input
            placeholder="title"
            onChange={(e) => setTitle(e.target.value)}
          ></input>
          <input
            placeholder="body"
            onChange={(e) => setBody(e.target.value)}
          ></input>
          <input
            placeholder="userId"
            onChange={(e) => setUserId(Number(e.target.value))}
          ></input>
        </form>
      </div>
      <button onClick={handleClick}>새 데이터 불러오기</button>
      {total.map((x: ApiData, index: number) => {
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
