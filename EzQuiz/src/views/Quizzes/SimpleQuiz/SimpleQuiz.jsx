import { useContext } from "react";
import { useNavigate } from 'react-router';
import simpleQuizImage from '../../../images/simple-quiz.jpg';
import PropTypes from 'prop-types';
import DeleteQuiz from '../DeleteQuiz/DeleteQuiz';
import { AppContext } from "../../../context/AppContext";

export default function SimpleQuiz({ quiz, setChange, hubType, hubId }) {
    const navigate = useNavigate();
    const { user, userData } = useContext(AppContext);

    return (
        <div className=" bg-gray-50 w-64 rounded-xl flex-col h-96 relative shadow-black shadow-xl">
                <img className=" w-64 h-36 object-cover border-none  rounded-t-xl" src={simpleQuizImage} alt="quiz" />
                <div className="p-4 text-black flex flex-col justify-center items-center">
                    <h2 className="text-xl font-semibold">{quiz.title}</h2>
                    <p className=" text-gray-800 text-xs">By {quiz.creator}</p>
                    <p className="text-sm text-neutral-500">A simple quiz with multiple choice questions</p>
                    <button
                        className=" bg-gray-50 border-amber-500 border-2 text-gray-700 hover:text-white font-semibold text-sm rounded-md max-w-32 px-4 py-2 duration-75 ease-in-out hover:bg-amber-500"
                        onClick={() => navigate(`/sample-quiz/${quiz.id}`)}
                        >Take</button>
                    {user && userData.handle === quiz.creator &&
                        <DeleteQuiz id={quiz.id} handle={quiz.creator} setChange={setChange} hubType={hubType} hubId={hubId}/>}
                </div>
        </div>
    )
}

SimpleQuiz.propTypes = {
    quiz: PropTypes.object.isRequired,
    setChange: PropTypes.func.isRequired,
    hubType: PropTypes.string,
    hubId: PropTypes.string
}