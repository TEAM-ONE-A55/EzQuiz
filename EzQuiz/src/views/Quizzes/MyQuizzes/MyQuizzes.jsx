import { useContext, useEffect, useState } from "react";
import { getQuizById } from "../../../services/quiz.service";
import SimpleQuiz from "../SimpleQuiz/SimpleQuiz";
import { AppContext } from "../../../context/AppContext";
import { getUserByHandle } from "../../../services/user.service";
import Button from "../../../components/Button/Button";
import { useNavigate } from "react-router";

export default function MyQuizzes() {
  const { userData } = useContext(AppContext);
  const [quizzes, setQuizzes] = useState([]);
  const [quizzesId, setQuizzesId] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getUserByHandle(userData.handle).then((snapshot) => {
      if (snapshot.val().createdQuizzes)
        return setQuizzesId(
          ...quizzesId,
          Object.keys(snapshot.val().createdQuizzes)
        );
    });
  }, [userData]);

  useEffect(() => {
    if (quizzesId.length !== 0) {
      const promises = quizzesId.map((q) => getQuizById(q));

      Promise.all(promises).then((q) => setQuizzes(q));
    }
  }, [quizzesId]);

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
            {quizzes[0].creator === userData.handle ? (
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
          <div className="flex gap-10">
            {quizzes.map((quiz) => (
              <SimpleQuiz key={quiz.id} quiz={quiz} setChange={() => {}} />
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
