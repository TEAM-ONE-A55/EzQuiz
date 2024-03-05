import toast from "react-hot-toast";
import { NAME_MAX_LENGTH, NAME_MIN_LENGTH, USERNAME_MAX_LENGTH, USERNAME_MIN_LENGTH, verificationCode } from "../constants/constants";
import { createUserHandle, getUserByHandle } from "./user.service";
import { registerUser } from "./auth.service";

export const register = async (form, navigate) => {
    if (
      form.firstName.length + form.lastName.length < NAME_MIN_LENGTH ||
      form.firstName.length + form.lastName.length > NAME_MAX_LENGTH
    ) {
      return toast.error(
        "Please enter a name that is between 1 and 30 characters long."
      );
    }
    if (
      !form.firstName.split("").every((char) => {
        const charCode = char.charCodeAt(0);
        return (
          (charCode >= 65 && charCode <= 90) ||
          (charCode >= 97 && charCode <= 122)
        );
      }) ||
      !form.lastName.split("").every((char) => {
        const charCode = char.charCodeAt(0);
        return (
          (charCode >= 65 && charCode <= 90) ||
          (charCode >= 97 && charCode <= 122)
        );
      })
    ) {
      return toast.error(
        "Name must include only uppercase and lowercase letters."
      );
    }
    if (!form.username)
      return toast.error("Uh oh! Don't forget your username!");

    if (
      form.username.length < USERNAME_MIN_LENGTH ||
      form.username > USERNAME_MAX_LENGTH
    )
      return toast.error("Username must be between 3 and 30 characters long.");

    if (form.role === "educator" && form.code !== verificationCode) {
      return toast.error("Oops! Looks like you entered the wrong code. Try again!");
    }
        try {
      const user = await getUserByHandle(form.username);
      if (user.exists()) {
        return toast.error("Oops! This username is already taken!");
      }

      const credentials = await registerUser(form.email, form.password);
      await createUserHandle(
        form.username,
        credentials.user.uid,
        form.email,
        form.firstName,
        form.lastName,
        form.role
      );
      setTimeout(() => {
        navigate(-1);
      }, 2000);
      return toast.success(
        "Congratulations! Your account has been successfully created!"
      );
    } catch (e) {
      if (e.message === "Firebase: Error (auth/missing-password).")
        return toast.error(
          "Oops! Looks like you forgot to enter a password. Let's add one for security!"
        );
      if (e.message === "Firebase: Error (auth/invalid-email).")
        return toast.error(
          "It seems the email you entered is invalid. Please double-check and try again."
        );
      if (
        e.message ===
        "Firebase: Password should be at least 6 characters (auth/weak-password)."
      )
        return toast.error(
          "Oops! Your password should be at least 6 characters long!"
        );

      if (e.message === "Firebase: Error (auth/email-already-in-use).") {
        return toast.error(
          "Oops! Email already in use. Try another or log in."
        );
      }
      console.log(e.message);
    } finally {
      // navigate(-1);
    }
  };