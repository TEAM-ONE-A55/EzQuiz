import { getAllHubs } from "../../../services/hub.service";
import { useEffect, useState } from "react";
import "./RoomSimpleView.css";
import { useNavigate } from "react-router";

export default function RoomSimpleView() {
  const [rooms, setRooms] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getAllHubs("rooms").then(setRooms);
  }, []);

  console.log(rooms);

  return (
    rooms.length !== 0 &&
    rooms.map((room) => {
      console.log(room.id);
      return (
        <>
          <div className="block max-w-[26rem] rounded-lg bg-white text-surface shadow-secondary-1 dark:bg-surface-dark dark:text-black simple-room-container">
            <div className="relative overflow-hidden bg-cover bg-no-repeat">
              <img
                className="rounded-t-lg"
                src={room.image_cover}
                alt=""
              />
            </div>
            <br/>
            <h5 className="mb-2 text-xl font-medium leading-tight room-title">
              {room.name}
            </h5>
            <div className="p-6">
              <p className="text-base">Creator: {room.creator}</p>
            </div>
            <ul className="w-full">
              <li className="w-full border-b-2 border-neutral-100 border-opacity-100 px-6 py-3  dark:border-white/10">
                Active Participants:{" "}
                {(room.participants &&
                  Object.values(room.participants).filter(
                    (p) => p === "accepted"
                  ).length) ||
                  0}
              </li>
              <li className="w-full border-b-2 border-neutral-100 border-opacity-100 px-6 py-3  dark:border-white/10">
                Total Participants:{" "}
                {(room.participants &&
                  Object.values(room.participants).length) ||
                  0}
              </li>
              <li className="w-full border-neutral-100 border-opacity-100 px-6 py-3  dark:border-white/10">
                Total Quizzes:{" "}
                {(room.quizzes && Object.values(room.quizzes).length) || 0}
              </li>
            </ul>
            <div className="p-6">
              <a
                type="button"
                className="pointer-events-auto me-5 inline-block cursor-pointer rounded text-base font-normal leading-normal text-primary transition duration-150 ease-in-out hover:text-primary-600 focus:text-primary-600 focus:outline-none focus:ring-0 active:text-primary-700 dark:text-primary-400"
                onClick={() => navigate(`/my-rooms/${room.id}`)}
              >
                Enter room
              </a>
              <a
                type="button"
                className="pointer-events-auto inline-block cursor-pointer rounded text-base font-normal leading-normal text-primary transition duration-150 ease-in-out hover:text-primary-600 focus:text-primary-600 focus:outline-none focus:ring-0 active:text-primary-700 dark:text-primary-400"
              >
                Leave room
              </a>
            </div>
          </div>
        </>
      );
    })
  );
}
