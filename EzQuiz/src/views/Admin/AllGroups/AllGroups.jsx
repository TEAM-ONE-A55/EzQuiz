import { getAllHubs } from "../../../services/hub.service";
import { useEffect, useState } from "react";
import { deleteHub } from "../../../services/hub.service";
import toast from "react-hot-toast";
import "./AllGroups.css";
import React from "react";
import { useNavigate } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { ref, update } from "firebase/database";
import { db } from "../../../config/firebase.config";

export default function AllGroups() {
  const [groups, setGroups] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editing, setEditing] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [groupEditId, setGroupEditId] = useState("");

  const getAllGroups = async () => {
    const allGroups = await getAllHubs("groups");
    setGroups(allGroups);
  };

  const editGroupName = async (hub, id, key, value) => {
    const path = `${hub}/${id}/${key}`;
    return update(ref(db), { [path]: value });
  };

  const handleChange = (e) => {
    setGroupName(e.target.value);
  };

  const handleEdit = (id) => {
    setEditing(true);
    setGroupEditId(id);
  };

  const handleSave = (group, value) => {
    if (groupName.length < 2) {
      toast.error("Group name must be at least 2 characters long");
      return;
    }
    setEditing(false);
    editGroupName("groups", group.id, "name", value);
  };

  const handleCancel = () => {
    setEditing(false);
  };

  const removeGroup = async (id) => {
    try {
      await deleteHub("groups", id);
      setGroups(groups.filter((group) => group.id !== id));
      toast.success(`Group ${id} has been deleted`);
    } catch (error) {
      toast.error(`Could not delete group ${id}`);
    }
  };

  const navigate = useNavigate();

  useEffect(() => {
    getAllGroups();
  }, []);

  useEffect(() => {
    getAllGroups();
  }, [editing]);

  return (
    <div>
      <h1>All Groups</h1>
      <h2>Total Groups: {groups.length}</h2>
      <div className="flex justify-center">
        <div className="mb-3 xl:w-96">
          <input
            type="search"
            onChange={(e) => setSearchTerm(e.target.value)}
            className="relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-black outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-neutral-600 focus:outline-none"
            id="exampleSearch"
            placeholder="Search groups..."
          />
        </div>
      </div>
      <br />
      <br />
      <table className="min-w-full text-left text-sm font-light">
        <thead className="border-b font-medium dark:border-neutral-500">
          <tr>
            <th scope="col" className="px-6 py-4">
              Group name
            </th>
            <th scope="col" className="px-6 py-4">
              Participants
            </th>
            <th scope="col" className="px-6 py-4">
              Creator
            </th>
          </tr>
        </thead>
        <tbody>
          {groups
            .filter((group) =>
              group.name.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((group) => (
              <tr
                key={group.id}
                className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600"
              >
                {editing && groupEditId === group.id ? (
                  <div>
                    <input
                      type="text"
                      value={groupName}
                      onChange={handleChange}
                    />
                    <button
                      className="hover:cursor-pointer inline-block rounded bg-neutral-800 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-neutral-50 shadow-[0_4px_9px_-4px_rgba(51,45,45,0.7)] transition duration-150 ease-in-out hover:bg-neutral-800 hover:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] focus:bg-neutral-800 focus:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] focus:outline-none focus:ring-0 active:bg-neutral-900 active:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] dark:bg-neutral-900 dark:shadow-[0_4px_9px_-4px_#030202] dark:hover:bg-neutral-900 dark:hover:shadow-[0_8px_9px_-4px_rgba(3,2,2,0.3),0_4px_18px_0_rgba(3,2,2,0.2)] dark:focus:bg-neutral-900 dark:focus:shadow-[0_8px_9px_-4px_rgba(3,2,2,0.3),0_4px_18px_0_rgba(3,2,2,0.2)] dark:active:bg-neutral-900 dark:active:shadow-[0_8px_9px_-4px_rgba(3,2,2,0.3),0_4px_18px_0_rgba(3,2,2,0.2)]"
                      onClick={() => handleSave(group, groupName)}
                    >
                      Save
                    </button>
                    <button
                      className="hover:cursor-pointer inline-block rounded bg-neutral-800 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-neutral-50 shadow-[0_4px_9px_-4px_rgba(51,45,45,0.7)] transition duration-150 ease-in-out hover:bg-neutral-800 hover:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] focus:bg-neutral-800 focus:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] focus:outline-none focus:ring-0 active:bg-neutral-900 active:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] dark:bg-neutral-900 dark:shadow-[0_4px_9px_-4px_#030202] dark:hover:bg-neutral-900 dark:hover:shadow-[0_8px_9px_-4px_rgba(3,2,2,0.3),0_4px_18px_0_rgba(3,2,2,0.2)] dark:focus:bg-neutral-900 dark:focus:shadow-[0_8px_9px_-4px_rgba(3,2,2,0.3),0_4px_18px_0_rgba(3,2,2,0.2)] dark:active:bg-neutral-900 dark:active:shadow-[0_8px_9px_-4px_rgba(3,2,2,0.3),0_4px_18px_0_rgba(3,2,2,0.2)]"
                      onClick={handleCancel}
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <td className="whitespace-nowrap px-6 py-4">
                    {group.name}{" "}
                    <FontAwesomeIcon
                      icon={faPen}
                      onClick={() => handleEdit(group.id)}
                      className=" hover:cursor-pointer"
                    ></FontAwesomeIcon>
                  </td>
                )}
                <td className="whitespace-nowrap px-6 py-4">
                  {Object.keys(group.participants).length}
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  <span
                    className=" hover:cursor-pointer text-primary transition duration-150 ease-in-out hover:text-primary-600 focus:text-primary-600 active:text-primary-700 dark:text-primary-400 dark:hover:text-primary-500 dark:focus:text-primary-500 dark:active:text-primary-600"
                    onClick={() => navigate(`profile/${group.creator}`)}
                  >
                    {group.creator}
                  </span>
                </td>
                <td>
                  <button
                    onClick={() => removeGroup(group.id)}
                    className=" hover:cursor-pointer inline-block rounded bg-neutral-800 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-neutral-50 shadow-[0_4px_9px_-4px_rgba(51,45,45,0.7)] transition duration-150 ease-in-out hover:bg-neutral-800 hover:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] focus:bg-neutral-800 focus:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] focus:outline-none focus:ring-0 active:bg-neutral-900 active:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] dark:bg-neutral-900 dark:shadow-[0_4px_9px_-4px_#030202] dark:hover:bg-neutral-900 dark:hover:shadow-[0_8px_9px_-4px_rgba(3,2,2,0.3),0_4px_18px_0_rgba(3,2,2,0.2)] dark:focus:bg-neutral-900 dark:focus:shadow-[0_8px_9px_-4px_rgba(3,2,2,0.3),0_4px_18px_0_rgba(3,2,2,0.2)] dark:active:bg-neutral-900 dark:active:shadow-[0_8px_9px_-4px_rgba(3,2,2,0.3),0_4px_18px_0_rgba(3,2,2,0.2)]"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
