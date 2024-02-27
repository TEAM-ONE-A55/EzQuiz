export const USERNAME_MIN_LENGTH = 3;
export const USERNAME_MAX_LENGTH = 30;
export const NAME_MIN_LENGTH = 1;
export const NAME_MAX_LENGTH = 30;
export const defaultAvatar = "https://f4.bcbits.com/img/0031181820_25.jpg";
export const PHONE_NUMBER = 10;
export const API_QUIZZES = "gVtXSAjjwt0fKhfFM7g89w==plCrtWo5C8k58YoY";
export const EntertainmentBooks =
  "https://opentdb.com/api.php?amount=20&category=10&difficulty=easy&type=multiple";
export const quizzesEasy = [
  "https://opentdb.com/api.php?amount=20&category=10&difficulty=easy&type=multiple",
  "https://opentdb.com/api.php?amount=20&category=9&difficulty=easy&type=multiple",
  "https://opentdb.com/api.php?amount=20&category=11&difficulty=easy&type=multiple",
  "https://opentdb.com/api.php?amount=20&category=12&difficulty=easy&type=multiple",
  "https://opentdb.com/api.php?amount=20&category=15&difficulty=easy&type=multiple",
  "https://opentdb.com/api.php?amount=10&category=16&difficulty=easy&type=multiple",
  "https://opentdb.com/api.php?amount=100&category=17&difficulty=easy&type=multiple",
  "https://opentdb.com/api.php?amount=30&category=18&difficulty=easy&type=multiple",
  "https://opentdb.com/api.php?amount=8&category=19&difficulty=easy&type=multiple",
  "https://opentdb.com/api.php?amount=14&category=20&difficulty=easy&type=multiple",
  "https://opentdb.com/api.php?amount=40&category=21&difficulty=easy&type=multiple",
  "https://opentdb.com/api.php?amount=150&category=22&difficulty=easy&type=multiple",
  "https://opentdb.com/api.php?amount=100&category=23&difficulty=easy&type=multiple",
  "https://opentdb.com/api.php?amount=7&category=24&difficulty=easy&type=multiple",
  "https://opentdb.com/api.php?amount=10&category=25&difficulty=easy&type=multiple",
  "https://opentdb.com/api.php?amount=10&category=26&difficulty=easy&type=multiple",
  "https://opentdb.com/api.php?amount=10&category=27&difficulty=easy&type=multiple",
  "https://opentdb.com/api.php?amount=10&category=28&difficulty=easy&type=multiple",
  "https://opentdb.com/api.php?amount=10&category=29&difficulty=easy&type=multiple",
  "https://opentdb.com/api.php?amount=10&category=30&difficulty=easy&type=multiple",
];

export const getCategoryURL = (category, difficulty = "easy", amount = 5) => {
  return `https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=multiple`;
};

export const getRandomUrl = (urlList) => {
  const randomIndex = Math.floor(Math.random() * urlList.length);
  return urlList[randomIndex];
};

export const shuffleArray = (array) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

export const fetchQuizData = (setQuestions, setError, category = 9) => {
  const url = getCategoryURL(category);

  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      let shuffledQuestions = [];

      if (data.results.length <= 5) {
        shuffledQuestions = data.results.map((question) => {
          const mixedAnswers = shuffleArray([
            ...question.incorrect_answers,
            question.correct_answer,
          ]);
          return { ...question, mixedAnswers };
        });

      } else {
        const shuffledData = shuffleArray(data.results);
        shuffledQuestions = shuffledData.slice(0, 5).map((question) => {
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

export const API_CATEGORIES = "https://opentdb.com/api_category.php";
export const defaultCategory = 9;