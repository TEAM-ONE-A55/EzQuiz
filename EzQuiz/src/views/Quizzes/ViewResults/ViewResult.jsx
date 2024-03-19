import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { getQuizById } from "../../../services/quiz.service";
import Button from "../../../components/Button/Button";

export default function ViewResults() {
  const { id } = useParams();
  const [quiz, setQuiz] = useState([]);
  const [quizTakers, setQuizTakers] = useState([]);
  const [takersSet, setTakersSet] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    getQuizById(id).then((data) => setQuiz(data));
  }, [id]);

  useEffect(() => {
    if (quiz && quiz.quizTakers && !takersSet) {
      setQuizTakers((prev) => [...prev, ...Object.values(quiz.quizTakers)]);
      setTakersSet(true);
    }
  }, [quiz, takersSet]);

  const showBestTime = (finishTime) => {
    const time = new Date(finishTime);
    const minutes = time.getMinutes();
    const seconds = time.getSeconds();

    return (
      <span>
        {minutes} : {seconds}
      </span>
    );
  };

  return (
    <div className="mt-24 mx-auto">
      {quiz && quiz.title && (
        <div className=" mx-auto w-4/5 pt-10 pb-10 rounded-xl p-8 bg-neutral-200 shadow-neutral-400 shadow-inner">
          <h2 className="text-4xl mb-4 text-neutral-800 ">{quiz.title}</h2>
          <div className="flex items-center justify-center mb-8">
            <span>
              <img
                src={quiz.creatorAvatar}
                alt={quiz.creator}
                className="w-10 h-10 rounded-full mr-2 border-none shadow-neutral-600 shadow-sm"
              />
            </span>
            <span className="text-neutral-800 items-center justify-center">
              Creator: {quiz.creator}
            </span>
          </div>
          <Button onClick={() => navigate(-1)}>Back</Button>
        </div>
      )}
      <table className=" mt-10 w-4/5 mx-auto text-center text-sm font-light">
        <thead className="border-b bg-neutral-50 font-medium border-neutral-300">
          <tr>
            <th scope="col" className="py-4 px-6">
              Rank
            </th>
            <th scope="col" className="px-6 py-4">
              Username
            </th>
            <th scope="col" className="px-6 py-4">
              Name
            </th>
            <th scope="col" className="px-6 py-4">
              Date of Submition
            </th>
            <th scope="col" className="px-6 py-4">
              Score
            </th>
            <th scope="col" className="px-6 py-4">
              Best Time
            </th>
          </tr>
        </thead>
        <tbody>
          {quizTakers &&
            quizTakers
              .sort((a, b) => {
                if (a.score !== b.score) {
                  return b.score - a.score;
                } else {
                  return b.finishTime - a.finishTime;
                }
              })
              .map((taker, index) => {
                return (
                  <tr key={taker.handle}>
                    <td className="whitespace-nowrap py-4 px-6">
                      # {index + 1}{" "}
                    </td>
                    <td className="whitespace-nowrap py-4 px-6 flex items-center justify-center">
                      <span>
                        <img
                          src={taker.avatar}
                          alt={taker.handle}
                          className="w-8 h-8 rounded-full mr-2 border-none shadow-neutral-600 shadow-sm"
                        />
                      </span>
                      <span className="w-20">{taker.handle}</span>
                    </td>

                    <td className="whitespace-nowrap py-4 px-6">
                      {`${taker.firstName} ${taker.lastName}`}{" "}
                    </td>
                    <td className="whitespace-nowrap py-4 px-6">
                      {new Date(taker.completedOn).toLocaleString("us")}{" "}
                    </td>
                    <td className="whitespace-nowrap py-4 px-6">
                      {taker.score}{" "}
                    </td>
                    <td className="whitespace-nowrap py-4 px-6">
                      {showBestTime(taker.finishTime)}{" "}
                    </td>
                  </tr>
                );
              })}
        </tbody>
      </table>
    </div>
  );
}
