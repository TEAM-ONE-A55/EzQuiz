import { useContext, useEffect, useState } from "react";
import SimpleQuiz from "../SimpleQuiz/SimpleQuiz";
import { AppContext } from "../../../context/AppContext";
import { getAllQuizzesFromDatabase } from "../../../services/quiz.service";
import Button from "../../../components/Button/Button";
import { useNavigate } from "react-router";

export default function MyQuizzes() {
  const { userData } = useContext(AppContext);
  const [quizzes, setQuizzes] = useState([]);
  const [change, setChange] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    getAllQuizzesFromDatabase('creator')
    .then(quizzes => quizzes.filter(quiz => quiz.creator === userData.handle))
    .then(setQuizzes);
  }, [change])

  return (
    <div>
      {quizzes && quizzes.length !== 0 ? (
        <>
          <div className="my-groups-content">
            <h2 className="mb-4 font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-4xl dark:text-white">
              My{" "}
              <span className="text-blue-600 dark:text-blue-500">Quizzes</span>
            </h2>
            <br />
            {userData.role === 'educator' ? (
              <p className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">
                Welcome to your personalized quiz hub! Here, you can access and
                manage all the quizzes you&apos;ve created. Tailor each quiz to
                your teaching needs, analyze participant performance, and make
                adjustments as needed. Edit or delete quizzes with ease,
                ensuring your content stays up-to-date and relevant to your
                students&apos; learning journey.
              </p>
            ) : (
              <p className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">
                Welcome to your personalized quiz dashboard! Here, you can
                access quizzes you&apos;ve participated in and review your
                performance. Dive into your quiz history, view results, and
                track your progress.
              </p>
            )}
          </div>
          <br />
          
          <div className="grid grid-cols-4 mt-16 max-w-screen-xl m-auto justify-items-center gap-y-16">
            {quizzes.map((quiz) => (
              <div key={quiz.id} className="flex gap-10">
                <SimpleQuiz key={quiz.id} quiz={quiz} setChange={setChange} />
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="my-groups-content">
          <p className="mb-4 font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-4xl dark:text-white">
            {" "}
            You don&apos;t have any quizzes yet.
          </p>

          <br />
          <Button onClick={() => navigate("/create-quiz")}>Create Quiz</Button>
          <br />
          <br />
          <p className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">
            If you haven&apos;t created any quizzes yet, you can start by
            creating one. Click on the &quot;Create Quiz&quot; button to
            initiate the process.
          </p>
          <br />
        </div>
      )}
    </div>
  );
}
