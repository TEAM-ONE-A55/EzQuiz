import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { updateUserData } from "../../services/user.service";
import { deleteAvatar, uploadAvatar } from "../../services/storage.service";
import toast from "react-hot-toast";
import { defaultAvatar } from "../../constants/constants";
import Avatar from "../../components/Avatar/Avatar";
import { faTrash, faUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "../../components/Button/Button";

export default function SetAvatar() {
  const { userData, setContext } = useContext(AppContext);
  const [attachImage, setAttachImage] = useState(null);

  useEffect(() => {
    if (userData) {
      updateUserData(userData.handle, "avatar", userData.avatar);
    }
  }, [userData]);

  const uploadImage = async () => {
    try {
      const url = await uploadAvatar(attachImage, userData.handle, "avatar");
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
      await deleteAvatar(userData.handle, "avatar");
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
        {userData.avatar === defaultAvatar && (
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
              <Button onClick={uploadImage}>
                <FontAwesomeIcon icon={faUpload}></FontAwesomeIcon>
              </Button>
            ) : (
              <Button
                onClick={() => {
                  toast.error("No image selected");
                }}
              >
                <FontAwesomeIcon icon={faUpload}></FontAwesomeIcon>
              </Button>
            )}
          </div>
        )}

        {userData.avatar !== defaultAvatar && (
          <Button onClick={deleteImage}>
            Delete <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>
          </Button>
        )}
      </div>
    </div>
  );
}
