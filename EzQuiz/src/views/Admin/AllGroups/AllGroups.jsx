import { getAllHubs } from "../../../services/hub.service";
import { useEffect, useState } from "react";
import { deleteHub } from "../../../services/hub.service";
import toast from "react-hot-toast";
import "./AllGroups.css";
import { useNavigate } from "react-router";
import GroupSimpleView from "../../Groups/GroupSimpleView/GroupSimpleView";



export default function AllGroups () {
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
    }

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
        <input
            type="text"
            placeholder={`Search groups...`}
            onChange={(e) => handleSearchTermChange(e.target.value)}
        />
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