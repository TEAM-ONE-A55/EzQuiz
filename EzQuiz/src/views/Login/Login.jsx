import { useContext, useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import Button from "../../components/Button/Button";
import "./Login.css";
import { login } from "../../services/login-validations";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, setContext } = useContext(AppContext);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (user) {
      navigate(location.state?.from.pathname || "/");
    }
  }, [location.state?.from.pathname, navigate, user]);

  const handleOnKeyDown = (event) => {
    if (event.key === "Enter")
      return login(email, password, setContext, navigate);
  };

  return (
    <div className="login-container">
      <h1>Sign in</h1>
      <div className="login-inputs-wrapper">
        <label htmlFor="login-email">Email: </label>
        <input
          id="login-email"
          name="login-email"
          type="text"
          placeholder="Enter your email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          onKeyDown={handleOnKeyDown}
        />
        <br />
        <label htmlFor="login-password">Password: </label>
        <input
          id="login-password"
          name="login-password"
          type="password"
          placeholder="Enter your password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          onKeyDown={handleOnKeyDown}
        />
        <br />
      </div>
      <Button onClick={() => login(email, password, setContext, navigate)}>
        Sign in
      </Button>
      <p>
        Don&apos;t have an account?{" "}
        <NavLink className="navlink register-now" to="/signup">
          Sign up
        </NavLink>
      </p>
    </div>
  );
}
