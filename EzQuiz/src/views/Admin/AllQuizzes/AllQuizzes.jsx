import { useEffect, useState } from "react";
import {
  getAllQuizzesFromDatabase,
} from "../../../services/quiz.service";
import SimpleQuiz from "../../Quizzes/SimpleQuiz/SimpleQuiz";

export default function AllQuizzes() {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

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

  const handleSearchTermChange = (term) => {
    setSearchTerm(term);
  };

  return (
    <div>
      <h1>All Quizzes</h1>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
        <input
            type="text"
            placeholder="Search quizzes..."
            value={searchTerm}
            onChange={(e) => handleSearchTermChange(e.target.value)}
        />
        <br />
        {quizzes
            .filter((quiz) =>
                quiz.title.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((quiz) => (
                <SimpleQuiz
                    key={quiz.id}
                    quiz={quiz}
                    setChange={setQuizzes}
                />
            ))}
    </div>
  );
}
