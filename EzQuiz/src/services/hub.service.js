import {
  ref,
  push,
  get,
  query,
  orderByChild,
  update,
  remove,
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

export const createHub = async (hubName, educator, hub) => {
  const room = push(ref(db, hub), {
    name: hubName,
    creator: educator,
    participants: {},
    quizzes: {},
  });

  return room._path.pieces_[1];
  //   return room;
};

// key could be title, author, etc... and it would replace 'title' => equalTo(search, key)
// eslint-disable-next-line no-unused-vars
export const getAllHubs = async (hub, key = "creator") => {
  const snapshot = await get(query(ref(db, hub), orderByChild(key)));
  if (!snapshot.exists()) {
    return [];
  }
  const hubs = Object.keys(snapshot.val()).map((key) => ({
    id: key,
    ...snapshot.val()[key],
  }));
  return hubs;
};

export const updateHub = async (hub, id, key, dataName, value) => {
  const path = `${hub}/${id}/${key}/${dataName}`;
  return update(ref(db), { [path]: value });
};

export const deleteHub = async (hub, id) => {
  return remove(ref(db, `${hub}/${id}`));
}