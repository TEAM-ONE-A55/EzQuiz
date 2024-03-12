import GroupSimpleView from "../GroupSimpleView/GroupSimpleView";
import "./MyGroups.css";

export default function MyGroups() {
  return (
    <>
      <div className="my-groups-content">
        <h2 className="mb-4 font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-4xl dark:text-white">
          My <span className="text-blue-600 dark:text-blue-500">groups</span>
        </h2>

        <p className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">
          Your personalized hubs for seamless collaborating with fellow
          educators to tailor quizzes to your teaching needs and analyze
          participant performance.
        </p>
      </div>
      <div className="groups-container">
        <GroupSimpleView />
      </div>
    </>
  );
}
