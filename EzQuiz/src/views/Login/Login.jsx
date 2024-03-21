import { useContext, useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import { login } from "../../services/login-validations";
import { getUserByEmail } from "../../services/user.service";
import toast from "react-hot-toast";

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
    <div className="bg-neutral-100 mt-16 max-w-xl min-h-[400px] rounded-xl flex-col py-8 px-10 relative shadow-neutral-500 shadow-xl m-auto text-center">
      <h1 className="text-3xl font-semibold pb-12">Sign in</h1>
      <div className="flex flex-col justify-center items-center gap-4">
        <input
          className="pl-3 max-w-[70%] text-lg outline-none border-none rounded-md p-2 w-full transition duration-75 ease-in-out shadow-neutral-300 shadow-lg"
          id="login-email"
          name="login-email"
          type="text"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          onKeyDown={handleOnKeyDown}
        />
        <input
          className="pl-3 max-w-[70%] text-lg outline-none border-none rounded-md p-2 w-full transition duration-75 ease-in-out shadow-neutral-300 shadow-lg"
          id="login-password"
          name="login-password"
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          onKeyDown={handleOnKeyDown}
        />
        <br />
      </div>
      <button
        className="inline-block w-36 mt-8 mb-2 rounded bg-yellow-400 px-6 pt-2.5 pb-2 text-lg font-medium uppercase leading-normal text-neutral-900 transition duration-75 ease-in-out hover:bg-yellow-500"
        onClick={() => {
          getUserByEmail(email).then((snapshot) => {
            if (Object.values(snapshot.val())[0].blocked === true) {
              toast.error(
                "You are blocked from the system. Please contact the administrator."
              );
              return;
            }
            login(email, password, setContext, navigate);
          });
        }}
      >
        Sign in
      </button>
      <p className="text-xl mt-8">
        Don&apos;t have an account?{" "}
        <NavLink className="text-blue-600 font-semibold hover:text-blue-700" to="/signup">
          Sign up
        </NavLink>
      </p>
    </div>
  );
}
