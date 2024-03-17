import { useEffect, useState } from "react";
import { getAllUsers } from "../../../services/user.service";
import {
  blockUser,
  changeRole,
  deleteUser,
} from "../../../services/admin-functions";
import toast from "react-hot-toast";
import { usersSortingOptions } from "../../../constants/constants";
import { sortUsers } from "../../../services/sorting-functions";
import { useNavigate } from "react-router";
import React from "react";
import Select from "react-select";

export default function AllUsers() {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});
  const [usersSortBy, setUsersSortBy] = useState("dateDescending");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOption, setSelectedOption] = useState(usersSortingOptions[0]);

  const handleOptionChange = (e) => {
    setSelectedOption({...e});
    setUsersSortBy(e.value);
  };

  useEffect(() => {
    getAllUsers()
      .then((users) => users.map((user) => user.val()))
      .then((userData) => setUsers(userData));
  }, [user]);

  const navigate = useNavigate();

  useEffect(() => {}, [user]);

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
        <Select
        name="users"
        options={usersSortingOptions}
        className="basic-multi-select"
        classNamePrefix="select"
        value={usersSortBy}
        onChange={handleOptionChange}
      />
      }
      <div>
        <br />
      </div>
      <br />
      <div className="flex justify-center">
  <div className="mb-3 xl:w-96">
    <input
      type="search"
      onChange={(e) => setSearchTerm(e.target.value)}
      className="relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-black outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-neutral-600 focus:outline-none"
      id="exampleSearch"
      placeholder="Search users..."
    />
  </div>
</div>
      <div className="flex flex-col">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <div className="overflow-hidden">
              <table className="min-w-full text-left text-sm font-light">
                <thead className="border-b font-medium dark:border-neutral-500">
                  <tr>
                    <th scope="col" className="px-6 py-4">
                      Username
                    </th>
                    <th scope="col" className="px-6 py-4">
                      First name
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Last name
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Email
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Role
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Date of registration
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {users &&
                    sortUsers(users, usersSortBy)
                      .filter(
                        (user) =>
                          user.handle
                            .toLowerCase()
                            .includes(searchTerm.toLowerCase()) ||
                          user.firstName
                            .toLowerCase()
                            .includes(searchTerm.toLowerCase()) ||
                          user.lastName
                            .toLowerCase()
                            .includes(searchTerm.toLowerCase()) ||
                          user.email
                            .toLowerCase()
                            .includes(searchTerm.toLowerCase())
                      )
                      .map((user) => (
                        <tr
                          key={user.id}
                          className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600"
                        >
                          <td className="whitespace-nowrap px-6 py-4">
                            {user.handle}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            {user.firstName}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            {user.lastName}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            {user.email}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
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
                          <td className="whitespace-nowrap px-6 py-4">
                            {user.blocked ? (
                              <span style={{ color: "rgb(255, 45, 45)" }}>
                                Blocked
                              </span>
                            ) : (
                              <span style={{ color: "rgb(45, 255, 45)" }}>
                                Active
                              </span>
                            )}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            {new Date(user.createdOn).toLocaleDateString()}
                          </td>
                          {user.role !== "admin" && (
                            <span>
                              <button
                                type="button"
                                className="inline-block rounded bg-neutral-800 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-neutral-50 shadow-[0_4px_9px_-4px_rgba(51,45,45,0.7)] transition duration-150 ease-in-out hover:bg-neutral-800 hover:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] focus:bg-neutral-800 focus:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] focus:outline-none focus:ring-0 active:bg-neutral-900 active:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] dark:bg-neutral-900 dark:shadow-[0_4px_9px_-4px_#030202] dark:hover:bg-neutral-900 dark:hover:shadow-[0_8px_9px_-4px_rgba(3,2,2,0.3),0_4px_18px_0_rgba(3,2,2,0.2)] dark:focus:bg-neutral-900 dark:focus:shadow-[0_8px_9px_-4px_rgba(3,2,2,0.3),0_4px_18px_0_rgba(3,2,2,0.2)] dark:active:bg-neutral-900 dark:active:shadow-[0_8px_9px_-4px_rgba(3,2,2,0.3),0_4px_18px_0_rgba(3,2,2,0.2)]"
                                onClick={() => {
                                  changeRole(user, setUser);
                                }}
                              >
                                Change Role
                              </button>
                              <button
                                type="button"
                                className="inline-block rounded bg-neutral-800 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-neutral-50 shadow-[0_4px_9px_-4px_rgba(51,45,45,0.7)] transition duration-150 ease-in-out hover:bg-neutral-800 hover:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] focus:bg-neutral-800 focus:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] focus:outline-none focus:ring-0 active:bg-neutral-900 active:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] dark:bg-neutral-900 dark:shadow-[0_4px_9px_-4px_#030202] dark:hover:bg-neutral-900 dark:hover:shadow-[0_8px_9px_-4px_rgba(3,2,2,0.3),0_4px_18px_0_rgba(3,2,2,0.2)] dark:focus:bg-neutral-900 dark:focus:shadow-[0_8px_9px_-4px_rgba(3,2,2,0.3),0_4px_18px_0_rgba(3,2,2,0.2)] dark:active:bg-neutral-900 dark:active:shadow-[0_8px_9px_-4px_rgba(3,2,2,0.3),0_4px_18px_0_rgba(3,2,2,0.2)]"
                                onClick={() => {
                                  user.handle && removeUser(user.handle);
                                }}
                              >
                                Delete
                              </button>
                              <button
                                type="button"
                                className="inline-block rounded bg-neutral-800 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-neutral-50 shadow-[0_4px_9px_-4px_rgba(51,45,45,0.7)] transition duration-150 ease-in-out hover:bg-neutral-800 hover:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] focus:bg-neutral-800 focus:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] focus:outline-none focus:ring-0 active:bg-neutral-900 active:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] dark:bg-neutral-900 dark:shadow-[0_4px_9px_-4px_#030202] dark:hover:bg-neutral-900 dark:hover:shadow-[0_8px_9px_-4px_rgba(3,2,2,0.3),0_4px_18px_0_rgba(3,2,2,0.2)] dark:focus:bg-neutral-900 dark:focus:shadow-[0_8px_9px_-4px_rgba(3,2,2,0.3),0_4px_18px_0_rgba(3,2,2,0.2)] dark:active:bg-neutral-900 dark:active:shadow-[0_8px_9px_-4px_rgba(3,2,2,0.3),0_4px_18px_0_rgba(3,2,2,0.2)]"
                                onClick={() => {
                                  navigate(`/profile/${user.handle}`);
                                }}
                              >
                                See profile
                              </button>
                              <button
                                type="button"
                                className="inline-block rounded bg-neutral-800 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-neutral-50 shadow-[0_4px_9px_-4px_rgba(51,45,45,0.7)] transition duration-150 ease-in-out hover:bg-neutral-800 hover:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] focus:bg-neutral-800 focus:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] focus:outline-none focus:ring-0 active:bg-neutral-900 active:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] dark:bg-neutral-900 dark:shadow-[0_4px_9px_-4px_#030202] dark:hover:bg-neutral-900 dark:hover:shadow-[0_8px_9px_-4px_rgba(3,2,2,0.3),0_4px_18px_0_rgba(3,2,2,0.2)] dark:focus:bg-neutral-900 dark:focus:shadow-[0_8px_9px_-4px_rgba(3,2,2,0.3),0_4px_18px_0_rgba(3,2,2,0.2)] dark:active:bg-neutral-900 dark:active:shadow-[0_8px_9px_-4px_rgba(3,2,2,0.3),0_4px_18px_0_rgba(3,2,2,0.2)]"
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
          </div>
        </div>
      </div>
    </div>
  );
}
