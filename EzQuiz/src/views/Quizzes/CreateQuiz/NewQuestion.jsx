import PropTypes from "prop-types";
import NewOption from "./NewOption";
import Select from "react-select";

export default function NewQuestion({ quiz, question, indexQ, indexO, handleChange, addOption, removeOption, setCorrectAnswer, removeQuestion }) {
    return (
        <div key={indexQ}>
            <h4>Question {indexQ + 1}</h4>
            <label htmlFor={`create-quiz-question-${indexQ}`}>
                Question {indexQ + 1} Title*
            </label>
            <br />
            <input
                id={`create-quiz-question-${indexQ}`}
                type="text"
                value={question.question}
                onChange={(e) => handleChange("question", e.target.value, indexQ)}
            />
            <br />
            <button onClick={() => addOption(indexQ)}>New Option</button>
            <br />
            {question.mixedAnswers.map((option, indexO) => <NewOption key={indexO} indexQ={indexQ} indexO={indexO} handleChange={handleChange} removeOption={removeOption} />)}

            <p>Choose correct answer*</p>
            <Select
                id="question-amount-dropdown-select"
                options={quiz.questions[indexQ].incorrect_answers.map((option) => {
                    return { value: option, label: option };
                })}
                onChange={(e) => setCorrectAnswer(indexQ, e.value)}
                className="basic-multi-select w-64 mx-auto"
            />
            <button onClick={() => removeQuestion(indexQ)}>
                Remove Question
            </button>
        </div>
    );
}

NewQuestion.propTypes = {
    quiz: PropTypes.object,
    question: PropTypes.object,
    indexQ: PropTypes.number,
    indexO: PropTypes.number,
    handleChange: PropTypes.func,
    removeOption: PropTypes.func,
    addOption: PropTypes.func,
    setCorrectAnswer: PropTypes.func,
    removeQuestion: PropTypes.func,
};