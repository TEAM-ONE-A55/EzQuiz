import { useContext } from "react";
import BenefitSimple from "../LandingPage/BenefitSimple/BenefitSimple";
import Benefits from "../LandingPage/Benefits/Benefits";
import { AppContext } from "../../context/AppContext";
import { getRank } from "../../components/Score/scores-students";

export default function StudentsDashboard() {
  const { userData } = useContext(AppContext);

  return (
    userData && (
      <div className="mt-32 w-4/5 mx-auto">
        <h2 className="mb-4 font-extrabold leading-none tracking-tight text-neutral-800 md:text-4xl lg:text-4xl">
          Hello, <span className="text-yellow-400">{userData.handle}</span>!
          Welcome to Your Personalized Hub!
        </h2>
        <br />
        <p className="text-lg font-normal text-neutral-600 lg:text-xl">
          Review completed quizzes, discover new ones, and stay updated on
          assigned quizzes effortlessly.
        </p>
        <div className="w-5/5 mx-auto flex items-center justify-center">
          <Benefits heading="Explore Your Achievements">
            <BenefitSimple
              iconPath={
                <path
                  d="m11.6 11c0-.552-.448-1-1-1-1.655 0-4.945 0-6.6 0-.552 0-1 .448-1 1v9c0 .552.448 1 1 1h6.6c.552 0 1-.448 1-1 0-2.092 0-6.908 0-9zm9.4 6c0-.552-.448-1-1-1h-6c-.538 0-1 .477-1 1v3c0 .552.448 1 1 1h6c.552 0 1-.448 1-1zm-1.5.5v2h-5v-2zm-9.4-6v8h-5.6v-8zm10.9-7.5c0-.552-.448-1-1-1-1.537 0-4.463 0-6 0-.552 0-1 .448-1 1v9.6c0 .552.448 1 1 1h6c.552 0 1-.448 1-1 0-2.194 0-7.406 0-9.6zm-1.5.5v8.6h-5v-8.6zm-7.9-.5c0-.552-.448-1-1-1-1.655 0-4.945 0-6.6 0-.552 0-1 .448-1 1v3.6c0 .552.448 1 1 1h6.6c.552 0 1-.448 1-1 0-1.017 0-2.583 0-3.6zm-1.5.5v2.6h-5.6v-2.6z"
                  fillRule="nonzero"
                />
              }
              heading={`Participated in ${
                userData.participatedQuizzes
                  ? Object.keys(userData.participatedQuizzes).length
                  : 0
              } ${
                userData.participatedQuizzes &&
                Object.keys(userData.participatedQuizzes).length === 1
                  ? `Quiz`
                  : `Quizzes`
              }`}
              subheading="The Total Number of Completed Quizzes"
              text="As an engaged learner, your active participation in quizzes demonstrates your commitment to learning and growth. Keep up the excellent work!"
            />
            <BenefitSimple
              heading={`Your Global Score is ${
                userData.score ? userData.score : 0
              }
             `}
              subheading={`Status rank: ${getRank(userData.score)}`}
              text={`Congratulations! With a global score of ${
                userData.score
              }, you've proven yourself as a true ${getRank(
                userData.score
              )}. Your exceptional performance highlights your expertise and dedication. Keep dominating the quizzes!`}
              iconPath={
                <path d="M16 21.617v1.383h-8v-1.383c2.212 0 2.534-1.386 2.631-2.625.68.385 2.077.385 2.756 0 .097 1.238.338 2.625 2.613 2.625zm-3.991-20.617c-2.754 0-6.915.423-6.825 2.8.309 8.18 4.8 10.896 5.421 13.893.64.534 2.169.534 2.81 0 .612-2.957 4.965-5.654 5.39-13.575.137-2.574-4.13-3.118-6.796-3.118zm-4.837 4.814c.506.132 1.035.236 1.584.309.308 2.767 1.083 5.562 2.491 7.995-1.915-2.211-3.454-4.885-4.075-8.304zm4.837-.717c-2.459 0-5.485-.373-5.485-1.394 0-.839 2.628-1.456 5.485-1.456 2.716 0 5.492.667 5.492 1.542 0 .9-2.911 1.308-5.492 1.308zm7.786-1.09c0 .518-.045.746-.103 1.297h2.78c-.431 2.015-1.568 4.764-4.527 6.279-.319.659-.65 1.265-.984 1.816 4.167-1.309 6.662-5.23 7.039-9.392h-4.205zm-19.795 0c.377 4.162 2.872 8.083 7.039 9.392-.334-.551-.665-1.157-.984-1.816-2.959-1.515-4.097-4.265-4.527-6.279h2.78c-.058-.552-.103-.78-.103-1.297h-4.205z" />
              }
            />
            <BenefitSimple
              iconPath={
                <path d="M24 21h-3l1-3h1l1 3zm-12.976-4.543l8.976-4.575v6.118c-1.007 2.041-5.607 3-8.5 3-3.175 0-7.389-.994-8.5-3v-6.614l8.024 5.071zm11.976.543h-1v-7.26l-10.923 5.568-11.077-7 12-5.308 11 6.231v7.769z" />
              }
              heading={`Active ${
                userData.rooms ? Object.keys(userData.rooms).length : 0
              } ${
                userData.rooms && Object.keys(userData.rooms).length === 1
                  ? "Classroom"
                  : "Classrooms"
              }`}
              subheading="Dynamic Spaces for Learning"
              text="Total number of classrooms where you're actively involved, fostering collaborative learning environments and participating in educational activities."
            />
          </Benefits>
        </div>
      </div>
    )
  );
}
