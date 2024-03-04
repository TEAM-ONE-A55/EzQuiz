import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import SetAvatar from "./SetAvatar";
import SetPhoneNumber from "./SetPhoneNumber";
import SetFirstName from "./SetFirstName";
import SetLastName from "./SetLastName";
import SetAddress from "./SetAddress";
import { getRank } from "../../components/Score/scores-students";

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
      <h1>Profile</h1>
      <p>{userData?.handle}</p>
      <SetAvatar />
      <SetPhoneNumber />
      <SetFirstName />
      <SetLastName />
      <SetAddress />
      <p>Score: {userData?.score}</p>
      <p>Rank: {rank}</p>
    </div>
  );
}
