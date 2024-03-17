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

export const API_CATEGORIES = "https://opentdb.com/api_category.php";

export const defaultCategorySample = "9";

export const defaultQuizAmountSample = "5";

export const defaultQuizDifficultySamle = "easy";

export const difficultyOptionsSample = ["Easy", "Medium", "Hard"];

export const quizVisibilityOptions = ["Public", "Private"];

export const quizAmountSample = ["5", "10", "15", "20"];

export const minQuizTitleLength = 3;

export const maxQuizTitleLength = 60;

export const minQuizTimeLimit = 1;

export const maxQuizTimeLimit = 60;

export const minQuizPassingScore = 1;

export const maxQuizPassingScore = 100;

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
];

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
];

export const userSearchOptions = [
  { label: "Username", value: "username" },
  { label: "First Name", value: "firstName" },
  { label: "Last Name", value: "lastName" },
];

export const searchingOptions = [
  { label: "Users", value: "users" },
  { label: "Rooms", value: "rooms" },
  { label: "Groups", value: "groups" },
  { label: "Quizzes", value: "quizzes" },
];

export const defaultCoverRoom =
  "https://images.squarespace-cdn.com/content/v1/59ef2d3c9f8dce981401a30d/1592002341643-UCT10ZFLQ5GCJU8L1OVY/colorful+landscapes.jpg";

export const defaultCoverGroup =
  "https://www.photographytalk.com/images/articles/2017/09/18/articles/2017_8/iStock-476111648-min.jpg";

export const roles = [
  { label: "Educator", value: "educator" },
  { label: "Student", value: "student" },
];

export const testimonals = [
  {
    name: "Ivan Gospodinov",
    role: "Geography Teacher",
    description:
      `As a geography teacher, I've struggled to find engaging resources that truly capture my students' attention. That's until I discovered this platform. It has revolutionized the way I teach, offering a vast library of quizzes and interactive content that makes learning geography fun and memorable for my students. 
      With this platform, I've witnessed remarkable improvements in my students' comprehension and enthusiasm for geography.`,
    image:
      "https://www.budget.nsw.gov.au/sites/default/files/202309-Daniel-Mookhey-portrait-square.jpg",
  },
  {
    name: "Hristo Serafimov",
    role: "Student",
    description:
      "I can't express enough how much this platform has helped me in my studies. As a student, I often find traditional learning methods boring and ineffective. However, with this platform, learning has become a breeze. The quizzes are not only informative but also interactive, allowing me to test my knowledge in a fun and engaging way. Thanks to this platform, I've seen a significant improvement in my grades.",
    image:
      "https://images.ctfassets.net/xjankvru4bwy/3TeRQIjGOt1OAPqupefsyL/8a289f76ce1483be0003fccb335103de/Brendan_Salisbury-US_Student-square.jpeg",
  },
  {
    name: "Anna Karaivanova",
    role: "Recruiter",
    description:
      "As a recruiter, I'm always on the lookout for candidates who possess a strong understanding of various subjects. This platform has become my go-to resource for identifying top talent. The quizzes provided here allow me to assess candidates' knowledge and skills accurately, enabling me to make informed hiring decisions. I highly recommend this platform to any recruiter looking to streamline their hiring process.",
    image:
      "https://www.telegraph.co.uk/content/dam/news/2022/05/04/TELEMMGLPICT000294873210_trans_NvBQzQNjv4BqqVzuuqpFlyLIwiB6NTmJwWPw2b5__oFarkj5WlWIJuI.jpeg?imwidth=480",
  },
];
