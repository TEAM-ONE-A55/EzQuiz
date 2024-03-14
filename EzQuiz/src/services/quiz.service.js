import toast from "react-hot-toast";
import { db } from "../config/firebase.config";
import { ref, push, get, query, orderByChild, remove } from "firebase/database";
import { shuffleArray } from "./helper.js";

export const uploadQuizToDatabase = async (quiz) => {
    try {
        const quizWithMixedAnswers = {
            ...quiz,
            questions: quiz.questions.map((q) => {
                return {
                  ...q,
                  mixedAnswers: shuffleArray([...q.mixedAnswers])
                };
            })
        };
        const thisQuiz = await push(ref(db, "quizzes"), quizWithMixedAnswers);
        const quizId = thisQuiz.key;
        const userRef = ref(db, `users/${quiz.creator}/createdQuizzes/${quizId}`);
        await push(userRef, quizId);
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

export const deleteQuizFromDatabase = async (quizId, handle) => {
    try {
        await remove(ref(db, `quizzes/${quizId}`));
        await remove(ref(db, `users/${handle}/createdQuizzes/${quizId}`));
        toast.success("Quiz deleted successfully");
    } catch (e) {
        console.error(e.message);
        toast.error("Error deleting quiz");
    }
}

export const getQuizById = async (quizId) => {
    const snapshot = await(get(query(ref(db, `quizzes/${quizId}`))));
    if (!snapshot.exists()) {
        return [];
      }
    const quiz = {
        id: quizId, 
        ...snapshot.val()};
    return quiz;
}