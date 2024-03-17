import Select from "react-select";
import PropTypes from "prop-types";
import { reactSelectStyles } from "../../../services/react-select-styles";

export default function DropdownSelectUsers({
  users,
  selectedUsers,
  setSelectedUsers,
}) {
  const handleSelectedOptionsUsers = (selected) => {
    setSelectedUsers(selected);
  };

  return (
    <Select
      isMulti
      name="users"
      options={users.map((user) => user)}
      className="basic-multi-select mx-auto -m-2 shadow-lg shadow-neutral-400"
      styles={reactSelectStyles}
      classNamePrefix="select"
      value={selectedUsers}
      onChange={handleSelectedOptionsUsers}
    />
  );
}

DropdownSelectUsers.propTypes = {
  users: PropTypes.array,
  selectedUsers: PropTypes.array,
  setSelectedUsers: PropTypes.func,
};
