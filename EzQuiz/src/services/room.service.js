import {
  ref,
  push,
  get,
  query,
  orderByChild,
  update,
//   equalTo,
//   set,
//   remove,
} from "firebase/database";
import { db } from "../config/firebase.config";

// const fromRoomDocument = (snapshot) => {
//   const roomDocument = snapshot.val();

//   return Object.keys(roomDocument).map((key) => {
//     const room = roomDocument[key];

//     return {
//       ...room,
//       id: key,
//       createdOn: new Date(room.createdOn),
//     };
//   });
// };

export const createRoom = async (roomName, educator) => {
  const room = push(ref(db, `rooms`), {
    name: roomName,
    creator: educator,
    participants: {},
    quizzes: {},
  });

  return room._path.pieces_[1];
  //   return room;
};

// key could be title, author, etc... and it would replace 'title' => equalTo(search, key)
// eslint-disable-next-line no-unused-vars
export const getAllRooms = async (key = "creator") => {
  const snapshot = await get(query(ref(db, "rooms"), orderByChild(key)));
  if (!snapshot.exists()) {
    return [];
  }
  const rooms = Object.keys(snapshot.val()).map((key) => ({
    id: key,
    ...snapshot.val()[key],
  }));
  return rooms;
};

export const updateRoom = async (id, key, dataName, value) => {
  const path = `rooms/${id}/${key}/${dataName}`;
  return update(ref(db), { [path]: value });
};
