import { NavLink, useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";

export default function StudentsLandingPage() {
  const navigate = useNavigate();
  return (
    <div>
      
      <nav>
        <span style={{ cursor: "pointer" }} onClick={() => navigate("/")}>EzQuiz</span> &nbsp;
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
        <Button>All quizzes</Button>
        <Button>Random quiz</Button>
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
