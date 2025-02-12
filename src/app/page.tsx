import API from "./ApiPage/getApiAll";
import Mutation from "./ApiPage/mutationApi";

export default function Home() {
  return (
    <>
      <Mutation />
      <API />
    </>
  );
}
