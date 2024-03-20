import { useContext, useEffect, useState } from "react";
import SimpleQuiz from "../SimpleQuiz/SimpleQuiz";
import { AppContext } from "../../../context/AppContext";
import {
  getAllQuizzesFromDatabase,
  getQuizById,
} from "../../../services/quiz.service";
import Button from "../../../components/Button/Button";
import { useNavigate } from "react-router";
import { getHubsById } from "../../../services/hub.service";

export default function MyQuizzes() {
  const { userData } = useContext(AppContext);
  const [quizzes, setQuizzes] = useState([]);
  const [change, setChange] = useState(0);
  const [rooms, setRooms] = useState([]);
  const navigate = useNavigate();
  const [quizIds, setQuizIds] = useState([]);

  useEffect(() => {
    if (userData.role === "educator") {
      getAllQuizzesFromDatabase()
        .then((quizzes) =>
          quizzes.filter((quiz) => quiz.creator === userData.handle)
        )
        .then(setQuizzes);
    } else if (userData.role === "student") {
      if (userData.rooms) {
        const roomsIds = Object.keys(userData.rooms);

        const promises = roomsIds.map((roomId) => {
          return getHubsById("rooms", roomId).then((room) => {
            if (room.quizzes) {
              return room;
            } else {
              return null;
            }
          });
        });

        Promise.all(promises).then((roomsWithQuizzes) => {
          const filteredRooms = roomsWithQuizzes.filter(
            (room) => room !== null
          );
          setRooms(filteredRooms);
        });
      }
    }
  }, [change]);

  useEffect(() => {
    if (rooms.length !== 0) {
      const quizzes = rooms.map((room) => room.quizzes);
      const ids = quizzes.map((room) => Object.values(room));

      setQuizIds(ids.flat());
    }
  }, [rooms]);

  useEffect(() => {
    if (quizIds && quizIds.length !== 0) {
      const promises = quizIds.map(async (id) =>
        getQuizById(id).then((quiz) => quiz)
      );

      Promise.all(promises).then((allQuizzes) => {
        if (
          allQuizzes &&
          allQuizzes.length !== 0 &&
          userData &&
          userData.participatedQuizzes
        ) {
          console.log(allQuizzes);
          const filtered = allQuizzes.filter((quiz) => 
            !Object.keys(userData.participatedQuizzes).includes(quiz.id)
          );
          setQuizzes(filtered);
        } else {
          setQuizzes(allQuizzes);
        }
      });
    }
  }, [quizIds]);

  return (
    <div className="">
      {quizzes && quizzes.length !== 0 ? (
        <div className="mt-8 max-w-screen-xl mx-auto">
          <div className="">
            <h2 className="font-extrabold leading-none tracking-tighter text-gray-900 md:text-5xl lg:text-4xl dark:text-white">
              My{" "}
              <span className="text-yellow-400">Quizzes</span>
            </h2>
            <br />
            {userData.role === "educator" ? (
              <p className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">
                Welcome to your personalized quiz hub! Here, you can access and
                manage all the quizzes you&apos;ve created. Tailor each quiz to
                your teaching needs, analyze participant performance, and make
                adjustments as needed. Edit or delete quizzes with ease,
                ensuring your content stays up-to-date and relevant to your
                students&apos; learning journey.
              </p>
            ) : (
              <p className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">
                Welcome to your personalized quiz dashboard! Here, you can
                access quizzes you&apos;ve participated in and review your
                performance. Dive into your quiz history, view results, and
                track your progress.
              </p>
            )}
          </div>
          <br />

          <div className="grid grid-cols-4 mt-16 max-w-screen-xl m-auto justify-items-center gap-y-16">
            {quizzes.map((quiz) => (
              <div key={quiz.id} className="flex gap-10">
                <SimpleQuiz key={quiz.id} quiz={quiz} setChange={setChange} />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="mt-16">
          {userData.role === "educator" ? (
            <div className="max-w-screen-md mx-auto flex flex-col justify-center items-center gap-4">
              <p className="font-extrabold leading-none tracking-tighter text-gray-900 md:text-4xl">
                {" "}
                You haven&apos;t created any quizzes yet.
              </p>
              <p className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400 tracking-tight">
                However, you can start by creating one.
              </p>
              <button 
              className="w-[40%] mx-auto mt-4 block rounded-lg bg-yellow-400 px-6 pt-2.5 pb-2 text-sm font-medium uppercase leading-normal text-neutral-800 shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-yellow-500 hover:shadow-neutral-800 focus:outline-none focus:ring-0"
              onClick={() => navigate("/create-quiz")}>
                Create Quiz
              </button>
              <br />
            </div>
          ) : (
            <p className="font-extrabold leading-none tracking-tighter text-gray-900 md:text-5xl lg:text-4xl dark:text-white">
              {" "}
              You&apos;re all caught up! No pending quizzes.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
