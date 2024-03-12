import { useState, useEffect } from 'react';
import { getAllQuizzesFromDatabase } from '../../../services/quiz.service';
import SimpleQuiz from '../SimpleQuiz/SimpleQuiz';

export default function BrowseQuizzes() {
    const [quizzes, setQuizzes] = useState([]);

    useEffect(() => {
        getAllQuizzesFromDatabase('creator').then(setQuizzes);
    }, []);

    return (
        <div className="flex gap-10">
            {quizzes && quizzes.map((quiz) => (
                <SimpleQuiz key={quiz.id} quiz={quiz} />
            ))}
        </div>
    )
}

  