export const USERNAME_MIN_LENGTH = 3;
export const USERNAME_MAX_LENGTH = 30;
export const NAME_MIN_LENGTH = 1;
export const NAME_MAX_LENGTH = 30;
export const defaultAvatar = "https://f4.bcbits.com/img/0031181820_25.jpg";
export const PHONE_NUMBER = 10;
export const API_QUIZZES = "gVtXSAjjwt0fKhfFM7g89w==plCrtWo5C8k58YoY";

// export const quizzesEasy = [
//   "https://opentdb.com/api.php?amount=20&category=10&difficulty=easy&type=multiple",
//   "https://opentdb.com/api.php?amount=20&category=9&difficulty=easy&type=multiple",
//   "https://opentdb.com/api.php?amount=20&category=11&difficulty=easy&type=multiple",
//   "https://opentdb.com/api.php?amount=20&category=12&difficulty=easy&type=multiple",
//   "https://opentdb.com/api.php?amount=20&category=15&difficulty=easy&type=multiple",
//   "https://opentdb.com/api.php?amount=10&category=16&difficulty=easy&type=multiple",
//   "https://opentdb.com/api.php?amount=100&category=17&difficulty=easy&type=multiple",
//   "https://opentdb.com/api.php?amount=30&category=18&difficulty=easy&type=multiple",
//   "https://opentdb.com/api.php?amount=8&category=19&difficulty=easy&type=multiple",
//   "https://opentdb.com/api.php?amount=14&category=20&difficulty=easy&type=multiple",
//   "https://opentdb.com/api.php?amount=40&category=21&difficulty=easy&type=multiple",
//   "https://opentdb.com/api.php?amount=150&category=22&difficulty=easy&type=multiple",
//   "https://opentdb.com/api.php?amount=100&category=23&difficulty=easy&type=multiple",
//   "https://opentdb.com/api.php?amount=7&category=24&difficulty=easy&type=multiple",
//   "https://opentdb.com/api.php?amount=10&category=25&difficulty=easy&type=multiple",
//   "https://opentdb.com/api.php?amount=10&category=26&difficulty=easy&type=multiple",
//   "https://opentdb.com/api.php?amount=10&category=27&difficulty=easy&type=multiple",
//   "https://opentdb.com/api.php?amount=10&category=28&difficulty=easy&type=multiple",
//   "https://opentdb.com/api.php?amount=10&category=29&difficulty=easy&type=multiple",
//   "https://opentdb.com/api.php?amount=10&category=30&difficulty=easy&type=multiple",
// ];

export const getCategoryURL = (category, difficulty, amount) => {
  return `https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=multiple`;
};

// export const getRandomUrl = (urlList) => {
//   const randomIndex = Math.floor(Math.random() * urlList.length);
//   return urlList[randomIndex];
// };

export const API_CATEGORIES = "https://opentdb.com/api_category.php";

export const defaultCategorySample = "9";

export const defaultQuizAmountSample = "5";

export const defaultQuizDifficultySamle = "easy"

export const difficultyOptionsSample = ['Easy', 'Medium', 'Hard']

export const quizAmountSample = [5, 10, 15, 20]

export const navigationEducator = [
  { name: "Dashboard", href: "/educator-dashboard", current: true },
  { name: "Browse Quizzes", href: "/browse-quizzes", current: false },
  { name: "My Rooms", href: "/my-rooms", current: false },
  { name: "My Quizzes", href: "/my-quizzes", current: false },
  { name: "Create Room", href: "/create-room", current: false },
  { name: "Create Quiz", href: "/create-quiz", current: false },
];

export const navigationParticipant = [
  { name: "Dashboard", href: "/educator-dashboard", current: true },
  { name: "Browse Quizzes", href: "/browse-quizzes", current: false },
  { name: "Sample Quiz", href: "/sample-quiz", current: false },
  { name: "My Rooms", href: "/my-rooms", current: false },
  { name: "Scoreboard", href: "/scoreboard", current: false },
];

export const navigationLogout = [
  { name: "Browse Quizzes", href: "/browse-quizzes", current: false },
  { name: "Sample Quiz", href: "/sample-quiz", current: false },
  { name: "Scoreboard", href: "/scoreboard", current: false },
];