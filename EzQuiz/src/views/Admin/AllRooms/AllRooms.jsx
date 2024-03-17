import { useEffect, useState } from "react";
import { deleteHub, getAllHubs } from "../../../services/hub.service";
import "./AllRooms.css";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { ref, update } from "firebase/database";
import { db } from "../../../config/firebase.config";

export default function AllRooms() {
  const [rooms, setRooms] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editing, setEditing] = useState(false);
  const [roomName, setRoomName] = useState("");
  const [roomEditId, setRoomEditId] = useState("");

  const getAllRooms = async () => {
    const allRooms = await getAllHubs("rooms");
    setRooms(allRooms);
  };

  const editRoomName = async (hub, id, key, value) => {
    const path = `${hub}/${id}/${key}`;
    return update(ref(db), { [path]: value });
  };

  const handleChange = (e) => {
    setRoomName(e.target.value);
  };

  const handleEdit = (id) => {
    setEditing(true);
    setRoomEditId(id);
  };

  const handleSave = (room, value) => {
    if (roomName.length < 2) {
      toast.error("Room name must be at least 2 characters long");
      return;
    }
    setEditing(false);
    editRoomName("rooms", room.id, "name", value);
  };

  const handleCancel = () => {
    setEditing(false);
  };

  const removeRoom = async (id) => {
    try {
      await deleteHub("rooms", id);
      setRooms(rooms.filter((room) => room.id !== id));
      toast.success(`Room ${id} has been deleted`);
    } catch (error) {
      toast.error(`Could not delete room ${id}`);
    }
  };

  const navigate = useNavigate();

  useEffect(() => {
    getAllRooms();
  }, []);

  useEffect(() => {
    getAllRooms();
  }, [editing]);

  return (
    <div>
      <h1>All Rooms</h1>
      <h2>Total Rooms: {rooms.length}</h2>
      <br />
      <div className="flex justify-center">
        <div className="mb-3 xl:w-96">
          <input
            type="search"
            onChange={(e) => setSearchTerm(e.target.value)}
            className="relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-black outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-neutral-600 focus:outline-none"
            id="exampleSearch"
            placeholder="Search rooms..."
          />
        </div>
      </div>
      <table className="min-w-full text-left text-sm font-light">
        <thead className="border-b font-medium dark:border-neutral-500">
          <tr>
            <th scope="col" className="px-6 py-4">
              Room name
            </th>
            <th scope="col" className="px-6 py-4">
              Participants
            </th>
            <th scope="col" className="px-6 py-4">
              Quizzes
            </th>
            <th scope="col" className="px-6 py-4">
              Creator
            </th>
          </tr>
        </thead>
        <tbody>
          {rooms
            .filter((room) =>
              room.name.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((room) => {
              return (
                <tr
                  key={room.id}
                  className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600"
                >
                  {editing && room.id === roomEditId ? (
                    <div>
                      <input
                        type="text"
                        value={roomName}
                        onChange={handleChange}
                      />
                      <button
                        className="hover:cursor-pointer inline-block rounded bg-neutral-800 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-neutral-50 shadow-[0_4px_9px_-4px_rgba(51,45,45,0.7)] transition duration-150 ease-in-out hover:bg-neutral-800 hover:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] focus:bg-neutral-800 focus:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] focus:outline-none focus:ring-0 active:bg-neutral-900 active:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] dark:bg-neutral-900 dark:shadow-[0_4px_9px_-4px_#030202] dark:hover:bg-neutral-900 dark:hover:shadow-[0_8px_9px_-4px_rgba(3,2,2,0.3),0_4px_18px_0_rgba(3,2,2,0.2)] dark:focus:bg-neutral-900 dark:focus:shadow-[0_8px_9px_-4px_rgba(3,2,2,0.3),0_4px_18px_0_rgba(3,2,2,0.2)] dark:active:bg-neutral-900 dark:active:shadow-[0_8px_9px_-4px_rgba(3,2,2,0.3),0_4px_18px_0_rgba(3,2,2,0.2)]"
                        onClick={() => handleSave(room, roomName)}
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
                      {room.name}{" "}
                      <FontAwesomeIcon
                        icon={faPen}
                        onClick={() => handleEdit(room.id)}
                      />
                    </td>
                  )}

                  <td className="whitespace-nowrap px-6 py-4">
                    {Object.keys(room.participants).length}
                  </td>
                  {room.quizzes ? (
                    <td className="whitespace-nowrap px-6 py-4">
                      {Object.keys(room.quizzes).length}
                    </td>
                  ) : (
                    <td className="whitespace-nowrap px-6 py-4">0</td>
                  )}
                  <td className="whitespace-nowrap px-6 py-4">
                    <span
                      className=" hover:cursor-pointer text-primary transition duration-150 ease-in-out hover:text-primary-600 focus:text-primary-600 active:text-primary-700 dark:text-primary-400 dark:hover:text-primary-500 dark:focus:text-primary-500 dark:active:text-primary-600"
                      onClick={() => navigate(`profile/${room.creator}`)}
                    >
                      {room.creator}
                    </span>
                  </td>
                  <td>
                    <button
                      onClick={() => removeRoom(room.id)}
                      className=" hover:cursor-pointer inline-block rounded bg-neutral-800 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-neutral-50 shadow-[0_4px_9px_-4px_rgba(51,45,45,0.7)] transition duration-150 ease-in-out hover:bg-neutral-800 hover:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] focus:bg-neutral-800 focus:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] focus:outline-none focus:ring-0 active:bg-neutral-900 active:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] dark:bg-neutral-900 dark:shadow-[0_4px_9px_-4px_#030202] dark:hover:bg-neutral-900 dark:hover:shadow-[0_8px_9px_-4px_rgba(3,2,2,0.3),0_4px_18px_0_rgba(3,2,2,0.2)] dark:focus:bg-neutral-900 dark:focus:shadow-[0_8px_9px_-4px_rgba(3,2,2,0.3),0_4px_18px_0_rgba(3,2,2,0.2)] dark:active:bg-neutral-900 dark:active:shadow-[0_8px_9px_-4px_rgba(3,2,2,0.3),0_4px_18px_0_rgba(3,2,2,0.2)]"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}
