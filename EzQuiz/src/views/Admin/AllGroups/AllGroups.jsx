import { getAllHubs } from "../../../services/hub.service";
import { useEffect, useState } from "react";
import { deleteHub } from "../../../services/hub.service";
import toast from "react-hot-toast";
import "./AllGroups.css";
import { useNavigate } from "react-router";
import { ref, update } from "firebase/database";
import { db } from "../../../config/firebase.config";
import { updateUserData } from "../../../services/user.service";
import { deleteCoverImage } from "../../../services/storage.service";
import { defaultCoverGroup } from "../../../constants/constants";

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

  const removeGroup = async (group) => {
    try {
      if (group.participants) {
        const participants = Object.keys(group.participants);
        participants.map(async (p) => {
          await updateUserData(p, `groups/${group.id}`, null);
        });
      }

      if (group.image_cover !== defaultCoverGroup) {
        await deleteCoverImage("groups", group.uuid);
      }
      await updateUserData(group.creator, `groups/${group.id}`, null);
      await deleteHub("groups", group.id);
      setGroups(groups.filter((g) => g.id !== group.id));
      toast.success(`Group ${group.name} has been deleted`);
    } catch (error) {
      toast.error(`Could not delete group ${group.name}`);
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
    <div className="mt-8 max-w-[1350px] mx-auto">
      <div className="mb-6 mx-auto w-4/5 rounded-xl p-8 bg-neutral-200 shadow-neutral-400 shadow-inner text-neutral-800 font-bold">
        <h2 className="text-4xl text-neutral-800 ">All Groups</h2>
      </div>
      <h2 className="text-xl text-neutral-600 mb-4 -mt-2 ">
        Total Groups: {groups.length}
      </h2>
      <div className="mx-auto w-4/5 flex flex-row">
        <input
          type="search"
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-3 mr-2 h-[38px] outline-none border-none rounded-[4px] p-2 w-full transition duration-75 ease-in-out shadow-lg shadow-neutral-200"
          id="exampleSearch"
          placeholder="Search groups..."
          value={searchTerm}
        />
      </div>
      <table className="mt-10 mx-auto text-center text-sm font-light min-w-[1300px]">
        <thead className="border-b bg-neutral-50 font-medium border-neutral-300">
          <tr>
            <th scope="col" className="px-6 py-4">
              Group Name
            </th>
            <th scope="col" className="px-6 py-4">
              Participants
            </th>
            <th scope="col" className="px-6 py-4">
              Creator
            </th>
            <th scope="col" className="px-6 py-4">
              Total Quizzes
            </th>
            <th scope="col" className="px-6 py-4">
              Action
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
                className="border-b transition duration-75 ease-in-out hover:bg-neutral-100 border h-[80px] text-center items-center"
              >
                {editing && groupEditId === group.id ? (
                  <td className="max-w-[250px] text-center items-center mt-1.5 mr-4">
                    <span>
                      <input
                        className="w-[200px] px-3 py-2 text-[12px] outline-none border-none rounded-md transition duration-75"
                        type="text"
                        value={groupName}
                        placeholder="Change name..."
                        onChange={(e) => handleChange(e)}
                      />
                    </span>
                    <span className="w-[100px]">
                      <button
                        type="button"
                        className=" mx-[4px] w-[80px] rounded bg-neutral-700 pb-1 pt-1.5 px-2 text-[10px] font-medium uppercase text-neutral-50 transition duration-75 ease-in-out hover:bg-neutral-800"
                        onClick={() => handleSave(group, groupName)}
                      >
                        Save
                      </button>
                    </span>
                    <button
                      type="button"
                      className="w-[80px] rounded bg-neutral-700 pb-1 pt-1.5 px-2 text-[10px] font-medium uppercase text-neutral-50 transition duration-75 ease-in-out hover:bg-neutral-800"
                      onClick={handleCancel}
                    >
                      Cancel
                    </button>
                  </td>
                ) : (
                  <td className="text-center align-middle">{group.name}</td>
                )}
                <td className="text-center align-middle">
                  {group.participants
                    ? Object.keys(group.participants).length
                    : 0}
                </td>
                <td className="text-center align-middle">
                  <span
                    className="hover:cursor-pointer font-medium text-primary transition duration-150 ease-in-out hover:text-primary-600 focus:text-primary-600 active:text-primary-700"
                    onClick={() => navigate(`profile/${group.creator}`)}
                  >
                    {group.creator}
                  </span>
                </td>
                <td className="text-center align-middle">
                  {group.quizzes ? Object.keys(group.quizzes).length : 0}
                </td>
                <td className="max-w-[250px] grid grid-rows-1 gap-1 text-center items-center mt-1.5 mr-4">
                  <button
                    type="button"
                    className="rounded bg-neutral-700 pb-1 pt-1.5 px-2 text-[10px] font-medium uppercase text-neutral-50 transition duration-75 ease-in-out hover:bg-neutral-800"
                    onClick={() => removeGroup(group)}
                  >
                    Delete
                  </button>
                  <button
                    type="button"
                    className="rounded bg-neutral-700 pb-1 pt-1.5 px-2 text-[10px] font-medium uppercase text-neutral-50 transition duration-75 ease-in-out hover:bg-neutral-800"
                    onClick={() => handleEdit(group.id)}
                  >
                    Edit Title
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
