import { getAllHubs } from "../../../services/hub.service";
import { useEffect, useState } from "react";
import { deleteHub } from "../../../services/hub.service";
import toast from "react-hot-toast";
import "./AllGroups.css";
import { useNavigate } from "react-router";


export default function AllGroups () {
    const [groups, setGroups] = useState([]);

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

    const navigate = useNavigate();

    useEffect(() => {
        getAllGroups();
    }, []);

    return (
        <div>
        <h1>All Groups</h1>
        <h2>Total Groups: {groups.length}</h2>
        <br />
        {groups.map((group) => {
            if (group) {
            return (
                <div key={group.id} className="single-group">
                <h3>
                    {group.name} <br />
                    Created by <span 
                    style={{cursor: "pointer"}}
                    onClick={() => navigate(`profile/${group.creator}`)}>{group.creator}</span>
                </h3>
                <img src={`${group.image_cover}`} alt="" />
                {group.participants ? (
                    <div>
                    <h4>Participants: {Object.keys(group.participants).length}</h4>
                    </div>
                ) : (
                    <p>No participants</p>
                )}
                <button className="remove-btn" onClick={() => removeGroup(group.id)}>Delete</button>
                </div>
            );
            } else {
            return <p>No groups</p>;
            }
        })}
        </div>
    );
}