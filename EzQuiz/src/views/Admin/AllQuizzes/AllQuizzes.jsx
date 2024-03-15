import { useEffect, useState } from "react";
import {
  getAllQuizzesFromDatabase,
  deleteQuizFromDatabase,
} from "../../../services/quiz.service";
import SimpleQuiz from "../../Quizzes/SimpleQuiz/SimpleQuiz";

export default function AllQuizzes() {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const allQuizzes = await getAllQuizzesFromDatabase();
        setQuizzes(allQuizzes);
        setLoading(false);
      } catch (e) {
        setError(e.message);
      }
    };
    fetchQuizzes();
  }, [quizzes]);

  return (
    <div>
      <h1>All Quizzes</h1>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <div className="grid grid-cols-3 gap-4">
        {quizzes.map((quiz) => (
          <SimpleQuiz key={quiz.id} quiz={quiz} setChange={() => {}} />
        ))}
      </div>
    </div>
  );
}
