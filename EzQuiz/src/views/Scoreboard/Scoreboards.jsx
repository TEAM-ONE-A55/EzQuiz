import { useContext, useEffect, useState } from "react";
import BestPlayers from "../../components/BestPlayers/BestPlayers";
import { getAllQuizzesFromDatabase } from "../../services/quiz.service";
import { quizSortingOptions } from "../../constants/constants";
import Select from "react-select";
import { AppContext } from "../../context/AppContext";
import { useNavigate } from "react-router";
import { reactSelectStyles } from "../../services/react-select-styles";

export default function Scoreboards() {
  const [quizzes, setQuizzes] = useState([]);
  const [change, setChange] = useState(0);
  const [options, setOptions] = useState([{ value: "", label: "" }]);
  const [selectedOption, setSelectedOption] = useState([]);

  const handleSelectedOption = (selected) => {
    setSelectedOption(selected);
    if (selected.value) {
      navigate(`/results/${selected.value}`);
    }
  };

  const navigate = useNavigate();

  useEffect(() => {
    getAllQuizzesFromDatabase("creator").then(setQuizzes);
  }, []);

  useEffect(() => {
    if (quizzes && quizzes.length !== 0) {
      const formattedOptions = quizzes.map((quiz) => {
        return { value: quiz.id, label: quiz.title };
      });
      setOptions(formattedOptions);
    }
  }, [quizzes]);

  return (
    <>
      <div className="mt-24 mb-6 mx-auto w-4/5 rounded-xl p-8 bg-neutral-200 shadow-neutral-400 shadow-inner text-neutral-800 font-bold">
        <h2 className="text-4xl text-neutral-800 ">Global Scoreboard</h2>
      </div>

      <div className="w-2/5 mx-auto mb-6">
        {
          <Select
            name="quizzes"
            options={options}
            classNamePrefix="select"
            value={selectedOption}
            onChange={handleSelectedOption}
            placeholder="Filter Ranking by Quiz"
            className="basic-multi-select mx-auto shadow-lg shadow-neutral-400"
            styles={reactSelectStyles}
          />
        }
      </div>

      <BestPlayers />
    </>
  );
}
