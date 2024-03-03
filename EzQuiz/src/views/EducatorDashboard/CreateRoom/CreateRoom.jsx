import { useContext } from "react";
import { AppContext } from "../../../context/AppContext";
import { updateUserData } from "../../../services/user.service";

export default function ClassRoom() {
  const { userData } = useContext(AppContext);
  
  const handleChange = () => {
    updateUserData(userData.handle, "rooms")
  }

  return (
    <div>
      <h1>Create a new Room</h1>
      <p>
        Create a personalized room where you can invite participants for
        exclusive quizzes and assessments. Assess participants&apos; scores and
        customize quizzes tailored to your preferences. Whether you&apos;re
        planning an educational assessment, a recruitment evaluation, or simply
        a fun quiz night with friends, this feature allows you to host engaging
        activities while managing and analyzing participants&apos; performance
        effectively.
      </p>

      <form>
        <label htmlFor="room-title">Room Name</label>
        <input type="text"></input>
      </form>
    </div>
  );
}
