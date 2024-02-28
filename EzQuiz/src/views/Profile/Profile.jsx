import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import SetAvatar from "./SetAvatar";
import SetPhoneNumber from "./SetPhoneNumber";

export default function Profile() {
  const { userData } = useContext(AppContext);
    return (
        <div>
        <h1>Profile</h1>
        <p>Username: {userData?.handle}</p>
        <SetAvatar />
        <SetPhoneNumber/>
        </div>
    );
}
