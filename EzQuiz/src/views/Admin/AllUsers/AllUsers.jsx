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
import Select from "react-select";
import { reactSelectStyles } from "../../../services/react-select-styles";

export default function AllUsers() {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});
  const [usersSortBy, setUsersSortBy] = useState("dateDescending");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOption, setSelectedOption] = useState(usersSortingOptions[0]);

  const handleOptionChange = (e) => {
    setSelectedOption({ ...e });
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
    <div className="mt-8">
      <div className="mb-6 mx-auto w-4/5 rounded-xl p-8 bg-neutral-200 shadow-neutral-400 shadow-inner text-neutral-800 font-bold">
        <h2 className="text-4xl text-neutral-800 ">All Users</h2>
      </div>
      <h2 className="text-xl text-neutral-600 mb-4 -mt-2 ">
        Total Users: {users.length}
      </h2>
      <div className="mx-auto w-4/5 flex flex-row">
        <input
          type="search"
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-3 mr-2 h-[38px] outline-none border-none rounded-[4px] p-2 w-full transition duration-75 ease-in-out shadow-lg shadow-neutral-200"
          id="exampleSearch"
          placeholder="Search users..."
        />
        {
          <Select
            value={selectedOption}
            options={usersSortingOptions}
            onChange={handleOptionChange}
            className="basic-multi-select w-72 mx-auto"
            styles={reactSelectStyles}
          />
        }
      </div>
      <table className=" mt-10 w-[1700px] mx-auto text-center text-sm font-light">
        <thead className="border-b bg-neutral-50 font-medium border-neutral-300">
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
            <th scope="col" className="px-6 py-4">
              Action
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
                  user.email.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((user) => (
                <tr
                  key={user.id}
                  className="border-b transition duration-300 ease-in-out hover:bg-neutral-100"
                >
                  <td className="whitespace-nowrap py-4 px-6 flex items-center justify-center">
                    <span>
                      <img
                        src={user.avatar}
                        alt={user.handle}
                        className="w-8 h-8 rounded-full mr-2 border-none shadow-neutral-600 shadow-sm"
                      />
                    </span>
                    <span className="w-20">{user.handle}</span>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    {user.firstName}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    {user.lastName}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">{user.email}</td>
                  <td className="whitespace-nowrap px-6 py-4">
                    {user.role === "admin" ? (
                      <span
                        className="font-medium"
                        style={{ color: "rgb(255, 45, 45)" }}
                      >
                        {user.role}
                      </span>
                    ) : user.role === "educator" ? (
                      <span
                        className="font-medium"
                        style={{ color: "rgb(45, 45, 255)" }}
                      >
                        {user.role}
                      </span>
                    ) : (
                      <span className="font-medium text-yellow-400">
                        {user.role}
                      </span>
                    )}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    {user.blocked ? (
                      <span
                        className="font-medium"
                        style={{ color: "rgb(255, 45, 45)" }}
                      >
                        Blocked
                      </span>
                    ) : (
                      <span
                        className="font-medium "
                        style={{ color: "rgb(45, 245, 45)" }}
                      >
                        Active
                      </span>
                    )}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    {new Date(user.createdOn).toLocaleDateString()}
                  </td>
                  {user.role !== "admin" && (
                    <td>
                      <button
                        type="button"
                        className="mx-1 w-[120px] inline-block rounded bg-neutral-800 pb-2 pt-2.5  text-[10px] font-medium uppercase leading-normal text-neutral-50 shadow-[0_4px_9px_-4px_rgba(51,45,45,0.7)] transition duration-150 ease-in-out hover:bg-neutral-800 hover:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] focus:bg-neutral-800 focus:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] focus:outline-none focus:ring-0 active:bg-neutral-900 active:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)]"
                        onClick={() => {
                          changeRole(user, setUser);
                        }}
                      >
                        Change Role
                      </button>
                      <button
                        type="button"
                        className="mx-1 w-[120px] inline-block rounded bg-neutral-800 px-6 pb-2 pt-2.5  text-[10px] font-medium uppercase leading-normal text-neutral-50 shadow-[0_4px_9px_-4px_rgba(51,45,45,0.7)] transition duration-150 ease-in-out hover:bg-neutral-800 hover:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] focus:bg-neutral-800 focus:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] focus:outline-none focus:ring-0 active:bg-neutral-900 active:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)]"
                        onClick={() => {
                          user.handle && removeUser(user.handle);
                        }}
                      >
                        Delete
                      </button>
                      <button
                        type="button"
                        className="mx-1 w-[120px] inline-block rounded bg-neutral-800 px-6 pb-2 pt-2.5  text-[10px] font-medium uppercase leading-normal text-neutral-50 shadow-[0_4px_9px_-4px_rgba(51,45,45,0.7)] transition duration-150 ease-in-out hover:bg-neutral-800 hover:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] focus:bg-neutral-800 focus:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] focus:outline-none focus:ring-0 active:bg-neutral-900 active:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)]"
                        onClick={() => {
                          navigate(`/profile/${user.handle}`);
                        }}
                      >
                        See profile
                      </button>
                      <button
                        type="button"
                        className="mx-1 w-[120px] inline-block rounded bg-neutral-800 px-6 pb-2 pt-2.5  text-[10px] font-medium uppercase leading-normal text-neutral-50 shadow-[0_4px_9px_-4px_rgba(51,45,45,0.7)] transition duration-150 ease-in-out hover:bg-neutral-800 hover:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] focus:bg-neutral-800 focus:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] focus:outline-none focus:ring-0 active:bg-neutral-900 active:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)]"
                        onClick={() => {
                          blockUser(user, setUser);
                        }}
                      >
                        {user.blocked ? "Unblock" : "Block"}
                      </button>
                    </td>
                  )}
                </tr>
              ))}
        </tbody>
      </table>
    </div>
  );
}
