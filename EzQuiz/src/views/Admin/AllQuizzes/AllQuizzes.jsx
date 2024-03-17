import { useEffect, useState } from "react";
import { getAllQuizzesFromDatabase } from "../../../services/quiz.service";
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
      <div className="flex justify-center">
        <div className="mb-3 xl:w-96">
          <input
            type="search"
            onChange={(e) => setSearchTerm(e.target.value)}
            className="relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-black outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-neutral-600 focus:outline-none"
            id="exampleSearch"
            placeholder="Search quizzes..."
          />
        </div>
      </div>

      <br />
      {quizzes
        .filter((quiz) =>
          quiz.title.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .map((quiz) => (
          <SimpleQuiz key={quiz.id} quiz={quiz} setChange={setQuizzes} />
        ))}
    </div>
  );
}
