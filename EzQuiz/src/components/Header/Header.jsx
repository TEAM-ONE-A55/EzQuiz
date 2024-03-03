import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import "./Header.css";
import Logout from "../Logout/Logout";
import Button from "../Button/Button";
import { NavLink } from "react-router-dom";

export default function Header() {
  const { user } = useContext(AppContext);
  const navigate = useNavigate();

  return (
    <header>
      <h1 style={{ cursor: "pointer" }} onClick={() => navigate("/")}>EzQuiz</h1>
      {user ? (
        <>
          <Logout />
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
            <NavLink to="/profile">Profile</NavLink> &nbsp;
          </nav>
        </>
      ) : (
        <div>
          <Button onClick={() => navigate("/signin")}>Sign in</Button>
        </div>
      )}
    </header>
  );
}
