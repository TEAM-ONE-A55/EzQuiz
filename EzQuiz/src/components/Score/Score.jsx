import { useContext, useEffect, useState } from "react";
import Button from "../Button/Button";
import PropTypes from "prop-types";
import { useNavigate } from "react-router";
import { AppContext } from "../../context/AppContext";
import { updateUserData } from "../../services/user.service";

export default function Score({ questions, startTime, setFinishTime, finishTime }) {
  const { user, userData } = useContext(AppContext);
  const [showAnswers, setShowAnswers] = useState(false);
  const [score, setScore] = useState(0)

  const navigate = useNavigate();

  useEffect(() => {
    const correctAnswers = questions.filter(
      (q) => q.selected_answer === q.correct_answer
    );
    setScore(correctAnswers.length * 10);
    // setTime(timeLeft);
  }, []);

  // console.log(time);
  console.log(userData)

  useEffect(() => {
    if (user && userData && userData.role !== "educator") {
      if (userData.score) {
        updateUserData(userData.handle, "score", (userData.score += score));
      } else {
        updateUserData(userData.handle, "score", score);
      }
    }
  }, [score]);

  useEffect(() => {
    const currentTime = new Date().getTime();
      const elapsedTime = currentTime - startTime;
      const remainingTime = questions.length * 60 * 1000 - elapsedTime; // Convert quizAmount to milliseconds

      // Use the remainingTime value as needed
      const remainingMinutes = Math.floor(remainingTime / (1000 * 60));
      const remainingSeconds = Math.floor((remainingTime % (1000 * 60)) / 1000);
      setFinishTime({
        remainingMinutes: remainingMinutes,
        remainingSeconds: remainingSeconds,
      });

  }, [])

  const statusAnswers = (index, a) => {
    if (
      questions[index].selected_answer === questions[index].correct_answer &&
      questions[index].selected_answer === a
    ) {
      return "green";
    } else if (
      questions[index].selected_answer !== questions[index].correct_answer &&
      questions[index].selected_answer === a
    ) {
      return "#9a1515";
    }
    if (questions[index].correct_answer === a) {
      return "#284632";
    }
  };

  return (
    <div>
      <h1>
        Your score is {score} from {questions.length * 10}
      </h1>
      <p>Best time: {finishTime.remainingMinutes} minutes {finishTime.remainingSeconds} seconds</p>
      <Button onClick={() => setShowAnswers(!showAnswers)}>
        View your answers
      </Button>
      <Button onClick={() => navigate(-1)}>Close</Button>
      {showAnswers &&
        questions.map((q, index) => (
          <div key={index}>
            <h3 dangerouslySetInnerHTML={{ __html: q.question }} />
            {q.mixedAnswers.map((a, indexA) => {
              return (
                <div
                  key={indexA}
                  className="answer-option"
                  style={{
                    backgroundColor: statusAnswers(index, a),
                  }}
                  dangerouslySetInnerHTML={{ __html: a }}
                />
              );
            })}
          </div>
        ))}
    </div>
  );
}

Score.propTypes = {
  questions: PropTypes.array,
};
