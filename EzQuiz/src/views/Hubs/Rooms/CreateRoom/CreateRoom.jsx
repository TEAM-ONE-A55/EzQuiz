import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../../../context/AppContext";
import { getAllUsers, updateUserData } from "../../../../services/user.service";
import toast from "react-hot-toast";
import { createHub, updateHub } from "../../../../services/hub.service";
import { defaultCoverRoom } from "../../../../constants/constants";
import { v4 } from "uuid";
import ChangeCover from "../../../../components/ChangeCoverImage/ChangeCoverImage";
import { deleteCoverImage } from "../../../../services/storage.service";
import { getAllQuizzesFromDatabase } from "../../../../services/quiz.service";
import DropdownSelectUsers from "../../../../components/Dropdown/DropdownSelectUsers/DropdownSelectUsers";
import DropdownSelectQuizzes from "../../../../components/Dropdown/DropdownSelectQuizzes/DropdownSelectQuizzes";

export default function CreateRoom() {
  const { userData, setContext } = useContext(AppContext);
  const [users, setUsers] = useState([]);
  const [quizzes, setQuizzes] = useState([]);
  const [room, setRoom] = useState({
    name: "",
    creator: userData.handle,
  });

  const [selectedParticipants, setSelectedParticipants] = useState([]);
  const [selectedQuizzes, setSelectedQuizzes] = useState([]);
  const [attachedImg, setAttachedImg] = useState(null);
  const [imageUrl, setImageUrl] = useState(defaultCoverRoom);
  const [changeCover, setChangeCover] = useState(false);
  const [uuid, setUuid] = useState(v4());

  useEffect(() => {
    if (userData && userData.handle) {
      getAllUsers()
        .then((users) => users.map((user) => user.val()))
        .then((userData) =>
          userData.filter((u) => u.role !== "educator" && u.role !== "admin")
        )
        .then((userData) =>
          setUsers(userData.map((u) => ({ value: u.handle, label: u.handle })))
        )

        .catch((error) => console.log(error));
    }
  }, []);

  useEffect(() => {
    if (userData && userData.handle) {
      getAllQuizzesFromDatabase("creator")
        .then((quizzes) =>
          quizzes.filter((quiz) => quiz.creator === userData.handle)
        )
        .then((data) =>
          setQuizzes(data.map((q) => ({ value: q.id, label: q.title })))
        )
        .catch((error) => console.log(error));
    }
  }, [userData]);

  const handleOnChange = (key) => (e) => {
    setRoom({ ...room, [key]: e.target.value });
  };

  const handleCreateRoom = async () => {
    let id;
    try {
      if (!room.name) {
        throw new Error("Please provide a Room name!");
      }
      id = await createHub(room.name, userData.handle, imageUrl, "rooms", uuid);

      for (const user in selectedParticipants) {
        await updateHub(
          "rooms",
          id,
          "participants",
          selectedParticipants[user].value,
          "pending"
        );

        await updateUserData(userData.handle, `rooms/${id}`, room);
      }
      for (const quiz in selectedQuizzes) {
        await updateHub(
          "rooms",
          id,
          "quizzes",
          selectedQuizzes[quiz].value,
          selectedQuizzes[quiz].value
        );
      }

      updateUserData(userData.handle, `rooms/${id}`, room);
      toast.success("Your room has been successfully created!");
    } catch (e) {
      toast.error(e.message);
    } finally {
      userData.rooms = { ...userData.rooms, [id]: room };
      setContext((prev) => prev, userData);
      reset();
    }
  };

  const reset = () => {
    setRoom({
      name: "",
      creator: userData.handle,
      uuid: "",
    });
    setSelectedQuizzes([]);
    setSelectedParticipants([]);
    setUuid(v4());
    setImageUrl(defaultCoverRoom);
    setAttachedImg(null);
    setChangeCover(false);
  };

  return (
    <div className="mt-8 w-3/5 mx-auto">
      <h2 className="mb-4 font-extrabold leading-none tracking-tighter text-neutral-800 md:text-4xl lg:text-4xl">
        Create a <span className="text-yellow-400">personalized room</span>{" "}
        where you can{" "}
        <span className="text-yellow-400">invite participants</span> for
        exclusive quizzes and assessments
      </h2>
      <br />
      <p className="text-lg font-normal text-neutral-600 lg:text-xl">
        Assess participants&apos; scores and customize quizzes tailored to your
        preferences. Whether you&apos;re planning an educational assessment, a
        recruitment evaluation, or simply a fun quiz night with friends, this
        feature allows you to host engaging activities while managing and
        analyzing participants&apos; performance effectively.
      </p>
      <div className="mt-8">
        <div className="block rounded-xl bg-neutral-50 p-16 text-surface shadow-neutral-500 shadow-lg m-12 mx-auto">
          {!changeCover ? (
            <div className="attached-hub-image-container ">
              <img
                className="attached-hub-image shadow-xl shadow-neutral-800 mx-auto w-11/12"
                src={imageUrl}
                style={{ backgroundPosition: "100%" }}
              />
              <button
                type="button"
                onClick={() => setChangeCover(true)}
                data-te-ripple-init
                data-te-ripple-color="light"
                className="hub-image-button  inline-block w-2/6  rounded-lg bg-yellow-400 px-6 pt-2.5 pb-2 text-sm font-medium uppercase leading-normal text-neutral-900 shadow-lg  shadow-neutral-900 transition duration-75 ease-in-out hover:bg-yellow-500"
              >
                Change Cover
              </button>
            </div>
          ) : (
            <ChangeCover
              attachedImg={attachedImg}
              setAttachedImg={setAttachedImg}
              imageUrl={imageUrl}
              setImageUrl={setImageUrl}
              uuid={uuid}
              setChangeCover={setChangeCover}
              keyComponent="rooms"
            />
          )}

          <br />
          <div className="w-11/12 mx-auto">
            <p className="text-lg font-normal text-neutral-600 lg:text-xl">
              Set Room name:
            </p>
            <input
              className="pl-3 outline-none border-none2 rounded-md p-2 w-full focus:border-blue-500 transition duration-300 ease-in-out shadow-lg shadow-neutral-400 mt-4"
              type="text"
              placeholder="Add room name..."
              value={room.name}
              onChange={handleOnChange("name")}
            />
            <br />
            <br />

            <br />
            <p className="text-lg font-normal text-neutral-600 lg:text-xl">
              Select participants to invite:
            </p>
            <br />
            <DropdownSelectUsers
              users={users}
              selectedUsers={selectedParticipants}
              setSelectedUsers={setSelectedParticipants}
            />
            <br />
            <br />
            <p className="text-lg font-normal text-neutral-600 lg:text-xl">
              Select quizzes:
            </p>
            <br />
            <DropdownSelectQuizzes
              quizzes={quizzes}
              selectedQuizzes={selectedQuizzes}
              setSelectedQuizzes={setSelectedQuizzes}
            />
            <br />
            <br />
            <button
              type="button"
              onClick={handleCreateRoom}
              data-te-ripple-init
              data-te-ripple-color="light"
              className="mb-6 inline-block w-2/6 ml-5 mt-3 rounded-lg bg-yellow-400 px-6 pt-2.5 pb-2 text-sm font-medium uppercase leading-normal text-neutral-900 shadow-lg hover:bg-yellow-500 transition duration-75 ease-in-out"
            >
              Create Room
            </button>
            <button
              type="button"
              onClick={() => {
                reset();
                attachedImg && deleteCoverImage("rooms", uuid);
              }}
              data-te-ripple-init
              data-te-ripple-color="light"
              className="mb-6 inline-block w-2/6 ml-5 rounded-lg bg-neutral-800 hover:bg-neutral-900 px-6 pt-2.5 pb-2 text-sm font-medium uppercase leading-normal text-white shadow-lg shadow-neutral-400 transition duration-75 ease-in-out"
            >
              Reset Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
