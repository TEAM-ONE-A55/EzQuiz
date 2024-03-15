import { useState, useEffect } from 'react';
import { getAllQuizzesFromDatabase } from '../../../services/quiz.service';
import SimpleQuiz from '../SimpleQuiz/SimpleQuiz';

export default function BrowseQuizzes() {
    const [quizzes, setQuizzes] = useState([]);
    const [change, setChange] = useState(0);

    useEffect(() => {
        getAllQuizzesFromDatabase('creator').then(setQuizzes);
    }, [change]);

    if (quizzes.length !== 0) {
        return (
            <div className="grid grid-cols-4 mt-16 max-w-screen-xl m-auto justify-items-center gap-y-16">
                {quizzes && quizzes.map((quiz) => (
                    <SimpleQuiz key={quiz.id} quiz={quiz} setChange={setChange} />
                ))}
            </div>
        )
    } else {
        return (
            <div className='max-w-screen-xl m-auto justify-items-center mt-28'>
                <h2 className="mb-4 font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-4xl dark:text-white">
                    No quizzes are available at the moment.<br />Please contact your organiser for further details.
                </h2>
            </div>
        )
    }
}

  