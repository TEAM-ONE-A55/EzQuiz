import { useEffect } from "react";
import { useParams } from "react-router";
import { getQuizById } from "../../../services/quiz.service";

export default function ViewResults() {
  const { id } = useParams();
  useEffect(() => {
    getQuizById(id).then(data => console.log(Object.keys(data.quizTakers)));
  }, [id]);

  return <h1>Results</h1>;
}
