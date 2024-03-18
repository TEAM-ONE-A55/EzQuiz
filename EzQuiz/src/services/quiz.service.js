import toast from "react-hot-toast";
import { db } from "../config/firebase.config";
import {
  ref,
  push,
  get,
  query,
  orderByChild,
  remove,
  set,
  update
} from "firebase/database";
import { shuffleArray } from "./helper.js";

export const uploadQuizToDatabase = async (quiz) => {
  try {
    const quizWithMixedAnswers = {
      ...quiz,
      questions: quiz.questions.map((q) => {
        return {
          ...q,
          mixedAnswers: shuffleArray([...q.mixedAnswers]),
          createdOn: Date.now(),
        };
      }),
    };
    const thisQuiz = await push(ref(db, "quizzes"), quizWithMixedAnswers);
    const quizId = thisQuiz.key;
    const userRef = ref(db, `users/${quiz.creator}/createdQuizzes/${quizId}`);
    await set(userRef, quizId);
    toast.success("Quiz created successfully");
    return quizId;
  } catch (e) {
    console.error(e.message);
    return toast.error("Error uploading quiz");
  }
};

export const getAllQuizzesFromDatabase = async (key = "createdOn") => {
  const snapshot = await get(query(ref(db, "quizzes"), orderByChild(key)));
  if (!snapshot.exists()) {
    return [];
  }
  const quizzes = Object.keys(snapshot.val()).map((key) => ({
    id: key,
    ...snapshot.val()[key],
  }));
  return quizzes;
};

export const getAllQuizTitles = async () => {
  const snapshot = await get(query(ref(db, "quizzes")));
  if (!snapshot.exists()) {
    return [];
  }
  const titles = Object.keys(snapshot.val()).map((key) => snapshot.val()[key].title);
  return titles;
}

export const deleteQuizFromDatabase = async (
  quizId,
  handle,
  hubType = null,
  hubId = null
) => {
  try {
    await remove(ref(db, `quizzes/${quizId}`));
    await remove(ref(db, `users/${handle}/createdQuizzes/${quizId}`));

    if (hubType !== null && hubId !== null) {
      const snapshot = await get(
        ref(db, `${hubType}/${hubId}/quizzes/${quizId}`)
      );

      if (snapshot.exists()) {
        await remove(ref(db, `${hubType}/${hubId}/quizzes/${quizId}`));
      }
    }
    toast.success("Quiz deleted successfully");
  } catch (e) {
    console.error(e.message);
    toast.error("Error deleting quiz");
  }
};

export const getQuizById = async (quizId) => {
  const snapshot = await get(query(ref(db, `quizzes/${quizId}`)));
  if (!snapshot.exists()) {
    return [];
  }
  const quiz = {
    id: quizId,
    ...snapshot.val(),
  };
  return quiz;
};

export const determineQuizStatus = (quiz) => {
  const now = new Date();
  const start = new Date(quiz.startDate);
  const end = new Date(quiz.endDate);
  if (start > now) {
    return "Scheduled";
  }
  if (start < now && end > now) {
    return "Ongoing";
  }
  if (end < now) {
    return "Finished";
  }
}

export const updateQuizInDatabase = async (quizId, quiz) => {
  const path = `quizzes/${quizId}`;
  await update(ref(db), { [path]: quiz });
  return quizId;
};
