import { NavLink, useNavigate } from "react-router-dom";
import Footer from "../../components/Footer/Footer";

export default function StudentsLandingPage() {
  const navigate = useNavigate();
  return (
    <div>
      <nav>
        <span onClick={() => navigate("/")}>EzQuiz</span> &nbsp;
        <NavLink to="/invitations">Invitations</NavLink> &nbsp;
        <NavLink to="/scoreboard">Scoreboard</NavLink> &nbsp;
        <NavLink to="/groups">Groups</NavLink> &nbsp;
        <NavLink to="/profile">Profile</NavLink>
      </nav>

      <div style={{ border: "solid" }}>
        <h2>Quizzes</h2>
        <h4>Trending Quizzess</h4>
        <p>Hardcoded quiz</p>
        <p>Hardcoded quiz</p>
        <p>Hardcoded quiz</p>
        <p>Hardcoded quiz</p>
        <button>All quizzes</button>
        <button>Random quiz</button>
      </div>

      <div style={{ border: "solid" }}>
        <h2>Best Players</h2>
        <p>Dancho</p>
        <p>Pesho</p>
        <p>Gosho</p>
        <p>Stamat</p>
      </div>

      
    </div>
  );
}
