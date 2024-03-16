export const USERNAME_MIN_LENGTH = 3;
export const USERNAME_MAX_LENGTH = 30;
export const NAME_MIN_LENGTH = 1;
export const NAME_MAX_LENGTH = 30;
export const defaultAvatar = "https://f4.bcbits.com/img/0031181820_25.jpg";
export const PHONE_NUMBER = 10;
export const API_QUIZZES = "gVtXSAjjwt0fKhfFM7g89w==plCrtWo5C8k58YoY";

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

export const defaultQuizDifficultySamle = "easy";

export const difficultyOptionsSample = ['Easy', 'Medium', 'Hard'];

export const quizVisibilityOptions = ['Public', 'Private'];

export const quizAmountSample = ["5", "10", "15", "20"];

export const minimumQuizTitleLength = 3;

export const maximumQuizTitleLength = 30;

export const verificationCode = "1234";

export const navigationEducator = [
  { name: "Dashboard", href: "/dashboard-educators", current: true },
  { name: "Browse Quizzes", href: "/browse-quizzes", current: false },
  { name: "Sample Quiz", href: "/sample-quiz", current: false },
  { name: "Create Quiz", href: "/create-quiz", current: false },
  { name: "Create Room", href: "/create-room", current: false },
  { name: "Create Group", href: "/create-group", current: false },
];

export const navigationParticipant = [
  { name: "Dashboard", href: "/dashboard", current: true },
  { name: "Browse Quizzes", href: "/browse-quizzes", current: false },
  { name: "Sample Quiz", href: "/sample-quiz", current: false },
];

export const navigationAdmin = [
  { name: "Dashboard", href: "/dashboard-admin", current: false },
  { name: "Browse Quizzes", href: "/browse-quizzes", current: false },
  { name: "Sample Quiz", href: "/sample-quiz", current: false },
  { name: "Search", href: "/search", current: false },
]

export const navigationLogout = [
  { name: "Browse Quizzes", href: "/browse-quizzes", current: false },
  { name: "Sample Quiz", href: "/sample-quiz", current: false },
  { name: "Scoreboard", href: "/scoreboard", current: false },
];

export const usersSortingOptions = [
  { label: "Sort by Date (Z-A)", value: "dateDescending" },
  { label: "Sort by Date (A-Z)", value: "dateAscending" },
  { label: "Sort by Username (A-Z)", value: "usernameAscending" },
  { label: "Sort by Username (Z-A)", value: "usernameDescending" },
]

export const userSearchOptions = [
  { label: "Username", value: "username" },
  { label: "First Name", value: "firstName" },
  { label: "Last Name", value: "lastName" },
]

export const searchingOptions = [
  { label: "Users", value: "users" },
  { label: "Rooms", value: "rooms" },
  { label: "Groups", value: "groups" },
  { label: "Quizzes", value: "quizzes" }
]


export const defaultCoverRoom = "https://img.freepik.com/free-vector/students-watching-recorded-lecture-with-professor-talking-from-tablet_335657-319.jpg?w=2000&t=st=1709673381~exp=1709673981~hmac=098d5b7e2b7c71f82c62d71ce642b30cba6545c3afdd1049b43a7c44f4a0b8f7"

export const defaultCoverGroup = "https://images.datacamp.com/image/upload/v1655370004/shutterstock_580917865_b78f6bdc50.jpg"

export const roles = [
  { label: "Educator", value: "educator" },
  { label: "Student", value: "student" },
];