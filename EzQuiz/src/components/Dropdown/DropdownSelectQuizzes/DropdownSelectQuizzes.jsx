import Select from "react-select";
import PropTypes from "prop-types"

export default function DropdownSelectQuizzes({quizzes, selectedQuizzes, setSelectedQuizzes}) {

  const handleSelectedOptionsQuizzes = (selected) => {
    setSelectedQuizzes(selected);
  };

  return (
    <Select
      isMulti
      name="quizzes"
      options={quizzes.map((quiz) => quiz)}
      className="basic-multi-select"
      classNamePrefix="select"
      value={selectedQuizzes}
      onChange={handleSelectedOptionsQuizzes}
    />
  );
}

DropdownSelectQuizzes.propTypes = {
    quizzes: PropTypes.array,
    selectedQuizzes: PropTypes.array,
    setSelectedQuizzes: PropTypes.func
}