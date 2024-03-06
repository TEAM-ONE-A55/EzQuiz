import toast from "react-hot-toast";
import { updateUserData } from "./user.service";
import { ref, remove } from "firebase/database";
import { db } from "../config/firebase.config";

export const changeRole = async (user,setUser) => {
    if (user.role === "student") {
      await updateUserData(user.handle, "role", "educator");
       setUser({ ...user, role: "educator" });
      toast.success(`User role has been changed to an Educator`);
    } else {
      await updateUserData(user.handle, "role", "student");
       setUser({ ...user, role: "student" });
      toast.success(`User role has been changed to a Student`);
    }
  };

export const deleteUser = async (handle) => {
    return remove(ref(db, `users/${handle}`))
}