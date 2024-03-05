import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../../context/AppContext";
import { getAllUsers, updateUserData } from "../../../services/user.service";
import Select from "react-select";
import "./CreateGroup.css";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "../../../components/Button/Button";
import toast from "react-hot-toast";
import { createHub, updateHub } from "../../../services/hub.service";

export default function ClassRoom() {
  const { userData } = useContext(AppContext);
  const [users, setUsers] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [quizzes, setQuizzes] = useState([]);
  const [group, setGroup] = useState({
    name: "",
    creator: userData.handle,
  });

  const [selectedEducators, setSelectedEducators] = useState([]);
  const [selectedQuizzes, setSelectedQuizzes] = useState([]);

  useEffect(() => {
    getAllUsers()
      .then((users) => users.map((user) => user.val()))
      .then((userData) => userData.filter((u) => u.role === "educator"))
      .then((userData) =>
        setUsers(userData.map((u) => ({ value: u.handle, label: u.handle })))
      )

      .catch((error) => console.log(error));
  }, []);

  const handleOnChange = (key) => (e) => {
    setGroup({ ...group, [key]: e.target.value });
  };

  const handleSelectedOptions = (selected) => {
    setSelectedEducators(selected);
  };

  const handleCreateGroup = async () => {
    try {
      if (!group.name) {
        throw new Error("Please provide a Group name!");
      }
      const id = await createHub(group.name, userData.handle, "groups");
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
          selectedEducators[quiz].value,
          "pending"
        );
      }

      updateUserData(userData.handle, `groups/${id}`, group);
      toast.success("Your room has been successfully created!");
    } catch (e) {
      toast.error(e.message);
    } finally {
      reset();
    }
  };

  const reset = () => {
    setGroup({
      name: "",
      creator: userData.handle,
    });
    setSelectedQuizzes([]);
    setSelectedEducators([]);
  };

  return (
    <div className="create-group-container">
      <h2 className="mb-4 font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-4xl dark:text-white">
        Create exclusive {" "}
        <span className="text-blue-600 dark:text-blue-500">educator rooms</span>{" "}
        for collaborative{" "}
        <span className="text-blue-600 dark:text-blue-500">quiz creation and assessment</span>
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
            // label="Room name"
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
          Select educators to join your group:
        </p>
        <br />
        <Select
          isMulti
          name="users"
          options={users.map((user) => user)}
          className="basic-multi-select"
          classNamePrefix="select"
          value={selectedEducators}
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
          value={group.quizzes}
          onChange={handleOnChange("quizzes")}
        />
        <br />
        <Button onClick={handleCreateGroup}>Create Group</Button>
        <Button onClick={reset}>Reset Settings</Button>
      </div>
    </div>
  );
}
