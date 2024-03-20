import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { updateUserData } from "../../services/user.service";
import { deleteAvatar, uploadAvatar } from "../../services/storage.service";
import toast from "react-hot-toast";
import { defaultAvatar } from "../../constants/constants";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function SetAvatar() {
  const { userData, setContext } = useContext(AppContext);
  const [attachImage, setAttachImage] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (userData) {
      updateUserData(userData.handle, "avatar", userData.avatar);
    }
  }, [userData]);

  const uploadImage = async () => {
    try {
      setLoading(true);
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
    } finally {
      setLoading(false);
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
    <div className="max-w-[300px] mx-auto relative mt-4 mb-8">
      <img src={userData.avatar} alt={userData.firstName + "" + userData.lastName}
      className="w-64 h-64 rounded-full border-none shadow-neutral-500 shadow-lg  opacity-100 bg-black"
      />
      <div className="bg-black absolute w-64 h-64 rounded-full top-0 left-[22px] opacity-25"></div>
      <div>
        {userData.avatar === defaultAvatar && (
          <div className="">
            {loading && <p className="text-neutral-900 z-10 absolute bottom-[25%] left-[50%] translate-x-[-50%] translate-y-[-50%]">Uploading...</p>}
            <label className="absolute top-[50%] left-[42%] translate-x-[-50%] translate-y-[-50%] block rounded-md bg-neutral-200 px-3 pt-1.5 pb-1 text-xs font-medium uppercase text-neutral-800 transition duration-75 ease-in-out hover:bg-neutral-300 cursor-pointer" htmlFor="attach-avatar">
              Choose...
            </label>
            <input
              className="hidden"
              type="file"
              id="attach-avatar"
              onChange={(e) => setAttachImage(e.target.files[0])}
            />
            {attachImage ? (
              <button className="absolute top-[50%] left-[64%] translate-x-[-50%] translate-y-[-50%] block rounded-md bg-neutral-200 px-3 pt-1.5 pb-1 text-xs font-medium uppercase text-neutral-800 transition duration-75 ease-in-out hover:bg-neutral-300 cursor-pointer" onClick={uploadImage}>
                <FontAwesomeIcon icon={faUpload}></FontAwesomeIcon>
              </button>
            ) : (
              <button
                className="absolute top-[50%] left-[65%] translate-x-[-50%] translate-y-[-50%] block rounded-md bg-neutral-200 px-3 pt-1.5 pb-1 text-xs font-medium uppercase text-neutral-800 transition duration-75 ease-in-out hover:bg-neutral-300 cursor-pointer"
                onClick={() => {
                  toast.error("No image selected");
                }}
              >
                <FontAwesomeIcon icon={faUpload}></FontAwesomeIcon>
              </button>
            )}
          </div>
        )}

        {userData.avatar !== defaultAvatar && (
          <button onClick={deleteImage}
          className="absolute top-[90%] left-[50%] translate-x-[-50%] translate-y-[-50%] block rounded-md bg-neutral-200 px-3 pt-1.5 pb-1 text-xs font-medium uppercase text-neutral-800 transition duration-75 ease-in-out hover:bg-neutral-300 cursor-pointer"
          >
            Remove
          </button>
        )}
      </div>
    </div>
  );
}
