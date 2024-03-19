import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../../context/AppContext";
import { useNavigate } from "react-router";
import { API_CATEGORIES } from "../../../constants/constants";
import { determineQuizStatus } from "../../../services/quiz.service";
import SimpleQuizOptionsMenu from "./SimpleQuizOptionsMenu";
import simpleQuizImage from "../../../images/DSC02263-Editeis.jpg";
import QuizStatus from "./QuizStatus";
import SQuizDifficulty from "./SQuizDifficulty";
import PropTypes from "prop-types";

export default function SimpleQuiz({ quiz, setChange, hubType, hubId }) {
  const navigate = useNavigate();
  const { user, userData } = useContext(AppContext);
  const status = determineQuizStatus(quiz);
  const [categoryName, setCategoryName] = useState(null);

  useEffect(() => {
    fetch(API_CATEGORIES)
      .then((response) => response.json())
      .then((categories) =>
        categories.trivia_categories.filter((c) => c.id !== 13)
      )
      .then((categories) =>
        setCategoryName(categories.find((c) => c.id === quiz.category).name)
      );
  }, []);

  const takeQuiz = () => {
    if (!user) {
      navigate("/signin");
      return;
    } else {
      navigate(`/single-quiz/${quiz.id}`);
    }
  };


  return (
    <div className=" bg-gray-50 w-64 rounded-xl flex-col h-[450px] relative shadow-neutral-500 shadow-xl">
      <img
        className=" w-64 h-36 object-cover border-none rounded-t-xl"
        src={simpleQuizImage}
        alt="quiz"
      />
      <div className="p-4 text-black flex flex-col justify-center items-center">
        <h3 className="text-xl font-semibold">{quiz.title}</h3>
        <div className="flex items-center">
          <p className="text-gray-800 text-xs mr-1">By {quiz.creator}</p>
          <img
            className="h-4 w-4 border-none mb-0.5 rounded-full"
            src={quiz.creatorAvatar}
            alt={`${quiz.creatorAvatar}-avatar`}
          />
        </div>
        <div className="flex gap-2">
          <QuizStatus status={status} />
          <SQuizDifficulty difficulty={quiz.difficulty} />
        </div>
        <div>
          <p className=" text-sm bg-slate-100 text-slate-800 px-2 py-0.5 mt-3 rounded">
            {categoryName}
          </p>
        </div>
        <div className="flex text-sm gap-8 mt-4">
          <div>
            <span className="block text-slate-800 text-base font-semibold">
              {quiz.questions.length}
            </span>
            <span className="block">
              {quiz.questions.length > 1 ? "Questions" : "Question"}
            </span>
          </div>
          <div>
            <span className="block text-slate-800 text-base font-semibold">
              {quiz.timeLimit}m
            </span>
            <span className="block">Time limit</span>
          </div>
        </div>
      </div>
      {user && userData.role !== "student" && (
        <div className="absolute bottom-5 left-6 text-slate-400">
          {quiz.visibility.toLowerCase() === "public" ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 10.5V6.75a4.5 4.5 0 1 1 9 0v3.75M3.75 21.75h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H3.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
              />
            </svg>
          )}
        </div>
      )}
      <div className="flex justify-center">
        <div className="absolute bottom-4 justify-self-center">
          {userData &&
          userData.participatedQuizzes &&
          Object.keys(userData.participatedQuizzes).includes(quiz.id)
            ? status === "Ongoing" && (
                <button
                  className=" text-gray-900 font-semibold text-sm rounded-md max-w-32 px-4 py-2 duration-75 ease-in-out bg-neutral-200 hover:bg-gray-50"
                  onClick={() => navigate(`/results/${quiz.id}`)}
                >
                  Scoreboard
                </button>
              )
            : status === "Ongoing" && (
                <button
                  className=" mx-auto block rounded-md bg-yellow-400 px-3 pt-1.5 pb-1 text-sm font-medium uppercase leading-normal text-neutral-800 shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-yellow-500 hover:shadow-neutral-800"
                  onClick={takeQuiz}
                >
                  Take Quiz
                </button>
              )}

        </div>
      </div>
      {user &&
        (userData.handle === quiz.creator || userData.role === "admin") && (
          <div className="absolute bottom-12 right-12 text-slate-400">
            <SimpleQuizOptionsMenu
              quiz={quiz}
              id={quiz.id}
              handle={quiz.creator}
              setChange={setChange}
              hubType={hubType}
              hubId={hubId}
            />
          </div>
        )}
    </div>
  );
}

SimpleQuiz.propTypes = {
  quiz: PropTypes.object.isRequired,
  setChange: PropTypes.func.isRequired,
  hubType: PropTypes.string,
  hubId: PropTypes.string,
};
