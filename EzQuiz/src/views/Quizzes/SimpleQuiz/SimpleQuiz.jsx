import { useEffect, useState } from "react";
import { defaultCategory, fetchQuizData } from "../../../constants/constants";
import "./SimpleQuiz.css";
import Categories from "../../../components/Categories/Categories";

export default function SimpleQuiz() {
  const [questions, setQuestions] = useState([]);
  const [error, setError] = useState(null);
  const [category, setCategory] = useState("Select Category");

  useEffect(() => {
    fetchQuizData(setQuestions, setError, category);
    console.log("render");
  }, [category]);

  const handleAnswerChange = (questionIndex, selectedAnswer) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].selectedAnswer = selectedAnswer;
    setQuestions(updatedQuestions);
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    category !== "Select Category" ? (
      <>
        <Categories setCategory={setCategory} />
        <div className="quiz-container">
          {questions.length !== 0 && (
            <h2 dangerouslySetInnerHTML={{ __html: questions[0].category }} />
          )}
          {questions.length !== 0 && questions[0].author && (
            <p>Created by {questions[0].author}</p>
          )}
          {questions.length !== 0 && questions[0].createdOn && (
            <p>
              Created on: {new Date(questions[0].createdOn).toLocaleString()}
            </p>
          )}
          {questions.map((q, index) => (
            <div key={index} className="question-container">
              <h3 dangerouslySetInnerHTML={{ __html: q.question }} />
              <form>
                <div className="answer-options">
                  {q.mixedAnswers.map((answer, answerIndex) => (
                    <label key={answerIndex} className="answer-option">
                      <input
                        type="radio"
                        value={answer}
                        checked={q.selectedAnswer === answer}
                        onChange={() => handleAnswerChange(index, answer)}
                      />
                      <span dangerouslySetInnerHTML={{ __html: answer }} />
                    </label>
                  ))}
                </div>
              </form>
            </div>
          ))}
        </div>
      </>
    ) : (
        <button onClick={() => setCategory(defaultCategory)}>Select Category</button>
    )
  );
}
