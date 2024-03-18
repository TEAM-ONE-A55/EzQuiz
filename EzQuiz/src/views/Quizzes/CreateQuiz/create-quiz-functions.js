import toast from "react-hot-toast";
import { Question } from "./questionClass";
import { uploadQuizToDatabase, updateQuizInDatabase } from "../../../services/quiz.service";
import { minQuizTitleLength, maxQuizTitleLength,
         minQuizPassingScore, maxQuizPassingScore,
         minQuizTimeLimit, maxQuizTimeLimit } from "../../../constants/constants";


export const submitQuiz = async (quiz, allQuizTitles, navigate, editing = false) => {
    if(!quiz.title) return toast.error("Please enter a title for the quiz");
    if(quiz.title.length < minQuizTitleLength) return toast.error("Title must be at least 3 characters long");
    if(quiz.title.length > maxQuizTitleLength) return toast.error("Title must be at most 180 characters long");
    if(!editing && allQuizTitles.includes(quiz.title)) return toast.error("A quiz with this title already exists");
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
    if(editing) {
      await updateQuizInDatabase(quiz.id, JSON.parse(JSON.stringify(quiz)));
      navigate(-1);
      return;
    } 
    await uploadQuizToDatabase(JSON.parse(JSON.stringify(quiz)));
    navigate(-1);
}

export const handleQuizChange = (quiz, setQuiz, key, value, indexQ = 0, indexO = 0) => {
  if (key === "question") {
    setQuiz({
      ...quiz,
      questions: quiz.questions.map((q, i) => {
        if (i !== indexQ) return q;
        return {
          ...q,
          [key]: value,
        };
      }),
    });
  } else if (key === "option") {
    setQuiz({
      ...quiz,
      questions: quiz.questions.map((q, i) => {
        if (i !== indexQ) return q;
        return {
          ...q,
          incorrect_answers: q.incorrect_answers.map((o, j) => {
            if (j !== indexO) return o;
            return value;
          }),
          mixedAnswers: q.mixedAnswers.map((o, j) => {
            if (j !== indexO) return o;
            return value;
          })
        };
      }),
    });
  } else {
    setQuiz({
      ...quiz,
      [key]: value,
    });
  }
  console.log(quiz);
};

export const addQuestion = (quiz, setQuiz) => {
  if (!quiz.category) return toast.error("Please choose a category first!");
  if (!quiz.difficulty)
    return toast.error("Please choose a difficulty first!");
  if (quiz.questions.length > 29)
    return toast.error("You can have a maximum of 30 questions in a quiz");
  setQuiz({
    ...quiz,
    questions: [
      ...quiz.questions,
      new Question(quiz.category, quiz.difficulty, "multiple"),
    ],
  });
};

export const setCorrectAnswer = (quiz, setQuiz, indexQ, value) => {
  setQuiz({
    ...quiz,
    questions: quiz.questions.map((q, i) => {
      if (i !== indexQ) return q;
      return {
        ...q,
        correct_answer: value,
        incorrect_answers: q.mixedAnswers.filter((o) => o !== value)
      };
    }),
  });
}

export const removeQuestion = (quiz, setQuiz, indexQ) => {
  setQuiz({
    ...quiz,
    questions: quiz.questions.filter((q, i) => i !== indexQ),
  });
};





  // NOT REFACTORED
  // const addOption = (indexQ) => {
  //   if (quiz.questions[indexQ].incorrect_answers.length > 4)
  //     return toast.error("You can have a maximum of 5 options for a question");
  //   setQuiz({
  //     ...quiz,
  //     questions: quiz.questions.map((q, i) => {
  //       if (i !== indexQ) return q;
  //       return {
  //         ...q,
  //         incorrect_answers: [...q.incorrect_answers, ""],
  //         mixedAnswers: [...q.mixedAnswers, ""],
  //       };
  //     }),
  //   });
  // };

  // NOT REFACTORED
  // const removeOption = (indexQ, indexO) => {
  //   setQuiz({
  //     ...quiz,
  //     questions: quiz.questions.map((q, i) => {
  //       if (i !== indexQ) return q;
  //       return {
  //         ...q,
  //         mixedAnswers: q.mixedAnswers.filter((o, j) => j !== indexO),
  //       };
  //     }),
  //   });
  // };