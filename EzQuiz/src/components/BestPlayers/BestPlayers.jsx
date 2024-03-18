import { useContext, useEffect, useState } from "react";
import { getAllUsers, updateUserData } from "../../services/user.service";
import { AppContext } from "../../context/AppContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import toast from "react-hot-toast";

export default function BestPlayers() {
  const [users, setUsers] = useState([]);
  const { userData } = useContext(AppContext);
  const [editing, setEditing] = useState(false);
  const [userToEdit, setUserToEdit] = useState("");
  const [bestPlayers, setBestPlayers] = useState([]);
  const [editedScore, setEditedScore] = useState(0);

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
                          {user.handle}
                        </td>
                        {userData.role === "admin" &&
                        editing &&
                        userToEdit === user.handle ? (
                          <td className="px-6 py-4 whitespace-nowrap">
                            <input
                              type="number"
                              value={editedScore}
                              onChange={(e) => setEditedScore(e.target.value)}
                            />
                            <button onClick={handleSave}>Save</button>
                            <button onClick={handleCancel}>Cancel</button>
                          </td>
                        ) : (
                          <td className="whitespace-nowrap px-6 py-4">
                            {user.score}
                            {userData.role === "admin" && (
                              <FontAwesomeIcon
                                icon={faPen}
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
