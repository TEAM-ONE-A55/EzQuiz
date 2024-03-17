// import { useEffect, useState } from "react";
// import { deleteCoverImage, uploadCover } from "../../services/storage.service";
// import { defaultCoverGroup, defaultCoverRoom } from "../../constants/constants";
// import PropTypes from "prop-types";
// import toast from "react-hot-toast";
// import "./ChangeCoverImage.css";

// export default function ChangeCover({
//   attachedImg,
//   setAttachedImg,
//   imageUrl,
//   setImageUrl,
//   setChangeCover,
//   uuid,
//   keyComponent,
// }) {
//   const [loading, setLoading] = useState(false);
//   useEffect(() => {
//     if (attachedImg) {
//       setLoading(true);
//       uploadCover(keyComponent, uuid, attachedImg)
//         .then((url) => setImageUrl(url))
//         .then(() => {
//           setTimeout(() => {
//             toast.success("Image uploaded successfully!");
//           }, 1500);
//         })
//         .catch((e) => console.log(e.message))
//         .finally(() => {
//           setLoading(false);
//         });
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [attachedImg, uuid]);

//   const removeAttachedImg = async () => {
//     try {
//       await deleteCoverImage(keyComponent, uuid);
//       if (keyComponent === "rooms") {
//         setImageUrl(defaultCoverRoom);
//       } else if (keyComponent === "groups") {
//         setImageUrl(defaultCoverGroup);
//       }
//       setAttachedImg(null);
//       setChangeCover(false);
//       toast.success("Image has been removed successfully!");
//     } catch (e) {
//       console.log(e.message);
//     }
//   };

//   return (
//     <div className="create-hub-type-inputs">
//       <input
//         id="upload-image-input"
//         type="file"
//         onChange={(e) => setAttachedImg(e.target.files[0])}
//       />
//       {!attachedImg && (
//         <label
//           className="upload-image-input-button"
//           htmlFor="upload-image-input"
//         >
//           Upload an image
//         </label>
//       )}
//       {loading && <p>Uploading...</p>}
//       <div className="attached-hub-image-container">
//         {imageUrl && (
//           <img className="attached-hub-image" src={imageUrl} alt="Attached" />
//         )}
//         {imageUrl !== defaultCoverRoom && (
//           <button className="hub-image-button" onClick={removeAttachedImg}>
//             Remove
//           </button>
//         )}
//       </div>
//     </div>
//   );
// }

// ChangeCover.propTypes = {
//   attachedImg: PropTypes.object,
//   setAttachedImg: PropTypes.func,
//   imageUrl: PropTypes.string,
//   setImageUrl: PropTypes.func,
//   setChangeCover: PropTypes.func,
//   uuid: PropTypes.string,
//   keyComponent: PropTypes.string,
// };

import { useEffect, useState } from "react";
import { deleteCoverImage, uploadCover } from "../../services/storage.service";
import { defaultCoverGroup, defaultCoverRoom } from "../../constants/constants";
import PropTypes from "prop-types";
import toast from "react-hot-toast";
import "./ChangeCoverImage.css";
import Loader from "../Loader/Loader";

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
          className="inline-block w-11/12 rounded-lg bg-neutral-800 px-6 pt-2.5 pb-2 text-sm font-medium uppercase leading-normal text-white shadow-lg transition duration-150 ease-in-out hover:bg-neutral-900 hover:shadow-neutral-500 focus:outline-none focus:ring-0 active:bg-neutral-700"
          data-te-ripple-init
          data-te-ripple-color="light"
          htmlFor="upload-image-input"
        >
          Upload Image
        </label>
      )}
      {loading && <Loader/>}
      <div className="attached-hub-image-container">
        {imageUrl && (
          <img
            className="attached-hub-image shadow-xl shadow-neutral-800 mx-auto w-11/12"
            src={imageUrl}
            alt="Attached"
          />
        )}
        {imageUrl !== defaultCoverRoom && (
          <button 
          className="hub-image-button bg-yellow-400 text-neutral-800 font-semibold p-4"

          onClick={removeAttachedImg}>
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
