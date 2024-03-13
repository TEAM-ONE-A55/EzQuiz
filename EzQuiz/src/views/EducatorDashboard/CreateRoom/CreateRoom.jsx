import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../../context/AppContext";
import { getAllUsers, updateUserData } from "../../../services/user.service";
import Select from "react-select";
import "./CreateRoom.css";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "../../../components/Button/Button";
import toast from "react-hot-toast";
import { createHub, updateHub } from "../../../services/hub.service";
import { defaultCoverRoom } from "../../../constants/constants";
import { v4 } from "uuid";
import ChangeCover from "../../../components/ChangeCoverImage/ChangeCoverImage";
import { deleteCoverImage } from "../../../services/storage.service";

export default function CreateRoom() {
  const { userData, setContext } = useContext(AppContext);
  const [users, setUsers] = useState([]);
  // eslint-disable-next-line no-unused-vars
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

  const handleOnChange = (key) => (e) => {
    setRoom({ ...room, [key]: e.target.value });
  };

  const handleSelectedOptions = (selected) => {
    setSelectedParticipants(selected);
  };

  const handleCreateRoom = async () => {
    let id;
    try {
      if (!room.name) {
        throw new Error("Please provide a Room name!");
      }
      id = await createHub(
        room.name,
        userData.handle,
        imageUrl,
        "rooms",
        uuid
      );

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
          selectedParticipants[quiz].value,
          "pending"
        );
      }

      updateUserData(userData.handle, `rooms/${id}`, room);
      toast.success("Your room has been successfully created!");
    } catch (e) {
      toast.error(e.message);
    } finally {
      userData.rooms = {...userData.rooms, [id]: room}
      setContext(prev => prev, userData)
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
    <div className="create-room-container">
      <h2 className="mb-4 font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-4xl dark:text-white">
        Create a{" "}
        <span className="text-blue-600 dark:text-blue-500">
          personalized room
        </span>{" "}
        where you can{" "}
        <span className="text-blue-600 dark:text-blue-500">
          invite participants
        </span>{" "}
        for exclusive quizzes and assessments.
      </h2>
      <br />

      <p className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">
        Assess participants&apos; scores and customize quizzes tailored to your
        preferences. Whether you&apos;re planning an educational assessment, a
        recruitment evaluation, or simply a fun quiz night with friends, this
        feature allows you to host engaging activities while managing and
        analyzing participants&apos; performance effectively.
      </p>

      <br />

      <div className="create-room-box">
        {!changeCover ? (
          <div className="attached-hub-image-container">
            <img
              className="attached-hub-image"
              src={imageUrl}
              style={{ backgroundPosition: "50%" }}
            />
            <button
              className="hub-image-button"
              onClick={() => setChangeCover(true)}
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
        <p className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">
          Set Room name:
        </p>
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: "100%" },
            "& .MuiInputLabel-root": { color: "white" },
            "& .MuiInputLabel-root.Mui-focused": { color: "white" },
            "& .MuiInputBase-root": { color: "white" },
            "& .MuiOutlinedInput-root": {
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "white",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "white",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "white",
              },
            },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="outlined-basic"
            // label="Room name"
            placeholder="Room name"
            variant="outlined"
            sx={{
              "& .MuiInputBase-root": {
                color: "black",
                backgroundColor: "white",
                fontFamily: "Montserrat, sans-serif",
              },
            }}
            value={room.name}
            onChange={handleOnChange("name")}
          />
        </Box>
        <br />
        <p className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">
          Select participants to invite:
        </p>
        <br />
        <Select
          isMulti
          name="users"
          options={users.map((user) => user)}
          className="basic-multi-select"
          classNamePrefix="select"
          value={selectedParticipants}
          onChange={handleSelectedOptions}
        />
        <br />
        <p className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">
          Select quizzes:
        </p>
        <br />
        <Select
          isMulti
          name="quizzes"
          options={quizzes.map((quiz) => quiz)}
          className="basic-multi-select"
          classNamePrefix="select"
          value={room.quizzes}
          onChange={handleOnChange("quizzes")}
        />
        <br />
        <Button onClick={handleCreateRoom}>Create Room</Button>
        <Button
          onClick={() => {
            reset();
            attachedImg && deleteCoverImage("rooms", uuid);
          }}
        >
          Reset Settings
        </Button>
      </div>
    </div>
  );
}
