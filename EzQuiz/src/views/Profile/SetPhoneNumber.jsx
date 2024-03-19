import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { AppContext } from "../../context/AppContext";
import { updateUserData } from "../../services/user.service";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash, faPhone } from "@fortawesome/free-solid-svg-icons";
import { PHONE_NUMBER } from "../../constants/constants";
import Button from "../../components/Button/Button";

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
        <div className="mx-auto max-w-[87%] gap-2 relative">
          {editing ? (
            <div>
              <input
              className="px-3 py-2 text-lg outline-none border-none rounded-md transition duration-75"
                type="text"
                value={newPhoneNumber}
                onChange={handleChange}
              />
              <div className="flex justify-center gap-1 mt-1">
                <button className="rounded-md bg-neutral-700 text-neutral-50 px-3 pt-1.5 pb-1 text-sm font-medium uppercase transition duration-75 ease-in-out hover:bg-neutral-900 cursor-pointer"
                onClick={handleSave}>Save</button>
                <button className="rounded-md bg-neutral-700 text-neutral-50 px-3 pt-1.5 pb-1 text-sm font-medium uppercase transition duration-75 ease-in-out hover:bg-neutral-900 cursor-pointer"
                onClick={handleCancel}>Cancel</button>
              </div>
            </div>
          ) : (
            <p>
              <FontAwesomeIcon
                icon={faPhone}
              ></FontAwesomeIcon>&nbsp; {userData.phoneNumber} &nbsp;
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
        <div className="flex mx-auto max-w-[87%] gap-2">
          <input
          className="px-3 py-2 text-lg outline-none border-none rounded-md transition duration-75"
            type="text"
            placeholder="Add phone Number..."
            onChange={(e) => {
              setNewPhoneNumber(e.target.value);
            }}
          />
          <button
          className="rounded-md bg-neutral-700 text-neutral-50 px-3 pt-1.5 pb-1 text-sm font-medium uppercase transition duration-75 ease-in-out hover:bg-neutral-900 cursor-pointer"
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
