import { getAllHubs } from "../../../services/hub.service";
import { useEffect, useState } from "react";
import { deleteHub } from "../../../services/hub.service";
import toast from "react-hot-toast";
import "./AllGroups.css";
import React from "react";
import { useNavigate } from "react-router";
import GroupSimpleView from "../../../views/Hubs/Groups/GroupSimpleView/GroupSimpleView";

export default function AllGroups() {
  const [groups, setGroups] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const getAllGroups = async () => {
    const allGroups = await getAllHubs("groups");
    setGroups(allGroups);
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

  const handleSearchTermChange = (term) => {
    setSearchTerm(term);
  };

  const navigate = useNavigate();

  useEffect(() => {
    getAllGroups();
  }, []);

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
      {groups
        .filter((group) =>
          group.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .map((group) => (
          <GroupSimpleView
            key={group.id}
            group={group}
            hasGroups={groups.length > 0}
            loading={false}
            leaveGroup={() => {}}
            deleteGroup={removeGroup}
          />
        ))}
    </div>
  );
}
