import Categories from "../../../components/Categories/Categories";
import PropTypes from "prop-types";
import { useNavigate } from "react-router";
import { useState } from "react";
import { QuizDifficulty } from "../../../components/QuizDifficulty/QuizDifficulty";
import { defaultCategorySample } from "../../../constants/constants";
import { QuizAmount } from "../../../components/QuizAmount/QuizAmount";

export default function SampleQuiz({ setDifficulty, setQuizAmount }) {
  const [category, setCategory] = useState(defaultCategorySample);
  const navigate = useNavigate();

  const handleSetCategory = () => {
    navigate(`/single-quiz/${category}`);
  };
  return (
    <div className="min-w-lg mt-8">
      <div className=" w-2/4 mx-auto min-w-lg ">
        <h2 className="mb-6 font-extrabold leading-none tracking-tight text-neutral-800 md:text-4xl lg:text-4xl">
        Customize your own <span className="text-yellow-400">sample quiz</span> and dive into learning with our rich database.</h2>
      </div>
      <br />
      <div className=" w-2/4 mx-auto">
        <div className="block rounded-xl bg-neutral-100 p-12 text-surface shadow-neutral-500 shadow-lg mx-auto ">
          <div className=" bg-neutral-100 mx-auto min-w-lg rounded-xl p-8  shadow-neutral-500 shadow-inner mb-4">
            <h3 className=" text-neutral-800 text-2xl">Select Category</h3>
            <br />
            <Categories setCategory={setCategory} />
          </div>

          <div className=" bg-neutral-200 mx-auto min-w-lg rounded-xl p-8  shadow-neutral-500 shadow-inner mb-4">
            <h3 className=" text-neutral-800 text-2xl">Select Difficulty</h3>
            <br />
            <QuizDifficulty setDifficulty={setDifficulty} />
          </div>
          <div className=" bg-neutral-300 mx-auto min-w-lg rounded-xl p-8  shadow-neutral-500 shadow-inner mb-4">
            <h3 className=" text-neutral-800 text-2xl">
              Select Amount of Questions
            </h3>
            <br />
            <QuizAmount setQuizAmount={setQuizAmount} />
          </div>
          <br />
          <button
            type="button"
            onClick={handleSetCategory}
            data-te-ripple-init
            data-te-ripple-color="light"
            className=" inline-block w-2/4  rounded-lg bg-yellow-400 px-6 pt-2.5 pb-2 text-sm font-medium uppercase leading-normal text-neutral-800 shadow-lg transition duration-150 ease-in-out hover:bg-yellow-500 hover:shadow-neutral-500 focus:outline-none focus:ring-0 active:bg-neutral-700"
          >
            Start Quiz
          </button>
        </div>
      </div>
    </div>
  );
}

SampleQuiz.propTypes = {
  setDifficulty: PropTypes.func,
  setQuizAmount: PropTypes.func,
};
