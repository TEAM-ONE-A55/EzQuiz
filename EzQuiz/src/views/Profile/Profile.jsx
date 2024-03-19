import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { getRank } from "../../components/Score/scores-students";
import { faStar, faTrophy } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SetAvatar from "./SetAvatar";
import SetPhoneNumber from "./SetPhoneNumber";
import SetFirstName from "./SetFirstName";
import SetLastName from "./SetLastName";
import SetAddress from "./SetAddress";

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
      <h1 className="text-3xl font-bold mt-8 mb-8">Your Profile</h1>
      <div className="bg-neutral-100 max-w-lg rounded-xl flex-col py-8 px-10 relative shadow-neutral-500 shadow-2xl m-auto text-center">
        <p className="mb-4 text-2xl font-semibold text-neutral-900 bg-neutral-200 max-w-fit mx-auto px-4 py-1 rounded-xl">@{userData?.handle}</p>
        <SetAvatar />
        <div className="flex flex-col gap-4 font-medium mb-4 text-lg text-neutral-900 bg-neutral-200 max-w-[90%] mx-auto px-4 py-4 rounded-xl shadow-neutral-500 shadow-inner ">
          <SetFirstName />
          <SetLastName />
          <SetPhoneNumber />
          <SetAddress />
          <p><FontAwesomeIcon icon={faStar} />{userData?.score}</p>
          <p><FontAwesomeIcon icon={faTrophy} />{rank}</p>
        </div>
      </div>
    </div>
  );
}
