import Button from "../../../components/Button/Button";
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
    <div>
      <h1>Customize your own sample quiz and give it a try</h1>
      <h3>Select Category</h3>
      <Categories setCategory={setCategory} />
      <h3>Select Difficulty</h3>
      <QuizDifficulty setDifficulty={setDifficulty} />
      <h3>Select Amount of Questions</h3>
      <QuizAmount setQuizAmount={setQuizAmount} />
      <br />
      <br />
      <Button onClick={handleSetCategory}>Start Quiz</Button>
    </div>
  );
}

SampleQuiz.propTypes = {
  setDifficulty: PropTypes.func,
  setQuizAmount: PropTypes.func,
};
