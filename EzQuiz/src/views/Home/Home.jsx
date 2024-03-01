import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import StudentsLandingPage from "../Students Landing Page/StudentsLandingPage";
import TeachersLandingPage from "../Teachers Landing Page/TeachersLandingPage";
import Login from "../Login/Login";

export default function Home() {
  const { userData } = useContext(AppContext);
  const navigate = useNavigate();

  return (
    <div>
      <h1 style={{ cursor: "pointer" }} onClick={() => navigate("/")}>EzQuiz</h1>
      {userData ? userData.role === 'student' ? <StudentsLandingPage /> : <TeachersLandingPage /> : <Login />}
    </div>
  );
}
