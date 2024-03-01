import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { AppContext } from "../../context/AppContext";
import { updateUserData } from "../../services/user.service";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { PHONE_NUMBER } from "../../constants/constants";

export default function SetPhoneNumber() {
  const [phoneNumber, setPhoneNumber] = useState(null);
  const { userData, setContext } = useContext(AppContext);
  const [editing, setEditing] = useState(false);
  const [newPhoneNumber, setNewPhoneNumber] = useState(userData.phoneNumber);

  const updatePhoneNumber = async (number) => {
    await updateUserData(userData.handle, "phoneNumber", number);
  };

  const handleChange = (e) => {
    setNewPhoneNumber(e.target.value);
  };

  const handleEdit = () => {
    setNewPhoneNumber(userData.phoneNumber);
    setEditing(true);
  };

  const handleSave = () => {
    if (newPhoneNumber.length !== PHONE_NUMBER) {
      toast.error("Phone number must be exactly 10 digits");
      return;
    }

    if (Number.isNaN(Number(newPhoneNumber))) {
      toast.error("Phone number cannot contain letters or special characters");
      return;
    }

    setNewPhoneNumber(phoneNumber);
    setEditing(false);
    updatePhoneNumber(newPhoneNumber);
    setContext((prevState) => ({
      ...prevState,
      userData: {
        ...prevState.userData,
        phoneNumber: newPhoneNumber,
      },
    }));
  };

  const handleCancel = () => {
    setPhoneNumber(newPhoneNumber);
    setEditing(false);
  };

  const handleDelete = () => {
    setContext((prevState) => ({
      ...prevState,
      userData: {
        ...prevState.userData,
        phoneNumber: null,
      },
    }));
    updatePhoneNumber(null);
    setNewPhoneNumber(null);
  };

  return (
    <div>
      {userData.phoneNumber ? (
        <div>
          {editing ? (
            <div>
              <input
                type="text"
                value={newPhoneNumber}
                onChange={handleChange}
              />
              <button onClick={handleSave}>Save</button>
              <button onClick={handleCancel}>Cancel</button>
            </div>
          ) : (
            <p>
              Phone number: {userData.phoneNumber} &nbsp;
              <FontAwesomeIcon
                icon={faPen}
                onClick={handleEdit}
                style={{ cursor: "pointer" }}
              ></FontAwesomeIcon>{" "}
              &nbsp; &nbsp;
              <FontAwesomeIcon
                icon={faTrash}
                onClick={handleDelete}
                style={{ cursor: "pointer" }}
              ></FontAwesomeIcon>
            </p>
          )}
        </div>
      ) : (
        <div>
          <input
            type="text"
            placeholder="Add phone Number..."
            onChange={(e) => {
              setNewPhoneNumber(e.target.value);
            }}
          />
          <button
            onClick={() => {
              if (Number.isNaN(Number(newPhoneNumber))) {
                toast.error(
                  "Phone number cannot contain letters or special characters"
                );
                return;
              }
              if (newPhoneNumber === null) {
                toast.error("Phone number cannot be null");
                return;
              }
              if (newPhoneNumber.length < 10) {
                toast.error("Phone number must be at least 10 digits");
                return;
              }
              setContext((prevState) => ({
                ...prevState,
                userData: {
                  ...prevState.userData,
                  phoneNumber: newPhoneNumber,
                },
              }));
              updatePhoneNumber(newPhoneNumber);
            }}
          >
            Add
          </button>
        </div>
      )}
    </div>
  );
}
