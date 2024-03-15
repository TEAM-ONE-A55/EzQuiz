import PropTypes from "prop-types";
import { deleteQuizFromDatabase } from "../../../services/quiz.service";

export default function DeleteQuiz({ id, handle, setChange, hubType, hubId }) {
    return (
        <button 
        className=" bg-red-400 font-semibold text-white text-sm rounded-md max-w-32 px-4 py-2 duration-75 ease-in-out hover:bg-red-500"
        onClick={() => {
            deleteQuizFromDatabase(id, handle, hubType, hubId);
            setChange((prev) => prev + 1);
            }}>
            Delete
        </button>
    )
}

DeleteQuiz.propTypes = {
    id: PropTypes.string.isRequired,
    handle: PropTypes.string.isRequired,
    setChange: PropTypes.func.isRequired,
    hubType: PropTypes.string,
    hubId: PropTypes.string
}