import { useState, useEffect, useContext } from "react";
import { getAllQuizzesFromDatabase } from "../../../services/quiz.service";
import { AppContext } from "../../../context/AppContext";
import SimpleQuiz from "../SimpleQuiz/SimpleQuiz";
import { reactSelectStyles } from "../../../services/react-select-styles";
import Select from "react-select";
import { API_CATEGORIES, quizSortingOptions } from "../../../constants/constants";

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
    getAllQuizzesFromDatabase("createdOn").then(setQuizzes);
  }, [change]);


  
  if (quizzes.length !== 0) {
    return (
      <div className="mt-8">
        <div className="flex flex-col  max-w-[60%] justify-center mx-auto">
          <h2 className="font-extrabold mb-8 tracking-tighter text-neutral-800 md:text-4xl lg:text-4xl">
            Explore a diverse collection of <span className="text-yellow-400">engaging quizzes </span>
            tailored to your <span className="text-yellow-400">interests</span>  and knowledge levels. 
          </h2>
          <div className="mx-auto min-w-[600px] flex flex-row">
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
                className="basic-multi-select w-56 mx-auto"
                styles={reactSelectStyles}
              />
            }
          </div>
        </div>
        <div className="grid grid-cols-4 mt-16 max-w-screen-xl m-auto justify-items-center gap-y-16">
          {quizzes &&
            quizzes
              .filter((quiz) => {
                if (quizSortBy === "all") {
                  return true;
                } else {
                  return quiz.category == quizSortBy;
                }
              })
              .filter((quiz) => {
                if (user && userData.role === "student" || user && userData.role === "educator") {
                  return quiz.visibility.toLowerCase() === "public";
                } else if (!user) {
                  return quiz.visibility.toLowerCase() === "public";
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
      <div className="mt-8">
        <div className="flex flex-col  max-w-[60%] justify-center mx-auto">
          <h2 className="font-extrabold mb-8 tracking-tight text-neutral-800 md:text-4xl lg:text-4xl">
            No quizzes are available at the moment. Please contact your educator for further instructions.
          </h2>
        </div>
      </div>
    );
  }
}
