import "./SingleQuiz.css";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import Button from "../../../components/Button/Button";
import PropTypes from "prop-types";
import { fetchQuizData } from "../../../services/quiz-api.service";
import { defaultQuizAmountSample, defaultQuizDifficultySamle } from "../../../constants/constants";

export default function SingleQuiz({ difficulty, setDifficulty, quizAmount, setQuizAmount }) {

  const [questions, setQuestions] = useState([]);
  const [error, setError] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const { id } = useParams();
  const navigate = useNavigate()
  // const [complete, setComplete] = useState(null);

  useEffect(() => {
    fetchQuizData(
      setQuestions,
      setError,
      id,
      difficulty.toLowerCase(),
      quizAmount
    );
  }, []);

  const handleAnswerChange = (questionIndex, selectedAnswer) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].selectedAnswer = selectedAnswer;
    setQuestions(updatedQuestions);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => prev + 1);
  };
  if (error) {
    return <div>{error}</div>
  }

  const handleBack = () => {
    setQuizAmount(defaultQuizAmountSample)
    setDifficulty(defaultQuizDifficultySamle)
    return navigate(-1)
  }

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
                      <label key={answerIndex} className="answer-option">
                        <input
                          type="radio"
                          value={answer}
                          checked={
                            questions[currentIndex].selectedAnswer === answer
                          }
                          onChange={() => handleAnswerChange(answer)}
                        />
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
              <Button onClick={() => {}}>Finish Quiz</Button>
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
  setQuizAmount: PropTypes.func
};
