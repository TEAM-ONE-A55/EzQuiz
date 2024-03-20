import { useContext, useState } from "react";
import { AppContext } from "../../../../context/AppContext";
import { useParams } from "react-router";
import SingleHub from "../../SingleHub/SingleHub"

export default function SingleGroup() {
  const { userData } = useContext(AppContext);
  const { id } = useParams();
  const [group, setGroup] = useState({
    name: "",
    description: "",
    image_cover: "",
    creator: "",
    participants: {},
    uuid: "",
  });
  return (
    <SingleHub
      hubType="groups"
      participantRole="educator"
      hub={group}
      setHub={setGroup}
      userData={userData}
      id={id}
    />
  );
}
