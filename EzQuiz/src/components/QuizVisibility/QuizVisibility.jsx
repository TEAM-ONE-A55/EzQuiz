import { quizVisibilityOptions } from "../../constants/constants";
import PropTypes from "prop-types";
import Select from "react-select";

export default function QuizVisibility({ setVisibility }) {

  return (
      <Select
        id="visibility-dropdown-select"
        options={quizVisibilityOptions.map((option) => {
            return { value: option, label: option };
        })}
        onChange={(e) => setVisibility(e.value.toLowerCase())}
        className="basic-multi-select w-64 mx-auto"
      />
  );
}

QuizVisibility.propTypes = {
  setVisibility: PropTypes.func,
};
