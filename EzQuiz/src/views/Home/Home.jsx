import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import StudentsLandingPage from "../StudentsDashboard/StudentsDashboard";
import TeachersLandingPage from "../EducatorDashboard/EducatorDashboard/EducatorDashboard";
import Login from "../Login/Login";
import AllUsers from "../Admin/AllUsers/AllUsers";

export default function Home() {
  const { userData } = useContext(AppContext);

  return (
    <div className="max-w-screen-xl m-auto">
      {userData ? (
        userData.role === "admin" ? (
          <AllUsers />
        ) : userData.role === "educator" ? (
          <TeachersLandingPage />
        ) : (
          <StudentsLandingPage />
        )
      ) : (
        <Login />
      )}
    </div>
  );
}
