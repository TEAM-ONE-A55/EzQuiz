import { useEffect, useState } from "react";
import {
  deleteQuizFromDatabase,
  getAllQuizzesFromDatabase,
  updateQuizWithKey,
} from "../../../services/quiz.service";
import { getAllHubs } from "../../../services/hub.service";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import { quizSortingOptions } from "../../../constants/constants";
import Select from "react-select";

export default function AllQuizzes() {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [quizSortBy, setQuizSortBy] = useState("all");
  const [rooms, setRooms] = useState([]);
  const [groups, setGroups] = useState([]);

  const getAllQuizzes = async () => {
    const allQuizzes = await getAllQuizzesFromDatabase();
    setQuizzes(allQuizzes);
  };

  const getAllRooms = async () => {
    const allRooms = await getAllHubs("rooms");
    setRooms(allRooms);
  };

  const getAllGroups = async () => {
    const allGroups = await getAllHubs("groups");
    setGroups(allGroups);
  };

  const handleSort = (e) => {
    setQuizSortBy(e.value);
  };

  const removeQuiz = async (quiz) => {
    try {
      if (rooms && rooms.length !== 0) {
        rooms.map((room) => {
          if (room.quizzes && Object.keys(room.quizzes).includes(quiz.id)) {
            deleteQuizFromDatabase(quiz.id, quiz.creator, "rooms", room.id);
          }
        });
      }

      if (groups && groups.length !== 0) {
        groups.map((group) => {
          if (group.quizzes && Object.keys(group.quizzes).includes(quiz.id)) {
            deleteQuizFromDatabase(quiz.id, quiz.creator, "groups", group.id);
          }
        });
      }
      deleteQuizFromDatabase(quiz.id, quiz.creator);
      if (
        quiz.quizTakers &&
        Object.keys(quiz.quizTakers).includes(quiz.creator)
      ) {
        updateQuizWithKey(quiz.id, `quizTakers/${quiz.creator}`, null);
      }
      toast.success(`Quiz ${quiz.name} has been deleted`);
      setQuizzes(quizzes.filter((q) => q.id !== quiz.id));
    } catch (error) {
      toast.error(`Could not delete quiz ${quiz.name}`);
    }
  };

  const navigate = useNavigate();

  useEffect(() => {
    try {
      getAllQuizzes();
      getAllGroups();
      getAllRooms();
      setLoading(false);
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  return (
    <div>
      <h1>All Quizzes</h1>
      {loading && <p>Loading...</p>}
      <div className="flex justify-center">
        <div className="mb-3 xl:w-96">
          <input
            type="search"
            onChange={(e) => setSearchTerm(e.target.value)}
            className="relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-black outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-neutral-600 focus:outline-none"
            id="exampleSearch"
            placeholder="Search quizzes..."
          />
        </div>
        {
          <Select
            name="quizzes"
            options={quizSortingOptions}
            className="basic-multi-select"
            classNamePrefix="select"
            value={quizSortBy}
            onChange={handleSort}
          />
        }
      </div>
      <br />
      <table className="min-w-full text-left text-sm font-light">
        <thead className="border-b font-medium dark:border-neutral-500">
          <tr>
            <th scope="col" className="px-6 py-4">
              Quiz Title
            </th>
            <th scope="col" className="px-6 py-4">
              Visibility
            </th>
            <th scope="col" className="px-6 py-4">
              Difficulty
            </th>
            <th scope="col" className="px-6 py-4">
              Creator
            </th>
          </tr>
        </thead>
        <tbody>
          {quizzes &&
            quizzes
              .filter((quiz) => {
                if (quizSortBy === "all") {
                  return true;
                } else {
                  return quiz.difficulty === quizSortBy;
                }
              })
              .filter((quiz) =>
                quiz.title.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((quiz) => (
                <tr
                  key={quiz.id}
                  className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600"
                >
                  <td className="whitespace-nowrap px-6 py-4">{quiz.title} </td>  
                <td className="whitespace-nowrap px-6 py-4">
                  {quiz.visibility === "Private" ? (
                    <span className="text-red-600">Private</span>
                  ) : (
                    <span className="text-green-600">Public</span>
                  )}
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  {quiz.difficulty === "Easy" ? (
                    <span className="text-green-600">Easy</span>
                  ) : quiz.difficulty === "Medium" ? (
                    <span className="text-yellow-600">Medium</span>
                  ) : (
                    <span className="text-red-600">Hard</span>
                  )}
                </td>
                <td className=" hover:cursor-pointer text-primary transition duration-150 ease-in-out hover:text-primary-600 focus:text-primary-600 active:text-primary-700 dark:text-primary-400 dark:hover:text-primary-500 dark:focus:text-primary-500 dark:active:text-primary-600">
                  <span onClick={() => navigate(`profile/${quiz.creator}`)}>
                    {quiz.creator}
                  </span>
                </td>
                <td>
                  <button
                    onClick={() => removeQuiz(quiz.id, quiz.creator)}
                    className=" hover:cursor-pointer inline-block rounded bg-neutral-800 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-neutral-50 shadow-[0_4px_9px_-4px_rgba(51,45,45,0.7)] transition duration-150 ease-in-out hover:bg-neutral-800 hover:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] focus:bg-neutral-800 focus:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] focus:outline-none focus:ring-0 active:bg-neutral-900 active:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] dark:bg-neutral-900 dark:shadow-[0_4px_9px_-4px_#030202] dark:hover:bg-neutral-900 dark:hover:shadow-[0_8px_9px_-4px_rgba(3,2,2,0.3),0_4px_18px_0_rgba(3,2,2,0.2)] dark:focus:bg-neutral-900 dark:focus:shadow-[0_8px_9px_-4px_rgba(3,2,2,0.3),0_4px_18px_0_rgba(3,2,2,0.2)] dark:active:bg-neutral-900 dark:active:shadow-[0_8px_9px_-4px_rgba(3,2,2,0.3),0_4px_18px_0_rgba(3,2,2,0.2)]"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => navigate(`/edit-quiz/${quiz.id}`)}
                    className=" hover:cursor-pointer inline-block rounded bg-neutral-800 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-neutral-50 shadow-[0_4px_9px_-4px_rgba(51,45,45,0.7)] transition duration-150 ease-in-out hover:bg-neutral-800 hover:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] focus:bg-neutral-800 focus:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] focus:outline-none focus:ring-0 active:bg-neutral-900 active:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] dark:bg-neutral-900 dark:shadow-[0_4px_9px_-4px_#030202] dark:hover:bg-neutral-900 dark:hover:shadow-[0_8px_9px_-4px_rgba(3,2,2,0.3),0_4px_18px_0_rgba(3,2,2,0.2)] dark:focus:bg-neutral-900 dark:focus:shadow-[0_8px_9px_-4px_rgba(3,2,2,0.3),0_4px_18px_0_rgba(3,2,2,0.2)] dark:active:bg-neutral-900 dark:active:shadow-[0_8px_9px_-4px_rgba(3,2,2,0.3),0_4px_18px_0_rgba(3,2,2,0.2)]"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
