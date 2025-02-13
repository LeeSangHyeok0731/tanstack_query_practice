<<<<<<< Updated upstream
import API from "./ApiPage";
=======
import API from "./ApiPage/getApiAll";
import Mutation from "./ApiPage/mutationApi";
>>>>>>> Stashed changes

export default function Home() {
  return (
    <>
      <Mutation />
      <API />
    </>
  );
}
