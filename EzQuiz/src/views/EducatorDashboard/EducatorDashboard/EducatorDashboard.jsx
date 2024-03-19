import { useContext } from "react";
import BenefitSimple from "../../LandingPage/BenefitSimple/BenefitSimple";
import Benefits from "../../LandingPage/Benefits/Benefits";
import { AppContext } from "../../../context/AppContext";

export default function EducatorDashboard() {
  const { userData } = useContext(AppContext);

  return (
    userData && (
      <div className="mt-32 w-4/5 mx-auto">
        <h2 className="mb-4 font-extrabold leading-none tracking-tight text-neutral-800 md:text-4xl lg:text-4xl">
          Hello, <span className="text-yellow-400">{userData.handle}</span> !
          Welcome to Your Personalized Hub!
        </h2>
        <br />
        <p className="text-lg font-normal text-neutral-600 lg:text-xl">
          Explore your personalized dashboard to discover insights, manage your
          content, and interact with your community effortlessly.
        </p>
        <div className="w-5/5 mx-auto flex items-center justify-center">
          <Benefits heading="Review Your Insights">
            <BenefitSimple
              iconPath={
                <path
                  d="m11.6 11c0-.552-.448-1-1-1-1.655 0-4.945 0-6.6 0-.552 0-1 .448-1 1v9c0 .552.448 1 1 1h6.6c.552 0 1-.448 1-1 0-2.092 0-6.908 0-9zm9.4 6c0-.552-.448-1-1-1h-6c-.538 0-1 .477-1 1v3c0 .552.448 1 1 1h6c.552 0 1-.448 1-1zm-1.5.5v2h-5v-2zm-9.4-6v8h-5.6v-8zm10.9-7.5c0-.552-.448-1-1-1-1.537 0-4.463 0-6 0-.552 0-1 .448-1 1v9.6c0 .552.448 1 1 1h6c.552 0 1-.448 1-1 0-2.194 0-7.406 0-9.6zm-1.5.5v8.6h-5v-8.6zm-7.9-.5c0-.552-.448-1-1-1-1.655 0-4.945 0-6.6 0-.552 0-1 .448-1 1v3.6c0 .552.448 1 1 1h6.6c.552 0 1-.448 1-1 0-1.017 0-2.583 0-3.6zm-1.5.5v2.6h-5.6v-2.6z"
                  fillRule="nonzero"
                />
              }
              heading={`${
                userData.createdQuizzes
                  ? Object.keys(userData.createdQuizzes).length
                  : 0
              } ${
                userData.createdQuizzes &&
                Object.keys(userData.createdQuizzes).length === 1
                  ? `Active Personalized Quiz Crafted`
                  : `Active Personalized Quizzes Crafted`
              }`}
              subheading="Total Number of Quizzes Created"
              text="This metric simply indicates the total count of quizzes you've personally designed. It reflects your active involvement in crafting assessments tailored to your needs and those of your participants."
            />
            <BenefitSimple
              heading={`Engaged in ${
                userData.groups ? Object.keys(userData.groups).length : 0
              } Educational ${
                userData.groups && Object.keys(userData.groups).length === 1
                  ? "Community"
                  : "Communities"
              }`}
              subheading="Active Community Participation"
              text="This represents the number of educational communities you're currently involved in. It showcases your engagement in collaborative learning environments where knowledge sharing thrives."
              iconPath={
                <path d="M17.997 18h-11.995l-.002-.623c0-1.259.1-1.986 1.588-2.33 1.684-.389 3.344-.736 2.545-2.209-2.366-4.363-.674-6.838 1.866-6.838 2.491 0 4.226 2.383 1.866 6.839-.775 1.464.826 1.812 2.545 2.209 1.49.344 1.589 1.072 1.589 2.333l-.002.619zm4.811-2.214c-1.29-.298-2.49-.559-1.909-1.657 1.769-3.342.469-5.129-1.4-5.129-1.265 0-2.248.817-2.248 2.324 0 3.903 2.268 1.77 2.246 6.676h4.501l.002-.463c0-.946-.074-1.493-1.192-1.751zm-22.806 2.214h4.501c-.021-4.906 2.246-2.772 2.246-6.676 0-1.507-.983-2.324-2.248-2.324-1.869 0-3.169 1.787-1.399 5.129.581 1.099-.619 1.359-1.909 1.657-1.119.258-1.193.805-1.193 1.751l.002.463z" />
              }
            />
            <BenefitSimple
              iconPath={
                <path d="M24 21h-3l1-3h1l1 3zm-12.976-4.543l8.976-4.575v6.118c-1.007 2.041-5.607 3-8.5 3-3.175 0-7.389-.994-8.5-3v-6.614l8.024 5.071zm11.976.543h-1v-7.26l-10.923 5.568-11.077-7 12-5.308 11 6.231v7.769z" />
              }
              heading={`Active ${
                userData.rooms ? Object.keys(userData.rooms).length : 0
              } Learning ${
                userData.rooms && Object.keys(userData.rooms).length === 1
                  ? "Environment"
                  : "Environments"
              }`}
              subheading="Dynamic Spaces for Interaction"
              text="This statistic reflects your commitment to facilitating engaging educational activities and fostering collaborative learning among your students."
            />
          </Benefits>
        </div>
      </div>
    )
  );
}
