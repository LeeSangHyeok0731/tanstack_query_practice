"use client";

import styled from "styled-components";
import useGetApi from "../hook/useGetApi";

type ApiData = {
  id: number;
  title: string;
  body: string;
  userId: string;
};

const DataResponse = styled.div`
  width: 100%;
  height: 200px;
  background-color: gray;
  margin: 5px 0 5px 0;
  display: flex;
  flex-direction: column;
`;

export default function API() {
  const { data, isLoading, error } = useGetApi();

  if (isLoading) return <>데이터 불러오는중....</>;
  if (error) return <>데이터 불러오기 실패 ㅠㅠ</>;

  return (
    <div>
      {data && <p> api 불러오기 성공!</p>}
      <br />
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
