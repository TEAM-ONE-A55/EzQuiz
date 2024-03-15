import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../../context/AppContext";
import {
  getAllUsers,
  updateUserData,
} from "../../../services/user.service";
import "./CreateGroup.css";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "../../../components/Button/Button";
import toast from "react-hot-toast";
import { createHub, updateHub } from "../../../services/hub.service";
import { defaultCoverGroup } from "../../../constants/constants";
import { deleteCoverImage } from "../../../services/storage.service";
import { v4 } from "uuid";
import ChangeCover from "../../../components/ChangeCoverImage/ChangeCoverImage";
import { getAllQuizzesFromDatabase } from "../../../services/quiz.service";
import DropdownSelectQuizzes from "../../../components/Dropdown/DropdownSelectQuizzes/DropdownSelectQuizzes";
import DropdownSelectUsers from "../../../components/Dropdown/DropdownSelectUsers/DropdownSelectUsers";

export default function CreateGroup() {

  const { userData, setContext } = useContext(AppContext);
  const [users, setUsers] = useState([]);
  const [quizzes, setQuizzes] = useState([]);
  const [group, setGroup] = useState({
    name: "",
    description: "",
    creator: userData.handle,
  });

  const [selectedEducators, setSelectedEducators] = useState([]);
  const [selectedQuizzes, setSelectedQuizzes] = useState([]);
  const [attachedImg, setAttachedImg] = useState(null);
  const [imageUrl, setImageUrl] = useState(defaultCoverGroup);
  const [changeCover, setChangeCover] = useState(false);
  const [uuid, setUuid] = useState(v4());

  useEffect(() => {
    if (userData && userData.handle) {
      getAllUsers()
        .then((users) => users.map((user) => user.val()))
        .then((data) =>
          data.filter(
            (u) => u.role === "educator" && userData.handle !== u.handle
          )
        )
        .then((data) =>
          setUsers(data.map((u) => ({ value: u.handle, label: u.handle })))
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
        .then((data)=> 
          setQuizzes(data.map((q) => ({value: q.id, label: q.title}))))
        .catch((error) => console.log(error))
    }
  }, [userData]);

  const handleOnChange = (key) => (e) => {
    setGroup({ ...group, [key]: e.target.value });
  };

  const handleCreateGroup = async () => {
    let id;
    try {
      if (!group.name) {
        throw new Error("Please provide a Group name!");
      }
      id = await createHub(
        group.name,
        userData.handle,
        imageUrl,
        "groups",
        uuid,
        group.description
      );
      for (const user in selectedEducators) {
        await updateHub(
          "groups",
          id,
          "participants",
          selectedEducators[user].value,
          "pending"
        );

        await updateUserData(userData.handle, `groups/${id}`, group);
      }
      for (const quiz in selectedQuizzes) {
        await updateHub(
          "groups",
          id,
          "quizzes",
          selectedQuizzes[quiz].value,
          selectedQuizzes[quiz].value
        );
      }

      updateUserData(userData.handle, `groups/${id}`, group);
      toast.success("Your group has been successfully created!");
    } catch (e) {
      toast.error(e.message);
    } finally {
      userData.groups = { ...userData.groups, [id]: group };
      setContext((prev) => prev, userData);
      reset();
    }
  };

  const reset = () => {
    setGroup({
      name: "",
      description: "",
      creator: userData.handle,
      uuid: "",
    });
    setSelectedQuizzes([]);
    setSelectedEducators([]);
    setUuid(v4());
    setImageUrl(defaultCoverGroup);
    setAttachedImg(null);
    setChangeCover(false);
  };

  return (
    <div className="create-group-container">
      <h2 className="mb-4 font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-4xl dark:text-white">
        Create exclusive{" "}
        <span className="text-blue-600 dark:text-blue-500">
          educator groups
        </span>{" "}
        for collaborative{" "}
        <span className="text-blue-600 dark:text-blue-500">
          quiz creation and assessment
        </span>
      </h2>
      <br />

      <p className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">
        Collaborate with fellow educators to tailor quizzes to your teaching
        needs and analyze participant performance. Whether refining teaching
        materials, conducting assessments, or hosting engaging quiz nights, this
        feature ensures effective management and analysis of participant
        performance.
      </p>

      <br />

      <div className="create-group-box">
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
            keyComponent="groups"
          />
        )}
        <br />

        <p className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">
          Set Group name:
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
            placeholder="Group name"
            variant="outlined"
            sx={{
              "& .MuiInputBase-root": {
                color: "black",
                backgroundColor: "white",
                fontFamily: "Montserrat, sans-serif",
              },
            }}
            value={group.name}
            onChange={handleOnChange("name")}
          />
        </Box>
        <br />
        <p className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">
          Write a short description:
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
            placeholder="Write a short description of the group"
            variant="outlined"
            sx={{
              "& .MuiInputBase-root": {
                color: "black",
                backgroundColor: "white",
                fontFamily: "Montserrat, sans-serif",
              },
            }}
            value={group.description}
            onChange={handleOnChange("description")}
          />
        </Box>
        <p className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">
          Select educators to join your group:
        </p>
        <br />
        <DropdownSelectUsers users={users} selectedUsers={selectedEducators} setSelectedUsers={setSelectedEducators}/>
        <br />
        <p className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">
          Select quizzes:
        </p>
        <br />
        <DropdownSelectQuizzes quizzes={quizzes} selectedQuizzes={selectedQuizzes} setSelectedQuizzes={setSelectedQuizzes}/>
        <br />
        <Button onClick={handleCreateGroup}>Create Group</Button>
        <Button
          onClick={() => {
            reset();
            attachedImg && deleteCoverImage("groups", uuid);
          }}
        >
          Reset Settings
        </Button>
      </div>
    </div>
  );
}
