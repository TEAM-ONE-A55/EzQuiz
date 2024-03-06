import { useEffect, useState } from "react";
import { deleteHub, getAllHubs } from "../../../services/hub.service";
import "./AllRooms.css";
import toast from "react-hot-toast";

export default function AllRooms() {
  const [rooms, setRooms] = useState([]);

  const getAllRooms = async () => {
    const allRooms = await getAllHubs("rooms");
    setRooms(allRooms);
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

  useEffect(() => {
    getAllRooms();
  }, []);

  return (
    <div>
      <h1>All Rooms</h1>
      <h2>Total Rooms: {rooms.length}</h2>
      <br />
      {rooms.map((room) => {
        if (room) {
          return (
            <div key={room.id} className="single-room">
              <h3>
                {room.name} <br />
                Created by {room.creator}
              </h3>
              <img src={`${room.image_cover}`} alt="" />
              {room.participants ? (
                <div>
                  <h4>Participants</h4>
                  {Object.keys(room.participants).length} people in the room
                </div>
              ) : (
                <p>No participants</p>
              )}
              <button className="remove-btn" onClick={() => removeRoom(room.id)}>Delete</button>
            </div>
          );
        }
      })}
    </div>
  );
}
