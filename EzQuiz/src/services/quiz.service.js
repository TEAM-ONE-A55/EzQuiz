import toast from "react-hot-toast";
import { db } from "../config/firebase.config";
import { ref, push } from "firebase/database";
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
}