import { useState, useEffect } from 'react';
import { getAllQuizzesFromDatabase } from '../../../services/quiz.service';
import SimpleQuiz from '../SimpleQuiz/SimpleQuiz';

export default function BrowseQuizzes() {
    const [quizzes, setQuizzes] = useState([]);
    const [change, setChange] = useState(0);

    useEffect(() => {
        getAllQuizzesFromDatabase('creator').then(setQuizzes);
    }, [change]);

    return (
        <div className="grid grid-cols-4 mt-16 max-w-screen-xl m-auto justify-items-center gap-y-16">
            {quizzes && quizzes.map((quiz) => (
                <SimpleQuiz key={quiz.id} quiz={quiz} setChange={setChange} />
            ))}
        </div>
    )
}

  