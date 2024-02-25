import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import "./Header.css";
import Logout from "../Logout/Logout";
import Button from "../Button/Button";

export default function Header() {
  const { user } = useContext(AppContext);
  const navigate = useNavigate();

  return (
    <header>
      {user ? (
        <>
          <Logout />
        </>
      ) : (
        <>
          <Button onClick={() => navigate("/signin")}>Sign in</Button>
        </>
      )}
    </header>
  );
}
