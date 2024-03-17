import toast from "react-hot-toast";
import { uploadQuizToDatabase } from "../../../services/quiz.service";
import { minQuizTitleLength, maxQuizTitleLength,
         minQuizPassingScore, maxQuizPassingScore,
         minQuizTimeLimit, maxQuizTimeLimit } from "../../../constants/constants";


export const submitQuiz = async (quiz, allQuizTitles, navigate) => {
    if(!quiz.title) return toast.error("Please enter a title for the quiz");
    if(quiz.title.length < minQuizTitleLength) return toast.error("Title must be at least 3 characters long");
    if(quiz.title.length > maxQuizTitleLength) return toast.error("Title must be at most 30 characters long");
    if(allQuizTitles.includes(quiz.title)) return toast.error("A quiz with this title already exists");
    if(!quiz.visibility) return toast.error("Please choose a visibility for the quiz");
    if(!quiz.category) return toast.error("Please choose a category for the quiz");
    if(!quiz.difficulty) return toast.error("Please choose a difficulty for the quiz");
    if(!quiz.timeLimit) return toast.error("Please enter a time limit for the quiz");
    if(quiz.timeLimit < minQuizTimeLimit) return toast.error("Time limit must be at least 1 minute");
    if(quiz.timeLimit > maxQuizTimeLimit) return toast.error("Time limit must be at most 60 minutes");
    if(!quiz.passingScore) return toast.error("Please enter a passing score for the quiz");
    if(quiz.passingScore < minQuizPassingScore) return toast.error("Passing score must be at least 1%");
    if(quiz.passingScore > maxQuizPassingScore) return toast.error("Passing score must be at most 100%");
    if(!quiz.startDate) return toast.error("Please enter a start date for the quiz");
    if(!quiz.endDate) return toast.error("Please enter an end date for the quiz");
    if(new Date(quiz.startDate) >= new Date(quiz.endDate)) return toast.error("Start date must be before end date");
    if(quiz.questions.length < 1) return toast.error("Please add at least one question to the quiz");
    let qerror = '';
    quiz.questions.forEach((q, i) => {
      if(!q.question) {
        qerror = `Please enter a title for question ${i + 1}`;
        return;
      }
      if(q.question.length < minQuizTitleLength) {
        qerror = `Title for question ${i + 1} must be at least 3 characters long`;
        return;
      }
      if(q.question.length > maxQuizTitleLength) {
        qerror = `Title for question ${i + 1} must be at most 30 characters long`;
        return;
      }
      if (q.mixedAnswers.includes('')) {
        qerror = `Please fill out all options for question ${i + 1}`;
        return;
      }
      if (!q.correct_answer) {
        qerror = `Please choose a correct answer for question ${i + 1}`;
        return;
      }
      if(!q.mixedAnswers.includes(q.correct_answer)) {
        qerror = `Please choose a valid correct answer for question ${i + 1}`;
        return;
      }
    });
    if(qerror) return toast.error(qerror);
    await uploadQuizToDatabase(JSON.parse(JSON.stringify(quiz)));
    navigate(-1);
}