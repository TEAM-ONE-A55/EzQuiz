import { useEffect, useState } from "react";
import { deleteCoverImage, uploadCover } from "../../services/storage.service";
import { defaultCoverRoom } from "../../constants/constants";
import PropTypes from "prop-types"
import toast from "react-hot-toast";
import "./ChangeCover.css"

export default function ChangeCover({
  attachedImg,
  setAttachedImg,
  imageUrl,
  setImageUrl,
  setChangeCover,
  uuid,
  keyComponent,
}) {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (attachedImg) {
      setLoading(true);
      uploadCover(keyComponent, uuid, attachedImg)
        .then((url) => setImageUrl(url))
        .then(() => {
          setTimeout(() => {
            toast.success("Image uploaded successfully!");
          }, 1500);
        })
        .catch((e) => console.log(e.message))
        .finally(() => {
          setLoading(false);
        });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [attachedImg, uuid]);

  const removeAttachedImg = async () => {
    try {
      await deleteCoverImage(keyComponent, uuid);
      setImageUrl(defaultCoverRoom);
      setAttachedImg(null);
      setChangeCover(false);
      toast.success("Image has been removed successfully!");
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <div className="create-hub-type-inputs">
      <input
        id="upload-image-input"
        type="file"
        onChange={(e) => setAttachedImg(e.target.files[0])}
      />
      {!attachedImg && (
        <label
          className="upload-image-input-button"
          htmlFor="upload-image-input"
        >
          Upload an image
        </label>
      )}
      {loading && <p>Uploading...</p>}
      <div className="attached-hub-image-container">
        {imageUrl && (
          <img className="attached-hub-image" src={imageUrl} alt="Attached" />
        )}
        {imageUrl !== defaultCoverRoom && (
          <button className="hub-image-button" onClick={removeAttachedImg}>
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
    keyComponent: PropTypes.string
}
