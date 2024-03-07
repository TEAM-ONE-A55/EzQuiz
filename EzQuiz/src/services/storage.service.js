import { storage } from "../config/firebase.config"
import { v4 } from "uuid"
import { getDownloadURL, uploadBytes, ref, deleteObject, listAll } from "firebase/storage";

export const uploadAvatar = async (image, handle, key) => {
    try {
        const imageRef = ref(storage, `avatars/${handle}/${key}/${image.name + v4()}`);
        await uploadBytes(imageRef, image);
        const url = await getDownloadURL(imageRef);
        return url;
    } catch (error) {
        console.log(error.message);
    }
}

export const deleteAvatar = async (handle, key) => {
    try {
      const lastFolderRef = ref(storage, `avatars/${handle}/${key}`);
      const res = await listAll(lastFolderRef);
      await deleteObject(res.items[0]);
    } catch (e) {
      console.log(e.message);
    }
  };


  export const uploadCover = async (hubKey, key, image) => {
    try {
        const imageRef = ref(storage, `${hubKey}/${key}/${image.name + v4()}`);
        await uploadBytes(imageRef, image);
        const url = await getDownloadURL(imageRef);
        return url;
    } catch (error) {
        console.log(error.message);
    }
}

export const deleteCoverImage = async (key, uuid) => {
  try {
    const lastFolderRef = ref(storage, `${key}/${uuid}`);
    const res = await listAll(lastFolderRef);
    await deleteObject(res.items[0]);
  } catch (e) {
    console.log(e.message);
  }
};