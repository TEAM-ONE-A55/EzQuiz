import { useEffect } from "react";
import { deleteCoverImage, uploadCover } from "../../services/storage.service";
import { defaultCoverGroup, defaultCoverRoom } from "../../constants/constants";
import PropTypes from "prop-types";
import toast from "react-hot-toast";
import "./ChangeCoverImage.css";

export default function ChangeCover({
  attachedImg,
  setAttachedImg,
  imageUrl,
  setImageUrl,
  setChangeCover,
  uuid,
  keyComponent,
}) {

  useEffect(() => {
    if (attachedImg) {
      uploadCover(keyComponent, uuid, attachedImg)
        .then((url) => setImageUrl(url))
        .then(() => {
          setTimeout(() => {
            toast.success("Image uploaded successfully!");
          }, 1500);
        })
        .catch((e) => console.log(e.message));
    }
  }, [attachedImg, uuid]);

  const removeAttachedImg = async () => {
    try {
      await deleteCoverImage(keyComponent, uuid);
      if (keyComponent === "rooms") {
        setImageUrl(defaultCoverRoom);
      } else if (keyComponent === "groups") {
        setImageUrl(defaultCoverGroup);
      }
      setAttachedImg(null);
      setChangeCover(false);
      toast.success("Image has been removed successfully!");
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <div className="create-hub-type-inputs ">
      <input
        className="hidden"
        id="upload-image-input"
        type="file"
        onChange={(e) => setAttachedImg(e.target.files[0])}
      />
      {!attachedImg && (
        <label
          className="inline-block rounded-lg cursor-pointer absolute z-10 w- bg-neutral-800 px-6 pt-2.5 pb-2 text-sm font-medium uppercase leading-normal text-white shadow-lg transition duration-75 ease-in-out hover:bg-neutral-900"
          data-te-ripple-init
          data-te-ripple-color="light"
          htmlFor="upload-image-input"
        >
          Upload Image
        </label>
      )}
      <div className="attached-hub-image-container">
        {imageUrl && (
          <img
            className="attached-hub-image shadow-xl shadow-neutral-800 mx-auto w-11/12"
            src={imageUrl}
            alt="Attached"
          />
        )}
        {imageUrl !== defaultCoverRoom && imageUrl !== defaultCoverGroup && (
          <button
            type="button"
            onClick={removeAttachedImg}
            data-te-ripple-init
            data-te-ripple-color="light"
            className="hub-image-button inline-block rounded-lg cursor-pointer absolute z-10 w- bg-neutral-800 px-6 pt-2.5 pb-2 text-sm font-medium uppercase leading-normal text-white shadow-lg transition duration-75 ease-in-out hover:bg-neutral-900"
          >
            Remove
          </button>
        )}
      </div>
    </div>
  );
}

ChangeCover.propTypes = {
  attachedImg: PropTypes.object,
  setAttachedImg: PropTypes.func,
  imageUrl: PropTypes.string,
  setImageUrl: PropTypes.func,
  setChangeCover: PropTypes.func,
  uuid: PropTypes.string,
  keyComponent: PropTypes.string,
};
