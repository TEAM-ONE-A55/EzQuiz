import PropTypes from "prop-types";

export default function NewOption({ indexQ, indexO, handleChange, removeOption}) {
    return (
        <div key={indexO}>
            <label htmlFor={`create-quiz-option-${indexO}`}>
            Option {indexO + 1}*
            </label>
            <br />
            <input
            id={`create-quiz-option-${indexO}`}
            type="text"
            onChange={(e) =>
                handleChange("option", e.target.value, indexQ, indexO)
            }
            />
            <br />
            <button onClick={() => removeOption(indexQ, indexO)}>
            Remove Option
            </button>
        </div>
    )
}

NewOption.propTypes = {
    indexQ: PropTypes.number,
    indexO: PropTypes.number,
    handleChange: PropTypes.func,
    removeOption: PropTypes.func,
};