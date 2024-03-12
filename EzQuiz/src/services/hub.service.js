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

export const createHub = async (hubName, educator, cover, hub, uuid, hubDescription = null) => {
  const room = push(ref(db, hub), {
    name: hubName,
    description: hubDescription,
    creator: educator,
    image_cover: cover,
    uuid: uuid,
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

export const getTopicById = async (id) => {
  const snapshot = await get(ref(db, `topics/${id}`));
  if (!snapshot.exists()) return null;

  const topic = {
    id,
    ...snapshot.val(),
    createdOn: new Date(snapshot.val().createdOn),
    likedBy: snapshot.val().likedBy ? Object.keys(snapshot.val().likedBy) : [],
    dislikedBy: snapshot.val().dislikedBy
      ? Object.keys(snapshot.val().dislikedBy)
      : [],
  };

  return topic;
};

export const getHubsById = async (hub, id) => {
  const snapshot = await get(ref(db, `${hub}/${id}`));

  if (!snapshot.exists()) return null;

  const hubData = {
    id,
    ...snapshot.val()
  }

  return hubData
}

export const updateHub = async (hub, id, key, dataName, value) => {
  const path = `${hub}/${id}/${key}/${dataName}`;
  return update(ref(db), { [path]: value });
};

export const deleteHub = async (hub, id) => {
  return remove(ref(db, `${hub}/${id}`));
}