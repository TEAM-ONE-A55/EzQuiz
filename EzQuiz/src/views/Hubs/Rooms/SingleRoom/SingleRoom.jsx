import { useContext, useState } from "react";
import { AppContext } from "../../../../context/AppContext";
import { useParams } from "react-router";
import SingleHub from "../../SingleHub/SingleHub";

export default function SingleRoom() {
  const { userData } = useContext(AppContext);
  const { id } = useParams();
  const [room, setRoom] = useState({
    name: "",
    image_cover: "",
    creator: "",
    participants: {},
    uuid: "",
  });

  return (
    <SingleHub
      hubType="rooms"
      participantRole="student"
      hub={room}
      setHub={setRoom}
      userData={userData}
      id={id}
    />
  );
}
