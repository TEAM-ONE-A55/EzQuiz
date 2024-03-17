import "./SingleQuiz.css";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import PropTypes from "prop-types";
import { fetchQuizData } from "../../../services/quiz-api.service";
import {
  API_CATEGORIES,
  defaultQuizAmountSample,
  defaultQuizDifficultySamle,
} from "../../../constants/constants";
import Score from "../../../components/Score/Score";
import Timer from "../../../components/Timer/Timer";
import { getQuizById } from "../../../services/quiz.service";

export default function SingleQuiz({
  difficulty,
  setDifficulty,
  quizAmount,
  setQuizAmount,
}) {
  const [questions, setQuestions] = useState([]);
  const [error, setError] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [startTime, setStartTime] = useState(new Date().getTime());
  const [finishTime, setFinishTime] = useState(new Date().getTime());
  const [finishQuiz, setFinishQuiz] = useState(false);
  const [quiz, setQuiz] = useState({});
  const [time, setTime] = useState(new Date());
  const [category, setCategory] = useState([
    {
      id: "",
      name: "",
    },
  ]);

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    let data;
    try {
      if (id.length < 3) {
        data = fetchQuizData(
          setQuestions,
          setError,
          id,
          difficulty.toLowerCase(),
          quizAmount
        );
        updateTime(+quizAmount);
      } else {
        getQuizById(id).then((quiz) => {
          setQuiz(quiz);
          setQuestions(quiz.questions);
          updateTime(+quiz.timeLimit);
          fetch(API_CATEGORIES)
            .then((response) => response.json())
            .then((categories) =>
              setCategory(
                categories.trivia_categories.filter(
                  (c) => c.id === quiz.category
                )
              )
            );
        });
      }
    } catch (e) {
      console.log(e.message);
    }

    if (data) setStartTime(new Date().getTime());
  }, []);

  useEffect(() => {
    if (finishQuiz) {
      setFinishTime(new Date().getTime());
    }
  }, [finishQuiz]);

  const timeScore = +finishTime - +startTime;

  const updateTime = (givenTime) => {
    const newTime = new Date(time);
    newTime.setMinutes(newTime.getMinutes() + givenTime);
    setTime(newTime);
  };

  const handleAnswerChange = (questionIndex, selectedAnswer, answerIndex) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].selected_answer = selectedAnswer;
    updatedQuestions[questionIndex].selected_answerIndex = answerIndex;
    setQuestions(updatedQuestions);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => prev + 1);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => prev - 1);
  };

  const handleBack = () => {
    setQuizAmount(defaultQuizAmountSample);
    setDifficulty(defaultQuizDifficultySamle);
    return navigate(-1);
  };

  if (error) {
    return <div>{error}</div>;
  }

  if (finishQuiz) {
    if (timeScore && !isNaN(timeScore))
      return (
        <Score
          finishTime={timeScore}
          questions={questions}
          quiz={quiz}
          category={category[0].name}
        />
      );
  }

  return (
    questions.length !== 0 && (
      <div className="quiz-container mt-24 mx-auto">
        <br />
        <div className="block rounded-xl bg-neutral-100 p-16 text-surface shadow-neutral-500 shadow-xl">
          {id.length < 3 ? (
            <h2
              dangerouslySetInnerHTML={{
                __html: questions[currentIndex].category,
              }}
              className="mb-2 text-4xl font-medium leading-tight"
            />
          ) : (
            <h2 className="mb-2 text-4xl  text-neutral-800 ">
              {" "}
              {category[0].name}{" "}
            </h2>
          )}
          <br />
          <br />
          <div className=" bg-yellow-400 mx-auto min-w-lg rounded-xl p-8  shadow-neutral-500 shadow-inner">
            <div className="text-neutral-800">
              <Timer expiryTimestamp={time} setFinishQuiz={setFinishQuiz} />
            </div>
            <br />
            {/* Question */}
            <h3
              className="mb-4  text-neutral-800 text-4xl"
              dangerouslySetInnerHTML={{
                __html: questions[currentIndex].question,
              }}
            />
          </div>
          <br />
          <br />
          {/* Answer Options */}
          <div className="grid grid-cols-2 grid-rows-2 gap-4">
            {questions[currentIndex].mixedAnswers.map((answer, answerIndex) => (
              <>
                <button
                  key={answerIndex}
                  onClick={() =>
                    handleAnswerChange(currentIndex, answer, answerIndex)
                  }
                  className="rounded-lg bg-neutral-100 p-4 text-neutral-800  shadow-neutral-500 shadow-lg hover:bg-yellow-400 focus:outline-none focus:bg-yellow-400"
                >
                  <span dangerouslySetInnerHTML={{ __html: answer }} />
                </button>
              </>
            ))}
          </div>
          {/* Buttons */}
          <br />
          <div className="flex justify-between mt-4">
            {currentIndex !== 0 ? (
              <>
                <button
                  onClick={handlePrev}
                  className="rounded bg-yellow-400 px-6 py-2 text-sm font-medium text-white shadow-md hover:bg-yellow-500 focus:outline-none shadow-neutral-500"
                >
                  <svg
                    className="h-6 w-6 fill-neutral-800"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      clipRule="evenodd"
                      strokeLinejoin="round"
                      strokeMiterlimit="2"
                      d="m10.978 14.999v3.251c0 .412-.335.75-.752.75-.188 0-.375-.071-.518-.206-1.775-1.685-4.945-4.692-6.396-6.069-.2-.189-.312-.452-.312-.725 0-.274.112-.536.312-.725 1.451-1.377 4.621-4.385 6.396-6.068.143-.136.33-.207.518-.207.417 0 .752.337.752.75v3.251h9.02c.531 0 1.002.47 1.002 1v3.998c0 .53-.471 1-1.002 1z"
                      fillRule="nonzero"
                    />
                  </svg>
                </button>
                <button
                  onClick={() => setFinishQuiz(true)}
                  className="rounded bg-yellow-400 px-6 py-2 text-l font-medium text-neutral-800 shadow-md shadow-neutral-500 hover:bg-yellow-500 focus:outline-none "
                >
                  Submit
                </button>
              </>
            ) : (
              <>
                <button className="rounded bg-neutral-200 px-6 py-2 text-sm font-medium text-white shadow-md focus:outline-none shadow-neutral-500">
                  <svg
                    className="h-6 w-6 fill-neutral-800"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      clipRule="evenodd"
                      strokeLinejoin="round"
                      strokeMiterlimit="2"
                      d="m10.978 14.999v3.251c0 .412-.335.75-.752.75-.188 0-.375-.071-.518-.206-1.775-1.685-4.945-4.692-6.396-6.069-.2-.189-.312-.452-.312-.725 0-.274.112-.536.312-.725 1.451-1.377 4.621-4.385 6.396-6.068.143-.136.33-.207.518-.207.417 0 .752.337.752.75v3.251h9.02c.531 0 1.002.47 1.002 1v3.998c0 .53-.471 1-1.002 1z"
                      fillRule="nonzero"
                    />
                  </svg>
                </button>
                <button
                  onClick={() => setFinishQuiz(true)}
                  className="rounded bg-yellow-400 px-6 py-2 text-l font-medium text-neutral-800 shadow-md shadow-neutral-500 hover:bg-yellow-500 focus:outline-none "
                >
                  Submit
                </button>
              </>
            )}
            {currentIndex < questions.length - 1 ? (
              <>
                <button
                  onClick={handleNext}
                  className="rounded bg-yellow-400 px-6 py-2 text-sm font-medium text-white shadow-md shadow-neutral-500 hover:bg-yellow-500 focus:outline-none "
                >
                  <svg
                    className="h-6 w-6 fill-neutral-800"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      clipRule="evenodd"
                      strokeLinejoin="round"
                      strokeMiterlimit="2"
                      d="m13.022 14.999v3.251c0 .412.335.75.752.75.188 0 .375-.071.518-.206 1.775-1.685 4.945-4.692 6.396-6.069.2-.189.312-.452.312-.725 0-.274-.112-.536-.312-.725-1.451-1.377-4.621-4.385-6.396-6.068-.143-.136-.33-.207-.518-.207-.417 0-.752.337-.752.75v3.251h-9.02c-.531 0-1.002.47-1.002 1v3.998c0 .53.471 1 1.002 1z"
                      fillRule="nonzero"
                    />
                  </svg>
                </button>
              </>
            ) : (
              <button className="rounded bg-neutral-200 px-6 py-2 text-l font-medium text-neutral-800 shadow-md shadow-neutral-500">
                <svg
                  className="h-6 w-6 fill-neutral-800"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    clipRule="evenodd"
                    strokeLinejoin="round"
                    strokeMiterlimit="2"
                    d="m13.022 14.999v3.251c0 .412.335.75.752.75.188 0 .375-.071.518-.206 1.775-1.685 4.945-4.692 6.396-6.069.2-.189.312-.452.312-.725 0-.274-.112-.536-.312-.725-1.451-1.377-4.621-4.385-6.396-6.068-.143-.136-.33-.207-.518-.207-.417 0-.752.337-.752.75v3.251h-9.02c-.531 0-1.002.47-1.002 1v3.998c0 .53.471 1 1.002 1z"
                    fillRule="nonzero"
                  />
                </svg>
              </button>
            )}
            {/* <button
                onClick={() => setFinishQuiz(true)}
                className="rounded bg-yellow-400 px-6 py-2 text-l font-medium text-neutral-800 shadow-md shadow-neutral-500 hover:bg-yellow-500 focus:outline-none "
              >
                Submit
              </button> */}
          </div>
        </div>
        <br />
        <br />
        <button
          type="button"
          onClick={handleBack}
          data-te-ripple-init
          data-te-ripple-color="light"
          className="mb-6 inline-block w-full rounded bg-neutral-800 px-6 pt-2.5 pb-2 text-sm font-medium uppercase leading-normal text-white shadow-lg transition duration-150 ease-in-out hover:bg-neutral-900 hover:shadow-neutral-500 focus:outline-none focus:ring-0 active:bg-neutral-700"
        >
          Back
        </button>
      </div>
    )
  );
}

SingleQuiz.propTypes = {
  difficulty: PropTypes.string,
  setDifficulty: PropTypes.func,
  quizAmount: PropTypes.string,
  setQuizAmount: PropTypes.func,
};
