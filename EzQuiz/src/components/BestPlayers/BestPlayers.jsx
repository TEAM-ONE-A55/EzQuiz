import { useContext, useEffect, useState } from "react";
import { getAllUsers, updateUserData } from "../../services/user.service";
import { AppContext } from "../../context/AppContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import toast from "react-hot-toast";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function BestPlayers() {
  const [users, setUsers] = useState([]);
  const { userData } = useContext(AppContext);
  const [editing, setEditing] = useState(false);
  const [userToEdit, setUserToEdit] = useState("");
  const [bestPlayers, setBestPlayers] = useState([]);
  const [editedScore, setEditedScore] = useState(0);

  const navigate = useNavigate();

  const getUsers = async () => {
    const users = await getAllUsers();
    setUsers(users);
  };

  const handleEdit = (handle) => {
    setEditing(true);
    setUserToEdit(handle);
  };

  const editScore = async (handle, value) => {
    try {
      await updateUserData(handle, "score", value);
      toast.success("Score updated successfully");
      setEditing(false);
    } catch (error) {
      toast.error("Error updating score");
    }
  };

  const handleSave = () => {
    editScore(userToEdit, editedScore);
  };

  const handleCancel = () => {
    setEditing(false);
  };

  useEffect(() => {
    getUsers();
  }, [users]);

  useEffect(() => {
    if (users) {
      const sortedUsers = users
        .map((user) => user.val())
        .filter((user) => user.score > 0 && user.role !== "admin");
      setBestPlayers(sortedUsers);
    }
  }, [users]);

  return (
    <div className="flex flex-col">
      <h1 className="mb-2 mt-0 text-5xl font-medium leading-tight text-black">
        Scoreboard
      </h1>
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
          <div className="overflow-hidden">
            <table className="min-w-full text-left text-sm font-light">
              <thead className="border-b bg-white font-medium dark:border-neutral-500 dark:bg-neutral-600">
                <tr>
                  <th scope="col" className="px-6 py-4">
                    #
                  </th>
                  <th scope="col" className="px-6 py-4">
                    First
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Last
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Username
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Score
                  </th>
                </tr>
              </thead>
              <tbody>
                {bestPlayers.map((user, index) => {
                  if (index < 10) {
                    return (
                      <tr
                        key={index}
                        className="border-b bg-neutral-100 dark:border-neutral-500 dark:bg-neutral-700"
                      >
                        <td className="whitespace-nowrap px-6 py-4">
                          {index + 1}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          {user.firstName}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          {user.lastName}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          <span
                            onClick={() => navigate(`profile/${user.handle}`)}
                            className="hover:cursor-pointer mb-2 font-semibold text-primary dark:text-primary-400"
                          >
                            {user.handle}
                          </span>
                        </td>
                        {userData.role === "admin" &&
                        editing &&
                        userToEdit === user.handle ? (
                          <td className="px-6 py-2 whitespace-nowrap max-w-14">
                            <input
                              type="number"
                              value={editedScore}
                              onChange={(e) => setEditedScore(e.target.value)}
                            />
                            <button
                              className="hover:cursor-pointer inline-block rounded bg-neutral-800 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-neutral-50 shadow-[0_4px_9px_-4px_rgba(51,45,45,0.7)] transition duration-150 ease-in-out hover:bg-neutral-800 hover:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] focus:bg-neutral-800 focus:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] focus:outline-none focus:ring-0 active:bg-neutral-900 active:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] dark:bg-neutral-900 dark:shadow-[0_4px_9px_-4px_#030202] dark:hover:bg-neutral-900 dark:hover:shadow-[0_8px_9px_-4px_rgba(3,2,2,0.3),0_4px_18px_0_rgba(3,2,2,0.2)] dark:focus:bg-neutral-900 dark:focus:shadow-[0_8px_9px_-4px_rgba(3,2,2,0.3),0_4px_18px_0_rgba(3,2,2,0.2)] dark:active:bg-neutral-900 dark:active:shadow-[0_8px_9px_-4px_rgba(3,2,2,0.3),0_4px_18px_0_rgba(3,2,2,0.2)]"
                              onClick={handleSave}
                            >
                              Save
                            </button>
                            <button
                              className="hover:cursor-pointer inline-block rounded bg-neutral-800 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-neutral-50 shadow-[0_4px_9px_-4px_rgba(51,45,45,0.7)] transition duration-150 ease-in-out hover:bg-neutral-800 hover:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] focus:bg-neutral-800 focus:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] focus:outline-none focus:ring-0 active:bg-neutral-900 active:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] dark:bg-neutral-900 dark:shadow-[0_4px_9px_-4px_#030202] dark:hover:bg-neutral-900 dark:hover:shadow-[0_8px_9px_-4px_rgba(3,2,2,0.3),0_4px_18px_0_rgba(3,2,2,0.2)] dark:focus:bg-neutral-900 dark:focus:shadow-[0_8px_9px_-4px_rgba(3,2,2,0.3),0_4px_18px_0_rgba(3,2,2,0.2)] dark:active:bg-neutral-900 dark:active:shadow-[0_8px_9px_-4px_rgba(3,2,2,0.3),0_4px_18px_0_rgba(3,2,2,0.2)]"
                              onClick={handleCancel}
                            >
                              Cancel
                            </button>
                          </td>
                        ) : (
                          <td className="whitespace-nowrap px-6 py-4">
                            {user.score}
                            {userData.role === "admin" && (
                              <FontAwesomeIcon
                                icon={faPen}
                                className="hover:cursor-pointer"
                                onClick={() => {
                                  handleEdit(user.handle);
                                }}
                              />
                            )}
                          </td>
                        )}
                      </tr>
                    );
                  }
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
