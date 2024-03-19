import { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { updateUserData } from "../../services/user.service";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash, faMapPin } from "@fortawesome/free-solid-svg-icons";
import toast from "react-hot-toast";
import Button from "../../components/Button/Button";

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
        <div className="mx-auto max-w-[87%] gap-2 relative">
          {editing ? (
            <div>
              <input
                className="px-3 py-2 text-lg outline-none border-none rounded-md transition duration-75"
                type="text"
                value={newAddress}
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
            <div className="">
              <FontAwesomeIcon className="" icon={faMapPin}></FontAwesomeIcon>
              <span className="">&nbsp; {userData.address} &nbsp;</span>
              <FontAwesomeIcon
                className="cursor-pointer"
                icon={faPen}
                onClick={handleEdit}
              ></FontAwesomeIcon>{" "}
              &nbsp; &nbsp; 
              <FontAwesomeIcon
                className="cursor-pointer"
                icon={faTrash}
                onClick={handleDelete}
              ></FontAwesomeIcon>
            </div>
          )}
        </div>
      ) : (
        <div className="flex mx-auto max-w-[87%] gap-2">
          <input
            className="px-3 py-2 text-lg outline-none border-none rounded-md transition duration-75"
            type="text"
            placeholder="Add address..."
            onChange={(e) => {
              setNewAddress(e.target.value);
            }}
          />
          <button
            className="rounded-md bg-neutral-700 text-neutral-50 px-3 pt-1.5 pb-1 text-sm font-medium uppercase transition duration-75 ease-in-out hover:bg-neutral-900 cursor-pointer"
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
