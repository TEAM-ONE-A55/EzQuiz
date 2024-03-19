import { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { updateUserData } from "../../services/user.service";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import toast from "react-hot-toast";
import { NAME_MAX_LENGTH, NAME_MIN_LENGTH } from "../../constants/constants";
import Button from "../../components/Button/Button";

export default function SetLastName() {
  const { userData, setContext } = useContext(AppContext);
  const [lastName, setLastName] = useState(userData.lastName);
  const [editing, setEditing] = useState(false);

  const handleEdit = () => {
    setLastName(userData.lastName);
    setEditing(true);
  };

  const checkIfItIncludesANumber = (string) => {
    const result = /\d/.test(string);
    if (result) {
      toast.error("Last name cannot contain numbers");
      return result;
    }
    return result;
  };

  const handleSave = () => {

    const result = checkIfItIncludesANumber(lastName);
    if (result) {
      return;
    }
    if (
      lastName.length < NAME_MIN_LENGTH ||
      lastName.length > NAME_MAX_LENGTH
    ) {
      toast.error(
        `Last name must be between ${NAME_MIN_LENGTH} and ${NAME_MAX_LENGTH} characters`
      );
      return;
    }

    setLastName(lastName);
    setEditing(false);
    updateUserData(userData.handle, "lastName", lastName);
    setContext((prevState) => ({
      ...prevState,
      userData: {
        ...prevState.userData,
        lastName: lastName,
      },
    }));
  };

  const handleCancel = () => {
    setLastName(userData.lastName);
    setEditing(false);
  };

  const handleChange = (e) => {
    setLastName(e.target.value);
  };

  return (
    <div className="mx-auto max-w-[87%] gap-2 relative">
      <p>
        {editing ? (
          <div>
            <input className="px-3 py-2 text-lg outline-none border-none rounded-md transition duration-75"
            type="text" value={lastName} onChange={handleChange} />
            <div className="flex justify-center gap-1 mt-1">
              <button className="rounded-md bg-neutral-700 text-neutral-50 px-3 pt-1.5 pb-1 text-sm font-medium uppercase transition duration-75 ease-in-out hover:bg-neutral-900 cursor-pointer"
              onClick={handleSave}>Save</button>
              <button className="rounded-md bg-neutral-700 text-neutral-50 px-3 pt-1.5 pb-1 text-sm font-medium uppercase transition duration-75 ease-in-out hover:bg-neutral-900 cursor-pointer"
              onClick={handleCancel}>Cancel</button>
            </div>
          </div>
        ) : (
          <>
            <span>Surname: {userData.lastName}</span> &nbsp;
            <FontAwesomeIcon
              icon={faPen}
              onClick={handleEdit}
              style={{ cursor: "pointer" }}
            />
          </>
        )}
      </p>
    </div>
  );
}
