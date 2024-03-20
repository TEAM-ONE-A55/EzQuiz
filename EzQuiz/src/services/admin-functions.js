import toast from "react-hot-toast";
import { updateUserData } from "./user.service";
import { ref, remove } from "firebase/database";
import { db } from "../config/firebase.config";
import { deleteHub, getAllHubs, updateHub } from "./hub.service";
import {
  deleteQuizFromDatabase,
  getAllQuizzesFromDatabase,
  updateQuizWithKey,
} from "./quiz.service";
import { defaultCoverGroup, defaultCoverRoom } from "../constants/constants";
import { deleteCoverImage, getCoverImage } from "./storage.service";

export const changeRole = async (user, setUser) => {
  if (user.role === "student") {
    await updateUserData(user.handle, "role", "educator");
    setUser({ ...user, role: "educator" });
    toast.success(`User role has been changed to an Educator`);
  } else {
    await updateUserData(user.handle, "role", "student");
    setUser({ ...user, role: "student" });
    toast.success(`User role has been changed to a Student`);
  }
};

export const deleteUser = async (handle) => {

  // Get all data
  const rooms = await getAllHubs("rooms", "creator");
  const groups = await getAllHubs("groups", "creator");
  const quizzes = await getAllQuizzesFromDatabase();

  // Groups:
  // 1. check if handle === group.creator => delete group

  // 2. check if handle is a participant => update group and remove this participant

 groups.map(async (group) => {


    // check if handle === group.creator => delete group
    if (group.creator === handle) {

      try {
        if (group.participants) {
          const participants = group.participants;
          Object.entries(participants).map((p) => {
            if (p[1] === "accepted") {
              updateUserData(p[0], `groups/${group.id}`, null);
            }
          });
        }
        if (group.image_cover && group.image_cover !== defaultCoverGroup) {
          const coverImage = await getCoverImage("groups", group.uuid);
          const coverImagePath = coverImage._location.path.split("/");
          const coverImageId = coverImagePath[1];
          await deleteCoverImage("groups", coverImageId);
        }
        await updateUserData(handle, `groups/${group.id}`, null);
        await deleteHub("groups", group.id);
      } catch (e) {
        console.log(e.message);
      }
    }

    //check if handle is a participant => update group and remove this participant
    if (
      group.participants &&
      Object.keys(group.participants).includes(handle)
    ) {
      updateHub("groups", group.id, "participants", handle, null);
    }
  });


  // Rooms
  rooms.map(async (room) => {
    
    // check if handle === room.creator => delete group
    if (room.creator === handle) {
    try {
        if (room.participants) {
          const participants = room.participants;
          Object.entries(participants).map((p) => {
            if (p[1] === "accepted") {
              updateUserData(p[0], `rooms/${room.id}`, null);
            }
          });
        }
        if (room.image_cover && room.image_cover !== defaultCoverRoom) {
          const coverImage = await getCoverImage("rooms", room.uuid);
          const coverImagePath = coverImage._location.path.split("/");
          const coverImageId = coverImagePath[1];
          await deleteCoverImage("rooms", coverImageId);
        }
        await updateUserData(handle, `rooms/${room.id}`, null);
        await deleteHub("rooms", room.id);
      } catch (e) {
        console.log(e.message);
      }
    }

    if (room.participants && Object.keys(room.participants).includes(handle)) {
      updateHub("rooms", room.id, "participants", handle, null);
    }
  });



  // Quizzes 

  quizzes.map((quiz) => {
    if (quiz.creator === handle) {
      rooms.map((room) => {
        if (room.quizzes && Object.keys(room.quizzes).includes(quiz.id)) {
          deleteQuizFromDatabase(quiz.id, handle, "rooms", room.id);
        }
      });

      groups.map((group) => {
        if (group.quizzes && Object.keys(group.quizzes).includes(quiz.id)) {
          deleteQuizFromDatabase(quiz.id, handle, "groups", group.id);
        }
      });
      deleteQuizFromDatabase(quiz.id, handle);
    }

    if (quiz.quizTakers && Object.keys(quiz.quizTakers).includes(handle)) {
      updateQuizWithKey(quiz.id, `quizTakers/${handle}`, null);
    }
  });

  // console.log(groupsToDelete)
  return remove(ref(db, `users/${handle}`));



};

export const blockUser = async (user, setUser) => {
  if (user.blocked) {
    await updateUserData(user.handle, "blocked", false);
    setUser({ ...user, blocked: false });
    toast.success(`User has been unblocked`);
  } else {
    await updateUserData(user.handle, "blocked", true);
    setUser({ ...user, blocked: true });
    toast.success(`User has been blocked`);
  }
};
