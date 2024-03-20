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
    <div className="mt-8 max-w-[1350px] mx-auto">
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
      <table className="mt-10 mx-auto text-center text-sm font-light min-w-[1300px]">
        <thead className="border-b bg-neutral-50 font-medium border-neutral-300">
          <tr>
            <th scope="col" className="px-6 py-4">
              #
            </th>
            <th scope="col" className="px-6 py-4">
              Username
            </th>
            <th scope="col" className="px-6 py-4">
              Name
            </th>
            <th scope="col" className="px-6 py-4">
              Surname
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
                  key={user.handle}
                  className="border-b transition duration-75 ease-in-out hover:bg-neutral-100 border h-[80px] text-center items-center"
                >
                  <td className=" pl-4">
                    <img
                      src={user.avatar}
                      alt={user.handle}
                      className="w-8 h-8 rounded-full mr-4 border-none shadow-neutral-600 shadow-sm"
                    />
                  </td>
                  <td className="text-center align-middle">
                    <span>
                      <span
                        className="hover:cursor-pointer font-medium text-primary transition duration-150 ease-in-out hover:text-primary-600 focus:text-primary-600 active:text-primary-700"
                        onClick={() => navigate(`profile/${user.handle}`)}
                      >
                        {user.handle}
                      </span>
                    </span>
                  </td>
                  <td className="text-center align-middle">{user.firstName}</td>
                  <td className="text-center align-middle">{user.lastName}</td>
                  <td className="text-center align-middle">{user.email}</td>
                  <td className="text-center align-middle">
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
                  <td className="">
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
                  <td className="">
                    {new Date(user.createdOn).toLocaleDateString()}
                  </td>
                  {user.role !== "admin" && (
                    <td className="max-w-[250px] grid grid-cols-2 gap-1 text-center items-center mt-1.5 mr-4">
                      <button
                        type="button"
                        className="rounded bg-neutral-700 pb-1 pt-1.5 px-2 text-[10px] font-medium uppercase text-neutral-50 transition duration-75 ease-in-out hover:bg-neutral-800"
                        onClick={() => {
                          changeRole(user, setUser);
                        }}
                      >
                        Change Role
                      </button>
                      <button
                        type="button"
                        className="rounded bg-neutral-700 pb-1 pt-1.5 px-2 text-[10px] font-medium uppercase text-neutral-50 transition duration-75 ease-in-out hover:bg-neutral-800"
                        onClick={() => {
                          user.handle && removeUser(user.handle);
                        }}
                      >
                        Delete
                      </button>
                      <button
                        type="button"
                        className="rounded bg-neutral-700 pb-1 pt-1.5 px-2 text-[10px] font-medium uppercase text-neutral-50 transition duration-75 ease-in-out hover:bg-neutral-800"
                        onClick={() => {
                          navigate(`/profile/${user.handle}`);
                        }}
                      >
                        See profile
                      </button>
                      <button
                        type="button"
                        className="rounded bg-neutral-700 pb-1 pt-1.5 px-2 text-[10px] font-medium uppercase text-neutral-50 transition duration-75 ease-in-out hover:bg-neutral-800"
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
