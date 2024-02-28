import { getCategoryURL } from "../constants/constants";
import { shuffleArray } from "./helper";

export const fetchQuizData = (
  setQuestions,
  setError,
  category = 9,
  difficulty = "easy",
  amount = 5
) => {
  const url = getCategoryURL(category, difficulty, amount);

  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      let shuffledQuestions = [];

      if (data.results.length <= amount) {
        shuffledQuestions = data.results.map((question) => {
          const mixedAnswers = shuffleArray([
            ...question.incorrect_answers,
            question.correct_answer,
          ]);
          return { ...question, mixedAnswers };
        });
      } else {
        const shuffledData = shuffleArray(data.results);
        shuffledQuestions = shuffledData.slice(0, amount).map((question) => {
          const mixedAnswers = shuffleArray([
            ...question.incorrect_answers,
            question.correct_answer,
          ]);
          return { ...question, mixedAnswers };
        });
      }

      setQuestions(shuffledQuestions);
    })
    .catch((error) => {
      if (error instanceof TypeError) {
        setError("There was a problem connecting to the server.");
      } else {
        console.error("API Rate Limit Exceeded:", error.message);
      }
    });
};
