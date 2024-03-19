import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../../context/AppContext";
import { getUserByHandle } from "../../../services/user.service";
import { getQuizById } from "../../../services/quiz.service";
import SimpleQuiz from "../SimpleQuiz/SimpleQuiz";
import Button from "../../../components/Button/Button";
import { useNavigate } from "react-router";
import ButtonLanding from "../../LandingPage/ButtonLanding/ButtonLanding";

export default function MyCompletedQuizzes() {
  const { userData } = useContext(AppContext);
  const [quizzes, setQuizzes] = useState([]);
  const [scoreData, setScoreData] = useState([]);
  const [change, setChange] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    getUserByHandle(userData.handle)
      .then((snapshot) => snapshot.val())
      .then((data) => data.participatedQuizzes)
      .then((data) => setScoreData(data))
      .catch((e) => {
        console.log(e.message);
      });
  }, []);

  useEffect(() => {
    if (scoreData && scoreData.length !== 0) {
      const promises = Object.keys(scoreData).map((id) =>
        getQuizById(id).then((quiz) => quiz)
      );

      Promise.all(promises).then(setQuizzes);
    }
  }, [scoreData, change]);

  const seeResults = (id) => {
    if (Object.keys(scoreData).indexOf(id) > -1) {
      const index = Object.keys(scoreData).indexOf(id);
      const data = Object.values(scoreData)[index];
      const { category, finishTime, questions, quiz } = data;

      const state = {
        resFinishTime: finishTime,
        resCategory: category,
        resQuiz: quiz,
        resQuestions: questions,
      };
      navigate(`/single-quiz/${id}`, { state });
    }
  };
  return (
    <>
      {quizzes && quizzes.length !== 0 ? (
        <>
          <div className="create-room-container w-3/5 mx-auto">
            <h2 className="mb-4 font-extrabold leading-none tracking-tight text-neutral-800 md:text-4xl lg:text-4xl">
              View completed quizzes and results
            </h2>
            <br />
            <p className="text-lg font-normal text-neutral-600 lg:text-xl">
              Unlock insights into your learning adventure! Dive into your
              completed quizzes to see your scores, review questions, and check
              your answers. Whether you&apos;re acing exams, testing your
              knowledge, or just having fun, this feature puts your progress in
              focus.
            </p>
          </div>
          <div className=" w-3/5 grid grid-cols-4 mt-16 max-w-screen-xl m-auto justify-items-center gap-y-16">
            {quizzes.map((quiz) => (
              <div key={quiz.id}>
                <div className="flex flex-col gap-10">
                  <SimpleQuiz key={quiz.id} quiz={quiz} setChange={setChange} />

                  <div className="w-full mx-auto -mt-4">
                    <Button
                      onClick={() => {
                        seeResults(quiz.id);
                      }}
                    >
                      See Results
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="create-room-container w-3/5 mx-auto">
          <h2 className="mb-4 font-extrabold leading-none tracking-tight text-neutral-800 md:text-4xl lg:text-4xl">
            No Completed Quizzes Yet
          </h2>
          <br />
          <p className="text-lg font-normal text-neutral-600 lg:text-xl">
            Looks like you haven&apos;t completed any quizzes yet! Start your
            quiz journey now and challenge yourself. Explore our quiz library
            and test your knowledge on various topics. Let the learning
            adventure begin!
          </p>
          <div className="mx-auto mt-12">
            <ButtonLanding onClick={() => navigate("/browse-quizzes")}>
              Start Your Journey with Public Quizzes
            </ButtonLanding>
          </div>
        </div>
      )}
    </>
  );
}
