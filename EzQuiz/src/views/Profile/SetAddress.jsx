import { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { updateUserData } from "../../services/user.service";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import toast from "react-hot-toast";

export default function SetAddress() {
  const [address, setAddress] = useState(null);
  const { userData, setContext } = useContext(AppContext);
  const [editing, setEditing] = useState(false);
  const [newAddress, setNewAddress] = useState(userData.address);

  const updateAddress = async (address) => {
    await updateUserData(userData.handle, "address", address);
  };

  const handleChange = (e) => {
    setNewAddress(e.target.value);
  };

  const handleEdit = () => {
    setNewAddress(userData.address);
    setEditing(true);
  };

  const handleSave = () => {
    if(newAddress.length < 2){
        toast.error("Address must be at least 2 characters long");
        return;
    }
    setNewAddress(address);
    setEditing(false);
    updateAddress(newAddress);
    setContext((prevState) => ({
      ...prevState,
      userData: {
        ...prevState.userData,
        address: newAddress,
      },
    }));
  };

  const handleCancel = () => {
    setAddress(newAddress);
    setEditing(false);
  };

  const handleDelete = () => {
    setContext((prevState) => ({
      ...prevState,
      userData: {
        ...prevState.userData,
        address: null,
      },
    }));
    updateAddress(null);
  };

  return (
    <div>
      {userData.address ? (
        <div>
          {editing ? (
            <div>
              <input
                type="text"
                value={newAddress}
                onChange={handleChange}
              />
              <button onClick={handleSave}>Save</button>
              <button onClick={handleCancel}>Cancel</button>
            </div>
          ) : (
            <p>
              Address: {userData.address} &nbsp;
              <FontAwesomeIcon
                icon={faPen}
                onClick={handleEdit}
                style={{ cursor: "pointer" }}
              ></FontAwesomeIcon>{" "}
              &nbsp; &nbsp; 
              <FontAwesomeIcon
                icon={faTrash}
                onClick={handleDelete}
                style={{ cursor: "pointer"}}
              ></FontAwesomeIcon>
            </p>
          )}
        </div>
      ) : (
        <div>
          <input
            type="text"
            placeholder="Add address..."
            onChange={(e) => {
              setNewAddress(e.target.value);
            }}
          />
          <button
            onClick={() => {
                if(newAddress.length < 2){
                    toast.error("Address must be at least 2 characters long");
                    return;
                }
              setContext((prevState) => ({
                ...prevState,
                userData: {
                  ...prevState.userData,
                  address: newAddress,
                },
              }));
              updateAddress(newAddress);
            }}
          >
            Add
          </button>
        </div>
      )}
    </div>
  );
}
