import {
    get,
    set,
    ref,
    query,
    equalTo,
    orderByChild,
    update,
  } from "firebase/database";
  import { db } from "../config/firebase.config";
  import { defaultAvatar } from "../constants/constants";
  
  export const getUserByHandle = (handle) => {
    return get(ref(db, `users/${handle}`));
  };
  
  export const createUserHandle = (handle, uid, email, firstName, lastName, role) => {
    return set(ref(db, `users/${handle}`), {
      handle,
      uid,
      email,
      firstName,
      lastName,
      createdOn: new Date().valueOf(),
      createdQuizes: {},
      avatar: defaultAvatar,
      role,
      isAdmin: false
    });
  };
  
  export const getUserData = (uid) => {
    return get(query(ref(db, "users"), orderByChild("uid"), equalTo(uid)));
  };
  
  export const updateUserData = async (handle, key, value) => {
    const path = `users/${handle}/${key}`;
    return update(ref(db), { [path]: value });
  };
  
  export const getAllUsers = async () => {
    const snapshot = await get(query(ref(db, "users")));
  
    if (!snapshot.exists()) {
      return [];
    }
  
    const users = Object.keys(snapshot.val()).map(
      async (key) => await getUserByHandle(key)
    );
  
    return Promise.all(users);
  };
  
  
//   export const deleteOrganizer = async (handle) => {
//     const topics = await getTopicsByAuthor(handle)
//     topics.map(async topic => {
//       await remove(ref(db, `topics/${topic.id}`))
//     })
//     return remove(ref(db, `users/${handle}`))
//   }
  
//   export const deleteUserTopic = async (handle, value) => {
//     return remove(ref(db, `users/${handle}/createdTopics/${value}`))
//   }