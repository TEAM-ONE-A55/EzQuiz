import React, { useEffect, useState } from "react";
import { getAllUsers } from "../../../services/user.service";
import { getAllHubs } from "../../../services/hub.service";
import { getAllQuizzesFromDatabase } from "../../../services/quiz.service";
import { useNavigate } from "react-router";

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [groups, setGroups] = useState([]);
  const [quizzes, setQuizzes] = useState([]);

  const navigate = useNavigate();

  const getUsers = async () => {
    const allUsers = await getAllUsers();
    setUsers(allUsers);
  };

  const getQuizzes = async () => {
    const allQuizzes = await getAllQuizzesFromDatabase("creator");
    setQuizzes(allQuizzes);
  };

  const getRooms = async () => {
    const allRooms = await getAllHubs("rooms");
    setRooms(allRooms);
  };

  const getGroups = async () => {
    const allGroups = await getAllHubs("groups");
    setGroups(allGroups);
  };

  useEffect(() => {
    getUsers();
    getGroups();
    getRooms();
    getQuizzes();
  }, [users]);

  return (
    <div>
      <span className="text-black-400 bg-neutral text-4xl mb-2 mt-0 font-medium leading-tight">
        Total Users: {users.length}
      </span>{" "}
      <br />
      <button
        type="button"
        onClick={() => navigate("/all-users")}
        className="inline-block rounded-full bg-black px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-amber-400 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
      >
        See all Users
      </button>{" "}
      <br />
      <span className="text-black-400 bg-neutral text-4xl mb-2 mt-0 font-medium leading-tight">
        Total Quizzes: {quizzes.length}
      </span>
      <br />
      <button
        type="button"
        onClick={() => navigate("/all-quizzes")}
        className="inline-block rounded-full bg-black px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-amber-400 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
      >
        See all Quizzes
      </button>{" "}
      <br />
      <span className="text-black-400 bg-neutral text-4xl mb-2 mt-0 font-medium leading-tight">
        Total Rooms: {rooms.length}
      </span>
      <br />
      <button
        type="button"
        onClick={() => navigate("/all-rooms")}
        className="inline-block rounded-full bg-black px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-amber-400 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
      >
        See all Rooms
      </button>{" "}
      <br />
      <span className="text-black-400 bg-neutral text-4xl mb-2 mt-0 font-medium leading-tight">
        Total Groups: {groups.length}
      </span>
      <br />
      <button
        type="button"
        onClick={() => navigate("/all-groups")}
        className="inline-block rounded-full bg-black px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-amber-400 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
      >
        See all Groups
      </button>
    </div>
  );
}
