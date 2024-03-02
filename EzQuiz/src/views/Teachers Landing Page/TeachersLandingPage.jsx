import { useNavigate } from "react-router";
import { NavLink } from "react-router-dom";
import Button from "../../components/Button/Button";

export default function TeachersLandingPage() {
  const navigate = useNavigate();

  return (
    <div>

      <nav>
        <span onClick={() => navigate("/")}>EzQuiz</span> &nbsp;
        <input
          type="text"
          placeholder="Search for students..."
          name="search"
          id="search"
        />
        <NavLink to="/invitations">Invitations</NavLink> &nbsp;
        <NavLink to="/scoreboard">Scoreboard</NavLink> &nbsp;
        <NavLink to="/groups">Groups</NavLink> &nbsp;
        <NavLink to="/profile">Profile</NavLink>
      </nav>

      <div>
        <h2>Create a Quiz</h2>
        <Button>Add Quiz</Button>
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
