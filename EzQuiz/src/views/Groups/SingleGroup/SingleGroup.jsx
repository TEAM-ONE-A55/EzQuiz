import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../../context/AppContext";
import { useParams } from "react-router";
import { getHubsById, updateHub } from "../../../services/hub.service";
import {
  getUserByHandle,
  updateUserData,
} from "../../../services/user.service";
import Button from "../../../components/Button/Button";

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

  const [participants, setParticipants] = useState([
    {
      handle: "",
      avatar: "",
      email: "",
      phoneNumber: "",
      firstName: "",
      lastName: "",
    },
  ]);
  const [hasParticipants, setHasParticipants] = useState(false);

  const [creator, setCreator] = useState({
    handle: "",
    avatar: "",
    email: "",
    phoneNumber: "",
    firstName: "",
    lastName: "",
  });

  const [hasCreator, setHasCreator] = useState(false);

  useEffect(() => {
    getHubsById("groups", id).then(setGroup);
  }, []);

  useEffect(() => {
    if (group.participants) {
      const promises = Object.keys(group.participants).map(async (p) => {
        return getUserByHandle(p).then((snapshot) => ({
          handle: snapshot.val().handle,
          avatar: snapshot.val().avatar,
          email: snapshot.val().email,
          phoneNumber: snapshot.val().phoneNumber,
          firstName: snapshot.val().firstName,
          lastName: snapshot.val().lastName,
        }));
      });

      Promise.all(promises)
        .then((participantsData) => {
          setParticipants([...participantsData]);
        })
        .then(setHasParticipants(true));
    }

    getUserByHandle(group.creator)
      .then((snapshot) => setCreator(snapshot.val()))
      .then(setHasCreator(true));
  }, [group]);

  console.log(creator);

  const removeUser = async (groupId, user) => {
    await updateHub("groups", groupId, "participants", user, null);
    await updateUserData(user, `groups/${groupId}`, null);
    const updatedParticipants = participants.filter((p) => p.handle !== user);
    setParticipants(updatedParticipants);
  };

  console.log(group);

  return (
    group && (
      <>
        <div className="mx-auto text-center md:max-w-xl lg:max-w-3xl">
          <h3 className="mb-6 text-3xl font-bold">Group: {group.name}</h3>
          <p className="mb-6 pb-2 text-neutral-600 dark:text-neutral-300 md:mb-12 md:pb-0">
            {group.description}
          </p>
        </div>
        {hasCreator && (
          <>
            <div className="mb-6">
              <img
                src={creator.avatar}
                alt={creator.firstName + " " + creator.lastName}
                className="w-32 h-32 rounded-full shadow-lg dark:shadow-black/30 mx-auto"
              />
            </div>
            <h5 className="mb-2 text-xl font-semibold">
              {creator.firstName} {creator.lastName}
            </h5>
            <h6 className="mb-2 font-semibold text-primary dark:text-primary-400">
              Creator: @{creator.handle}
            </h6>
          </>
        )}
        <br />
        <hr />
        <br />
        <h5 className="mb-4 text-xl font-semibold">Members: </h5>
        <div className="flex flex-wrap justify-center">
          {hasParticipants &&
            participants.map((p) => (
              <div key={p.handle} className="mx-4 mb-6">
                <div className="text-center">
                  <div className="mb-6">
                    <img
                      src={p.avatar}
                      alt={p.firstName + " " + p.lastName}
                      className="w-32 h-32 rounded-full shadow-lg dark:shadow-black/30 mx-auto"
                    />
                  </div>
                  <h5 className="mb-2 text-xl font-semibold">
                    {p.firstName} {p.lastName}
                  </h5>
                  <h6 className="mb-2 font-semibold text-primary dark:text-primary-400">
                    @{p.handle}
                  </h6>
                  <br />
                  <div className="flex justify-center items-center mb-2 text-neutral-600 dark:text-neutral-300">
                    <span className="material-symbols-outlined mr-2">
                      smartphone
                    </span>
                    {p.phoneNumber || "Not provided"}
                  </div>
                  <div className="flex justify-center items-center mb-2 text-neutral-600 dark:text-neutral-300">
                    <span className="material-symbols-outlined mr-2">
                      email
                    </span>
                    {p.email || "Not provided"}
                  </div>
                  <div className="flex justify-center items-center mb-2 text-neutral-600 dark:text-neutral-300">
                    <span>Status: </span>{"  "}
                    <span> {" "}
                    {
                      Object.entries(group.participants)
                        .filter((user) => {
                          if (user[0] === p.handle) {
                            return user[1];
                          }
                        })
                        .join(" ")
                        .split(",")[1]
                    }
                    </span>
                  </div>
                  {userData.handle === group.creator && (
                    <div className="flex justify-center items-center mb-2 text-neutral-600 dark:text-neutral-300">
                      <Button onClick={() => removeUser(id, p.handle)}>
                        Remove
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            ))}
        </div>
      </>
    )
  );
}
