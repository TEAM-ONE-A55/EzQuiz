import { reactSelectStyles } from "../../services/react-select-styles";
import { difficultyOptionsSample } from "../../constants/constants";
import PropTypes from "prop-types";
import Select from "react-select";

export function QuizDifficulty({ setDifficulty, initialValue = ""}) {
  const label = initialValue.split(" ").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
  if (initialValue) {return (
      <Select
        value={{ value: initialValue, label: label }}
        options={difficultyOptionsSample.map((option) => {
            return { value: option, label: option };
        })}
        onChange={(e) => setDifficulty(e.value.toLowerCase())}
        className="basic-multi-select w-64 mx-auto"
        styles={reactSelectStyles}
      />
  )} else {
    return (
      <Select
        options={difficultyOptionsSample.map((option) => {
            return { value: option, label: option };
        })}
        onChange={(e) => setDifficulty(e.value)}
        className="basic-multi-select w-64 mx-auto"
        styles={reactSelectStyles}
      />
    )
  }
}

QuizDifficulty.propTypes = {
  initialValue: PropTypes.string,
  setDifficulty: PropTypes.func,
};
