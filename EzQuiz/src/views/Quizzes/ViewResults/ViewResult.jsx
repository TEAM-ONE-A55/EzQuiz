import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getQuizById } from "../../../services/quiz.service";

export default function ViewResults() {
  const { id } = useParams();
  const [quiz, setQuiz] = useState([]);
  const [quizTakers, setQuizTakers] = useState([]);
  const [takersSet, setTakersSet] = useState(false);

  useEffect(() => {
    getQuizById(id).then((data) => setQuiz(data));
  }, [id]);

  useEffect(() => {
    if (quiz && quiz.quizTakers && !takersSet) {
      setQuizTakers((prev) => [...prev, ...Object.values(quiz.quizTakers)]);
      setTakersSet(true);
    }
  }, [quiz, takersSet]);

  console.log(quizTakers);

  return (
    <>
      <table className="min-w-full text-left text-sm font-light">
        <thead className="border-b font-medium dark:border-neutral-500">
          <tr>
            <th scope="col" className="px-6 py-4">
              Rank
            </th>
            <th scope="col" className="px-6 py-4">
              Username
            </th>
            <th scope="col" className="px-6 py-4">
              Score
            </th>
            <th scope="col" className="px-6 py-4">
              Name
            </th>
          </tr>
        </thead>
      </table>
    </>
  );
}
