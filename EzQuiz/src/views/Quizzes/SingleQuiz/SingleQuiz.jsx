import "./SingleQuiz.css";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import Button from "../../../components/Button/Button";
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
    <div className="quiz-container">
      {questions.length !== 0 && (
        <>
          {id.length < 3 ? (
            <h2
              dangerouslySetInnerHTML={{
                __html: questions[currentIndex].category,
              }}
            />
          ) : (
            <h2> {category[0].name} </h2>
          )}
          <Timer expiryTimestamp={time} setFinishQuiz={setFinishQuiz} />
          <div className="question-container">
            <h3
              dangerouslySetInnerHTML={{
                __html: questions[currentIndex].question,
              }}
            />
            <form>
              <div className="answer-options">
                {questions[currentIndex].mixedAnswers.map(
                  (answer, answerIndex) => (
                    <label
                      key={answerIndex}
                      className="answer-option"
                      style={{
                        marginRight: "8px",
                        cursor: "pointer",
                        display: "block",
                        backgroundColor:
                          questions[currentIndex].selected_answerIndex ===
                          answerIndex
                            ? "grey"
                            : null,
                      }}
                      onClick={() =>
                        handleAnswerChange(currentIndex, answer, answerIndex)
                      }
                    >
                      <span dangerouslySetInnerHTML={{ __html: answer }} />
                    </label>
                  )
                )}
              </div>
            </form>
          </div>
          {currentIndex !== 0 && (
            <Button onClick={handlePrev}>Previous Question</Button>
          )}
          <span className="question-count">
            {currentIndex + 1} / {questions.length}
          </span>
          {currentIndex < questions.length - 1 ? (
            <Button onClick={handleNext}>Next Question</Button>
          ) : (
            <Button onClick={() => setFinishQuiz(true)}>Finish Quiz</Button>
          )}
        </>
      )}
      <Button onClick={handleBack}>Back</Button>
    </div>
  );
}

SingleQuiz.propTypes = {
  difficulty: PropTypes.string,
  setDifficulty: PropTypes.func,
  quizAmount: PropTypes.string,
  setQuizAmount: PropTypes.func,
};
