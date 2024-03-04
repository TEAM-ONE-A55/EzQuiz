export const getRank = (score) => {
    if (score < 100) {
        return 'Novice Learner';
    } else if (score < 200) {
        return "Apprentice Quizzer";
    } else if (score < 300) {
        return "Knowledge Seeker";
    } else if (score < 400) {
        return "Quiz Enthusiast";
    } else if (score < 500) {
        return "Quiz Master";
    } else if (score < 600) {
        return "Quiz Wizard";
    } else if (score < 700) {
        return "Scholarly Quizzer";
    } else if (score < 800) {
        return "Quiz Expert";
    } else if (score < 900) {
        return "Quiz Virtuoso";
    } else if (score >= 900) {
        return "Quiz Champion";
    } else {
        return "";
    }
}