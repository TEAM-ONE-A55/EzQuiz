import { useContext } from "react";
import GroupSimpleView from "../GroupSimpleView/GroupSimpleView";
import "./MyGroups.css";
import { AppContext } from "../../../context/AppContext";
import { useNavigate } from "react-router-dom";
import Button from "../../../components/Button/Button";

export default function MyGroups() {
  const { userData } = useContext(AppContext);
  const navigate = useNavigate();
  return (
    <div>
      {userData && userData.groups ? (
        <>
          <div className="my-groups-content">
            <h2 className="mb-4 font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-4xl dark:text-white">
              My{" "}
              <span className="text-blue-600 dark:text-blue-500">groups</span>
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
      ) : (
        <div className="my-groups-content">
          <p className="mb-4 font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-4xl dark:text-white">
            {" "}
            You don&apos;t have any groups yet.
          </p>
          
          <br />
          <Button onClick={() => navigate("/create-group")}>
            Create Group
          </Button>
          <br />
          <br />
          <p className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">
            If you haven&apos;t created any groups yet, you can start by
            creating one. Click on the &quot;Create Group&quot; button to
            initiate the process.
          </p>
          <br />
          <br />
          <p className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">
            If you&apos;ve been invited to join a group, make sure to accept the
            invitation. Check your notifications to see if there are any pending
            group invites.
          </p>
        </div>
      )}
    </div>
  );
}
