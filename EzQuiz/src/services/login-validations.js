import toast from "react-hot-toast";
import { loginUser } from "./auth.service";

export const login = async (email, password, setContext, navigate) => {
    try {
      const credentials = await loginUser(email, password);

      setContext({ user: credentials.user, userData: null });
      navigate(location.state?.from.pathname || "/");
      toast.success(
        "Welcome back! You've successfully logged in. Enjoy your experience!"
      );

    } catch (e) {
      if (e.message === "Firebase: Error (auth/invalid-email).") {
        return toast.error(
          "Whoops! Looks like the email you entered is not valid. Please check and try again."
        );
      } else if (e.message === "Firebase: Error (auth/missing-password).") {
        console.log(e.message);
        return toast.error(
          "Seems like you forgot to enter your password. Please provide your password to continue."
        );
      } else if (e.message === "Firebase: Error (auth/invalid-credential).") {
        return toast.error(
          "Looks like there's an issue with your login credentials. Please double-check and try again."
        );
      } else {
        console.log(e.message);
        return toast.error(
          "It seems your login credentials are incorrect. Please double-check and try again."
        );
      }
    }
  };