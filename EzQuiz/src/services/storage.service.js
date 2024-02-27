import { storage } from "../config/firebase.config"
import { v4 } from "uuid"
import { getDownloadURL, uploadBytes, ref } from "firebase/storage";

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