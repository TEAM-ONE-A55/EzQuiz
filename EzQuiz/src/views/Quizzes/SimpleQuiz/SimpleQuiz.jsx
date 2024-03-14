import { useNavigate } from 'react-router';
import simpleQuizImage from '../../../images/simple-quiz.jpg';
import PropTypes from 'prop-types';
import DeleteQuiz from '../DeleteQuiz/DeleteQuiz';

export default function SimpleQuiz({ quiz, setChange }) {
    const navigate = useNavigate();

    return (
        <div className=" bg-gray-50 max-w-56 rounded-xl mt-16 flex-col m-0 min-h-96 relative">
                <img className=" w-56 h-32 object-cover border-none  rounded-t-xl" src={simpleQuizImage} alt="" />
                <div className="p-4 text-black flex flex-col justify-center items-center">
                    <h2 className="text-xl font-semibold">{quiz.title}</h2>
                    <p className=" text-gray-800 text-xs">By {quiz.creator}</p>
                    <p className="text-sm text-neutral-500">A simple quiz with multiple choice questions</p>
                    <button
                        className=" bg-amber-500 text-white text-sm rounded-md max-w-32 px-4 py-2 duration-75 ease-in-out hover:bg-amber-600"
                        onClick={() => navigate(`/sample-quiz/${quiz.id}`)}
                        >Take Quiz</button>
                    <DeleteQuiz id={quiz.id} handle={quiz.creator} setChange={setChange}/>
                </div>
        </div>
    )
}

SimpleQuiz.propTypes = {
    quiz: PropTypes.object.isRequired,
    setChange: PropTypes.func.isRequired
}