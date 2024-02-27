import PropTypes from "prop-types";
import { useState } from "react";
import { quizAmountSample } from "../../constants/constants";

export function QuizAmount({ setQuizAmount }) {

  const [selectedQuizAmount, setSelectedQuizAmount] = useState("");

  const handleQuizAmountChange = (e) => {
    setSelectedQuizAmount(e.target.value);
    setQuizAmount(e.target.value);
  };

  return (
    <div className="select-container">
      <select
        value={selectedQuizAmount}
        onChange={(e) => handleQuizAmountChange(e)}
      >
        {quizAmountSample.map((value, index) => {
          return (
            <option value={value} key={index}>
              {value}
            </option>
          );
        })}
      </select>
    </div>
  );
}

QuizAmount.propTypes = {
  setQuizAmount: PropTypes.func,
};
