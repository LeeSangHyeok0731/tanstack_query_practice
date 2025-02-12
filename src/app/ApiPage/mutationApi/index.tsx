"use client";

import { useMutation } from "@tanstack/react-query";

export default function Mutation() {
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
    },
    onError: (error) => {
      console.error("오류:", error);
    },
  });

  return (
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
  );
}
