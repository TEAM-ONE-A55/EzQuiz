import { useContext } from "react";
import { useNavigate } from "react-router";
import { AppContext } from "../../../../context/AppContext";
import Loader from "../../../../components/Loader/Loader";
import PropTypes from "prop-types";

export default function RoomSimpleView({ room, hasRooms, loading, leaveRoom, deleteRoom }) {
  
  const { userData } = useContext(AppContext);
  const navigate = useNavigate();

  if (loading && !hasRooms) {
    return <Loader />;
  }

  if (!hasRooms && !loading) {
    return null;
  }

  return (
    <div
      key={room.id}
      className="bg-neutral-50 w-64 rounded-xl flex-col h-[450px] relative shadow-neutral-500 shadow-xl"
    >
      <div className="relative overflow-hidden bg-cover bg-no-repeat">
        <img className="w-64 h-36 object-cover border-none rounded-t-xl" src={room.image_cover} alt="" />
      </div>
      <br />
      <h5 className="mb-2 text-xl font-medium leading-tight room-title">
        {room.name}
      </h5>
      <div className=" mb-3">
        <p className="text-base">Creator: {room.creator}</p>
      </div>
      <ul className="w-full flex flex-col justify-center items-center gap-3">
        <li className="w-full border-opacity-100 ">
          Active Participants:{" "}
          {(room.participants &&
            Object.values(room.participants).filter((p) => p === "accepted")
              .length + 1) ||
            1}
        </li>
        <li className="w-full border-opacity-100 ">
          Total Participants:{" "}
          {(room.participants && Object.values(room.participants).length + 1) ||
            1}
        </li>
        <li className="w-full border-opacity-100 ">
          Total Quizzes:{" "}
          {(room.quizzes && Object.values(room.quizzes).length) || 0}
        </li>
      </ul>
      <div className="absolute bottom-6 left-[50%] translate-x-[-50%] flex mt-[25%] justify-center items-center gap-2">
        <button
          className="w-[80px] block rounded-lg bg-yellow-400 pt-1.5 pb-1 text-sm font-medium cursor-pointer uppercase leading-normal text-neutral-800 shadow-[0_4px_9px_-4px_#3b71ca] transition duration-75 ease-in-out hover:bg-yellow-500 hover:shadow-neutral-800"
          onClick={() => navigate(`/my-rooms/${room.id}`)}
        >
          Enter
        </button>
        {userData.handle !== room.creator ? (
          <button
            className="w-[80px] block rounded-lg bg-yellow-400 pt-1.5 pb-1 text-sm font-medium cursor-pointer uppercase leading-normal text-neutral-800 shadow-[0_4px_9px_-4px_#3b71ca] transition duration-75 ease-in-out hover:bg-yellow-500 hover:shadow-neutral-800"
            onClick={() => leaveRoom(room.id)}
          >
            Leave
          </button>
        ) : (
          <button
            className="w-[80px] block rounded-lg bg-yellow-400 pt-1.5 pb-1 text-sm font-medium cursor-pointer uppercase leading-normal text-neutral-800 shadow-[0_4px_9px_-4px_#3b71ca] transition duration-75 ease-in-out hover:bg-yellow-500 hover:shadow-neutral-800"
            onClick={() => deleteRoom(room.id, room.uuid, room.image_cover)}
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
}

RoomSimpleView.propTypes = {
  room: PropTypes.object,
  hasRooms: PropTypes.bool,
  loading: PropTypes.bool,
  leaveRoom: PropTypes.func,
  deleteRoom: PropTypes.func
};
