import { useEffect, useState } from "react";
import Button from "../Button/Button";
import PropTypes from "prop-types";
import { useNavigate } from "react-router";

export default function Score({ questions }) {

  const [showAnswers, setShowAnswers] = useState(false);
  const [score, setScore] = useState(0);

  const navigate = useNavigate()

  useEffect(() => {
    const correctAnswers = questions.filter((q) => q.selected_answer === q.correct_answer);
    setScore(correctAnswers.length * 10);
  }, []);

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
      <Button onClick={() => setShowAnswers(!showAnswers)}>
        View your answers
      </Button>
      <Button onClick={() => navigate(-1)}>
        Close
      </Button>
      {showAnswers &&
        questions.map((q, index) => (
          <div key={index}>
            <h3>{q.question}</h3>
            {q.mixedAnswers.map((a, indexA) => {
              return (
                <div
                  key={indexA}
                  className="answer-option"
                  style={{
                    backgroundColor: statusAnswers(index, a),
                  }}
                >
                  {a}
                </div>
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
