import { useEffect, useState } from "react";
import { getAllUsers } from "../../../services/user.service";
import {
  blockUser,
  changeRole,
  deleteUser,
} from "../../../services/admin-functions";
import toast from "react-hot-toast";
import SortingDropdown from "../../../components/Dropdown/Dropdown";
import { usersSortingOptions } from "../../../constants/constants";
import { sortUsers } from "../../../services/sorting-functions";
import { useNavigate } from "react-router";

export default function AllUsers() {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});
  const [usersSortBy, setUsersSortBy] = useState("dateDescending");

  useEffect(() => {
    getAllUsers()
      .then((users) => users.map((user) => user.val()))
      .then((userData) => setUsers(userData));
  }, [user]);

  const navigate = useNavigate();

  useEffect(() => {}, [user]);

  const handleUsersSortChange = (sortBy) => {
    setUsersSortBy(sortBy);
  };

  const removeUser = async (handle) => {
    try {
      await deleteUser(handle);
      setUsers(users.filter((user) => user.handle !== handle));
      toast.success(`User ${handle} has been deleted`);
    } catch (error) {
      toast.error(`Could not delete user ${user.handle}`);
    }
  };

  return (
    <div>
      <h1>All Users</h1>
      <h2>Total Users: {users.length}</h2> <br />
      {
        <SortingDropdown
          options={usersSortingOptions}
          defaultOption={usersSortBy}
          onChange={handleUsersSortChange}
        />
      }
      <div>
        <br />
      </div>
      <table>
        <thead>
          <tr>
            <th>User</th>
            <th>Name</th>
            <th>Role</th>
            <th>Status</th>
            <th>Date of registration</th>
          </tr>
        </thead>
        <tbody>
          {users &&
            sortUsers(users, usersSortBy).map((user) => (
              <tr key={user.id}>
                <td>{user.handle}</td>
                <td>{user.firstName + " " + user.lastName}</td>
                <td>
                  {user.role === "admin" ? (
                    <span style={{ color: "rgb(255, 45, 45)" }}>
                      {user.role}
                    </span>
                  ) : user.role === "educator" ? (
                    <span style={{ color: "rgb(45, 45, 255)" }}>
                      {user.role}
                    </span>
                  ) : (
                    <span style={{ color: "rgb(45, 255, 45)" }}>
                      {user.role}
                    </span>
                  )}
                </td>
                <td>
                  {user.blocked ? (
                    <span style={{ color: "rgb(255, 45, 45)" }}>Blocked</span>
                  ) : (
                    <span style={{ color: "rgb(45, 255, 45)" }}>Active</span>
                  )}
                </td>
                <td>{new Date(user.createdOn).toLocaleDateString()}</td>
                {user.role !== "admin" && (
                  <span>
                    <button
                      onClick={() => {
                        changeRole(user, setUser);
                      }}
                    >
                      Change Role
                    </button>
                    <button
                      onClick={() => {
                        user.handle && removeUser(user.handle);
                      }}
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => {
                        navigate(`/profile/${user.handle}`);
                      }}
                    >
                      See profile
                    </button>
                    <button
                      onClick={() => {
                        blockUser(user, setUser);
                      }}
                    >
                      {user.blocked ? "Unblock" : "Block"}
                    </button>
                  </span>
                )}
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
