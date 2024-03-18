import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../../context/AppContext";
import { getUserByHandle } from "../../../services/user.service";
import {
  getQuizById,
} from "../../../services/quiz.service";
import SimpleQuiz from "../SimpleQuiz/SimpleQuiz";
import Button from "../../../components/Button/Button";
import { useNavigate } from "react-router";

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
    if (scoreData.length !== 0) {
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
  );
}
