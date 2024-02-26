import StudentsLandingPage from "../Students Landing Page/StudentsLandingPage";
import Footer from "../../components/Footer/Footer";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  return (
    <div>
      <h1 onClick={() => navigate("/")}>EzQuiz</h1>
      <StudentsLandingPage />
      <Footer/>
    </div>
  );
}
