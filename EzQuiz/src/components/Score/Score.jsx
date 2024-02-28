import { useState } from "react";
import Button from "../Button/Button";
import PropTypes from "prop-types";

export default function Score({ score, answers, questions }) {
  console.log(answers);
  const [showAnswers, setShowAnswers] = useState(false);
  return (
    <div>
      <h1>
        Your score is {score} from {questions.length * 10}
      </h1>
      <Button onClick={() => setShowAnswers(!showAnswers)}>
        View your answers
      </Button>
      {showAnswers && <p>Test</p>}
    </div>
  );
}

Score.propTypes = {
  score: PropTypes.number,
  answers: PropTypes.instanceOf(Map),
  questions: PropTypes.array,
};
