import { useEffect, useState } from "react";
import { deleteHub, getAllHubs } from "../../../services/hub.service";
import "./AllRooms.css";
import toast from "react-hot-toast";

export default function AllRooms() {
  const [rooms, setRooms] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

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
      {rooms
        .filter((room) =>
          room.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .map((room) => {
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
                <button
                  className="remove-btn"
                  onClick={() => removeRoom(room.id)}
                >
                  Delete
                </button>
              </div>
            );
          }
        })}
    </div>
  );
}
