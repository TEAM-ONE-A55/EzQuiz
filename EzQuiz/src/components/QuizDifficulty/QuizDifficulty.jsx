import PropTypes from "prop-types";
import { useState } from "react";
import { difficultyOptionsSample } from "../../constants/constants";

export function QuizDifficulty({ setDifficulty }) {

  const [selectedDifficulty, setSelectedDifficulty] = useState("");

  const handleDifficultyChange = (e) => {
    setSelectedDifficulty(e.target.value);
    setDifficulty(e.target.value);
  };

  return (
    <div className="select-container">
      <select
        value={selectedDifficulty}
        onChange={(e) => handleDifficultyChange(e)}
      >
        {difficultyOptionsSample.map((value, index) => {
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

QuizDifficulty.propTypes = {
  setDifficulty: PropTypes.func,
};
