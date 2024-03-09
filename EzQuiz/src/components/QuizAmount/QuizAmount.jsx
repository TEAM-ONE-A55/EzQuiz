import { quizAmountSample } from "../../constants/constants";
import PropTypes from "prop-types";
import Select from "react-select";

export function QuizAmount({ setQuizAmount }) {

  return (
      <Select
        id="question-amount-dropdown-select"
        options={quizAmountSample.map((option) => {
            return { value: option, label: option };
        })}
        onChange={(e) => setQuizAmount(e.value)}
        className="basic-multi-select w-64 mx-auto"
      />
  );
}

QuizAmount.propTypes = {
  setQuizAmount: PropTypes.func,
};
