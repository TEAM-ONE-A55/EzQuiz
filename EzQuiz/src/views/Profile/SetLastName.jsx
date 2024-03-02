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
    <div>
      <p>
        {editing ? (
          <>
            <input type="text" value={lastName} onChange={handleChange} />
            <Button onClick={handleSave}>Save</Button>
            <Button onClick={handleCancel}>Cancel</Button>
          </>
        ) : (
          <>
            <span>Last name: {userData.lastName}</span> &nbsp;
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
