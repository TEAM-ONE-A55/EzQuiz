import { reactSelectStyles } from "../../services/react-select-styles";
import { difficultyOptionsSample } from "../../constants/constants";
import PropTypes from "prop-types";
import Select from "react-select";

export function QuizDifficulty({ setDifficulty }) {
  return (
      <Select
        id="difficulty-dropdown-select"
        options={difficultyOptionsSample.map((option) => {
            return { value: option, label: option };
        })}
        onChange={(e) => setDifficulty(e.value.toLowerCase())}
        className="basic-multi-select w-64 mx-auto"
        styles={reactSelectStyles}
      />
  );
}

QuizDifficulty.propTypes = {
  setDifficulty: PropTypes.func,
};
