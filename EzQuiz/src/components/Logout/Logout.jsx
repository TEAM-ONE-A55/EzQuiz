import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { useNavigate } from "react-router";
import { logoutUser } from "../../services/auth.service";
import Button from "../Button/Button";

export default function Logout() {
    const { setContext } = useContext(AppContext);
    const navigate = useNavigate();
    const logout = () => {
      logoutUser();
      setContext({ user: null, userData: null });
      navigate("/");
    };
  
    return <Button className="logout-button" onClick={logout}>Sign Out</Button>;
}