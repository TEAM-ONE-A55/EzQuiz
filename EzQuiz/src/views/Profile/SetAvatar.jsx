import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { updateUserData } from "../../services/user.service";
import { uploadAvatar } from "../../services/storage.service";
import toast from "react-hot-toast";
import { defaultAvatar } from "../../constants/constants";
import Avatar from "../../components/Avatar/Avatar";

export default function SetAvatar() {
  const { userData, setContext } = useContext(AppContext);
  const [attachImage, setAttachImage] = useState(null);

  useEffect(() => {
    if(userData) {
        console.log(userData.avatar);
        updateUserData(userData.handle, "avatar", userData.avatar)
        console.log(userData.avatar);
    }
  }, [userData]);

  const uploadImage = async () => {
    try {
      const url = await uploadAvatar(attachImage, userData.handle, "avatar");
        console.log(url);
      setContext((prevState) => ({
        ...prevState,
        userData: {
          ...prevState.userData,
          avatar: url,
        },
      }));
      toast.success("Avatar updated");
    } catch (e) {
      console.log(e.message);
      toast.error("Failed to upload avatar");
    }
  };

  const deleteImage = async () => {
    try {
      setContext((prevState) => ({
        ...prevState,
        userData: {
          ...prevState.userData,
          avatar: defaultAvatar,
        },
      }));
      toast.success("Avatar deleted");
    } catch (e) {
      console.log(e.message);
      toast.error("Failed to delete avatar");
    }
  };

  return (
    <div>
      <Avatar
        width="200px"
        height="200px"
        url={userData.avatar}
        onClick={() => {}}
      />
      <div>
        <label className="attach-avatar" htmlFor="attach-avatar">
          Choose...
        </label>
        <input
          type="file"
          id="attach-avatar"
          onChange={(e) => setAttachImage(e.target.files[0])}
        />
        {attachImage ? (
          <button onClick={uploadImage}>Upload</button>
        ) : (
          <button
            onClick={() => {
              toast.error("No image selected");
            }}
          >
            Upload
          </button>
        )}
        {userData.avatar !== defaultAvatar && (
          <button onClick={deleteImage}>Delete</button>
        )}
      </div>
    </div>
  );
}
