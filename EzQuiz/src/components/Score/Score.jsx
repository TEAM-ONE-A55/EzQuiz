import Button from "../Button/Button";
import PropTypes from "prop-types";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { AppContext } from "../../context/AppContext";
import { updateUserData } from "../../services/user.service";

export default function Score({
  questions,
  finishTime,
}) {
  const { user, userData } = useContext(AppContext);
  const [showAnswers, setShowAnswers] = useState(false);
  const [score, setScore] = useState(0);

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
    }
  }, [score]);

  const time = new Date(finishTime)
  const minutes = time.getMinutes()
  const seconds = time.getSeconds()

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
      <p>Best time: {minutes} : {seconds}</p>
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
  finishTime: PropTypes.number
};
