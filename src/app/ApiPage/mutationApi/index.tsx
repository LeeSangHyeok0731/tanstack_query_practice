"use client";

import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { DataResponse } from "../getApiAll";

export default function Mutation() {
  const [data, setData] = useState<{
    title?: string;
    body?: string;
    userId?: number;
  }>({});

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
    onSuccess: (data) => {
      console.log("성공:", data);
      setData(data);
    },
    onError: (error) => {
      console.error("오류:", error);
    },
  });

  return (
    <div>
      <button
        onClick={() =>
          mutation.mutate({
            title: "이상혁",
            body: "안녕하세요",
            userId: 1412,
          })
        }
      >
        새로은 글 만들기
      </button>
      {data && (
        <DataResponse key={data.userId}>
          <h1>{data.title}</h1>
          <p>{data.body}</p>
          <p>{data.userId}</p>
        </DataResponse>
      )}
    </div>
  );
}
