import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../../context/AppContext";
import { getAllUsers, updateUserData } from "../../../services/user.service";
import Select from "react-select";
import "./CreateRoom.css";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "../../../components/Button/Button";

export default function ClassRoom() {
  const { userData } = useContext(AppContext);
  const [users, setUsers] = useState([]);
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    getAllUsers()
      .then((users) => users.map((user) => user.val()))
      .then((userData) =>
        setUsers(userData.map((u) => ({ value: u.handle, label: u.handle })))
      )
      .catch((error) => console.log(error));
  }, []);

  const handleChange = () => {
    updateUserData(userData.handle, "rooms");
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
                fontFamily:  "Montserrat, sans-serif",
              },
            }}
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
        />
        <br />
        <Button onClick={() => {}}>Create Room</Button>
      </div>
    </div>
  );
}
