import { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { updateUserData } from "../../services/user.service";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import toast from "react-hot-toast";
import { NAME_MAX_LENGTH, NAME_MIN_LENGTH } from "../../constants/constants";
import Button from "../../components/Button/Button";

export default function SetFirstName() {
  const { userData, setContext } = useContext(AppContext);
  const [firstName, setFirstName] = useState(userData.firstName);
  const [editing, setEditing] = useState(false);

  const checkIfItIncludesANumber = (string) => {
    const result = /\d/.test(string);
    if (result) {
      toast.error("First name cannot contain numbers");
      return result;
    }
    return result;
  };

  const handleEdit = () => {
    setFirstName(userData.firstName);
    setEditing(true);
  };

  const handleSave = () => {
    const result = checkIfItIncludesANumber(firstName);
    if (result) {
      return;
    }
    if (
      firstName.length < NAME_MIN_LENGTH ||
      firstName.length > NAME_MAX_LENGTH
    ) {
      toast.error(
        `First name must be between ${NAME_MIN_LENGTH} and ${NAME_MAX_LENGTH} characters`
      );
      return;
    }

    setFirstName(firstName);
    setEditing(false);
    updateUserData(userData.handle, "firstName", firstName);
    setContext((prevState) => ({
      ...prevState,
      userData: {
        ...prevState.userData,
        firstName: firstName,
      },
    }));
  };

  const handleCancel = () => {
    setFirstName(userData.firstName);
    setEditing(false);
  };

  const handleChange = (e) => {
    setFirstName(e.target.value);
  };

  return (
    <div className="mx-auto max-w-[87%] gap-2 relative">
      <p>
        {editing ? (
          <>
            <input className="px-3 py-2 text-lg outline-none border-none rounded-md transition duration-75"
            type="text" value={firstName} onChange={handleChange} />
            <div className="flex justify-center gap-1 mt-1">
              <button className="rounded-md bg-neutral-700 text-neutral-50 px-3 pt-1.5 pb-1 text-sm font-medium uppercase transition duration-75 ease-in-out hover:bg-neutral-900 cursor-pointer"
              onClick={handleSave}>Save</button>
              <button className="rounded-md bg-neutral-700 text-neutral-50 px-3 pt-1.5 pb-1 text-sm font-medium uppercase transition duration-75 ease-in-out hover:bg-neutral-900 cursor-pointer"
              onClick={handleCancel}>Cancel</button>
            </div>
          </>
        ) : (
          <>
            Name: {firstName} &nbsp;
            <FontAwesomeIcon
              icon={faPen}
              onClick={handleEdit}
              style={{ cursor: "pointer"}}
            ></FontAwesomeIcon>
          </>
        )}
      </p>
    </div>
  );
}
