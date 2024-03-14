import { useContext, useEffect, useState } from "react";
import Button from "../../../components/Button/Button";
import RoomSimpleView from "../RoomSimpleView/RoomSimpleView";
import { AppContext } from "../../../context/AppContext";
import { useNavigate } from "react-router";
import "./MyRooms.css";
import {
  getUserByHandle,
  updateUserData,
} from "../../../services/user.service";
import {
  deleteHub,
  getHubsById,
  updateHub,
} from "../../../services/hub.service";
import PropTypes from "prop-types";
import { defaultCoverRoom } from "../../../constants/constants";
import {
  deleteCoverImage,
  getCoverImage,
} from "../../../services/storage.service";

export default function MyRooms({ notifications }) {
  const { userData } = useContext(AppContext);
  const [roomsIds, setRoomsIds] = useState([]);
  const [hasRooms, setHasRooms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [rooms, setRooms] = useState([]);
  const [numRooms, setNumRooms] = useState(0);

  const navigate = useNavigate();

  const addRoom = (roomId) => {
    setRoomsIds((prevRoomsIds) => {
      if (prevRoomsIds.length !== 0 && !prevRoomsIds.includes(roomId)) {
        return [...prevRoomsIds, roomId];
      } else if (prevRoomsIds.length === 0) {
        return [roomId];
      }
      return prevRoomsIds;
    });
    setNumRooms((prevNumRooms) => prevNumRooms + 1);
  };

  const leaveRoom = async (roomId) => {
    try {
      await updateUserData(userData.handle, `rooms/${roomId}`, null);
      await updateHub("rooms", roomId, "participants", userData.handle, "left");
      setRoomsIds((prevRoomsIds) => {
        const newPrevRoomsIds = prevRoomsIds.filter((id) => id !== roomId);
        return newPrevRoomsIds;
      });
      setNumRooms((prevNumRooms) => prevNumRooms - 1);
    } catch (e) {
      console.log(e.message);
    }
  };

  const deleteRoom = async (roomId, uuid, coverUrl) => {
    try {
      const room = await getHubsById("rooms", roomId);
      if (room.participants) {
        const participants = room.participants;
        Object.entries(participants).map((p) => {
          if (p[1] === "accepted") {
            updateUserData(p[0], `rooms/${roomId}`, null);
          }
        });
      }

      await updateUserData(userData.handle, `rooms/${roomId}`, null);
      await deleteHub("rooms", roomId);

      if (coverUrl !== defaultCoverRoom) {
        const coverImage = await getCoverImage("rooms", uuid);
        const coverImagePath = coverImage._location.path.split("/");
        const coverImageId = coverImagePath[1];
        await deleteCoverImage("rooms", coverImageId);
      }

      setRoomsIds((prevRoomsIds) => {
        const newPrevRoomsIds = prevRoomsIds.filter((id) => id !== roomId);
        return newPrevRoomsIds;
      });
      setNumRooms((prevNumRooms) => prevNumRooms - 1);
    } catch (e) {
      console.log(e.message);
    }
  };

  useEffect(() => {
    setLoading(true);
    getUserByHandle(userData.handle)
      .then((snapshot) => snapshot.val().rooms)
      .then((rooms) => Object.keys(rooms))
      .then((rooms) => rooms.map((room) => addRoom(room)))
      .then(() => {
        !hasRooms && setHasRooms(true);
      })
      .catch((e) => {
        console.log(e.message);
        setLoading(false);
      });
  }, [userData, notifications]);

  useEffect(() => {
    if (roomsIds.length !== 0) {
      const roomsPromises = roomsIds.map((roomId) => {
        return getHubsById("rooms", roomId)
          .then((room) => room)
          .catch((e) => console.log(e.message));
      });

      Promise.all(roomsPromises)
        .then((roomsData) => {
          setRooms(roomsData);
          setLoading(false);
        })
        .catch((e) => console.log(e.message));
    } else {
      setHasRooms(false);
    }
  }, [numRooms]);

  return (
    <div>
      {userData && userData.rooms && hasRooms ? (
        <>
          <div className="my-rooms-content">
            <h2 className="mb-4 font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-4xl dark:text-white">
              My <span className="text-blue-600 dark:text-blue-500">Rooms</span>
            </h2>
            <br />

            {userData && userData.role === "educator" && (
              <p className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">
                Your personalized hubs for seamless teaching and learning
                experiences. Easy manage, organize and track your educational
                spaces and monitor your participants&apos; progress.
              </p>
            )}

            {userData && userData.role === "student" && (
              <p className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">
                Welcome to your learning rooms! Dive into a wealth of quizzes
                curated just for you. Explore and attempt quizzes tailored to
                your learning objectives, and track your achievements as you
                progress. Your personalized learning experience awaits!
              </p>
            )}
          </div>
          <div className="rooms-container">
            {rooms.length !== 0 &&
              rooms.map((room) => {
                return (
                  <div key={room.id}>
                    <RoomSimpleView
                      room={room}
                      hasRooms={hasRooms}
                      loading={loading}
                      leaveRoom={leaveRoom}
                      deleteRoom={deleteRoom}
                    />
                  </div>
                );
              })}
          </div>
        </>
      ) : (
        <div className="my-rooms-content">
          <p className="mb-4 font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-4xl dark:text-white">
            {" "}
            You don&apos;t have any rooms yet.
          </p>

          <br />
          {userData && userData.role === "educator" && (
            <>
              <Button onClick={() => navigate("/create-room")}>
                Create Room
              </Button>

              <br />
              <br />
              <p className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">
                If you haven&apos;t created any room yet, you can start by
                creating one. Click on the &quot;Create Room&quot; button to
                initiate the process.
              </p>
            </>
          )}
          <br />
          <br />
          <p className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">
            If you&apos;ve been invited to join a room, make sure to accept the
            invitation. Check your notifications to see if there are any pending
            room invites.
          </p>
        </div>
      )}
    </div>
  );
}

MyRooms.propTypes = {
  notifications: PropTypes.object,
};
