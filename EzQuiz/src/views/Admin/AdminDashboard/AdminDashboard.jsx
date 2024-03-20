import { useContext, useEffect, useState } from "react";
import { getAllUsers } from "../../../services/user.service";
import { getAllHubs } from "../../../services/hub.service";
import { getAllQuizzesFromDatabase } from "../../../services/quiz.service";
import BenefitSimple from "../../LandingPage/BenefitSimple/BenefitSimple";
import { AppContext } from "../../../context/AppContext";

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [groups, setGroups] = useState([]);
  const [quizzes, setQuizzes] = useState([]);

  const { userData } = useContext(AppContext);

  const getUsers = async () => {
    const allUsers = await getAllUsers();
    setUsers(allUsers);
  };

  const getQuizzes = async () => {
    const allQuizzes = await getAllQuizzesFromDatabase("creator");
    setQuizzes(allQuizzes);
  };

  const getRooms = async () => {
    const allRooms = await getAllHubs("rooms");
    setRooms(allRooms);
  };

  const getGroups = async () => {
    const allGroups = await getAllHubs("groups");
    setGroups(allGroups);
  };

  useEffect(() => {
    getUsers();
    getGroups();
    getRooms();
    getQuizzes();
  }, []);

  return (
    userData && (
      <div className="mt-8 w-4/5 mx-auto">
        <h2 className="mb-4 font-extrabold leading-none tracking-tight text-neutral-800 md:text-4xl lg:text-4xl">
          Hello, <span className="text-yellow-400">{userData.handle}</span> !
          Welcome to Your Admin Panel!
        </h2>
        <br />
        <p className="text-lg font-normal text-neutral-600 lg:text-xl">
          Here, you have access to vital statistics, including total registered
          users, created groups by educators, rooms, and quizzes. Navigate
          effortlessly to manage and oversee all data, from editing and deleting
          content to controlling user roles and access privileges. Take charge
          with ease and efficiency in this centralized hub for administration.
        </p>
        <div className="w-5/5 mx-auto flex items-center justify-center">
          <div className="container my-24 mx-auto md:px-6">
            <section className="text-center">
              <h2 className="mb-20 text-3xl font-bold text-neutral-800">
                Statistics Overview
              </h2>

              <div className="mb-[60px] ] grid grid-cols-2 lg:gap-x-12">
                <BenefitSimple
                  iconPath={
                    <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm0 22c-3.123 0-5.914-1.441-7.749-3.69.259-.588.783-.995 1.867-1.246 2.244-.518 4.459-.981 3.393-2.945-3.155-5.82-.899-9.119 2.489-9.119 3.322 0 5.634 3.177 2.489 9.119-1.035 1.952 1.1 2.416 3.393 2.945 1.082.25 1.61.655 1.871 1.241-1.836 2.253-4.628 3.695-7.753 3.695z" />
                  }
                  heading={`${users && users.length ? users.length : 0} ${
                    users && users.length && users.length === 1
                      ? `Registered User`
                      : `Total Registered Users`
                  }`}
                  subheading="Community Engagement"
                  text="This statistic represents the total number of users who have registered on the platform. It reflects the growth and engagement of our community, showcasing the reach and impact of our platform in facilitating learning and collaboration."
                />
                <BenefitSimple
                  heading={`${quizzes && quizzes.length ? quizzes.length : 0} ${
                    quizzes && quizzes.length && quizzes.length === 1
                      ? "Created Quiz"
                      : "Total Created Quizzes"
                  }`}
                  subheading="Content Creation"
                  text="This statistic indicates the total number of quizzes created by educators on the platform. It highlights the commitment to creating engaging and educational content, empowering educators to tailor assessments to their teaching objectives and learners' needs."
                  iconPath={
                    <path
                      d="m11.6 11c0-.552-.448-1-1-1-1.655 0-4.945 0-6.6 0-.552 0-1 .448-1 1v9c0 .552.448 1 1 1h6.6c.552 0 1-.448 1-1 0-2.092 0-6.908 0-9zm9.4 6c0-.552-.448-1-1-1h-6c-.538 0-1 .477-1 1v3c0 .552.448 1 1 1h6c.552 0 1-.448 1-1zm-1.5.5v2h-5v-2zm-9.4-6v8h-5.6v-8zm10.9-7.5c0-.552-.448-1-1-1-1.537 0-4.463 0-6 0-.552 0-1 .448-1 1v9.6c0 .552.448 1 1 1h6c.552 0 1-.448 1-1 0-2.194 0-7.406 0-9.6zm-1.5.5v8.6h-5v-8.6zm-7.9-.5c0-.552-.448-1-1-1-1.655 0-4.945 0-6.6 0-.552 0-1 .448-1 1v3.6c0 .552.448 1 1 1h6.6c.552 0 1-.448 1-1 0-1.017 0-2.583 0-3.6zm-1.5.5v2.6h-5.6v-2.6z"
                      fillRule="nonzero"
                    />
                  }
                />
              </div>
              <div className="mt-[40px] grid grid-cols-2 lg:gap-x-12">
                <BenefitSimple
                  iconPath={
                    <path d="M17.997 18h-11.995l-.002-.623c0-1.259.1-1.986 1.588-2.33 1.684-.389 3.344-.736 2.545-2.209-2.366-4.363-.674-6.838 1.866-6.838 2.491 0 4.226 2.383 1.866 6.839-.775 1.464.826 1.812 2.545 2.209 1.49.344 1.589 1.072 1.589 2.333l-.002.619zm4.811-2.214c-1.29-.298-2.49-.559-1.909-1.657 1.769-3.342.469-5.129-1.4-5.129-1.265 0-2.248.817-2.248 2.324 0 3.903 2.268 1.77 2.246 6.676h4.501l.002-.463c0-.946-.074-1.493-1.192-1.751zm-22.806 2.214h4.501c-.021-4.906 2.246-2.772 2.246-6.676 0-1.507-.983-2.324-2.248-2.324-1.869 0-3.169 1.787-1.399 5.129.581 1.099-.619 1.359-1.909 1.657-1.119.258-1.193.805-1.193 1.751l.002.463z" />
                  }
                  heading={`${groups && groups.length ? groups.length : 0} ${
                    groups && groups.length && groups.length === 1
                      ? `Created Group`
                      : `Total Created Groups`
                  }`}
                  subheading="Collaborative Spaces for Educators"
                  text="This statistic represents the cumulative count of collaborative communities established by educators within the platform. Admins have oversight into groups, empowering them to manage memberships, monitor activity, and ensure a conducive environment for educational engagement."
                />
                <BenefitSimple
                  heading={`${rooms && rooms.length ? rooms.length : 0} ${
                    rooms && rooms.length && rooms.length === 1
                      ? "Created Room"
                      : "Total Created Rooms"
                  }`}
                  subheading="Learning Spaces"
                  text="This statistic reflects the number of virtual learning environments created by educators for student engagement. These rooms serve as collaborative spaces where educators can host quizzes and interactive learning activities, fostering a conducive environment for knowledge sharing and student participation."
                  iconPath={
                    <path d="M24 21h-3l1-3h1l1 3zm-12.976-4.543l8.976-4.575v6.118c-1.007 2.041-5.607 3-8.5 3-3.175 0-7.389-.994-8.5-3v-6.614l8.024 5.071zm11.976.543h-1v-7.26l-10.923 5.568-11.077-7 12-5.308 11 6.231v7.769z" />
                  }
                />
              </div>
            </section>
          </div>
        </div>
      </div>
    )
  );
}
