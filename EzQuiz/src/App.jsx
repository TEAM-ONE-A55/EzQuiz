import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { auth } from "./config/firebase.config";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { getUserData } from "./services/user.service";
import { AppContext } from "./context/AppContext";
import Home from "./views/Home/Home";
import Footer from "./components/Footer/Footer";
import Login from "./views/Login/Login";
import Registration from "./views/Registration/Registration";
import SingleQuiz from "./views/Quizzes/SingleQuiz/SingleQuiz";
import SampleQuiz from "./views/Quizzes/SampleQuiz/SampleQuiz";
import CreateQuiz from "./views/Quizzes/CreateQuiz/CreateQuiz";
import {
  defaultQuizAmountSample,
  defaultQuizDifficultySamle,
} from "./constants/constants";
import Profile from "./views/Profile/Profile";
import Authenticated from "./hoc/Authenticated/Authenticated";
import CreateRoom from "./views/EducatorDashboard/CreateRoom/CreateRoom";
import CreateGroup from "./views/EducatorDashboard/CreateGroup/CreateGroup";
import NavBar from "./components/NavBar/NavBar";
import Scoreboards from "./views/Scoreboard/Scoreboards";
import MyRooms from "./views/Rooms/MyRooms/MyRooms";
import SingleRoom from "./views/Rooms/SingleRoom/SingleRoom";
import AllUsers from "./views/Admin/AllUsers/AllUsers";
import AllRooms from "./views/Admin/AllRooms/AllRooms";
import Dashboard from "./components/Dashboard/Dashboard";
import StudentsDashboard from "./views/StudentsDashboard/StudentsDashboard";
import EducatorDashboard from "./views/EducatorDashboard/EducatorDashboard/EducatorDashboard";
import NotFound from "./views/NotFound/NotFound";
import Forbidden from "./views/Forbidden/Forbidden";
import Search from "./components/Search/Search";
import PublicProfile from "./views/Public Profile/PublicProfile";
import AllGroups from "./views/Admin/AllGroups/AllGroups";
import AdminDashboard from "./views/Admin/AdminDashboard/AdminDashboard";
import BrowseQuizzes from "./views/Quizzes/BrowseQuizzes/BrowseQuizzes";
import MyGroups from "./views/Groups/MyGroups/MyGroups";
import SingleGroup from "./views/Groups/SingleGroup/SingleGroup";
import MyQuizzes from "./views/Quizzes/MyQuizzes/MyQuizzes";

export default function App() {
  const [user] = useAuthState(auth);
  const [context, setContext] = useState({
    user: null,
    userData: null,
  });

  const [difficulty, setDifficulty] = useState(defaultQuizDifficultySamle);
  const [quizAmount, setQuizAmount] = useState(defaultQuizAmountSample);
  const [notifications, setNotifications] = useState({
    quizInvitations: [],
    roomInvitations: [],
    groupInvitations: [],
    feedback: [],
  });

  useEffect(() => {
    if (user) {
      getUserData(user.uid).then((snapshot) => {
        if (snapshot.exists()) {
          setContext({
            user,
            userData: snapshot.val()[Object.keys(snapshot.val())[0]],
          });
        }
      });
    }
  }, [user]);

  return (
    <div className="">
      <BrowserRouter>
        <AppContext.Provider value={{ ...context, setContext: setContext }}>
          <Toaster position="bottom-right" reverseOrder={true} />
          {/* <Header /> */}
          <NavBar notifications={notifications} setNotifications={setNotifications}/>
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/signup" element={<Registration />}></Route>
            <Route path="/signin" element={<Login />}></Route>
            <Route
              path="/sample-quiz/:id"
              element={
                <SingleQuiz
                  difficulty={difficulty}
                  setDifficulty={setDifficulty}
                  quizAmount={quizAmount}
                  setQuizAmount={setQuizAmount}
                />
              }
            ></Route>
            <Route
              path="/sample-quiz"
              element={
                <SampleQuiz
                  setDifficulty={setDifficulty}
                  setQuizAmount={setQuizAmount}
                />
              }
            ></Route>
            <Route
              path="/profile"
              element={
                <Authenticated>
                  <Profile />
                </Authenticated>
              }
            ></Route>
            <Route
              path="/create-room"
              element={
                <Authenticated>
                  {context &&
                  context.userData &&
                  context.userData.role === "educator" ? (
                    <CreateRoom />
                  ) : (
                    <Forbidden />
                  )}
                </Authenticated>
              }
            ></Route>
            <Route
              path="/create-group"
              element={
                <Authenticated>
                  {context &&
                  context.userData &&
                  context.userData.role === "educator" ? (
                    <CreateGroup />
                  ) : (
                    <Forbidden />
                  )}
                </Authenticated>
              }
            ></Route>
            <Route
              path="/my-rooms"
              element={
                <Authenticated>
                  <MyRooms notifications={notifications}/>
                </Authenticated>
              }
            ></Route>
            <Route
              path="/my-rooms/:id"
              element={
                <Authenticated>
                  <SingleRoom />
                </Authenticated>
              }
            ></Route>
             <Route
              path="/my-groups"
              element={
                <Authenticated>
                  <MyGroups notifications={notifications} />
                </Authenticated>
              }
            ></Route>
             <Route
              path="/my-groups/:id"
              element={
                <Authenticated>
                  <SingleGroup />
                </Authenticated>
              }
            ></Route>
             <Route
              path="/my-quizzes"
              element={
                <Authenticated>
                  <MyQuizzes/>
                </Authenticated>
              }
            ></Route>
            <Route
              path="/dashboard"
              element={
                <Authenticated>
                  {context &&
                  context.userData &&
                  context.userData.role === "student" ? (
                    <Dashboard>
                      <StudentsDashboard />
                    </Dashboard>
                  ) : (
                    <Forbidden />
                  )}
                </Authenticated>
              }
            ></Route>
            <Route
              path="/dashboard-educators"
              element={
                <Authenticated>
                  {context &&
                  context.userData &&
                  context.userData.role === "educator" ? (
                    <Dashboard>
                      <EducatorDashboard />
                    </Dashboard>
                  ) : (
                    <Forbidden />
                  )}
                </Authenticated>
              }
            ></Route>
            <Route path="scoreboard" element={<Scoreboards />}></Route>
            <Route
              path="all-users"
              element={
                <Authenticated>
                  {context &&
                  context.userData &&
                  context.userData.role === "admin" ? (
                    <AllUsers />
                  ) : (
                    <Forbidden />
                  )}
                </Authenticated>
              }
            ></Route>
            <Route
              path="dashboard-admin"
              element={
                <Authenticated>
                  {context &&
                  context.userData &&
                  context.userData.role === "admin" ? (
                    <Dashboard>
                      <AdminDashboard />
                    </Dashboard>
                  ) : (
                    <Forbidden />
                  )}
                </Authenticated>
              }
            ></Route>
            <Route
              path="all-rooms"
              element={
                <Authenticated>
                  {context &&
                  context.userData &&
                  context.userData.role === "admin" ? (
                    <AllRooms />
                  ) : (
                    <Forbidden />
                  )}
                </Authenticated>
              }
            ></Route>
            <Route path="*" element={<NotFound />} />
            <Route path="/unauthorized" element={<Forbidden />} />
            <Route
              path="/sample-quiz/:id"
              element={
                <SingleQuiz
                  difficulty={difficulty}
                  setDifficulty={setDifficulty}
                  quizAmount={quizAmount}
                  setQuizAmount={setQuizAmount}
                />
              }
            ></Route>
            <Route
              path="/sample-quiz"
              element={
                <SampleQuiz
                  setDifficulty={setDifficulty}
                  setQuizAmount={setQuizAmount}
                />
              }
            ></Route>
            <Route
              path="/profile"
              element={
                <Authenticated>
                  <Profile />
                </Authenticated>
              }
            ></Route>
            <Route
              path="/create-quiz"
              element={
                <Authenticated>
                  <CreateQuiz />
                </Authenticated>
              }
            ></Route>
            <Route
              path="/search"
              element={
                <Authenticated>
                  {context &&
                  context.userData &&
                  context.userData.role === "admin" ? (
                    <Search />
                  ) : (
                    <Forbidden />
                  )}
                </Authenticated>
              }
            ></Route>
            <Route
              path="/profile/:handle"
              element={
                <Authenticated>
                  {context &&
                  context.userData &&
                  context.userData.role === "admin" ? (
                    <PublicProfile />
                  ) : (
                    <Forbidden />
                  )}
                </Authenticated>
              }
            ></Route>
            <Route
              path="search/profile/:handle"
              element={
                <Authenticated>
                  {context &&
                  context.userData &&
                  context.userData.role === "admin" ? (
                    <PublicProfile />
                  ) : (
                    <Forbidden />
                  )}
                </Authenticated>
              }
            ></Route>
            <Route
              path="/all-groups"
              element={
                <Authenticated>
                  {context &&
                  context.userData &&
                  context.userData.role === "admin" ? (
                    <AllGroups />
                  ) : (
                    <Forbidden />
                  )}
                </Authenticated>
              }
            ></Route>
            <Route
              path="all-groups/profile/:handle"
              element={
                <Authenticated>
                  {context &&
                  context.userData &&
                  context.userData.role === "admin" ? (
                    <PublicProfile />
                  ) : (
                    <Forbidden />
                  )}
                </Authenticated>
              }
            ></Route>
            <Route path="browse-quizzes" element={<BrowseQuizzes />} />
          </Routes>
          <Footer />
        </AppContext.Provider>
      </BrowserRouter>
    </div>
  );
}
