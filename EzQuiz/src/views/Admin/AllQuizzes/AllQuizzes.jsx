import { useEffect, useState } from "react";
import { getAllQuizzesFromDatabase } from "../../../services/quiz.service";
import { ref, update } from "firebase/database";
import { db } from "../../../config/firebase.config";
import { deleteHub } from "../../../services/hub.service";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import React from "react";
import { quizSortingOptions } from "../../../constants/constants";
import Select from "react-select";
import { updateUserData } from "../../../services/user.service";

export default function AllQuizzes() {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [editing, setEditing] = useState(false);
  const [quizTitle, setQuizTitle] = useState("");
  const [quizEditId, setQuizEditId] = useState("");
  const [quizSortBy, setQuizSortBy] = useState("all");

  const getAllQuizzes = async () => {
    const allQuizzes = await getAllQuizzesFromDatabase();
    setQuizzes(allQuizzes);
  };

  const handleSort = (e) => {
    setQuizSortBy(e.value);
  };

  const editQuizTitle = async (quiz, id, key, value) => {
    const path = `${quiz}/${id}/${key}`;
    return update(ref(db), { [path]: value });
  };

  const handleChange = (e) => {
    setQuizTitle(e.target.value);
  };

  const handleEdit = (id) => {
    setEditing(true);
    setQuizEditId(id);
  };

  const handleSave = (quiz, value) => {
    if (quizTitle.length < 2) {
      toast.error("Quiz title must be at least 2 characters long");
      return;
    }
    setEditing(false);
    editQuizTitle("quizzes", quiz.id, "title", value);
  };

  const handleCancel = () => {
    setEditing(false);
  };

  const removeQuiz = async (id, creator) => {
    try {
      await deleteHub("quizzes", id);
      await updateUserData(creator, `createdQuizzes/${id}`, null)
      setQuizzes(quizzes.filter((quiz) => quiz.id !== id));
      toast.success(`Quiz ${id} has been deleted`);
    } catch (error) {
      toast.error(`Could not delete quiz ${id}`);
    }
  };

  const navigate = useNavigate();

  useEffect(() => {
    try {
      getAllQuizzes();
      setLoading(false);
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  useEffect(() => {
    getAllQuizzes();
  }, [editing]);

  return (
    <div>
      <h1>All Quizzes</h1>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
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
            quizzes.filter((quiz) => { 
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
                {editing && quiz.id === quizEditId ? (
                  <div>
                    <input
                      type="text"
                      value={quizTitle}
                      onChange={handleChange}
                    />
                    <button
                      className="hover:cursor-pointer inline-block rounded bg-neutral-800 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-neutral-50 shadow-[0_4px_9px_-4px_rgba(51,45,45,0.7)] transition duration-150 ease-in-out hover:bg-neutral-800 hover:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] focus:bg-neutral-800 focus:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] focus:outline-none focus:ring-0 active:bg-neutral-900 active:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] dark:bg-neutral-900 dark:shadow-[0_4px_9px_-4px_#030202] dark:hover:bg-neutral-900 dark:hover:shadow-[0_8px_9px_-4px_rgba(3,2,2,0.3),0_4px_18px_0_rgba(3,2,2,0.2)] dark:focus:bg-neutral-900 dark:focus:shadow-[0_8px_9px_-4px_rgba(3,2,2,0.3),0_4px_18px_0_rgba(3,2,2,0.2)] dark:active:bg-neutral-900 dark:active:shadow-[0_8px_9px_-4px_rgba(3,2,2,0.3),0_4px_18px_0_rgba(3,2,2,0.2)]"
                      onClick={() => handleSave(quiz, quizTitle)}
                    >
                      Save
                    </button>
                    <button
                      className="hover:cursor-pointer inline-block rounded bg-neutral-800 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-neutral-50 shadow-[0_4px_9px_-4px_rgba(51,45,45,0.7)] transition duration-150 ease-in-out hover:bg-neutral-800 hover:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] focus:bg-neutral-800 focus:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] focus:outline-none focus:ring-0 active:bg-neutral-900 active:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] dark:bg-neutral-900 dark:shadow-[0_4px_9px_-4px_#030202] dark:hover:bg-neutral-900 dark:hover:shadow-[0_8px_9px_-4px_rgba(3,2,2,0.3),0_4px_18px_0_rgba(3,2,2,0.2)] dark:focus:bg-neutral-900 dark:focus:shadow-[0_8px_9px_-4px_rgba(3,2,2,0.3),0_4px_18px_0_rgba(3,2,2,0.2)] dark:active:bg-neutral-900 dark:active:shadow-[0_8px_9px_-4px_rgba(3,2,2,0.3),0_4px_18px_0_rgba(3,2,2,0.2)]"
                      onClick={handleCancel}
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <td className="whitespace-nowrap px-6 py-4">
                    {quiz.title}{" "}
                    <FontAwesomeIcon
                      icon={faPen}
                      onClick={() => handleEdit(quiz.id)}
                    />
                  </td>
                )}
                <td className="whitespace-nowrap px-6 py-4">
                  {quiz.visibility === "private" ? (
                    <span className="text-red-600">Private</span>
                  ) : (
                    <span className="text-green-600">Public</span>
                  )}
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  {quiz.difficulty === "easy" ? (
                    <span className="text-green-600">Easy</span>
                  ) : quiz.difficulty === "medium" ? (
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
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
