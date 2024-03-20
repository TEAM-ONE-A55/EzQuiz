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
import { reactSelectStyles } from "../../../services/react-select-styles";

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
    <div className="mt-8 max-w-[1350px] mx-auto">
      <div className="mb-6 mx-auto w-4/5 rounded-xl p-8 bg-neutral-200 shadow-neutral-400 shadow-inner text-neutral-800 font-bold">
        <h2 className="text-4xl text-neutral-800 ">All Quizzes</h2>
      </div>
      <h2 className="text-xl text-neutral-600 mb-4 -mt-2 ">
        Total Quizzes: {quizzes.length}
      </h2>
      {loading && <p>Loading...</p>}
      <div className="mx-auto w-4/5 flex flex-row">
        <input
          type="search"
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-3 mr-2 h-[38px] outline-none border-none rounded-[4px] p-2 w-full transition duration-75 ease-in-out shadow-lg shadow-neutral-200"
          id="exampleSearch"
          placeholder="Search quizzes..."
        />
        {
          <Select
            defaultValue={quizSortingOptions[0]}
            options={quizSortingOptions}
            onChange={handleSort}
            className="basic-multi-select w-72 mx-auto"
            styles={reactSelectStyles}
          />
        }
      </div>
      <table className="mt-10 mx-auto text-center text-sm font-light min-w-[1300px]">
        <thead className="border-b bg-neutral-50 font-medium border-neutral-300">
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
              #
            </th>
            <th scope="col" className="px-6 py-4">
              Creator
            </th>
            <th scope="col" className="px-6 py-4">
              Participants
            </th>
            <th scope="col" className="px-6 py-4">
              Action
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
                  return quiz.category === +quizSortBy;
                }
              })
              .filter((quiz) =>
                quiz.title.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((quiz) => (
                <tr
                  key={quiz.id}
                  className="border-b transition duration-75 ease-in-out hover:bg-neutral-100 border h-[80px] text-center items-center"
                >
                  <td className="text-center align-middle">{quiz.title}</td>
                  <td className="text-center align-middle">
                    {quiz.visibility === "Private" ? (
                      <span className="text-red-400 font-medium">Private</span>
                    ) : (
                      <span className="text-green-400 font-medium">Public</span>
                    )}
                  </td>
                  <td className="text-center align-middle">
                    {quiz.difficulty === "Easy" ? (
                      <span className="text-green-400 font-medium">Easy</span>
                    ) : quiz.difficulty === "Medium" ? (
                      <span className="text-yellow-400 font-medium">
                        Medium
                      </span>
                    ) : (
                      <span className="text-red-400 font-medium">Hard</span>
                    )}
                  </td>

                  <td className="">
                    <img
                      src={quiz.creatorAvatar}
                      alt={quiz.creator}
                      className="w-8 h-8 rounded-full border-none shadow-neutral-600 shadow-sm"
                    />
                  </td>
                  <td className="text-center align-middle">
                    <span>
                      <span
                        className="hover:cursor-pointer font-medium text-primary transition duration-150 ease-in-out hover:text-primary-600 focus:text-primary-600 active:text-primary-700"
                        onClick={() => navigate(`profile/${quiz.creator}`)}
                      >
                        {quiz.creator}
                      </span>
                    </span>
                  </td>
                  <td className="text-center align-middle">
                    {quiz.quizTakers ? Object.keys(quiz.quizTakers).length : 0}
                  </td>

                  <td className="max-w-[250px] grid grid-rows-1 gap-1 text-center items-center mt-1.5 mr-4">
                    <button
                      type="button"
                      onClick={() => removeQuiz(quiz.id, quiz.creator)}
                      className="rounded bg-neutral-700 pb-1 pt-1.5 px-2 text-[10px] font-medium uppercase text-neutral-50 transition duration-75 ease-in-out hover:bg-neutral-800"
                    >
                      Delete
                    </button>
                    <button
                      type="button"
                      onClick={() => navigate(`/edit-quiz/${quiz.id}`)}
                      className="rounded bg-neutral-700 pb-1 pt-1.5 px-2 text-[10px] font-medium uppercase text-neutral-50 transition duration-75 ease-in-out hover:bg-neutral-800"
                    >
                      Edit Quiz
                    </button>
                  </td>
                </tr>
              ))}
        </tbody>
      </table>
    </div>
  );
}
