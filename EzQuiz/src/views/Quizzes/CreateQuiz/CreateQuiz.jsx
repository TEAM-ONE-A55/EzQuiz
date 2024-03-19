import { useEffect, useState, useContext } from "react";
import Categories from "../../../components/Categories/Categories";
import QuizVisibility from "../../../components/QuizVisibility/QuizVisibility";
import { QuizDifficulty } from "../../../components/QuizDifficulty/QuizDifficulty";
import { AppContext } from "../../../context/AppContext";
import { useNavigate } from "react-router";
import { getAllQuizTitles } from "../../../services/quiz.service";
import { submitQuiz, handleQuizChange, addQuestion, setCorrectAnswer, removeQuestion } from "./create-quiz-functions";
import Datepicker from "react-tailwindcss-datepicker"; 
import NewQuestion from "./NewQuestion";


export default function CreateQuiz() {
  const { user, userData } = useContext(AppContext);

  const navigate = useNavigate();

  const [quiz, setQuiz] = useState({
    title: "",
    category: "",
    visibility: "",
    difficulty: "",
    timeLimit: "",
    passingScore: "",
    startDate: "",
    endDate: "",
    creator: userData.handle,
    creatorAvatar: userData.avatar,
    questions: [],
    participants: [],
    groups: [],
    rooms: []
  });

  const [allQuizTitles, setAllQuizTitles] = useState([]);

  const [datePicker, setDatePicker] = useState({ 
    startDate:'', 
    endDate: ''
  }); 

  useEffect(() => {
    setQuiz({
      ...quiz,
      startDate: datePicker.startDate,
      endDate: datePicker.endDate,
    });
  }, [datePicker]);

  useEffect(() => {
    getAllQuizTitles().then(setAllQuizTitles);
  }, []);

  if (user && userData.role !== 'student') { return (
    <div className="mt-8">
      <h2 className="mb-8 font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-4xl">
      Create & tailor <span className="text-yellow-400">your own</span> quiz</h2>
      <div className=" bg-neutral-100 max-w-3xl rounded-xl flex-col py-8 px-10 relative shadow-neutral-500 shadow-xl m-auto mt-4 text-left">

        <div className="max-w-[80%] mx-auto">
          <span className="ml-2">Title<span className=" text-red-600 ml-1">*</span></span><br />
          <input 
          className="pl-3 outline-none border-none rounded-md p-2 w-full transition duration-75 ease-in-out" 
          type="text" placeholder="Add quiz title..." onChange={e => handleQuizChange(quiz, setQuiz, "title", e.target.value)} />
        </div>

        <div className="flex justify-center gap-8">
          <div className="w-[40%] m-4">
            <div className="mb-3">
              <span className="ml-2">Choose visibility<span className=" text-red-600 ml-1">*</span></span><br />
              <QuizVisibility
                setVisibility={(visibility) => handleQuizChange(quiz, setQuiz, "visibility", visibility)}
              />
            </div>
            <div className="mb-3">
              <span className="ml-2">Choose category<span className=" text-red-600 ml-1">*</span></span><br />
              <Categories
                setCategory={(category) => handleQuizChange(quiz, setQuiz, "category", category)}
              />
            </div>
            <div className="mb-3">
              <span className="ml-2">Choose difficulty<span className=" text-red-600 ml-1">*</span></span><br />
              <QuizDifficulty
                setDifficulty={(difficulty) => handleQuizChange(quiz, setQuiz, "difficulty", difficulty)}
              />
            </div>
          </div>

          <div className="w-[40%] m-4">
            <div className="mb-3">
              <span className="ml-2">Time limit (minutes)<span className=" text-red-600 ml-1">*</span></span><br />
              <input className="pl-3 mx-3 w-64 rounded-md px-2 py-[7px] outline-none shadow-[5px 5px 10px rgba(0, 0, 0, 0.1)] shadow-lg" type="number" min="1" max="60" step="1" onChange={e => handleQuizChange(quiz, setQuiz, "timeLimit", e.target.value)} />
              <br />
            </div>

            <div className="mb-3">
              <span className="ml-2">Passing score (%)<span className=" text-red-600 ml-1">*</span></span><br />
              <input className="pl-3 mx-3 w-64 rounded-md px-2 py-[7px] outline-none shadow-[5px 5px 10px rgba(0, 0, 0, 0.1)] shadow-lg" type="number" min="1" max="100" step="1" onChange={e => handleQuizChange(quiz, setQuiz, "passingScore", e.target.value)} />
              <br />
            </div>

            <div className="mb-3 w-[100%]">
              <span className="ml-2">Quiz duration<span className=" text-red-600 ml-1">*</span></span><br />
              <div className=" mx-3">
                <Datepicker
                  inputClassName={"pl-2 outline-none rounded-md px-2 py-[9px] caret-transparent cursor-pointer w-[100%] text-sm shadow-[5px 5px 10px rgba(0, 0, 0, 0.1)] shadow-lg"}
                  containerClassName={""}
                  primaryColor={"yellow"} 
                  value={datePicker} 
                  onChange={e => setDatePicker(e)} 
                  showShortcuts={true}
                  separator="-"
                  popoverDirection="left"
                  /> 
              </div>
            </div>
          </div>
        </div>

        <div className="w-[80%] mx-auto mt-2">
          <div className="mx-auto">
            <button 
            className="mb-6 w-full block rounded-lg bg-neutral-300 px-6 pt-2.5 pb-2 text-sm font-medium uppercase leading-normal text-neutral-800 shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-neutral-400 hover:shadow-neutral-800 focus:outline-none focus:ring-0"
            onClick={() => addQuestion(quiz, setQuiz)}>New Question</button>
          </div>

          {quiz.questions.map((question, indexQ) => <NewQuestion 
          key={indexQ} 
          quiz={quiz} 
          setQuiz={setQuiz} 
          question={question} 
          indexQ={indexQ} 
          handleChange={handleQuizChange} 
          setCorrectAnswer={setCorrectAnswer} 
          removeQuestion={removeQuestion} />)}

        </div>

        <button 
        className="w-[80%] mx-auto mt-8 block rounded-lg bg-yellow-400 px-6 pt-2.5 pb-2 text-sm font-medium uppercase leading-normal text-neutral-800 shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-yellow-500 hover:shadow-neutral-800 focus:outline-none focus:ring-0"
        onClick={() => submitQuiz(quiz, allQuizTitles, navigate)}>Submit Quiz</button>
      </div>
    </div>
  )} else {
    setTimeout(() => {navigate('/')}, 3000);
    return (
      <div>
        <h1>You aren&apos;t authorized to create quizzes. Redirecting to homepage...</h1>
      </div>
    )
  }
} 