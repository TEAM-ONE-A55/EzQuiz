import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import SetAvatar from "./SetAvatar";
import SetPhoneNumber from "./SetPhoneNumber";
import SetFirstName from "./SetFirstName";
import SetLastName from "./SetLastName";
import SetAddress from "./SetAddress";
import { getRank } from "../../components/Score/scores-students";
import { faStar, faTrophy } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";




export default function Profile() {
  const { userData } = useContext(AppContext);
  const [rank, setRank] = useState("Novice Learner");

  useEffect(() => {
    if (userData) {
      try {
        setRank(getRank(userData.score));
      } catch (error) {
        console.log(error);
      }
    }
  }, [userData]);

  return (
    <div>
      Profile
      <SetAvatar />
      <p
      className="mb-2 font-semibold text-primary dark:text-primary-400"
      >@{userData?.handle}</p>
      <SetFirstName />
      <SetLastName />
      <SetPhoneNumber />
      <SetAddress />
      <p><FontAwesomeIcon
        icon={faStar}
      ></FontAwesomeIcon>: {userData?.score} points</p>
      <p>
        <FontAwesomeIcon
        icon={faTrophy}
        ></FontAwesomeIcon>
        : {rank}</p>
    </div>
  );
}
