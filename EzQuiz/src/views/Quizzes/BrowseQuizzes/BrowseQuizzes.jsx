import { useState, useEffect, useContext } from "react";
import { getAllQuizzesFromDatabase } from "../../../services/quiz.service";
import { AppContext } from "../../../context/AppContext";
import SimpleQuiz from "../SimpleQuiz/SimpleQuiz";

import Select from "react-select";
import { quizSortingOptions } from "../../../constants/constants";

export default function BrowseQuizzes() {
  const [quizzes, setQuizzes] = useState([]);
  const [change, setChange] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [quizSortBy, setQuizSortBy] = useState("all");

  const { user, userData } = useContext(AppContext);

  const handleSort = (e) => {
    setQuizSortBy(e.value);
  };

  useEffect(() => {
    getAllQuizzesFromDatabase("creator").then(setQuizzes);
  }, [change]);

  if (quizzes.length !== 0) {
    return (
      <div>
        <br />
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
        <div className="grid grid-cols-4 mt-16 max-w-screen-xl m-auto justify-items-center gap-y-16">
          {quizzes &&
            quizzes
              .filter((quiz) => {
                if (quizSortBy === "all") {
                  return true;
                } else {
                  return quiz.difficulty === quizSortBy;
                }
              })
              .filter((quiz) => {
                if (user && userData.role === "student" || user && userData.role === "educator") {
                  return quiz.visibility === "public";
                } else if (!user) {
                  return quiz.visibility === "public";
                } else {
                  return true;
                }
              })
              .filter((quiz) =>
                quiz.title.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((quiz) => (
                <SimpleQuiz key={quiz.id} quiz={quiz} setChange={setChange} />
              ))}
        </div>
      </div>
    );
  } else {
    return (
      <div className="max-w-screen-xl m-auto justify-items-center mt-28">
        <h2 className="mb-4 font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-4xl dark:text-white">
          No quizzes are available at the moment.
          <br />
          Please contact your organizer for further details.
        </h2>
      </div>
    );
  }
}
