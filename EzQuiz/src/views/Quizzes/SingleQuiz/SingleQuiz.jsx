import "./SingleQuiz.css";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import Button from "../../../components/Button/Button";
import PropTypes from "prop-types";
import { fetchQuizData } from "../../../services/quiz-api.service";
import {
  defaultQuizAmountSample,
  defaultQuizDifficultySamle,
} from "../../../constants/constants";
import Score from "../../../components/Score/Score";
import Timer from "../../../components/Timer/Timer";

export default function SingleQuiz({
  difficulty,
  setDifficulty,
  quizAmount,
  setQuizAmount,
}) {
  const [questions, setQuestions] = useState([]);
  const [error, setError] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  // const [time, setTime] = useState(new Date())
  const [startTime, setStartTime] = useState(new Date().getTime());
  const [finishTime, setFinishTime] = useState({
    remainingMinutes: "",
    remainingSeconds: "",
  });

  // console.log(questions);

  const { id } = useParams();
  const navigate = useNavigate();
  const [finishQuiz, setFinishQuiz] = useState(false);

  useEffect(() => {
    //   fetchQuizData(
    //     setQuestions,
    //     setError,
    //     id,
    //     difficulty.toLowerCase(),
    //     quizAmount
    //   );
    //   // setStartTime(new Date().getTime())

    // }, []);

    const startTime = new Date().getTime(); // Store the start time when the component mounts

    fetchQuizData(
      setQuestions,
      setError,
      id,
      difficulty.toLowerCase(),
      quizAmount
    );

    // Return cleanup function
    return () => {
      // Calculate the remaining time
      const currentTime = new Date().getTime();
      const elapsedTime = currentTime - startTime;
      const remainingTime = quizAmount * 60 * 1000 - elapsedTime; // Convert quizAmount to milliseconds

      // Use the remainingTime value as needed
      const remainingMinutes = Math.floor(remainingTime / (1000 * 60));
      const remainingSeconds = Math.floor((remainingTime % (1000 * 60)) / 1000);
      setFinishTime({
        remainingMinutes: remainingMinutes,
        remainingSeconds: remainingSeconds,
      });
    };
  }, []);

  // useEffect(() => {
  //   () => {
  //     setFinishTime(new Date().getTime())
  //   }
  // })
  console.log(startTime);
  console.log(finishTime);

  const time = new Date();
  time.setMinutes(time.getMinutes() + +quizAmount);

  const handleAnswerChange = (questionIndex, selectedAnswer, answerIndex) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].selected_answer = selectedAnswer;
    updatedQuestions[questionIndex].selected_answerIndex = answerIndex;
    setQuestions(updatedQuestions);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => prev + 1);
  };

  if (error) {
    return <div>{error}</div>;
  }

  // console.log(startTime - finishTime)
  if (finishQuiz) {
    return <Score finishTime={finishTime} questions={questions} startTime={startTime} setFinishTime={setFinishTime} />;
  }

  const handleBack = () => {
    setQuizAmount(defaultQuizAmountSample);
    setDifficulty(defaultQuizDifficultySamle);
    return navigate(-1);
  };

  return (
    <>
      <div className="quiz-container">
        {questions.length !== 0 && (
          <>
            <h2
              dangerouslySetInnerHTML={{
                __html: questions[currentIndex].category,
              }}
            />
            <Timer expiryTimestamp={time} setFinish={setFinishQuiz} />
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
    </>
  );
}

SingleQuiz.propTypes = {
  difficulty: PropTypes.string,
  setDifficulty: PropTypes.func,
  quizAmount: PropTypes.string,
  setQuizAmount: PropTypes.func,
};
