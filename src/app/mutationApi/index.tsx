"use client";

import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { ApiData, DataResponse } from "../ApiPage";

export default function Mutation() {
  const [Title, setTitle] = useState<string>("");
  const [Body, setBody] = useState<string>("");
  const [UserId, setUserId] = useState<number>(0);

  const [ResponseData, setResponseData] = useState<ApiData[]>([]);

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

  return (
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
      {ResponseData.map((x: ApiData, index: number) => {
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
