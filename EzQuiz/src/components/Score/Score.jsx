import PropTypes from "prop-types";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { AppContext } from "../../context/AppContext";
import { updateUserData } from "../../services/user.service";
import { updateQuizWithKey } from "../../services/quiz.service";

export default function Score({ questions, finishTime, quiz, category }) {
  const { user, userData, setContext } = useContext(AppContext);
  const [showAnswers, setShowAnswers] = useState(false);
  const [score, setScore] = useState(0);

  const { id } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    const correctAnswers = questions.filter(
      (q) => q.selected_answer === q.correct_answer
    );
    setScore(correctAnswers.length * 10);
  }, []);

  useEffect(() => {
    if (user && userData && userData.role !== "educator") {
      if (userData.score) {
        updateUserData(userData.handle, "score", (userData.score += score));
      } else {
        updateUserData(userData.handle, "score", score);
      }

      if (id.length > 3 && userData.role === "student") {
        if (
          userData.participatedQuizzes &&
          !Object.keys(userData.participatedQuizzes).includes(id)
        ) {
          updateUserData(userData.handle, `participatedQuizzes/${id}`, {
            id: id,
            questions: questions,
            finishTime: finishTime,
            quiz: quiz,
            category: category,
          });
          userData.participatedQuizzes = {...userData.participatedQuizzes, [id]: {
            id: id,
            questions: questions,
            finishTime: finishTime,
            quiz: quiz,
            category: category,
          }}
          setContext(prev => prev, userData)
        } else if (!userData.participatedQuizzes) {
          updateUserData(userData.handle, `participatedQuizzes/${id}`, {
            id: id,
            questions: questions,
            finishTime: finishTime,
            quiz: quiz,
            category: category,
          });
          userData.participatedQuizzes = {...userData.participatedQuizzes, [id]: {
            id: id,
            questions: questions,
            finishTime: finishTime,
            quiz: quiz,
            category: category,
          }}
          setContext(prev => prev, userData)
        }
        const quizTakerData = {
          questions: questions,
          finishTime: finishTime,
          quiz: quiz,
          category: category,
          score: score,
          handle: userData.handle
        };
        if (
          quiz.quizTakers &&
          !Object.keys(quiz.quizTakers).includes(userData.hande)
        ) {
          updateQuizWithKey(id, `quizTakers/${userData.handle}`, quizTakerData);
        } else if (!quiz.quizTakers) {
          updateQuizWithKey(id, `quizTakers/${userData.handle}`, quizTakerData);
        }
      }
      // const quizTakerData = {
      //   questions: questions,
      //   finishTime: finishTime,
      //   quiz: quiz,
      //   category: category,
      //   score: score,
      //   handle: userData.handle
      // };
      // if (
      //   quiz.quizTakers &&
      //   !Object.keys(quiz.quizTakers).includes(userData.hande)
      // ) {
      //   updateQuizWithKey(id, `quizTakers/${userData.handle}`, quizTakerData);
      // } else if (!quiz.quizTakers) {
      //   updateQuizWithKey(id, `quizTakers/${userData.handle}`, quizTakerData);
      // }
    }
  }, [score]);

  const time = new Date(finishTime);
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();

  const statusAnswers = (index, a) => {
    if (
      questions[index].selected_answer === questions[index].correct_answer &&
      questions[index].selected_answer === a
    ) {
      return "#68D391";
    } else if (
      questions[index].selected_answer !== questions[index].correct_answer &&
      questions[index].selected_answer === a
    ) {
      return "#FC8181";
    }
    if (questions[index].correct_answer === a) {
      return "#E1E1E1";
    }
  };

  const scorePercent = ((+score / (questions.length * 10)) * 100).toFixed(2);

  return (
    <div className="m-32 min-w-lg">
      {quiz && category && (
        <>
          <h1 className="mb-6 mt-6 font-extrabold leading-none tracking-tight text-neutral-800 md:text-5xl lg:text-5xl">
            {quiz.title}
          </h1>
          <h1 className="mb-6 mt-6  leading-none tracking-tight text-neutral-800 md:text-2xl lg:text-2xl">
            Category: {category}
          </h1>
        </>
      )}
      <br />
      <div className=" w-2/4 bg-yellow-400 mx-auto min-w-lg rounded-xl p-8  shadow-neutral-500 shadow-inner">
        <h2 className="mb-6 mt-6 font-extrabold leading-none tracking-tight text-neutral-800 md:text-5xl lg:text-5xl">
          Your score is {score} from {questions.length * 10}
        </h2>
        <h3 className="mb-6 mt-6 leading-none tracking-tight text-neutral-800 md:text-2xl lg:text-2xl">
          {Object.values(quiz).length !== 0 &&
            (scorePercent >= +quiz.passingScore
              ? `Congratulations! You passed with a score of ${scorePercent}%.`
              : `You did not pass with score of ${scorePercent}%. To pass, you need a minimum of ${quiz.passingScore}% correct answers.`)}
        </h3>
      </div>
      <br />

      <p className="mb-6 mt-6 leading-none tracking-tight text-neutral-800 md:text-2xl lg:text-2xl">
        The quiz was completed in
        {seconds > 59
          ? minutes === 1
            ? ` ${minutes} minutes and ${seconds}.`
            : ` ${minutes} minutes and ${seconds}.`
          : ` ${seconds} seconds.`}
      </p>
      <br />
      <button
        type="button"
        onClick={() => setShowAnswers(!showAnswers)}
        data-te-ripple-init
        data-te-ripple-color="light"
        className="mb-6 inline-block w-2/4  rounded-lg bg-neutral-800 px-6 pt-2.5 pb-2 text-sm font-medium uppercase leading-normal text-white shadow-lg transition duration-150 ease-in-out hover:bg-neutral-900 hover:shadow-neutral-500 focus:outline-none focus:ring-0 active:bg-neutral-700"
      >
        View Your Answers
      </button>
      {showAnswers &&
        questions.map((q, index) => (
          <div className=" w-2/4 mx-auto" key={index}>
            <div className="block rounded-xl bg-neutral-100 p-16 text-surface shadow-neutral-500 shadow-lg m-12 mx-auto">
              <div className=" bg-neutral-100 mx-auto min-w-lg rounded-xl p-8  shadow-neutral-500 shadow-inner">
                <h3
                  dangerouslySetInnerHTML={{ __html: q.question }}
                  className=" text-neutral-800 text-2xl"
                />
              </div>
              {q.mixedAnswers.map((a, indexA) => {
                return (
                  <div
                    key={indexA}
                    className="answer-option m-2 text-lg rounded-xl bg-neutral-100 p-4 text-neutral-800  shadow-neutral-500 shadow-inner focus:outline-none"
                    style={{
                      backgroundColor: statusAnswers(index, a),
                    }}
                    dangerouslySetInnerHTML={{ __html: a }}
                  />
                );
              })}
            </div>
          </div>
        ))}
      <br />
      <button
        type="button"
        onClick={() => navigate(-1)}
        data-te-ripple-init
        data-te-ripple-color="light"
        className="mb-6 inline-block w-2/4  rounded-lg bg-neutral-50 px-6 pt-2.5 pb-2 text-sm font-medium uppercase leading-normal text-neutral-600 shadow-lg transition duration-150 ease-in-out  focus:outline-none focus:ring-0"
      >
        Close
      </button>
    </div>
  );
}

Score.propTypes = {
  questions: PropTypes.array,
  finishTime: PropTypes.number,
  quiz: PropTypes.object,
  category: PropTypes.string,
};
